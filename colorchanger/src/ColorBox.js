import React from 'react'

const ColorBox = ({ color }) => {
  return (
    <div className='colorBox'
      style={
        { backgroundColor: !color ? '#ffffff' : color }
      }
    >
      Empty value
    </div>
  )
}

export default ColorBox