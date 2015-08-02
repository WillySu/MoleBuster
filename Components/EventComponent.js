if (!window.MOLE) { window.MOLE = {}; }
/**
 * @extends MOLE.Component
 * @classdesc
 * Event component
 *
 * @class
 * @property {String} [eventType="global"] can be "global" or "partial"
 * @property {String} [eventName="click"]
 * @property {Function} [eventCallback]
 */
 
MOLE.EventComponent = function () {
	MOLE.Component.call(this);
	this.ID = "EVENT_COMPONENT";
	this.EVENT_TYPE = {
		GLOBAL: "global",
		PARTIAL: "partial"
	};
	this.eventType = this.EVENT_TYPE.PARTIAL;
	this.eventName = "click";
	this.eventCallback = null;
};

MOLE.EventComponent.prototype = Object.create(MOLE.Component.prototype);

/**
 * Initialize 
 * @param {Entity} entity
 * @param {Function} callback
 */
MOLE.EventComponent.prototype.init = function (entity, callback) {
	MOLE.Component.prototype.init.call(this, entity);
	this.bindEvent(callback);
};

/**
 * @param {Function} callback
 */
MOLE.EventComponent.prototype.bindEvent = function (callback) {
	if (this.eventName && typeof callback == "function") {
		this.eventCallback = callback;
		if (this.eventType == this.EVENT_TYPE.PARTIAL) {
			this.addCanvasEvent(callback);
		} else if (this.eventType == this.EVENT_TYPE.GLOBAL) {
			this.addWindowEvent(callback);
		}
	}
};

/**
 * @param {Function} callback
 */
MOLE.EventComponent.prototype.addCanvasEvent = function (callback) {
	if (typeof callback == "function") {
		this.entity.canvas.addEventListener(this.eventName, callback);
	}
};

/**
 * @param {Function} callback
 */
MOLE.EventComponent.prototype.addWindowEvent = function (callback) {
	if (typeof callback == "function") {
		window.addEventListener(this.eventName, callback);
	}
};

/**
 * Remove event
 */
MOLE.EventComponent.prototype.removeEvent = function () {
	if (this.eventType == this.EVENT_TYPE.PARTIAL) {
		this.entity.canvas.removeEventListener(this.eventName, this.eventCallback);
	} else if (this.eventType == this.EVENT_TYPE.GLOBAL) {
		window.removeEventListener(this.eventName, this.eventCallback);
	}
};