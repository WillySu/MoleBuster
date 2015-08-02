if (!window.MOLE) { window.MOLE = {}; }

/**
 * @classdesc
 * Base Component class
 *
 * @class
 * @property {String} [ID="BASE_COMPONENT"]
 * @property {Entity} entity
 * @property {Number} [width=100]
 * @property {Number} [height=100]
 */
MOLE.Component = function () {
	this.ID = "BASE_COMPONENT";
	this.entity = null;
	this.width = 100;
	this.height = 100;
};

/**
 * Initialize the component with entity's width and height
 * @param {Entity} entity
 */
MOLE.Component.prototype.init = function (entity) {
	this.entity = entity;
	this.width = entity.width;
	this.height = entity.height;
};

/**
 * Interface function to execute the component
 */
MOLE.Component.prototype.exec = function () {
	//be overwritten
};

/**
 * Getter of Component's ID
 * @return {STRING} Component's ID
 */
MOLE.Component.prototype.getID = function () {
	return this.ID;
};

/**
 * Output Component's ID, usually use for debug
* @return {STRING} Component's ID
 */
MOLE.Component.prototype.toString = function () {
	return this.getID;
};