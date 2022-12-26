import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

export default function AddClient() {

    let navigate = useNavigate()

    const [client, setCli] = useState({
        name: "",
        address: "",
        number: "",
        e_mail: ""
    })

    const { name, address, number, e_mail } = client

    const onInputChange = (e) => {
        setCli({ ...client, [e.target.name]: e.target.value })

        // Check the selected option and update the name state variable accordingly
        if (e.target.value === 'cruise') {
            setCli({ ...client, name: 'Option 1 selected' });
        } else if (e.target.value === 'cargo') {
            setCli({ ...client, name: 'Option 2 selected' });
        } else if (e.target.value === 'tugboat') {
            setCli({ ...client, name: 'Option 3 selected' });
        } else if (e.target.value === 'barge') {
            setCli({ ...client, name: 'Option 2 selected' });
        } else if (e.target.value === 'container') {
            setCli({ ...client, name: 'Option 3 selected' });
        } else if (e.target.value === 'tanker') {
            setCli({ ...client, name: 'Option 3 selected' });
        }
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

    const [selectedOption, setSelectedOption] = useState('option1');

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Register Shipping Company</h2>

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

                            {/* Dropdown */}
                            <div class="btn-group d-grid gap-2 my-2" role="group" aria-label="Button group with nested dropdown">
                                <label htmlFor='ship' className='form-label text-start'>
                                    Ship type
                                </label>
                                <select
                                    className="form-control"
                                    name="ship"
                                    value={name}
                                    onChange={(e) => onInputChange(e)}
                                >
                                    <option value="cruise">Cruise</option>
                                    <option value="cargo">Cargo</option>
                                    <option value="tugboat">Tugboat</option>
                                    <option value="barge">Barge</option>
                                    <option value="container">Container</option>
                                    <option value="tanker">Tanker</option>
                                </select>
                            </div>
                            {/* Dropdown */}

                        </div>


                        <button type='submit' className='btn btn-outline-success my-3'>Submit</button>
                        <Link type='submit' className='btn btn-outline-danger mx-2' to={'/pages/clientman'}>Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
