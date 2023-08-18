const express= require('express');
const router=express.Router();

const jwt= require('jsonwebtoken');




router.use(express.json());
router.use(express.urlencoded({extended:true}));

const employeeSchema = require('../model/employeeSchema');

//log in api

router.post('/login',async (req,res)=>{
    let username=req.body.username;
    let password=req.body.password;
    const user = await employeeSchema.findOne({username:username});
    if(!user){
        res.json({message:"user is not found"});
    }
   try {
    if(user.password==password){
        jwt.sign({email:username,id:user._id},"ajay",{expiresIn:'1d'},
        (error,token)=>{
            if (error) {
                res.json({message:"Token is not generated"})
            } else {
                res.json({message:"Login successfully",token:token,data:user})
            }
        }
        )
    }
    else{
        res.json({message:"Login failed"})
    }
    
   } catch (error) {
        console.log(error);
   }

});

//get

router.get('/viewemployee/:token', async( req,res)=>{
    let employee = await employeeSchema.find();
    try {
        jwt.verify(req.params.token,"ajay",
        (error,decoded)=>{
            if (decoded && decoded.email) {
                res.json(employee)
            } else {
                res.json({message:"unauthorized user"});
            }

        })
        
    } catch (error) {
        res.send('error');
        console.log(error);
        
    }
});






router.post('/addemployee', (req,res)=>{
    try {
        console.log(req.body);
        let item=req.body;
        const savedEmployee = employeeSchema(item);
        jwt.verify(req.body.token,"ajay",
        (error,decoded)=>{
            if (decoded && decoded.email) {
                savedEmployee.save()
                res.json({message:"Employee added successfully!!"});  
                
            } else {
                res.json({message:"Unauthorized User!!"})
            }
        })
         
            

    } catch (error) {
        res.json('unable to register');
        
        
    }
});





//delete

router.delete('/delete/:id', async (req,res)=>{
    try {
        const deleteId=req.params.id;
        console.log(deleteId);
        await employeeSchema.findByIdAndDelete(deleteId);
        console.log('deleted');
        res.json({message:"Deleted Successfully"})

    } catch (error) {
        res.status(400).json('Unable to Delete');
    }    
});


//update

router.put("/edit/:id", async (req,res)=>{

    try {
        console.log(req.body);
        const postId = req.params.id;
        console.log(postId);
        const updated = await employeeSchema.findByIdAndUpdate(postId,req.body);
        res.json({message:"Updated successfully"});
    } catch (error) {
        console.log(error.message);
        res.status(400).json('Unable to Update');

    }

})






module.exports=router;

