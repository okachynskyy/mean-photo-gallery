var config = require('../../../../config.js');
var bodyParser = require('body-parser');
var multer = require('multer');

var storage = multer.diskStorage({ //multers disk storage settings
  destination: function (req, file, cb) {
    cb(null, config.UPLOAD_FULL_PATH);
  },
  filename: function (req, file, cb) {
    var datetimestamp = Date.now();
    cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
  }
});

var upload = multer({ //multer settings
  storage: storage
}).single('file');

module.exports = upload;
