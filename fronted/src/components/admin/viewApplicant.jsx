import React from "react"
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { HStack, useBreakpointValue, VStack,Text,Button } from "@chakra-ui/react";

export default function ViewApplicant() {
  const { organisation, department } = useParams();
  const StackComponent = useBreakpointValue({base:VStack,md:HStack})

  // Fetching the data of patient
  const fetchApplicant = async (organisation, department) => {
    const url = import.meta.env.VITE_SERVER_URL;
    const res = await axios.get(`${url}/adminapi/viewApplicant/${organisation}/${department}`);
    return res.status === 201 ? res.data.data : [];
  }

  useQuery({
    queryKey: ["viewapplicant"],
    queryFn: () => fetchApplicant(organisation, department)
  })

  const handleCheckUp = async()=>{
    const url = import.meta.env.VITE_SERVER_URL;
    await axios.delete(`${url}/adminapi/deleteData`,{
      data:{
        id
      }
    })
  }

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100vh" width="100vw">
          <StackComponent>
            {
              data?.map((data) => {
                return (
                  <Flex key={data?.id} direction="column" border="2px solid" borderColor="blue.400" borderRadius="lg" px="8" py="4">
                    <Text my="4" fontSize="lg" fontWeight="400">Id : {data?.id}</Text>
                    <Text fontSize="lg" fontWeight="400">Patient Name: {data?.name}</Text>
                    <StackComponent m="4">
                      <Button onClick={() => handleCheckUp(data?.id)}>HandleCheckUp</Button>
                    </StackComponent>
                  </Flex>
                )
              })
            }
          </StackComponent>
        </Box>
  )
}