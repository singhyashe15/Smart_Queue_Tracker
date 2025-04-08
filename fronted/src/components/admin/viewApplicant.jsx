import React from "react"
import { useParams } from "react-router-dom"
export default function ViewApplicant(){
  const { organisation, department } = useParams();

  return(
      <Box>
        Its a Applicant {department} {organisation}
      </Box>
  )
}