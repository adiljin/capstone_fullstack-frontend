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
                {
                    <div class="d-grid gap-2 col-6 mx-auto">
                        <Link class="btn btn-dark" type="button" to={`/pages/Main`}>Main page</Link>
                    </div>
                }
            </div>
        </div>
    )

}
