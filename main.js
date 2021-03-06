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
			const POSITION_INCREMENT = 8;

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
		//scene.background = new THREE.Color( 0xb0b0b0 );
		scene.background = new THREE.Color( 0x222230 );
		camera = new THREE.PerspectiveCamera(37, canvas.width / canvas.height, 0.1, 1000);

		renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: false});
		//renderer.setPixelRatio(2);
		renderer.setSize(canvas.width * 2, canvas.height * 2, false);
		//renderer.shadowMap.enabled = true;
		//renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

		camera.position.z = 400;
		camera.position.y = 200;
		//camera.position.x = 0;
		camera.rotation.x = -0.4;

		var ambientLight = new THREE.AmbientLight( 0x606060 );
		scene.add( ambientLight );

		// Global light
		var light = new THREE.PointLight( 0x9999cc, 4.5, 1000, 2 );
		light.position.set( 200, 400, 300 );
		scene.add( light );
	}

	function addShapes() {
		const CUBE_SIZE = 64;
		// Cube test
		for(let x = -3; x < 3; x++) {
			for(let y = 0; y < 3; y++) {
				let name = 'lower-empty-color-72test';
				let rand = Math.random();

				if( rand > 0.25 ) {
					name = 'lower-empty-color-72test-3';//'door-frame-x-color';

					if( rand > 0.5 ) {
						name = 'lower-empty-color-72test-2';

						if( rand > 0.75 ) {
							name = 'door-frame-x-color';
						}
					}
				}

				if( y > 0 ) {
					name = Math.random() > 0.5 ? 'upper-wall-color' : 'upper-wall-color-2';
				}
				var texture = new THREE.TextureLoader().load(name + '.png');
				texture.minFilter = THREE.NearestFilter;
				texture.magFilter = THREE.NearestFilter;
				var geometry = new THREE.BoxGeometry(CUBE_SIZE, CUBE_SIZE, CUBE_SIZE);
				//var material = new THREE.MeshPhongMaterial({map: texture, overdraw: 0.5});
				var material = new THREE.MeshBasicMaterial({map: texture, overdraw: 0.5});
				cube = new THREE.Mesh(geometry, material);

				cube.position.x = x * CUBE_SIZE;
				cube.position.y = y * CUBE_SIZE;
				if( x == 2 || x == -1 ) {
					cube.position.z = -10;
				}
				scene.add(cube);
				cubes.push(cube);
			}
		}

		// Plane test
		var texture = new THREE.TextureLoader().load('ground-color.png');
		texture.minFilter = THREE.NearestFilter;
		texture.magFilter = THREE.NearestFilter;
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(32, 32);
		var geometry = new THREE.PlaneGeometry(896, 1200);
		var material = new THREE.MeshBasicMaterial({map: texture, side: THREE.DoubleSide, overdraw: 0.5}); //map: planeTexture
		var plane = new THREE.Mesh(geometry, material);
		scene.add(plane);
		plane.position.x = -32;
		plane.position.y = -32;
		plane.position.z = 150;
		plane.rotation.x = Math.PI/2;

		// Plane character test
		var texture2 = new THREE.TextureLoader().load('character-test.png');
		texture2.minFilter = THREE.NearestFilter;
		texture2.magFilter = THREE.NearestFilter;
		texture2.wrapS = THREE.RepeatWrapping;
		texture2.wrapT = THREE.RepeatWrapping;
		//var geometry = new THREE.PlaneGeometry(42, 27);
		var geometry = new THREE.PlaneGeometry(64, 64);
		var material = new THREE.MeshBasicMaterial({map: texture2, side: THREE.DoubleSide, overdraw: 0.5, transparent: true});
		var plane = new THREE.Mesh(geometry, material);
		scene.add(plane);
		plane.position.z = 90;


		// Sprite test
		var spriteMap = new THREE.TextureLoader().load('sprite-item-color.png');
		spriteMap.minFilter = THREE.NearestFilter;
		spriteMap.magFilter = THREE.NearestFilter;
		//spriteMap.repeat.x = 0;
		//spriteMap.offset.x = 0;
		var spriteMaterial = new THREE.SpriteMaterial({map: spriteMap, lights: true});
		var sprite = new THREE.Sprite(spriteMaterial);
		sprite.scale.set(16, 16, 1);
		sprite.position.x = 180;
		sprite.position.y = -8;
		sprite.position.z = 60;
		scene.add(sprite);
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


	/*
	// http://stemkoski.github.io/Three.js/Texture-Animation.html

	function TextureAnimator(texture, tilesHoriz = 1, tilesVert = 1, numTiles = 1, tileDispDuration) {	
		// note: texture passed by reference, will be updated by the update function.
			
		this.tilesHorizontal = tilesHoriz;
		this.tilesVertical = tilesVert;
		// how many images does this spritesheet contain?
		//  usually equals tilesHoriz * tilesVert, but not necessarily,
		//  if there at blank tiles at the bottom of the spritesheet. 
		this.numberOfTiles = numTiles;
		texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
		texture.repeat.set( 1 / this.tilesHorizontal, 1 / this.tilesVertical );

		// how long should each image be displayed?
		this.tileDisplayDuration = tileDispDuration;

		// how long has the current image been displayed?
		this.currentDisplayTime = 0;

		// which image is currently being displayed?
		this.currentTile = 0;
			
		this.update = function( milliSec ) {
			this.currentDisplayTime += milliSec;

			while (this.currentDisplayTime > this.tileDisplayDuration) {
				this.currentDisplayTime -= this.tileDisplayDuration;
				this.currentTile++;
				if (this.currentTile == this.numberOfTiles)
					this.currentTile = 0;
				var currentColumn = this.currentTile % this.tilesHorizontal;
				texture.offset.x = currentColumn / this.tilesHorizontal;
				var currentRow = Math.floor( this.currentTile / this.tilesHorizontal );
				texture.offset.y = currentRow / this.tilesVertical;
			}
		};
	}
	*/
}());