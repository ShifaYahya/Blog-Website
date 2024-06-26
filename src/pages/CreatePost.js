import React from 'react'
import { useState, useEffect } from 'react'
import {addDoc, collection} from 'firebase/firestore'
import {db, auth} from '../firebase-config';
import { useNavigate } from 'react-router-dom';



const CreatPost = ({isAuth}) => {
const [title, setTitle] = useState("")
const [postText, setPostText] = useState("")

const postsCollectionRef = collection(db, 'posts') //second argument here is name of the collection you want to reference
let navigate = useNavigate();

const createPost = async ()=>{
  await addDoc(postsCollectionRef, {title, postText, author: {name: auth.currentUser.displayName , id: auth.currentUser.uid}})
  navigate("/")
}

useEffect(()=>{
if(!isAuth){
  navigate("/login") //if we're not authenticated we're redirected tot the login page
}
}, []) //useEffect here to check once this comoonent is refreshed or shown


  return (
    <div className='createPostPage'>
    <div className='cpContainer'>
      <h1>Create A Post</h1>
      <div className="inputGp">
        <label> TItle:</label>
        <input placeholder='Enter A Title..' onChange={(event)=> setTitle(event.target.value)}></input>
        </div>
      <div className="inputGp">
      <label> Post:</label>
      <textarea placeholder='Write Your Post...' onChange={(event)=>setPostText(event.target.value)}></textarea>
      </div> 
      <button onClick={createPost}>Submit Post</button>
    </div>
    </div>
  )
}

export default CreatPost