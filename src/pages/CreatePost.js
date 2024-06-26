import React from 'react';
import { useState, useEffect } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../firebase-config';
import { useNavigate } from 'react-router-dom';

const CreatePost = ({ isAuth }) => {
  const [title, setTitle] = useState('');
  const [postText, setPostText] = useState('');

  const postsCollectionRef = collection(db, 'posts'); // second argument here is the name of the collection you want to reference
  let navigate = useNavigate();

  const createPost = async () => {
    await addDoc(postsCollectionRef, {
      title,
      postText,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    navigate('/');
  };

  useEffect(() => {
    if (!isAuth) {
      navigate('/login'); // if we're not authenticated, we're redirected to the login page
    }
  }, [isAuth, navigate]); // Add isAuth and navigate to the dependency array

  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <h1>Create A Post</h1>
        <div className="inputGp">
          <label>Title:</label>
          <input
            placeholder="Enter A Title.."
            onChange={(event) => setTitle(event.target.value)}
          ></input>
        </div>
        <div className="inputGp">
          <label>Post:</label>
          <textarea
            placeholder="Write Your Post..."
            onChange={(event) => setPostText(event.target.value)}
          ></textarea>
        </div>
        <button onClick={createPost}>Submit Post</button>
      </div>
    </div>
  );
};

export default CreatePost;
