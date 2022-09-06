import React from 'react'

const SetColor = ({ color, setColor }) => {
  return (
    <div className='colorInput'>
      <input
        id='setColor'
        type='text'
        placeholder='Add color name'
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
    </div>
  )
}

export default SetColor