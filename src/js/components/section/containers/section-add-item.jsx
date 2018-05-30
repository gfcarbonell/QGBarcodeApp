import React from 'react'
import axios from 'axios';
import Dropzone from 'react-dropzone';


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
        
        var formData = new FormData();
        formData.set("data", JSON.stringify(data));
        formData.set("file", this.logotipo.state.acceptedFiles[0]);
        axios.post('http://localhost:8080/items/add', formData);
        alert('Éxito al guardar', 'Quality Global E.I.R.L.')
        this.form.reset();
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
    setLogotipo = element =>{
        this.logotipo = element;
    }
    render(){
        let imageAccept = [
            "image/png",
            "image/gif",
            "image/jpeg"
        ]
        return(
            <div>
                <div>
                    <h4 className='center-align'> 
                        Agregar items 
                    </h4>
                </div>
                <div className='col s12 margin-top-down-1'>
                    <form className='col s12' ref={this.setForm} method='post' onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="col s12 m12 l6">
                                <legend><i className="material-icons left">business</i> Entidad:</legend>
                                <div className="input-field col s12 m12 l12">
                                    <input ref={this.setInputEntity} id="entity" required type="text" className="validate uppercase"/>
                                </div>
                            </div>
                            <div className="col s12 m12 l6">
                                <Dropzone 
                                    className='dropzone grey lighten-2 border-gray-1' 
                                    accept={imageAccept.toString()}
                                    ref={this.setLogotipo} 
                                    >
                                    <p className='center-align'> 
                                        <i className=" material-icons medium">add_a_photo</i>
                                        
                                    </p>
                                    <p className='center-align'> 
                                        Subir logotipo
                                    </p>
                                </Dropzone>
                            </div> 
                        </div>
                        <div className='row'>
                            <div className="col s12 m12 l6">
                                <legend><i className="material-icons left">account_balance</i> Sede :</legend>
                                <div className="input-field col s12 m12 l12">
                                    <input ref={this.setInputHeadquarter} id='headquarter' required type="text" className="validate uppercase"/>
                                    
                                </div>
                            </div>
                            <div className="col s12 m12 l6">
                                <legend> <i className="material-icons left">home</i> Área:</legend>
                                <div className="input-field col s12 m12 l12">
                                    <input ref={this.setInputArea}id="area" name='area' required type="text" className="validate uppercase"/>
                                   
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col s12 m12 l6">
                                    <legend> <i className="material-icons left">code</i>Código del item:</legend>
                                    <div className="input-field col s12 m12 l12">
                                        <input ref={this.setInputCode}id="code" name='code' required type="text" className="validate uppercase"/>
                                       
                                    </div>
                            </div>
                            <div className="col s12 m12 l6">
                                <legend> <i className="material-icons left">developer_board</i>Nombre del item:</legend>
                                <div className="input-field col s12 m12 l12">
                                    <input ref={this.setInputName}id="name" name='name' required type="text" className="validate uppercase"/>
                                    
                                </div>
                            </div>
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