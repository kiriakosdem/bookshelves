//screen dimensions
let fullscreenwidth = document.getElementById("jscode").clientWidth;//myscreen:1366;
let fullscreenheight = document.getElementById('jscode').clientHeight;//myscreen:657;
let animationwidth = fullscreenwidth;
let animationheight = fullscreenheight;
let sensitivityZoom = 0.06;
let perspectiveScale = 0.7;
let sizeScaling = 2;
let strokelines = 0;

//html elements
let mycanvas;
let buttonResetCam;
let labelCamera1;
let labelCamera2;
let labelCamera3;

//heights
let LoungeRoomHeight = sizeScaling*307.5;
let OfficeFloorHeight = sizeScaling*10;
let HumanHeight = sizeScaling*169;

//corridors and floors
let ShoeCorridorWidth = sizeScaling*86;
let ShoeCorridorLength = sizeScaling*107;
let StepCorridorWidth = sizeScaling*176;
let StepCorridorLength = sizeScaling*20;
let LoungeFloorWidth = sizeScaling*640;
let LoungeFloorLength = sizeScaling*354;
let OfficeFloorLength = sizeScaling*456;

//walls
let PianoWallWidth = LoungeFloorWidth-ShoeCorridorWidth-StepCorridorWidth;
let PaintingWallWidth = LoungeFloorLength+StepCorridorLength;
let ShoeWallWidth = LoungeFloorLength + ShoeCorridorLength;
let PanelWallWidth = ShoeCorridorLength;
let BathroomWallWidth = ShoeCorridorWidth;

//Piano
let PianoHeight = sizeScaling*118;
let PianoWidth = sizeScaling*145;
let PianoLength = sizeScaling*28;



function preload() {
	// Load model with normalise parameter set to true
	human = loadModel('objects/human.obj', true);
	textureFloor = loadImage('images/tiles.jpg');
	textureWall = loadImage('images/wall.jpg');
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
	
	camera(0,-HumanHeight,2.3*(height/2.0)/tan(PI*30.0/180.0),  
		   0,-HumanHeight,0,  
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
}

function draw() {
	background(0, 60, 70);
	
	//light
	ambientLight(200, 200, 200);
	pointLight(255,255,255, 0,-LoungeRoomHeight/2,2*(height/2.0)/tan(PI*30.0/180.0));

	//3D graphics
	orbitControl();
	//debugMode();
	
	//center of axes/camera looking at
//	push();
//	translate(0,-LoungeRoomHeight/2,0);
//	sphere(5,5);
//	pop();
	
	drawFloor();
	drawCeiling();
	drawWall();
	drawObjects();
		
}

function resetCamera(){
	camera(0,-HumanHeight,2.3*(height/2.0)/tan(PI*30.0/180.0),  
		   0,-HumanHeight,0,  
		   0,1,0);
}

function drawFloor(){
	push();
	texture(textureFloor);
	strokeWeight(strokelines);
	rotateX(PI/2)
	
	//lounge floor 
	push();
	translate(-LoungeFloorWidth/2+PianoWallWidth/2+ShoeCorridorWidth,LoungeFloorLength/2,0);	
	plane(LoungeFloorWidth, LoungeFloorLength);
	pop();
	
	//shoe corridor floor 
	push();
	translate(PianoWallWidth/2+ShoeCorridorWidth/2,-ShoeCorridorLength/2,0);
	plane(ShoeCorridorWidth, ShoeCorridorLength);
	pop();
	
	//step corridor floor 
	push();
	translate(-PianoWallWidth/2-StepCorridorWidth/2,-StepCorridorLength/2);
	plane(StepCorridorWidth, StepCorridorLength);
	pop();
	
	//office floor
	push();
	translate(-PianoWallWidth/2-StepCorridorWidth/2,-StepCorridorLength-OfficeFloorLength/2,OfficeFloorHeight/2);
	box(StepCorridorWidth, OfficeFloorLength, OfficeFloorHeight);
	pop();
	
	pop();
}

function drawCeiling(){
	push();
	//texture(textureWall);
	fill(255,255,250);
	strokeWeight(strokelines);
	rotateX(PI/2)
	translate(0,0,LoungeRoomHeight)

	
	//lounge ceiling
	push();
	translate(-LoungeFloorWidth/2+PianoWallWidth/2+ShoeCorridorWidth,LoungeFloorLength/2,0);
	plane(LoungeFloorWidth, LoungeFloorLength);
	pop();
	
	//lower ceiling
	push();
	texture(textureWall)
	translate(-LoungeFloorWidth/2+PianoWallWidth/2+ShoeCorridorWidth,-ShoeCorridorLength/2,-30);
	box(LoungeFloorWidth, ShoeCorridorLength, 60);
	pop();
	
	pop();
}

function drawWall(){
	push();
	texture(textureWall);
	strokeWeight(strokelines);
	
	//piano wall
	push();
	translate(0,-LoungeRoomHeight/2,0);
	plane(PianoWallWidth,LoungeRoomHeight);
	pop();
	
	//shoe wall
	push();
	translate(0,-LoungeRoomHeight/2,0);
	translate(PianoWallWidth/2+ShoeCorridorWidth,0,ShoeWallWidth/2-ShoeCorridorLength);
	rotateY(PI/2);
	plane(ShoeWallWidth,LoungeRoomHeight);
	pop();
	
	//panel wall
	push();
	translate(0,-LoungeRoomHeight/2,0);
	translate(PianoWallWidth/2,0,-ShoeCorridorLength/2);
	rotateY(PI/2);
	plane(PanelWallWidth,LoungeRoomHeight);
	pop();
	
	//bathroom wall
	push();
	translate(0,-LoungeRoomHeight/2,0);
	translate(PianoWallWidth/2+ShoeCorridorWidth/2,0,-ShoeCorridorLength);
	plane(BathroomWallWidth,LoungeRoomHeight);
	pop();
	
	//painting wall
	push();
	translate(0,-LoungeRoomHeight/2,0);
	translate(-PianoWallWidth/2-StepCorridorWidth,0,PaintingWallWidth/2-StepCorridorLength);
	rotateY(PI/2);
	plane(PaintingWallWidth,LoungeRoomHeight);
	pop();
	
	pop();
}

function drawObjects(){
	//piano
	push();
	specularMaterial(10);
	translate(0+1,-PianoHeight/2-1,PianoLength/2+1);
	box(PianoWidth,PianoHeight,PianoLength);
	pop();
	
	//human
	push();
	normalMaterial();
	
	translate(0,-HumanHeight/2,0);
	rotateZ(PI);
	scale(HumanHeight/100/2);
	translate(310,0,40);
	
	model(human);
	pop()
}