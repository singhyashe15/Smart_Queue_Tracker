import React, { useState } from "react";
import {  Card, Flex, Heading, CardBody, Stack, Text, Tag, TagLabel, TagLeftIcon, useDisclosure, Modal, ModalOverlay, ModalContent, ModalCloseButton, Input, ModalHeader, Button, Spinner, useBreakpointValue, VStack, HStack, CardFooter, Icon } from "@chakra-ui/react";
import { FaTimesCircle, FaHeartbeat } from "react-icons/fa";
import { RiShieldCheckFill } from 'react-icons/ri';
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Bank = [
  { name: "Customer Service" },
  { name: "Cash Deposit & Withdrawal Counters" },
  { name: "Loan Department" },
  { name: "Locker Services" }
];

const Government = [
  { name: "Regional Transport Office" },
  { name: "Passport Seva Kendra" },
  { name: "Municipal Corporations" },
  { name: "Income Tax" }
];

const Hospital = [
  { name: "OPD" },
  { name: "Diagnostic & Lab Services" },
  { name: "Vaccination Center / Immunization Unit" }
];

const sub_dept = {
  Bank, Hospital, Government
}

export default function AdminComponent() {
  const [key, setKey] = useState(() => {
    const saved = localStorage.getItem("detail");
    return saved !== null ? JSON.parse(saved).key : null;
  });
  const [organisation, setOrganisation] = useState(() => {
    const saved = localStorage.getItem("detail");
    return saved !== null ? JSON.parse(saved).organisation : null;
  });
  const { onOpen, isOpen, onClose } = useDisclosure()
  const [loading, setLoading] = useState(false);
  const StackComponent = useBreakpointValue({ base: VStack, md: HStack })
  const navigate = useNavigate()
  const handleSubmit = async () => {

    setLoading(true)
    const serverUrl = import.meta.env.VITE_SERVER_URL;
    const res = await axios.post(`${serverUrl}/adminapi/fetchKey`, key, {
      headers: {
        'Content-Type': 'text/plain'
      }
    })

    if (res.data.success === true) {
      const organisation = res.data.organisation;
      // const department = res.data.organisation;
      localStorage.setItem("detail", { key, organisation })
      setLoading(false)
      toast.success(res.data.msg)
      onClose();
    } else {
      toast.error("Not Verified, Check Your Code")
    }
  }

  return (
    <Flex direction="column" align="center" justify="center" mt="16">
      <Tag size="md" variant='subtle' colorScheme='cyan' cursor="pointer" onClick={() => onOpen()}>
        <TagLeftIcon boxSize='12px' as={organisation === null ? FaTimesCircle : RiShieldCheckFill} />
        <TagLabel>Verify</TagLabel>
      </Tag>
      {organisation !== null &&
        <>
          <Heading>Welcome to {organisation} Management System</Heading>
          <StackComponent>
            {sub_dept[organisation]?.map((index, dept) => {
              return (
                <Card width="220px" key={index} >
                  <CardBody>
                    <Icon as={FaHeartbeat} boxSize="6" color="red.500" />
                    <Text>{dept?.name}</Text>
                  </CardBody>
                  <CardFooter justifyContent="flex-end">
                    <HStack spacing="4">
                      <Button variant="outline" onClick={navigate(`/viewApplicant/${organisation}/${dept?.name}`)}>View</Button>
                      <Button>Join</Button>
                    </HStack>
                  </CardFooter>
                </Card>
              )
            }
            )}
          </StackComponent>
        </>
      }

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent h="50vh" maxW="350px">
          <ModalHeader>Enter the Details</ModalHeader>
          <ModalCloseButton />
          <Flex direction="column" justify="center" align="center" p="4">
            <Input placeholder="Enter Code" name="key" onChange={(e) => setKey(e.target.value)} />
            <Button leftIcon={loading && <Spinner size={20} />} onClick={handleSubmit}>
              {loading ? "Verifying" : "Verify"}
            </Button>
          </Flex>
        </ModalContent>
      </Modal>
    </Flex>
  )
}