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
                        <Link class="btn btn-dark" type="button" to={`/pages/cust/addcust`}>Register customer/shipper</Link>
                        <Link class="btn btn-dark" type="button" to={`/pages/cust/viewcust`}>View customer/shipper</Link>
                        <Link class="btn btn-dark my-4" type="button" to={`/pages/main`}>Return</Link>
                    </div>
                }
            </div>
        </div>
    )

}
