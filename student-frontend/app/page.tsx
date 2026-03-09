// // import Image from "next/image";

// // export default function Home() {
// //   return (
// //     <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
// //       <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
// //         <Image
// //           className="dark:invert"
// //           src="/next.svg"
// //           alt="Next.js logo"
// //           width={100}
// //           height={20}
// //           priority
// //         />
// //         <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
// //           <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
// //             To get started, edit the page.tsx file.
// //           </h1>
// //           <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
// //             Looking for a starting point or more instructions? Head over to{" "}
// //             <a
// //               href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
// //               className="font-medium text-zinc-950 dark:text-zinc-50"
// //             >
// //               Templates
// //             </a>{" "}
// //             or the{" "}
// //             <a
// //               href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
// //               className="font-medium text-zinc-950 dark:text-zinc-50"
// //             >
// //               Learning
// //             </a>{" "}
// //             center.
// //           </p>
// //         </div>
// //         <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
// //           <a
// //             className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
// //             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
// //             target="_blank"
// //             rel="noopener noreferrer"
// //           >
// //             <Image
// //               className="dark:invert"
// //               src="/vercel.svg"
// //               alt="Vercel logomark"
// //               width={16}
// //               height={16}
// //             />
// //             Deploy Now
// //           </a>
// //           <a
// //             className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
// //             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
// //             target="_blank"
// //             rel="noopener noreferrer"
// //           >
// //             Documentation
// //           </a>
// //         </div>
// //       </main>
// //     </div>
// //   );
// // }



// "use client"

// import { useEffect, useState } from "react"
// import { getStudents, deleteStudent } from "./services/studentApi"
// import StudentForm from "./components/StudentForm"
// import * as XLSX from "xlsx"

// export default function Home() {

//   const [students,setStudents] = useState([])
//   const [loading,setLoading] = useState(true)

//   const fetchStudents = async ()=>{
//     const res = await getStudents()
//     setStudents(res.data)
//   }

//   useEffect(()=>{

//     setTimeout(()=>{
//       fetchStudents()
//       setLoading(false)
//     },1000)

//   },[])

//   // const handleDelete = async(id)=>{
//   const handleDelete = async (id: string) => {
//     if(confirm("Delete Student?")){
//       await deleteStudent(id)
//       fetchStudents()
//     }
//   }

//   const downloadExcel = ()=>{

//     const ws = XLSX.utils.json_to_sheet(students)

//     const wb = XLSX.utils.book_new()

//     XLSX.utils.book_append_sheet(wb,ws,"Students")

//     XLSX.writeFile(wb,"students.xlsx")

//   }

//   if(loading){
//     return <h2>Loading Students...</h2>
//   }

//   return (

//     <div>

//       <h1>Students Table</h1>

//       <StudentForm refresh={fetchStudents}/>

//       <button onClick={downloadExcel}>
//         Download Excel
//       </button>

//       <table border="1">

//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Age</th>
//             <th>Actions</th>
//           </tr>
//         </thead>

//         <tbody>

//         {students.map((s)=>(
//           <tr key={s._id}>

//             <td>{s.name}</td>
//             <td>{s.email}</td>
//             <td>{s.age}</td>

//             <td>
//               <button onClick={()=>handleDelete(s._id)}>
//                 Delete
//               </button>
//             </td>

//           </tr>
//         ))}

//         </tbody>

//       </table>

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
    const res = await getStudents()
    setStudents(res.data)
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
      <div className="flex items-center justify-center h-screen text-xl">
        Loading Students...
      </div>
    )
  }

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Student Management
        </h1>

        <StudentForm refresh={fetchStudents} />

        <div className="flex justify-end mb-4">

          <button
            onClick={downloadExcel}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Download Excel
          </button>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full border border-gray-200">

            <thead className="bg-gray-200">

              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Age</th>
                <th className="p-3 text-center">Actions</th>
              </tr>

            </thead>

            <tbody>

              {students.map((s) => (

                <tr key={s._id} className="border-t hover:bg-gray-50">

                  <td className="p-3">{s.name}</td>
                  <td className="p-3">{s.email}</td>
                  <td className="p-3">{s.age}</td>

                  <td className="p-3 text-center">

                    <button
                      onClick={() => handleDelete(s._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  )
}