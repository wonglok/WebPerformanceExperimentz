/*================================================
lok's herp derp touch based 3d animation experiment
Tries to utilize native WebkitCSSMatrix object to do custom 3d animation @v@

Inspired from 9element's matrix3d tutorial ft. sylvester matrix lib
Copyright (c) 2014 wonglok
Licensed under the MIT license.
=================================================*/
'use strict';
(function() {


	//Declare variable.
	var dom,
		domMatrix,
		matrixTemplate,
		//regularly updated value
		ruvRotateZ,

		//event based updated value
		euvRotateX;

	function setupVariables(){
		dom = window.document.querySelectorAll('.target')[0];
		dom.matrix3d = new window.WebKitCSSMatrix();

		matrixTemplate = new window.WebKitCSSMatrix();

		ruvRotateZ = 0;
		euvRotateX = 0;
	}

	function setupEventsListers(){
		window.addEventListener('touchmove', updateStatusOnScroll, false);
	}

	function getWebKitMatrix3dString(m) {
		//tries to limit the floating point
		// _.each(m,function(val,key){
		//  m[key] = m[key].toFixed(6);
		// });
		return 'matrix3d(' +
			m.m11 + ',' + m.m12 + ',' + m.m13 + ',' + m.m14 + ',' +
			m.m21 + ',' + m.m22 + ',' + m.m23 + ',' + m.m24 + ',' +
			m.m31 + ',' + m.m32 + ',' + m.m33 + ',' + m.m34 + ',' +
			m.m41 + ',' + m.m42 + ',' + m.m43 + ',' + m.m44 +
		')';
	}

	function getWebKitMatrix3dStringNative(webkitMatrix) {
		//sometimes it returns 2dmatrix
		//thus does not enable layer promotion;
		//eg. rotateZ does not enable this

		//for translateX,Y, it would give the integer value instead of floating point value.
		//bad 'stair step' animation experience.
		return webkitMatrix.toString();
	}

	function updateStatusOnScroll(event) {
		event.preventDefault();
		console.log(event);
	//	window.requestAnimationFrame(render);

		euvRotateX += 1;
		console.log(euvRotateX);
	}

	function updateStatusRegularly() {
		ruvRotateZ += 1;
	}

	function queueMatrixModifications(currentMatrix){

		return currentMatrix;
	}

	function digestMatrixModifications(currentMatrix) {

		return currentMatrix;
	}

	function updateMatrix() {
		//reset to original status
		var currentMatrix = matrixTemplate;

		//
		var curRotateZ = ruvRotateZ;
		var curRotateX = euvRotateX;

		//modify with new status value
		currentMatrix = currentMatrix.translate(0, 0, 0);
		currentMatrix = currentMatrix.rotate(0, 0, curRotateZ);
		currentMatrix = currentMatrix.rotate(curRotateX, 0, 0);

		dom.matrix3d = currentMatrix;
	}

	function updateDom() {
		dom.style['-webkit-transform'] = getWebKitMatrix3dString(dom.matrix3d);
	}

	function render() {
		updateStatusRegularly();
		updateMatrix();
		updateDom();
	}

	function animateLoop() {
		render();
		window.requestAnimationFrame(animateLoop);
	}


	/*=====================================
	Engine *Start*
	=====================================*/
	function init() {
		setupVariables();
		setupEventsListers();
		animateLoop();
	}

	window.addEventListener('DOMContentLoaded', function() {
		init();
	}, false);



}());
























