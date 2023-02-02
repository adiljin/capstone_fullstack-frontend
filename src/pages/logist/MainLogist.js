import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';
import jwt_decode from "jwt-decode";

export default function Main() {

    const [username, setusername] = useState([]);

    useEffect(() => {
        setusername(getUsernameFromJWT());
    }, []);
    
    function getUsernameFromJWT() {
        const token = localStorage.getItem("jwt");
        if (token !== '""') {
            const decodedJwt = jwt_decode(localStorage.getItem("jwt"));
            return decodedJwt.sub;
        }
        return [];
    }

    // console.log(username);

    return (
        <div className='container'>
            <div className='py-4'>
                {
                    <div class="d-grid gap-2 col-6 mx-auto">
                        <Link class="btn btn-dark" type="button" to={`/pages/RoutMan`}>Routes Management</Link>
                        <Link class="btn btn-dark" type="button" to={`/pages/FreMan`}>Freights Management</Link>
                        <Link class='btn btn-dark' to={`/editsingleser/${username}`}>Change password</Link>
                        <button class="btn btn-dark my-4" type="button" onClick={() => {
                            localStorage.clear();
                            window.location.href = "/login";
                        }}>Logout</button>
                    </div>
                }
            </div>
        </div>
    )

}
