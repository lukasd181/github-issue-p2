import React from "react";
import { Button, Navbar, Form, FormControl } from "react-bootstrap";

let keyword;

const SearchBar = ({ setKeyword, handleSubmission }) => {
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>

        <Form
          inline
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmission();
          }}
        >
          <FormControl
            type="text"
            placeholder="Search"
            className="mr-sm-2"
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
          />
          <Button variant="outline-success" type="submit">
            Search
          </Button>
        </Form>
      </Navbar>
    </div>
  );
};

export default SearchBar;
