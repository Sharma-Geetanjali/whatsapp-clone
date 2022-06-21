import React from 'react'
import './Login.css'
import { useStateValue } from './StateProvider';
import {auth , provider} from './firebase';

function Login() {
  const [{}, dispatch]= useStateValue()

  const signIn=()=>{
    auth.signInWithPopup(provider).then(result=>{
      dispatch({
        type: "SET_USER",
        user: result.user
      })
      
    }).catch(error=>alert(error))
  }
  return (
    <div className='login_wrapper'>
        <div className='login'>
            <img src='https://th.bing.com/th/id/OIP.40zeS63yQVB621eCXMjN6QHaHl?pid=ImgDet&rs=1' alt='Login page'/>
            <h2> Sign in to WhatsApp</h2>
            <button onClick={signIn}>Signin with Gmail</button>
        </div>
    </div>
  )
}

export default Login