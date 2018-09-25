const express = require('express');
const fileUpload = require('express-fileupload');
const upload = require('./upload');
const cors = require('cors');

const app = express();
var router = express.Router();

var port = process.env.PORT || 8000;

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};

var fileUploadOptions = {

}

app.use(cors(corsOptions));
app.use(fileUpload(fileUploadOptions));

router.post('/upload', upload);
router.get('/files/:hash', (req,res) => {
    var path = require('path');
    hash=req.params.hash;

    //res.send(hash);
    var dirname = path.resolve(".")+'/files/';
    var path = dirname + hash;
    res.download(path);
 
});

//router.post('/upload', upload)

app.use('/api', router);

app.listen(port, () => {
    console.log('Server started on port ' + port);
});