import React from 'react';


const Footer = () => {

    const date = new Date();
    const year = date.getFullYear();

    return (
        <div className="panel_footer contentBox-slate">
            <div className="content-width verticalPadding">
                <h1 className="white">Let's create awesome things<br /><a href="mailto:gmadrigal@evolvecreate.com">gmadrigal@evolvecreate.com</a></h1>
            </div>
            <div className="panel_copyright white">
                evolve, create &copy; copyright {year}
            </div>
        </div>
    )

}

export default Footer;