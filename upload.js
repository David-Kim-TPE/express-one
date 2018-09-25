//const IncomingForm = require('formidable').IncomingForm;
//const fileUpload = require('express-fileupload');
//const server = express();
const md5File = require('md5-file/promise');

module.exports = function upload(req, res) {
    //res.setHeader('Content-Type','application/json');
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.sampleFile;
    //var path = require('path');
    var dirname = './files/';
    filepath = dirname + sampleFile.name;


    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(filepath, function (err) {
        if (err)
            return res.status(500).send(err);

        md5File(filepath, (err, hash) => {
            if (err)
                return res.status(500).send(err);
        }).then(hash => {

            let filename = hash + '.' + sampleFile.name.split(".").pop().toUpperCase();
            filepath = dirname + filename;
            sampleFile.mv(filepath, function (err) {
                if (err)
                    return res.status(500).send(err);
                let path = req.protocol + '://' + req.get('host');
                res.status(200).json({ filepath: path+'/api/files/' + filename });
            });

        });
    });
};