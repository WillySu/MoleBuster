if (!window.MOLE) { window.MOLE = {}; }

/**
 * @extends MOLE.Component
 * @classdesc
 * DrawComponent class, containing useful functions to draw polygon with 2D Canvas
 *
 * @class
 * @property {String} [ID="DRAW_COMPONENT"]
 * @property {Number} [HALF_W=50]
 * @property {Number} [HALF_H=50]
 * @property {Number} [THIRD_W=33]
 * @property {Number} [THIRD_H=33]
 * @property {Number} [QUARTER_W=25]
 * @property {Number} [QUARTER_H=25]
 * @property {Number} [LINE_WIDTH=2]
 * @property {String} [STROKE_COLOR="#000000"]
 * @property {String} [FILL_COLOR="#888888"]
 * @property {Number} [ONE_DEGREE=Math.PI / 180]
 * @property {String} [TYPE_RECT="RECT"]
 * @property {String} [TYPE_CIRCLE="CIRCLE"]
 * @property {String} [TYPE_LINE="LINE"]
 * @property {Number} [MARGIN=2]
 */
MOLE.DrawComponent = function () {
	MOLE.Component.call(this);
	this.ID = "DRAW_COMPONENT";
	this.ctx = null;
	this.HALF_W = 50;
	this.HALF_H = 50;
	this.THIRD_W = 33;
	this.THIRD_H = 33;
	this.QUARTER_W = 25;
	this.QUARTER_H = 25;
	this.LINE_WIDTH = 2;
	this.STROKE_COLOR = "#000000";
	this.FILL_COLOR = "#888888";
	this.ONE_DEGREE = Math.PI / 180;
	this.TYPE_RECT = "RECT";
	this.TYPE_CIRCLE = "CIRCLE";
	this.TYPE_LINE = "LINE";
	this.MARGIN = 2;
};

MOLE.DrawComponent.prototype = Object.create(MOLE.Component.prototype);

/**
 * Initialize variables related to the dimensions
 * @param {Entity} entity
 */
MOLE.DrawComponent.prototype.init = function (entity) {
	MOLE.Component.prototype.init.call(this, entity);
	if (!entity.ctx) {
		console.warn("entity.ctx not found!");
		return 0;
	}

	this.ctx = entity.ctx;
	this.ctx.save();
	this.HALF_W = Math.floor(this.width / 2);
	this.HALF_H = Math.floor(this.height / 2);
	this.THIRD_W = Math.floor(this.width / 3);
	this.THIRD_H = Math.floor(this.height / 3);
	this.QUARTER_W = Math.floor(this.HALF_W / 2);
	this.QUARTER_H = Math.floor(this.HALF_H / 2);
	this.LINE_WIDTH = Math.round(this.width / 64);
	this.MARGIN = this.LINE_WIDTH;
};

/**
 * Initialize and get optional parameters
 * @param {Hash} opts optional parameter
 * @param {String} type "rect", "circle" or "line"
 */
MOLE.DrawComponent.prototype.initDrawOpts = function (opts, type) {
	if (!opts) { opts = {}; }
	if (!opts.x) { opts.x = this.HALF_W; }
	if (!opts.y) { opts.y = this.HALF_H; }
	if (!opts.top) { opts.top = 0; }
	if (!opts.left) { opts.left = 0; }
	if (!opts.width) { opts.width = 0; }
	if (!opts.height) { opts.height = 0; }
	//if (!opts.fillColor) { opts.fillColor = this.FILL_COLOR; } //default is NOT to fill
	if (!opts.strokeColor) { opts.strokeColor = this.STROKE_COLOR; }
	if (!opts.lineWidth) { opts.lineWidth = this.LINE_WIDTH; }
	if (type == this.TYPE_RECT) {
		if (!opts.radius) { opts.radius = opts.lineWidth; }
	} else if (type == this.TYPE_CIRCLE) {
		if (!opts.radius) { opts.radius = ((opts.x < opts.y) ? opts.x : opts.y); } //smaller value of x or y
		if (!opts.startDegree) { opts.startDegree = 0; }
		if (!opts.endDegree) { opts.endDegree = 360; }
	} else if (type == this.TYPE_LINE) {
		if (!opts.positions) { opts.positions = [ [0, 0], [this.width, this.height] ]; }
		if (!opts.lineCap) { opts.lineCap = "round"; }
		if (!opts.lineJoin) { opts.lineJoin = "round"; }
	}
	return opts;
};

/**
 * Draw a rectangle
 * @param {Hash} opts optional parameters
 */
MOLE.DrawComponent.prototype.drawRect = function (opts) {
	opts = this.initDrawOpts(opts, this.TYPE_RECT);
	this.ctx.beginPath();
	this.ctx.lineWidth = opts.lineWidth;
	this.ctx.rect(opts.left, opts.top, opts.width, opts.height);
	this.fillAndStroke(opts.fillColor, opts.strokeColor);
	this.ctx.closePath();
};

/**
 * Draw a rounded corner rectangle
 * @param {Hash} opts optional parameters
 */
MOLE.DrawComponent.prototype.drawRoundRect = function (opts) {
	var strokeRadius, halfStrokeR, fillRadius, halfFillR;
	opts = this.initDrawOpts(opts, this.TYPE_RECT);
	strokeRadius = opts.radius;
	halfStrokeR = strokeRadius / 2;
	fillRadius = strokeRadius - opts.lineWidth;
	halfFillR = fillRadius / 2;

	this.ctx.beginPath();
	this.fillAndStroke(opts.fillColor, opts.strokeColor, true);
	this.ctx.lineWidth = strokeRadius;
	this.ctx.lineJoin = "round";
	this.ctx.strokeRect(opts.left+halfStrokeR, top+halfStrokeR, opts.width-strokeRadius, opts.height-strokeRadius);
	this.ctx.lineWidth = opts.lineWidth;
	this.ctx.fillRect(opts.left+halfFillR, opts.top+halfFillR, opts.width-fillRadius, opts.height-fillRadius);
	this.ctx.closePath();
};

/**
 * Draw a circle
 * @param {Hash} opts optional parameters
 */
MOLE.DrawComponent.prototype.drawCircle = function (opts) {
	var startRadian, endRadian;
	opts = this.initDrawOpts(opts, this.TYPE_CIRCLE);
	startRadian = opts.startDegree * this.ONE_DEGREE;
	endRadian = opts.endDegree * this.ONE_DEGREE;

	this.ctx.beginPath();
	this.ctx.lineWidth = opts.lineWidth;
	this.ctx.arc(opts.x, opts.y, opts.radius, startRadian, endRadian);
	this.fillAndStroke(opts.fillColor, opts.strokeColor);
	this.ctx.closePath();
};

/**
 * Draw lines
 * @param {Hash} opts optional parameters
 */
MOLE.DrawComponent.prototype.drawLines = function (opts) {
	var i, l, x, y;
	opts = this.initDrawOpts(opts, this.TYPE_LINE);

	this.ctx.beginPath();
	this.ctx.lineWidth = opts.lineWidth;
	this.ctx.lineCap = opts.lineCap;
	this.ctx.lineJoin = opts.lineJoin;
	for (i=0, l = opts.positions.length; i<l; i++) {
		x = opts.positions[i][0];
		y = opts.positions[i][1];
		if (i) { //greater than 0
			this.ctx.lineTo(x, y);
		} else {
			this.ctx.moveTo(x, y);
		}
	}
	this.fillAndStroke(opts.fillColor, opts.strokeColor);
	this.ctx.closePath();
};

/**
 * Fill and stroke
 * @param {String} fillColor
 * @param {String} strokeColor
 * @param {Boolean} silence define colors without filling or stroking when true
 */
MOLE.DrawComponent.prototype.fillAndStroke = function (fillColor, strokeColor, silence) {
	if (fillColor) {
		this.ctx.fillStyle = fillColor;
		if (!silence) { this.ctx.fill(); }
	}
	if (strokeColor) {
		this.ctx.strokeStyle = strokeColor;
		if (!silence) { this.ctx.stroke(); }
	}
};

/**
 * Vertical flip
 * @param {Boolean} silence flip without redraw
 */
MOLE.DrawComponent.prototype.verticalFlip = function (silence) {
	if (!silence) this.clear();
	this.ctx.scale(-1, 1);
	this.ctx.translate(-this.width, 0);
	if (!silence) {
		this.draw();
	}
	return this;
};

/**
 * Horizontal flip
 * @param {Boolean} silence flip without redraw
 */
MOLE.DrawComponent.prototype.horizontalFlip = function (silence) {
	if (!silence) this.clear();
	this.ctx.scale(1, -1);
	this.ctx.translate(0, -this.height);
	if (!silence) this.draw();
	return this;
};

/**
 * @param {Number} degree
 * @param {Boolean} silence rotate without redraw
 */
MOLE.DrawComponent.prototype.rotate = function (degree, silence) {
	if (!silence) this.clear();
	this.ctx.translate(this.HALF_W, this.HALF_H);
	this.ctx.rotate(degree * this.ONE_DEGREE);
	this.ctx.translate(-this.HALF_W, -this.HALF_H);
	if (!silence) this.draw();
	return this;
};

/**
 * @param {Number} x
 * @param {Number} y
 * @param {Boolean} silence translate without redraw
 */
MOLE.DrawComponent.prototype.translate = function (x, y, silence) {
	if (!silence) this.clear();
	this.ctx.translate(x, y);
	if (!silence) this.draw();
	return this;
};

/**
 * Reset to the initial state by removing all transformation
 * @param {Boolean} silence reset without redraw
 */
MOLE.DrawComponent.prototype.reset = function (silence) {
	this.ctx.restore();
	if (!silence) {
		this.clear();
		this.draw();
	}
};

/**
 * @param {Number} [horizontal=0] horizontal skew value
 * @param {Number} [vertical=0] vertical skew value
 */
MOLE.DrawComponent.prototype.skew = function (horizontal, vertical) {
	this.ctx.setTransform(1, horizontal || 0, vertical || 0, 1, 0, 0);
};

/**
 * Function to draw the polygon, calling in .exec() function
 */
MOLE.DrawComponent.prototype.draw = function () {
	//to be overwritten
};

/**
 * Clear the canvas
 */
MOLE.DrawComponent.prototype.clear = function () {
	this.ctx.clearRect(0, 0, this.width, this.height);
};

/**
 * Execute .draw() function
 */
MOLE.DrawComponent.prototype.exec = function () {
	MOLE.Component.prototype.exec.call(this);
	this.draw();
};