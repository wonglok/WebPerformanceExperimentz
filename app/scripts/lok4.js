/*global mat4*/
'use strict';
(function(){
	var dom = window.document.querySelectorAll('.target')[0],
		domMatrix = dom.matrix = mat4.create(),
		incrementVal = 0;

	function getMatrix3dString (m){
		return 'matrix3d('  +
		m[0 ] + ',' + m[1 ] + ',' + m[2 ] + ',' + m[3 ] + ',' +
		m[4 ] + ',' + m[5 ] + ',' + m[6 ] + ',' + m[7 ] + ',' +
		m[8 ] + ',' + m[9 ] + ',' + m[10] + ',' + m[11] + ',' +
		m[12] + ',' + m[13] + ',' + m[14] + ',' + m[15] +
		')' ;
	}

	function render(){
		mat4.identity(domMatrix);
		mat4.rotateY(domMatrix,domMatrix, incrementVal * 1 * Math.PI / 180);
		incrementVal += 0.5;

		dom.style['-webkit-transform'] = getMatrix3dString(domMatrix);
	}

	// setInterval(function(){
	// 	window.requestAnimationFrame(render);
	// },1000/60);

	function heartBeat(){
		window.requestAnimationFrame(heartBeat);
		render();
	}
	heartBeat();

	// var app = angular.module('lok', []);
	// app.config(function(){
	// 	console.log('config');
	// });
	// app.run(function(){
	// 	console.log('run');
	// });

	// app.controller('magazineCtrl', ['$scope', function($scope){
	// 	$scope.mustache = 'asd';
	// }]);

}());
