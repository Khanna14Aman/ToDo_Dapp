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
  const [id, setId] = useState(null);
  const deleteTask = async (e) => {
    e.preventDefault();
    if (!id) {
      alert("Please Provide full data");
      return;
    }
    try {
      await contract.deleteTask(id);
      onClose();
    } catch (error) {
      alert(error.reason);
    }
  };
  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={deleteTask}>
          <ModalContent>
            <ModalHeader>Delete Task</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Task ID</FormLabel>
                <Input
                  placeholder="Task ID"
                  type="number"
                  required
                  onChange={(e) => setId(e.target.value)}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="red" mr={3} type="Submit">
                Delete
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
