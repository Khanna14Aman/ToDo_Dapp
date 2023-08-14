import { Box } from "@chakra-ui/react";

const SingleTask = ({ task }) => {
  return (
    <>
      {task[2] && (
        <Box
          bg="tomato"
          w="70vw"
          ml="15vw"
          p={4}
          color="white"
          borderRadius="20px"
          mt="2vh"
          display="flex"
          justifyContent="space-between"
        >
          <Box>{`${task[2]})  ${task[0]}`}</Box>
          <Box>{task[1]}</Box>
        </Box>
      )}
    </>
  );
};

export default SingleTask;
