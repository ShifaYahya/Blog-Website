import React, { useState, useEffect } from 'react';
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '../firebase-config';

export const Home = ({ isAuth }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [postList, setPostList] = useState([]);
  const postCollectionRef = collection(db, 'posts');

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const deletePost = async (id) => {
    try {
      const postDoc = doc(db, 'posts', id);
      await deleteDoc(postDoc);
      getPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const getPosts = async () => {
    const data = await getDocs(postCollectionRef);
    setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <div className='homePage'>
      {postList.map((post) => {
        return (
          <div className='post' key={post.id}>
            <div className='postHeader'>
              <div className='title'>
                <h1>{post.title}</h1>
              </div>
              <div className='deletePost'>
                {isAuth && post.author.id === auth.currentUser.uid && (
                  <button 
                    onClick={() => { deletePost(post.id) }} 
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}>
                    <img src='https://cdn-icons-png.flaticon.com/512/5037/5037730.png' height={30} width={30} alt='trashcan/delete'></img>
                    {isHovered ? <div className='delete-hover'>Delete</div> : null}
                  </button>
                )}
              </div>
            </div>
            <div className='postTextContainer'>{post.postText}</div>
            <h3>@{post.author.name}</h3>
          </div>
        );
      })}
    </div>
  );
}
