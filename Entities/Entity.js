if (!window.MOLE) { window.MOLE = {}; }

/** @classdesc
 * Entity class with functions to add component, remove component and to update entity itself
 *
 * @class
 * @param {String} ID Entity's unique ID
 * @param {Hash} opts Optional parameters
 * @property {Number} x
 * @property {Number} y
 * @property {Number} [width=100]
 * @property {Number} [height=100]
 */
MOLE.Entity = function (id) {
	this.ID = id || "NO_NAME";
	this.x = null;
	this.y = null;
	this.width = 100;
	this.height = 100;
	this.componentAry = [];
	this.cAry = this.componentAry; //alias for this.componentAry
};

/**
 * @param {Hash} opts Optional parameters
 * @return {Entity}
 */
MOLE.Entity.prototype.init = function (opts) {
	if (!opts) { opts = {}; }
	this.setVars(opts);
	this.setComponents();
	return this;
};

/**
 * @param {Hash} opts Optional parameters
 * @param {Number} opts.x
 * @param {Number} opts.y
 * @param {Number} opts.width
 * @param {Number} opts.height
 */
MOLE.Entity.prototype.setVars = function (opts) {
	this.x = opts.x || 0;
	this.y = opts.y || 0;
	this.width = opts.width || 256;
	this.height = opts.height || 256;
};

/**
 * Function to be overwritten in the child-class to set components
 */
MOLE.Entity.prototype.setComponents = function () {
	//to be overwritten
};

/**
 * Function to be overwritten in the child-class to set components
 * @param {Component} c
 * @return {Boolean}
 */
MOLE.Entity.prototype.isValidC = function (c) {
	return (c && typeof c == "object" && c.ID) ? true : false;
};

/**
 * Find component by index
 * @param {Component} c
 * @return {Number} index
 */
MOLE.Entity.prototype.indexOf = function (c) {
	var mapID = function (obj) {
		return obj.ID;
	};
	if (this.isValidC(c)) {
		return this.cAry.map(mapID).indexOf(c.ID);
	} else {
		return -1;
	}
};

/**
 * Find if component exist already
 * @param {Component} c
 * @return {Boolean}
 */
MOLE.Entity.prototype.exists = function (c) {
	return (this.indexOf(c) > -1) ? true : false;
};

/**
 * @param {Component} c Component to add
 * @return {Array|false} return .componentAry on success or false on fail
 */
MOLE.Entity.prototype.addComponent = function (c) {
	if (this.isValidC(c)) {
		if (this.exists(c)) {
			console.warn("Component " + c.toString() + " exists already!");
		} else {
			if (typeof c.init == "function") {
				c.init(this);
			}
			this.cAry.push(c);
			return this.cAry;
		}
	} else {
		console.warn("Component or Component ID Not Found.");
	}
	return null;
};

/**
 * @param {Component} c Component to remove
 * @return {Component|false} return component removed on success or false on fail
 */
MOLE.Entity.prototype.removeComponent = function (c) {
	var index;
	if (this.isValidC(c)) {
		index = this.indexOf(c);
		if (index > -1) {
			this.cAry.splice(index, 1);
			return this.cAry;
		} else {
			console.warn("Component " + c.toString() + " not found!");
		}
	} else {
		console.warn("Component ID not found!");
	}
	return false;
};

/**
 * Loop and execute each component
 * @return {Entity}
 */
MOLE.Entity.prototype.update = function () {
	var i, l, c;
	for (i=0, l=this.cAry.length; i<l; i++) {
		c = this.cAry[i];
		if (typeof c.exec == "function") {
			c.exec();
		} else {
			console.warn("Unable to execute Component " + c.toString());
		}
	}
	return this;
};