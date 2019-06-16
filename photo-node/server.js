const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const multer = require('multer');

const app = express();
// const upload = multer({dest: 'uploads/'});
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // // reject a file
  // cb(null, false);
  // // accept a file
  // cb(null, true);

  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter
});

app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true})); // support encoded bodies

app.set('port', (process.env.API_PORT || 3001));

app.get('/', (req,res) => {

  res.json({
    default: "This is a default value"
  });
  return;
});

app.post('/api/image/', upload.single('image'), (req, res, next) => {
  console.log(req.file);
  res.json({
    default: 'We are done'
  });
});

app.get('/api/images', (req,res,next) => {
  const filePath = 'uploads\\2019-06-16T13-29-13.221Zarsenal.png';

  res.json({
    fileURL: filePath
  })
});

export default app;