import React, { useState, useEffect } from "react";
import {
  Flex,
  Text,
  Button,
  HStack,
  VStack,
  Box,
  useBreakpointValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalHeader,
  
  useDisclosure
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion.create(Box);

const AnimatedCard = ({ id, title, content, activeCard }) => {
  const isActive = activeCard === id;
console.log(activeCard + "" + id)
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
        zIndex: isActive ? 2 : 1,
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

const cards = [
  {
    id: 1,
    title: "Enhanced Customer Experiences",
    content:
      "Serve customers faster and give them back their time with a modern service experience."
  },
  {
    id: 2,
    title: "Simplified Employee Workflows",
    content:
      "Empower employees to focus on great service instead of crowded lobbies"
  }
];

const steps = [
  {
    title: "Welcome to Queue Management System",
    description:
      "A modern solution to help you skip the long lines and book appointments effortlessly."
  },
  {
    title: "Choose Your Role",
    description: "Are you a Customer or an Employee? Select accordingly to proceed."
  },
  {
    title: "Book an Appointment",
    description:
      "Fill in your details like name, email, organisation, department, and date accordingly. You'll receive a confirmation email along with a QR Code."
  },
  {
    title: "Scan QR Code on Visit",
    description:
      "Use the QR Code at the service center for easy check-in. No paperwork or waiting!"
  },
  {
    title: "Track Queue in Real-Time",
    description:
      "Admins and employees can view and manage the real-time queue easily from their dashboard."
  }
];

export default function HomeComponent() {
  const [activeCard, setActiveCard] = useState(null);
  const StackComponent = useBreakpointValue({ base: VStack, md: HStack });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [step, setStep] = useState(0);

  // 👇 Reset activeCard on screen tap or click
  useEffect(() => {
    const resetActiveCard = () =>{
      // setActiveCard(null)
      console.log("clicked")
    };
    window.addEventListener("touchstart", resetActiveCard);
    window.addEventListener("click", resetActiveCard); // also for desktop

    return () => {
      window.removeEventListener("touchstart", resetActiveCard);
      window.removeEventListener("click", resetActiveCard);
    };
  }, []);

  const isLastStep = step === steps.length - 1;

  const handleNext = () => {
    if (!isLastStep) setStep(step + 1);
    else onClose();
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <Flex
      gap={[2, 4]}
      direction="column"
      justify="center"
      align="center"
      mt="16"
      wrap="wrap"
    >
      <Flex
        fontSize={["2xl", "5xl"]}
        fontFamily="cursive"
        color="teal.300"
        textAlign="center"
      >
        Queue Less, Smile More
      </Flex>
      <Button colorScheme="red" px="8" py="4" borderRadius="lg" onClick={onOpen}>
        See It Work
      </Button>
      <HStack spacing={[2, 4]}>
        <Button onClick={() => setActiveCard(1)}>Customers</Button>
        <Button onClick={() => setActiveCard(2)}>Employees</Button>
      </HStack>
      <StackComponent mt="8" justify="center">
        {cards.map((card) => (
          <AnimatedCard
            key={card.id}
            id={card.id}
            title={card.title}
            content={card.content}
            activeCard={activeCard}
          />
        ))}
      </StackComponent>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent p={4} maxW="350px">
          <ModalHeader textAlign="center">{steps[step].title}</ModalHeader>
          <ModalBody>
            <Text fontSize="md" textAlign="center">
              {steps[step].description}
            </Text>
          </ModalBody>
          <ModalFooter justifyContent="space-between">
            <Button variant="ghost" onClick={onClose}>
              Skip
            </Button>
            <Box>
              {step > 0 && (
                <Button onClick={handleBack} mr={3}>
                  Back
                </Button>
              )}
              <Button colorScheme="teal" onClick={handleNext}>
                {isLastStep ? "Finish" : "Next"}
              </Button>
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
