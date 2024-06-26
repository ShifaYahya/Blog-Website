
import {auth, provider} from '../firebase-config'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'





const Login = ({isAuth, setIsAuth}) => {
 let navigate = useNavigate()

 const signInWithGoogle = () =>{
    signInWithPopup(auth, provider).then((result)=>{
        setIsAuth(true) //we can know this way if user is is logged in
        localStorage.setItem("isAuth", true)// we named the item we want to store in local storage as isAuth can be anything
        navigate("/")


    })
 }



  return (
    <div className='loginPage'>
        <p> 
            Sign
            In with Google to Continue
            </p>
        <button className='login-with-google-btn' onClick={signInWithGoogle}>   Sign in with Google</button>
       
    </div>
  )
}

export default Login