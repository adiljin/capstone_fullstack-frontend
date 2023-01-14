import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocalState } from '../../util/useLocalStorage';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBIcon
}
    from 'mdb-react-ui-kit';


export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [jwt, setJwt] = useLocalState("", "jwt");

    useEffect(() => {
        console.log(`JWT is: ${jwt}`)
    }, [jwt]);

    function sendLoginRequest() {
        const reqBody = {
            username: username,
            password: password,
        };

        fetch("api/auth/login", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "post",
            body: JSON.stringify(reqBody),
        })
            .then((response) => {
                if (response.status === 200) {
                    return Promise.all([response.json(), response.headers])
                } else {
                    return Promise.reject("Invalid login attempt")
                }

            })

            .then(([body, headers]) => {
                setJwt(headers.get("authorization"));
                // console.log("Local Storage" + localStorage.getItem("jwt"));
                window.location.href = "/pages/Main";
            }).catch((message) => {
                alert(message);
            });
    }

    return (

        <MDBContainer fluid>

            <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                <MDBCol col='12'>

                    <MDBCard className='bg-dark text-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
                        <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

                            <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                            <p className="text-white-50 mb-5">Please enter your username and password!</p>

                            <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Username' id="username" name="username" value={username} type={"username"} onChange={(e) => setUsername(e.target.value)} size="lg" />
                            <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Password' id="password" name="password" value={password} type={"password"} onChange={(e) => setPassword(e.target.value)} size="lg" />

                            <button class="btn btn-dark btn-lg" id='submit' type='button' onClick={() => sendLoginRequest()}>
                                LOGIN
                            </button>

                        </MDBCardBody>
                    </MDBCard>

                </MDBCol>
            </MDBRow>

        </MDBContainer>

        // <div classNameName='container my-12'>
        //     <div classNameName='row'>
        //         <div classNameName='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
        //             <div classNameName='mb-2 mx-1'>
        //                 <label htmlFor='username'>Username</label>
        //                 <input
        //                     type={"username"}
        //                     id="username"
        //                     name="username"
        //                     value={username}
        //                     onChange={(e) => setUsername(e.target.value)} />
        //             </div>
        //             <div classNameName='mb-2 mx-1'>
        //                 <label htmlFor='password'>Password</label>
        //                 <input
        //                     type={"password"}
        //                     id="password"
        //                     name="password"
        //                     value={password}
        //                     onChange={(e) => setPassword(e.target.value)} />
        //             </div>
        //             <div>
        //                 <button id='submit' type='button' onClick={() => sendLoginRequest()}>
        //                     Submit
        //                 </button>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    )
}
