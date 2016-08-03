$app.controller('product', ['$scope', '$resource','$timeout','Ctrlmodule','ngProgressFactory', function ($scope,$resource,$timeout,Ctrlmodule,ngProgressFactory) {
  $scope.id_attribute="item_id";
  $scope.name_attribute="Product Name";
  $scope.api_attribute="/product/api";
  $scope.defaultmodel={cat_id:"",cat_name:"",value:"",thisdirty:false};
  Ctrlmodule.init($scope,$resource,$timeout,angular,ngProgressFactory);
}]);
