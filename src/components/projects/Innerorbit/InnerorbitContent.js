import React from 'react';


const InnerorbitContent = (props) => {

    return (

        <div className="skew-panel contentBox-periwinkle">
            <div className="skew-background contentBox-periwinkle"></div>
            <div className="relative content-width">
                <div className="project-details">
                    <a target="_blank" href={props.url} rel="noopener noreferrer"><img className="logo_innerorbit" src={props.logoText} alt="Inner Orbit Logo"  /></a>
                    <p><strong>Launched Fall 2018</strong></p>
                    <a className="project-link" target="_blank" href={props.url} rel="noopener noreferrer">Visit InnerOrbit.com</a>
                </div>
                <div className="project-summary">
                    <p>A web app for science teachers to quickly and easily create rigorous assessments
                    for their students, in turn receiving insanely detailed data from intuitive and truly <span className="nowrap">useful reports.</span></p>
                    <p>Second Product from RocketLit, Pairs Fantastically with <span className="nowrap">Flagship App</span></p>
                </div>
                <div className="clear"></div>
            </div>
        </div>

    )


}

export default InnerorbitContent;