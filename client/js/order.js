app.controller('order', ['$scope', '$resource','$timeout', function ($scope, $resource,$timeout) {
  //Category List of value
  $scope.catgory={}
  $scope.catgory.model={};
  $scope.catgory.availableOptions=[];
    $scope.changeCatgory = function(){
      $scope.itemmodel.cat_id=$scope.catgory.model.cat_id;
      $scope.itemmodel.cat_name=$scope.catgory.model.name;
    }
    var Category = $resource("/category/api");
    $scope.progressbar.start();
    Category.query(function (results) {
      $scope.catgory.availableOptions=results;
      $scope.progressbar.complete();
    });

  //Size List of value
  $scope.size={}
  $scope.size.model={};
  $scope.size.availableOptions=[];
    $scope.changeSize = function(){
      $scope.itemmodel.size_id=$scope.size.model.size_id;
      $scope.itemmodel.size_name=$scope.size.model.name;
    }
    var Size = $resource("/size/api");
    $scope.progressbar.start();
    Size.query(function (results) {
      $scope.size.availableOptions=results;
      $scope.progressbar.complete();
    });

  //Product List of value
  $scope.product={}
  $scope.product.model={};
  $scope.product.availableOptions=[];
    $scope.changeProduct = function(){
      $scope.itemmodel.item_id=$scope.product.model.item_id;
      $scope.itemmodel.item_name=$scope.product.model.name;
      $scope.itemmodel.cat_id=$scope.product.model.cat_id;
      $scope.itemmodel.cat_name=$scope.product.model.cat_name;
    }
    var Product = $resource("/price/api");
    $scope.progressbar.start();
    Product.query(function (results) {
      $scope.product.availableOptions=results;
      $scope.progressbar.complete();
    });

    $scope.hotcold={}
    $scope.hotcold.model={};
    $scope.hotcold.availableOptions=[{name:"Hot"},{name:"Cold"}];

    $scope.search={};
    $timeout(function () {
      $('[data-toggle="tooltip"]').tooltip();
    }, 100);
    $scope.cart=[];
    $scope.total=0;
    $scope.setTotal=function(){
      var log = [];
      $scope.total=0;
      angular.forEach($scope.cart, function(value, key) {
        $scope.total +=value.amount;
      }, log);
    };
    $scope.addToCart=function(item){
      var data=angular.copy(item);
      delete data["__v"];
      delete data["_id"];
      if (!$scope.checkCart(data)){
        data.txn_id="";
        data.quantity=1;
        data.amount=data.quantity*data.unit_price;
        $scope.cart.push(data);
      }
      $scope.setTotal();
    };
    $scope.checkCart=function(data){
      var found=false;
      var log = [];
      angular.forEach($scope.cart, function(value, key) {
        if (value["price_id"]===data["price_id"]){
            found=true;
            value.quantity +=1;
            value.amount = value.quantity*value.unit_price;
        }
      }, log);
      return found;
    };
    $scope.setAmount=function(itemCart){
       if (itemCart.quantity<0) itemCart.quantity=0;
       itemCart.amount=itemCart.unit_price*itemCart.quantity;
       $scope.setTotal();
    }
    $scope.Txn = $resource("/txn/api");
    $scope.resultmsg="";
    $scope.submit=function(){
      var model = new $scope.Txn($scope.cart);
      model.$save(function (result) {
        $scope.cart=[];
        $scope.total=0;
        $scope.resultmsg=result.msg;
        $timeout(function () {
          $scope.resultmsg="";
        }, 3000);
      });
    }

}]);
