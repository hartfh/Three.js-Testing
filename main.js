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
			const POSITION_INCREMENT = 4;

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
		scene.background = new THREE.Color( 0x191930 );
		camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000);

		renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: false});
		//renderer.setPixelRatio(2);
		renderer.setSize(canvas.width * 2, canvas.height * 2, false);
		//renderer.shadowMap.enabled = true;
		//renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

		camera.position.z = 270;
		camera.position.y = -5;
		//camera.position.x = 0;

		var ambientLight = new THREE.AmbientLight( 0x606060 );
		scene.add( ambientLight );

		// Global light
		var light = new THREE.PointLight( 0xccaa88, 4.5, 1000, 2 );
		light.position.set( 200, 400, 300 );
		scene.add( light );


		/*
		// Sign light
		var light = new THREE.PointLight( 0xffaa66, 6, 60, 2);
		light.position.set( -70, 80, 70 );
		scene.add( light );
		*/
	}

	function addShapes() {
		// Cube test
		for(let x = -3; x < 3; x++) {
			for(let y = 0; y < 4; y++) {
				let name = 'lower-empty';
				let rand = Math.random();

				if( rand > 0.3333 ) {
					name = 'door-frame';

					if( rand > 0.6666 ) {
						name = 'door-large';
					}
				}

				if( y > 0 ) {
					name = 'upper-wall';
				}
				var texture = new THREE.TextureLoader().load(name + '.png');
				texture.minFilter = THREE.NearestFilter;
				texture.magFilter = THREE.NearestFilter;
				var geometry = new THREE.BoxGeometry(128, 128, 128);
				var material = new THREE.MeshLambertMaterial({map: texture, overdraw: 0.5});
				cube = new THREE.Mesh(geometry, material);

				cube.position.x = x * 128;
				cube.position.y = y * 128;
				if( x == 2 || x == -1 ) {
					cube.position.z = -10;
				}
				scene.add(cube);
				cubes.push(cube);
			}
		}

		// Plane test
		//var planeTexture = new THREE.TextureLoader().load('1084.png');
		//planeTexture.minFilter = THREE.NearestFilter;
		//planeTexture.magFilter = THREE.NearestFilter;
		var geometry = new THREE.PlaneGeometry(900, 1200);
		var material = new THREE.MeshLambertMaterial({color: 0x404050, side: THREE.DoubleSide, overdraw: 0.5}); //map: planeTexture
		var plane = new THREE.Mesh(geometry, material);
		scene.add(plane);
		plane.position.y = -64 - 5;
		plane.position.z = 150;
		plane.rotation.x = Math.PI/2;

		// Sidewalk 1
		var geometry = new THREE.PlaneGeometry(900, 150);
		var material = new THREE.MeshLambertMaterial({color: 0x707075, side: THREE.DoubleSide, overdraw: 0.5}); //map: planeTexture
		var plane = new THREE.Mesh(geometry, material);
		scene.add(plane);
		plane.position.y = -64;
		plane.position.z = 100;
		plane.rotation.x = Math.PI/2;

		// Sidewalk 1 vertical
		var geometry = new THREE.PlaneGeometry(900, 6);
		var material = new THREE.MeshLambertMaterial({color: 0x707075, side: THREE.DoubleSide, overdraw: 0.5}); //map: planeTexture
		var plane = new THREE.Mesh(geometry, material);
		scene.add(plane);
		plane.position.y = -67;
		plane.position.z = 175;

		// Sidewalk 2
		var geometry = new THREE.PlaneGeometry(900, 150);
		var material = new THREE.MeshLambertMaterial({color: 0x707075, side: THREE.DoubleSide, overdraw: 0.5}); //map: planeTexture
		var plane = new THREE.Mesh(geometry, material);
		scene.add(plane);
		plane.position.y = -64;
		plane.position.z = 500;
		plane.rotation.x = Math.PI/2;

		// Sidewalk 2 vertical
		var geometry = new THREE.PlaneGeometry(900, 6);
		var material = new THREE.MeshLambertMaterial({color: 0x707075, side: THREE.DoubleSide, overdraw: 0.5}); //map: planeTexture
		var plane = new THREE.Mesh(geometry, material);
		scene.add(plane);
		plane.position.y = -67;
		plane.position.z = 425;

		// Opposite building
		var geometry = new THREE.PlaneGeometry(900, 450);
		var material = new THREE.MeshLambertMaterial({color: 0x556677, side: THREE.DoubleSide, overdraw: 0.5}); //map: planeTexture
		var plane = new THREE.Mesh(geometry, material);
		scene.add(plane);
		plane.position.y = 67;
		plane.position.z = 565;

		// Sprite test
		var spriteMap = new THREE.TextureLoader().load('test-sprite-2.png');
		spriteMap.minFilter = THREE.NearestFilter;
		spriteMap.magFilter = THREE.NearestFilter;
		spriteMap.repeat.x = 0.5;
		spriteMap.offset.x = 0.5;
		//spriteMap.offset.y = 0.3;
		var spriteMaterial = new THREE.SpriteMaterial({map: spriteMap, lights: true});
		var sprite = new THREE.Sprite(spriteMaterial);
		sprite.scale.set(32, 16, 1);
		sprite.position.x = -40;
		sprite.position.y = -40;
		sprite.position.z = 170;
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