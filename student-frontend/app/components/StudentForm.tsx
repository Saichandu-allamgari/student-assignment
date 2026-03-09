// // // "use client"

// // // import { useState } from "react"
// // // import { addStudent } from "../services/studentApi"

// // // export default function StudentForm({ refresh }) {

// // //   const [name,setName] = useState("")
// // //   const [email,setEmail] = useState("")
// // //   const [age,setAge] = useState("")

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault()

// // //     if(!name || !email || !age){
// // //       alert("All fields are required")
// // //       return
// // //     }

// // //     const emailRegex = /\S+@\S+\.\S+/

// // //     if(!emailRegex.test(email)){
// // //       alert("Invalid Email")
// // //       return
// // //     }

// // //     await addStudent({name,email,age})

// // //     setName("")
// // //     setEmail("")
// // //     setAge("")

// // //     refresh()
// // //   }

// // //   return (

// // //     <form onSubmit={handleSubmit}>

// // //       <input
// // //         placeholder="Name"
// // //         value={name}
// // //         onChange={(e)=>setName(e.target.value)}
// // //       />

// // //       <input
// // //         placeholder="Email"
// // //         value={email}
// // //         onChange={(e)=>setEmail(e.target.value)}
// // //       />

// // //       <input
// // //         placeholder="Age"
// // //         value={age}
// // //         onChange={(e)=>setAge(e.target.value)}
// // //       />

// // //       <button type="submit">
// // //         Add Student
// // //       </button>

// // //     </form>

// // //   )
// // // }

// // "use client"

// // import { useState } from "react"
// // import { createStudent } from "../services/studentApi"

// // type Props = {
// //   refresh: () => void
// // }

// // export default function StudentForm({ refresh }: Props) {

// //   const [form, setForm] = useState({
// //     name: "",
// //     email: "",
// //     age: ""
// //   })

// //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

// //     setForm({
// //       ...form,
// //       [e.target.name]: e.target.value
// //     })
// //   }

// //   const handleSubmit = async (e: React.FormEvent) => {

// //     e.preventDefault()

// //     await createStudent({
// //       name: form.name,
// //       email: form.email,
// //       age: Number(form.age)
// //     })

// //     setForm({
// //       name: "",
// //       email: "",
// //       age: ""
// //     })

// //     refresh()
// //   }

// //   return (

// //     <div className="mb-8">

// //       <div className="bg-white border rounded-xl shadow-sm p-6">

// //         <h2 className="text-xl font-semibold mb-4">
// //           Add New Student
// //         </h2>

// //         <form
// //           onSubmit={handleSubmit}
// //           className="grid md:grid-cols-4 gap-4"
// //         >

// //           <input
// //             type="text"
// //             name="name"
// //             placeholder="Student Name"
// //             value={form.name}
// //             onChange={handleChange}
// //             required
// //             className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
// //           />

// //           <input
// //             type="email"
// //             name="email"
// //             placeholder="Student Email"
// //             value={form.email}
// //             onChange={handleChange}
// //             required
// //             className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
// //           />

// //           <input
// //             type="number"
// //             name="age"
// //             placeholder="Age"
// //             value={form.age}
// //             onChange={handleChange}
// //             required
// //             className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
// //           />

// //           <button
// //             type="submit"
// //             className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition"
// //           >
// //             Add Student
// //           </button>

// //         </form>

// //       </div>

// //     </div>
// //   )
// // }


// import { useState } from "react"
// import { addStudent } from "../services/studentApi"

// export default function StudentForm({ refresh }) {

//   const [form,setForm] = useState({
//     name:"",
//     email:"",
//     age:""
//   })

//   const handleChange = (e)=>{
//     setForm({
//       ...form,
//       [e.target.name]:e.target.value
//     })
//   }

//   const handleSubmit = async(e)=>{
//     e.preventDefault()

//     await addStudent({
//       name:form.name,
//       email:form.email,
//       age:Number(form.age)
//     })

//     setForm({name:"",email:"",age:""})
//     refresh()
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <input name="name" onChange={handleChange} value={form.name} placeholder="Name"/>
//       <input name="email" onChange={handleChange} value={form.email} placeholder="Email"/>
//       <input name="age" onChange={handleChange} value={form.age} placeholder="Age"/>
//       <button type="submit">Add</button>
//     </form>
//   )
// }

"use client"

import { useState } from "react"
import { addStudent } from "../services/studentApi"

type Props = {
  refresh: () => void
}

export default function StudentForm({ refresh }: Props) {

  const [form, setForm] = useState({
    name: "",
    email: "",
    age: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    await addStudent({
      name: form.name,
      email: form.email,
      age: Number(form.age)
    })

    setForm({ name: "", email: "", age: "" })
    refresh()
  }

  return (

    <div className="max-w-4xl mx-auto mb-8">

      <div className="bg-white shadow-lg rounded-xl p-6 border">

        <h2 className="text-xl font-semibold mb-6 text-gray-800">
          Add New Student
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-3 gap-4"
        >

          {/* Name */}

          <div className="flex flex-col">
            <label className="text-sm mb-1 text-gray-600">
              Student Name
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter name"
              required
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Email */}

          <div className="flex flex-col">
            <label className="text-sm mb-1 text-gray-600">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Age */}

          <div className="flex flex-col">
            <label className="text-sm mb-1 text-gray-600">
              Age
            </label>

            <input
              type="number"
              name="age"
              value={form.age}
              onChange={handleChange}
              placeholder="Enter age"
              required
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Button */}

          <div className="md:col-span-3 flex justify-end mt-2">

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Add Student
            </button>

          </div>

        </form>

      </div>

    </div>
  )
}