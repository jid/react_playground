import React from 'react'
import colorNames from 'colornames'

const SetColor = ({
  color, setColor, setHexValue, isDarkText, setIsDarkText
}) => {
  return (
    <div className='colorInput'>
      <input
        autoFocus
        id='setColor'
        type='text'
        placeholder='Color name'
        value={color}
        onChange={(e) => {
          setColor(e.target.value)
          setHexValue(colorNames(e.target.value))
        }}
      />
      <button
        type="button"
        onClick={() => setIsDarkText(!isDarkText)}
      >
        Toggle text color
      </button>
    </div>
  )
}

export default SetColor