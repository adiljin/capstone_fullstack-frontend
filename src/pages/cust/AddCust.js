import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

export default function AddCust() {

    let navigate = useNavigate()

    const [cust, setCust] = useState({
        name: "",
        address: "",
        number: "",
        e_mail: ""
    })

    const { name, address, number, e_mail } = cust

    const onInputChange = (e) => {
        setCust({ ...cust, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        if (cust.name !== "" && cust.address !== "" && cust.number !== "" && cust.e_mail) {
            e.preventDefault();
            await axios.post(`http://localhost:8080/cust`, cust)
            navigate("/pages/CustMan")
        } else {
            alert("Please fill out all fields.");
        }
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Register Customer/Shipper</h2>

                    <form onSubmit={(e) => onSubmit(e)}>
                        <div>
                            <div className='text-start'>
                                <label htmlFor='name' className='form-label'>
                                    Company name
                                </label>
                                <div>
                                    <input
                                        type={"text"}
                                        className="form-control"
                                        placeholder="Company name"
                                        name="name"
                                        value={name}
                                        onChange={(e) => onInputChange(e)}
                                    />
                                </div>
                            </div>
                            <div className='mb-3 text-start my-2'>
                                <label htmlFor='address' className='form-label'>
                                    Address
                                </label>
                                <input
                                    type={"text"}
                                    className="form-control"
                                    placeholder="Address"
                                    name="address"
                                    value={address}
                                    onChange={(e) => onInputChange(e)}
                                />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                                <div className='mb-3 text-start mx-1'>
                                    <label htmlFor='number' className='form-label'>
                                        Number
                                    </label>
                                    <input
                                        type={"text"}
                                        className="form-control"
                                        placeholder="Enter phone#"
                                        name="number"
                                        value={number}
                                        onChange={(e) => onInputChange(e)}
                                        pattern="[0-9]*"
                                        inputmode="numeric"
                                    />
                                </div>
                                <div className='mb-3 text-start'>
                                    <label htmlFor='Email' className='form-label'>
                                        Email
                                    </label>
                                    <input
                                        type={"text"}
                                        className="form-control"
                                        placeholder="Email"
                                        name="e_mail"
                                        value={e_mail}
                                        onChange={(e) => onInputChange(e)}
                                    />
                                </div>
                            </div>
                        </div>
                        <button type='submit' className='btn btn-outline-success my-3'>Submit</button>
                        <Link type='submit' className='btn btn-outline-danger mx-2' to={'/pages/CustMan'}>Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
