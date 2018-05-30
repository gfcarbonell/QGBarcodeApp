import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";


const ButtonLink = (props) => {
        let path = (props.path)? props.path: ButtonLink.propTypes.path;
        let name = (props.name)? props.name: ButtonLink.propTypes.name;
        return (
            <Link 
                to={path} 
                style={props.style}
                className='button-link border-white-2 z-depth-2 border-radius-simple btn waves-effect waves-light'
                
                >
                {name}  
            </Link>
        )
}

ButtonLink.propTypes = {
    name: PropTypes.string,
    path: PropTypes.string,
}

ButtonLink.defaultProps = {
    name : 'Default name',
    path: '/'
};

export default ButtonLink