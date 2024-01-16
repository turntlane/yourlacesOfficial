const multer = require("multer");
const { S3Client, ListBucketsCommand } = require("@aws-sdk/client-s3");
require("dotenv").config();
const filename = require("crypto");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

const generateFileName = (bytes = 32) =>
  filename.randomBytes(bytes).toString("hex");

const awsMiddleware = upload.array("images", 5);

module.exports = {
  awsMiddleware,
  generateFileName,
  s3Client,
  bucketName,
  region,
  accessKeyId,
  secretAccessKey,
};
