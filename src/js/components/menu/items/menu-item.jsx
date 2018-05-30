import React from 'react';
import PropTypes from 'prop-types';
import ButtonLink from '../../widgets/items/button-link'

class MenuItem extends React.Component {
    render (){
        let image = (this.props.menu.image)? this.props.menu.image:this.propTypes.image;
        let name = (this.props.menu.name)? this.props.menu.name:this.propTypes.name;
        let path = (this.props.menu.path)? this.props.menu.path:this.propTypes.path;
        return (
            <figure className='menu-item'>
                <img 
                    className='menu-item-image'
                    alt=""
                    width={64}
                    height={64}
                    src={image}/>
                <figcaption className='menu-item-name'>
                    <ButtonLink path={path} name={name} style={this.props.style}/>
                </figcaption>
            </figure>
        )
    }
}

MenuItem.propTypes = {
    name: PropTypes.string,
    image: PropTypes.string,
    path: PropTypes.string,
}

MenuItem.defaultProps = {
    name : 'Default name',
    image: require('../../../../media/img/png/Default-1.png'),
    path: '/'
};

export default MenuItem