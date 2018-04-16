var fs = require('fs');
const express = require('express')
var path = require('path')
const app = express()
let rootDir = "/Users/Shared/workspace/inventory-core/build/reports/gatling"
app.use('/listRootDir', (req, res) => {
    var files = fs.readdirSync(rootDir);
    var resultArray = [];
    for (var i=0; i < files.length; i++) {
        let fstat = fs.statSync(rootDir+'/'+files[i])
        if(fstat.isDirectory()){
            resultArray.push({
                name: files[i],
                createdTime: fstat.birthtime,
                modifiedTime: fstat.mtime
            })
        }
    }
    res.status(200).end(JSON.stringify(resultArray))
});

app.use(express.static('.'))

app.use('/getIndex', express.static(rootDir))

app.use('/getIndex/:indexDir/fetchFilesForDisplay', (req, res) => {

    res.sendFile(rootDir+ '/'+req.params.indexDir + '/index.html');
});



app.listen(5000, () => console.log('Example app listening on port 5000!'))