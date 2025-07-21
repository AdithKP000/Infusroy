import Components from '../components/Component';
import api from '../api/api.js';

import React, { Suspense, useRef, useEffect,useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Html, Bounds, useBounds } from '@react-three/drei'
import * as THREE from 'three'




export const Element = ({ url, targetSize = 2, centerOnGround = true }) => {
    const meshRef = useRef()
    const objectModel = useGLTF(url)

  useEffect(() => {
    if (objectModel.scene && meshRef.current) {
      normalizeModel(meshRef.current, targetSize, centerOnGround)
    }
  }, [objectModel.scene, targetSize, centerOnGround])

  const normalizeModel = (object, targetSize, centerOnGround) => {
    const box = new THREE.Box3().setFromObject(object)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())

    const maxDimension = Math.max(size.x, size.y, size.z)
    if (maxDimension > 0) {
      const scaleFactor = targetSize / maxDimension
      object.scale.setScalar(scaleFactor)

      box.setFromObject(object)
      const newCenter = box.getCenter(new THREE.Vector3())
      object.position.x = -newCenter.x
      object.position.z = -newCenter.z

      object.position.y = -box.max.y
    }
  }

  return (
    <group ref={meshRef}>
      <hemisphereLight intensity={2.5} groundColor="black" />
      <primitive object={objectModel.scene} />
    </group>
  )
}

const AutoFitCamera = () => {
  const bounds = useBounds()

  useEffect(() => {
    bounds.refresh().clip().fit()
  }, [bounds])

  return null
}

const Model = () => {
  const [models, setModels] = useState([])
  const [selectedModel, setSelectedModel] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const getallModels = async () => {
    setLoading(true)
    setError(null)
    try {
      const allModels = await api.get("/model/all")
      if (allModels.data.success) {
        setModels(allModels.data.models)
      } else {
        console.error("Failed to fetch models:", allModels.data.message)
        setError("Failed to load models: " + allModels.data.message)
      }
    } catch (err) {
      console.error("Error fetching all models:", err)
      setError("An error occurred while fetching models. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getallModels()
  }, [])

  const openModal = (model) => {
    setSelectedModel(model)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedModel(null)
  }

  const getModelUrl = (title) => {
    return `https://infusroy-1.onrender.com/model/get/${title}`
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 font-sans relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-7xl bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-gray-200 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Explore 3D Models
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our collection of stunning 3D models
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin absolute top-2 left-2 animation-delay-150"></div>
            </div>
            <p className="text-center text-blue-600 mt-6 text-lg font-medium">Loading amazing 3D models...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-xl">!</span>
            </div>
            <p className="text-red-600 text-lg">{error}</p>
          </div>
        )}

        {!loading && !error && models.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">📦</span>
            </div>
            <p className="text-gray-700 text-xl">No 3D models available yet</p>
            <p className="text-gray-500 mt-2">Upload some models to get started!</p>
          </div>
        )}

        {!loading && !error && models.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {models.map((model, index) => (
              <div
                key={model._id}
                className="group relative bg-white rounded-2xl shadow-lg  transition-all duration-500 cursor-pointer overflow-hidden border border-gray-200 transform "
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative w-full h-56 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden rounded-t-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50"></div>
                  <Canvas
                    frameloop="demand"
                    camera={{
                      position: [0, 0, 5],
                      fov: 50,
                    }}
                    gl={{ preserveDrawingBuffer: true }}
                    style={{ width: "100%", height: "100%" }}
                  >
                    <Suspense
                      fallback={
                        <Html center>
                          <div className="flex flex-col items-center">
                            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-2"></div>
                            <p className="text-gray-700 text-sm">Loading 3D Model...</p>
                          </div>
                        </Html>
                      }
                    >
                      <ambientLight intensity={0.5} />
                      <Bounds fit clip observe margin={1.5}>
                        <Element url={getModelUrl(model.title)} targetSize={2} centerOnGround={true} />
                        <AutoFitCamera />
                      </Bounds>
                      <OrbitControls
                        enableZoom={true}
                        autoRotate={true}
                        autoRotateSpeed={0.75}
                        maxPolarAngle={Math.PI / 2}
                        minPolarAngle={Math.PI / 6}
                      />
                    </Suspense>
                  </Canvas>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>

                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-full text-xs font-medium truncate border border-gray-200 shadow-sm">
                      {model.fileName}
                    </div>
                  </div>

                  
                </div>

                <div onClick={() => openModal(model)} className="p-6 bg-gradient-to-br from-gray-50/50 to-white">
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 truncate">
                    {model.title}
                  </h3>
                  <div className="flex items-center mt-2 text-gray-500 text-sm">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    Interactive 3D Model
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && selectedModel && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50 animate-in fade-in duration-300">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-6xl h-[80vh] flex flex-col overflow-hidden relative border border-gray-200 animate-in zoom-in-95 duration-300">
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full p-3 text-xl font-bold z-10 transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-gray-200 shadow-lg"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex-grow flex flex-col">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 backdrop-blur-sm p-6 border-b border-gray-200">
                <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {selectedModel.title}
                </h1>
                <p className="text-gray-600 text-center mt-2">Interactive 3D Model Viewer</p>
              </div>

              <div className="flex-grow bg-gradient-to-br from-gray-50 to-gray-100 flex justify-center items-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <div
                    className="absolute inset-0 bg-gray-300"
                    
                  ></div>
                </div>

                <Canvas
                  frameloop="demand"
                  camera={{
                    position: [0, 0, 5],
                    fov: 50,
                  }}
                  gl={{ preserveDrawingBuffer: true }}
                  style={{ width: "100%", height: "100%" }}
                >
                  <Suspense
                    fallback={
                      <Html center>
                        <div className="flex flex-col items-center">
                          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                          <p className="text-gray-700 text-lg font-medium">Loading 3D Model...</p>
                          <p className="text-gray-500 text-sm mt-2">Please wait while we prepare your model</p>
                        </div>
                      </Html>
                    }
                  >
                    <ambientLight intensity={0.3} />
                    <Bounds fit clip observe margin={1.5}>
                      <Element url={getModelUrl(selectedModel.title)} targetSize={2} centerOnGround={true} />
                      <AutoFitCamera />
                    </Bounds>
                    <OrbitControls
                      enableZoom={true}
                      autoRotate={true}
                      autoRotateSpeed={0.5}
                      maxPolarAngle={Math.PI /1}
                      minPolarAngle={Math.PI / 6}
                    />
                  </Suspense>
                </Canvas>

                {/* Controls hint */}
               
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Model
