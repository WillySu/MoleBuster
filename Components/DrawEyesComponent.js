if (!window.MOLE) { window.MOLE = {}; }

/**
 * @extends MOLE.DrawComponent
 * @classdesc
 * DrawEyesComponent class, draw a pair of eyes
 *
 * @class
 */
MOLE.DrawEyesComponent = function () {
	MOLE.DrawComponent.call(this);
	
	var xYRColorFactory = function (color) {
		return {
			x: null,
			y: null,
			r: null,
			color: color || null
		};
	};

	this.ID = "DRAW_EYES_COMPONENT";
	this.EYE_COLOR = "#c0c0c0";
	this.PUPIL_COLOR = "#220000";
	this.POSITION = {
		LEFT: "left",
		RIGHT: "right",
		BOTH: "both"
	};
	this.eyesHash = {};
	this.eyesHash[this.POSITION.LEFT] = xYRColorFactory(this.EYE_COLOR);
	this.eyesHash[this.POSITION.RIGHT] = xYRColorFactory(this.EYE_COLOR);
	this.PUPILS_DEFAULT_HASH = {};
	this.PUPILS_DEFAULT_HASH[this.POSITION.LEFT] = xYRColorFactory(this.PUPIL_COLOR);
	this.PUPILS_DEFAULT_HASH[this.POSITION.RIGHT] = xYRColorFactory(this.PUPIL_COLOR);
	this.pupilsHash = {};
	this.pupilsHash[this.POSITION.LEFT] = xYRColorFactory(this.PUPIL_COLOR);
	this.pupilsHash[this.POSITION.RIGHT] = xYRColorFactory(this.PUPIL_COLOR);
};

MOLE.DrawEyesComponent.prototype = Object.create(MOLE.DrawComponent.prototype);

/**
 * Initialize eyes hash
 * @param {Entity} entity
 */
MOLE.DrawEyesComponent.prototype.init = function (entity) {
	MOLE.DrawComponent.prototype.init.call(this, entity);
	this.eyesHash.left.r = this.eyesHash.right.r = this.QUARTER_W / 3;
	this.eyesHash.left.y = this.eyesHash.right.y = this.THIRD_H;
	this.PUPILS_DEFAULT_HASH.left.r = this.PUPILS_DEFAULT_HASH.right.r = this.pupilsHash.left.r = this.pupilsHash.right.r = this.QUARTER_W / 6;
	this.PUPILS_DEFAULT_HASH.left.y = this.PUPILS_DEFAULT_HASH.right.y = this.THIRD_H;
	this.pupilsHash.left.y = this.pupilsHash.right.y = this.THIRD_H;
	
	this.LINE_WIDTH = Math.round(this.width / 64);
	this.eyesHash.left.x = this.PUPILS_DEFAULT_HASH.left.x = this.pupilsHash.left.x = this.THIRD_W + this.MARGIN;
	this.eyesHash.right.x = this.PUPILS_DEFAULT_HASH.right.x = this.pupilsHash.right.x = this.width - this.THIRD_W - this.MARGIN;
	this.PUPILS_DEFAULT_HASH.left.r = this.eyesHash.left.r / 2;
	this.PUPILS_DEFAULT_HASH.right.r = this.eyesHash.right.r / 2;
};

/**
 * Draw one eye with a circle
 */
MOLE.DrawEyesComponent.prototype.drawOneEye = function (dataHash) {
	this.drawCircle({
		"x": dataHash.x,
		"y": dataHash.y,
		"fillColor": dataHash.color,
		"radius": dataHash.r
	});
};

/**
 * Draw left eye
 */
MOLE.DrawEyesComponent.prototype.drawLeftEye = function (eyeHash, pupilHash) {
	this.drawOneEye(eyeHash);
	this.drawOneEye(pupilHash);
};

/**
 * Draw right eye
 */
MOLE.DrawEyesComponent.prototype.drawRightEye = function (eyeHash, pupilHash) {
	this.drawOneEye(eyeHash);
	this.drawOneEye(pupilHash);
};

/**
 * Draw both eyes
 */
MOLE.DrawEyesComponent.prototype.drawEyes = function () {
	this.drawLeftEye(this.eyesHash.left, this.pupilsHash.left);
	this.drawRightEye(this.eyesHash.right, this.pupilsHash.right);
};

/**
 * Function to draw the polygon, calling in .exec() function
 */
MOLE.DrawEyesComponent.prototype.draw = function () {
	this.drawEyes();
};