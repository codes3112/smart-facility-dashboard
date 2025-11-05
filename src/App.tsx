import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <div className="text-xl p-6 text-red-600">Hello Tailwind</div>;
    </>
  )
}

export default App
