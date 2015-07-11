var app = angular.module('bolui', ['ngMaterial', 'ui.router']);

app.config(['$mdThemingProvider', '$stateProvider', '$urlRouterProvider' , function($mdThemingProvider, $stateProvider, $urlRouterProvider){
    $mdThemingProvider.theme('default')
        .primaryPalette('blue')
        .accentPalette('pink')

    $stateProvider.state('product_details_empty', {
        url: "/product_details",
        templateUrl: "product_details_empty.html",
        controller:"ProductDetailsEmpty"
    })

    $stateProvider.state('product_details', {
        url: "/product_details/:productId",
        templateUrl: "product_details.html",
        controller:"ProductDetails"
    })

    $stateProvider.state('cart', {
        url: "/cart",
        templateUrl: "cart.html",
        controller: "Cart"
    })

    $urlRouterProvider.otherwise('/product_details');

}]);

app.controller("ProductDetails", ['$scope', '$http', '$stateParams', '$state', function($scope, $http, $stateParams, $state) {
    var productId = $stateParams.productId;

        if (!productId) $state.go('product_details_empty');

    $scope.pictures = [1,2,3,4];
    $scope.price = productId;
    $scope.name = "Lorem ipsum dolor sit amet";
    $scope.description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    $scope.product_size = "M";
    $scope.color = "Black";
    $scope.available = "Available";
}]);

app.controller("Cart", ['$scope', '$http', '$state', function($scope, $http, state) {
    $scope.items = [{
        name: "item 1",
        quantity: 2,
        price: 2.40
    },{
        name: "item 2",
        quantity: 7,
        price: 3.40
    },{
        name: "item 3",
        quantity: 1,
        price: 5.40
    },{
        name: "item 4",
        quantity: 6,
        price: 2.20
    }]

    var subtotal = 0;
    var items = $scope.items;
    for (var i = 0; i < items.length; i++) {
        subtotal = subtotal + items[i]['price'];
    }

    $scope.subtotal = subtotal;
    $scope.tax = 0.50;
    $scope.total = $scope['subtotal']+ $scope['tax'];
}]);