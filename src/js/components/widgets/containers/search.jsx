import React, { Component } from 'react';
import InputSimple from '../items/input-simple';


class Search extends Component {
  state = {
    value: ''
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.input.value, 'submit')
  }
  handleKeyPress = event => {
    if (event.key === 'Enter') {
        this.handleSubmit(event);
    }
  }
  setInputRef = element => {
    this.input = element;
  }
  handleInputChange = event => {
    this.setState({
      value: event.target.value.toUpperCase()
    })
  }
  render() {
    return (
        <form
            className='search'
            onSubmit={this.props.handleSubmit}
        >
            <div className='row'>
                <InputSimple 
                    setRef={this.setInputRef} 
                    label={'Buscar'} 
                    name={'search'} 
                    handleChange={this.handleInputChange} 
                    handleKeyPress={this.handleKeyPress}
                    value={this.state.value} 
                    validate={true}/>
            </div>
        </form>
      
    )
  }
}

export default Search;