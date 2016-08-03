$app.controller('price', ['$scope', '$resource','$timeout','Ctrlmodule','ngProgressFactory', function ($scope,$resource,$timeout,Ctrlmodule,ngProgressFactory) {
  $scope.id_attribute="price_id";
  $scope.name_attribute="Unit Price";
  $scope.api_attribute="/price/api";
  $scope.defaultmodel={item_id:"",item_name:"",size_id:"",size_name:"",value:"",thisdirty:false};
  Ctrlmodule.init($scope,$resource,$timeout,angular,ngProgressFactory);
}]);
