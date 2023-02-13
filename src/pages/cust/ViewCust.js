import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';
import { SERVER_IP } from '../network/net.js';

export default function ViewCust() {
    const [cust, setCust] = useState([])
    useEffect(() => {
        loadCust();
    }, []);

    const { id } = useParams()

    const loadCust = async () => {
        const result = await axios.get(`http://${SERVER_IP}:3000/cust/get`);
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
        await axios.delete(`http://${SERVER_IP}:3000/cust/${id}`)
        .then(response => {
          })
          .catch(error => {
            if (error.response) {
              // The request was made and the server responded with a status code that falls out of the range of 2xx
              alert(error.response.data);
            } else if (error.request) {
              // The request was made but no response was received
              alert("Error: No response received");
            } else {
              // Something happened in setting up the request that triggered an Error
              alert("Error: " + error.message);
            }
          });
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
