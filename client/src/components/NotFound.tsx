import React from 'react';
import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div>
            <p style={{color:"yellow"}}>Opps, we cannot find the page</p>
            <div>
                <Link to="/pokemon" style={{color:"white"}}>
                    Go back to main page
                </Link>
            </div>

        </div>
    )
}

export default NotFound;
