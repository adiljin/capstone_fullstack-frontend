import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

export default function AddClient() {

    let navigate = useNavigate()
    let shiper = "contract"
    let lease

    const [client, setCli] = useState({
        name: "",
        address: "",
        number: "",
        email: "",
        years: "",
        typeLease: ""
    })

    const [tot, setTot] = useState({
        tprice:"",
        tlea:""
    })

    const [wei, setWei] = useState({
        weightMin: "",
        weightMax: ""
    })

    const [shi, setShi] = useState({
        shipType: ""
    })

    const { name, address, number, email, years, typeLease } = client
    const { weightMin, weightMax } = wei
    const { shipType } = shi
    const { tprice, tlea} = tot


    const onInputChange = (e) => {
        setCli({ ...client, [e.target.name]: e.target.value })

        // Check the selected option and update the name state variable accordingly
        if (e.target.value === 'cruise') {
            setWei({ ...wei, weightMin: '50', weightMax: '1000' })
            setShi({ ...shi, shipType: 'cruise' })
            setTot({ ...tot, tprice: '1000' })
        } else if (e.target.value === 'cargo') {
            setWei({ ...wei, weightMin: '2000', weightMax: '5000' });
            setShi({ ...shi, shipType: 'cargo' })
            setTot({ ...tot, tprice: '2000' })
        } else if (e.target.value === 'tugboat') {
            setWei({ ...client, weightMin: '3000', weightMax: '6000' });
            setShi({ ...shi, shipType: 'tugboat' })
            setTot({ ...tot, tprice: '3000' })
        } else if (e.target.value === 'barge') {
            setWei({ ...client, weightMin: '6000', weightMax: '9000' });
            setShi({ ...shi, shipType: 'barge' })
            setTot({ ...tot, tprice: '5000' })
        } else if (e.target.value === 'container') {
            setWei({ ...client, weightMin: '7000', weightMax: '10000' });
            setShi({ ...shi, shipType: 'container' })
            setTot({ ...tot, tprice: '6000' })
        } else if (e.target.value === 'tanker') {
            setWei({ ...client, weightMin: '5000', weightMax: '8000' });
            setShi({ ...shi, shipType: 'tanker' })
            setTot({ ...tot, tprice: '4000' })
        }
        if (e.target.value === 'contract') {
            setCli({ ...client, typeLease: 'contract' });
            setTot({ ...tot, tlea: '9%' })
        } else if (e.target.value === 'operating') {
            setCli({ ...client, typeLease: 'operating' });
            setTot({ ...tot, tlea: '7%' })
        }
        
    }

    const onSubmit = async (e) => {
        if (client.name !== "" && client.address !== "" && client.number !== "" && client.email !== "" && client.years !== "" && client.typeLease !== "") {
            e.preventDefault();
            await axios.post(`http://localhost:8080/${shi.shipType}`, client)
            navigate("/pages/clientman")
        } else {
            console.log(client.name + " " + client.address + " " + client.number + " " + client.email + " " + client.years + " " + client.typeLease + " " + shi.shipType)
            alert("Please fill out all fields.");
        }
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Register carrier company</h2>

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
                                        name="email"
                                        value={email}
                                        onChange={(e) => onInputChange(e)}
                                    />
                                </div>
                            </div>
                            {/* check */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
                                <div className='mb-3 text-start mx-1'>
                                    <label htmlFor='years' className='form-label'>
                                        Years of leasing
                                    </label>
                                    <input
                                        type={"text"}
                                        className="form-control"
                                        placeholder="Years"
                                        name="years"
                                        value={years}
                                        onChange={(e) => onInputChange(e)}
                                        pattern="[0-9]*"
                                        inputmode="numeric"
                                    />
                                </div>
                                {/* Dropdown */}
                                <div class="btn-group d-grid gap-2 mb-3 text-start" role="group" aria-label="Button group with nested dropdown">
                                    <label htmlFor='ship' className='form-label text-start mb-0'>
                                        Ship type
                                    </label>
                                    <select
                                        className="form-control"
                                        name="ship"
                                        value={shipType}
                                        onChange={(e) => onInputChange(e)}
                                    >
                                        <option>Choose ship type</option>
                                        <option value="cruise">Cruise - 1000/year</option>
                                        <option value="cargo">Cargo - 2000/year</option>
                                        <option value="tugboat">Tugboat - 3000/year</option>
                                        <option value="barge">Barge - 5000/year</option>
                                        <option value="tanker">Tanker - 4000/year</option>
                                        <option value="container">Container - 6000/year</option>
                                    </select>
                                </div>
                                {/* Dropdown */}
                                {/* Dropdown */}
                                <div class="btn-group d-grid gap-2 mb-3 text-start ms-1" role="group" aria-label="Button group with nested dropdown">
                                    <label htmlFor='ship' className='form-label text-start mb-0'>
                                        Lease type
                                    </label>
                                    <select
                                        className="form-control"
                                        name="lease"
                                        value={typeLease}
                                        onChange={(e) => onInputChange(e)}
                                    >
                                        <option>Choose Lease</option>
                                        <option value="contract">Contract - 9%</option>
                                        <option value="operating">Operating - 7%</option>
                                    </select>
                                </div>
                                {/* Dropdown */}
                            </div>
                            {/* check */}

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                                <div className='mb-3 text-start mx-1'>
                                    <label htmlFor='min' className='form-label'>
                                        Min Weight
                                    </label>
                                    <input
                                        type={"label"}
                                        className="form-control"
                                        placeholder=""
                                        name="min_weight"
                                        readOnly
                                        value={weightMin}
                                        onChange={(e) => onInputChange(e)}
                                    />
                                </div>
                                <div className='mb-3 text-start'>
                                    <label htmlFor='max' className='form-label'>
                                        Max Weight
                                    </label>
                                    <input
                                        type={"text"}
                                        className="form-control"
                                        placeholder=""
                                        name="max_weight"
                                        readOnly
                                        value={weightMax}
                                        onChange={(e) => onInputChange(e)}
                                    />
                                </div>
                            </div>
                            <label class='fw-lighter' htmlFor='max' className='form-label'>
                                Total = {tprice} * {years} / {tlea}
                            </label>
                        </div>


                        <button type='submit' className='btn btn-outline-success my-3'>Submit</button>
                        <Link type='submit' className='btn btn-outline-danger mx-2' to={'/pages/clientman'}>Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
