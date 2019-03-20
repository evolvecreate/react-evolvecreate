import React from 'react';
import logo from './logo_rocketlit.png';
import logoText from './logo_rocketlit_alternate.png';
import RocketlitHero from './RocketlitHero';
import RocketlitContent from './RocketlitContent';
import RocketlitFeatures from './RocketlitFeatures';

import './rocketlit.css';

const Rocketlit = (props) => {

    const url = 'https://www.rocketlit.com';

    return (
        <div className="panel_rocketlit panel_project">
            <RocketlitHero url={url} logo={logo} />
            <RocketlitContent url={url} logoText={logoText} />
            <RocketlitFeatures />
        </div>
    )
}


export default Rocketlit;
