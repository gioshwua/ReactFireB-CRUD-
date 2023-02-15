import React from 'react';
import { db } from './FirebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

//getDocs returns all the documents from specific collection
function App() {
  const [users, setUsers] = React.useState([]); //array sya kasi sa no sql database array ang gamit
  const UserCollectionRef = collection(db, 'users'); //collect data sa users collection lang, since pede marami collection sa database

  React.useEffect(() => {
    const getData = async () => {
      const data = await getDocs(UserCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getData();
  }, []);

  return (
    <div>
      {users.map((user) => {
        return (
          <div key={user.id}>
            <h1>Name:{user.name}</h1>
            <h1>Age:{user.age}</h1>
          </div>
        );
      })}
    </div>
  );
}

export default App;
