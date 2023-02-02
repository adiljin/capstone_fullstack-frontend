import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

export default function AddUser() {

    let navigate = useNavigate()

    const [user, setUser] = useState({
        username: "",
        password: "",
    })

    const { username, password } = user

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }


    const onSubmit = async (e) => {
        if(user.username!==""&&user.password!==""){
            e.preventDefault();
            await axios.post("http://localhost:3000/user", user)
            .then(response => {
                navigate("/users/UserMan")
              })
              .catch(error => {
                if (error.response) {
                  // The request was made and the server responded with a status code that falls out of the range of 2xx
                  alert(error.response.data);
                } else if (error.request) {
                  // The request was made but no response was received
                  alert("Error: No response received");
                } else {
                  // Something happened in setting up the request that triggered an Error
                  alert("Error: " + error.message);
                }
              });
        }else{
            alert("Please fill out all fields.");
        }
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Register User</h2>

                    <form onSubmit={(e) => onSubmit(e)}>

                        <div className='mb-3 text-start'>
                            <label htmlFor='Username' className='form-label'>
                                Username
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter username"
                                name="username"
                                value={username}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className='mb-3 text-start'>
                            <label htmlFor='Email' className='form-label'>
                                Password
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter password"
                                name="password"
                                value={password}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <button type='submit' className='btn btn-outline-success'>Submit</button>
                        <Link type='submit' className='btn btn-outline-danger mx-2'to={'/users/userman'}>Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
