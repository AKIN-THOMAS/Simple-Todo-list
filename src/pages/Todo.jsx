import {
  Flex,
  FormControl,
  Heading,
  Input,
  InputGroup,
  Modal,
  ModalOverlay,
  useDisclosure,
  VStack,
  Button,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ListItem,
  OrderedList,
} from "@chakra-ui/react";
import React, { useState, useRef } from "react";

const Todo = () => {
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayOne />);

  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const errorRef = useRef(null);

  const changeHandler = (e) => {
    setTodo(e.target.value);
  };

  function submitHandler(e) {
    if (todo.length >= 3) {
      e.preventDefault();
      setTodoList((prev) => [
        ...prev,
        { id: new Date().getMilliseconds, todo: todo },
      ]);
      setTodo("");
      errorRef.current.textContent = "";
    } else {
      e.preventDefault();
      console.log("Error");
      errorRef.current.textContent = "Invalid entry!!";
    }
  }

  const renderList = todoList.map((value) => {
    return (
      <ListItem key={value.id}>
        {value.todo}
        <Button size={"xs"} colorScheme="red">
          Clear
        </Button>{" "}
        {/*There is no functionality for the clear button */}
        <Button
          size={"xs"}
          colorScheme="green"
          //   onClick={() => editTodoList(value.id, "Not working")} The edit button isn't working properly. I'll look into it.
        >
          Edit
        </Button>{" "}
        {/*There is no functionality for the edit button */}
      </ListItem>
    );
  });

  //   const editTodoList = (id, newTodo) => {
  //     setTodoList(
  //       todoList.map((todo) => {
  //         if (todo.id === id) {
  //           return { ...todo, todo: newTodo };
  //         }
  //         return todo;
  //       })
  //     );
  //   };

  return (
    <Flex minHeight={"100vh"} alignItems="center" justify={"center"}>
      <VStack as={"form"} onSubmit={submitHandler}>
        <Heading>TODO List</Heading>
        <FormControl>
          <InputGroup display={"flex"} flexDirection="column">
            <label>What do you want to do?</label>
            <Input
              placeholder="Enter Task"
              value={todo}
              onChange={changeHandler}
              marginTop={"20px"}
            />
            <span
              ref={errorRef}
              style={{ color: "red", textAlign: "center" }}
            ></span>
          </InputGroup>
        </FormControl>
        <Flex>
          <FormControl>
            <Button type="submit">Submit</Button>
          </FormControl>
          <Button
            ml="3"
            padding={"22px"}
            onClick={() => {
              setOverlay(<OverlayOne />);
              onOpen();
            }}
          >
            Open List
          </Button>
        </Flex>

        {/* This modal displays the list */}
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
          {overlay}
          <ModalContent>
            <ModalHeader>TODO List</ModalHeader>

            <ModalCloseButton />

            <ModalBody>
              <OrderedList>{renderList}</OrderedList>
            </ModalBody>

            <ModalFooter>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>
    </Flex>
  );
};

export default Todo;
