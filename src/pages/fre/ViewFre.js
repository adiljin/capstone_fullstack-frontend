import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';

export default function ViewFre() {
    const [fre, setCust] = useState([])
    useEffect(() => {
        loadFre();
    }, []);

    const { id } = useParams()

    const loadFre = async () => {
        const result = await axios.get("http://localhost:3000/fre/get");
        setCust(result.data);
    };



    const deleteRoute = async (id) => {
        if (
            window.confirm(
            `Please confirm deletion`
            ) === false
        ) {
            return;
        }
        await axios.delete(`http://localhost:3000/fre/${id}`)
        loadFre();
    }

    return (
        <div className='container'>
            <div className='py-4'>
                <div class="d-grid mx-auto">
                    <Link type='submit' className='btn btn-outline-dark' to={'/pages/freman'}>Return</Link>
                </div>
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Date</th>
                            <th scope="col">Customer</th>
                            <th scope="col">Ship</th>
                            <th scope="col">From</th>
                            <th scope="col">To</th>
                            <th scope="col">Weight</th>
                            <th scope="col">Price</th>
                            {/* <th scope="col">Test</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            fre.map((fre, index) =>
                                <tr>
                                    <th scope="row" key={index}>{index + 1}</th>
                                    {/* <td>{routee.id}</td> */}
                                    <td>{fre.createdAt}</td>
                                    <td>{fre.customer.name}</td>
                                    <td>{fre.ship.name} - {fre.ship.type}</td>
                                    <td>{fre.routeF.portName}</td>
                                    <td>{fre.routeT.portName}</td>
                                    <td>{fre.weight}</td>
                                    <td>{fre.price}</td>
                                    {/* <td>{routee.id}</td> */}
                                    <td>
                                        <button className='btn btn-outline-danger mx-2' onClick={() =>deleteRoute(fre.id)}>Delete</button>
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
