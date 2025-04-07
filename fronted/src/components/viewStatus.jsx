import React, { useEffect,useState } from "react";
import { Box, Spinner, useBreakpointValue, Flex, HStack, VStack, Button,Text, Icon } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaClock } from "react-icons/fa";


export default function ViewStatus() {
  const StackComponent = useBreakpointValue({ base: 'VStack', md: 'HStack' });
  const [open, setOpen] = useState(false)
  let user = null;
  useEffect(() => {
    user = localStorage.getItem("user");
    const now = new Date(); // Get current date and time
    const hours = now.getHours(); // Get current hours (0-23)

    const ans = hours >= 8 & hours < 16; // Check if within 8 AM to 4 PM
    if (ans === true) {
      setOpen(true)
    } else {
      setOpen(false)
    }
  }, [])

  const fetchStatus = async () => {
    const url = import.meta.env.VITE_SERVER_URL;
    console.log(user)
    const res = await axios.get(`${url}/userapi/livestaus/${id}`);

    return res.data.stauts === 201 ? res.data.data : [];
  }
  const { data, isPending } = useQuery({
    queryKey: ["liveStatus"],
    queryFn: () => fetchStatus(user.id),
    staleTime: 10000
  })

  if (isPending) {
    return (
      <VStack colorpalette="teal">
        <Spinner color="red.600" />
        <Text color="red.600">Loading...</Text>
      </VStack>
    )
  }

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100vh" width="100vw">
      <StackComponent>
        {
          data.data.rows.map((data) => {
            return (
              <Flex key={data?.id} direction="column" border="2px solid" borderColor="blue.400" borderRadius="lg" px="8" py="4">
                <Text>{data?.name}</Text>
                {/* <Text>Uttarpara,Uttarpara Kotrung(M)</Text> */}
                <HStack spacing={2} align="center">
                  <Icon as={FaClock} boxSize={4} color="gray.500" />
                  {
                    open ? <Text color="blue.500" fontWeight="500">Open</Text> :
                      <Text color="red.400" fontWeight="500">Closed</Text>
                  }
                </HStack>
                <StackComponent>
                  <Button>Live Status</Button>
                  <Button onClick={() => handleAppointment("rajbari")}>Cancel Appointment</Button>
                </StackComponent>
              </Flex>
            )
          })
        }
      </StackComponent>
    </Box>
  )
}