app.controller('size', ['$scope', '$resource','$timeout','Ctrlmodule','ngProgressFactory', function ($scope,$resource,$timeout,Ctrlmodule,ngProgressFactory) {
  $scope.id_attribute="size_id";
  $scope.name_attribute="Size Name";
  $scope.api_attribute="/size/api";
  $scope.defaultmodel={value:"",thisdirty:false};
  Ctrlmodule.init($scope,$resource,$timeout,angular,ngProgressFactory);
}]);
