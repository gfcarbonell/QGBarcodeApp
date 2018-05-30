var express = require('express');
var fs = require('fs');
var router = express.Router();
var db = require('../database/models/item-model');
var util = require("../utils.js");
var uid = require("uid");
var excelToJson = require('convert-excel-to-json');
var axios = require('axios')
/* GET listing. */
router.get('/', function(req, res, next) {
    db.ItemModel
    .findAll()
    .then((response) => {
        console.log(`Found ${response.length} matching records.`);
        res.send(response);
    })
    .catch(errors => {
        console.log(errors);
    });
});

/* POST listing. */
router.post('/add', (req, res, next) => {
    db.ItemModel
    .create(req.body, {validate:true})
    .then(newItem => {
        console.log(`New item ${newItem.name}, with id ${newItem.id} has been created.`);
        res.send(newItem);
    })
    .catch(errors => {
        console.log(errors);
    });
});

function moveFile(oldPath, newPath){
    fs.rename(oldPath, newPath, (err) => {
        if(err) console.log(err);
    });
}

router.post('/import', (req, res, next) => {
    //Data
    let data = JSON.parse(req.body.data);
    //File Excel
    let extensionExcel = req.files.dropzone.name.split(".").pop();
    let oldPathExcel = req.files.dropzone.path;
    let newPathExcel = `./files/excels/${data.code}.${extensionExcel}`
    //File Image
    let extensionImage = req.files.file.name.split(".").pop();
    let oldPathImage = req.files.file.path;
    let newPathImage = `./files/images/${data.code}.${extensionImage}`

    moveFile(oldPathExcel, newPathExcel);
    moveFile(oldPathImage, newPathImage);

    var objectArray = [];
    var newData = {};
    var letters = [data.code.letter, data.name.letter, data.area.letter];
    var names = [data.code.name, data.name.name, data.area.name];
    
    var abc = util.genCharArray("A", "Z");
    
    //Add Key Letter in Array -> object array
    for (var i = 0; i < letters.length; i++) {
        objectArray.push(util.addLetterKeyToJson(letters[i], names[i]));
    }
    //Convert in one Object the object array
    for (var i = 0; i < objectArray.length; i++) {
        for (var x in objectArray[i]) {
            if (!newData[x]) {
                newData[x] = [];
            }
            newData[x] = objectArray[i][x];
        }
    }
    
    //Excel to Json
    const result = excelToJson({
        sourceFile: newPathExcel,
        sheets: [data.sheet],
        header:{
            rows: data.header
        },
        columnToKey: newData
    });
    console.log(result);
    //Rename Keys Object result in array db
    var keys = Object.keys(result[data.sheet][0]);
    var database = [];
    for (let i = 0; i < result[data.sheet].length; i++) {
        database.push({
            code:result[data.sheet][i][keys[0]],
            name:result[data.sheet][i][keys[1]],
            area:result[data.sheet][i][keys[2]],
            headquarter:data.headquarter,
            entity: data.entity
          });
    }
    console.log(database);
    const ROOT_URL = 'http://localhost:8080';
    for (var i = 0; i < database.length; i++) {
        axios.post(`${ROOT_URL}/items/add`, database[i])
        .then(response => {
            console.log(`New Item: ${response}`);
        })
        .catch(error => {
            console.log(error);
        });
    }
    fs.unlinkSync(newPathExcel);
    fs.unlinkSync(newPathImage);
});
/* PUSH listing. */
router.put('/update/:id', (req, res, next) => {
    db.ItemModel
    .update(req.body, {where: {
        id: req.params.id
    }})
    .catch(errors => {
        console.log(errors);
    });
})
/* DELETE listing. */
router.delete('/remove/:id', (req, res, next) => {
   
    console.log(req.params)
    console.log(req.body)
    db.ItemModel.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(deletedItem => {
        console.log(`Has the Max been deleted? 1 means yes, 0 means no: ${deletedItem}`);
        res.send({ message: 'Successfully deleted' });
    })
    .catch(errors => {
        console.log(errors);
    });
})
module.exports = router;
