var fs = require('fs');
const express = require('express')
var path = require('path')
const app = express()
let rootDir = "/Users/Shared/workspace/web-client/e2e-puppeteer/output/"
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

var dir =  process.cwd();

app.get('/files/*', function(req, res) {
    console.log("indexDir ", req.params.indexDir);
    var currentDir =  dir;
    var query = req.query.path || '';
    if (query) currentDir = path.join(dir, query);
    console.log("browsing ", currentDir);
    fs.readdir(currentDir, function (err, files) {
        if (err) {
           throw err;
         }
         var data = [];
         files
         .forEach(function (file) {
           try {
                   //console.log("processingile);
                   var isDirectory = fs.statSync(path.join(currentDir,file)).isDirectory();
                   if (isDirectory) {
                     data.push({ Name : file, IsDirectory: true, Path : path.join(query, file)  });
                   }
                //    } else {
                //      var ext = path.extname(file);
                //      if(program.exclude && _.contains(program.exclude, ext)) {
                //        console.log("excluding file ", file);
                //        return;
                //      }       
                //      data.push({ Name : file, Ext : ext, IsDirectory: false, Path : path.join(query, file) });
                //    }
   
           } catch(e) {
             console.log(e); 
           }        
           
         });
         //data = _.sortBy(data, function(f) { return f.Name });
         res.json(data);
     });
   });

app.listen(5000, () => console.log('Example app listening on port 5000!'))