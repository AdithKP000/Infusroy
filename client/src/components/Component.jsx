import React, { Suspense, useRef, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Html, Bounds, useBounds } from '@react-three/drei'
import * as THREE from 'three'

const Element = ({ url, targetSize = 2, centerOnGround = true }) => {
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
            <hemisphereLight intensity={2.5} groundColor='black' />
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

const Components = ({path,name}) => {
    const modelUrl = path
    
    return (
        <>
            <div className='bg-gray-800  border-b-2 border-gray-700'>
                <div className="p-4">
                    <h1 className="text-3xl font-bold text-center mt-10 text-white mb-6">
                       {name ? name : "Model Page"}
                    </h1>
                </div>
                
                <div className='flex justify-center items-center w-full h-screen p-1'>
                    <Canvas
                        frameloop='demand'
                        camera={{
                            position: [0, 0, 5],
                            fov: 10
                        }}
                        gl={{ preserveDrawingBuffer: true }}
                        style={{ width: '100%', height: '90vh' }}
                    >
                        <Suspense fallback={<Html center><p className="text-white">Loading 3D Model...</p></Html>}>
                            <Bounds fit clip observe margin={1.5}>
                                <Element 
                                    url={modelUrl}
                                    targetSize={2}
                                    centerOnGround={true}
                                />
                                <AutoFitCamera />
                            </Bounds>
                            
                            <OrbitControls
                                enableZoom={true}
                                autoRotate={true}
                                autoRotateSpeed={0.5}
                                maxPolarAngle={Math.PI / 2}
                                minPolarAngle={Math.PI / 6}
                            />
                        </Suspense>
                    </Canvas>
                </div>
            </div>
        </>
    )
}

export default Components