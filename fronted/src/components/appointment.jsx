import React, { useState } from 'react';
import { Box, Button, FormControl, Input, Select, Spinner, Text } from '@chakra-ui/react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

export default function Appointment() {
  const [hide, setHide] = useState({ first: true, second: false, third: false, fourth: false });
  const [detail, setDetails] = useState({ organisation: "", department: "", name: "", email: "", postalCode: 0 })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { organisation } = useParams()

  // add the details
  const handleChange = (e) => {
    console.log(e.target.value)
    setDetails((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
    e.target.name === 'department' && setHide((prev) => { return { ...prev, first: false, second: true } })
    e.target.name === 'postalCode' && setHide((prev) => { return { ...prev, second: false, third: true } })
    e.target.name === 'date' && setHide((prev) => { return { ...prev, third: false, fourth: true } })
  }

  // submit it
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setDetails((prev) => {
      return {
        ...prev,
        organisation
      }
    })
    console.log(detail.email)
    const serverUrl = import.meta.env.VITE_SERVER_URL;
    const res = await axios.post(`${serverUrl}/userapi/appointment`, detail)
    if (res.sucess) {
      toast.success("Your appointment was scheduled successfully");
      navigate("/")
    } else {
      toast.error(res.data.msg)
    }
    setLoading(false);
  }

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100vh" width="100vw">
      <Text fontStyle="italic" fontSize="2xl" fontFamily="cursive" >Book Your Appointment Here!! </Text>
      <Box width={['90%', '70%']} bg="slate.500" color="black" border="2px solid" borderColor="gray.400" borderRadius="lg" boxShadow="md" textAlign="center" p="8">
        <form onSubmit={handleSubmit}>
          <FormControl>
            {
              hide.first &&
              <Select name='department' onChange={handleChange}>
                <option value="Enter Department">Enter Department</option>
                <option name="Cardiologist">Cardiologist</option>
                <option name="Dentist">Dentist</option>
              </Select>
            }
            {
              hide.second &&
              <>
                <Input placeholder='Enter Your Name' name='Name' mt="4" onChange={handleChange} />
                <Input placeholder='Enter Your Registered Email' mt="4" name='email' onChange={handleChange} />
                <Input placeholder='Postal Code' type='number' name="postalCode" mt="4" onChange={handleChange} />
              </>
            }
            {
              hide.third &&
              <>
                <Input placeholder='Select Date' size='md' name="date" type='date' />
                <Button m="4"
                  colorScheme='teal'
                  type='submit'
                  disabled={loading}
                  leftIcon={loading && <Spinner size="md" />}
                >
                  {loading ? "Processing your appointment" : "Tap, Here to Confirm"}</Button>
              </>
            }

          </FormControl>
        </form>
      </Box>
    </Box>
  )
};