"use client"

import { useState } from "react"
import { addStudent } from "../services/studentApi"

export default function StudentForm({ refresh }) {

  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [age,setAge] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(!name || !email || !age){
      alert("All fields are required")
      return
    }

    const emailRegex = /\S+@\S+\.\S+/

    if(!emailRegex.test(email)){
      alert("Invalid Email")
      return
    }

    await addStudent({name,email,age})

    setName("")
    setEmail("")
    setAge("")

    refresh()
  }

  return (

    <form onSubmit={handleSubmit}>

      <input
        placeholder="Name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />

      <input
        placeholder="Age"
        value={age}
        onChange={(e)=>setAge(e.target.value)}
      />

      <button type="submit">
        Add Student
      </button>

    </form>

  )
}