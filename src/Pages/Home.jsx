import './home.css'
import React, { useEffect, useRef, useState } from 'react';
import { collection, addDoc, getDocs, query, where, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../config/firebase/firebaseconfig';
import './Home.css'; // Import the CSS file

const Home = () => {
  const todoInputRef = useRef();
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  // Fetch todos for the current user on load
  useEffect(() => {
    const getFirestoreData = async () => {
      if (auth.currentUser) {
        const q = query(collection(db, 'todo'), where('uid', '==', auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        
        const fetchedTodos = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          docid: doc.id,
        }));
        setTodos(fetchedTodos);
      }
    };
    getFirestoreData();
  }, []);

  // Add a new todo to Firestore
  const addTodo = async (event) => {
    event.preventDefault();
    const todoText = todoInputRef.current.value.trim();

    if (todoText && auth.currentUser) {
      try {
        const docRef = await addDoc(collection(db, 'todo'), {
          title: todoText,
          uid: auth.currentUser.uid,
        });
        
        setTodos((prevTodos) => [...prevTodos, { title: todoText, uid: auth.currentUser.uid, docid: docRef.id }]);
        todoInputRef.current.value = '';
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }
  };

  const deleteTodo = async (docid) => {
    try {
      await deleteDoc(doc(db, 'todo', docid));
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.docid !== docid));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const startEditing = (docid, title) => {
    setEditingId(docid);
    setEditingText(title);
  };

  const saveEdit = async (event, docid) => {
    event.preventDefault();
    try {
      const todoRef = doc(db, 'todo', docid);
      await updateDoc(todoRef, { title: editingText });
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.docid === docid ? { ...todo, title: editingText } : todo))
      );
      setEditingId(null);
      setEditingText('');
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <div className="container">
      <h2>Todo App With Firebase Database</h2>
      <form onSubmit={addTodo}>
        <input type="text" placeholder="Enter Your Todo" ref={todoInputRef} />
        <button type="submit" className="add-btn">Add Todo</button>
      </form>

      <ol className="todo-list">
        {todos.length > 0 ? (
          todos.map((item) => (
            <li key={item.docid} className="todo-item">
              {editingId === item.docid ? (
                <form onSubmit={(event) => saveEdit(event, item.docid)} className="edit-form">
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                  />
                  <button type="submit" className="save-btn">Save</button>
                  <button onClick={() => setEditingId(null)} className="cancel-btn">Cancel</button>
                </form>
              ) : (
                <>
                  <span className="todo-title">{item.title}</span>
                  <button onClick={() => startEditing(item.docid, item.title)} className="edit-btn">Edit</button>
                  <button onClick={() => deleteTodo(item.docid)} className="delete-btn">Delete</button>
                </>
              )}
            </li>
          ))
        ) : (
          <h1>Loading...</h1>
        )}
      </ol>
    </div>
  );
};

export default Home;
