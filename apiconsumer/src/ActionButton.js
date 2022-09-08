import React from 'react'

const ActionButton = ({ title, reqType, setReqType }) => {
  const handleCLick = () => {
    setReqType(title)
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
  return (
    <button
      type="submit"
      className={title === reqType ? 'active' : ''}
      onClick={handleCLick}
    >{title}</button>
  )
}

export default ActionButton