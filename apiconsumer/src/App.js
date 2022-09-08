import ActionButtons from "./ActionButtons"
import DataView from "./DataView"
import { useState, useEffect } from 'react'

function App() {
  const API_BASE_URL = 'https://jsonplaceholder.typicode.com'

  const [data, setData] = useState([])
  const [reqType, setReqType] = useState('users')
  const [fetchError, setFetchError] = useState(null)

  useEffect(() => {
    const apiUrl = `${API_BASE_URL}/${reqType}`

    const fetchItems = async () => {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }

      try {
        const response = await fetch(apiUrl, options)
        if (!response.ok) throw Error('Invalid request')
        const data = await response.json()
        setData(data)
        setFetchError(null)
      } catch (err) {
        setFetchError(err.message)
      }
    }

    fetchItems();

  }, [reqType])

  return (
    <div className="App">
      <ActionButtons
        reqType={reqType}
        setReqType={setReqType}
      />

      {fetchError ? <p className="error">{fetchError}</p> : null}

      {data && data.length && <DataView data={data} />}

    </div>
  );
}

export default App;
