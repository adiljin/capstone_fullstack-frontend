import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

export default function EditRoute() {

    let navigate = useNavigate()

    const {id} = useParams()

    const [route, setRoute] = useState({
        portName: "",
        priceFrom: "",
    })

    const { portName, priceFrom} = route

    const onInputChange = (e) => {
        setRoute({ ...route, [e.target.name]: e.target.value })
    }

    // Show current name, email, username to change
    useEffect(()=>{
        loadRoute()
    },[])

    const onSubmit = async (e) => {
        if(route.portName!==""&&route.priceFrom!==""){
            e.preventDefault();
            await axios.put(`http://localhost:8080/rout/route/${id}`, route)
        }
        navigate("/pages/routman")
    }

    // Show current name, email, username to change
    const loadRoute = async()=>{
        const result=await axios.get(`http://localhost:8080/rout/route/${id}`)
        setRoute(result.data)
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Edit Route</h2>

                    <form onSubmit={(e) => onSubmit(e)}>

                        <div className='mb-3 text-start'>
                            <label htmlFor='portName' className='form-label'>
                                Port name
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter route's name"
                                name="portName"
                                value={portName}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className='mb-3 text-start'>
                            <label htmlFor='priceFrom' className='form-label'>
                                Price
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter price"
                                name="priceFrom"
                                value={priceFrom}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <button type='submit' className='btn btn-outline-success'>Submit</button>
                        <Link type='submit' className='btn btn-outline-danger mx-2'to={'/pages/routman'}>Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
