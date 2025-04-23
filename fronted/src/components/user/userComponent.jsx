import React, { useState } from "react";
import { Box, Flex, HStack, Card, Stack, VStack, Spacer, CardBody, useBreakpointValue, Text, Icon, Tooltip, IconButton, useDisclosure, Modal, ModalBody, ModalHeader, ModalCloseButton, ModalContent, ModalOverlay, ModalFooter, Button, Input } from "@chakra-ui/react";
import { FaComments, FaArrowUp } from 'react-icons/fa';
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { CardProduct } from '../../data/data.js'
import axios from 'axios'

const MotionIconButton = motion(IconButton);
const MotionBox = motion(Box);

const customQ = [
  { ques: "how to login" },
  { ques: "book.*appointment" },
  { ques: "cancel.*appointment" },
  { ques: "how long.*wait" },
  { ques: "queue status" }
]

export default function UserComponent() {
  const [input, setInput] = useState(false);
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState("");
  const StackComponent = useBreakpointValue({ base: VStack, md: HStack });
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate();

  const handlePrompt = (e) => {
    setPrompt(e.target.value)
  };

  const handleSubmit = async () => {
    const userMessage = { sender: 'user', text: prompt };
    setMessages([...messages, userMessage]);
    setPrompt("");
    const serverUrl = import.meta.env.VITE_SERVER_URL;

    try {
      const res = await axios.post(`${serverUrl}/userapi/chat`, {
        prompt: prompt,
      });

      const botMessage = { sender: 'bot', text: res.data.reply };
      setMessages(prev => [...prev, botMessage]);

      return res.data.msg; // ✅ return the response message
    } catch (error) {
      if (error.status === 402) {
        const botMessage = { sender: 'bot', text: "Fill the query first !!" };
        setMessages(prev => [...prev, botMessage]);
      }
      console.error("Chat Error:", error);
      return "Sorry, something went wrong.";
    }
  };

  const handleroute = () => {
    navigate("/viewSchedule");
  };

  return (
    <Flex align="center" justify="center" w="full" mt="20">
      <StackComponent spacing={4}>
        {CardProduct.map((product) => (
          <MotionBox
            key={product.id}
            w="250px"
            p={4}
            borderWidth="md"
            borderRadius="lg"
            boxShadow="lg"
            bg="blue.500"
            cursor="pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={() => handleroute()} // Click anywhere on the box to navigate
          >
            <Card maxW="sm">
              <CardBody>
                <Stack mt="6" spacing="3" align="center">
                  <Icon as={product.icon} boxSize={8} color="teal.300" />
                  <Text fontSize="xl" fontWeight="bold">
                    {product.name}
                  </Text>
                </Stack>
              </CardBody>
            </Card>
          </MotionBox>
        ))}
      </StackComponent>

      <Box position="fixed" bottom="30px" right="30px" zIndex="10">
        <Tooltip label="Ask Bot" placement="left">
          <MotionIconButton
            icon={<FaComments />}
            colorScheme="teal"
            borderRadius="full"
            size="lg"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Chatbot"
            boxShadow="lg"
            onClick={() => onOpen()}
          />
        </Tooltip>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} position="fixed">
        <ModalOverlay />
        <ModalCloseButton />
        <ModalContent p={4} maxW="350px" maxH="600px">
          <ModalHeader textAlign="center" bg="gray.200" rounded="full">Chat Bot</ModalHeader>
          <ModalBody >
            <VStack
              flex="1"
              spacing={3}
              p={4}
              overflowY="auto"
              align="stretch"
              bg="gray.50"
            >
              {messages.map((msg, idx) => (
                <Flex
                  key={idx}
                  alignSelf={msg.sender === "user" ? "flex-end" : "flex-start"}
                  maxW="80%"
                  bg={msg.sender === "user" ? "teal.100" : "gray.200"}
                  borderRadius="md"
                  p={3}
                  boxShadow="sm"
                >
                  {msg.sender === "bot"}<Text fontWeight="semibold">Bot</Text>
                  <Text>{msg.text}</Text>
                </Flex>
              ))}

              {messages.length === 0 && !input &&
                <VStack p="4" cursor="pointer" spacing="4" >
                  {
                    customQ.map((question, index) => (

                      <Box key={index} p="4" bg="gray.300" rounded="full" >{question.ques}</Box>
                    ))
                  }
                  <Box p="4" bg="gray.300" rounded="full" onClick={() => setInput(true)}>Others</Box>
                </VStack>
              }
              <Spacer />
            </VStack>
          </ModalBody>
          {input &&
            <ModalFooter justifyContent="space-between" bg="transparent" border="1px" borderColor="black" rounded="full">
              <Input border="none" focusBorderColor="transparent" value={prompt} onChange={handlePrompt} />
              <IconButton
                icon={<FaArrowUp />}
                bg="gray.300"
                rounded="full"
              />
            </ModalFooter>}
        </ModalContent>
      </Modal>
    </Flex>
  );
}
