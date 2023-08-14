import React, { useEffect } from "react";
import { Button, Center } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

export const NotFound = ({ contract, setContract }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!window.ethereum || !contract) {
      navigate("/");
    }
    window.ethereum.on("accountsChanged", () => {
      setContract(null);
    });
  });
  return (
    <>
      <Center
        bg="red.500"
        h="100vh"
        color="white"
        fontSize="20vh"
        pos="relative"
      >
        Page Not Found
        <Button
          pos="absolute"
          left="2vw"
          top="2vh"
          onClick={() => navigate("/todo")}
        >
          <ArrowBackIcon boxSize={6} />
        </Button>
      </Center>
    </>
  );
};
