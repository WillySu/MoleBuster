if (!window.MOLE) { window.MOLE = {}; }

/** 
 * @extends MOLE.Entity
 * @classdesc
 * Entity class with functions to add component, remove component and to update entity itself
 *
 * @class
 * @param {String} ID Entity's unique ID
 * @property {DOM_Attribute} ctx
 */
MOLE.CanvasEntity = function (id) {
	MOLE.Entity.call(this, id);
	this.canvas = null;
	this.ctx = null;
};

MOLE.CanvasEntity.prototype = Object.create(MOLE.Entity.prototype);

/**
 * @param {Hash} opts Optional parameters
 * @param {DOM_Object} opts.canvas
 */
MOLE.CanvasEntity.prototype.setVars = function (opts) {
	MOLE.Entity.prototype.setVars.call(this, opts);
	if (typeof opts.canvas == "string") {
		this.canvas = document.getElementById(opts.canvas);
	} else if (opts.canvas && typeof opts.canvas == "object" && opts.canvas.tagName == "CANVAS") {
		this.canvas = opts.canvas;
	}
	if (!this.canvas) {
		this.canvas = document.createElement("canvas");
	}
	this.canvas.width = this.width;
	this.canvas.height = this.height;	
	this.ctx = this.canvas.getContext("2d");
};

/**
 * Function to set all components needed for the entity, to be overwritten.
 */
MOLE.CanvasEntity.prototype.setComponents = function () {
	this.addComponent(new MOLE.DrawComponent());
};