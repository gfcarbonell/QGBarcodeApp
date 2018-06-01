import React from 'react';
import * as jsPDF from 'jspdf'
import html2canvas from 'html2canvas';
import axios from 'axios';
var Barcode = require('react-barcode');

//var BarcodeSimple = require('../../widgets/containers/barcode');

//import ReactPaginate from 'react-paginate';
/*
const stylePrinter = {
    backgroundColor: 'white',
    width: '210mm',
    minHeight: '297mm',
    marginLeft: '3mm',
    marginRight: '3mm', 
}*/
class SectionPDF extends React.Component {
    state = {
        //numPages: 1,
        //pageNumber: 1,
        database:[],
        currentPage: 1,
        todosPerPage: 33
    }
    componentDidMount(){
        axios.get('http://localhost:8080/items')
            .then( (response) => {
                console.log(response.data);
                this.setState({database:response.data})
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    handleClick = (event) => {
        this.setState({
          currentPage: Number(event.target.id)
        });
    }

    printDocument() {
        const input = document.getElementById('divToPrint');
        html2canvas(input)
          .then((canvas) => {
            const imgData = canvas.toDataURL(`image/png`);
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'JPEG', 0, 1);
            //pdf.output('dataurlnewwindow');
            pdf.save("descargar.pdf");
          })
        ;
      }
    
    
    render() {
        const { database, currentPage, todosPerPage } = this.state;
        
        // Logic for displaying todos
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentTodos = database.slice(indexOfFirstTodo, indexOfLastTodo);

        const renderTodos = currentTodos.map((item, index) => {
            return (
                <div className='barcode' key={index}> 
                    <div className='barcode-header'>
                        <img className='barcode-image' 
                            width='20px' height='20px' 
                            alt={item.name} 
                            src={require('../../../../media/img/jpg/Peru-1.jpg')}/>
                        <h5 className='barcode-title font-weight-bolder uppercase'>
                            {item.entity}
                        </h5>
                    </div>
                    <div className='barcode-section font-weight-bolder uppercase'>
                        <figure className='barcode-section-avatar'>
                            <Barcode className='font-weight-bolder' width={1.3} height={28} fontSize={11} value={item.code} />
                        </figure>
                    </div>
                    <div className='barcode-footer font-weight-bolder uppercase'>
                        <p className='uppercase center-align'>{item.name}</p>
                        <p className='uppercase center-align'>{item.area} - 2018 </p>
                    </div>
                </div>
            )
        });
        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(database.length / todosPerPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
              <li 
                className="btn waves-effect red right waves-light"
                key={number}
                id={number}
                onClick={this.handleClick}
              >
                {number}
              </li>
            );
        });

        return (
            <div className='padding-top-down-1'>
                <div className="mb5">
                    <a 
                        target='_blank' 
                        rel="noopener noreferrer" 
                        className='waves-effect waves-light btn' 
                        onClick={this.printDocument}>
                        Exportar PDF 
                    </a>
                </div>
                <div className="printer">
                    <div id="divToPrint" className="divToPrint" >
                        <ul className='barcodes'>
                            {renderTodos}
                        </ul>
                    </div>
                </div>
                <ul id="page-numbers">
                    {renderPageNumbers}
                </ul>
            </div>);
    }
}

export default SectionPDF;