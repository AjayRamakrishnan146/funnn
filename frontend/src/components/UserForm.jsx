import React, { useEffect, useState } from 'react'
import Header from './Header'
import axios from 'axios';
import ViewForm from './ViewForm';

const UserForm = () => {
    const userRole = sessionStorage.getItem('userRole');

    const [user, setUser] = useState([]);
    const [update, setUpdate] = useState(false);
    const [singleValue, setSingleValue] = useState([]);
    const[userToken,setUserToken]=useState(sessionStorage.getItem("userToken"))
    const[userID,setUserId]=useState(sessionStorage.getItem("userId"));

    const fetchDataFromApi = () => {
        axios.get("http://localhost:5000/api/viewemployee/"+userToken)
            .then((response) => {
                console.log(response.data)
                setUser(response.data)
            })
    }
    const deleteEmployee = (id) => {
        console.log('button is working');
        console.log(id);
        axios.delete("http://localhost:5000/api/delete/" + id)
            .then((response) => {
                console.log(response);
                if (response.data.message === "Deleted Successfully") {
                    alert(response.data.message);
                    window.location.reload(false);
                }
                else if (response.data.message === "Unable to Delete") {
                    alert(response.message.data);
                }
            })
            .catch(err => console.log(err));
    }

    const updateEmployee = (val) => {
        console.log("update clicked", val);
        setUpdate(true);
        setSingleValue(val);

    }

    useEffect(() => {
        fetchDataFromApi();
    }, [])

    let finalJSX = <div className="container">
        <div className="row">
            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 ">
                <div className="row g-3 mt-3">
                    {user.map(
                        (value, index) => {
                            return <div className="col col-12 col-sm-6 col-md-6 col-lg-6 ">

                                <div class="card">
                                    <div class="card-header">Name : {value.name}</div>
                                    <ul class="list-group list-group-flush">

                                        <li class="list-group-item">Position : {value.position}</li>
                                        <li class="list-group-item">Role : {value.role}</li>
                                        <li class="list-group-item">Salary : {value.salary}</li>
                                        <li class="list-group-item">Location : {value.location}</li>
                                        <li class="list-group-item">Username : {value.username}</li>
                                        <li class="list-group-item">password : {value.password}</li>
                                        {userRole === 'admin' && (
                                        <p class="card-text p-2">
                                            <button className="btn btn-success me-2" onClick={() => updateEmployee(value)}>Update</button>
                                            <button className="btn btn-danger" onClick={() => deleteEmployee(value._id)}>Delete</button>
                                        </p>
                                         )}
                                    </ul>
                                </div>
                            </div>
                        })}
                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6">
                    </div>
                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6"></div>
                </div>
            </div>
        </div>
    </div>
   
    if(update) finalJSX =<ViewForm method= 'put' data={singleValue}/>
    return (
        finalJSX
    );
};

export default UserForm