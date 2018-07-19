(function() {
	let scene;
	let renderer;
	let camera;
	let cubes = [];
	let canvas;

	window.addEventListener('load', function() {
		setupRenderer();
		addShapes();
		render();

		window.addEventListener('keypress', function(e) {
			const ANGLE_INCREMENT = 0.075;
			const POSITION_INCREMENT = 2.5;

			switch(e.key) {
				case 'ArrowUp':
					camera.position.z -= POSITION_INCREMENT * Math.cos(camera.rotation.y);
					camera.position.x -= POSITION_INCREMENT * Math.sin(camera.rotation.y);
					break;
				case 'ArrowDown':
					camera.position.z += POSITION_INCREMENT * Math.cos(camera.rotation.y);
					camera.position.x += POSITION_INCREMENT * Math.sin(camera.rotation.y);
					break;
				case 'ArrowLeft':
					camera.rotation.y += ANGLE_INCREMENT;
					break;
				case 'ArrowRight':
					camera.rotation.y -= ANGLE_INCREMENT;
					break;
				default:
			}
		});
	});

	function setupRenderer() {
		canvas = document.getElementById('canvas');
		scene = new THREE.Scene();
		scene.background = new THREE.Color( 0x404040 );
		camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000);

		renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: false});
		//renderer.setPixelRatio(2);
		renderer.setSize(canvas.width * 2, canvas.height * 2, false);

		camera.position.z = 200;
		camera.position.y = -0.2;
		camera.position.x = 0;

		var ambientLight = new THREE.AmbientLight( 0x606060 );
		scene.add( ambientLight );

		var directionalLight = new THREE.DirectionalLight( 0xffffff );
		directionalLight.position.x = Math.random() - 0.5;
		directionalLight.position.y = Math.random() - 0.5;
		directionalLight.position.z = Math.random() - 0.5;
		directionalLight.position.normalize();
		scene.add( directionalLight );
	}

	function addShapes() {
		for(let x = -3; x < 3; x++) {
			var texture = new THREE.TextureLoader().load('1084.png');
			texture.minFilter = THREE.NearestFilter;
			texture.magFilter = THREE.NearestFilter;
			var geometry = new THREE.BoxGeometry(128, 128, 128);
			var material = new THREE.MeshLambertMaterial({map: texture, overdraw: 0.5});
			//material.scale.set(128, 128, 1);
			cube = new THREE.Mesh(geometry, material);

			cube.position.x = x * 160;
			scene.add(cube);
			cubes.push(cube);
		}

		var spriteMap = new THREE.TextureLoader().load( 'test-sprite-2.png');
		spriteMap.minFilter = THREE.NearestFilter;
		spriteMap.magFilter = THREE.NearestFilter;

		var spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap, color: 0xffffff, lights: true } );
		var sprite = new THREE.Sprite( spriteMaterial );
		sprite.scale.set(32, 16, 1);
		sprite.position.x = 0.5;
		sprite.position.y = -0.2;
		sprite.position.z = 170;
		scene.add( sprite );
	}

	function render() {
		/*
		cubes.forEach(function(cube) {
			cube.rotation.x += 0.01;
			cube.rotation.y += 0.01;
		});
		*/

		renderer.render(scene, camera);

		window.requestAnimationFrame(render);
	}
}());