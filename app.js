var app = angular.module('bolui', ['ngMaterial', 'ui.router', 'angularModalService', 'ui.bootstrap']);

app.config(['$mdThemingProvider', '$stateProvider', '$urlRouterProvider' , function($mdThemingProvider, $stateProvider, $urlRouterProvider){
    $mdThemingProvider.theme('default')
        .primaryPalette('blue')
        .accentPalette('pink')

    $stateProvider.state('404', {
        url: "/404",
        templateUrl: "404.html",
        controller:"Error404"
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

    $stateProvider.state('product_list', {
        url: "/category/:category",
        templateUrl: "product_list.html",
        controller: "ProductList"
    })

    $stateProvider.state('home', {
        url: "",
        templateUrl: "category_list.html",
        controller: "CategoryList"
    })

    $stateProvider.state('home_alternate', {
        url: "/",
        templateUrl: "category_list.html",
        controller: "CategoryList"
    })

    $urlRouterProvider.otherwise('/404');

}]);

app.controller("Error404", ['$scope', function($scope){
    $scope.goback = function(){
        window.history.back();
    }

}]);

app.controller("ProductDetails", ['$scope', '$http', '$stateParams', '$state', '$location', '$anchorScroll', 'ModalService', function($scope, $http, $stateParams, $state, $location, $anchorScroll, ModalService) {
    var productId = $stateParams.productId;

        if (!productId) $state.go('404');

    $scope.pictures = [1,2,3,4];
    $scope.price = productId;
    $scope.name = "Lorem ipsum dolor sit amet";
    $scope.description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    $scope.product_size = "M";
    $scope.color = "Black";
    $scope.available = "Available";

    $scope.like = 4;
    $scope.comments = [
        {
            name: "Bo Hui",
            comment: "I like this item very much"
        },
        {
            name: "Yee Hui",
            comment: "This is really a good product"
        },
        {
            name: "Gilford",
            comment: "Not bad, at least usable"
        },
        {
            name: "Wen Bin",
            comment: "Will be buying it again"
        },
        {
            name: "Ivan",
            comment: "I am hugging it everyday"
        },
        {
            name: "Ming Jian",
            comment: "Suang dao liao"
        }
    ];

    $scope.gotoComments = function(){
        $location.hash('comments');
        $anchorScroll();
    };


}]);

app.controller("Cart", ['$scope', '$http', '$state', '$mdDialog', function($scope, $http, $state, $mdDialog) {
    $scope.items = [{
        name: "item 1 - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        quantity: 2,
        price: 2.40
    },{
        name: "item 2 - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        quantity: 7,
        price: 3.40
    },{
        name: "item 3 - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        quantity: 1,
        price: 5.40
    },{
        name: "item 4 - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        quantity: 6,
        price: 2.20
    }]


    $scope.quantities = [];
    for(var i = 1; i <= 100; i++){
        $scope.quantities.push(i);
    }

    $scope.recalculate = function () {
        var subtotal = 0;
        var items = $scope.items;
        for (var i = 0; i < items.length; i++) {
            subtotal = subtotal + (items[i].price * items[i].quantity);
            console.log(items[i].quantity);
        }

        $scope.subtotal = subtotal;
        $scope.tax = $scope.subtotal * 0.07;
        $scope.total = $scope.subtotal + $scope.tax;
    };

    $scope.recalculate();

    $scope.back = function() {
        $mdDialog.cancel();
    };

    $scope.hide = function() {
        $mdDialog.hide();
    };
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
    $scope.answer = function(answer) {
        $mdDialog.hide(answer);
    };
}]);

app.controller("Toolbar", ['$scope', '$http', '$state', '$mdDialog', function($scope, $http, $state, $mdDialog) {

    $scope.categories = ['Hat', 'Sunglasses', 'Top', 'Bottom'];

    $scope.showCart = function(){
        $state.go('cart');
    }

    $scope.showCartDialog = function(ev) {
        $mdDialog.show({
            controller: "Cart",
            templateUrl: 'cart.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            escapeToClose: true
        });
    };

    $scope.gotoCategory = function(category){
        $state.go('product_list', {category: category});
    }

    $scope.goHome = function(){
        $state.go('home');
    }
}]);

app.controller("ProductList", ['$scope', '$http', '$state', '$stateParams', function($scope, $http, $state, $stateParams){
    $scope.category = $stateParams.category;

    $scope.gotoProduct = function(id){
        $state.go('product_details', {productId: id});
    }

    $scope.products = [{
        imageURL: "http://lorempixel.com/500/500/",
        name: "Something",
        price: 2.70
    },{
        imageURL: "http://lorempixel.com/500/500/",
        name: "Something else",
        price: 3.40
    },{
        imageURL: "http://lorempixel.com/500/500/",
        name: "My banana",
        price: 8.50
    },{
        imageURL: "http://lorempixel.com/500/500/",
        name: "Bread",
        price: 2.10
    },{
        imageURL: "http://lorempixel.com/500/500/",
        name: "Watch",
        price: 24.70
    }];
}]);

app.controller("CategoryList", ['$scope', '$http', '$state', '$stateParams', function($scope, $http, $state, $stateParams){
    $scope.gotoCategory = function(category){
        $state.go('product_list', {category: category});
    }

    $scope.categories = [{
        name: "Hat",
        imageURL: "http://lorempixel.com/500/500/"
    },{
        name: "Sunglasses",
        imageURL: "http://lorempixel.com/500/500/"
    },{
        name: "Top",
        imageURL: "http://lorempixel.com/500/500/"
    },{
        name: "Bottom",
        imageURL: "http://lorempixel.com/500/500/"
    }];
}]);