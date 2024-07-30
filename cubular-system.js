/* global THREE */

let solarSystem;

function init() {
    const scene = new THREE.Scene();
    const clock = new THREE.Clock();
    const gui = new dat.GUI();

    solarSystem = createSolarSystem(scene);
    setupAmbientLight(scene, gui);
    const camera = setupCamera();
    const renderer = setupRenderer();
    const controls = new THREE.OrbitControls(camera, renderer.domElement);

    update(renderer, scene, camera, controls, clock);
    window.addEventListener('resize', () => onWindowResize(camera, renderer), false);

    return scene;
}

function createSolarSystem(scene) {
    const texturePath = './texture/';
    const material = new CelestialMaterial(texturePath);
    return SolarSystem.heliocentric(material, scene);
    // return SolarSystem.geocentric(material, scene); // Uncomment if geocentric is needed
}

function setupAmbientLight(scene, gui) {
    const light = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(light);
    const folder = gui.addFolder('Ambient light');
    folder.add(light, 'intensity', 0, 1);
    folder.open();
}

function setupCamera() {
    const camera = new THREE.PerspectiveCamera(
        45, // field of view
        window.innerWidth / window.innerHeight, // aspect ratio
        1, // near clipping plane
        1000 // far clipping plane
    );
    camera.position.set(-24, 74, 74);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    return camera;
}

function setupRenderer() {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.getElementById('webgl').appendChild(renderer.domElement);
    return renderer;
}

function onWindowResize(camera, renderer) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function update(renderer, scene, camera, controls, clock) {
    const timeDelta = clock.getDelta();
    solarSystem.animate(timeDelta);
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(() => update(renderer, scene, camera, controls, clock));
}

const scene = init();
