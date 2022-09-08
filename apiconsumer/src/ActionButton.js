import React from 'react'

const ActionButton = ({ title, actionUrl, setData, setDataForView, setFetchError }) => {
  const handleOnClick = async (e) => {
    console.log(`Button '${title}' clicked, actionUrl=${actionUrl}`)
    const fetchOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    let errorMsg = null
    try {
      const response = await fetch(actionUrl, fetchOptions)
      if (!response.ok) throw Error('Failed to fetch data')
      const data = await response.json()
      setData(data)
      setDataForView(data)
    } catch (e) {
      errorMsg = e.message
    } finally {
      setFetchError(errorMsg)
    }

  }
  return (
    <button
      type="submit"
      onClick={handleOnClick}
    >{title}</button>
  )
}

export default ActionButton