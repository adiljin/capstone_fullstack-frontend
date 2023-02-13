import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { SERVER_IP } from '../pages/network/net.js';

export default function ViewUser() {

    const [user,setUser]=useState({
        name:"",
        username:"",
        email:""
    })

    const {id} = useParams();

    useEffect(()=>{
        loadUser()
    },[]);

    const loadUser=async()=>{
        const result=await axios.get(`http://${SERVER_IP}:8080/user/${id}`, user)
        setUser(result.data)
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>User Details</h2>
                    <div className='card'>
                        <div className='card-header'>
                            Details of user id: {user.id}
                            <ul className='list-group list-group-flush'>
                                <li className='list-group-item'>
                                    <b>Name:</b>
                                    {user.name}
                                </li>

                                <li className='list-group-item'>
                                    <b>Username:</b>
                                    {user.username}
                                </li>

                                <li className='list-group-item'>
                                    <b>Email:</b>
                                    {user.email}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Link type='submit' className='btn btn-outline-success my-2'to={'/pages/main'}>Back Home</Link>
                </div>
            </div>
        </div>
    )
}
