import Model from '../model/modelSchema.js';




import { bucket, uploadToGridFS } from '../middlewares/uploadMiddleware.js';

export const createModelController = async (req, res) => {
    try {
        const file = req.file;
        
        if (!file) {
            console.error('No file uploaded');
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const { title } = req.body;
        
        if (!title ) {
            console.error('Title and User ID are required');
            return res.status(400).json({ message: 'Title and User ID are required' });
        }

        // Upload file to GridFS
        const filename = `${Date.now()}-${file.originalname}`;
        const gridfsFile = await uploadToGridFS(file.buffer, filename, file.mimetype);

        console.log('File uploaded to GridFS:', gridfsFile);

    

        const model = new Model({
            title,
            fileId: gridfsFile.id, 
            fileName: gridfsFile.filename
        });

        await model.save();
        
        res.status(201).json({ 
            success: true, 
            message: 'Model created successfully', 
            model: {
                ...model.toObject(),
                fileInfo: {
                    filename: gridfsFile.filename,
                    length: gridfsFile.length,
                    uploadDate: gridfsFile.uploadDate
                }
            }
        });

    } catch (error) {
        console.error('Error creating model:', error);
        
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ message: 'File too large. Maximum size is 50MB' });
        }
        
        if (error.message === 'File type not allowed') {
            return res.status(400).json({ message: 'File type not allowed. Please upload a .glb file' });
        }
        
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};



export const getModelsController =async (req, res) => {
    try {

        const title = req.params.title;
        if (!title) {   
            return res.status(400).json({ message: 'Title parameter is required' });
        }
        const model=await Model.findOne({ title });
        if (!model) {
            return res.status(404).json({ message: 'Model not found' });
        }   
        
        const filename = model.fileName;

        const files= await bucket.find({ filename }).toArray();

        if (!files || files.length === 0) {
            return res.status(404).json({ message: 'File not found' });
        }
       const file = files[0];

    res.set({
      'Content-Type': file.contentType || 'application/octet-stream',
      'Content-Disposition': `inline; filename="${file.filename}"`,
    });

    bucket.openDownloadStreamByName(filename).pipe(res);



    }
    catch (error) {
        console.error('Error fetching models:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}



export const getAllController = async (req, res) => {
    try {
        const models = await Model.find().sort({ createdAt: -1 });
        
        if (!models || models.length === 0) {
            return res.status(404).json({ message: 'No models found' });
        }
        models.forEach(model => {
            console.log(model.title); 
        });
        res.status(200).json({ success: true, models});
    } catch (error) {
        console.error('Error fetching all models:', error);
        res.status(500).json({success: false, message: 'Internal Server Error', error: error.message });
    }
};