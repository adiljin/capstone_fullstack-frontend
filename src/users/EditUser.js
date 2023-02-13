import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { SERVER_IP } from '../pages/network/net.js';

export default function EditUser() {

    let navigate = useNavigate()

    const {id} = useParams()

    const [user, setUser] = useState({
        username: "",
        password: "",
        authorities: ""
    })

    const { username, password, authorities } = user

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    // Show current name, email, username to change
    useEffect(()=>{
        loadUser()
    },[])

    const onSubmit = async (e) => {
        if(user.name!==""&&user.username!==""&&user.email!==""){
            e.preventDefault();
            await axios.put(`http://${SERVER_IP}:3000/user/${id}`, user)
        }
        navigate("/users/userman")
    }

    // Show current name, email, username to change
    const loadUser = async()=>{
        const result=await axios.get(`http://${SERVER_IP}:3000/user/${id}`)
        setUser(result.data)
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Edit User</h2>

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
                            <label htmlFor='Password' className='form-label'>
                                Password
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter password"
                                name="password"
                                // value={password}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        {/* <div className='mb-3 text-start'>
                            <label htmlFor='Role' className='form-label'>
                                Role
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter role"
                                name="authorities"
                                value={authorities[0].authority}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div> */}
                        <button type='submit' className='btn btn-outline-success'>Submit</button>
                        <Link type='submit' className='btn btn-outline-danger mx-2'to={'/users/userman'}>Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
