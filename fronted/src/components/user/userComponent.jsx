import React from "react";
import { Box, Flex, HStack, Card, Stack, VStack, CardBody, useBreakpointValue, Text, Icon } from "@chakra-ui/react";
import { FaLandmark, FaPiggyBank, FaSchool, FaShopify } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const MotionBox = motion(Box);

const CardProduct = [
  { id: 1, name: "Government", icon: FaLandmark },
  { id: 2, name: "Institutions", icon: FaSchool },
  { id: 3, name: "Bank", icon: FaPiggyBank },
  { id: 4, name: "Shop", icon: FaShopify }
];

export default function UserComponent() {
  const StackComponent = useBreakpointValue({ base: VStack, md: HStack });
  const navigate = useNavigate();

  const handleroute = () => {
    console.log("Navigating...");
    navigate("/viewSchedule");
  };

  return (
    <Flex align="center" justify="center" w="full" mt="20">
      <StackComponent spacing={4}>
        {CardProduct.map((product) => (
          <MotionBox
            key={product.id}
            w="250px"
            p={4}
            borderWidth="md"
            borderRadius="lg"
            boxShadow="lg"
            bg="blue.500"
            cursor="pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={()=>handleroute()} // Click anywhere on the box to navigate
          >
            <Card maxW="sm">
              <CardBody>
                <Stack mt="6" spacing="3" align="center">
                  <Icon as={product.icon} boxSize={8} color="teal.300" />
                  <Text fontSize="xl" fontWeight="bold">
                    {product.name}
                  </Text>
                </Stack>
              </CardBody>
            </Card>
          </MotionBox>
        ))}
      </StackComponent>
    </Flex>
  );
}
