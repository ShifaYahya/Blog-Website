import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import { Home } from './pages/Home'
import CreatePost from './pages/CreatePost';
import Login from './pages/Login';
import './App.css'
import { useState } from 'react';
import {signOut} from "firebase/auth" 

import { auth } from './firebase-config';



function App(){
const [isAuth, setIsAuth]= useState(localStorage.getItem("isAuth"))  //so that it doesnt assume anyhing when refreshed



const signUserOut = () => {
  signOut(auth).then(()=>{
    localStorage.clear()
    setIsAuth(false)
   window.location.pathname = "/login"
  })
}


  return(
    <Router>
      <nav>
        <h1>BlogBridges.com</h1>
        <div className='nav-container'>
        <Link to="/">Home</Link>
        
        {!isAuth ? <Link to="/login">Login</Link> :<> <Link to="/createpost">Create Post</Link> <button onClick={signUserOut}> Log Out</button></>}</div>
      </nav>
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth}/>}></Route>
        <Route path="/createpost" element={<CreatePost isAuth={isAuth}/>}></Route>
        <Route path="/login" element={<Login isAuth={isAuth} setIsAuth={setIsAuth}/>}></Route>
      </Routes>
    </Router>
  )

}
export default App;