import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav className="panel_navigation contentBox-slate">
            <ul className="list_navigation">
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/projects">Projects</NavLink>
                </li>
                <li>
                    <NavLink to="/about">About</NavLink>
                </li>
                <li>
                    <NavLink to="/contact">Contact</NavLink>
                </li>
            </ul>
            <div className="clear"></div>
        </nav>
    )


}



export default withRouter(Navigation); // TODO ?: what does this do?