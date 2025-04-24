import React, { useState } from "react";
import {
  Card, Flex, Heading, CardBody, Text, Tag, TagLabel, TagLeftIcon, IconButton,useDisclosure, Modal, ModalOverlay, ModalContent, ModalCloseButton,Input, ModalHeader, Button, useBreakpointValue,VStack, HStack, CardFooter, Icon, Tooltip} from "@chakra-ui/react";
import { FaTimesCircle, FaHeartbeat, FaComments } from "react-icons/fa";
import { RiShieldCheckFill } from 'react-icons/ri';
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Bank, Government, Hospital, sub_dept } from "../../data/data.js";
import { motion } from "framer-motion";
const MotionIconButton = motion(IconButton);

export default function AdminComponent() {
  const [key, setKey] = useState(() => {
    const saved = localStorage.getItem("detail");
    return saved !== null ? JSON.parse(saved).key : "";
  });
  const [organisation, setOrganisation] = useState(() => {
    const saved = localStorage.getItem("detail");
    return saved !== null ? JSON.parse(saved).organisation : null;
  });

  const { onOpen, isOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const StackComponent = useBreakpointValue({ base: VStack, md: HStack });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!key) {
      toast.error("Please enter a code.");
      return;
    }
    setLoading(true);
    try {
      const serverUrl = import.meta.env.VITE_SERVER_URL;
      const res = await axios.post(`${serverUrl}/adminapi/fetchKey`, key, {
        headers: { 'Content-Type': 'text/plain' }
      });

      if (res.data.success === true) {
        const organisation = res.data.organisation;
        const detail = JSON.stringify({ key, organisation });
        localStorage.setItem("detail", detail);
        setOrganisation(organisation);
        setLoading(false);
        toast.success(res.data.msg);
        onClose();
      } else {
        toast.error("Not Verified, Check Your Code");
        setLoading(false);
      }
    } catch (error) {
      toast.error("Server Error. Try again later.");
      setLoading(false);
    }
  };

  return (
    <Flex direction="column" align="center" justify="center" height="100vh" width="100vw" mt="16" px={4}>
      <Tag
        size="lg"
        variant='solid'
        colorScheme={organisation ? 'green' : 'red'}
        cursor="pointer"
        onClick={onOpen}
        mb={4}
      >
        <TagLeftIcon boxSize='14px' as={organisation ? RiShieldCheckFill : FaTimesCircle} />
        <TagLabel>{organisation ? "Verified" : "Verify Admin Access"}</TagLabel>
      </Tag>

      {organisation && (
        <>
          <Heading mb={6} textAlign="center" fontSize="2xl">
            Welcome to {organisation} Management System
          </Heading>

          <StackComponent spacing={6} flexWrap="wrap" justify="center">
            {sub_dept[organisation]?.map((dept, index) => (
              <Card width="250px" key={index} shadow="lg" borderWidth="1px">
                <CardBody>
                  <Icon as={FaHeartbeat} boxSize="6" color="red.500" mb={2} />
                  <Text fontWeight="semibold" fontSize="lg">{dept.name}</Text>
                </CardBody>
                <CardFooter justifyContent="space-between">
                  <Button
                    variant="outline"
                    colorScheme="blue"
                    onClick={() => navigate(`/viewApplicant/${organisation}/${dept.name}`)}
                  >
                    View
                  </Button>
                  <Button colorScheme="teal">Join</Button>
                </CardFooter>
              </Card>
            ))}
          </StackComponent>
        </>
      )}

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent maxW="350px">
          <ModalHeader>Enter Admin Code</ModalHeader>
          <ModalCloseButton />
          <Flex direction="column" gap={4} px={6} py={4}>
            <Input
              placeholder="Enter Code"
              value={key}
              onChange={(e) => setKey(e.target.value)}
            />
            <Button
              colorScheme="blue"
              onClick={handleSubmit}
              isLoading={loading}
              loadingText="Verifying"
            >
              Verify
            </Button>
          </Flex>
        </ModalContent>
      </Modal>
      <Tooltip label="Dashboard" placement="left">
        <MotionIconButton
          icon={<FaComments />}
          colorScheme="teal"
          size="lg"
          rounded="full"
          onClick={()=>navigate(`/admindashboard/${organisation}`)}
          whileHover={{ scale: 1.1 }}
          boxShadow="xl"
          position="fixed"
          bottom="30px"
          right="30px"
        />
      </Tooltip>
    </Flex>
  );
}
