//screen dimensions
let fullscreenwidth = document.getElementById("jscode").clientWidth;//myscreen:1366;
let fullscreenheight = document.getElementById('jscode').clientHeight;//myscreen:657;
let animationwidth = fullscreenwidth;
let animationheight = fullscreenheight*0.9;
let sensitivityZoom = 0.06;
let perspectiveScale = 0.8;


//html elements
let mycanvas;
let buttonResetCam;
let labelCamera1;
let labelCamera2;
let labelCamera3;

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
	
	camera(0,-615/2,2*(height/2.0)/tan(PI*30.0/180.0),  0,-615/2,0,  0,1,0);
	perspective(perspectiveScale);
	
	//instructions
	labelCamera1 = createElement('label','Left Click and Drag: Rotate');
	labelCamera1.parent('jscode');
	labelCamera1.position(5, 0);
	labelCamera2 = createElement('label','Roll: Zoom In - Out');
	labelCamera2.parent('jscode');
	labelCamera2.position(5, 25);
	labelCamera3 = createElement('label','Left+Right Click and Drag: Translate');
	labelCamera3.parent('jscode');
	labelCamera3.position(5, 50);
}


function draw() {
	//set the scene
	background(0, 60, 70);
	ambientLight(255, 255, 255);
	pointLight(255,255,255, 0,-615/2,2*(height/2.0)/tan(PI*30.0/180.0));	
	orbitControl();
	//debugMode();
	
	
	//center of axes/camera looking at
	push();
	translate(0,-615/2,0);
	sphere(5,5);
	pop();
	
	//test sphere
	push();
	translate(100,0,0);
	//sphere(0,0);
	pop();
	
	//floor 
	push();
	fill(72,45,20,255);
	//stroke(18,11,5);
	strokeWeight(0);
	rotateX(PI/2)
	translate(0,700/2,0);
	plane(1000,700);
	pop();
	
	//ceiling
	push();
	fill(172,145,120,255);
	//stroke(18,11,5);
	strokeWeight(0);
	rotateX(PI/2)
	translate(0,700/2,615);
	plane(1000,700);
	pop();
	
	//behind wall
	push();
	fill(172,145,120,255);
	//stroke(18,11,5);
	strokeWeight(0);
	translate(0,-615/2,0);
	plane(650,615);
	pop();
	
	//piano
	push();
	specularMaterial(10);
	translate(0,-236/2,108/2);
	box(290,236,108);
	pop();
	
}


function resetCamera(){
	camera(0,-615/2,2*(height/2.0)/tan(PI*30.0/180.0),  0,-615/2,0,  0,1,0);
}