import { appwAccount, ID } from '../config/appwrite';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

function Signup({ onAccessed }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  function submit(e) {
    e.preventDefault();
    appwAccount.create(
      ID.unique(),
      email,
      pass,
      name
    ).then(function (response) {
      appwAccount.createEmailSession(email, pass)
        .then(function (response) {
          onAccessed(response);
        })
        .catch(function (error) {
          alert(error);
        });
    })
    .catch(function (error) {
      alert(error);
    });
  }

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control onChange={e => setName(e.target.value)} type="text" placeholder="Enter your name" />
      </Form.Group>
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
    </Form>
  )
}

export default Signup
