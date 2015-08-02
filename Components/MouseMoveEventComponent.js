if (!window.MOLE) { window.MOLE = {}; }
/**
 * @extends MOLE.EventComponent
 * @classdesc
 * Mouse Event component
 *
 * @class
 * @property {Number} [mouseX=0]
 * @property {Number} [mouseY=0]
 */
 
MOLE.MouseMoveEventComponent = function () {
	MOLE.EventComponent.call(this);
	this.ID = "MOUSE_EVENT_COMPONENT";
	this.mouseX = 0;
	this.mouseY = 0;
	
	//over-write parent's attributes
	this.eventType = this.EVENT_TYPE.GLOBAL;
	this.eventName = "mousemove";
};

MOLE.MouseMoveEventComponent.prototype = Object.create(MOLE.EventComponent.prototype);

/**
 * Over-write parent's function
 * @param {Function} callback
 */
MOLE.EventComponent.prototype.addWindowEvent = function (callback) {
	var getCallbackFunc;
	if (typeof callback == "function") {
		getCallbackFunc = function (canvas) {
			return function (e) {
				var x = e.clientX || e.detail.clientX || 0,
						y = e.clientY || e.detail.clientY || 0,
						top = canvas.offsetTop,
						left = canvas.offsetLeft,
						bottom = top + canvas.offsetHeight,
						right = left + canvas.offsetWidth,
						horizontal = "center",
						vertical = "middle";

				if (x < left)
					horizontal = "left";
				else if (x > right)
					horizontal = "right";

				if (y < top)
					vertical = "top";
				else if (y > bottom)
					vertical = "bottom";

				if (e && typeof e == "object") {
					callback({
						x: x,
						y: y,
						horizontal: horizontal,
						vertical: vertical
					});
				}
			};
		};
		this.eventCallback = getCallbackFunc(this.entity.canvas);
		window.addEventListener(this.eventName, this.eventCallback);
	}
};