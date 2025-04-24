import React, { useState } from "react";
import {Box,Flex,Avatar,Text,VStack,Heading,Divider,Button,SimpleGrid,Stat,StatLabel,StatNumber,HStack,} from "@chakra-ui/react";
import { BiLogOut } from "react-icons/bi";
import { FaUser, FaCalendarCheck, FaRupeeSign } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

export default function InteractiveDashboard() {
  const navigate = useNavigate();
  const {organisation} = useParams
  const [user,setUser] = useState(()=>{
    const saved = localStorage.getItem("user");
    return saved !== null ? JSON.parse(saved) : "";
  })

  const handleLogout = () => {
    localStorage.clear();
    navigate("/logout");
  };

  return (
    <Flex direction={{ base: "column", md: "row" }} height="100vh" width="100vw" justify="center" align="center">
      <VStack>
        {/* Left Profile Section */}
        <HStack w={{ base: "100%", md: "100%" }} p={6} boxShadow="md" spacing="10">
          <Box>
            <Avatar size="xl" name="Admin" />
          </Box>
          <Box>
            <Box>
              <Heading size="md">{user?.name}</Heading>
              <Text><strong>Role:</strong>{user?.role}</Text>
            </Box>
            <Divider />
            <VStack align="start" spacing={1}>
              <Text><strong>Organisation:</strong> Health Department</Text>
            </VStack>
            <Button
              leftIcon={<BiLogOut />}
              colorScheme="red"
              variant="outline"
              onClick={handleLogout}
              mt={4}
            >
              Logout
            </Button>
          </Box>
        </HStack>

        {/* Right Dashboard Section */}
        <Box flex="1" p={6}>
          <Heading size="lg" mb={6}>Dashboard Overview</Heading>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            <StatCard
              title="Total Users"
              value="245"
              icon={<FaUser />}
              bg="blue.100"
            />
            <StatCard
              title="Today’s Appointments"
              value="34"
              icon={<FaCalendarCheck />}
              bg="green.100"
            />
            <StatCard
              title="Total Revenue"
              value="₹10,400"
              icon={<FaRupeeSign />}
              bg="yellow.100"
            />
          </SimpleGrid>
        </Box>
      </VStack>
    </Flex>
  );
}

function StatCard({ title, value, icon, bg }) {
  return (
    <Stat
      p={4}
      rounded="md"
      shadow="md"
      bg={bg}
      display="flex"
      flexDirection="column"
      alignItems="start"
    >
      <Flex align="center" mb={2}>
        <Box mr={2}>{icon}</Box>
        <StatLabel fontWeight="bold">{title}</StatLabel>
      </Flex>
      <StatNumber fontSize="2xl">{value}</StatNumber>
    </Stat>
  );
}
