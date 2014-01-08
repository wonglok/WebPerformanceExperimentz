/*================================================
LOK's herp derp touch driven 3d js animation experiment
~Native WebkitCSSMatrix jsObject~
~ Custom 3D animation @o@ ~

Inspired from 9element's matrix3d tutorial ft. sylvester matrix lib
Copyright (c) 2014 wonglok
Licensed under the MIT license.
=================================================*/
'use strict';
(function() {

	/*=====================================
	Variables
	=====================================*/
	var dom = window.document.querySelectorAll('.target')[0],

		matrixTemplate = new window['WebKitCSSMatrix'](),
		domWebKit3dMatrix = new window['WebKitCSSMatrix'](),
		eventBasedDeltaUpdaterCallback,

		effectStateFactory = function(){
			return {
				r: {
					x: 0,
					y: 0,
					z: 0
				},
				t: {
					x: 0,
					y: 0,
					z: 0
				},
				s: {
					x: 1,
					y: 1,
					z: 1
				}
			};
		},
		effectState = effectStateFactory();

	/*=====================================
	Update the effect state upon interval or events (touchmove)
	=====================================*/
	function updateDeltaUponEvent(event) {
		event.preventDefault();
		var delta = effectStateFactory();


		// delta.r.x =	-1.6;
		// delta.r.y =	-1;
		// delta.r.z =	-1.6;

		// delta.t.x =	-0.2;
		// delta.t.y =	-0.2;
		// delta.t.z =	-0.2;

		// delta.s.x =	1-0.0007;
		// delta.s.y =	1-0.0007;
		// delta.s.z =	1-0.0007;

		//applyDelta
		eventBasedDeltaUpdaterCallback = function(){
			applyDeltaToEffectState(delta);
		};

	}

	function updateDeltaRegularly() {
		var delta = effectStateFactory();

		delta.r.x =	0.02;
		delta.r.y =	0.02;
		delta.r.z =	0.02;

		// delta.t.x =	-0.3;
		// delta.t.y =	-0.3;
		// delta.t.z =	-0.3;

		// delta.s.x =	1+0.0006;
		// delta.s.y =	1+0.0006;
		// delta.s.z =	1+0.0000;

		//applyDelta
		applyDeltaToEffectState(delta);
	}

	function applyDeltaToEffectState(delta){
		if (!!!delta){
			return;
		}

		//apply the delta
		effectState.r.x +=	delta.r.x;
		effectState.r.y +=	delta.r.y;
		effectState.r.z +=	delta.r.z;

		effectState.t.x +=	delta.t.x;
		effectState.t.y +=	delta.t.y;
		effectState.t.z +=	delta.t.z;

		effectState.s.x *=	delta.s.x;
		effectState.s.y *=	delta.s.y;
		effectState.s.z *=	delta.s.z;

		// requestAnimationFrame(function(){
		// 	if (Math.random() <= 0.15){
		// 		// console.table(effectState);
		// 	}
		// });
	}

	/*=====================================
	Generate WebKitCSSMatrix String
	=====================================*/
	function getMatrix3dCSS(matrix){
		return getMatrix3dCSSManually(matrix);
	}

	//enforced version
	function getMatrix3dCSSManually(m) {
		//tries to limit the floating point
		// _.each(m,function(val,key){
		//  m[key] = m[key].toFixed(20);
		// });
		return 'matrix3d(' +
			m.m11+ ',' + m.m12+ ',' + m.m13+ ',' + m.m14+ ',' +
			m.m21+ ',' + m.m22+ ',' + m.m23+ ',' + m.m24+ ',' +
			m.m31+ ',' + m.m32+ ',' + m.m33+ ',' + m.m34+ ',' +
			m.m41+ ',' + m.m42+ ',' + m.m43+ ',' + m.m44+
		')';
	}

	//native version
	function getMatrix3dCSSNatively(webkitMatrix) {
		//sometimes it returns 2dmatrix
		//does not enable layer promotion;
		//eg. rotateZ does not enable this

		//for translateX,Y, it would give the integer value instead of floating point value.
		//bad 'stair step' animation experience.
		return webkitMatrix.toString();
	}



	/*  ============================================================
	Update the Matrix different status
	============================================================  */
	function updateMatrix() {
		//reuse the template
		var currentMatrix3d = matrixTemplate;


		var r = effectState.r,
			t = effectState.t,
			s = effectState.s
		;

		// *v*
		domWebKit3dMatrix = currentMatrix3d
								.rotate(
									r.x,
									r.y,
									r.z
								)
								.translate(
									t.x,
									t.y,
									t.z
								)
								.scale(
									s.x,
									s.y,
									s.z
								);
	}

	/*  ============================================================
	Apply the css string to the dom
	============================================================  */
	function updateDom() {
		var result = getMatrix3dCSS(domWebKit3dMatrix);
		dom.style['-webkit-transform'] = result;
	}


	/*  ============================================================
	Rednerinnnnnng
	============================================================  */
	function render() {
		updateMatrix();
		updateDom();
	}

	function animateLoop() {
		render();
		window.requestAnimationFrame(animateLoop);
	}


	/*=====================================
	Event Emitterrrz
	=====================================*/
	function setupEventsListers(){
		//for production, both need to coded with an adapter.

		window.addEventListener('touchmove', updateDeltaUponEvent, false);

		window.addEventListener('mousemove', updateDeltaUponEvent, false);
	}

	function setupRegularUpdaters(){
		setInterval(function(){
			if (eventBasedDeltaUpdaterCallback){
				eventBasedDeltaUpdaterCallback();
				eventBasedDeltaUpdaterCallback = null;
			}
			updateDeltaRegularly();
		},1000/120);
	}

	/*=====================================
	Engine *Start*
	=====================================*/
	function init() {
		setupEventsListers();
		setupRegularUpdaters();
		animateLoop();
	}

	window.addEventListener('DOMContentLoaded', function() {
		window.requestAnimationFrame(init);
	}, false);






}());
























