import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocalState } from '../../util/useLocalStorage';


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
                window.location.href = "/pages/Main";
            }).catch((message) => {
                alert(message);
            });
    }

    return (
        <>
            <div>
                <label htmlFor='username'>Username</label>
                <input
                    type={"username"}
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
                <label htmlFor='password'>Password</label>
                <input
                    type={"password"}
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
                <button id='submit' type='button' onClick={() => sendLoginRequest()}>
                    Submit
                </button>
            </div>
        </>
    )
}
