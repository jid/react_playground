import React from 'react'
import ActionButton from './ActionButton'

const ActionButtons = ({
  baseUrl,
  setUsers,
  setPosts,
  setComments,
  setFetchError,
  setData
}) => {

  return (
    <form
      className="form"
      onSubmit={(e) => e.preventDefault()}
    >
      <ActionButton
        title='users'
        actionUrl={`${baseUrl}/users`}
        setData={setUsers}
        setDataForView={setData}
        setFetchError={setFetchError}
      />
      <ActionButton
        title={'posts'}
        actionUrl={`${baseUrl}/posts`}
        setData={setPosts}
        setDataForView={setData}
        setFetchError={setFetchError}
      />
      <ActionButton
        title={'comments'}
        actionUrl={`${baseUrl}/comments`}
        setData={setComments}
        setDataForView={setData}
        setFetchError={setFetchError}
      />
    </form>
  )
}

export default ActionButtons