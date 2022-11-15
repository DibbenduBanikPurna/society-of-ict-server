// external import 
const express=require('express')
const cors=require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId
const fileUpload = require('express-fileupload')

//express cal by app
const app=express()
app.use(express())//express defined
app.use(express.json())
app.use(cors())
app.use(fileUpload())

//mongodb uri
const uri = "mongodb+srv://purna:2470purna@cluster0.z2een.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        //database name
        const database = client.db('Society-of-ict');
        //database collection name 
        const teacherCollcetion = database.collection('teachers');
     const jobHolderCollcetion = database.collection('jobholder');
        const studentCollcetion = database.collection('student');



        

        //post new student 
        app.post('/addmember', async(req,res)=>{
            const user = req.body;
            console.log(req.body)
             const result = await studentCollcetion.insertOne(user)
            // console.log(result)
             res.json("Student Data added successfully");
        })
        
        //post job holder all data

        app.post('/jobs', async (req, res) => {
            const user = req.body;
            console.log(req.body)
             const result = await jobHolderCollcetion.insertMany(user)
             //console.log(result)
             res.json(result)
        })
        
        //post user data

        // app.post('/studentdata', async (req, res) => {
        //     console.log(req.body);
        //     const name = req.body.name;
        //     const email = req.body.email;
        //     const image = req.files.image;
        //     const id=req.body.id;
        //     const session=req.body.session;
        //     const blood=req.body.blood;
        //     const skill=req.body.skill;
        //         //console.log(req.body);
        //     const picData = image.data;
        //     const encodedPic = picData.toString('base64')
        //     const imageBuffer = Buffer.from(encodedPic, 'base64')
        //     const doctor = {
        //         name,
        //         email,
        //         image: imageBuffer,
        //         id,
        //         session,
        //         blood,
        //         skill
        //     }
        //     const result = await studentCollcetion.insertOne(doctor);

        //    console.log(result)
        //     res.json("result")

        // })

        // get student data
        app.get('/members',async(req,res)=>{
            const cursor = studentCollcetion.find({})
            const result = await cursor.toArray()
            res.send(result)
        })

        
       

                
            


   
       
     //get teacher data
        app.get('/teachers',async(req,res)=>{
            const cursor = teacherCollcetion.find({})
            const result = await cursor.toArray()
            res.send(result)
        })
      
        //get jobholder data
        app.get('/jobs',async(req,res)=>{
            const cursor = jobHolderCollcetion.find({})
            const result = await cursor.toArray()
            res.send(result)
        })

        //recive all student data

        app.get('/student',async(req,res)=>{
            //console.log(req.params.id)
            const cursor = studentCollcetion.find({})
            const result = await cursor.toArray()
            res.send(result)
        })

        app.get('/student/:email',async(req,res)=>{
            console.log(req.params.email)
            const result = await studentCollcetion.findOne({email:req.params.email })
            res.send(result)
            //console.log(result)
        })
        //single  student search data get by id
        app.get('/singlestudent/:id', async(req,res)=>{
            const result = await studentCollcetion.findOne({_id: ObjectId(req.params.id) })
                     res.send(result)
                     console.log(result)
        })

        //search student info
       
















    
      
       
     
      

    } finally {

        // await client.close();
    }
}
run().catch(console.dir);




app.get('/',(req,res)=>{
    res.send("WELCOME TO  SOCIETY OF ICT");
})



app.listen(5000,()=>{
    console.log("server is listenning");
})