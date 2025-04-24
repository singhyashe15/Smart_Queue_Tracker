import React, { useEffect,useState } from "react";
import { Box, Spinner, useBreakpointValue, Flex, HStack, VStack, Button,Text, Icon } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaClock } from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


export default function ViewStatus() {
  const StackComponent = useBreakpointValue({ base: VStack, md: HStack });
  const [open, setOpen] = useState(false)
  const [user,setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if(storedUser !== null){
      setUser(JSON.parse(storedUser))
    }
    console.log(user)
    const now = new Date(); // Get current date and time
    const hours = now.getHours(); // Get current hours (0-23)

    const ans = hours >= 8 & hours < 16; // Check if within 8 AM to 4 PM
    console.log(ans)
    if (ans === 1) {
      setOpen(true)
    } else {
      setOpen(false)
    }
  }, [])

  const fetchStatus = async (id) => {
    const url = import.meta.env.VITE_SERVER_URL;
    console.log(url)
    const res = await axios.get(`${url}/userapi/liveStatus/${id}`);
    console.log(res)
    return res.status === 201 ? res.data.data : [];
  };
  
  const { data,isLoading } = useQuery({
    queryKey: ["liveStatus"],
    queryFn: () => fetchStatus(user.id),
    staleTime: 10000
  });

  // const checkLiveStatus = ()=>{

  // }

  const handleAppointment =async (dept)=>{
    const serverUrl = import.meta.env.VITE_SERVER_URL;
    const id = user.id
    try {
      const res = await axios.delete(`${serverUrl}/userapi/deleteAppointment`,{
        data:{
          dept:"Cardiologist",
          id:"11"
        }
      },{
        headers: {
          'Content-Type': 'application/json'
        }
      })
  
      if(res.data.success){
        toast.success(res.data.msg);
        navigate('/')
      }else{
        toast.error(res.data.msg)
      }
    } catch (error) {
      if(error.response?.status === 403){
        toast.error(error.response.data.msg)
      }
    }
  }
  if (isLoading) {
    return (
      <VStack display="flex" justifyContent="center" alignItems="center" height="100vh" width="100vw"colorpalette="teal">
        <Spinner color="red.600" />
        <Text color="red.600">Loading...</Text>
      </VStack>
    )
  }

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100vh" width="100vw">
      <StackComponent>
        {
          data?.map((data) => {
            return (
              <Flex key={data?.id} direction="column" border="2px solid" borderColor="blue.400" borderRadius="lg" px="8" py="4" fontWeight="semibold">
                <Text my="2">{data?.organisation}</Text>
                <Text>{data?.department}</Text>
                <Text>Date : {data?.date.split("T")[0]}</Text>
                <Text my="2">Appointment Time : {data?.appointment_time}</Text>
                <HStack spacing={2} align="center">
                  <Icon as={FaClock} boxSize={4} color="gray.500" />
                  {
                    open ? <Text color="blue.500" fontWeight="500">Open</Text> :
                      <Text color="red.400" fontWeight="500">Closed</Text>
                  }
                </HStack>
                <StackComponent m="4">
                  {/* <Button onClick={checkLiveStatus}>Live Status</Button> */}
                  <Button onClick={() => handleAppointment(data?.department)}>Cancel Appointment</Button>
                </StackComponent>
              </Flex>
            )
          })
        }
       
      </StackComponent>
    </Box>
  )
}
