import React, { useState, useEffect, Suspense } from 'react';
import api from '../api/api.js'; 
import { Element } from '../components/Element.jsx';
import { Canvas } from '@react-three/fiber';
import { Bounds, Html, OrbitControls, useBounds } from '@react-three/drei';
import { useNavigate } from "react-router-dom"

const Upload = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [objectUrl, setObjectUrl] = useState(null);
  const [fileError, setFileError] = useState('');
  const [uploadMessage, setUploadMessage] = useState(''); // State for custom message box

  useEffect(() => {
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setObjectUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    setObjectUrl(null);
  }, [selectedFile]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileError('');
    setUploadMessage(''); // Clear previous messages

    if (file) {
      const fileName = file.name.toLowerCase();
      const fileExtension = fileName.split('.').pop();

      if (fileExtension === 'glb') {
        setSelectedFile(file);
      } else if (fileExtension === 'gltf') {
        setSelectedFile(null);
        setObjectUrl(null);
        setFileError('GLTF files are not allowed. Please upload a .glb file.');
      } else {
        setSelectedFile(null);
        setObjectUrl(null);
        setFileError('Unsupported file type. Please upload a .glb file.');
      }
    } else {
      setSelectedFile(null);
      setObjectUrl(null);
      setFileError('');
    }
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const showMessage = (message, isError = false) => {
    setUploadMessage(message);
    
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setUploadMessage('');

    if (!title) {
      showMessage('Model Title is required!', true);
      return;
    }
    if (!selectedFile) {
      showMessage('Please select a 3D model to upload!', true);
      return;
    }
    if (fileError) {
      showMessage('Please fix the file selection error before uploading.', true);
      return;
    }

    console.log('Ready to upload model:', { title, fileName: selectedFile.name, file: selectedFile });

    const formData = new FormData();
    formData.append('title', title);
    formData.append('file', selectedFile);

    try {
      const upload = await api.post('/model/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (upload.data.success) {
        showMessage('Model uploaded successfully!');
        navigate('/model')

       
      } else {
        showMessage('Failed to upload model: ' + (upload.data.message || 'Unknown error.'), true);
      }
    } catch (error) {
      console.error('Error during model upload:', error);
      if (error.response) {
       
        showMessage(`Server Error: ${error.response.data.message || error.response.statusText}`, true);
      } else if (error.request) {
        showMessage('Network Error: Could not connect to the server. Please check your connection.', true);
      } else {
        showMessage('An unexpected error occurred. Please try again.', true);
      }
    }
  };

  const AutoFitCamera = () => {
      const bounds = useBounds()
      
      useEffect(() => {
          bounds.refresh().clip().fit()
      }, [bounds])
      
      return null
  }


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 font-sans m-2">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row lg:space-x-8 space-y-8 lg:space-y-0">
        <div className="w-full lg:w-1/2 bg-white p-8 rounded-xl shadow-lg"> 
          <h1 className="text-4xl font-extrabold text-gray-900 text-center">
            Upload Your 3D Model
          </h1>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Model Title <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={title}
                onChange={handleTitleChange}
                placeholder="Enter a descriptive title for your model"
              />
            </div>

            <div>
              <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700">
                Select 3D Model (.glb) <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">



                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>



                  
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                    >
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".glb" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">GLB up to 50MB (recommended)</p>
                  {selectedFile && (
                    <p className="text-sm text-gray-700 mt-2">Selected: <span className="font-semibold">{selectedFile.name}</span></p>
                  )}
                  {fileError && (
                    <p className="text-sm text-red-500 mt-2">{fileError}</p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Upload Model
              </button>
            </div>
          </form>

          {uploadMessage && (
            <div className={`mt-4 p-3 rounded-md text-sm ${fileError || uploadMessage.includes('Error') || uploadMessage.includes('Failed') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
              {uploadMessage}
            </div>
          )}
        </div>

        {objectUrl && (
          <div className="w-full lg:w-1/2 h-[40vw] rounded-xl shadow-lg overflow-hidden flex flex-col border-4 border-gray-200">
            <div className='bg-gray-800 flex justify-center items-center w-full h-screen p-1'>
                                              <Canvas
                                                  frameloop='demand'
                                                  camera={{
                                                      position: [0, 0, 5],
                                                      fov: 5}}
                                                  gl={{ preserveDrawingBuffer: true }}
                                                  style={{ width: '90%', height: '40vw' }}
                                              >
                                                  <Suspense fallback={<Html center><p className="text-white">Loading 3D Model...</p></Html>}>
                                                    <ambientLight intensity={0.5} />
                                                      <Bounds fit clip observe margin={1.5}>
                                                          <Element 
                                                              url={objectUrl}
                                                              targetSize={2}
                                                              centerOnGround={true}
                                                          />
                                                          <AutoFitCamera />
                                                      </Bounds>
                                                      
                                                      <OrbitControls
                                                          enableZoom={true}
                                                          autoRotate={true}
                                                          autoRotateSpeed={0.5}
                                                          maxPolarAngle={Math.PI /1.5}
                                                          minPolarAngle={Math.PI / 6}
                                                      />
                                                  </Suspense>
                                              </Canvas>
                                          </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;
