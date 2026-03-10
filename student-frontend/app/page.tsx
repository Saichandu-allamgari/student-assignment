
// "use client"

// import { useEffect, useState } from "react"
// import { getStudents, deleteStudent } from "./services/studentApi"
// import StudentForm from "./components/StudentForm"
// import * as XLSX from "xlsx"

// type Student = {
//   _id: string
//   name: string
//   email: string
//   age: number
// }

// export default function Home() {

//   const [students, setStudents] = useState<Student[]>([])
//   const [loading, setLoading] = useState(true)

//   const fetchStudents = async () => {
//     const res = await getStudents()
//     setStudents(res.data)
//   }

//   useEffect(() => {
//     const load = async () => {
//       await fetchStudents()
//       setLoading(false)
//     }
//     load()
//   }, [])

//   const handleDelete = async (id: string) => {
//     if (confirm("Delete this student?")) {
//       await deleteStudent(id)
//       fetchStudents()
//     }
//   }

//   const downloadExcel = () => {

//     const ws = XLSX.utils.json_to_sheet(students)

//     const wb = XLSX.utils.book_new()

//     XLSX.utils.book_append_sheet(wb, ws, "Students")

//     XLSX.writeFile(wb, "students.xlsx")
//   }

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen text-xl">
//         Loading Students...
//       </div>
//     )
//   }

//   return (

//     <div className="min-h-screen bg-gray-100 p-8">

//       <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6">

//         <h1 className="text-3xl font-bold mb-6 text-center">
//           Student Management
//         </h1>

//         <StudentForm refresh={fetchStudents} />

//         <div className="flex justify-end mb-4">

//           <button
//             onClick={downloadExcel}
//             className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//           >
//             Download Excel
//           </button>

//         </div>

//         <div className="overflow-x-auto">

//           <table className="w-full border border-gray-200">

//             <thead className="bg-gray-200">

//               <tr>
//                 <th className="p-3 text-left">Name</th>
//                 <th className="p-3 text-left">Email</th>
//                 <th className="p-3 text-left">Age</th>
//                 <th className="p-3 text-center">Actions</th>
//               </tr>

//             </thead>

//             <tbody>

//               {students.map((s) => (

//                 <tr key={s._id} className="border-t hover:bg-gray-50">

//                   <td className="p-3">{s.name}</td>
//                   <td className="p-3">{s.email}</td>
//                   <td className="p-3">{s.age}</td>

//                   <td className="p-3 text-center">

//                     <button
//                       onClick={() => handleDelete(s._id)}
//                       className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                     >
//                       Delete
//                     </button>

//                   </td>

//                 </tr>

//               ))}

//             </tbody>

//           </table>

//         </div>

//       </div>

//     </div>
//   )
// }

"use client"

import { useEffect, useState } from "react"
import { getStudents, deleteStudent } from "./services/studentApi"
import StudentForm from "./components/StudentForm"
import * as XLSX from "xlsx"

type Student = {
  _id: string
  name: string
  email: string
  age: number
}

export default function Home() {

  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)

  const fetchStudents = async () => {
    try {
      const res = await getStudents()
      setStudents(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const load = async () => {
      await fetchStudents()
      setLoading(false)
    }
    load()
  }, [])

  const handleDelete = async (id: string) => {
    if (confirm("Delete this student?")) {
      await deleteStudent(id)
      fetchStudents()
    }
  }

  const downloadExcel = () => {

    const ws = XLSX.utils.json_to_sheet(students)

    const wb = XLSX.utils.book_new()

    XLSX.utils.book_append_sheet(wb, ws, "Students")

    XLSX.writeFile(wb, "students.xlsx")
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-xl font-semibold">
        Loading Students...
      </div>
    )
  }

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-6">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Student Management
        </h1>

        <StudentForm refresh={fetchStudents} />

        <div className="flex justify-end mb-4">

          <button
            onClick={downloadExcel}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Download Excel
          </button>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full border border-gray-200 rounded-lg">

            <thead className="bg-gray-200">

              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Age</th>
                <th className="p-3 text-center">Actions</th>
              </tr>

            </thead>

            <tbody>

              {students.length === 0 ? (

                <tr>
                  <td colSpan={4} className="text-center p-4 text-gray-500">
                    No students found
                  </td>
                </tr>

              ) : (

                students.map((s: Student) => (

                  <tr
                    key={s._id}
                    className="border-t hover:bg-gray-50"
                  >

                    <td className="p-3">{s.name}</td>

                    <td className="p-3">{s.email}</td>

                    <td className="p-3">{s.age}</td>

                    <td className="p-3 text-center">

                      <button
                        onClick={() => handleDelete(s._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  )
}