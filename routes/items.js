var express = require('express');
var fs = require('fs');
var router = express.Router();
var db = require('../database/models/item-model');
var util = require("../utils.js");
var uid = require("uid");
let node_uid = require('node-uid')
var excelToJson = require('convert-excel-to-json');
var axios = require('axios');
var path = require('path');
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

/* GET listing. */
router.get('/:id?', function(req, res, next) {
    console.log(req.params);
    db.ItemModel
    .findOne({
        where: {id: req.params.id},
    })
    .then((response) => {
        console.log(`Data: ${response.dataValues}.`);
        res.send(response);
    })
    .catch(errors => {
        console.log(errors);
    });
});

/* POST listing. */
router.post('/add', (req, res, next) => {
    //Data
    let data = JSON.parse(req.body.data);
    //File Image
    let extensionImage = req.files.file.name.split(".").pop();
    let oldPathImage = req.files.file.path;
    let newPathImage = `./files/images/${data.name}.${uid(10)}.${extensionImage}`;
    moveFile(oldPathImage, newPathImage);
    let newData = {
        code:data.code, 
        name:data.name,
        area:data.area,
        headquarter:data.headquarter,
        entity:data.entity,
        logotipo:newPathImage
    }
    db.ItemModel
    .create(newData, {validate:true})
    .then(response => {
        console.log(`New item ${response.name}, with id ${response.id} has been created.`);
    })
    .catch(errors => {
        console.log(errors);
    });
});

function moveFile(oldPath, newPath){
    fs.rename(oldPath, newPath, (err) => {
        if(err) {
            console.log(err);
            return false;
        }
    });
    return true;
}

function setNewColumnKey(data){
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
    return newData;
}
router.post('/import', (req, res, next) => {
    //Data
    let data = JSON.parse(req.body.data); 
    
    //File Excel
    let extensionExcel = req.files.dropzone.name.split(".").pop();
    let oldPathExcel = req.files.dropzone.path;
    let newPathExcel = `./files/excels/${node_uid(15)}.${extensionExcel}`
    //File Image
    let extensionImage = req.files.file.name.split(".").pop();
    let oldPathImage = req.files.file.path;
    let newPathImage = `./files/images/${node_uid(15)}.${extensionImage}`

    if(moveFile(oldPathExcel, newPathExcel)===true){
        moveFile(oldPathImage, newPathImage);
        let newColumnKey = setNewColumnKey(data);
        //Excel to Json
        const result = excelToJson({
            sourceFile: newPathExcel,
            sheets: [data.sheet],
            header:{
                rows: data.header
            },
            columnToKey: newColumnKey
        });
    
        //Rename Keys Object result in array db
        var keys = Object.keys(result[data.sheet][0]);
        var database = [];
        for (let i = 0; i < result[data.sheet].length; i++) {
            database.push({
                code:result[data.sheet][i][keys[0]],
                name:result[data.sheet][i][keys[1]],
                area:result[data.sheet][i][keys[2]],
                headquarter:data.headquarter,
                entity: data.entity,
                logotipo:newPathImage
              });
        }
        delete result;
        console.log("----------------------------");
        console.log(database);
        console.log(database.length);
        console.log("----------------------------");
        db.ItemModel
        .bulkCreate(database, {validate:true})
        .then(response => {
            console.log(`New items: ${response.length}.`);
        })
        .catch(errors => {
            console.log(errors);
        });
    }
   
    fs.unlinkSync(newPathExcel);
});
/* PUSH listing. */
router.put('/update/:id?', (req, res, next) => {
    let data = JSON.parse(req.body.data);
    console.log(req.body);
    console.log(req.files);
    let newData = {};
    //File Image
    if(req.files.file){
        db.ItemModel
        .findOne({
            where: {id: data.id},
        })
        .then((response) => {
            fs.unlinkSync(response.logotipo);
        })
        .catch(errors => {
            console.log(errors);
        });
        
        let extensionImage = req.files.file.name.split(".").pop();
        let oldPathImage = req.files.file.path;
        let newPathImage = `./files/images/${data.name}.${uid(10)}.${extensionImage}`;
        moveFile(oldPathImage, newPathImage);
        newData = {
            id:data.id,
            code:data.code, 
            name:data.name,
            area:data.area,
            headquarter:data.headquarter,
            entity:data.entity,
            logotipo:newPathImage
        }
    }
    else{
        newData = {
            id:data.id,
            code:data.code, 
            name:data.name,
            area:data.area,
            headquarter:data.headquarter,
            entity:data.entity,
        }
    }
    
    db.ItemModel
    .update(newData, {where: {
        id: newData.id
    }})
    .catch(errors => {
        console.log(errors);
    });
})
/* DELETE listing. */
router.delete('/remove/:id?', (req, res, next) => {
   
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
