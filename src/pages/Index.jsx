import React, { useState, useEffect } from "react";
import { Container, VStack, HStack, Input, Button, Text, IconButton, Box, Select } from "@chakra-ui/react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

const Index = () => {
  useEffect(() => {
    const wrapper = document.getElementById("background-wrapper");
    wrapper.style.backgroundImage = "url('/images/cute-kittens.jpg')";
    wrapper.style.backgroundSize = "cover";
    wrapper.style.backgroundRepeat = "no-repeat";
    wrapper.style.backgroundPosition = "center center";
    wrapper.style.display = "flex";
    wrapper.style.justifyContent = "center";
    wrapper.style.alignItems = "center";
    return () => {
      wrapper.style.backgroundImage = "";
    };
  }, []);

  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryInput, setCategoryInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const addTask = () => {
    if (taskInput.trim() !== "" && selectedCategory !== "") {
      setTasks([...tasks, { text: taskInput, votes: 0, category: selectedCategory }]);
      setTaskInput("");
    }
  };

  const addCategory = () => {
    if (categoryInput.trim() !== "") {
      setCategories([...categories, categoryInput]);
      setCategoryInput("");
    }
  };

  const voteTask = (index, delta) => {
    const newTasks = [...tasks];
    newTasks[index].votes += delta;
    setTasks(newTasks);
  };

  return (
    <div id="background-wrapper" style={{ height: "100vh" }}>
      <Container 
        centerContent 
        maxW="container.md" 
        display="flex" 
        flexDirection="column" 
        justifyContent="center" 
        alignItems="center" 
        bg="rgba(255, 255, 255, 0.3)" 
        backdropFilter="blur(10px)" 
        borderRadius="10px" 
        p={4} 
        minH="50vh"
      >
        <VStack spacing={4} width="100%">
          <HStack width="100%">
            <Input
              placeholder="Enter a new category"
              value={categoryInput}
              onChange={(e) => setCategoryInput(e.target.value)}
            />
            <Button onClick={addCategory} colorScheme="blue">Add Category</Button>
          </HStack>
          <HStack width="100%">
            <Input
              placeholder="Enter a new task"
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
            />
            <Select placeholder="Select category" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </Select>
            <Button onClick={addTask} colorScheme="red">Add Task</Button>
          </HStack>
          <VStack spacing={4} width="100%">
            {categories.map((category, catIndex) => (
              <Box key={catIndex} p={4} borderWidth="1px" borderRadius="lg" width="100%">
                <Text fontSize="xl" fontWeight="bold">{category}</Text>
                {tasks.filter(task => task.category === category).map((task, index) => (
                  <Box key={index} p={4} borderWidth="1px" borderRadius="lg" width="100%" mt={2}>
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
              </Box>
            ))}
          </VStack>
        </VStack>
      </Container>
    </div>
  );
};

export default Index;