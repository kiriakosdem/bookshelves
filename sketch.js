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
let buttonTogglePainting;
let painting = -1;
let labelCamera1;
let labelCamera2;
let labelCamera3;

//heights
let LoungeRoomHeight = sizeScaling*307.5;
let OfficeFloorHeight = sizeScaling*10;
let HumanHeight = sizeScaling*169;
let ColumnThickness = sizeScaling*30;

//corridors and floors
let ShoeCorridorWidth = sizeScaling*86;
let ShoeCorridorLength = sizeScaling*107;
let StepCorridorWidth = sizeScaling*176;
let StepCorridorLength = sizeScaling*20;
let LoungeFloorWidth = sizeScaling*588;
let LoungeFloorLength = sizeScaling*354;
let OfficeFloorLength = sizeScaling*456;

//walls
let PianoWallWidth = LoungeFloorWidth-ShoeCorridorWidth-StepCorridorWidth; //326cm
let PaintingWallWidth = LoungeFloorLength+StepCorridorLength;
let ShoeWallWidth = LoungeFloorLength + ShoeCorridorLength;
let PanelWallWidth = ShoeCorridorLength;
let BathroomWallWidth = ShoeCorridorWidth;

//Objects
let PianoHeight = sizeScaling*118;
let PianoWidth = sizeScaling*145;
let PianoLength = sizeScaling*28;
let KeyboardLength = sizeScaling*26;
let KeyboardHeight = sizeScaling*15;
let TvWidth = sizeScaling*92;
let TvHeight = sizeScaling*53;
let TvLength = sizeScaling*10;
let PaintingWidth = sizeScaling*108;
let PaintingHeight = sizeScaling*58;

//BookShelf
let ShelfThickness = sizeScaling*3;
let ShelfLength = sizeScaling*37;
let TopShelfLength = sizeScaling*25;
let LeftShelfWidth = sizeScaling*(92+10+10); //112cm
let RightShelfWidth = PianoWallWidth-LeftShelfWidth-PianoWidth; //69cm

let TopLeftShelfWidth = PianoWallWidth*0.55;
let TopMiddleShelfWidth = PianoWallWidth*0.15;
let TopRightShelfWidth = PianoWallWidth*0.3;

let PianoShelfMargin = sizeScaling*8;

let BottomBoxThickness = sizeScaling*25;

let LeftBottomestShelfHeight = sizeScaling*20;
let LeftBottomShelfHeight = sizeScaling*20;
let LeftMiddleShelfHeight = sizeScaling*70;
let LeftTopShelfHeight = sizeScaling*95
let RightBottomShelfHeight = sizeScaling*36;
let RightMiddleShelfHeight = sizeScaling*71;
let RightTopShelfHeight = sizeScaling*106;
let RightTopestShelfHeight = sizeScaling*141;

let TopLeftShelfHeight = sizeScaling*200;
let TopMiddleShelfHeight = sizeScaling*185;
let TopRightShelfHeight = sizeScaling*215;



function preload() {
	// Load model with normalise parameter set to true
	human = loadModel('objects/human.obj', true);
	sofa = loadModel('objects/sofa.obj', true);
	textureFloor = loadImage('images/tiles.jpg');
	textureWall = loadImage('images/wall.jpg');
	texturePainting = loadImage('images/adam.jpg');
	texturePlug = loadImage('images/cplug.jpg');
	textureWood = loadImage('images/wood.jpg');
	textureSofa = loadImage('images/sofaleaves.jpg');
}

function setup() {
	//canvas
	setAttributes('antialias', true);
	mycanvas = createCanvas(animationwidth, animationheight, WEBGL);
	mycanvas.parent("jscode");
	
	//painting buttom
	buttonTogglePainting = createButton("Πίνακας on/off");
	buttonTogglePainting.parent("jscode");
	buttonTogglePainting.style('width', '150px');
	buttonTogglePainting.style('margin','5px');
	buttonTogglePainting.class('mybutton paintingbutton');
	buttonTogglePainting.mousePressed(togglePainting);
	
	
	
	//camera
	buttonResetCam = createButton("Επαναφορά Κάμερας");
	buttonResetCam.parent("jscode");
	buttonResetCam.style('width', '150px');
	buttonResetCam.style('margin','5px');
	buttonResetCam.class('mybutton camerabutton');
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
	drawShelves();
	drawMetalStrips();
}

function resetCamera(){
	camera(0,-HumanHeight,2.3*(height/2.0)/tan(PI*30.0/180.0),  
		   0,-HumanHeight,0,  
		   0,1,0);
}

function togglePainting(){
	painting *= -1;
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
	fill(255,255,255);
	strokeWeight(strokelines);
	rotateX(PI/2)
	translate(0,0,LoungeRoomHeight)

	
	//lounge ceiling
	push();
	fill(255,255,255);
	translate(-LoungeFloorWidth/2+PianoWallWidth/2+ShoeCorridorWidth,LoungeFloorLength/2,0);
	plane(LoungeFloorWidth, LoungeFloorLength);
	pop();
	
	//lower ceiling
	push();
	//texture(textureWall)
	fill(235,228,196);
	fill(237,235,200);
	translate(-LoungeFloorWidth/2+PianoWallWidth/2+ShoeCorridorWidth,-ShoeCorridorLength/2,-ColumnThickness/2);
	box(LoungeFloorWidth, ShoeCorridorLength, ColumnThickness);
	pop();
	
	pop();
}

function drawWall(){
	push();
	//texture(textureWall);
	fill(237,235,200);
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
	translate(0,0,-sizeScaling*9/2-1);
	box(ColumnThickness,LoungeRoomHeight,sizeScaling*9-1);
	translate(0,-LoungeRoomHeight/2+ColumnThickness/2,0);
	box(ShoeWallWidth,ColumnThickness-1,sizeScaling*9)
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
	push();
	strokeWeight(1);
	
	//piano
	push();
	specularMaterial(10);
	translate(-PianoWallWidth/2+LeftShelfWidth+PianoWidth/2,-PianoHeight/2-1,PianoLength/2+2*8);
	box(PianoWidth,PianoHeight,PianoLength);
	rotateX(PI/2);
	translate(0,PianoLength/2+KeyboardLength/2,0)
	box(PianoWidth,KeyboardLength,KeyboardHeight);
	pop();
	
	if (painting==1){
		//painting
	push();
	texture(texturePainting);
	translate(-PianoWallWidth/2+LeftShelfWidth+PianoWidth/2,-PianoHeight-PaintingHeight/2-1,PianoLength/2+2*8);
	rotateX(PI/16)
	box(PaintingWidth,PaintingHeight,10);
	pop();
	}
	
	
	//plugs
	push();
	texture(texturePlug);
	push();
	translate(-PianoWallWidth/2+sizeScaling*90,-sizeScaling*50,sizeScaling*2);
	box(sizeScaling*8,sizeScaling*8,sizeScaling*2);
	translate(sizeScaling*10,0,0);
	box(sizeScaling*8,sizeScaling*8,sizeScaling*2);
	translate(sizeScaling*10,0,0);
	box(sizeScaling*8,sizeScaling*8,sizeScaling*2);
	translate(sizeScaling*10,0,0);
	box(sizeScaling*8,sizeScaling*8,sizeScaling*2);
	pop();
	translate(PianoWallWidth/2-sizeScaling*72,-sizeScaling*50,sizeScaling*2);
	box(sizeScaling*8,sizeScaling*8,sizeScaling*2);
	translate(-sizeScaling*10,0,0);
	box(sizeScaling*8,sizeScaling*8,sizeScaling*2);
	pop();
	
	//tv
	push();
	specularMaterial(10);
	translate(-PianoWallWidth/2+LeftShelfWidth/2,-LeftTopShelfHeight-TvHeight/2-20,ShelfLength/2+1);
	rotateY(-PI/16);
	box(TvWidth,TvHeight,TvLength);
	pop();
	
	//speaker
	push();
	specularMaterial(10);
	translate(PianoWallWidth/2-sizeScaling*45,-sizeScaling*265,40);
	box(40,50,40);
	pop();
	
	//human
	push();
	normalMaterial();
	texture(textureSofa);
	fill(255,195,170);
	fill(255,255,255);
	translate(0,-HumanHeight/2,0);
	rotateZ(PI);
	scale(HumanHeight/100/2);
	translate(265,0,40);
	model(human);
	pop();
	
	//sofa small
	push();
	noStroke();
	texture(textureSofa);
	rotateZ(PI);
	translate(PianoWallWidth/2+StepCorridorWidth,0,LoungeFloorLength/2)
	rotateY(-PI/2);
	scale(2);
	scale(0.9,1.052,0.952);
	translate(0,80/2,80/2+5);
	model(sofa);
	pop();
	
	//sofa big
	push();
	noStroke();
	texture(textureSofa);
	rotateZ(PI);
	translate(0,0,LoungeFloorLength)
	scale(2);
	scale(1.1,1.052,0.952);
	rotateY(PI);
	translate(-100,80/2,80/2);
	model(sofa);
	pop();
	
	pop();
}

function drawShelves(){
	texture(textureWood);
	
//	//left bottom box
//	push();
//	translate(-PianoWallWidth/2+LeftShelfWidth/2,-BottomBoxThickness/2,ShelfLength/2+1);
//	rotateX(PI/2);
//	translate(0,0,20);
//	box(LeftShelfWidth-PianoShelfMargin, ShelfLength, BottomBoxThickness);
//	pop();
//	
//	//left bottom box legs
//	push();
//	translate(-PianoWallWidth/2+PianoShelfMargin,-10,ShelfLength-3);
//	rotateX(PI/2);
//	rotateY(PI/16);
//	box(6, 6, 20);
//	pop();
//	
//	push();
//	translate(-PianoWallWidth/2+LeftShelfWidth-PianoShelfMargin,-10,ShelfLength-3);
//	rotateX(PI/2);
//	rotateY(-PI/16);
//	box(6, 6, 20);
//	pop();
//	
//	push();
//	translate(-PianoWallWidth/2+PianoShelfMargin,-10,3);
//	rotateX(PI/2);
//	rotateY(PI/16);
//	box(6, 6, 20);
//	pop();
//	
//	push();
//	translate(-PianoWallWidth/2+LeftShelfWidth-PianoShelfMargin,-10,3);
//	rotateX(PI/2);
//	rotateY(-PI/16);
//	box(6, 6, 20);
//	pop();

	
	
	//left bottom shelf
	push();
	translate(-PianoWallWidth/2+LeftShelfWidth/2,-LeftBottomShelfHeight,ShelfLength/2+1);
	rotateX(PI/2);
	box(LeftShelfWidth-2*PianoShelfMargin,ShelfLength,ShelfThickness);
	pop();
	
	//left middle shelf
	push();
	translate(-PianoWallWidth/2+LeftShelfWidth/2,-LeftMiddleShelfHeight,ShelfLength/2+1);
	rotateX(PI/2);
	box(LeftShelfWidth-2*PianoShelfMargin,ShelfLength,ShelfThickness);
	pop();
	
	//left top shelf
	push();
	translate(-PianoWallWidth/2+LeftShelfWidth/2,-LeftTopShelfHeight,ShelfLength/2+1);
	rotateX(PI/2);
	box(LeftShelfWidth-2*PianoShelfMargin,ShelfLength,ShelfThickness);
	pop();

	
//	//right bottom box
//	push();
//	fill(165,126,110);
//	translate(PianoWallWidth/2-RightShelfWidth/2,-BottomBoxThickness/2,ShelfLength/2+1);
//	rotateX(PI/2);
//	box(RightShelfWidth-PianoShelfMargin,ShelfLength,BottomBoxThickness);
//	pop();
	
	
	
	//right bottom shelf
	push();
	translate(PianoWallWidth/2-RightShelfWidth/2,-RightBottomShelfHeight,ShelfLength/2+1);
	rotateX(PI/2);
	box(RightShelfWidth-2*PianoShelfMargin,ShelfLength,ShelfThickness);
	pop();
	
	//right middle shelf
	push();
	translate(PianoWallWidth/2-RightShelfWidth/2,-RightMiddleShelfHeight,ShelfLength*0.9/2+1);
	rotateX(PI/2);
	box(RightShelfWidth-2*PianoShelfMargin,ShelfLength*0.9,ShelfThickness);
	pop();
	
	//right top shelf
	push();
	translate(PianoWallWidth/2-RightShelfWidth/2,-RightTopShelfHeight,ShelfLength*0.8/2+1);
	rotateX(PI/2);
	box(RightShelfWidth-2*PianoShelfMargin,ShelfLength*0.8,ShelfThickness);
	pop();
	
	//right topest shelf
	push();
	translate(PianoWallWidth/2-RightShelfWidth/2,-RightTopestShelfHeight,ShelfLength*0.7/2+1);
	rotateX(PI/2);
	box(RightShelfWidth-2*PianoShelfMargin,ShelfLength*0.7,ShelfThickness);
	pop();
	
	//top left shelf
	push();
	translate(-PianoWallWidth/2+TopLeftShelfWidth/2+PianoShelfMargin,-TopLeftShelfHeight, TopShelfLength/2+1);
	rotateX(PI/2);
	box(TopLeftShelfWidth-2*PianoShelfMargin,TopShelfLength,ShelfThickness);
	pop();
	
	//top middle shelf
	push();
	translate(-PianoWallWidth/2+TopLeftShelfWidth+TopMiddleShelfWidth/2,-TopMiddleShelfHeight, TopShelfLength/2+1);
	rotateX(PI/2);
	box(TopMiddleShelfWidth,TopShelfLength,ShelfThickness);
	pop();
	
	//top right shelf
	push();
	translate(PianoWallWidth/2-TopRightShelfWidth/2-PianoShelfMargin,-TopRightShelfHeight, TopShelfLength/2+1);
	rotateX(PI/2);
	box(TopRightShelfWidth-2*PianoShelfMargin,TopShelfLength,ShelfThickness);
	pop();
	
	
}

function drawMetalStrips(){
	fill(20,20,20);
	
	//left vertical stands
	push();
	translate(-PianoWallWidth/2+PianoShelfMargin-3/2,-LeftTopShelfHeight/2-LeftBottomShelfHeight/2,ShelfLength);
	rotateX(PI/2);
	box(3, 3, LeftTopShelfHeight-LeftBottomShelfHeight+ShelfThickness);
	pop();
	
	push();
	translate(-PianoWallWidth/2+LeftShelfWidth-PianoShelfMargin+3/2,-LeftTopShelfHeight/2-LeftBottomShelfHeight/2,ShelfLength);
	rotateX(PI/2);
	box(3, 3, LeftTopShelfHeight-LeftBottomShelfHeight+ShelfThickness);
	pop();
	
	push();
	translate(-PianoWallWidth/2+PianoShelfMargin+45,-LeftTopShelfHeight/2-LeftBottomShelfHeight/2,3);
	rotateX(PI/2);
	box(3, 3, LeftTopShelfHeight-LeftBottomShelfHeight+ShelfThickness);
	pop();
	
	push();
	translate(-PianoWallWidth/2+LeftShelfWidth-PianoShelfMargin-45,-LeftTopShelfHeight/2-LeftBottomShelfHeight/2,3);
	rotateX(PI/2);
	box(3, 3, LeftTopShelfHeight-LeftBottomShelfHeight+ShelfThickness);
	pop();
	
	//right ladder frame
	push();
	translate(PianoWallWidth/2-RightShelfWidth+PianoShelfMargin,-1.5*PianoHeight/2,ShelfLength/1.7);
	rotateX(PI/2+PI/16);
	box(3,16,1.5*PianoHeight);
	pop();
	
	push();
	translate(PianoWallWidth/2-PianoShelfMargin,-1.5*PianoHeight/2,ShelfLength/1.7);
	rotateX(PI/2+PI/16);
	box(3,16,1.5*PianoHeight);
	pop();
	
	push();
	translate(PianoWallWidth/2-RightShelfWidth/2,-3,ShelfLength+8);
	rotateX(PI/2);
	box(RightShelfWidth-2*PianoShelfMargin,16,3);
	pop();
	
	push();
	translate(PianoWallWidth/2-RightShelfWidth/2,-1.5*PianoHeight,8);
	rotateX(PI/2);
	box(RightShelfWidth-2*PianoShelfMargin,16,3);
	pop();
	
	//top shelf vertical left
	push();
	translate(-PianoWallWidth/2+TopLeftShelfWidth,-TopMiddleShelfHeight, TopShelfLength/2+1);
	rotateY(PI/2);
	translate(0,-TopLeftShelfHeight/2+TopMiddleShelfHeight/2,0);
	box(16,TopLeftShelfHeight-TopMiddleShelfHeight-ShelfThickness,3);
	pop();
	
	//top shelf vertical right
	push();
	translate(PianoWallWidth/2-TopRightShelfWidth,-TopMiddleShelfHeight, TopShelfLength/2+1);
	rotateY(PI/2);
	translate(0,-TopRightShelfHeight/2+TopMiddleShelfHeight/2,0);
	box(16,TopRightShelfHeight-TopMiddleShelfHeight-ShelfThickness,3);
	pop();
}