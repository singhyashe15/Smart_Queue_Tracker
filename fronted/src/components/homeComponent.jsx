import React, { useState, useEffect } from "react";
import {Flex,Text,Button,HStack,VStack,Box,useBreakpointValue,Modal,ModalOverlay,ModalContent,ModalBody,ModalFooter,ModalHeader,useDisclosure,SimpleGrid,} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {Cards,Steps,Features,ImpactStats} from '../data/data.js'
const MotionBox = motion(Box);

const AnimatedCard = ({ id, title, content, activeCard }) => {
  const isActive = activeCard === id;

  return (
    <MotionBox
      p={[4, 6]}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="lg"
      cursor="pointer"
      bg={isActive ? "blue.500" : "white"}
      color={isActive ? "white" : "black"}
      animate={{
        scale: isActive ? 1.2 : 1,
        zIndex: isActive ? 2 : 1
      }}
      position="relative"
      w="300px"
      textAlign="center"
    >
      <Text fontSize={["lg", "2xl"]} fontWeight="bold">
        {title}
      </Text>
      <Text mt={2} fontSize={["sm", "lg"]}>
        {content}
      </Text>
    </MotionBox>
  );
};


export default function HomeComponent() {
  const [activeCard, setActiveCard] = useState(null);
  const StackComponent = useBreakpointValue({ base: VStack, md: HStack });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [step, setStep] = useState(0);

  useEffect(() => {
    const resetActiveCard = () => {
      // setActiveCard(null)
    };
    window.addEventListener("touchstart", resetActiveCard);
    window.addEventListener("click", resetActiveCard);
    return () => {
      window.removeEventListener("touchstart", resetActiveCard);
      window.removeEventListener("click", resetActiveCard);
    };
  }, []);

  const isLastStep = step === Steps.length - 1;

  const handleNext = () => {
    if (!isLastStep) setStep(step + 1);
    else onClose();
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <Flex direction="column" align="center" mt="16" px={4}>

      {/* Hero Section */}
      <Flex fontSize={["2xl", "5xl"]} fontFamily="cursive" color="teal.300" textAlign="center">
        Queue Less, Smile More
      </Flex>
      <Button colorScheme="red" px="8" py="4" borderRadius="lg" mt={4} onClick={onOpen}>
        See It Work
      </Button>

      {/* Role Selection */}
      <HStack mt="6" spacing={[2, 4]}>
        <Button onClick={() => setActiveCard(1)}>Customers</Button>
        <Button onClick={() => setActiveCard(2)}>Employees</Button>
      </HStack>

      <StackComponent mt="8" justify="center">
        {Cards.map((card) => (
          <AnimatedCard
            key={card.id}
            id={card.id}
            title={card.title}
            content={card.content}
            activeCard={activeCard}
          />
        ))}
      </StackComponent>

      {/* Features Section */}
      <Box mt="20" w="full" textAlign="center">
        <SimpleGrid columns={[1, null, 2]} spacing={8}>
          {Features.map((f, idx) => (
            <Box key={idx} p={6} border="1px solid #ddd" borderRadius="xl" boxShadow="md">
              <Text fontSize="4xl">{f.icon}</Text>
              <Text fontWeight="bold" mt={2}>{f.title}</Text>
              <Text mt={2}>{f.desc}</Text>
            </Box>
          ))}
        </SimpleGrid>
      </Box>

      {/* Stats */}
      <Box mt="20" textAlign="center">
        <HStack wrap="wrap" justify="center">
          {ImpactStats.map((s, idx) => (
            <Box key={idx} p={4} m={2} bg="gray.100" borderRadius="lg" w="150px" textAlign="center">
              <Text fontSize="2xl" fontWeight="bold" color="teal.600">{s.label}</Text>
              <Text fontSize="sm">{s.subLabel}</Text>
            </Box>
          ))}
        </HStack>
      </Box>

      {/* Modal Walkthrough */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent p={4} maxW="350px">
          <ModalHeader textAlign="center">{Steps[step].title}</ModalHeader>
          <ModalBody>
            <Text fontSize="md" textAlign="center">{Steps[step].description}</Text>
          </ModalBody>
          <ModalFooter justifyContent="space-between">
            <Button variant="ghost" onClick={onClose}>Skip</Button>
            <Box>
              {step > 0 && <Button onClick={handleBack} mr={3}>Back</Button>}
              <Button colorScheme="teal" onClick={handleNext}>{isLastStep ? "Finish" : "Next"}</Button>
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
