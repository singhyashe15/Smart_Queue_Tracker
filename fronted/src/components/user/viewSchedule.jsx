import React, { useEffect, useState } from "react";
import { Box, Button, Flex, HStack, VStack, Heading, Modal, ModalCloseButton, ModalContent, Icon, ModalOverlay, Text, useBreakpointValue, useDisclosure } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { Organisation } from "../../data/data.js";

export default function ViewShedule() {
  const [organisation, setOrganisation] = useState(null);
  const StackComponent = useBreakpointValue({ base: VStack, md: HStack })
  const [open, setOpen] = useState(false)
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { orgs } = useParams();

  useEffect(()=>{
    console.log(orgs)
  })
  const data = Organisation[orgs] || [];
  const navigate = useNavigate()

  useEffect(() => {
    const now = new Date(); // Get current date and time
    const hours = now.getHours(); // Get current hours (0-23)

    const ans = hours >= 8 & hours < 16; // Check if within 8 AM to 4 PM
    console.log(ans)
    if (ans === 1) {
      setOpen(true)
    } else {
      setOpen(false)
    }
  }, [])

  const handleAppointment = (name) => {
    setOrganisation(name)
    onOpen();
  }
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100vh" width="100vw" mt="16">
      <StackComponent>
        {data.map((item, index) => (
          <Flex
            key={index}
            direction="column"
            border="2px solid"
            borderColor="blue.400"
            borderRadius="lg"
            px="8"
            py="4"
            minW="300px"
          >
            <Text fontSize="xl" fontWeight="bold">
              {item.name}
            </Text>
            <HStack my="2">
              <Icon as={FaMapMarkerAlt} />
              <Text>{item?.location}</Text>
            </HStack>
            <HStack spacing={2} align="center" my="2">
              <Icon as={FaClock} boxSize={4} color="gray.500" />
              {item?.isOpen ? (
                <Text color="blue.500" fontWeight="500">Open</Text>
              ) : (
                <Text color="red.400" fontWeight="500">Closed</Text>
              )}
            </HStack>
            <Button my="2" onClick={() => handleAppointment(item.name)}>
              Book Appointment
            </Button>
          </Flex>
        ))}
      </StackComponent>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent h="30vh" maxW="350px">
          <ModalCloseButton />
          <Flex direction="column" p="8" textAlign="center">
            <Heading>Choose </Heading>
            <Button colorScheme='teal' px="16" m="4" onClick={() => navigate(`/appointment/${organisation}`)}>
              Book an Appointment
            </Button>
            <Button colorScheme='teal' p="4" m="4" onClick={() => navigate(`/viewStatus/${organisation}`)}>
              Check Live Queue Status
            </Button>
          </Flex>
        </ModalContent>
      </Modal>
    </Box>
  )
}
