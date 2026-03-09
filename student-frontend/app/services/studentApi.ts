// import axios from "axios"

// const API = `${process.env.NEXT_PUBLIC_API_URL}/students`

// export const getStudents = () => axios.get(API)

// export const addStudent = (data) =>
//   axios.post(API, data)

// export const updateStudent = (id, data) =>
//   axios.put(`${API}/${id}`, data)

// export const deleteStudent = (id) =>
//   axios.delete(`${API}/${id}`)

import axios from "axios"

const API_URL = process.env.NEXT_PUBLIC_API_URL

const api = axios.create({
  baseURL: `${API_URL}/students`,
  headers: {
    "Content-Type": "application/json"
  }
})

export type Student = {
  _id?: string
  name: string
  email: string
  age: number
}

// GET all students
export const getStudents = async () => {
  return await api.get<Student[]>("/")
}

// ADD student
export const addStudent = async (data: Student) => {
  return await api.post("/", data)
}

// UPDATE student
export const updateStudent = async (id: string, data: Student) => {
  return await api.put(`/${id}`, data)
}

// DELETE student
export const deleteStudent = async (id: string) => {
  return await api.delete(`/${id}`)
}