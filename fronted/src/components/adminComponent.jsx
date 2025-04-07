import React, { useState } from "react";
import { Box, Card, Flex, Heading, CardBody, Stack, Text, Tag, TagLabel, TagLeftIcon,Image, useDisclosure, Modal, ModalOverlay, ModalContent, ModalCloseButton, Input, ModalHeader, Button, Spinner, useStepContext } from "@chakra-ui/react";
// import { FaHeartbeat, FaHandHoldingMedical, FaUserMd } from "react-icons/fa";
import { RiShieldCheckFill } from 'react-icons/ri';
import axios from "axios";
import toast from "react-hot-toast";

const Bank = [
  { name: "PNB",pic:'/images/pnb.png' },
  { name: "BOB",pic:'/images/bob.png' },
  { name: "SBI",pic:'/images/sbi.png' },
  { name: "UCO",pic:'/images/uco.png' }
];

const Government = [
  { name: "SDO/BDO" },
  { name: "LICENSE" }
];

const Hospital = [
  { name: "RAJBARI" },
  { name: "MAHAMAYA" },
  { name: "WE CARE" }
];

const sub_dept = {
  Bank, Hospital, Government
}

export default function AdminComponent() {
  const [key, setKey] = useState(null);
  const [organisation, setOrganisation] = useState(null);
  const [department, setDepartment] = useState(null);
  const { onOpen, isOpen, onClose } = useDisclosure()
  const [loading, setLoading] = useState(false);


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
      const department = res.data.organisation;
      setDepartment(department)
      setOrganisation(organisation)
      toast.success(res.data.msg)
      onClose();
    } else {
      toast.error("Not Verified, Check Your Code")
    }
  }

  return (
    <Flex direction="column" align="center" justify="center">
      <Tag size="md" variant='subtle' colorScheme='cyan' onClick={() => onOpen()}>
        <TagLeftIcon boxSize='12px' as={RiShieldCheckFill} />
        <TagLabel>Verify</TagLabel>
      </Tag>
      {organisation !== null &&
        <>
          <Heading>Welcome to {department} Management System</Heading>
          {sub_dept[organisation].map((index, dept) => {
            console.log(dept.pic)
            return (
              <Card maxW="sm" key={index}>
                <CardBody>
                  <Stack mt="6" spacing="3" align="center">
                    <Box border="1px solid #ccc" p={4} borderRadius="md" boxShadow="md">
                      <Image src={dept.pic} alt="PNB Logo" boxSize="80px" objectFit="contain" />
                      <Text mt={2} fontWeight="bold">{dept.name}</Text>
                    </Box>
                  </Stack>
                </CardBody>
              </Card>
            )
          })
          }
        </>
      }

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent h="50vh">
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