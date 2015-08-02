if (!window.MOLE) { window.MOLE = {}; }

/**
 * @extends MOLE.DrawEyesComponent
 * @classdesc
 * MoveEyesComponent class, DrawEyesComponent with eyes movement
 *
 * @class
 */
MOLE.MoveEyesComponent = function () {
	MOLE.DrawEyesComponent.call(this);
	this.ID = "MOVE_EYES_COMPONENT";
	this.EYE_STATUS = {
		EYE_OPEN: "EYE_OPEN",
		EYE_CLOSE: "EYE_CLOSE",
		EYE_PAIN: "EYE_PAIN"
	};
	this.PUPIL_STATUS = {
		HORIZONTAL: {
			CENTER: "center",
			LEFT: "left",
			RIGHT: "right"
		},
		VERTICAL: {
			BOTTOM: "bottom",
			MIDDLE: "middle",
			TOP: "top"
		},
	};
	this.leftEyeStatus = this.EYE_STATUS.EYE_OPEN;
	this.rightEyeStatus = this.EYE_STATUS.EYE_OPEN;
	this.leftPupilStatus = {
		horizontal: this.PUPIL_STATUS.HORIZONTAL.CENTER,
		vertical: this.PUPIL_STATUS.VERTICAL.MIDDLE
	};
	this.rightPupilStatus = this.EYE_STATUS.EYE_OPEN = {
		horizontal: this.PUPIL_STATUS.HORIZONTAL.CENTER,
		vertical: this.PUPIL_STATUS.VERTICAL.MIDDLE
	};
	this.halfPupilRadius = {};
	this.halfPupilRadius[this.POSITION.LEFT] = null;
	this.halfPupilRadius[this.POSITION.RIGHT] = null;
	this.halfPupilHypotenuse = {};
	this.halfPupilHypotenuse[this.POSITION.LEFT] = null;
	this.halfPupilHypotenuse[this.POSITION.RIGHT] = null;
};

MOLE.MoveEyesComponent.prototype = Object.create(MOLE.DrawEyesComponent.prototype);

/**
 * Initialize pupil half radius and half pupil hypotenuse
 * @param {Entity} entity
 */
MOLE.MoveEyesComponent.prototype.init = function (entity) {
	MOLE.DrawEyesComponent.prototype.init.call(this, entity);
	this.halfPupilRadius.left = this.PUPILS_DEFAULT_HASH.left.r / 2;
	this.halfPupilRadius.right = this.PUPILS_DEFAULT_HASH.right.r / 2;
	this.halfPupilHypotenuse.left = Math.sqrt(Math.pow(this.halfPupilRadius.left, 2) * 2);
	this.halfPupilHypotenuse.right = Math.sqrt(Math.pow(this.halfPupilRadius.right, 2) * 2);
};

/**
 * @param {Boolean} otherField
 * @param {String} whichPupil
 */
MOLE.MoveEyesComponent.prototype.getPupilAdjustVal = function (otherField, whichPupil) {
	if (!whichPupil) {
		whichPupil = this.POSITION.LEFT;
	}
	if (!otherField || otherField == this.PUPIL_STATUS.HORIZONTAL.CENTER || otherField == this.PUPIL_STATUS.VERTICAL.MIDDLE) {
		return this.halfPupilHypotenuse[whichPupil];
	} else {
		return this.halfPupilRadius[whichPupil];
	}
};

/**
 * @param {String} horizontal
 * @param {String} vertical
 * @param {String} whichPupil
 */
MOLE.MoveEyesComponent.prototype.getPupilHorizontalAdjust = function (horizontal, vertical, whichPupil) {
	var adjustVal = this.getPupilAdjustVal(vertical, whichPupil);
	if (horizontal == this.PUPIL_STATUS.HORIZONTAL.LEFT) {
		return -adjustVal;
	} else if (horizontal == this.PUPIL_STATUS.HORIZONTAL.RIGHT) {
		return adjustVal;
	} else {
		return 0;
	}
};

/**
 * @param {String} vertical
 * @param {String} horizontal
 * @param {String} whichPupil
 */
MOLE.MoveEyesComponent.prototype.getPupilVerticalAdjust = function (horizontal, vertical, whichPupil) {	
	var adjustVal = this.getPupilAdjustVal(horizontal, whichPupil);
	if (vertical == this.PUPIL_STATUS.VERTICAL.TOP) {
		return -adjustVal;
	} else if (vertical == this.PUPIL_STATUS.VERTICAL.BOTTOM) {
		return adjustVal;
	} else {
		return 0;
	}
};

/**
 * @param {String} horizontal
 * @param {String} vertical
 * @param {String} whichPupil
 */
MOLE.MoveEyesComponent.prototype.updatePupilsHash = function (horizontal, vertical, whichPupil) {
	this.pupilsHash[whichPupil].x = this.PUPILS_DEFAULT_HASH[whichPupil].x + this.getPupilHorizontalAdjust(horizontal, vertical, whichPupil);
	this.pupilsHash[whichPupil].y = this.PUPILS_DEFAULT_HASH[whichPupil].y + this.getPupilVerticalAdjust(horizontal, vertical, whichPupil);
};

/**
 * @param {String} horizontal
 * @param {String} vertical
 * @param {String} whichPupil
 */
MOLE.MoveEyesComponent.prototype.updatePupil = function (horizontal, vertical, whichPupil) {
	if (whichPupil == this.POSITION.BOTH) {
		this.updatePupilsHash(horizontal, vertical, this.POSITION.LEFT);
		this.updatePupilsHash(horizontal, vertical, this.POSITION.RIGHT);
	} else {
		this.updatePupilsHash(horizontal, vertical, whichPupil);
	}
	this.draw();
	return this;
};

/**
 * @param {String} horizontal
 * @param {String} vertical
 */
MOLE.MoveEyesComponent.prototype.updateLeftPupil = function (horizontal, vertical) {
	return this.updatePupil(horizontal, vertical, this.POSITION.LEFT);
};

/**
 * @param {String} horizontal
 * @param {String} vertical
 */
MOLE.MoveEyesComponent.prototype.updateRightPupil = function (horizontal, vertical) {
	return this.updatePupil(horizontal, vertical, this.POSITION.RIGHT);
};

/**
 * @param {String} horizontal
 * @param {String} vertical
 */
MOLE.MoveEyesComponent.prototype.updatePupils = function (horizontal, vertical) {
	return this.updatePupil(horizontal, vertical, this.POSITION.BOTH);
};
