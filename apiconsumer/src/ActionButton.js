import React from 'react'

const ActionButton = ({ title, reqType, setReqType }) => {
  return (
    <button
      type="submit"
      className={title === reqType ? 'active' : ''}
      onClick={() => setReqType(title)}
    >{title}</button>
  )
}

export default ActionButton