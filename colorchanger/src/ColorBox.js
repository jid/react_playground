import React from 'react'

const ColorBox = ({ color, hexValue, isDarkText }) => {
  return (
    <div className='colorBox'
      style={{
        backgroundColor: color,
        color: isDarkText ? "#000" : "#fff"
      }}
    >
      <p>{color ? color : 'Empty value'}</p>
      <p>{hexValue ? hexValue : null}</p>
    </div>
  )
}

export default ColorBox