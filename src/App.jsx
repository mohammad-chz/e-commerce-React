import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HomePage } from './Pages/HomePage'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/checkout' element={<div>checkout Page</div>} />
      </Routes>
    </Router>
  )
}

export default App
