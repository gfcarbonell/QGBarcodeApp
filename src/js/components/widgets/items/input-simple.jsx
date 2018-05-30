import React from 'react';
import PropTypes from 'prop-types';


const InputSimple = (props) => {
    let type = (props.type)? props.type: InputSimple.propTypes.type;
    let name = (props.name)? props.name.toLowerCase(): InputSimple.propTypes.name.toLowerCase();
    let label = (props.label)? props.label: InputSimple.propTypes.label;
    let id = name.replace(' ', '-');
    let validate = (props.validate===false)? props.validate: InputSimple.propTypes.validate;
    let classValidate = 'uppercase'
    if(validate){
        classValidate += ' validate'
    }

    return (
        <div className='input-field col s12 m6 l6'>
            <input
                ref={props.setRef}
                type={type}
                id={id}
                name={id}
                onChange={props.handleChange}
                onKeyPress={props.handleKeyPress}
                value={props.value}
                className={classValidate}
                required={props.validate}
            />
            <label htmlFor={id}>{label}</label>
        </div>
        
    )
}

InputSimple.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string,
    validate: PropTypes.bool,
    label: PropTypes.string,
}

InputSimple.defaultProps = {
    type : 'text',
    name: 'default',
    validate: true,
    label: 'Default label',
};

export default InputSimple