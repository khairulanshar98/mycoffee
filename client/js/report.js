$app.controller('report', ['$scope', '$resource', function ($scope, $resource) {
    $scope.search={};
    //Category List of value
    $scope.catgory={}
    $scope.catgory.model={};
    $scope.catgory.availableOptions=[];
    $scope.changeCatgory = function(){
      $scope.records.total={quantity:0,amount:0};
      $scope.search.cat_id=$scope.catgory.model.cat_id;
    }
    var Category = $resource("/category/api");
    $scope.progressbar.start();
    Category.query(function (results) {
      $scope.catgory.availableOptions=results;
      $scope.catgory.availableOptions.unshift({cat_id:"",name:"All"});
      $scope.progressbar.complete();
    });

    //Size List of value
    $scope.size={}
    $scope.size.model={};
    $scope.size.availableOptions=[];
    $scope.changeSize = function(){
      $scope.records.total={quantity:0,amount:0};
      $scope.search.size_id=$scope.size.model.size_id;
    }
    var Size = $resource("/size/api");
    $scope.progressbar.start();
    Size.query(function (results) {
      $scope.size.availableOptions=results;
      $scope.size.availableOptions.unshift({size_id:"",name:"All"});
      $scope.progressbar.complete();
    });

    //Product List of value
    $scope.product={}
    $scope.product.model={};
    $scope.product.availableOptions=[];


    $scope.hotcold={}
    $scope.hotcold.model={};
    $scope.hotcold.availableOptions=[{name:""},{name:"Hot"},{name:"Cold"}];
    $scope.changeHotCold = function(){
      $scope.records.total={quantity:0,amount:0};
      $scope.search.hot_cold=$scope.hotcold.model.name;

    }
    $scope.records=[];
    $scope.total={quantity:0,amount:0};
    $scope.Txn = $resource("/txn/api");
    $scope.progressbar.start();
    $scope.Txn.query(function (results) {
      $scope.records=results;
      $scope.records.total = {};
      $scope.progressbar.complete();
    });
    $scope.setTotalQty=function(qty){
      console.log(qty)
    }
}]);
