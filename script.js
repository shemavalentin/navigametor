
let CANVAS;
let ANGLE = 0;

function main(){
	CANVAS = document.getElementById("firstCanvas")
	CANVAS.width = window.innerWidth;
	CANVAS.height = window.innerHeight;

	// We now need to access the device orientation.

	window.addEventListener("deviceorientation", onOrientationChange);
}

// Defining the event listener function 
function onOrientationChange(event){
	ANGLE = event.alpha;

	// Adding an offset as It will point the right
	const offset = -Math.PI/2;
	const fixedAngle = ANGLE * Math.PI/180+offset;

	// Calculating the radius( here I need to use the minimum cse it a bit less than the half of the minimum of 
	// the width and height)
	const rad = Math.min(CANVAS.width, CANVAS.height)* 0.45;

	// Making the moving part to be relative to the circle. I use the trigonometric function to calculate this.
	// on this I'll use the cosin on the X and the sin on Y
	const movingTip = {
		// x: CANVAS.width/2 + Math.cos(ANGLE*Math.PI/180) * rad,
		x: CANVAS.width/2 + Math.cos(fixedAngle) * rad,
 		y: CANVAS.height/2 + Math.sin(fixedAngle) * rad   // these angles here are in degrees but they should be in ridians. 
 		// we need to convert them in by adding (Math.PI/180)
	}

	// using the canvas context to draw a path with wight color
	const ctx = CANVAS.getContext("2d");

	// Clear the canvas every time the angle changes
	ctx.clearRect(0,0, CANVAS.width, CANVAS.height)

	// Adding an arc to show the actual angle 
	ctx.beginPath()
	ctx.fillStyle = "#47f";   // using blue to draw the arc

	// It doesn't make sense to rotate over 90 degrees
	if(movingTip.y > CANVAS.height/2){
		ctx.fillStyle = "red"
	}

	// Checking if the moving tip is on the side of the screen.
	if (movingTip.x > CANVAS.width/2){
		ctx.arc(CANVAS.width/2, CANVAS.height/2, rad, offset, fixedAngle)
	}
	else {
		// if the moving  part is on the ohter side, it will drow the arc conterclockwose
		ctx.arc(CANVAS.width/2, CANVAS.height/2, rad, offset, fixedAngle, true) 
	}
	
	// making the canvas looking like the pie slice
	ctx.lineTo(CANVAS.width/2, CANVAS.height/2);
	ctx.fill()




	ctx.beginPath();
	// Moving to the center of the convas
	ctx.strokeStyle = "white";

	// Moving to the center of the convas and draw the vertical line segment the size of the radius 
	ctx.moveTo(CANVAS.width/2, CANVAS.height/2);
	ctx.lineTo(CANVAS.width/2, CANVAS.height/2 - rad)
	ctx.stroke();

	// Drowing another line segment in the direction of alpha angle

	ctx.beginPath();
	ctx.strokeStyle = "#47f";
	ctx.moveTo(CANVAS.width/2, CANVAS.height/2);

	//Here I need to calculate the the location of the tip that moves next
	ctx.lineTo(movingTip.x, movingTip.y);
	ctx.stroke();
}