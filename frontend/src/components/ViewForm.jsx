import React, { useState } from 'react'
import Header from './Header'
import axios from 'axios';
import  { useNavigate }  from 'react-router-dom'

const ViewForm = (props) => {
    const[posts,setPost]=useState(props.data)
    const navigate = useNavigate();
    const[userToken,setUserToken] = useState(sessionStorage.getItem("userToken"));
    const[userID,setUserId] = useState(sessionStorage.getItem("userId"));

    console.log("method",props.method);
    console.log("data",props.data);

    const inputHandler=(e)=>{
        const{name,value}=e.target
        setPost({
            ...posts,[name]:value
        })
        console.log(posts)
        
    }
    const submitHandler=()=>{
        let data ={
            userId: userID,
            token: userToken,
            name : posts.name,
            position: posts.position,
            role: posts.role,
            salary: posts.salary,
            location: posts.location,
            username: posts.username,
            password : posts.password

        }

        console.log('button is working',posts);
        if(props.method==="post"){
        axios.post('http://localhost:5000/api/addemployee',data)
        .then((response)=>{
                console.log(response);
                if(response.data.message==="Employee added successfully!!"){
                    alert(response.data.message);
                    navigate('/userform');
                    
                }
                else if(response.data.message==="Unauthorized User!!"){
                    alert(response.data.message);
                    
                }
            })
            .catch(err=>console.log(err))
            
        }

        if(props.method==='put'){
            axios.put("http://localhost:5000/api/edit/"+posts._id,posts)
            .then((response)=>{
                if(response.data.message==="Updated successfully"){
                    alert(response.data.message)
                    window.location.reload(false);
                }
                else if(response.data.message==="Unable to Update"){
                    alert(response.data.message)

                }
            })
        }
        
    }

   

  return (
    <div>



        <div className="container">
            <div className="row border mt-5 p-2" style={{ backgroundColor: 'ghostwhite'}}>
                <div className="col col-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="row g-3">
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                            <label htmlFor="" className="form-label">Name</label>
                            <input type="text" className="form-control" name='name' value={posts.name} onChange={inputHandler}/>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                            <label htmlFor="" className="form-label">Position</label>
                            <input type="text" className="form-control" name='position' value={posts.position} onChange={inputHandler}/>

                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                            <label htmlFor="" className="form-label">Role</label>
                            <input type="text" className="form-control" placeholder='type role as user or admin' name='role' value={posts.role} onChange={inputHandler}/>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                            <label htmlFor="" className="form-label">Salary</label>
                            <input type="number" className="form-control" name='salary' value={posts.salary} onChange={inputHandler}/>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                            <label htmlFor="" className="form-label">Location</label>
                            <input type="text" className="form-control" name='location' value={posts.location} onChange={inputHandler}/>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                            <label htmlFor="" className="form-label">Username</label>
                            <input type="text" className="form-control" name='username' value={posts.username} onChange={inputHandler}/>  
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                            <label htmlFor="" className="form-label">Password</label>
                            <input type="text" className="form-control" name='password' value={posts.password} onChange={inputHandler}/>
                        </div>
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 mb-2">
                            <button className="btn btn-success" onClick={submitHandler}>Register</button>
                        </div>
                    </div>





                </div>
            </div>
        </div>



    </div>
  )
}

export default ViewForm