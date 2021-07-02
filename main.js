import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js';
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/controls/OrbitControls.js';

const canvas = document.querySelector('.canvas');

// scene
const scene = new THREE.Scene();

// camera
const camera = new THREE.PerspectiveCamera(60, innerWidth/innerHeight, 0.1, 1000);
camera.position.z = 2;
scene.add(camera);

// renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
});
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
renderer.autoClear = false;
renderer.setClearColor(0x000000, 0.0);

// orbit controls
const controls = new OrbitControls(camera, renderer.domElement);


// earth loader
const earthLoader = new THREE.TextureLoader();

// earth geometry
const earthGeometry = new THREE.SphereGeometry(0.6, 32, 32);

// earth material
const earthMaterial = new THREE.MeshStandardMaterial({
    roughness: 1,
    metalness: 0,
    map: earthLoader.load("map.jpg"),
    bumpMap: earthLoader.load("bump.jpg"),
    bumpScale: 0.3
});

// earth mesh
const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earthMesh);


// cloud loader
const cloudLoader = new THREE.TextureLoader();

// cloud Geometry
const cloudGeometry = new THREE.SphereGeometry(0.63, 32, 32);

// cloud metarial
const cloudMetarial = new THREE.MeshPhongMaterial({
    map: cloudLoader.load("cloud.png"),
    transparent: true,
});

// cloud mesh
const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMetarial);
scene.add(cloudMesh);


// galaxy loader
const galaxyLoader = new THREE.TextureLoader();

// galaxy geometry
const galaxyGeometry = new THREE.SphereGeometry(80, 64, 64);

// galaxy material
const galaxyMaterial = new THREE.MeshBasicMaterial({
    map : galaxyLoader.load("galaxy.png"),
    side: THREE.BackSide
});

// galaxy mesh
const galaxyMesh = new THREE.Mesh(galaxyGeometry, galaxyMaterial);
scene.add(galaxyMesh);


// ambient light
const ambientlight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientlight);

// point light
const pointLight = new THREE.PointLight(0xffffff, 1)
pointLight.position.set(5, 3, 5);
scene.add(pointLight);


// responsiveness
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
}, false);

// animation
const anim = () => {
    requestAnimationFrame(anim);

    galaxyMesh.rotation.y -= 0.002;
    earthMesh.rotation.y -= 0.0015;
    cloudMesh.rotation.y -= 0.001;

    controls.update();
    
    renderer.render(scene, camera);
};

anim();