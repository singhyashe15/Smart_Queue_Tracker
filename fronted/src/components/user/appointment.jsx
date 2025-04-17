import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, Input, Select, Spinner, Text,InputGroup,InputRightElement,Icon } from '@chakra-ui/react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { FaRegCalendarAlt } from "react-icons/fa";

export default function Appointment() {
  const [step, setStep] = useState(1)
  const [detail, setDetails] = useState({ organisation: "", department: "", name: "",age:"", email: "", postalCode: 0 })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { organisation } = useParams()

  useEffect(() => {
    if (organisation) {
      setDetails(prev => ({
        ...prev,
        organisation
      }));
    }
  }, [organisation]);

  // add the details
  const handleChange = (e) => {
    console.log(e.target.value)
    setDetails((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  // submit it
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const serverUrl = import.meta.env.VITE_SERVER_URL;
    const res = await axios.post(`${serverUrl}/userapi/appointment`, detail)
    try {
      if (res.data.sucess === true) {
        toast.success(res.data.msg);
        navigate("/")
      } else {
        toast.error(res.data.msg)
      } 
    } catch (error) {
      toast.error(error.response.data.msg)
    }
    setLoading(false);
  }

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100vh" width="100vw">
      <Text fontStyle="italic" fontSize="2xl" fontFamily="cursive" >Book Your Appointment Here!! </Text>
      <Box width={['90%', '70%']} bg="slate.500" color="black" border="2px solid" borderColor="gray.400" borderRadius="lg" boxShadow="md" textAlign="center" p="8">
        <form onSubmit={handleSubmit}>
          <FormControl>
            {step === 1 && (
              <Select name='department' onChange={(e) => {
                handleChange(e);
                setStep(2);
              }}>
                <option value="">Select Department</option>
                <option value="Cardiologist">Cardiologist</option>
                <option value="Dentist">Dentist</option>
              </Select>
            )}

            {step === 2 && (
              <>
                <Input placeholder='Enter Your Name' name='name' onChange={handleChange} mt="4" />
                <Input placeholder='Enter Your Age' name='age' onChange={handleChange} mt="4" />
                <Input placeholder='Enter Email' name='email' onChange={handleChange} mt="4" />
                <Input placeholder='Postal Code' name='postalCode' onChange={handleChange} mt="4" />
                <Button onClick={() => setStep(3)} mt="4">Next</Button>
              </>
            )}

            {step === 3 && (
              <>
                <InputGroup>
                  <Input type="date" placeholder="Enter date of appointment" onChange={handleChange}/>
                  <InputRightElement pointerEvents="none">
                    <Icon as={FaRegCalendarAlt} color="gray.400" />
                  </InputRightElement>
                </InputGroup>
                <Button m="4"
                  colorScheme='teal'
                  type='submit'
                  disabled={loading}
                  leftIcon={loading && <Spinner size="md" />}
                >
                  {loading ? "Processing your appointment" : "Tap, Here to Confirm"}</Button>
              </>
            )}
          </FormControl>
        </form>
      </Box>
    </Box>
  )
};