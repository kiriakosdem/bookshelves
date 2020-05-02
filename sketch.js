//screen dimensions
let fullscreenwidth = document.getElementById("jscode").clientWidth;//myscreen:1366;
let fullscreenheight = document.getElementById('jscode').clientHeight;//myscreen:657;
let animationwidth = fullscreenwidth;
let animationheight = fullscreenheight;
let sensitivityZoom = 0.06;
let perspectiveScale = 0.8;


//html elements
let mycanvas;
let buttonResetCam;
let labelCamera1;
let labelCamera2;
let labelCamera3;

//heights
let LoungeRoomHeight = 615;
let OfficeFloorHeight = 20;
let HumanHeight = 169;

//corridors and floors
let ShoeCorridorWidth = 180;
let ShoeCorridorLength = 300;

let StepCorridorWidth = 352;
let StepCorridorLength = 50;

let LoungeFloorWidth = 1280;
let LoungeFloorLength = 600;

let OfficeFloorLength = 600;

//walls
let PianoWallWidth = LoungeFloorWidth-ShoeCorridorWidth-StepCorridorWidth;
let PaintingWallWidth = LoungeFloorLength+StepCorridorLength;
let ShoeWallWidth = LoungeFloorLength + ShoeCorridorLength;
let PanelWallWidth = ShoeCorridorLength;
let BathroomWallWidth = ShoeCorridorWidth;

let strokelines = 0;

function preload() {
  // Load model with normalise parameter set to true
  human = loadModel('objects/human.obj', true);
}


function setup() {
	//canvas
	setAttributes('antialias', true);
	mycanvas = createCanvas(animationwidth, animationheight, WEBGL);
	mycanvas.parent("jscode");
	
	//camera
	buttonResetCam = createButton("Επαναφορά Κάμερας");
	buttonResetCam.parent("jscode");
	buttonResetCam.style('width', '150px');
	buttonResetCam.style('margin','5px');
	buttonResetCam.class('mybutton');
	buttonResetCam.mousePressed(resetCamera);
	
	camera(0,-LoungeRoomHeight/2,2*(height/2.0)/tan(PI*30.0/180.0),  
		   0,-LoungeRoomHeight/2,0,  
		   0,1,0);
	perspective(perspectiveScale);
	
	//instructions
	labelCamera1 = createElement('label','Rotate: Left Click and Drag');
	labelCamera1.parent('jscode');
	labelCamera1.position(5, 0);
	labelCamera2 = createElement('label','Translate: Left+Right Click and Drag');
	labelCamera2.parent('jscode');
	labelCamera2.position(5, 25);
	labelCamera3 = createElement('label','Zoom In-Out: Roll');
	labelCamera3.parent('jscode');
	labelCamera3.position(5, 50);
	
	textureFloor = loadImage('images/tiles.jpg');
	textureWall = loadImage('images/wall.jpg');
	
	
}


function draw() {
	background(0, 60, 70);
	
	//light
	ambientLight(200, 200, 200);
	pointLight(255,255,255, 0,-LoungeRoomHeight/2,2*(height/2.0)/tan(PI*30.0/180.0));

	//sd graphics
	orbitControl();
	//debugMode();
	
	//human
	push();
	translate(-450,-HumanHeight,100);
	rotateZ(PI);
	normalMaterial();
	scale(HumanHeight/100); 
	model(human);
	pop()
	
	//center of axes/camera looking at
//	push();
//	translate(0,-LoungeRoomHeight/2,0);
//	sphere(5,5);
//	pop();
	
	//test sphere
	push();
	translate(100,0,0);
	//sphere(0,0);
	pop();
	
	
	//lounge floor 
	push();
	//fill(72,45,20,255);
	texture(textureFloor);
	//stroke(18,11,5);
	strokeWeight(strokelines);
	rotateX(PI/2)
	translate(-LoungeFloorWidth/2+PianoWallWidth/2+ShoeCorridorWidth,LoungeFloorLength/2,0);
	plane(LoungeFloorWidth, LoungeFloorLength,1,1);
	pop();
	
	//shoe corridor floor 
	push();
	fill(72,45,20,255);
	//stroke(18,11,5);
	strokeWeight(strokelines);
	texture(textureFloor);
	rotateX(PI/2)
	translate(PianoWallWidth/2+ShoeCorridorWidth/2,-ShoeCorridorLength/2,0);
	plane(ShoeCorridorWidth, ShoeCorridorLength);
	pop();
	
	//shoe corridor ceiling
	push();
	fill(172,145,120,255);
	//stroke(18,11,5);
	strokeWeight(strokelines);
	texture(textureWall);
	translate(0,-LoungeRoomHeight,0);
	rotateX(PI/2)
	translate(PianoWallWidth/2+ShoeCorridorWidth/2,-ShoeCorridorLength/2,0);
	plane(ShoeCorridorWidth, ShoeCorridorLength);
	pop();
	
	//step corridor floor 
	push();
	fill(72,45,20,255);
	//stroke(18,11,5);
	strokeWeight(strokelines);
	texture(textureFloor);
	rotateX(PI/2)
	translate(-PianoWallWidth/2-StepCorridorWidth/2,-StepCorridorLength/2);
	plane(StepCorridorWidth, StepCorridorLength);
	pop();
	
	//lounge ceiling
	push();
	fill(172,145,120,255);
	//stroke(18,11,5);
	strokeWeight(strokelines);
	texture(textureWall);
	rotateX(PI/2)
	translate(-LoungeFloorWidth/2+PianoWallWidth/2+ShoeCorridorWidth,LoungeFloorLength/2,LoungeRoomHeight);
	plane(LoungeFloorWidth, LoungeFloorLength);
	pop();
	
	//piano wall
	push();
	fill(172,145,120,255);
	//stroke(18,11,5);
	strokeWeight(strokelines);
	texture(textureWall);
	translate(0,-LoungeRoomHeight/2,0);
	plane(PianoWallWidth,LoungeRoomHeight);
	pop();
	
	//shoe wall
	push();
	fill(172,145,120,255);
	//stroke(18,11,5);
	strokeWeight(strokelines);
	texture(textureWall);
	translate(0,-LoungeRoomHeight/2,0);
	translate(PianoWallWidth/2+ShoeCorridorWidth,0,ShoeWallWidth/2-ShoeCorridorLength);
	rotateY(PI/2);
	plane(ShoeWallWidth,LoungeRoomHeight);
	pop();
	
	//panel wall
	push();
	fill(172,145,120,255);
	//stroke(18,11,5);
	strokeWeight(strokelines);
	texture(textureWall);
	translate(0,-LoungeRoomHeight/2,0);
	translate(PianoWallWidth/2,0,-ShoeCorridorLength/2);
	rotateY(PI/2);
	plane(PanelWallWidth,LoungeRoomHeight);
	pop();
	
	//bathroom wall
	push();
	fill(172,145,120,255);
	//stroke(18,11,5);
	strokeWeight(strokelines);
	texture(textureWall);
	translate(0,-LoungeRoomHeight/2,0);
	translate(PianoWallWidth/2+ShoeCorridorWidth/2,0,-ShoeCorridorLength);
	plane(BathroomWallWidth,LoungeRoomHeight);
	pop();
	
	//painting wall
	push();
	fill(172,145,120,255);
	//stroke(18,11,5);
	strokeWeight(strokelines);
	texture(textureWall);
	translate(0,-LoungeRoomHeight/2,0);
	translate(-PianoWallWidth/2-StepCorridorWidth,0,PaintingWallWidth/2-StepCorridorLength);
	rotateY(PI/2);
	plane(PaintingWallWidth,LoungeRoomHeight);
	pop();
	
	//piano
	push();
	specularMaterial(10);
	translate(0+1,-236/2-1,108/2+1);
	box(290,236,108);
	pop();
	
	//office floor
	push();
	fill(72,45,20,255);
	//stroke(18,11,5);
	strokeWeight(strokelines);
	texture(textureFloor);
	rotateX(PI/2)
	translate(-PianoWallWidth/2-StepCorridorWidth/2,-StepCorridorLength-OfficeFloorLength/2,OfficeFloorHeight/2);
	box(StepCorridorWidth, OfficeFloorLength, OfficeFloorHeight);
	pop();
	
	//lower ceiling
	push();
	fill(72,45,20,255);
	//stroke(18,11,5);
	strokeWeight(strokelines);
	texture(textureWall);
	translate(0,-LoungeRoomHeight,0)
	rotateX(PI/2)
	translate(-LoungeFloorWidth/2+PianoWallWidth/2+ShoeCorridorWidth,-ShoeCorridorLength/2,-30);
	box(LoungeFloorWidth, ShoeCorridorLength, 60);
	pop();
	
}


function resetCamera(){
	camera(0,-615/2,2*(height/2.0)/tan(PI*30.0/180.0),  0,-615/2,0,  0,1,0);
}