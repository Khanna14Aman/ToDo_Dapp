import "./App.css";
import { useEffect } from "react";
import ABI from "./abi.json";
import { ethers } from "ethers";
import axios from "axios";

function App() {
  const contractAddress = ABI.address;
  useEffect(() => {
    const getContract = async () => {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contracts = new ethers.Contract(contractAddress, ABI.abi, signer);
        console.log(contracts);

        // const data = await contracts.deleteTask(2);

        const data = await axios.get("http://localhost:1234/todo/viewTask");
        console.log(data);
        // const data = await axios.post("http://localhost:1234/todo/create", {
        //   date: "23/3/2322",
        // });
        // console.log(data);
        // if (data.data.message === "Yes") {
        //   await contracts.create("lucky", "23/3/2322");
        // } else {
        //   console.log("This date is booked");
        // }

        // const data = await axios.put("http://localhost:1234/todo/update", {
        //   date: "23/4/2322",
        // });
        // if (data.data.message === "Yes") {
        //   await contracts.update(2, "Lucky", "23/4/2322");
        // } else {
        //   console.log("date is booked");
        // }
      } catch (error) {
        console.log(error);
      }
    };
    getContract();
  }, []);

  return <div className="App">hello</div>;
}

export default App;
