import { useLocation } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'

function App() {

  const isOwnerPath = useLocation().pathname.includes('owner');

  return (
      <div>
        {!isOwnerPath && <NavBar/>}
      </div>
  )
}

export default App
