var shapes = [];
var Canvas = (function () {
	function Canvas (canvas,shapes){
		this._canvas = document.getElementById(canvas);
		this._shapes = shapes;
		this._ctx = this._canvas.getContext('2d');
	}

	Canvas.prototype.drawShapes = function() {
		this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
		for (var i = 0; i < shapes.length; i++) {
			shapes[i].draw();
		};
	};
	return Canvas;
}());

var canvas = new Canvas('canvas',shapes);

function changeSelectShape() {
	var currentShape = document.getElementById('selectedShape');
	var target = document.getElementById('shapeType');
	var value = target.options[target.selectedIndex].value;
	switch(value) {
		case '0' :
		currentShape.innerHTML ="<div id='selectedShape'><div><label for='postionX1'>X1: </label><input id='positionX1' type='input'><label for='postionY1'>Y1: </label><input id='positionY1' type='input'></div><div><label for='postionX2'>X2: </label><input id='positionX2' type='input'><label for='postionY2'>Y2: </label><input id='positionY2' type='input'></div>";
		break;
		case '1' :
		currentShape.innerHTML = "<div><label for='width'>Width: </label><input id='width' type='input'><label for='height'>Height: </label><input id='height' type='input'></div>";
		break;
		case '2' :
		currentShape.innerHTML = "<div><label for='radius'>Radius: </label><input id='radius' type='input'></div>";
		break;
		case '3':
		currentShape.innerHTML = "<div><label for='positionX1'>X1: </label><input id='positionX1' type='input'><label for='positionY1'>Y1: </label><input id='positionY1' type='input'></div>";
		break;
		case '4':
		currentShape.innerHTML = "";
		default:
		break;
	}
}
function getTriangle() {
	var x = parseInt(document.getElementById('positionX').value);
	var x1 = parseFloat(document.getElementById('positionX1').value);
	var x2 = parseFloat(document.getElementById('positionX2').value);
	var y =  parseInt(document.getElementById('positionY').value);
	var y1 = parseFloat(document.getElementById('positionY1').value);
	var y2 = parseFloat(document.getElementById('positionY2').value);
	var color =document.getElementById('color').value;
	var triangle = new Shapes.Triangle(x,y,color,x1,y1,x2,y2);
	return triangle;
}

function getRectangle() {
	var x = parseInt(document.getElementById('positionX').value);
	var y =  parseInt(document.getElementById('positionY').value);
	var width = parseInt(document.getElementById('width').value);
	var height =  parseInt(document.getElementById('height').value);
	var color =document.getElementById('color').value;
	var rec = new Shapes.Rectangle(x,y,color,width,height);
	return rec;
	

}
function getCircle() {var x = parseInt(document.getElementById('positionX').value);
var y =  parseInt(document.getElementById('positionY').value);
var radius = parseFloat(document.getElementById('radius').value);
var color =document.getElementById('color').value;
var circle = new Shapes.Circle(x,y,color,radius);
return circle;
}
function getSegment() {
	var x = parseInt(document.getElementById('positionX').value);
	var y =  parseInt(document.getElementById('positionY').value);
	var x1 = parseFloat(document.getElementById('positionX1').value);
	var y1 = parseFloat(document.getElementById('positionY1').value);
	var color =document.getElementById('color').value;
	var segment = new Shapes.Segment(x,y,color,x1,y1);
	return segment;
	
}

function getPoint() {
	var x = parseInt(document.getElementById('positionX').value);
	var y =  parseInt(document.getElementById('positionY').value);
	var color =document.getElementById('color').value;
	var point = new Shapes.Point(x,y,color);
	return point;
	
}
function removeShape () {
	var select = document.getElementById('displayShapes');
	var index = select.selectedIndex;
	shapes.splice(index,1);
	select.remove(index);
	if(shapes.length > 0) {
		select.options.item(0).selected = true;
	}
	canvas.drawShapes();

}

function upShape() {
	var select = document.getElementById('displayShapes');
	var index = select.selectedIndex;
	if(index <= 0) {
		return;
	}
	var currentShape = shapes[index];
	shapes[index] = shapes[index -1];
	shapes[index - 1] = currentShape;
	var options = select.options;
	options[index].text = options[index-1].text;
	options[index -1].text = currentShape.toString();
	select.selectedIndex = index - 1;
}

function downShape() {
	var select = document.getElementById('displayShapes');
	var index = select.selectedIndex;
	if(index >= shapes.length) {
		return;
	}
	var currentShape = shapes[index];
	shapes[index] = shapes[index +1];
	shapes[index + 1] = currentShape;
	var options = select.options;
	options[index].text = options[index+1].text;
	options[index +1].text = currentShape.toString();
	select.selectedIndex = index + 1;
}

function getShape() {
	var target = document.getElementById('shapeType');
	var value = target.options[target.selectedIndex].value;
	var shape;
	switch(value){
		case '0':
		shape = getTriangle();
		break;
		case '1':
		shape = getRectangle();
		break;
		case '2':
		shape = getCircle();
		break;
		case '3':
		shape = getSegment();
		break;
		case '4':
		shape = getPoint();
		break;
		default:
		break;
	}
	return shape;
}
function drawShape () {
	var select = document.getElementById('displayShapes');
	var shape = getShape();
	shapes.push(shape);
	displayInSelect();
	if(shapes.length > 0) {
		select.options.item(0).selected = true;
	}
	canvas.drawShapes();
}

function displayInSelect() {
	var select = document.getElementById('displayShapes');
	select.size = shapes.length;

	var option = document.createElement('option');
	for (var i = 0; i < shapes.length; i++) {
		option.text = shapes[i].toString();
		select.add(option);
	};
	
}

document.getElementById('shapeType').addEventListener('change', changeSelectShape);
document.getElementById('addButton').addEventListener('click', drawShape);
document.getElementById('removeButton').addEventListener('click', removeShape);
document.getElementById('up').addEventListener('click', upShape);
document.getElementById('down').addEventListener('click', downShape);