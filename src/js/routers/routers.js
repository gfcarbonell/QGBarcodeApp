import React from 'react'
import PropTypes from 'prop-types'
import {Provider} from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom'
import Main from '../pages/main';

const data = {
    "headers": [
        {
            "id":1, 
            "title":"Quality Global", 
            "slogan": "\"Nos gusta lo que hacemos, excelencia en nuestros servicios.\"",
            "logo": require("../../media/img/png/QG-1.png"), 
        }
    ],
    "menus": [
        {"id":1, "name":"Agregar item", "image": require('../../media/img/png/Package-1.png'), "path":"/add"},
        {"id":2, "name":"Items", "image": require('../../media/img/png/Packages-1.png'), "path":"/items"},
        {"id":3, "name":"Importar datos", "image": require('../../media/img/png/Import-Export-1.png'), "path":"/import"},
        {"id":4, "name":"Imprimir", "image": require('../../media/img/png/Printer-1.png'), "path":"/printer"}
    ],
    "database":[
        {"id":1, "code": '0000000000001', "name": 'ITEM 1', "area": "ÁREA", "headquarter":'SEDE', "entity":'MUNICIPALIDAD DISTRITAL DE ICA' },
        {"id":2, "code": '0000000000002', "name": 'ITEM 2', "area": "ÁREA", "headquarter":'SEDE', "entity":'MUNICIPALIDAD DISTRITAL DE ICA' },
        {"id":3, "code": '0000000000003', "name": 'ITEM 3', "area": "ÁREA", "headquarter":'SEDE', "entity":'MUNICIPALIDAD DISTRITAL DE ICA' },
        {"id":4, "code": '0000000000004', "name": 'ITEM 4', "area": "ÁREA", "headquarter":'SEDE', "entity":'MUNICIPALIDAD DISTRITAL DE ICA' },
        {"id":5, "code": '0000000000005', "name": 'ITEM 5', "area": "ÁREA", "headquarter":'SEDE', "entity":'MUNICIPALIDAD DISTRITAL DE ICA' },
        {"id":6, "code": '0000000000006', "name": 'ITEM 6', "area": "ÁREA", "headquarter":'SEDE', "entity":'MUNICIPALIDAD DISTRITAL DE ICA' },
        {"id":7, "code": '0000000000007', "name": 'ITEM 7', "area": "ÁREA", "headquarter":'SEDE', "entity":'MUNICIPALIDAD DISTRITAL DE ICA' },
        {"id":8, "code": '0000000000008', "name": 'ITEM 8', "area": "ÁREA", "headquarter":'SEDE', "entity":'MUNICIPALIDAD DISTRITAL DE ICA' },
        {"id":9, "code": '0000000000009', "name": 'ITEM 9', "area": "ÁREA", "headquarter":'SEDE', "entity":'MUNICIPALIDAD DISTRITAL DE ICA' },
        {"id":10, "code": '00000000000010', "name": 'ITEM 10', "area": "ÁREA", "headquarter":'SEDE', "entity":'MUNICIPALIDAD DISTRITAL DE ICA' },
        {"id":11, "code": '00000000000011', "name": 'ITEM 11', "area": "ÁREA", "headquarter":'SEDE', "entity":'MUNICIPALIDAD DISTRITAL DE ICA' },
        {"id":12, "code": '00000000000012', "name": 'ITEM 12', "area": "ÁREA", "headquarter":'SEDE', "entity":'MUNICIPALIDAD DISTRITAL DE ICA' },
        {"id":13, "code": '00000000000013', "name": 'ITEM 13', "area": "ÁREA", "headquarter":'SEDE', "entity":'MUNICIPALIDAD DISTRITAL DE ICA' },
        {"id":14, "code": '00000000000014', "name": 'ITEM 14', "area": "ÁREA", "headquarter":'SEDE', "entity":'MUNICIPALIDAD DISTRITAL DE ICA' },
        {"id":15, "code": '00000000000015', "name": 'ITEM 15', "area": "ÁREA", "headquarter":'SEDE', "entity":'MUNICIPALIDAD DISTRITAL DE ICA' },
        {"id":16, "code": '00000000000016', "name": 'ITEM 16', "area": "ÁREA", "headquarter":'SEDE', "entity":'MUNICIPALIDAD DISTRITAL DE ICA' },
        {"id":17, "code": '00000000000017', "name": 'ITEM 17', "area": "ÁREA", "headquarter":'SEDE', "entity":'MUNICIPALIDAD DISTRITAL DE ICA' },
        {"id":18, "code": '00000000000018', "name": 'ITEM 18', "area": "ÁREA", "headquarter":'SEDE', "entity":'MUNICIPALIDAD DISTRITAL DE ICA' },
        {"id":19, "code": '00000000000019', "name": 'ITEM 19', "area": "ÁREA", "headquarter":'SEDE', "entity":'MUNICIPALIDAD DISTRITAL DE ICA' },
        {"id":20, "code": '00000000000020', "name": 'ITEM 20', "area": "ÁREA", "headquarter":'SEDE', "entity":'MUNICIPALIDAD DISTRITAL DE ICA' },
        {"id":21, "code": '00000000000021', "name": 'ITEM 1', "area": "ÁREA", "headquarter":'SEDE', "entity":'MUNICIPALIDAD DISTRITAL DE ICA' },
        {"id":22, "code": '00000000000022', "name": 'ITEM 2', "area": "ÁREA", "headquarter":'SEDE', "entity":'MUNICIPALIDAD DISTRITAL DE ICA' },
        {"id":23, "code": '00000000000023', "name": 'ITEM 3', "area": "ÁREA", "headquarter":'SEDE', "entity":'MUNICIPALIDAD DISTRITAL DE ICA' },
        {"id":24, "code": '00000000000024', "name": 'ITEM 4', "area": "ÁREA", "headquarter":'SEDE', "entity":'MUNICIPALIDAD DISTRITAL DE ICA' },
        {"id":25, "code": '00000000000025', "name": 'ITEM 5', "area": "ÁREA", "headquarter":'SEDE', "entity":'MUNICIPALIDAD DISTRITAL DE ICA' },
        {"id":26, "code": '00000000000026', "name": 'ITEM 6', "area": "ÁREA", "headquarter":'SEDE', "entity":'MUNICIPALIDAD DISTRITAL DE ICA' },
        {"id":27, "code": '00000000000027', "name": 'ITEM 7', "area": "ÁREA", "headquarter":'SEDE', "entity":'MUNICIPALIDAD DISTRITAL DE ICA' },
        {"id":28, "code": '00000000000028', "name": 'ITEM 8', "area": "ÁREA", "headquarter":'SEDE', "entity":'MUNICIPALIDAD DISTRITAL DE ICA' },
        {"id":29, "code": '00000000000029', "name": 'ITEM 9', "area": "ÁREA", "headquarter":'SEDE', "entity":'MUNICIPALIDAD DISTRITAL DE ICA' },
        {"id":30, "code": '00000000000030', "name": 'ITEM 10', "area": "ÁREA", "headquarter":'SEDE', "entity":'MUNICIPALIDAD DISTRITAL DE ICA' },
        {"id":31, "code": '00000000000031', "name": 'ITEM 11', "area": "ÁREA", "headquarter":'SEDE', "entity":'MUNICIPALIDAD DISTRITAL DE ICA' },
        {"id":32, "code": '00000000000032', "name": 'ITEM 12', "area": "ÁREA", "headquarter":'SEDE', "entity":'MUNICIPALIDAD DISTRITAL DE ICA' },
        {"id":33, "code": '00000000000033', "name": 'ITEM 13', "area": "ÁREA", "headquarter":'SEDE', "entity":'MUNICIPALIDAD DISTRITAL DE ICA' },
        {"id":34, "code": '00000000000034', "name": 'ITEM 14', "area": "ÁREA", "headquarter":'SEDE', "entity":'MUNICIPALIDAD DISTRITAL DE ICA' },
        {"id":35, "code": '00000000000035', "name": 'ITEM 15', "area": "ÁREA", "headquarter":'SEDE', "entity":'MUNICIPALIDAD DISTRITAL DE ICA' },
        {"id":36, "code": '00000000000036', "name": 'ITEM 16', "area": "ÁREA", "headquarter":'SEDE', "entity":'MUNICIPALIDAD DISTRITAL DE ICA' },
        {"id":37, "code": '00000000000037', "name": 'ITEM 17', "area": "ÁREA", "headquarter":'SEDE', "entity":'MUNICIPALIDAD DISTRITAL DE ICA' },
        {"id":38, "code": '00000000000038', "name": 'ITEM 18', "area": "ÁREA", "headquarter":'SEDE', "entity":'MUNICIPALIDAD DISTRITAL DE ICA' },
        {"id":39, "code": '00000000000039', "name": 'ITEM 19', "area": "ÁREA", "headquarter":'SEDE', "entity":'MUNICIPALIDAD DISTRITAL DE ICA' },
        {"id":40, "code": '00000000000040', "name": 'ITEM 20', "area": "ÁREA", "headquarter":'SEDE', "entity":'MUNICIPALIDAD DISTRITAL DE ICA' },
    ]
}

const rooterConfig = ({ store }) => (
    <Provider store={store}>
        <Router>
            <Main data={data}/>
        </Router>
    </Provider>
)

rooterConfig.propTypes = {
  store: PropTypes.object.isRequired
}

export default rooterConfig