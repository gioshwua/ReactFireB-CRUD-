import React from 'react';
import { db } from './FirebaseConfig';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
} from 'firebase/firestore';

//getDocs returns all the documents from specific collection
function App() {
  const [addNew, setNew] = React.useState({
    name: '',
    age: 0,
  });

  const handleChange = (event) => {
    setNew((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const [users, setUsers] = React.useState([]); //array sya kasi sa no sql database array ang gamit
  const UserCollectionRef = collection(db, 'users'); //collect data sa users collection lang, since pede marami collection sa database

  React.useEffect(() => {
    const getData = async () => {
      const data = await getDocs(UserCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getData();
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    await addDoc(UserCollectionRef, {
      name: addNew.name,
      age: Number(addNew.age),
    });
  };

  const updateUser = async (id, age) => {
    const userDoc = doc(db, 'users', id);
    const newField = { age: age + 1 };
    await updateDoc(userDoc, newField);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Name'
          name='name'
          onChange={handleChange}
        />
        <input
          type='number'
          placeholder='Age'
          name='age'
          onChange={handleChange}
        />
        <button>Create User!</button>
      </form>
      {users.map((user) => {
        return (
          <div key={user.id}>
            <h1>Name:{user.name}</h1>
            <h1>Age:{user.age}</h1>
            <button
              onClick={function () {
                updateUser(user.id, user.age);
              }}
            >
              Add Age
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
