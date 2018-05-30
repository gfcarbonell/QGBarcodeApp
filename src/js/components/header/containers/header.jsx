import React from 'react';
import HeaderTitle from '../items/header-title';
import HeaderLogo from '../items/header-logo';


class Header extends React.Component {
    render() {
        return (
            <header className='border-bottom-white-2 z-depth-2' style={this.props.style}>
               {
                   this.props.data.map((item, index)=>{
                        return (
                            <div className='header' key={index}>
                                <HeaderTitle {...item}/>
                                <HeaderLogo {...item}/>
                            </div>
                        )
                   })
               }
            </header>   
        );
    }
}

export default Header;