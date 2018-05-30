import React from "react";
import PropTypes from 'prop-types';
import "react-table/react-table.css";
import ReactTable from "react-table";
import axios from 'axios';


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
                    <a id={row.original.id} className='red-text center icon-pencil display-block-100'>  </a>
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
        data: []
    };
    componentDidMount(){
        axios.get('http://localhost:8080/items')
            .then( (response) => {
                console.log(response);
                this.setState({data:response.data})
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    handleRemove = (event)=>{
        if(window.confirm('¿Quieres eliminar este item?', 'Quality Global')){
            let id = event.target.getAttribute('id');
            let data =  this.state.data;
            for(var i=0; i < data.length; i++){
            if(data[i].id === parseInt(id)){
                data.splice(i, 1);
                axios.delete('http://localhost:8080/items/remove/' + id);
            }
            }
            this.setState({data:data});
        }
    }
    handleSubmit = event => {
        event.preventDefault();
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
        let data = this.state.data.map((item, index)=>{
            return axios.delete('http://localhost:8080/items/remove/' + item.id);
        })
        this.setState({data:[]})
        alert('Se ha eliminado todos los items', 'Quality Global');
    }
    setInputButtonRemove = event => {
        this.inputButtonRemove =  event;
    }
    setInputSearchRef = element => {
        this.inputSearch = element;
    }
    render() {
        const error = this.state.error;
        const data = this.state.data;
        const loading = this.state.loading;
           
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