import React from 'react';

const RocketlitContent = (props) => {

    return (

        <div className="skew-panel contentBox-grape">
            <div className="skew-background contentBox-grape"></div>
            <div className="relative content-width white">
                <div className="project-details">
                    <a target="_blank" href={props.url} rel="noopener noreferrer"><img className="logo_rocketlit" src={props.logoText} alt="RocketLit Logo" height="100" /></a>
                    <p><strong>Launched Summer 2016</strong></p>
                    <a className="project-link" target="_blank" href={props.url} rel="noopener noreferrer">Visit RocketLit.com</a>
                </div>
                <div className="project-summary">
                    <p>A web app for science and history teachers that tailors assignments
                    to each student's specific reading level. So, if a student falls behind
                    on reading... they won't fall behind on learning.</p>
                    <p>Co-Founded, Y-Combinator Backed, Featured in the Huffington Post <span className="nowrap">and Forbes</span></p>
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
    )
}


export default RocketlitContent;