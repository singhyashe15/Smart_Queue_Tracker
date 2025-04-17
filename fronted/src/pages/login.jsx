import React, { useState } from "react";
import { Box, Text, FormControl, Radio, RadioGroup, Input, InputGroup, InputRightElement, Button, HStack, Spinner } from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [client, setClient] = useState({ email: "", role: "" });
  const [Loading,setLoading] = useState(false);
  const [hide, setHide] = useState(false);
  const navigate = useNavigate()
  const handlechange = (e) => {
    setClient((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleRoleChange = (value) => {
    setClient((prev) => {
      return {
        ...prev,
        role: value
      }
    })
  }

  const toggle = (field) => {
    setHide((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, role, password, cpass, p_key } = client;

    if (!email || !role) {
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
      setLoading(true);
      const serverUrl = import.meta.env.VITE_SERVER_URL;

      const res = await axios.post(`${serverUrl}/userapi/login`, client, {
        withCredentials: true
      });
      console.log(res)
      if (res.data.success === false) {
        console.log("Hello")
        toast.error(res.data.msg);
      } else if (res.data.success === true) {
        toast.success(res.data.msg)
        localStorage.setItem("token", res.data.token)
        navigate("/home")
      }
    } catch (error) {
      if (error.response?.status === 404 || error.response.status === 501) {
        toast.error(error.response.data.msg)
      }
    }
    setLoading(false);
  }
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100vh" width="100vw">
      <Text fontStyle="italic" fontSize="2xl" fontFamily="cursive" >Login Here!! </Text>
      <Box width={['90%', '70%', '30%']} bg="slate.500" color="black" border="2px solid" borderColor="blue.400" borderRadius="lg" boxShadow="md" textAlign="center">
        <form onSubmit={handleSubmit}>
          <FormControl p="8">
            <Input placeholder="Enter registered Email" name="email" my="4" onChange={handlechange} />
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
                <Input type={hide.pass ? 'text' : 'password'} name='p_key' id="password" placeholder='Password' onChange={handlechange} />
              </InputGroup>
            }
          </FormControl>
          <Button
            m="4"
            colorScheme='teal'
            disabled={Loading}
            leftIcon={Loading && <Spinner size="md"/>}
            type='submit' >
           {Loading ? "Verifying" : "Submit"}
          </Button>
        </form>
      </Box>
    </Box>
  )
}
