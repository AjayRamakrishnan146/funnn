import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Login = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState({});

    const inputHandler = (e) => {
        setUser({
            ...user, [e.target.name]: e.target.value
        });
        console.log(user)
    }
    const submitHandler = () => {
        axios.post('http://localhost:5000/api/login', user)
            .then((response) => {
                console.log(response);
                if (response.data.message === 'Login successfully') {
                    const token = response.data.token;
                    const userid = response.data.data._id;
                    const userRole = response.data.data.role;
                    console.log(token);
                    console.log(userid);
                    console.log(userRole);
                    sessionStorage.setItem("userToken",token);
                    sessionStorage.setItem("userId",userid);
                    sessionStorage.setItem("userRole",userRole);
                    alert(response.data.message);
                    navigate('/userform');

                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <div className="container">
                <div className="container d-flex justify-content-center align-items-center vh-100 ">
                    <div className="row border border-dark">
                        <div className="row g-3 justify-content-center align-items-center">
                            <div className="col-6">
                                <h3>Log In</h3>
                                <label htmlFor="" className="form-label">Username</label>
                                <input type="text" className="form-control" name='username' onChange={inputHandler} />
                            </div>
                            <div className="row g-3 justify-content-center align-items-center">
                                <div className="col-6">
                                    <label htmlFor="" className="form-label">Password</label>
                                    <input type="text" className="form-control" name='password' onChange={inputHandler} />
                                </div>
                            </div>
                            <div className="row g-3 justify-content-center align-items-center">
                                <div className="col-6">
                                    <button className="btn btn-success" onClick={submitHandler}>Log In</button>
                                </div>
                            </div>
                            <div className="col-12"></div>
                        </div>
                    </div>



                </div>
            </div>
        </div>
    )
}

export default Login