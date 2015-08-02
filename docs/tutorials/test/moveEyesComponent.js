describe("MoveEyesComponent", function() {
	var testEntity = new MOLE.CanvasEntity().init({ width: 100, height: 100 }),
			runCalculateHypotenuseTest = function (desc, whichPupil) {
				it(desc, function () {
					var halfRadius = component.halfPupilRadius[whichPupil],
							halfHypo = component.halfPupilHypotenuse[whichPupil],
							radius = halfRadius * 2;
							hypotenuse = halfHypo * 2;
							
					expect(hypotenuse).toEqual(Math.sqrt(Math.pow(radius, 2) * 2));
				});
			},
			runPupilPositionTest = function (desc, expectH, expectV, whichPupil) {
				it(desc, function () {
					var halfRadius = component.halfPupilRadius[whichPupil],
							halfHypo = component.halfPupilHypotenuse[whichPupil],
							posHash = {
								left: {
									top: { x: -halfRadius, y: -halfRadius },
									middle: { x: -halfHypo, y: 0 },
									bottom: { x: -halfRadius, y: halfRadius }
								},
								right: {
									top: { x: halfRadius, y: -halfRadius },
									middle: { x: halfHypo, y: 0 },
									bottom: { x: halfRadius, y: halfRadius }
								},
								center: {
									top: { x: 0, y: -halfHypo },
									middle: { x: 0, y: 0 },
									bottom: { x: 0, y: halfHypo }
								}
							},
							curX, curY, defaultX, defaultY, posXY;
					component.updatePupil(expectH, expectV, whichPupil);
					curX = component.pupilsHash[whichPupil].x;
					curY = component.pupilsHash[whichPupil].y;
					defaultX = component.PUPILS_DEFAULT_HASH[whichPupil].x;
					defaultY = component.PUPILS_DEFAULT_HASH[whichPupil].y;
					posXY = posHash[expectH][expectV];
					expect(curX).toEqual(defaultX + posXY.x);
					expect(curY).toEqual(defaultY + posXY.y);
				});
			},
			component;

	beforeEach(function() {
		component = new MOLE.MoveEyesComponent();
		component.init(testEntity);
	});
	
	runCalculateHypotenuseTest("Test the value of the left pupil hypotenuse", "left");
	runCalculateHypotenuseTest("Test the value of the right pupil hypotenuse", "right");
	runPupilPositionTest("Move left pupil to left top", "left", "top", "left");
	runPupilPositionTest("Move left pupil to left middle", "left", "middle", "left");
	runPupilPositionTest("Move left pupil to left bottom", "left", "bottom", "left");
	runPupilPositionTest("Move right pupil to left top", "left", "top", "right");
	runPupilPositionTest("Move right pupil to left middle", "left", "middle", "right");
	runPupilPositionTest("Move right pupil to left bottom", "left", "bottom", "right");
});