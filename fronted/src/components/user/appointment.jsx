import React, { useState, useEffect } from 'react'; 
import { Box, Button, FormControl, Input, Select, Spinner, Text, InputGroup, InputRightElement, Icon, Heading, VStack, HStack, useToast, Flex } from '@chakra-ui/react'; 
import axios from 'axios'; 
import { useNavigate, useParams } from 'react-router-dom';
import { FaRegCalendarAlt } from "react-icons/fa";
import { motion } from 'framer-motion';

export default function Appointment() { 
  const [step, setStep] = useState(1); 
  const [detail, setDetails] = useState({ organisation: "", department: "", name: "", age: "", email: "", postalCode: 0, date: "" }); 
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { organisation } = useParams();
  const toast = useToast();

useEffect(() => {
  if (organisation) { 
    setDetails(prev => ({ ...prev, organisation })); 
  } 
}, [organisation]);

const handleChange = (e) => { 
  const { name, value } = e.target;
  if (name === 'age' && (value > 100 || /[a-zA-Z]/.test(value))) {
    return toast({ title: "Invalid Age", status: "error", duration: 3000, isClosable: true });
  } setDetails(prev => ({ ...prev, [name]: value }));
};

const handleSubmit = async (e) => { 
  e.preventDefault(); 
  setLoading(true); 
  const serverUrl = import.meta.env.VITE_SERVER_URL;

try {
  const res = await axios.post(`${serverUrl}/userapi/appointment`, detail);
  if (res.data.success) {
    toast({ title: res.data.msg, status: "success", duration: 3000, isClosable: true });
    navigate("/");
  } else {
    toast({ title: res.data.msg, status: "error", duration: 3000, isClosable: true });
  }
} catch (error) {
  toast({ title: error.response?.data?.msg || "Something went wrong", status: "error", duration: 3000, isClosable: true });
}
setLoading(false);

};

const MotionBox = motion(Box);

return ( 
  <Flex direction="column" align="center" justify="center" minH="100vh" bgGradient="linear(to-r, teal.100, blue.100)"> <MotionBox initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} bg="white" p={[6, 8]} borderRadius="2xl" boxShadow="2xl" w={['90%', '70%', '50%']} textAlign="center" > <Heading mb={4} fontFamily="heading" size="lg" color="teal.600">Book Your Appointment</Heading>

<form onSubmit={handleSubmit}>
      <VStack spacing={4}>
        {step === 1 && (
          <Select placeholder='Select Department' name='department' onChange={(e) => { handleChange(e); setStep(2); }}>
            <option value="Cardiologist">Cardiologist</option>
            <option value="Dentist">Dentist</option>
          </Select>
        )}

        {step === 2 && (
          <>
            <Input placeholder='Your Name' name='name' onChange={handleChange} />
            <Input placeholder='Your Age' name='age' onChange={handleChange} type="number" />
            <Input placeholder='Email Address' name='email' onChange={handleChange} type="email" />
            <Input placeholder='Postal Code' name='postalCode' onChange={handleChange} />
            <Button colorScheme="blue" width="full" onClick={() => setStep(3)}>Next</Button>
          </>
        )}

        {step === 3 && (
          <>
            <InputGroup>
              <Input type="date" name="date" onChange={handleChange} />
              <InputRightElement children={<Icon as={FaRegCalendarAlt} color="gray.400" />} />
            </InputGroup>
            <Button
              colorScheme="teal"
              width="full"
              type="submit"
              isLoading={loading}
              loadingText="Booking..."
            >
              Confirm Appointment
            </Button>
          </>
        )}
      </VStack>
    </form>
  </MotionBox>
</Flex>

); };

