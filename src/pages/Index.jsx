import React, { useState } from "react";
import { Container, VStack, HStack, Input, Button, Text, IconButton, Box } from "@chakra-ui/react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  const addTask = () => {
    if (taskInput.trim() !== "") {
      setTasks([...tasks, { text: taskInput, votes: 0 }]);
      setTaskInput("");
    }
  };

  const voteTask = (index, delta) => {
    const newTasks = [...tasks];
    newTasks[index].votes += delta;
    setTasks(newTasks);
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <HStack width="100%">
          <Input
            placeholder="Enter a new task"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
          />
          <Button onClick={addTask} colorScheme="teal">Add Task</Button>
        </HStack>
        <VStack spacing={4} width="100%">
          {tasks.map((task, index) => (
            <Box key={index} p={4} borderWidth="1px" borderRadius="lg" width="100%">
              <HStack justifyContent="space-between">
                <Text>{task.text}</Text>
                <HStack>
                  <IconButton
                    aria-label="Upvote"
                    icon={<FaThumbsUp />}
                    onClick={() => voteTask(index, 1)}
                  />
                  <Text>{task.votes}</Text>
                  <IconButton
                    aria-label="Downvote"
                    icon={<FaThumbsDown />}
                    onClick={() => voteTask(index, -1)}
                  />
                </HStack>
              </HStack>
            </Box>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;