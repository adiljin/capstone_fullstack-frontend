import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

export default function EditClient() {

    let navigate = useNavigate()

    const {id} = useParams()

    const [client, setClient] = useState({
        name: "",
        address: "",
        number: "",
        e_mail: ""
    })

    const { name, address, number, e_mail} = client

    const onInputChange = (e) => {
        setClient({ ...client, [e.target.name]: e.target.value })
    }

    // Show current name, email, username to change
    useEffect(()=>{
        loadClient()
    },[])

    const onSubmit = async (e) => {
        if(client.name!==""&&client.address!==""&&client.number!==""&&client.e_mail!==""){
            e.preventDefault();
            await axios.put(`http://localhost:8080/company-ship/company/${id}`, client)
            navigate("/pages/clientman")
        }else{
            alert("Please fill out all fields.");
        }
        
    }

    // Show current name, email, username to change
    const loadClient = async()=>{
        const result=await axios.get(`http://localhost:8080/company-ship/companies/${id}`)
        setClient(result.data)
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Edit Company</h2>

                    <form onSubmit={(e) => onSubmit(e)}>

                        <div className='mb-3 text-start'>
                            <label htmlFor='portName' className='form-label'>
                                Company name
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
                        <Link type='submit' className='btn btn-outline-danger mx-2'to={'/pages/clientman'}>Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
