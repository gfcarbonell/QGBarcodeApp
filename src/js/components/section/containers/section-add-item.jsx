import React from 'react'
import InputSimple from '../../widgets/items/input-simple';
import axios from 'axios';

class SectionAddItem extends React.Component{
    state = {
        database:this.props.database
    }

    addZeroLeftChain(chain, number){
        if (number === 0 || number < 0) return null
        while (chain.length<number)
            chain = '0' + chain;
        return chain;
    }
    
    handleSubmit = (event) =>{
        event.preventDefault();
        const data = {
            code:this.addZeroLeftChain(this.inputCode.value.toString(),13),
            name:this.inputName.value.toUpperCase(),
            area:this.inputArea.value.toUpperCase(),
            headquarter:this.inputHeadquarter.value.toUpperCase(),
            entity:this.inputEntity.value.toUpperCase(),
        }
        console.log(data);
        axios.post('http://localhost:8080/items/add', data);
        alert('Éxito al guardar', 'Quality Global E.I.R.L.')
        this.form.reset();
        //this.setState({database:this.state.database.push(data)});
    }
    setForm = element =>{
        this.form = element;
    }
    setInputEntity = element =>{
        this.inputEntity = element;
    }
    setInputHeadquarter = element =>{
        this.inputHeadquarter = element;
    }
    setInputArea = element =>{
        this.inputArea = element;
    }
    setInputCode = element =>{
        this.inputCode = element;
    }
    setInputName = element =>{
        this.inputName = element;
    }
    render(){
        return(
            <div>
                <div>
                    <h4 className='center-align'> 
                        Agregar items 
                    </h4>
                </div>
                <div className='col s12'>
                    <form className='col s12' ref={this.setForm} method='post' onSubmit={this.handleSubmit}>
                        <div className='row'>
                            <InputSimple setRef={this.setInputEntity} label={'Entidad'} name={'entity'} validate={true}/>
                        </div>
                        <div className='row'>
                            <InputSimple setRef={this.setInputHeadquarter} label={'Sede'} name={'headquarter'} validate={true}/>
                            <InputSimple setRef={this.setInputArea} label={'Área'} name={'area'} validate={true}/>
                        </div>
                        <div className='row'>
                            <InputSimple setRef={this.setInputCode} type={'number'} label={'Código'} name={'code'} validate={true}/>
                            <InputSimple setRef={this.setInputName}  label={'Nombre'} name={'name'} validate={true}/>
                        </div>
                        <div className='row'>
                            <button className='btn waves-effect red right waves-light' type='submit' name='submit'>
                                Guardar
                                <i className='material-icons right'>send</i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}


export default SectionAddItem;