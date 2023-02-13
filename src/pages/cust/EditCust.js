import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { SERVER_IP } from '../network/net.js';

export default function EditCust() {

    let navigate = useNavigate()

    const {id} = useParams()

    const [cust, setCust] = useState({
        name: "",
        address: "",
        number: "",
        e_mail: ""
    })

    const { name, address, number, e_mail} = cust

    const onInputChange = (e) => {
        setCust({ ...cust, [e.target.name]: e.target.value })
    }

    // Show current name, email, username to change
    useEffect(()=>{
        loadCust()
    },[])

    const onSubmit = async (e) => {
        if(cust.name!==""&&cust.address!==""&&cust.number!==""&&cust.e_mail!==""){
            e.preventDefault();
            await axios.put(`http://${SERVER_IP}:3000/cust/set/${id}`, cust)
            navigate("/pages/cust/viewcust")
        }else{
            alert("Please fill out all fields.");
        }
        
    }

    // Show current name, email, username to change
    const loadCust = async()=>{
        const result=await axios.get(`http://${SERVER_IP}:3000/cust/${id}`)
        setCust(result.data)
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Edit Company</h2>

                    <form onSubmit={(e) => onSubmit(e)}>

                        <div className='mb-3 text-start'>
                            <label htmlFor='portName' className='form-label'>
                                Customer name
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter route's name"
                                name="name"
                                value={name}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className='mb-3 text-start'>
                            <label htmlFor='priceFrom' className='form-label'>
                                Address
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter price"
                                name="address"
                                value={address}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className='mb-3 text-start'>
                            <label htmlFor='priceFrom' className='form-label'>
                                Number
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter price"
                                name="number"
                                value={number}
                                pattern="[0-9]*"
                                inputmode="numeric"
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className='mb-3 text-start'>
                            <label htmlFor='priceFrom' className='form-label'>
                                E-mail
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter price"
                                name="e_mail"
                                value={e_mail}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <button type='submit' className='btn btn-outline-success'>Submit</button>
                        <Link type='submit' className='btn btn-outline-danger mx-2'to={'/pages/cust/viewcust'}>Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
