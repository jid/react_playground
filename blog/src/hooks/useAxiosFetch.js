import { useState, useEffect } from 'react'
import axios from 'axios'

const useAxiosFetch = (dataUrl) => {
  const [data, setData] = useState([])
  const [fetchError, setFetchError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    let isMounted = true
    const source = new AbortController()

    const fetchData = async (url) => {
      setIsLoading(true)
      try {
        const response = await axios.get(url, { signal: source.signal })
        if (isMounted) {
          setData(response.data)
          setFetchError(null)
        }
      } catch (err) {
        if (isMounted) {
          setFetchError(err.message)
          setData([])
        }
      } finally {
        // postpone isLoading call for 2s
        // isMounted && setTimeout(() => setIsLoading(false), 2000)
        isMounted && setIsLoading(false)
      }
    }

    fetchData(dataUrl)

    const cleanUp = () => {
      isMounted = false
      source.abort()
    }

    return cleanUp

  }, [dataUrl])

  return { data, fetchError, isLoading }
}

export default useAxiosFetch