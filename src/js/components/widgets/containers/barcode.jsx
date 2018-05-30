import React from 'react';
import * as jsPDF from 'jspdf'
import html2canvas from 'html2canvas';
var Barcode = require('react-barcode');


class BarcodeSimple extends React.Component { 
    render() {
        return (
            <div className='barcode'> 
                <div className='barcode-header'>
                    <img className='barcode-image' width='18px' height='18px' alt={this.props.item.name} src='https://seeklogo.com/images/E/Escudo_del_Peru-logo-DC003B9224-seeklogo.com.png'/>
                    <h5 className='barcode-title font-weight-bolder uppercase'>
                        {this.props.item.entity}
                    </h5>
                </div>
                <div className='barcode-section'>
                    <Barcode width={1} height={26} fontSize={11} value={this.props.item.code} />
                </div>
                <div className='barcode-footer font-weight-bolder'>
                    <p className='uppercase center-align'>{this.props.item.name}</p>
                    <p className='uppercase center-align'>{this.props.item.area} - 2018 </p>
                </div>
            </div>
        
        )
    }
}

export default BarcodeSimple;