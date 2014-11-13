"use strict";
Object.prototype.extends = function (parent) {
	if (!Object.create) {
		Object.prototype.create = function (proto) {
			function F() {};
			F.prototype = proto;
			return new F();
		};
	};

	this.prototype = Object.create(parent.prototype);
	this.prototype.constructor = this;
}


var Shapes = (function() {
	var canvas = document.createElement('canvas')
	function isInt(number) {
	var isInteger = true;
	if(typeof number !="number") {
		isInteger = false;
	}
	if(!isFinite(number)) {
		isInteger = false;
	}
	if(number % 1 !==0) {
		isInteger = false;
	}
	return isInteger;
	}

	function isHexaColor(sNum){
		var index = sNum.substring(1,0);
		if(index !== "#") {
			console.log("opa");
			return false;
		}
		var isHexColor = sNum.substring(1,sNum.length);
  		return (typeof isHexColor === "string") && isHexColor.length === 6
         && ! isNaN( parseInt(isHexColor, 16) );
	}


	var Shape = (function (){
		function Shape(x,y,color) {
			this.setX(x);
			this.setY(y);
			this.setColor(color);
		}


		Shape.prototype.getX = function () {
			return this._x;
		}
		Shape.prototype.setX = function(x) {
			if(!isInt(x)) {
				throw new Error("X shoud be a integer number!");
			}

			this._x = x;
		}
		Shape.prototype.getY = function () {
			return this._y;
		}

		Shape.prototype.setY = function (y) {
			if(!isInt(y)) {
				throw new Error("Y shoud be a integer number!");
			}

			this._y = y;
		}

		Shape.prototype.setColor = function(color) {
			if(!isHexaColor(color)) {
				throw new Error("Color should be a string in hex format like #ffffff");
			}

			this._color = color;
		}

		Shape.prototype.getColor = function () {
			return this._color;
		}

		Shape.prototype.drawCanvas = function () {
			var canvas = document.createElement('canvas')
			canvas.width = 1200;
			canvas.height = 1000;
			document.body.appendChild(canvas);
			return canvas;
		};

		Shape.prototype.draw = function () {
			var canvas = document.getElementsByTagName('canvas')[0];
			if(canvas === undefined) {
				canvas = Shape.prototype.drawCanvas.call(this);
			}
			var ctx = canvas.getContext('2d');
			ctx.beginPath();
			ctx.fillStyle = this._color;
			return ctx;
		}

		Shape.prototype.toString = function () {
			var result = this.constructor.name + "\n";
			result += "Position X: " + this._x + "\nPosition Y: " + this._y + "\nColor: " + this._color;
			return result;	
		}
		return Shape;
	}());

	var Rectangle = (function() {
		function Rectangle(x,y,color,width,height){
			Shape.call(this,x,y,color);
			this.setWidth(width);
			this.setHeight(height);
		}

		Rectangle.extends(Shape);

		Rectangle.prototype.getWidht = function () {
			return this._width;
		}

		Rectangle.prototype.setWidth = function (value) {
			if(typeof value != "number") {
				throw new Error("Widht should be a number!");
			}
			if(value < 0) {
				throw new Error("Widht should be a positive number!");
			}

			this._width = value;
		}


		Rectangle.prototype.getHeight = function () {
			return this._height;
		}

		Rectangle.prototype.setHeight = function (value) {
			if(typeof value != "number") {
				throw new Error("Widht should be a number");
			}
			if(value < 0) {
				throw new Error("Width should be a positive number!");
			}

			this._height = value;
		}
		Rectangle.prototype.draw = function () {
			var ctx = Shape.prototype.draw.call(this);
			ctx.rect(this._x,this._y,this._width,this._height);
			ctx.fill();
		}

		Rectangle.prototype.toString = function () {
			var result = Shape.prototype.toString.call(this);
			result += "\nWidht: " + this._width + "\nHeight: " + this._height;
			return result;
		}
		return Rectangle;
	}());
	var Circle = (function () {
		function Circle(x,y,color,radius) {
			Shape.call(this,x,y,color);
			this.setRadius(radius);
		}

		Circle.extends(Shape);

		Circle.prototype.setRadius = function (value) {
			if(typeof value != "number") {
				throw new Error("Radius shoud be a number!");
			}
			if(value < 0) {
				throw new Error("Radius shoud be a positive number!");
			}

			this._radius = value;
		}

		Circle.prototype.getRadius = function () {
			return this._radius;
		}
		Circle.prototype.draw = function (){ 
			var ctx = Shape.prototype.draw.call(this);
			ctx.arc(this._x,this._y,this._radius,0, 2 * Math.PI,false);
			ctx.fill();
		}

		Circle.prototype.toString = function() {
			var result = Shape.prototype.toString.call(this);
			result += "\nRadius: " + this.getRadius() ;
			return result;		
		};
		return Circle;
	}());
	var Triangle = ( function() {
		function Triangle(x,y,color,x1,y1,x2,y2) {
			Shape.call(this,x,y,color)
			this.setX1(x1);
			this.setX2(x2);
			this.setY1(y1);
			this.setY2(y2);
			isValidTriangle(this._x,this._y,this._x1,this._y1,this._x2,this._y2);
		}
		Triangle.extends(Shape);
		function isValidTriangle (x,y,x1,y1,x2,y2) {
		
			var	 sideA = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
			var sideB = Math.sqrt((x1 - x) * (x1 - x) + (y1 - y) * (y1 - y));
			var sideC = Math.sqrt((x - x2) * (x - x2) + (y - y2) * (y - y2));
			if (sideA + sideB > sideC && sideA + sideC > sideB && sideC + sideB >sideA) {
				return true;
			} else {
					throw new Error("Invalid Triangle!");
			}
		
		}
		Triangle.prototype.setX1 = function(value) {
			if(typeof value != "number") {
				throw new Error("X1 should be a number");
			}

			this._x1 = value;
		};

		Triangle.prototype.getX1 = function() {
			return this._x1;
		};

		Triangle.prototype.setX2 = function(value) {
		if(typeof value != "number") {
				throw new Error("X2 should be a number");
			}

			this._x2 = value;
		};

		Triangle.prototype.getX2 = function() {
			return this._x2;
		};


		Triangle.prototype.setY1 = function(value) {
			if(typeof value != "number") {
				throw new Error("Y1 should be a number");
			}

			this._y1 = value;
		};

		Triangle.prototype.getY1 = function() {
			return this._y1;
		};

		Triangle.prototype.setY2 = function(value) {
			if(typeof value != "number") {
				throw new Error("Y2 should be a number");
			}

			this._y2 = value;
		};
		Triangle.prototype.getY2 = function() {
			return this._y2;
		};
		Triangle.prototype.draw = function() {
			var ctx = Shape.prototype.draw.call(this);
			ctx.moveTo(this._x,this._y);
			ctx.lineTo(this._x1,this._y1);
			ctx.lineTo(this._x2,this._y2);
			ctx.fill();
		}

		Triangle.prototype.toString = function() {
			var result = Shape.prototype.toString.call(this);
			result += "\nPosition x1: " + this.getX1()  +"\nPosition y1: " + this.getY1();
			result += "\nPosition x2: " + this.getX2()  +"\nPosition y2: " + this.getY2();
			return result;		
		};
		return Triangle;

	}());

	var Segment = (function() {
		function Segment(x,y,color,x1,y1) {
			Shape.call(this,x,y,color);
			this._x1 = x1;
			this._y1 = y1;
		}
		Segment.extends(Shape);

		Segment.prototype.setX1 = function(value) {
			if(typeof value != "number") {
				throw new Error("X1 should be a number");
			}

			this._x1 = value;
		};

		Segment.prototype.getX1 = function() {
			return this._x1;
		};
		Segment.prototype.setY1 = function(value) {
			if(typeof value != "number") {
				throw new Error("Y1 should be a number");
			}

			this._Y1 = value;
		};
		Segment.prototype.draw = function() {
			var ctx = Shape.prototype.draw.call(this);
			ctx.moveTo(this._x,this._y);
			ctx.lineTo(this._x1,this._y1);
			ctx.strokeStyle = this._color;
			ctx.stroke();
		}

		return Segment;
	}());

	var Point = (function () {
		function Point(x,y,color) {
			Shape.call(this,x,y,color);
		}
		Point.extends(Shape);
		Point.prototype.draw = function () {
			var ctx = Shape.prototype.draw.call(this);
			ctx.arc(this._x,this._y,3,0, 2 * Math.PI,true);
			ctx.fill();
		}
		return Point;
	}());

	return {
		Shape: Shape,
		Rectangle : Rectangle,
		Triangle: Triangle,
		Circle: Circle,
		Segment: Segment,
		Point: Point
	}
	
}());


