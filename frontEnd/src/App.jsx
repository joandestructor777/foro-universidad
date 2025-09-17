import './App.css';
import { Home } from './components/Home.jsx';
import { Login } from './components/Login.jsx';
import { Register } from './components/register.jsx';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
