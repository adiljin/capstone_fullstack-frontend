import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

export default function AddClient() {

    let navigate = useNavigate()

    const [client, setUser] = useState({
        name: "",
        address: "",
        number: "",
        e_mail: ""
    })

    const { name, address, number, e_mail } = client

    const onInputChange = (e) => {
        setUser({ ...client, [e.target.name]: e.target.value })
    }


    const onSubmit = async (e) => {
        if (client.name !== "" && client.address !== "" && client.number !== "" && client.e_mail !== "") {
            e.preventDefault();
            await axios.post("http://localhost:8080/company-ship", client)
            navigate("/pages/clientman")
        } else {
            alert("Please fill out all fields.");
        }

    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Register Shipping Company</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <table className="table border shaow">
                            <div class="my-4" className='mb-3 text-start'>
                                <label htmlFor='name' className='form-label'>
                                    Company suka
                                </label>
                                <input
                                    type={"text"}
                                    className="form-control"
                                    placeholder="Company name"
                                    name="name"
                                    value={name}
                                    onChange={(e) => onInputChange(e)}
                                />
                            </div>
                            <div className='mb-3 text-start'>
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
                            <div className='mb-3 text-start'>
                                <label htmlFor='number' className='form-label'>
                                    Number
                                </label>
                                <input
                                    type={"text"}
                                    className="form-control"
                                    placeholder="Enter your email"
                                    name="number"
                                    value={number}
                                    onChange={(e) => onInputChange(e)}
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
                        </table>
                        <button type='submit' className='btn btn-outline-success'>Submit</button>
                        <Link type='submit' className='btn btn-outline-danger mx-2' to={'/pages/clientman'}>Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
