import React from 'react';
import PropTypes from 'prop-types';
import 'materialize-css';
import {MediaBox} from 'react-materialize'


class HeaderLogo extends React.Component {
    render (){
        let logo = (this.props.logo)? this.props.logo:this.propTypes.logo;
        return (
            <figure className='header-logo white border-radius border-white-2 z-depth-3'>
                <MediaBox width={50} heigth={50} src={logo} />
            </figure>
        )
    }
}

HeaderLogo.propTypes = {
    logo: PropTypes.string,
}

HeaderLogo.defaultProps = {
    logo: require('../../../../media/img/png/QG-1.png'),
};

export default HeaderLogo