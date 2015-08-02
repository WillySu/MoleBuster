if (!window.MOLE) { window.MOLE = {}; }

/**
 * @extends MOLE.CanvasEntity
 * @extends TWO.MoleComponent
 * @classdesc
 * MoleEntity class with DrawMoleComponent<br/>
 * Tutorial 1: {@tutorial moleEntity1}<br/>
 * Tutorial 2: {@tutorial moleEntity2}<br/>
 * Tutorial 3: {@tutorial moleEntity3}<br/>
 * Tutorial 4: {@tutorial moleEntity4}<br/>
 * Tutorial 5: {@tutorial moleEntity5}<br/>
 * Tutorial 6: {@tutorial moleEntity6}<br/>
 *
 * @class
 * @property {MoleComponent} eyesCtrl
 * @property {MoleComponent} mouseMoveCtrl
 * @property {Boolean} [enableMouseMoveEyesTrack=false]
 */
MOLE.MoleEntity = function (id) {
	MOLE.CanvasEntity.call(this, id);
	this.eyesCtrl = null;
	this.mouseMoveCtrl = null;
	this.enableMouseMoveEyesTrack = false;
};

MOLE.MoleEntity.prototype = Object.create(MOLE.CanvasEntity.prototype);

/**
 * Add DrawMoleComponent
 */
MOLE.MoleEntity.prototype.setComponents = function () {
	this.addComponent(new MOLE.DrawMoleHeadComponent());
	
	this.eyesCtrl = new MOLE.MoveEyesComponent();
	this.addComponent(this.eyesCtrl);
	
	this.mouseMoveCtrl = new MOLE.MouseMoveEventComponent();
	this.addComponent(this.mouseMoveCtrl);
	this.mouseMoveCtrl.bindEvent(function (mouseHash) {
		this.mouseMove(mouseHash.horizontal, mouseHash.vertical);
	}.bind(this));
};

/**
 * @param {String} horizontal
 * @param {String} vertical
 * @param {Boolean} silence
 */
MOLE.MoleEntity.prototype.moveLeftEye = function (horizontal, vertical, silence) {
	this.eyesCtrl.updateLeftPupil(horizontal, vertical);
	if (!silence)
		this.update();
};

/**
 * @param {String} horizontal
 * @param {String} vertical
 * @param {Boolean} silence
 */
MOLE.MoleEntity.prototype.moveRightEye = function (horizontal, vertical, silence) {
	this.eyesCtrl.updateRightPupil(horizontal, vertical);
	if (!silence)
		this.update();
};

/**
 * @param {String} horizontal
 * @param {String} vertical
 * @param {Boolean} silence
 */
MOLE.MoleEntity.prototype.moveEyes = function (horizontal, vertical, silence) {
	this.eyesCtrl.updateLeftPupil(horizontal, vertical, true);
	this.eyesCtrl.updateRightPupil(horizontal, vertical, true);
	if (!silence)
		this.update();
};

MOLE.MoleEntity.prototype.mouseMove = function (horizontal, vertical) {
	if (this.enableMouseMoveEyesTrack) {
		this.moveEyes(horizontal, vertical);
	}
};