import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
const ShowCreate = ({ isOpen, onClose, contract }) => {
  const matchDate = async (date) => {
    const data = await contract.viewTask();
    for (var value of data) {
      if (value[1] === date) {
        return false;
      }
    }
    return true;
  };

  const [name, setName] = useState("");
  const [date, setDate] = useState(null);
  const createTask = async (e) => {
    e.preventDefault();
    if (!name || !date) {
      alert("Please provide full data");
      return;
    }
    try {
      const data = await matchDate(date);
      if (data) {
        await contract.create(name, date);
        onClose();
      } else {
        alert("This date is booked. Please choose other date");
      }
    } catch (error) {
      alert(error.reason);
    }
  };
  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={createTask}>
          <ModalContent>
            <ModalHeader>Add New Task</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Task Name</FormLabel>
                <Input
                  placeholder="Task"
                  required
                  onChange={(e) => setName(e.target.value)}
                />
                <FormLabel>Date</FormLabel>
                <Input
                  type="datetime-local"
                  required
                  onChange={(e) => setDate(e.target.value.toString())}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="Submit">
                Create
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </Box>
  );
};

export default ShowCreate;
