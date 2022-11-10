import { useEffect, useState } from 'react'

import { appwAccount } from './config/appwrite'

import Signup from './components/signup'
import Login from './components/login'
import Todo from './components/todo'

import Stack from 'react-bootstrap/Stack';

import Nav from 'react-bootstrap/Nav';

function App() {
  const [view, setView] = useState('login');
  const [account, setAccount] = useState(null);

  useEffect(() => {
    appwAccount.get()
      .then(function (response) {
        setAccount(response);
        setView('todo');
      })
      .catch(function (error) {
      });
  }, []);

  function logOut() {
    appwAccount.deleteSessions()
      .then(function (response) {
        setAccount(null);
        setView('login');
      })
      .catch(function (error) {
        alert(error);
      });
  }

  function handleNavSelect(eventKey) {
    setView(eventKey);
  }

  function onAccessed(currentUser) {
    setAccount(currentUser);
    setView('todo');
  }

  function onSignUp() {
    setView('signup');
  }

  return (
    <div className="App">
      <Stack gap={2} className="col-md-4 mx-auto">
        {account &&
          <>
            <Nav
              onSelect={handleNavSelect}
              className="justify-content-center"
              activeKey="/home"
              variant="tabs"
              defaultActiveKey="home"
            >
              <Nav.Item>
                <Nav.Link eventKey="todo">Todo List</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={logOut} eventKey="logout">Logout</Nav.Link>
              </Nav.Item>
            </Nav>
          </>
        }

        {view === 'signup' && <Signup onAccessed={onAccessed} />}
        {view === 'login' && <Login onAccessed={onAccessed} onSignUp={onSignUp} />}
        {account && (view === 'todo') && <Todo />}
      </Stack>
    </div>
  )
}

export default App
