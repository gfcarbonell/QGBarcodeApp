import React, { Component } from 'react';


class Footer extends Component {
    render() {
        return (
            <footer className='footer z-depth-2' style={this.props.style}>
                <div className='copyright'>
                    <p className='slogan white-text text-shadow-black'>
                         © 2018 Copyright: Todos los derechos reservados 
                    </p>
                    <a className='slogan grey-text text-lighten-4 right hover-underline text-shadow-black' target='_blank' rel="noopener noreferrer" href='http://qygconsultores.com/'>www.qygconsultores.com</a>
                </div>
            </footer>
            
        );
    }
}

export default Footer;