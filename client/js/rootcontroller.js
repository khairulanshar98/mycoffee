$app.controller('rootController', ['$scope', '$resource','$location', '$timeout','ngProgressFactory',function ($scope, $resource,$location,$timeout) {
$location.path("/");
$timeout(function(){$location.path("/main");},1000);
var v1=7,v2=125;
$scope.setSize=function(width,height){
  var ww=v2*width/100;
  var hh=v2*height/100;
  $(".body-img").css("background-size",ww+"px "+hh+"px");
}
$scope.onMouseMove=function(e){
  var width= window.innerWidth || document.body.clientWidth;
  var height= window.innerHeight || document.body.clientHeight;
  var x=50-(100*e.pageX/(width));
  var y=50-(100*e.pageY/(height));
  var xx=80+(-1*x/v1);
  var yy=80+(-1*y/v1);
  $(".body-img").css("background-position",xx+"% "+yy+"%");
  $scope.setSize(width,height);
};
var width= window.innerWidth || document.body.clientWidth;
var height= window.innerHeight || document.body.clientHeight;
$scope.setSize(width,height);
}]);
