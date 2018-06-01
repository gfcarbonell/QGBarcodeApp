import React from 'react'
import Dropzone from 'react-dropzone';
import $ from 'jquery';
import 'materialize-css';
import axios from 'axios';


class SectionUploadFile extends React.Component{
    state = {
        dropBool:false,
        fileBool:false
    }
    componentDidMount(){
        $('.tooltipped').tooltip();
    }
    setForm = element =>{
        this.form = element;
    }
    setDropFile = element => {
        this.dropFile = element;
    }
    setSheet = element => {
        this.sheet = element;
    }
    setHeader = element => {
        this.header = element;
    }
    setCodeLetter = element => {
        this.codeLetter = element;
    }
    setCodeName = element => {
        this.codeName = element;
    }
    setNameLetter = element =>{
        this.nameLetter = element;
    }
    setNameName = element => {
        this.nameName = element;
    }
    setAreaLetter = element => {
        this.areaLetter = element;
    }
    setAreaName = element => {
        this.areaName = element;
    }
    setEntity = element => {
        this.entity = element;
    }
    setLogotipo = element => {
        this.logotipo = element;
    }
    setHeadquarter = element => {
        this.headquarter = element;
    }
    
    handleDropZoneExcel(accepted, rejected)
    {   
        console.log(accepted);
    }
    handleDropZoneLogotipo(accepted, rejected)
    {   
        console.log(accepted);
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            sheet:this.sheet.value,
            header: this.header.value,
            code:{
                letter:this.codeLetter.value.toUpperCase(),
                name:this.codeName.value.toUpperCase()
            },
            name:{
                letter:this.nameLetter.value.toUpperCase(),
                name:this.nameName.value.toUpperCase()
            },
            area:{
                letter:this.areaLetter.value.toUpperCase(),
                name:this.areaName.value.toUpperCase()
            },
            headquarter: this.headquarter.value.toUpperCase(),
            entity:this.entity.value.toUpperCase(),
        }
       
        var formData = new FormData();
        formData.set("data", JSON.stringify(data));
        formData.set("dropzone", this.dropFile.state.acceptedFiles[0]);
        formData.set("file", this.logotipo.state.acceptedFiles[0]);
        
        axios.post('http://localhost:8080/items/import', formData);
        //alert('Éxito al importar', 'Quality Global E.I.R.L.')
        this.form.reset();
        
    }    
    
    render(){
        let fileAccept = [
            'application/vnd.ms-excel',
            'application/msexcel',
            'application/x-msexcel',
            'application/x-ms-excel',
            'application/x-excel',
            'application/x-dos_ms_excel',
            'application/xls',
            'application/x-xls',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ]
        let imageAccept = [
            "image/png",
            "image/gif",
            "image/jpeg"
        ]

        return(
            <div>
                <div className='row'>
                    <h4 className='center-align'> 
                        Importar desde archivo excel
                    </h4>
                </div>
                <div className='col s12'>
                    <form encType="multipart/form-data" className='col s12' ref={this.setForm} method='post' onSubmit={this.handleSubmit}>    
                        <div className='row'>
                            <Dropzone 
                                className='dropzone grey lighten-2 border-gray-1' 
                                accept={fileAccept.toString()}
                                ref={this.setDropFile} 
                               
                                onDrop={this.handleDropZoneExcel}>
                               
                                <p className='center-align'> 
                                    <i className="large material-icons">attach_file</i>
                                </p>
                                <p className='center-align'> 
                                    Subir archivo excel
                                </p>
                            </Dropzone>
                        </div>
                        <div className='col s12'>
                            <div className='row'>
                                <div className='row'>
                                    <div className="col s12 m12 l12">
                                        <legend> <i className="material-icons left icon-file-excel"></i>Hoja de excel:</legend>
                                        <div className="input-field col s12 m6 l8">
                                            <input ref={this.setSheet} id="sheet" name='sheet'  required type="text" className="validate text-uppercase"/>
                                            <label htmlFor="sheet">Nombre</label>
                                        </div>
                                        <div className="input-field col s12 m6 l4">
                                            <input ref={this.setHeader} id="header" required name='header' type="number" className="validate" />
                                            <label htmlFor="header">N° Fila de emcabezado(s)</label>
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className="col s12 m12 l6">
                                        <legend> <i className="material-icons left">code</i>Código del item:</legend>
                                        <div className="input-field col s12 m4 l4">
                                            <input maxLength="1" ref={this.setCodeLetter} id="code-letter" name='code-letter' required type="text" className="validate uppercase"/>
                                            <label htmlFor="code-letter">Letra columna </label>
                                        </div>
                                        <div className="input-field col s12 m8 l8">
                                            <input ref={this.setCodeName}id="code-name" name='code-name' required type="text" className="validate"/>
                                            <label htmlFor="code-name"> Nombre columna</label>
                                        </div>
                                    </div>
                                    <div className="col s12 m12 l6">
                                        <legend> <i className="material-icons left">developer_board</i>Nombre del item:</legend>
                                        <div className="input-field col s12 m4 l4">
                                            <input maxLength="1" ref={this.setNameLetter} id="name-letter" name='name-letter' required type="text" className="validate uppercase"/>
                                            <label htmlFor="name-letter">Letra columna </label>
                                        </div>
                                        <div className="input-field col s12 m8 l8">
                                            <input ref={this.setNameName}id="name-name" name='name-name' required type="text" className="validate"/>
                                            <label htmlFor="name-name"> Nombre columna</label>
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className="col s12 m12 l6">
                                        <legend> <i className="material-icons left">home</i> Área:</legend>
                                        <div className="input-field col s12 m4 l4">
                                            <input maxLength="1" ref={this.setAreaLetter} id="area-letter" name='area-letter' required type="text" className="validate uppercase"/>
                                            <label htmlFor="area-letter">Letra columna </label>
                                        </div>
                                        <div className="input-field col s12 m8 l8">
                                            <input ref={this.setAreaName}id="area-name" name='area-name' required type="text" className="validate"/>
                                            <label htmlFor="area-name"> Nombre columna</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col s12 m12 l4">
                                        <legend><i className="material-icons left">business</i> Entidad:</legend>
                                        <div className="input-field col s12 m12 l12">
                                            <input ref={this.setEntity} id="entity" required type="text" className="validate tooltipped" data-position="bottom" data-tooltip="Este campo no pertenece al archivo."/>
                                            <label  htmlFor="entity"> Nombre </label>
                                        </div>
                                    </div>
                                    <div className="col s12 m12 l4">
                                        <Dropzone 
                                            className='dropzone grey lighten-2 border-gray-1' 
                                            accept={imageAccept.toString()}
                                            id='file'
                                            
                                            ref={this.setLogotipo} 
                                            onDrop={this.handleDropZoneLogotipo}
                                            >
                                            <p className='center-align'> 
                                                <i className=" material-icons medium">add_a_photo</i>
                                               
                                            </p>
                                            <p className='center-align'> 
                                                Subir logotipo
                                            </p>
                                        </Dropzone>
                                    </div>
                                    <div className="col s12 m12 l4">
                                        <legend><i className="material-icons left">account_balance</i> Sede :</legend>
                                        <div className="input-field col s12 m12 l12">
                                            <input ref={this.setHeadquarter} id='headquarter' required type="text" className="validate tooltipped" data-position="bottom" data-tooltip="Este campo no pertenece al archivo."/>
                                            <label htmlFor="headquarter"> Nombre </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <button id='import' className='btn waves-effect red right waves-light' type='submit' name='submit'>
                                    Importar
                                    <i className='material-icons right'>send</i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}


export default SectionUploadFile;