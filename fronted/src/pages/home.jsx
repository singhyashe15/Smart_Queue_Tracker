import React, { useEffect, useState } from "react";
import { Box, HStack, Link, Flex, Drawer, DrawerOverlay, DrawerCloseButton, DrawerBody, DrawerHeader, DrawerContent, IconButton, useDisclosure, VStack } from "@chakra-ui/react";
import HomeComponent from "../components/homeComponent";
import UserComponent from "../components/userComponent";
import AdminComponent from "../components/adminComponent";
import { FaBars } from "react-icons/fa";
export default function Home() {
  const [user, setUser] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Parse JSON data
    }
  }, []);

  return (
    <Flex minH="100vh" w="100vw" direction="column">
      {/* Navigation Bar */}
      <HStack as="nav" py={[2, 4]} px={[4, 8]} spacing={[2, 4]} justify="space-between" bgColor="blue.500" position="fixed" top={0} left={0} right={0} zIndex={1000}>
        {/* Logo or Brand Name */}
        <Link fontSize={["lg", "xl"]} fontWeight="bold">
          MyApp
        </Link>

        {/* Navigation Links */}
        {user === null && <HStack spacing={5} display={{ base: "none", md: "flex" }}>
          <Link variant="plain" href="/admin" _hover={{ color: 'white' }} color="white">Admin</Link>
          <Link variant="plain" href="/register" _hover={{ color: 'white' }} color="white">Register</Link>
          <Link variant="plain" href="/login" _hover={{ color: 'white' }} color="white">Login</Link>
        </HStack>
        }
        {
          user?.id >= 0 &&
          <HStack>
            <Link variant="plain" href="/" _hover={{ color: 'white' }} color="white">Logout</Link>
          </HStack>
        }

        <IconButton
          display={{ base: "flex", md: "none" }}
          icon={<FaBars />}
          variant="ghost"
          aria-label="Open Menu"
          onClick={onOpen}
        />
      </HStack>

      {/* Mobile Menu Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent h="50vh" maxW="200px">
          <DrawerCloseButton />
          {user !== null &&<DrawerHeader>Hey,{user?.name}</DrawerHeader>}
          <DrawerBody>
            {user != null && <Link display="block" mb={2} href="/login">Logout</Link>}
            {user === null &&
              <VStack align="left" spacing="4" pt="8">
                <Link variant="plain" href="/admin"  >Admin</Link>
                <Link variant="plain" href="/register" >Register</Link>
                <Link variant="plain" href="/login"  >Login</Link>
              </VStack>
            }
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Conditional Rendering Based on User Role */}
      <Flex align="center" justify="center">
        {!user ? (
          <HomeComponent />
        ) : user.role === "user" ? (
          <UserComponent />
        ) : (
          <AdminComponent />
        )}
      </Flex>
    </Flex>
  );
}
