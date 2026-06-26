const express=require("express");
const mongoose =require("mongoose");
const app=express();
app.use(express.json());
mongoose.connect("mongodb+srv://Nigus:12345@cluster0.wgbwipa.mongodb.net/?appName=Cluster0").then(()=>{
  console.log("mongodb is connected");
}).catch((error)=>{
console.log("mongodb not connected");
console.log(error);
})
const studentSchema=new mongoose.Schema({
  name:String,
  age:Number,
  email:String
});
const Student=mongoose.model("student",studentSchema);
app.post("/students",async(req,res)=>{
  const student =new Student(req.body);
  await student.save();
  res.json(student);
})
app.get("/students",async(req,res)=>{
  const students=await Student.find();
  res.json(students);
})
app.get("/students/:id",async(req,res)=>{
  try{
    const student= await Student.findById(req.params.id);
    if(!student){
     return res.status(404).json({message:"sydent not found"});

    }
    res.json(student);
  }catch(error){
    console.log("error found");
    
  res.status(500).json({error:error.message})
}
})


app.put("/students/:id",async(req,res)=>{
try{
  const student = await Student.findByIdAndUpdate(
  req.params.id,
  req.body,{new:true}
);
if(!student){
  return res.status(404).json({
    message:"stident not found"
  })
}
res.json({message:"Student updated",student});
}catch(error){
res.status(400).json({message:error.message});
}});

app.delete("/students/:id",async(req,res)=>{
  try{
     const student =await Student.findByIdAndDelete(
    req.params.id,
  )
  if (!student){
    return res.status(404).json({message:"student not found"})
  }
  res.json({message:"student delleted",student});


  }catch(error){
    res.status(500).json({error:error.message})
  }
 
})
app.listen(3000,()=>{
  console.log("llistening in port 3000...");
  
})