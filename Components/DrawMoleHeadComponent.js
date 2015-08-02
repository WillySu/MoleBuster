if (!window.MOLE) { window.MOLE = {}; }

/**
 * @extends MOLE.DrawComponent
 * @classdesc
 * DrawMoleHeadComponent class, draw a Mole with the head and nose
 *
 * @class
 * @todo Isolate code for eye movement in a separate component
 */
MOLE.DrawMoleHeadComponent = function () {
	MOLE.DrawComponent.call(this);
	this.ID = "DRAW_MOLE_HEAD_COMPONENT";
	this.SKIN_COLOR = "#8b4513";
	this.NOSE_COLOR = "#800000";
	this.HAIR_CENTER = {
		x: null,
		y: null
	};
	this.HAIR_EXTENT_1 = {
		x: null,
		y: null
	};
	this.HAIR_EXTENT_2 = {
		x: null,
		y: null
	};
	this.HAIR_EXTENT_3 = {
		x: null,
		y: null
	};
};

MOLE.DrawMoleHeadComponent.prototype = Object.create(MOLE.DrawComponent.prototype);

/**
 * Initialize hairs start point
 * @param {Entity} entity
 */
MOLE.DrawMoleHeadComponent.prototype.init = function (entity) {
	MOLE.DrawComponent.prototype.init.call(this, entity);
	this.HAIR_CENTER.x = this.THIRD_W + this.MARGIN;
	this.HAIR_CENTER.y = this.THIRD_H;
	this.HAIR_EXTENT_1.x = this.THIRD_W / 3;
	this.HAIR_EXTENT_1.y = this.THIRD_H / 3;
	this.HAIR_EXTENT_2.x = this.HAIR_EXTENT_1.x - this.MARGIN;
	this.HAIR_EXTENT_2.y = this.HAIR_EXTENT_1.y + this.MARGIN;
	this.HAIR_EXTENT_3.x = this.HAIR_EXTENT_1.x + this.MARGIN;
	this.HAIR_EXTENT_3.y = this.HAIR_EXTENT_1.y - this.MARGIN;
};

/**
 * Three lines from left eye's center
 */
MOLE.DrawMoleHeadComponent.prototype.drawHairs = function () {
	this.drawLines({
		"positions": [
			[this.HAIR_EXTENT_1.x, this.HAIR_EXTENT_1.y],
			[this.HAIR_CENTER.x, this.HAIR_CENTER.y],
			[this.HAIR_EXTENT_2.x, this.HAIR_EXTENT_2.y]
		],
		"strokeColor": this.STROKE_COLOR
	});
	this.drawLines({
		"positions": [
			[this.HAIR_EXTENT_3.x, this.HAIR_EXTENT_3.y],
			[this.HAIR_CENTER.x, this.HAIR_CENTER.y]
		],
		"strokeColor": this.STROKE_COLOR
	});
};

/**
 * Draw body with a rectangle and a half-circle
 */
MOLE.DrawMoleHeadComponent.prototype.drawBody = function () {
	this.drawRect({
		"fillColor": this.SKIN_COLOR,
		"top": this.HALF_H - this.MARGIN,
		"left": this.MARGIN,
		"width": this.width - (this.MARGIN * 2),
		"height": this.HALF_H
	});
	this.drawCircle({
		"fillColor": this.SKIN_COLOR,
		"startDegree": 180,
		"radius": this.HALF_W - this.MARGIN
	});
};

/**
 * Draw nose with a circle
 */
MOLE.DrawMoleHeadComponent.prototype.drawNose = function () {
	this.drawCircle({
		"y": this.THIRD_H * 2,
		"fillColor": this.NOSE_COLOR,
		"radius": this.QUARTER_W
	});	
};

/**
 * Function to draw the polygon, calling in .exec() function
 */
MOLE.DrawMoleHeadComponent.prototype.draw = function () {
	this.drawHairs();
	this.drawBody();
	this.drawNose();
};