import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, useDisclosure } from "@chakra-ui/react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import ShowCreate from "./ShowCreate";
import ShowDelete from "./ShowDelete";
import ShowUpdate from "./ShowUpdate";
import SingleTask from "./SingleTask";
import ViewLoading from "./ViewLoading";

const Task = ({ contract, setContract }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!window.ethereum || !contract) {
      navigate("/");
    }
    window.ethereum.on("accountsChanged", () => {
      setContract(null);
    });
  });

  const [findValue, setFindValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tasks, setTasks] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    const getTask = async () => {
      try {
        setTasks(null);
        setLoading(true);
        let data = await contract.viewTask(); //We cannot sort data directly because we cannot change state. So we first take only array part and then sort it;
        let value = [...data];
        if (value.length > 0) {
          value.sort(function (a, b) {
            if (!a || !b) {
              return 0;
            }
            var datum = Date.parse(a[1]);
            var datum2 = Date.parse(b[1]);
            return datum - datum2;
          });
        }
        data = value;
        setLoading(false);
        setTasks(data);
      } catch (error) {
        setLoading(false);
        alert(error);
      }
    };
    contract && getTask();
  }, [contract, refresh]);
  return (
    <Box minH="100vh" bg="blackAlpha.900">
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>
            <Link to="/">TOOODO</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                onClick={() => {
                  setShowDelete(false);
                  setShowUpdate(false);
                  setShowCreate(true);
                  onOpen();
                }}
              >
                Create Task
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  setShowCreate(false);
                  setShowDelete(false);
                  setShowUpdate(true);
                  onOpen();
                }}
              >
                Update Task
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  setShowCreate(false);
                  setShowUpdate(false);
                  setShowDelete(true);
                  onOpen();
                }}
              >
                Delete Task
              </Nav.Link>
              <Form className="d-flex">
                <Form.Control
                  onChange={(e) => setFindValue(e.target.value)}
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
              </Form>
              <Button onClick={() => setRefresh(!refresh)}>Refresh Data</Button>
              <Button onClick={() => setShowAll(!showAll)}>
                {showAll ? "Show Only Upcoming Tasks" : "Show All Tasks"}
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {loading && <ViewLoading />}
      {showCreate && (
        <ShowCreate isOpen={isOpen} onClose={onClose} contract={contract} />
      )}
      {showUpdate && (
        <ShowUpdate isOpen={isOpen} onClose={onClose} contract={contract} />
      )}
      {showDelete && (
        <ShowDelete isOpen={isOpen} onClose={onClose} contract={contract} />
      )}
      {tasks &&
        tasks.map((task, id) => {
          if (task[0].toLowerCase().includes(findValue.toLowerCase())) {
            if (Date.now() >= Date.parse(task[1]) && !showAll) {
              return <></>;
            }
            return <SingleTask task={task} key={id} />;
          }
          return <></>;
        })}
    </Box>
  );
};

export default Task;
