import React, { useRef, useEffect} from 'react'
import {  useGLTF} from '@react-three/drei'
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
            <hemisphereLight intensity={2.5} groundColor='black' />
            <primitive object={objectModel.scene} />
        </group>
    )

}