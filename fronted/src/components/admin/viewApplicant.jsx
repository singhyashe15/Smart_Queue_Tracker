import React from "react"
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { VStack, Text, Button, Flex, Box, Circle, } from "@chakra-ui/react";
import { FaCheck } from "react-icons/fa";

export default function ViewApplicant() {
  const { organisation, department } = useParams();
  // const StackComponent = useBreakpointValue({ base: VStack, md: VStack })
  // Fetching the data of patient
  const fetchApplicant = async (organisation, department) => {
    const url = import.meta.env.VITE_SERVER_URL;
    const res = await axios.get(`${url}/adminapi/viewApplicant/${organisation}/${department}`);
    return res.status === 201 ? res.data.data : [];
  }

  const { data, isLoading } = useQuery({
    queryKey: ["viewapplicant"],
    queryFn: () => fetchApplicant(organisation, department)
  })

  const handleCheckUp = async () => {
    const url = import.meta.env.VITE_SERVER_URL;
    await axios.delete(`${url}/adminapi/deleteData`, {
      data: {
        id
      }
    })
  }

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100vh" width="100vw">
      <VStack>
        {data?.map((data, index) => (
          <Flex key={index} align="start" position="relative">
            <VStack spacing={0} mr={4}>
              <Circle
                size="20px"
              // border={step.status === "upcoming" ? "2px solid #ccc" : "none"}
              >
                {/* {step.status === "completed" && (
                  <FaCheck color="white" size="md" />
                )} */}
              </Circle>

              {/* Line below the circle */}
              {index !== data.length - 1 && (
                <Box
                  w="2px"
                  h="40px"
                  bg="gray.300"
                  ml="8px"
                  mt={1}
                />
              )}
            </VStack>

            {/* Content next to the circle */}
            <Box
              py={2}
              px={3}
              bg="green.50"
              borderRadius="md"
              minW="200px"
            >
              <Text fontWeight="semibold">Patient Name: {data?.name}</Text>
              <Text>{data?.age}</Text>
              <Text>{data?.date}</Text>
              <Text>{data?.appointment_time}</Text>
              <Button onClick={() => handleCheckUp(data?.id)}>HandleCheckUp</Button>
            </Box>
          </Flex>
        ))}
      </VStack>
    </Box>
  )
}