import React,{useState,useEffect} from "react";
import { Box, Flex, Avatar, Text, VStack, HStack, Stat, StatLabel, StatNumber, Icon, useBreakpointValue } from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const MotionBox = motion(Box);

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const StackDirection = useBreakpointValue({ base: "column", md: "row" });
   useEffect(() => {
      const storedUser = localStorage.getItem("user");
      if (storedUser !== null) {
        setUser(JSON.parse(storedUser))
      }
    }, [])

  const fetchTotal = async (id) => {
    try {
      const url = import.meta.env.VITE_SERVER_URL;
      const response = await axios.get(`${url}/userapi/totalAppointment/${id}`);
      if (response.status === 200 || response.status === 201) {
        return response.data.Count;
      }
    } catch (error) {
      console.error("Failed to fetch status:", error);
      return 0;
    }
  };

  const { data } = useQuery({
    queryKey: ["totalAppointment"],
    queryFn: () => fetchTotal(user.id),
    staleTime: 10000
  });

  return (
    <Flex direction={{ base: "column", md: "row" }} height="100vh" width="100vw" justify="center" align="center">
      <VStack w={{base:"md",md:"auto"}}>
      {/* Profile Section */}
        <MotionBox
          bg="white"
          boxShadow="lg"
          p={6}
          rounded="xl"
          mb={6}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          w="full"
          maxW="500px"
        >
          <HStack spacing={4}>
            <Avatar size="xl" name={user?.name} />
            <VStack align="start" spacing={1}>
              <Text fontSize="xl" fontWeight="bold">
                {user?.name}
              </Text>
              <Text fontSize="sm" color="gray.500" fontWeight="semibold">
                Welcome to Smart Queue Management System!
              </Text>
            </VStack>
          </HStack>
        </MotionBox>

        {/* Stats Section */}
        <Flex
          direction={StackDirection}
          gap={6}
          w="full"
          maxW="800px"
          justify="center"
          flexWrap="wrap"
        >
          <MotionBox
            as={Stat}
            p={5}
            bg="teal.50"
            boxShadow="base"
            rounded="2xl"
            minW="250px"
            whileHover={{ scale: 1.05 }}
            transition="0.3s"
          >
            <StatLabel fontWeight="bold">Total Appointments</StatLabel>
            <HStack justify="space-between">
              <StatNumber color="teal.500" fontSize="3xl">
                {data || 0}
              </StatNumber>
              <Icon as={FaCheckCircle} boxSize={6} color="teal.400" />
            </HStack>
          </MotionBox>

          {/* You can add more stats here */}
        </Flex>
      </VStack>
    </Flex>
  );
};

export default Dashboard;
