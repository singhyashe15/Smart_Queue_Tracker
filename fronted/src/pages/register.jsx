import React, { useState } from 'react';
import { Box, FormControl, Input, Text, InputGroup, InputRightElement, RadioGroup, HStack, Radio, Button } from '@chakra-ui/react';
import { FaEyeSlash, FaEye, FaEnvelope } from 'react-icons/fa';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [client, setClient] = useState({ name: "", email: "", role: "" })
  const [hide, setHide] = useState(false)
  const navigate = useNavigate();

  const handlechange = (e) => {
    console.log(e.target.value)
    setClient((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleRoleChange = (value) => {
    setClient((prev) => ({
      ...prev,
      role: value,
    }));
  };

  const toggle = (field) => {
    setHide((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const serverUrl = import.meta.env.VITE_SERVER_URL;
    const { name, email, role, password, cpass, p_key } = client;

    if (!name || !email || !role) {
      return toast.error("Please fill all required fields.");
    }

    if (role === "user") {
      if (!password || !cpass) return toast.error("Please enter password and confirm password.");
      if (password !== cpass) return toast.error("Passwords do not match.");
    }

    if (role === "admin" && !p_key) {
      return toast.error("Please enter the admin key.");
    }
    try {
      const res = await axios.post(`${serverUrl}/userapi/register`, client);

      if (res.status != 201) {
        toast.error(res.data.msg);
      } else {
        toast.success(res.data.msg)
        const user_info = {
          role: res.data.role,
          id: res.data.id,
          name: res.data.name
        }
        localStorage.setItem("user", JSON.stringify(user_info))
        navigate("/login")
      }
    } catch (error) {
      toast.error(error.response.data.msg)
    }
  }
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100vh" width="100vw">
      <Text fontStyle="italic" fontSize="2xl" fontFamily="cursive" >Register Here!! </Text>
      <Box width={['90%', '70%', '30%']} bg="slate.500" color="black" border="2px solid" borderColor="blue.400" borderRadius="lg" boxShadow="md" textAlign="center">
        <form onSubmit={handleSubmit}>
          <FormControl p="8">
            <Input name='name' placeholder='Name' my="4" onChange={handlechange} />
            <InputGroup my="4" >
              <InputRightElement cursor="pointer">
                <FaEnvelope />
              </InputRightElement>
              <Input type='email' name='email' id="email" placeholder='Email' onChange={handlechange} />
            </InputGroup>
            <RadioGroup onChange={handleRoleChange}>
              <HStack spacing='24px'>
                <Radio value='user' >User</Radio>
                <Radio value='admin'>Admin</Radio>
              </HStack>
            </RadioGroup>
            {client.role === 'user' &&
              <>
                <InputGroup my="4">
                  <InputRightElement cursor="pointer" onClick={() => toggle('pass')}>
                    {
                      hide?.pass ? <FaEye /> : <FaEyeSlash />
                    }
                  </InputRightElement>
                  <Input type={hide.pass ? 'text' : 'password'} name='password' id="password" placeholder='Password' onChange={handlechange} />
                </InputGroup>
                <InputGroup my="4">
                  <InputRightElement cursor="pointer" onClick={() => toggle('cpass')}>
                    {
                      hide?.cpass ? <FaEyeSlash /> : <FaEye />
                    }
                  </InputRightElement>
                  <Input type={hide.cpass ? 'password' : 'text'} placeholder='Confirm Password' id="cpassowrd" name='cpass' onChange={handlechange} />
                </InputGroup>
              </>
            }
            {
              client.role === 'admin' &&
              <InputGroup my="4">
                <InputRightElement cursor="pointer" onClick={() => toggle('pass')}>
                  {
                    hide?.pass ? <FaEye /> : <FaEyeSlash />
                  }
                </InputRightElement>
                <Input type={hide.pass ? 'text' : 'password'} name='p_key' id="password" placeholder='Key' onChange={handlechange} />
              </InputGroup>
            }
          </FormControl>
          <Button
            m="4"
            colorScheme='teal'
            type='submit' >
            Submit
          </Button>
        </form>
      </Box>
    </Box>
  )
};

export default Register;
