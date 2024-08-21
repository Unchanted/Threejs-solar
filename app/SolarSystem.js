class SolarSystem {
    constructor(animated) {
        this.animated = animated;
    }

    animate(timeDelta) {
        this.animated.forEach(element => {
            element.animate(timeDelta);
        });
    }

    static createCelestialObjects(configs, factory, animated, parent = null) {
        configs.forEach(config => {
            const obj = factory.create(config.name)
                .withSize(config.size)
                .withYearDuration(config.yearDuration)
                .withDayDuration(config.dayDuration)
                .withOrbit(parent || config.orbit, config.orbitDistance)
                .planet();

            if (config.isStar) {
                obj.withLight(new THREE.PointLight(0xffffff, 1.2, 100)).star();
            }
            animated.push(obj);
        });
    }

    static heliocentric(materialLoader, scene) {
        scene.background = materialLoader.asBackground('milky');
        const factory = new CelestialObjectFactory(materialLoader);
        const animated = [];

        const sun = factory.create('sun')
            .withSize(6)
            .withLight(new THREE.PointLight(0xffffff, 1.2, 100))
            .star();
        scene.add(sun);

        SolarSystem.createCelestialObjects([
            { name: 'mercury', size: 2, yearDuration: 0.3, dayDuration: 58, orbit: sun, orbitDistance: 8 },
            { name: 'venus', size: 3, yearDuration: 0.6, dayDuration: 241, orbit: sun, orbitDistance: 14 },
            { name: 'earth', size: 3, yearDuration: 1, dayDuration: 1, orbit: sun, orbitDistance: 22 },
            { name: 'mars', size: 2, yearDuration: 2, dayDuration: 1, orbit: sun, orbitDistance: 30 },
            { name: 'jupiter', size: 5, yearDuration: 12, dayDuration: 0.4, orbit: sun, orbitDistance: 46 },
            { name: 'saturn', size: 5, yearDuration: 30, dayDuration: 0.5, orbit: sun, orbitDistance: 62 },
            { name: 'uranus', size: 4, yearDuration: 84, dayDuration: 0.6, orbit: sun, orbitDistance: 78 },
            { name: 'neptune', size: 4, yearDuration: 165, dayDuration: 0.6, orbit: sun, orbitDistance: 92 },
            { name: 'pluto', size: 1, yearDuration: 248, dayDuration: 6, orbit: sun, orbitDistance: 98 }
        ], factory, animated);

        SolarSystem.createCelestialObjects([
            { name: 'moon', size: 0.5, yearDuration: 0.075, orbit: sun, orbitDistance: 3 },
            { name: 'phobos', size: 0.5, yearDuration: 0.066, orbit: sun, orbitDistance: 2 },
            { name: 'deimos', size: 0.5, yearDuration: 0.25, orbit: sun, orbitDistance: 3 },
            { name: 'saturn-ring', size: 4, yearDuration: 0.5, orbit: sun, orbitDistance: 5 },
            { name: 'uranus-ring', size: 3, yearDuration: 0.5, orbit: sun, orbitDistance: 4 }
        ], factory, animated);

        return new SolarSystem(animated);
    }

    static geocentric(materialLoader, scene) {
        scene.background = materialLoader.asBackground('milky');
        const factory = new CelestialObjectFactory(materialLoader);
        const animated = [];

        const earth = factory.create('earth').withSize(3).planet();
        animated.push(earth);
        scene.add(earth);

        SolarSystem.createCelestialObjects([
            { name: 'moon', size: 0.5, yearDuration: 0.075, orbit: earth, orbitDistance: 3 },
            { name: 'sun', size: 6, yearDuration: 1, dayDuration: 1, orbit: earth, orbitDistance: 22, isStar: true },
            { name: 'mercury', size: 2, yearDuration: 0.3, dayDuration: 58, orbit: sun, orbitDistance: 30 },
            { name: 'venus', size: 3, yearDuration: 0.6, dayDuration: 241, orbit: sun, orbitDistance: 36 },
            { name: 'mars', size: 2, yearDuration: 2, dayDuration: 1, orbit: sun, orbitDistance: 52 },
            { name: 'jupiter', size: 5, yearDuration: 12, dayDuration: 0.4, orbit: sun, orbitDistance: 68 },
            { name: 'saturn', size: 5, yearDuration: 30, dayDuration: 0.5, orbit: sun, orbitDistance: 84 },
            { name: 'uranus', size: 4, yearDuration: 84, dayDuration: 0.6, orbit: sun, orbitDistance: 100 },
            { name: 'neptune', size: 4, yearDuration: 165, dayDuration: 0.6, orbit: sun, orbitDistance: 114 },
            { name: 'pluto', size: 1, yearDuration: 248, dayDuration: 6, orbit: sun, orbitDistance: 120 }
        ], factory, animated);

        SolarSystem.createCelestialObjects([
            { name: 'phobos', size: 0.5, yearDuration: 0.066, orbit: earth, orbitDistance: 2 },
            { name: 'deimos', size: 0.5, yearDuration: 0.25, orbit: earth, orbitDistance: 3 },
            { name: 'saturn-ring', size: 4, yearDuration: 0.5, orbit: earth, orbitDistance: 5 },
            { name: 'uranus-ring', size: 3, yearDuration: 0.5, orbit: earth, orbitDistance: 4 }
        ], factory, animated);

        return new SolarSystem(animated);
    }
}
