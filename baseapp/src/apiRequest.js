const apiRequest = async (url = '', options = null, errMsg = null) => {
  try {
    const response = await fetch(url, options)
    if (!response.ok) throw Error('Invalid request')
  } catch (error) {
    errMsg = error.message
  } finally {
    return errMsg
  }
}

export default apiRequest