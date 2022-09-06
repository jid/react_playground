import ColorBox from './ColorBox'
import SetColor from './SetColor'
import { useState } from 'react'

function App() {
  const [color, setColor] = useState('')
  const [hexValue, setHexValue] = useState('')
  const [isDarkText, setIsDarkText] = useState(true)

  return (
    <div className='app'>
      <ColorBox
        color={color}
        hexValue={hexValue}
        isDarkText={isDarkText}
      />
      <SetColor
        color={color}
        setColor={setColor}
        setHexValue={setHexValue}
        isDarkText={isDarkText}
        setIsDarkText={setIsDarkText}
      />
    </div>
  );
}

export default App;
