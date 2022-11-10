import { appwAccount, update } from '../config/appwrite';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useState } from 'react';
import { useEffect } from 'react';

function Login({onAccessed, onSignUp}) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  useEffect(() => {
    update();
  },[]);

  function submit(e) {
    e.preventDefault();
    appwAccount.createEmailSession(email, pass)
      .then(function (response) {
        onAccessed(response);
      })
      .catch(function(error) {
        alert(error);
      });
  }

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control onChange={e => setEmail(e.target.value)} type="email" placeholder="Enter email" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control onChange={e => setPass(e.target.value)} type="password" placeholder="Password" />
      </Form.Group>
      <Button onClick={e => submit(e)} variant="primary" type="submit">
        Submit
      </Button>
      <Button onClick={onSignUp} variant="light">Signup</Button>
    </Form>
  )
}

export default Login
