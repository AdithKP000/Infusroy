import multer from 'multer';
import mongoose from 'mongoose';
import { GridFSBucket } from 'mongodb';
import { Readable } from 'stream';

let gfs;
let bucket;

mongoose.connection.once('open', () => {
  bucket = new GridFSBucket(mongoose.connection.db, { bucketName: 'models' });
  console.log('GridFS initialized');
 
});
 export { bucket };
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['model/gltf+json', 'model/gltf-binary', 'application/octet-stream'];
    const isValid =
      allowedTypes.includes(file.mimetype) ||
      file.originalname.toLowerCase().endsWith('.glb');
    
    cb(null, isValid);
  },
  limits: { fileSize: 50 * 1024 * 1024 },
});

// Helper function to upload to GridFS
export const uploadToGridFS = (buffer, filename, mimetype) => {
  return new Promise((resolve, reject) => {
    if (!bucket) {
      return reject(new Error('GridFS not initialized'));
    }

    const readableStream = new Readable();
    readableStream.push(buffer);
    readableStream.push(null);

    const uploadStream = bucket.openUploadStream(filename, {
      metadata: { 
        originalName: filename,
        contentType: mimetype,
        uploadDate: new Date()
      }
    });

    uploadStream.on('error', reject);
    uploadStream.on('finish', () => {
      resolve({
        id: uploadStream.id,
        filename: uploadStream.filename,
        length: uploadStream.length,
        uploadDate: uploadStream.uploadDate
      });
    });

    readableStream.pipe(uploadStream);
  });
};

export default upload;
