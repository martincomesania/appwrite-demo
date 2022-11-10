import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import { appwClient, appwDatabases, ID, DB_ID, COLLECTION_ID } from '../config/appwrite';

import { useEffect, useState, useRef } from 'react';

function Todo() {
  const [items, setItems] = useState([]);
  const textInput = useRef(null);

  useEffect(() => {
    const unsubscribeListener = setDBListener();
    getItems();
    return () => {
      unsubscribeListener();
    }
  }, []);

  function getItems() {
    appwDatabases.listDocuments(
      DB_ID,
      COLLECTION_ID
    )
    .then(function (response) {
      setItems(response.documents);
    })
    .catch(function (error) {
      alert(error);
    });
  }

  function setDBListener() {
    return appwClient.subscribe('documents', (response) => {
      getItems();
    });
  }

  function add(e) {
    e.preventDefault();
    
    if(textInput.current.value.trim() === ''){
      alert('Not empty values allowed')
      return;
    }

    appwDatabases.createDocument(
      DB_ID,
      COLLECTION_ID,
      ID.unique(),
      { 'description': textInput.current.value }
    )
    .then(function (response) {
      textInput.current.value = '';
    })
    .catch(function (error) {
      alert(error);
    });
  }

  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Todo Item</Form.Label>
          <Form.Control ref={textInput} type="text" placeholder="Item text" />
        </Form.Group>
        <Button onClick={e => add(e)} variant="primary" type="submit">
          Add
        </Button>
      </Form>
      <ListGroup as="ol" numbered variant="flush">
        {items.map((item) =><ListGroup.Item key={item.$id.toString()}>{item.description}</ListGroup.Item>)}
      </ListGroup>
    </>
  )
}

export default Todo
