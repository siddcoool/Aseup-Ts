import './App.css'
 import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';

const App: React.FC = () =>  {
  return (
    <Router> 
      <Routes>
       <Route path='/' element={<Login/>}></Route>
       <Route path='/SignUp' element={<SignUp/>}></Route>
       </Routes>
        {/* <Link to="/Login">Login</Link>
        <Link to="/SignUp">SignUp</Link> */}
      
     
    </Router>

  )
}

export default App
