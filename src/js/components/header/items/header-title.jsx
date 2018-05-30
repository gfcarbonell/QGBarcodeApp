import React, { Component } from 'react';
import PropTypes from 'prop-types';


class HeaderTitle extends Component {
    render() {
        let title = (this.props.title)? this.props.title:this.propTypes.title;
        let slogan = (this.props.slogan)? this.props.slogan:this.propTypes.slogan;
        return (
            <div className='center-align margin-right-left-auto '>
                <h1 className='header-title title'> 
                    {title}
                </h1>
                <h5 className='header-slogan slogan'>
                    {slogan}
                </h5>
            </div>
        );
    }
}

HeaderTitle.propTypes = {
    title: PropTypes.string,
    slogan: PropTypes.string
}

HeaderTitle.defaultProps = {
    title: 'Default Title',
    slogan: 'Default Slogan'
};

export default HeaderTitle;