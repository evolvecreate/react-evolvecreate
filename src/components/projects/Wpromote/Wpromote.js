import React from 'react';
import './wpromote.css';
import logoText from './wpromote-logo.png';

const Wpromote = () => {

    const url = 'https://www.wpromote.com';

    return (
        <div className="panel_wpromote panel_project">
            <div className="panel_hero"></div>
            <div className="skew-panel contentBox-pink">
                <div className="skew-background contentBox-pink"></div>
                <div className="relative content-width white">
                    <div className="project-details">
                        <a target="_blank" href={url} rel="noopener noreferrer">
                            <img src={logoText} height="60" alt="W Promote Logo" />
                        </a>
                        <p><strong>Launched Winter 2016</strong></p>
                        <a className="project-link" target="_blank" href={url} rel="noopener noreferrer">Visit Wpromote.com</a>
                    </div>

                    <div className="project-summary">
                        <p>A top-tier digital marketing agency in <span className="nowrap">Los Angeles, California.</span></p>
                        <p>Lead Work on Client Sites, Teamwork on Website, Developed <span className="nowrap">WordPress Blog</span></p>
                        <ul className="list_project-features">
                            <li>
                                <div className="project-feature">

                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="clear"></div>
                </div>
            </div>
        </div>


    )
}


export default Wpromote;