import React from "react";
import { Button, ButtonGroup, Form } from 'react-bootstrap';
function LoginPage() {

  function getUser() {
    console.log("Client: Getuser request");
    fetch('/api/users')
      .then((response) => response.json())
      .then((data) => console.log("Client: Received getuser data", data));
  }

  function addUser() {
    let username = prompt("Enter name")
    let hash_password = prompt("Enter password");
    let cash = prompt("Enter cash")
    fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, hash_password, cash })
    })
      .then(data => {
        alert(data);
        getUser();
      })
  }

  return (
    <div className="LoginPage">
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control type="email" placeholder="Username" />
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <ButtonGroup>
        <Button variant="primary" type="submit">
          Submit
       </Button>
       <Button variant="info">
         Guest mode
       </Button>

        </ButtonGroup>

      </Form>
    </div>
  );
}

export { LoginPage };
