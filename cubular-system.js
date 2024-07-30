var camera;
function init() {
    var scene = new THREE.Scene();
    var clock = new THREE.Clock();
    var gui = new dat.GUI();

    var materialLoader = new CubeMaterial('./texture/');
    var factory = new CelestialObjectFactory(materialLoader);

    scene.background = materialLoader.asBackground('milky');

    var sun = factory.create('sun')
            .withSize(6)
            .withLight(new THREE.PointLight(0xffffff, 1.2, 100))
            .build();
    scene.add(sun);

    var mercury = factory.create('mercury')
            .withSize(2)
            .withYearDuration(0.3)
            .withDayDuration(58)
            .withOrbit(sun, 8)
            .build();

    var venus = factory.create('venus')
            .withSize(3)
            .withYearDuration(0.6)
            .withDayDuration(241)
            .withOrbit(sun, 14)
            .build();

    var earth = factory.create('earth')
            .withSize(3)
            .withYearDuration(1)
            .withDayDuration(1)
            .withOrbit(sun, 22)
            .build();

    var moon = factory.create('moon')
            .withSize(0.5)
            .withYearDuration(4)
            .withOrbit(earth, 3)
            .build();

    var mars = factory.create('mars')
            .withSize(2)
            .withYearDuration(2)
            .withDayDuration(1)
            .withOrbit(sun, 30)
            .build();

    var phobos = factory.create('phobos')
            .withSize(0.5)
            .withYearDuration(0.04)
            .withDayDuration(1)
            .withOrbit(mars, 2)
            .build();

    var deimos = factory.create('deimos')
            .withSize(0.5)
            .withYearDuration(0.04)
            .withDayDuration(0.2)
            .withOrbit(mars, 3)
            .build();

    var jupiter = factory.create('jupiter')
            .withSize(5)
            .withYearDuration(12)
            .withDayDuration(0.4)
            .withOrbit(sun, 46)
            .build();

    var saturn = factory.create('saturn')
            .withSize(5)
            .withYearDuration(30)
            .withDayDuration(0.5)
            .withOrbit(sun, 62)
            .build();

    var uranus = factory.create('uranus')
            .withSize(4)
            .withYearDuration(84)
            .withDayDuration(0.6)
            .withOrbit(sun, 78)
            .build();

    var neptune = factory.create('neptune')
            .withSize(4)
            .withYearDuration(165)
            .withDayDuration(0.6)
            .withOrbit(sun, 92)
            .build();

    var pluto = factory.create('pluto')
            .withSize(1)
            .withYearDuration(248)
            .withDayDuration(6)
            .withOrbit(sun, 98)
            .build();

    var light = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(light);
    var f = gui.addFolder('Ambient light');
    f.add(light, 'intensity', 0, 1);
    f.open();
