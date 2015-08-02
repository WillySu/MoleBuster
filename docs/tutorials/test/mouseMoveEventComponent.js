describe("MouseMoveEventComponent", function() {
	var testEntity = {
				canvas: {
					offsetTop: 100,
					offsetLeft: 100,
					offsetHeight: 100,
					offsetWidth: 100,
				}
			},
			runTest = function (desc, mouseX, mouseY, expectH, expectV) {
				it(desc, function () {
					event = new CustomEvent("mousemove", {
						detail: {
							clientX: mouseX,
							clientY: mouseY
						}
					});
					component.addWindowEvent(function(e) {
						expect(e.horizontal).toEqual(expectH);
						expect(e.vertical).toEqual(expectV);
					});
					window.dispatchEvent(event);
					component.removeEvent();
				});
			},
			component, event;

	beforeEach(function() {
		component = new MOLE.MouseMoveEventComponent();
		component.init(testEntity);
	});

	runTest("Mouse cursor in left top", 0, 0, "left", "top");
	runTest("Mouse cursor in center top", 150, 0, "center", "top");
	runTest("Mouse cursor in right top", 300, 0, "right", "top");
	runTest("Mouse cursor in left middle", 0, 150, "left", "middle");
	runTest("Mouse cursor in center middle", 150, 150, "center", "middle");
	runTest("Mouse cursor in right middle", 300, 150, "right", "middle");
	runTest("Mouse cursor in left bottom", 0, 300, "left", "bottom");
	runTest("Mouse cursor in center bottom", 150, 300, "center", "bottom");
	runTest("Mouse cursor in right bottom", 300, 300, "right", "bottom");
});