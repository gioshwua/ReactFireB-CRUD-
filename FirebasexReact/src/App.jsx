import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { db } from './FirebaseConfig';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import { FaUserPlus, FaUserMinus, FaUserEdit } from 'react-icons/fa';

// Global Styles
const GlobalStyle = createGlobalStyle`
  body {
    background-color: #e0f7fa;
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

// Styled Components
const Header = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  padding: 20px;
  text-align: center;
  background-color: #007bff;
  color: white;
  border-bottom: 2px solid #0056b3;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 2em;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px; /* Add margin to avoid content being hidden behind the header */
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 200px;
  font-size: 16px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  margin-top: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }

  svg {
    margin-right: 8px;
  }
`;

const UserCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 500px;
`;

const UserName = styled.h1`
  font-size: 1.5em;
  margin: 0;
  color: #333;
`;

const UserAge = styled.h1`
  font-size: 1.2em;
  margin: 10px 0;
  color: #777;
`;

const UserButton = styled(Button)`
  margin: 5px;
`;

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

  const [users, setUsers] = React.useState([]);
  const UserCollectionRef = collection(db, 'users');

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

  const deleteUser = async (id) => {
    const userDoc = doc(db, 'users', id);
    await deleteDoc(userDoc);
  };

  return (
    <>
      <GlobalStyle />
      <Header>
        <Title>React Firebase CRUD Operations</Title>
      </Header>
      <Container>
        <Form onSubmit={handleSubmit}>
          <Input
            type='text'
            placeholder='Name'
            name='name'
            onChange={handleChange}
          />
          <Input
            type='number'
            placeholder='Age'
            name='age'
            onChange={handleChange}
          />
          <Button type='submit'>
            <FaUserPlus /> Create User!
          </Button>
        </Form>
        {users.map((user) => {
          return (
            <UserCard key={user.id}>
              <UserName>Name: {user.name}</UserName>
              <UserAge>Age: {user.age}</UserAge>
              <UserButton
                onClick={() => {
                  updateUser(user.id, user.age);
                }}
              >
                <FaUserEdit /> Add Age
              </UserButton>
              <UserButton
                onClick={() => {
                  deleteUser(user.id);
                }}
              >
                <FaUserMinus /> Delete User
              </UserButton>
            </UserCard>
          );
        })}
      </Container>
    </>
  );
}

export default App;
