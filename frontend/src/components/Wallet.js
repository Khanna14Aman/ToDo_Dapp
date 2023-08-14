import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ethers } from "ethers";
import ABI from "../abi.json";
import { Box, Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

const Wallet = ({ setContract, contract }) => {
  const toast = useToast();
  const contractAddress = ABI.address;
  const navigate = useNavigate();
  useEffect(() => {
    if (window.ethereum && contract) {
      navigate("/todo");
    }
  });
  const getContract = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contracts = new ethers.Contract(contractAddress, ABI.abi, signer);
        setContract(contracts);
        navigate("/todo");
      } catch (error) {
        console.log(error);
      }
    } else {
      toast({
        title: "No MetaMask",
        description: "Please Install MetaMask to get connected.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };
  return (
    <Box
      bg={"gray.500"}
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Button colorScheme="teal" onClick={getContract}>
        Connect to Contract
      </Button>
    </Box>
  );
};

export default Wallet;
