const Student = require("../models/studentModel")

exports.getStudents = async (req,res)=>{

  const students = await Student.find()

  res.json(students)

}

exports.addStudent = async (req,res)=>{

  const {name,email,age} = req.body

  const student = await Student.create({
    name,
    email,
    age
  })

  res.json(student)

}

exports.updateStudent = async (req,res)=>{

  const {id} = req.params

  const student = await Student.findByIdAndUpdate(
    id,
    req.body,
    {new:true}
  )

  res.json(student)

}

exports.deleteStudent = async (req,res)=>{

  const {id} = req.params

  await Student.findByIdAndDelete(id)

  res.json({message:"Student Deleted"})

}