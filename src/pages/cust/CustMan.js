import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';

export default function CustMan() {

    useEffect(() => {
    }, []);

    return (
        <div className='container'>
            <div className='py-4'>
                {
                    <div class="d-grid gap-2 col-6 mx-auto">
                        <button class="btn btn-dark" type="button">Register customer/shipper</button>
                        <button class="btn btn-dark" type="button">Edit customer/shipper</button>
                        <button class="btn btn-dark" type="button">Delete customer/shipper</button>
                        <button class="btn btn-dark" type="button">View customer/shipper</button>
                        <Link class="btn btn-dark my-4" type="button" to={`/pages/main`}>Return</Link>
                    </div>
                }
            </div>
        </div>
    )

}
