const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const endpoint = new AWS.Endpoint("https://kr.object.ncloudstorage.com");
const region = "kr-standard";
const access_key = "ACCESS_KEY";
const secret_key = "SECRET_KEY";

const S3 = new AWS.S3({
  endpoint: endpoint,
  region: region,
  credentials: {
    accessKeyId: bfHpk5g2aFmIbshtZvOR,
    secretAccessKey: Xa4eD1QhMhBwuyLjz3FPNq4friXLXwAlTbISA8cx,
  },
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "some-bucket",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});
