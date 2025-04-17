import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  VStack,
  Text,
  Button,
  Flex,
  Box,
  Circle,
  Spinner,
  useToast,
  HStack,
  Badge,
  Icon,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaCheck, FaUserAlt } from "react-icons/fa";
import axios from "axios";

export default function ViewApplicant() {
  const { organisation, department } = useParams();
  const toast = useToast();

  const fetchApplicant = async (organisation, department) => {
    const url = import.meta.env.VITE_SERVER_URL;
    const res = await axios.get(`${url}/adminapi/viewApplicant/${organisation}/${department}`);
    return res.status === 201 ? res.data.data : [];
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["viewapplicant"],
    queryFn: () => fetchApplicant(organisation, department),
  });

  const handleCheckUp = async (id) => {
    try {
      const url = import.meta.env.VITE_SERVER_URL;
      await axios.delete(`${url}/adminapi/deleteData`, {
        data: { id },
      });
      toast({
        title: "Appointment Handled",
        description: "Patient record deleted successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const cardBg = useColorModeValue("white", "gray.700");
  const lineColor = useColorModeValue("gray.300", "gray.600");

  return (
    <Box p={6}>
      <Heading mb={6} textAlign="center">
        Appointment Queue
      </Heading>
      {isLoading ? (
        <Flex justify="center" align="center" h="60vh">
          <Spinner size="xl" />
        </Flex>
      ) : (
        <VStack align="stretch" spacing={6} mx="auto" maxW="lg">
          {data?.map((item, index) => (
            <Flex key={index} align="start" position="relative">
              <VStack spacing={0} mr={4} align="center">
                <Circle size="16px" bg="green.400" />
                {index !== data.length - 1 && <Box w="2px" h="50px" bg={lineColor} />}
              </VStack>

              <Box p={4} borderRadius="xl" boxShadow="md" bg={cardBg} w="100%">
                <HStack justify="space-between">
                  <HStack spacing={3}>
                    <Icon as={FaUserAlt} boxSize={5} color="teal.500" />
                    <Text fontSize="lg" fontWeight="bold">
                      {item?.name}
                    </Text>
                    <Badge colorScheme="purple">Age: {item?.age}</Badge>
                  </HStack>
                  <Button
                    size="sm"
                    colorScheme="teal"
                    leftIcon={<FaCheck />}
                    onClick={() => handleCheckUp(item?.id)}
                  >
                    Check-up Done
                  </Button>
                </HStack>
                <Text fontSize="sm" mt={2}>Date: {item?.date}</Text>
                <Text fontSize="sm">Time: {item?.appointment_time}</Text>
              </Box>
            </Flex>
          ))}
        </VStack>
      )}
    </Box>
  );
}
