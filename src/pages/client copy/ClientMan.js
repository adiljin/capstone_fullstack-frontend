import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';

export default function ClientMan() {
    return (
        <div className='container'>
            <div className='py-4'>
                {
                    <div class="d-grid gap-2 col-6 mx-auto">
                        <Link class="btn btn-dark" type="button" to={`/pages/clientman/addclient`}>Register shipping company</Link>
                        <Link class="btn btn-dark" type="button" to={`/pages/clientman/viewcli`}>View shipping companies</Link>
                        <Link class="btn btn-dark my-4" type="button" to={`/pages/main`}>Return</Link>
                    </div>
                }
            </div>
        </div>
    )

}
