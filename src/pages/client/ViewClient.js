import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';
import { SERVER_IP } from '../network/net.js';

export default function ViewClient() {

    const [cruise, setCruise] = useState([]);
    const [cargo, setCargo] = useState([]);
    const [tugboat, setTugboat] = useState([]);
    const [barge, setBarge] = useState([]);
    const [container, setContainer] = useState([]);
    const [tanker, setTanker] = useState([]);
    useEffect(() => {
        loadClients();
    }, []);

    const ships = [
        { type: 'cruise', data: cruise, setter: setCruise },
        { type: 'cargo', data: cargo, setter: setCargo },
        { type: 'tugboat', data: tugboat, setter: setTugboat },
        { type: 'barge', data: barge, setter: setBarge },
        { type: 'container', data: container, setter: setContainer },
        { type: 'tanker', data: tanker, setter: setTanker }
    ];

    const { id } = useParams()

    const loadClients = async () => {
        const promises = ships.map(({ type }) => axios.get(`http://${SERVER_IP}:3000/${type}/${type}s`));
        const responses = await Promise.all(promises);
        responses.forEach(({ data }, index) => {
            const { setter } = ships[index];
            setter(data);
        });
    };

    const deleteRoute = async (id, cls) => {
        if (
            window.confirm(
            `Please confirm deletion`
            ) === false
        ) {
            return;
        }
        await axios.delete(`http://${SERVER_IP}:3000/${cls}/del/${id}`)
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
                            {/* <th scope="col">#</th> */}
                            <th scope="col">Type of Ship</th>
                            <th scope="col">Company name</th>
                            <th scope="col">Address</th>
                            <th scope="col">Number</th>
                            <th scope="col">Email</th>
                            <th scope="col">Years of leasing</th>
                            <th scope="col">Type of Lease</th>
                            <th scope="col">Price</th>
                            <th scope="col">Min/Max weight</th>
                            {/* <th scope="col">Test</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            ships.map(({ type, data }) => (
                                data.map(client => (
                                    // <li key={item.id}>{item.name}</li>
                                    <tr>
                                        {/* <th scope="row" key={index}>{index + 1}</th> */}
                                        <td>{type}</td>
                                        <td>{client.name}</td>
                                        <td>{client.address}</td>
                                        <td>{client.number}</td>
                                        <td>{client.email}</td>
                                        <td>{client.years}</td>
                                        <td>{client.typeLease}</td>
                                        <td>{client.price}</td>
                                        <td>{client.weightMin + "/" + client.weightMax}</td>
                                        <td>
                                            <Link className='btn btn-sm btn-outline-success mx-2' to={`/pages/clientman/editcli/${client.type.toLowerCase()}/${client.id}`}>Edit</Link>
                                            <button className='btn btn-sm btn-outline-danger mx-2' onClick={() => deleteRoute(client.id, client.type.toLowerCase())}>Delete</button>
                                        </td>
                                    </tr>


                                ))
                            ))

                            // ships.map((client, index) =>
                            //     <tr>
                            //         <th scope="row" key={index}>{index + 1}</th>
                            //         {/* <td>{client.id}</td> */}
                            //         <td>{client.name}</td>
                            //         <td>{client.address}</td>
                            //         <td>{client.number}</td>
                            //         <td>{client.email}</td>
                            //         <td>{client.years}</td>
                            //         <td>{client.typeLease}</td>
                            //         {/* <td>{routee.id}</td> */}
                            // <td>
                            //     <Link className='btn btn-outline-success mx-2' to={`/pages/clientman/editcli/${client.id}`}>Edit</Link>
                            //     <button className='btn btn-outline-danger mx-2' onClick={() => deleteRoute(client.id, client.type.toLowerCase())}>Delete</button>
                            // </td>
                            //     </tr>
                            // )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
