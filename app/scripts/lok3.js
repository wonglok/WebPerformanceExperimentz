/*global $M*/
'use strict';
(function(){


	var dom = window.document.querySelectorAll('.target')[0];
	function getMatrix3dString (data){
		var m = data.m;
		var s = '';
		if (!!!data.m){
			return '';
		}
		m.forEach(function(val,key,arr){
			arr[key] = val.toFixed(20)
		});

		s = s = 'matrix3d(';
		s += m[0]  + ',' + m[1]  + ',' + m[2]  + ',' + m[3]  + ',';
		s += m[4]  + ',' + m[5]  + ',' + m[6]  + ',' + m[7]  + ',';
		s += m[8]  + ',' + m[9]  + ',' + m[10] + ',' + m[11] + ',';
		s += m[12] + ',' + m[13] + ',' + m[14] + ',' + m[15] ;
		s += ')';

		return s;
	}


	var rotateX = 0;
	function render(){
		rotateX += 0.5;

		dom.style['-webkit-transform'] = getMatrix3dString(
			{
				m : [
					1,0,0,0,
					0,1,0,0,
					0,0,1,0,
					0,0,0,1
				]
			}
		);


	}


	function heart(){
		window.requestAnimationFrame(heart);
		render();
	}
	heart();

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
