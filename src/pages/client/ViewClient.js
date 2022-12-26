import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';

export default function ViewClient() {
    const [client, setClients] = useState([])
    useEffect(() => {
        loadClients();
    }, []);

    const { id } = useParams()

    const loadClients = async () => {
        const result = await axios.get("http://localhost:8080/company-ship/companies");
        setClients(result.data);
    };

    const deleteRoute = async (id) => {
        await axios.delete(`http://localhost:8080/company-ship/company/${id}`)
        loadClients();
    }

    return (
        <div className='container'>
            <div className='py-4'>
                <div class="d-grid mx-auto">
                    <Link type='submit' className='btn btn-outline-dark' to={'/pages/clientman'}>Return</Link>
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
                            client.map((client, index) =>
                                <tr>
                                    <th scope="row" key={index}>{index + 1}</th>
                                    {/* <td>{routee.id}</td> */}
                                    <td>{client.name}</td>
                                    <td>{client.address}</td>
                                    <td>{client.number}</td>
                                    <td>{client.e_mail}</td>
                                    {/* <td>{routee.id}</td> */}
                                    <td>
                                        <Link className='btn btn-outline-success mx-2' to={`/pages/clientman/editcli/${client.id}`}>Edit</Link>
                                        <button className='btn btn-outline-danger mx-2' onClick={() =>deleteRoute(client.id)}>Delete</button>
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
