import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Wallet from "./components/Wallet";
import Task from "./components/Task";
import { NotFound } from "./components/NotFound";

function App() {
  const [contract, setContract] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/todo"
          element={<Task contract={contract} setContract={setContract} />}
        />
        <Route
          exact
          path="/"
          element={<Wallet setContract={setContract} contract={contract} />}
        />
        <Route
          exact
          path="/*"
          element={<NotFound contract={contract} setContract={setContract} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
