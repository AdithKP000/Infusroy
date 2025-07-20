import 'jsdom-global';
import fs from 'fs';
import path from 'path';
import * as THREE from 'three';
import { GLTFLoader } from "../../../server/bin/GLTFLoader.js"
import { DRACOLoader } from "../../../server/bin/DRACOLoader.js"

DRACOLoader.getDecoderModule = () => { };
const dracoLoader = new DRACOLoader();


const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

function toArrayBuffer(buf) {
    const ab = new ArrayBuffer(buf.length);
    const view = new Uint8Array(ab);
    for (let i = 0; i < buf.length; ++i) {
        view[i] = buf[i];
    }
    return ab;
}

function calculateRecommendedCamera(boundingBox, aspectRatio, margin = 1.2) {
    const center = boundingBox.getCenter(new THREE.Vector3());
    const size = boundingBox.getSize(new THREE.Vector3());

    const maxDim = Math.max(size.x, size.y, size.z);

    const fov = 60;
    const fovRad = fov * (Math.PI / 180);

    let cameraZ = maxDim / (2 * Math.tan(fovRad / 2));

    const objectAspect = size.x / size.y;
    if (objectAspect > aspectRatio) {
        cameraZ = size.x / (2 * Math.tan(fovRad / 2) * aspectRatio);
    }

    cameraZ *= margin;

    const cameraPosition = new THREE.Vector3(center.x, center.y, center.z + cameraZ);

    return {
        position: cameraPosition.toArray(),
        fov: fov
    };
}

export async function get3DModelProperties(modelPath) {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(modelPath)) {
            return reject(new Error(`File not found: ${modelPath}`));
        }

        const data = fs.readFileSync(modelPath);
        const arrayBuffer = toArrayBuffer(data);

        gltfLoader.parse(
            arrayBuffer,
            '',
            (gltf) => {
                const model = gltf.scene;

                const box = new THREE.Box3().setFromObject(model);

                if (box.isEmpty() || !box.min.isFinite() || !box.max.isFinite()) {
                    model.traverse((child) => {
                        if (child.isMesh) {
                            child.geometry.computeBoundingBox();
                            if (child.geometry.boundingBox) {
                                box.union(child.geometry.boundingBox.clone().applyMatrix4(child.matrixWorld));
                            }
                        }
                    });
                    if (box.isEmpty() || !box.min.isFinite() || !box.max.isFinite()) {
                        return reject(new Error(`Could not compute a valid bounding box for model: ${modelPath}. It might be empty or malformed.`));
                    }
                }

                const center = box.getCenter(new THREE.Vector3());
                const size = box.getSize(new THREE.Vector3());

                const recommendedCamera = calculateRecommendedCamera(box, 16 / 9);

                resolve({
                    boundingBox: {
                        min: box.min.toArray(),
                        max: box.max.toArray(),
                    },
                    center: center.toArray(),
                    dimensions: size.toArray(),
                    recommendedCamera: recommendedCamera,
                });
            },
            (error) => {
                reject(new Error(`Failed to parse GLTF model ${modelPath}: ${error.message || error}`));
            }
        );
    });
}

    if (process.argv[1] === path.resolve(process.argv[1])) {
    const testModelPath = path.join(process.cwd(), 'earth.glb');

    console.log(`Attempting to analyze model: ${testModelPath}`);

    get3DModelProperties(testModelPath)
        .then(properties => {
            console.log('\n--- Model Properties ---');
            console.log('Bounding Box Min:', properties.boundingBox.min);
            console.log('Bounding Box Max:', properties.boundingBox.max);
            console.log('Center:', properties.center);
            console.log('Dimensions (Width, Height, Depth):', properties.dimensions);
            console.log('Recommended Camera Position:', properties.recommendedCamera.position);
            console.log('Recommended Camera FOV:', properties.recommendedCamera.fov);
            console.log('------------------------');
        })
        .catch(error => {
            console.error('Error:', error.message);
            console.error('Please ensure the model file exists and is a valid GLB/GLTF.');
            console.error('If using Draco compression, you might need to specify dracoLoader.setDecoderPath().');
        });
}
