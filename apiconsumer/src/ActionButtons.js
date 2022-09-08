import React from 'react'
import ActionButton from './ActionButton'

const ActionButtons = ({
  reqType,
  setReqType
}) => {

  return (
    <form
      className="form"
      onSubmit={(e) => e.preventDefault()}
    >
      <ActionButton
        title='users'
        reqType={reqType}
        setReqType={setReqType}
      />
      <ActionButton
        title='posts'
        reqType={reqType}
        setReqType={setReqType}
      />
      <ActionButton
        title='comments'
        reqType={reqType}
        setReqType={setReqType}
      />
    </form>
  )
}

export default ActionButtons