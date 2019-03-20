import React from 'react';
import Rocketlit from '../../components/projects/Rocketlit/Rocketlit';
import Innerorbit from '../../components/projects/Innerorbit/Innerorbit';
import Wpromote from '../../components/projects/Wpromote/Wpromote';
import Bio from './Bio';
import './home.css';

const Home = () => {

    return (
        <div className="panel_projects">
            <Rocketlit />
            <Innerorbit />
            <Wpromote />
            <Bio />
        </div>
    )

}

export default Home;