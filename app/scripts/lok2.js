/*global $M*/
'use strict';
(function() {

    function getDefaultMatrix() {
        var m = [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ];
        return m;
    }

    function matrixFactory() {
        var defaultItem = $M(getDefaultMatrix());
        return defaultItem;
    }

    var dom = window.document.querySelectorAll('.target')[0];
    var transformationMatrix = matrixFactory(),
        rotationXMatrix = matrixFactory(),
        deg2rad = Math.PI / 180;


    var rotateX = 0;
    var s = "";

    function render() {

        transformationMatrix.setElements(getDefaultMatrix());
        rotationXMatrix.setElements([
            [1, 0, 0, 0],
            [0, Math.cos(rotateX * deg2rad), Math.sin(-rotateX * deg2rad), 0],
            [0, Math.sin(rotateX * deg2rad), Math.cos(rotateX * deg2rad), 0],
            [0, 0, 0, 1]
        ]);

        rotateX -= 0.5;

        transformationMatrix =
            transformationMatrix
            .multiply(rotationXMatrix)
        // .multiply(rotationYMatrix)
        // .multiply(rotationZMatrix)
        // .multiply(scaleMatrix)
        // .multiply(translationMatrix)
        // ;

        s = "matrix3d(";
        s += transformationMatrix.e(1, 1).toFixed(20) + "," + transformationMatrix.e(1, 2).toFixed(20) + "," + transformationMatrix.e(1, 3).toFixed(20) + "," + transformationMatrix.e(1, 4).toFixed(20) + ",";
        s += transformationMatrix.e(2, 1).toFixed(20) + "," + transformationMatrix.e(2, 2).toFixed(20) + "," + transformationMatrix.e(2, 3).toFixed(20) + "," + transformationMatrix.e(2, 4).toFixed(20) + ",";
        s += transformationMatrix.e(3, 1).toFixed(20) + "," + transformationMatrix.e(3, 2).toFixed(20) + "," + transformationMatrix.e(3, 3).toFixed(20) + "," + transformationMatrix.e(3, 4).toFixed(20) + ",";
        s += transformationMatrix.e(4, 1).toFixed(20) + "," + transformationMatrix.e(4, 2).toFixed(20) + "," + transformationMatrix.e(4, 3).toFixed(20) + "," + transformationMatrix.e(4, 4).toFixed(20);
        s += ")";
        dom.style['-webkit-transform'] = s;

        s = "";
    }


    function heart() {
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