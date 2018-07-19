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
			const POSITION_INCREMENT = 3;

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

		camera.position.z = 300;
		camera.position.y = -0.2;
		camera.position.x = 0;

		var ambientLight = new THREE.AmbientLight( 0x606060 );
		scene.add( ambientLight );

		/*
		var directionalLight = new THREE.DirectionalLight( 0xffffff );
		directionalLight.position.x = Math.random() - 0.5;
		directionalLight.position.y = Math.random() - 0.5;
		directionalLight.position.z = Math.random() - 0.5;
		directionalLight.position.normalize();
		scene.add( directionalLight );
		*/

		var light = new THREE.PointLight( 0xff7700, 10, 800, 2 );
		light.position.set( 300, 400, 150 );
		scene.add( light );
	}

	function addShapes() {
		// Cube test
		for(let x = -3; x < 3; x++) {
			var texture = new THREE.TextureLoader().load('1084.png');
			texture.minFilter = THREE.NearestFilter;
			texture.magFilter = THREE.NearestFilter;
			var geometry = new THREE.BoxGeometry(128, 128, 128);
			var material = new THREE.MeshLambertMaterial({map: texture, overdraw: 0.5});
			cube = new THREE.Mesh(geometry, material);

			cube.position.x = x * 160;
			scene.add(cube);
			cubes.push(cube);
		}

		// Plane test
		var planeTexture = new THREE.TextureLoader().load('1084.png');
		planeTexture.minFilter = THREE.NearestFilter;
		planeTexture.magFilter = THREE.NearestFilter;
		var geometry = new THREE.PlaneGeometry(128, 128);
		var material = new THREE.MeshLambertMaterial({map: planeTexture, side: THREE.DoubleSide, overdraw: 0.5});
		var plane = new THREE.Mesh(geometry, material);
		scene.add(plane);
		plane.position.x = 50;
		plane.position.z = 150;
		plane.rotation.y = 1;

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
		console.log(spriteMap);
		sprite.position.x = 0.5;
		sprite.position.y = -0.2;
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