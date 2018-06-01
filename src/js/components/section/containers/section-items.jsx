import React from "react";
import PropTypes from 'prop-types';
import "react-table/react-table.css";
import ReactTable from "react-table";
import axios from 'axios';
import Modal from 'react-responsive-modal';
import Dropzone from 'react-dropzone';


class SectionItems extends React.Component {
    setButtonRemove = element =>{
        this.buttonRemove = element;
    }
    state = {
        search: '',
        columns: [
            {
                Header: "ID",
                accessor: "id",
                show: false
            },
            {
                Header: "CÓDIGO",
                accessor: "code",
                show: true
            },
            {
                Header: "NOMBRE",
                accessor: "name",
                show: true
            },
            {
                Header: "ÁREA",
                accessor: "area",
                show: true
            },
            {
                Header: "SEDE",
                accessor: "headquarter",
                show: true
            },
            {
                Header: "ENTIDAD",
                accessor: "entity",
                show: true
            },
            {
                Header: "EDITAR",
                accessor: "edit",
                Cell: row => (
                    <a id={row.original.id} className="red-text center icon-pencil display-block-100" onClick={this.onOpenModal}>  </a>
                )
            },
            {
                Header: "ELIMINAR",
                accessor: "remove",
                Cell: (row)=>{
                    
                    return(
                        <a onClick={this.handleRemove} ref={this.setButtonRemove} id={row.original.id} className='red-text center icon-trash display-block-100'>  </a>
                    )
                }
            }
        ],
        loading: false,
        error: false,
        open: false,
        data: []
    };
    componentWillMount(){
        axios.get('http://localhost:8080/items')
            .then( (response) => {
                this.setState({data:response.data})
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    addZeroLeftChain(chain, number){
        if (number === 0 || number < 0) return null
        while (chain.length<number)
            chain = '0' + chain;
        return chain;
    }
    onOpenModal = (event) => {
        this.setState({ open: true });
        let id = event.target.getAttribute('id'); 
        axios.get('http://localhost:8080/items/' + id)
        .then( (response) => {
            this.formUpdate.setAttribute('id', id);
            this.inputCode.value = response.data.code;
            this.inputName.value = response.data.name;
            this.inputArea.value = response.data.area;
            this.inputHeadquarter.value = response.data.headquarter;
            this.inputEntity.value = response.data.entity;
        })
        .catch(function (error) {
            console.log(error);
        });
    } 
    onCloseModal = () => {
        this.setState({ open: false });
    }
    handleRemove = (event)=>{
        if(window.confirm('¿Quieres eliminar este item?', 'Quality Global')){
            let id = event.target.getAttribute('id');
            let data =  this.state.data;
            for(var i=0; i < data.length; i++){
            if(data[i].id === parseInt(id,10)){
                data.splice(i, 1);
                axios.delete('http://localhost:8080/items/remove/' + id);
            }
            }
            this.setState({data:data});
        }
    }
    
    handleUpdateSubmit = (event) =>{
        event.preventDefault();
        if(window.confirm('¿Estas seguro de actualizar?', 'Quality Global')){
            let id = parseInt(event.target.getAttribute('id'), 10);
            const data = {
                id: id,
                code:this.addZeroLeftChain(this.inputCode.value.toString(),13),
                name:this.inputName.value.toUpperCase(),
                area:this.inputArea.value.toUpperCase(),
                headquarter:this.inputHeadquarter.value.toUpperCase(),
                entity:this.inputEntity.value.toUpperCase(),
            }
        
            
            if(this.logotipo.state.acceptedFiles[0]){
                var formData = new FormData();
                formData.set('data', JSON.stringify(data));
                formData.set('file', this.logotipo.state.acceptedFiles[0]);
                axios.put('http://localhost:8080/items/update/', formData, {
                    params:{
                        id:formData.id
                    },
                });
            }
            else{
                axios.put('http://localhost:8080/items/update/', {
                    params:{
                        id:id
                    },
                    data:JSON.stringify(data)
                });
            }
            
            alert('Éxito al actualizar', 'Quality Global E.I.R.L.');
            this.setState({ open: false });
        }
    }

    handleInputChange = event => {
        this.setState({
            search: event.target.value.toUpperCase()
        })
    }
    handleKeyPress = event => {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    }
    handleRemoveAll = (event)=> {
        if(window.confirm('¿Quieres eliminar todos los items?', 'Quality Global')){
            this.state.data.map((item, index)=>{
                return axios.delete('http://localhost:8080/items/remove/' + item.id);
            })
            this.setState({data:[]})
            alert('Se ha eliminado todos los items', 'Quality Global');
        }
    }
    handleSubmit = (event) =>{
        event.preventDefault();
    }
    setInputButtonRemove = event => {
        this.inputButtonRemove =  event;
    }
    setInputSearchRef = element => {
        this.inputSearch = element;
    }
   
    setForm = element =>{
        this.form = element;
    }
    setFormUpdate = element =>{
        this.formUpdate = element;
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
    render() {
        const error = this.state.error;
        const data = this.state.data;
        const loading = this.state.loading;
        const open = this.state.open;
        const items =  data.filter(item => {
                return item.name.indexOf(this.state.search) !== -1;
            }
        );

        if (error) {
          return <div>Error! {error.message}</div>;
        }
  
        if (loading) {
          return <div>Loading...</div>;
        }
        let imageAccept = [
            "image/png",
            "image/gif",
            "image/jpeg"
        ]
        return (
        <div>
            <div className='row'>
                <h4 className='center-align'> 
                    Lista de items
                </h4>
            </div>
            <form
                className='search'
                onSubmit={this.props.handleSubmit}
            >
                <div className='row'>           
                   
                    <div className='input-field col s12 m12 l8'>
                        <input 
                            type='text'
                            name='search'
                            validate='validate'
                            required={true}
                            onKeyPress={this.handleKeyPress} 
                            onChange={this.handleInputChange}
                            ref={this.setInputSearchRef}
                            />
                        <label>
                            <i className="material-icons left">search</i>
                            Buscar
                        </label>
                    </div>
                    <div className='input-field col s12 m12 l4'>
                        <button onClick={this.handleRemoveAll} ref={this.setInputButtonRemove} className='btn'>
                            Eliminar todo
                        </button>
                    </div>
                </div>
                
            </form>
            <Modal
                open={open}
                onClose={this.onCloseModal}
                center
                >
                <div className='padding-top-down-1'>
                    <div>
                        <h4 className='center-align'> 
                            Editar item
                        </h4>
                    </div>
                    <div className='col s12 '>
                        <form className='col s12' name='form' ref={this.setFormUpdate} method='post' onSubmit={this.handleUpdateSubmit}>
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
                                    Actualizar
                                    <i className='material-icons right'>send</i>
                                </button>
                            </div>   
                        </form>
                    </div>
                </div>
            </Modal>
            <ReactTable 
                style={{'textAlign':'center'}}
                data={items} 
                resizable={true}
                minRows={0} 
                pageSizeOptions={[5, 10, 20, 25, 50, 100]}
                columns={this.state.columns} 
                defaultPageSize={8}
                className="-striped -highlight -responsive-table"
            />
        </div>
        );
    }
}

SectionItems.propTypes = {
    data: PropTypes.array,
}

SectionItems.defaultProps = {
    data: [],
};

export default SectionItems;