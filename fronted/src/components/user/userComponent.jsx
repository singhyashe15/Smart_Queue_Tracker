import React, { useState } from "react";
import { Box, Flex, VStack, HStack, Text, IconButton, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Button, Tooltip, useBreakpointValue, Card, CardBody } from "@chakra-ui/react";
import { FaComments, FaArrowUp } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { customQ,Appointment,CardProduct } from "../../data/data.js";

const MotionIconButton = motion(IconButton);
const MotionBox = motion(Box);

export default function UserComponent() {
  const stepKeys = ["name", "email", "age", "postalCode", "organisation", "department", "date"];
  const [data, setData] = useState({ name: "", email: "", age: "", postalCode: 0, organisation: "", department: "", date: "" });
  const [input, setInput] = useState(false);
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [step, setStep] = useState(0);
  const StackComponent = useBreakpointValue({ base: VStack, md: HStack });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const handleBotReply = () => {
    setMessages((prev) => [...prev, { sender: "bot", text: Appointment[step].prompt }]);
    setStep((prev) => prev + 1);
  };

  const handleSubmit = async (msg) => {
    const userMessage = { sender: "user", text: msg };
    setMessages((prev) => [...prev, userMessage]);
    setPrompt("");
    const serverUrl = import.meta.env.VITE_SERVER_URL;

    try {
      const res = await axios.post(`${serverUrl}/userapi/chat`, { prompt: msg });
      const botMessage = { sender: "bot", text: res.data.reply };
      setMessages((prev) => [...prev, botMessage]);
      setInput(true)
    } catch (error) {
      const botMessage = { sender: "bot", text: "Something went wrong. Please try again." };
      setMessages((prev) => [...prev, botMessage]);
    }
  };

  const handleData = async (prompt) => {
    setMessages((prev) => [...prev, { sender: "user", text: prompt }]);
    if (prompt === 'y') {
      console.log(data)
      setPrompt("");
      try {
        const serverUrl = import.meta.env.VITE_SERVER_URL;
        const res = await axios.post(`${serverUrl}/userapi/appointment`, data);
        setMessages((prev) => [...prev, { sender: "bot", text: res.data.msg }]);
      } catch (error) {
        console.log(error)
        setMessages((prev) => [...prev, { sender: "bot", text: "Provided email not Found" }]);
      }
    } else {
      setData(prev => ({
        ...prev,
        [stepKeys[step - 1]]: prompt
      }));
      setPrompt("");
      handleBotReply();
    }
  }

  const handlePrompt = (e) => {
    setPrompt(e.target.value)
  }
  const handleroute = () => navigate("/viewSchedule");


  return (
    <Flex direction="column" align="center" p={6} gap={8} mt="10">
      <StackComponent spacing={6} wrap="wrap" justify="center">
        {CardProduct.map((product) => (
          <MotionBox
            key={product.id}
            as={Card}
            maxW="xs"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleroute}
            cursor="pointer"
            bg="white"
            boxShadow="lg"
            rounded="2xl"
            p={5}
          >
            <CardBody>
              <VStack spacing={3} align="center">
                <Box as={product.icon} boxSize={10} color="teal.400" />
                <Text fontSize="lg" fontWeight="bold" color="gray.700">
                  {product.name}
                </Text>
              </VStack>
            </CardBody>
          </MotionBox>
        ))}
      </StackComponent>

      <Tooltip label="Chat with Bot" placement="left">
        <MotionIconButton
          icon={<FaComments />}
          colorScheme="teal"
          size="lg"
          rounded="full"
          onClick={onOpen}
          whileHover={{ scale: 1.1 }}
          boxShadow="xl"
          position="fixed"
          bottom="30px"
          right="30px"
        />
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose} size="sm" motionPreset="slideInBottom">
        <ModalOverlay />
        <ModalContent rounded="xl" overflow="hidden" p={4} maxW="350px" maxH="800px">
          <ModalHeader textAlign="center" bg="gray.100">AI Chat Bot</ModalHeader>
          <ModalBody>
            <VStack align="stretch" spacing={3} overflowY="auto" mt="4">
              <Flex
                alignSelf="flex-start"
                direction="column"
                maxW="80%"
                bg="gray.100"
                p={3}
                rounded="lg"
                boxShadow="base"
              >

                <Text fontSize="sm" fontWeight="semibold" color="gray.600">
                  Bot
                </Text>

                <Text>Hi, I'm QareBot!
                  Here are the queries I can help you with:</Text>
              </Flex>
              {messages.map((msg, idx) => (
                <Flex
                  key={idx}
                  alignSelf={msg.sender === "user" ? "flex-end" : "flex-start"}
                  direction="column"
                  maxW="80%"
                  bg={msg.sender === "user" ? "teal.100" : "gray.100"}
                  p={3}
                  rounded="lg"
                  boxShadow="base"
                >
                  {msg.sender === "bot" && (
                    <Text fontSize="sm" fontWeight="semibold" color="gray.600">
                      Bot
                    </Text>
                  )}
                  <Text>{msg.text}</Text>
                </Flex>
              ))}

              {!input && messages.length === 0 && (
                <VStack spacing={3}>
                  {customQ.map((q, i) => (
                    <Button
                      key={i}
                      colorScheme="gray"
                      size="sm"
                      onClick={() => handleSubmit(q.ques)}
                    >
                      {q.ques}
                    </Button>
                  ))}
                  <Button size="sm" colorScheme="teal" onClick={() => { setInput(true), handleBotReply() }} >
                    Wanna need Appointment
                  </Button>
                </VStack>
              )}


            </VStack>
          </ModalBody>
          {input && (
            <ModalFooter as={Flex} gap={2}>
              <Input
                placeholder="Type your message..."
                value={prompt}
                onChange={handlePrompt}
                flex={1}
                rounded="full"
              />
              <IconButton
                icon={<FaArrowUp />}
                onClick={() => handleData(prompt)}
                colorScheme="teal"
                rounded="full"
              />
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    </Flex>
  );
}
