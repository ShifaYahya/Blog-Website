import React from 'react'
import {useState, useEffect} from 'react'
import { getDocs } from 'firebase/firestore'
import { collection, deleteDoc, doc } from 'firebase/firestore'
import { db, auth } from '../firebase-config'

export const Home = ({isAuth}) => {

 const [isHovered, setIsHovered] = useState(false);  //state for delete hover
  const handleMouseEnter = () => { //can also specify this in the onclick itself for more simplicity 
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

const [postList, setPostList] = useState([])
const postCollectionRef = collection(db, 'posts')

const deletePost = async (id) => {
    try {
      const postDoc = doc(db, 'posts', id);
      await deleteDoc(postDoc);
      // After deletion, refresh the post list
      getPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };
//takes and id as a a parameter
    //this is to specify exactly which doc you want //this id value will change depending on which post/button you're on
    

const getPosts = async () => {
    const data = await getDocs(postCollectionRef);
    setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
useEffect(() => {
    

    getPosts();
  }, [deletePost]); // forgot to fix something in the video. In order to prevent infinite reads and in order for the delete to refresh after a post is deleted, you need to change the useffect in the home page to the following:

 


  return ( 
    <div className='homePage'>
       {postList.map((post)=> {
        return (
            <div className='post'>
                <div className='postHeader'>
                    <div className='title'>
                      <h1>{post.title}</h1>  </div>
                      <div className='deletePost'>
                        {isAuth && post.author.id === auth.currentUser.uid && (<button  onClick={() =>{deletePost(post.id)}} onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}><img src='https://cdn-icons-png.flaticon.com/512/5037/5037730.png
      '  height={30} width={30}  alt='trashcan/delete'></img> {isHovered? <div className='delete-hover'>Delete</div> : null}</button>) }
                      </div>
                </div>
                <div className='postTextContainer'>{post.postText}</div>
                <h3>@{post.author.name}</h3>
            </div>
        )
       })}
    </div> 
  )
}

