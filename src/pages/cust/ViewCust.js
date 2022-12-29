import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';

export default function ViewCust() {
    const [cust, setCust] = useState([])
    useEffect(() => {
        loadCust();
    }, []);

    const { id } = useParams()

    const loadCust = async () => {
        const result = await axios.get("http://localhost:8080/cust/get");
        setCust(result.data);
    };

    const deleteRoute = async (id) => {
        await axios.delete(`http://localhost:8080/cust/${id}`)
        loadCust();
    }

    return (
        <div className='container'>
            <div className='py-4'>
                <div class="d-grid mx-auto">
                    <Link type='submit' className='btn btn-outline-dark' to={'/pages/CustMan'}>Return</Link>
                </div>
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Company name</th>
                            <th scope="col">Address</th>
                            <th scope="col">Number</th>
                            <th scope="col">Email</th>
                            {/* <th scope="col">Test</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cust.map((cust, index) =>
                                <tr>
                                    <th scope="row" key={index}>{index + 1}</th>
                                    {/* <td>{routee.id}</td> */}
                                    <td>{cust.name}</td>
                                    <td>{cust.address}</td>
                                    <td>{cust.number}</td>
                                    <td>{cust.e_mail}</td>
                                    {/* <td>{routee.id}</td> */}
                                    <td>
                                        <Link className='btn btn-outline-success mx-2' to={`/pages/cust/editcust/${cust.id}`}>Edit</Link>
                                        <button className='btn btn-outline-danger mx-2' onClick={() =>deleteRoute(cust.id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
