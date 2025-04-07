import React, { useEffect, useState } from "react";
import { Box, Button, Flex, HStack, VStack, Heading, Modal, ModalCloseButton, ModalContent, Icon, ModalOverlay, Text, useBreakpointValue, useDisclosure } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FaClock ,FaMapMarkerAlt } from "react-icons/fa";

export default function ViewShedule() {
  const [organisation, setOrganisation] = useState(null);
  const StackComponent = useBreakpointValue({ base: VStack, md: HStack })
  const [open, setOpen] = useState(false)
  const { isOpen, onClose, onOpen } = useDisclosure();
  const navigate = useNavigate()

  useEffect(() => {
    const now = new Date(); // Get current date and time
    const hours = now.getHours(); // Get current hours (0-23)

    const ans = hours >= 8 & hours < 16; // Check if within 8 AM to 4 PM
    if (ans === true) {
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
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100vh" width="100vw">
      <StackComponent>
        <Flex direction="column" border="2px solid" borderColor="blue.400" borderRadius="lg" px="8" py="4">
          <Text>RAJBARI</Text>
          <HStack my="2">
            <Icon as={FaMapMarkerAlt } />
            <Text>Uttarpara,Uttarpara Kotrung(M)</Text>
          </HStack>
          <HStack spacing={2} align="center" my="2">
            <Icon as={FaClock} boxSize={4} color="gray.500"/>
            {
              open ? <Text color="blue.500" fontWeight="500">Open</Text> :
                <Text color="red.400" fontWeight="500">Closed</Text>
            }
          </HStack>
          <Button my="2" onClick={() => handleAppointment("rajbari")}>Book Appointment</Button>
        </Flex>
      </StackComponent>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent h="50vh">
          <ModalCloseButton />
          <Flex direction="column" p="8" textAlign="center">
            <Heading>Choose </Heading>
            <Button colorScheme='teal' px="16" m="4" onClick={() => navigate(`/appointment/${organisation}`)}>
              Book an Appointment
            </Button>
            <Button colorScheme='teal' p="4" m="4" onClick={() => navigate("/viewStatus")}>
              Check Live Queue Status
            </Button>
          </Flex>
        </ModalContent>
      </Modal>
    </Box>
  )
}
