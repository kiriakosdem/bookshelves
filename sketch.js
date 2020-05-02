//screen dimensions
let fullscreenwidth = document.getElementById("jscode").clientWidth;//myscreen:1366;
let fullscreenheight = document.getElementById('jscode').clientHeight;//myscreen:657;
let animationwidth = fullscreenwidth;
let animationheight = fullscreenheight*0.9;
let sensitivityZoom = 0.06;
let perspectiveScale = 0.8;

	
//conductor 
let boxwidth = 700;
let boxheight = 400;
let boxdepth = 300;
let sphereDiameter = 300;
let cylinderHeight = 800;
let cylinderDiameter = 150;
let x0 = 0;
let y0 = 0;
let z0 = 0;
let shape = 1;

//html elements
let mycanvas;
let buttonResetCam;


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
	
}


function draw() {
	//set the scene
	background(0, 60, 70);
	ambientLight(255, 255, 255);
	pointLight(255,255,255, 0,0,0);	
	orbitControl();
	//debugMode();
	
	//draw shapes	
	fill(72,45,20,100);
	stroke(18,11,5);
	strokeWeight(1);
	
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
	rotateX(PI/2)
	translate(0,700/2,0);
	plane(1000,700);
	pop();
	
	//ceiling
	push();
	rotateX(PI/2)
	translate(0,700/2,615);
	plane(1000,700);
	pop();
	
	//behind wall
	push();
	translate(0,-615/2,0);
	plane(650,615);
	pop();
	
}


function resetCamera(){
	camera(0,-615/2,2*(height/2.0)/tan(PI*30.0/180.0),  0,-615/2,0,  0,1,0);
}