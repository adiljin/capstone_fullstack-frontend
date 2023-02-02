import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';

export default function UserMan() {
    const [user, setUser] = useState([])
    useEffect(() => {
        loadUsers();
    }, []);

    const { id } = useParams()

    const loadUsers = async () => {
        const result = await axios.get("http://localhost:3000/user/users");
        setUser(result.data);
    };

    const deleteUser = async (idA, idU) => {
        if (
            window.confirm(
            `Please confirm deletion`
            ) === false
        ) {
            return;
        }
        const result = await axios.get(`http://localhost:3000/user/${idU}`);
        if (result.data.authorities[0].authority === "ROLE_STD") {
            await axios.delete(`http://localhost:3000/authority/${idA}`)
            await axios.delete(`http://localhost:3000/user/${idU}`)
            loadUsers();
        } else {
            alert("Error: Only ROLE_STD can be deleted");
        }
    }

    user.map((us) => {
        // console.log(us);
        // console.log("ID " + us.authorities[0].id);
    })

    return (
        <div className='container'>
            <div className='py-4'>
                <div class="d-grid mx-auto">
                    <Link class="btn btn-outline-success" type="button" to={`/adduser`}>Add User</Link>
                    <Link class="btn btn-outline-dark" type="button" to={`/pages/main`}>Return</Link>
                </div>
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Username</th>
                            <th scope="col">Role</th>
                            {/* <th scope="col">Test</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            user.map((usere, index) =>
                                <tr>
                                    <th scope="row" key={index}>{index + 1}</th>
                                    {/* <td>{routee.id}</td> */}
                                    <td>{usere.username}</td>
                                    <td>{usere.authorities[0].authority}</td>
                                    {/* <td>{routee.id}</td> */}
                                    <td>
                                        <Link className='btn btn-outline-dark mx-2' to={`/editrole/${usere.authorities[0].id}`}>Role</Link>
                                        <Link className='btn btn-outline-success mx-2' to={`/edituser/${usere.id}`}>Edit</Link>
                                        <button className='btn btn-outline-danger mx-2' onClick={() => deleteUser(usere.authorities[0].id, usere.id)}>Delete</button>
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
