import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { SERVER_IP } from '../pages/network/net.js';

export default function EditRole() {

    let navigate = useNavigate()

    const { id } = useParams()

    const [role, setUser] = useState({
        authority: ""
    })

    const { authority } = role

    const onInputChange = (e) => {
        // setUser({ ...role, [e.target.name]: e.target.value })

        if (e.target.value === 'ROLE_ADMIN') {
            setUser({ ...role, [e.target.name]: e.target.value })
        } else if (e.target.value === 'ROLE_SHIP') {
            setUser({ ...role, [e.target.name]: e.target.value })
        } else if (e.target.value === 'ROLE_CUST') {
            setUser({ ...role, [e.target.name]: e.target.value })
        } else if (e.target.value === 'ROLE_LOGIST') {
            setUser({ ...role, [e.target.name]: e.target.value })
        } else if (e.target.value === 'ROLE_STD') {
            setUser({ ...role, [e.target.name]: e.target.value })
        }
    }

    // Show current name, email, username to change
    useEffect(() => {
        loadRole()
    }, [])

    const onSubmit = async (e) => {
        if (role.authority !== "") {
            e.preventDefault();
            await axios.put(`http://${SERVER_IP}:3000/authority/${id}`, role)
        }
        navigate("/users/userman")
    }

    // Show current name, email, username to change
    const loadRole = async () => {
        const result = await axios.get(`http://${SERVER_IP}:3000/authority/${id}`)
        setUser(result.data)
    }

    // console.log(role)

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Edit Role</h2>

                    <form onSubmit={(e) => onSubmit(e)}>
                        {/* <div className='mb-3 text-start'>
                            <label htmlFor='Username' className='form-label'>
                                Role
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter role"
                                name="authority"
                                value={authority}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div> */}

                        <div class="btn-group d-grid gap-2 mb-3 text-start" role="group" aria-label="Button group with nested dropdown">
                                    <label htmlFor='ship' className='form-label text-start mb-0'>
                                        Role type
                                    </label>
                                    <select
                                        className="form-control"
                                        name="authority"
                                        value={authority}
                                        onChange={(e) => onInputChange(e)}
                                    >
                                        <option>Choose role</option>
                                        <option value="ROLE_ADMIN">Admin</option>
                                        <option value="ROLE_SHIP">Shipper</option>
                                        <option value="ROLE_CUST">Customer</option>
                                        <option value="ROLE_LOGIST">Logistic coordinator</option>
                                        <option value="ROLE_STD">Standard restricted</option>
                                    </select>
                                </div>

                        <button type='submit' className='btn btn-outline-success'>Submit</button>
                        <Link type='submit' className='btn btn-outline-danger mx-2' to={'/users/userman'}>Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
