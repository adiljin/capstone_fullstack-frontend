import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';

export default function Home() {

    const [ships, setUsers] = useState([])
    const [companies, setCompanies] = useState([])
    const [combinedData, setCombinedData] = useState([])
    useEffect(() => {
        loadUsers();
        loadShips();
    }, []);

    const { id } = useParams()

    const loadUsers = async () => {
        const result = await axios.get("http://localhost:8080/ships");
        setUsers(result.data);
    };

    const loadShips = async () => {
        const result = await axios.get("http://localhost:8080/company-ship/companies");
        setCompanies(result.data);
    };

    useEffect(() => {
        setCombinedData(ships.concat(companies))
    }, [ships, companies])

    const deleteUser = async (id) => {
        await axios.delete(`http://localhost:8080/user/${id}`)
        loadUsers();
    }
    return (
        <div className='container'>
            <div className='py-4'>
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">CompanyID/ShipID</th>
                            <th scope="col">Company/Type</th>
                            <th scope="col">Price</th>
                            <th scope="col">Address</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            combinedData.map((item, index) =>
                                <tr>
                                    <th scope="row" key={index}>{index + 1}</th>
                                    <td>{item.price}</td>
                                    <td>{item.type}</td>
                                    <td>{item.type}</td>
                                    <td>{item.price}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <Link className='btn btn-outline-success mx-2' to={`/viewuser/${item.id}`}>View</Link>
                                        <Link className='btn btn-outline-primary mx-2' to={`/edituser/${item.id}`}>Edit</Link>
                                        <button className='btn btn-outline-danger mx-2' onClick={() => deleteUser(item.id)}>Delete</button>
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
