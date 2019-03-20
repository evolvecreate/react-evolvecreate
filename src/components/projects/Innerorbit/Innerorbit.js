import React from 'react';
import './innerorbit.css';
import logo from './logo_inner-orbit_icon.png';
import logoText from './logo_innerorbit.png';
import InnerorbitHero from './InnerorbitHero';
import InnerorbitContent from './InnerorbitContent';
import InnerorbitFeatures from './InnerorbitFeatures';


const Innerorbit = () => {

    const url= 'https://www.innerorbit.com';

    return (
        <div className="panel_innerorbit panel_project">
            <InnerorbitHero url={url} logo={logo} />
            <InnerorbitContent url={url} logoText={logoText} />
            <InnerorbitFeatures />
        </div>
    )
}


export default Innerorbit;