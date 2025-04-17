import React, { useState } from "react";
import { Box, Input, InputGroup, FormControl, InputRightElement, Select, Button, Text, Spinner} from "@chakra-ui/react";
import { FaEnvelope } from "react-icons/fa";
import axios from "axios"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Bank = [
  { name: "PNB" },
  { name: "BOB" },
  { name: "SBI" },
  { name: "UCO" }
];

const Government = [
  { name: "SDO" },
  {name:"BDO"},
  { name: "LICENSE" }
];

const Hospital = [
  { name: "RAJBARI" },
  { name: "MAHAMAYA" },
  { name: "WE CARE" }
];

const subOrg = {
  Bank,Government,Hospital
}


export default function Admin() {
  const [admin, setadmin] = useState({ name: "", email: "", organisation: "", department: "" });
  const [Laoding,setLoading] = useState(false)
  const navigate = useNavigate();
  const handlechange = (e) => {
    setadmin((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(admin)
    const serverUrl = import.meta.env.VITE_SERVER_URL;
    setLoading(true)
    try {
      const res = await axios.post(`${serverUrl}/adminapi/adminKey`, admin)
      if(res.data.success){
        toast.success(res.data.msg);
        navigate("/");
      }else{
        toast.error(res.data.msg);
      }
    } catch (error) {
      toast.error(error);
    }
    setLoading(false)
  }
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100vh" width="100vw">
      <Box width={['90%', '70%', '30%']} bg="slate.500" color="black" border="2px solid" borderColor="blue.400" borderRadius="lg" boxShadow="md" textAlign="center">
        <Text fontStyle="italic" fontSize="2xl" fontFamily="cursive">Admin</Text>
        <form onSubmit={handleSubmit}>
          <FormControl p="8" >
            <Input name='name' placeholder='Name' my="4" onChange={handlechange} />
            <InputGroup my="4" >
              <InputRightElement cursor="pointer">
                <FaEnvelope />
              </InputRightElement>
              <Input type='email' name='email' id="email" placeholder='Email' onChange={handlechange} />
            </InputGroup>
            <Select placeholder="Select Organization" name='organisation' onChange={handlechange}>
              <option value="Hospital">Hospital</option>
              <option value="Government">Government Office</option>
              <option value="Bank">Bank</option>
            </Select>
            <Select placeholder="Select Sub-Organization" name='department'mt="4" onChange={handlechange}>
              {
                subOrg[admin?.organisation]?.map((org, index) => (
                  <option key={index} value={org.name}>{org.name}</option>
                ))
              }
            </Select>

          </FormControl>
          <Button
            m="4"
            colorScheme='teal'
            disabled={Laoding}
            leftIcon={Laoding && <Spinner size="md"/>}
            type='submit' >
           {Laoding ? "Generating" : "Generate Id"}
          </Button>
        </form>
      </Box>
    </Box>
  )
}