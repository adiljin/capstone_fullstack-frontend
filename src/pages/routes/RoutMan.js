import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';

export default function RoutMan() {
    const [route, setRoute] = useState([])
    useEffect(() => {
        loadRoutes();
    }, []);

    const { id } = useParams()

    const loadRoutes = async () => {
        const result = await axios.get("http://localhost:3000/rout/routes");
        setRoute(result.data);
    };

    // function loadRoutes(){
    //     fetch("http://localhost:8080/rout/routes", {
    //         headers: {
    //             "Content-Type": "application/json",
    //             Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    //         },
    //         method: "GET",
    //     })
    // }

    const deleteRoute = async (id) => {
        if (
            window.confirm(
            `Please confirm deletion`
            ) === false
        ) {
            return;
        }
        await axios.delete(`http://localhost:3000/rout/route/${id}`)
        loadRoutes();
    }

    return (
        <div className='container'>
            <div className='py-4'>
                <div class="d-grid mx-auto">
                    <Link class="btn btn-outline-success" type="button" to={`/pages/routes/AddRoute`}>Add route</Link>
                    <Link class="btn btn-outline-dark" type="button" to={`/pages/main`}>Return</Link>
                </div>
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Port name</th>
                            <th scope="col">Price</th>
                            {/* <th scope="col">Test</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            route.map((routee, index) =>
                                <tr>
                                    <th scope="row" key={index}>{index + 1}</th>
                                    {/* <td>{routee.id}</td> */}
                                    <td>{routee.portName}</td>
                                    <td>{routee.priceFrom}</td>
                                    {/* <td>{routee.id}</td> */}
                                    <td>
                                        <Link className='btn btn-outline-success mx-2' to={`/pages/routes/editroute/${routee.id}`}>Edit</Link>
                                        <button className='btn btn-outline-danger mx-2' onClick={() => deleteRoute(routee.id)}>Delete</button>
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
