import ActionButtons from "./ActionButtons"
import DataView from "./DataView"
import { useState } from 'react'

function App() {
  const API_URL = 'https://jsonplaceholder.typicode.com'

  const [users, setUsers] = useState([])
  const [posts, setPosts] = useState([])
  const [comments, setComments] = useState([])
  const [data, setData] = useState([])

  const [fetchError, setFetchError] = useState(null)

  return (
    <div className="App">
      <ActionButtons
        baseUrl={API_URL}
        setUsers={setUsers}
        setPosts={setPosts}
        setComments={setComments}
        setFetchError={setFetchError}
        setData={setData}
      />

      {fetchError ? <p>{fetchError}</p> : null}

      <DataView
        data={data}
      />
    </div>
  );
}

export default App;
