//register app
var inventoryNg = angular.module("inventoryNg", ['ngRoute', 'itemControllers', 'itemFilters']);


// pre-flights from app server
angular.module('inventoryNg').run(function ($http) {

  $http.defaults.headers.common['X-f35e678261fde10f4ce97d1a91881c9f'] = 'RopeSwing';

});

console.log('in app.js');
console.log(document.location);

//partials
inventoryNg.config(function ($routeProvider) {

  $routeProvider.when('/', {
    templateUrl: '/partials/home.html',
    controller: 'ItemListCtrl'
  });


  $routeProvider.when('/create', {
    templateUrl: '/partials/createItem.html',
    controller: 'itemCreate'
  });

  $routeProvider.when('/update/:updateId', {
    templateUrl: '/partials/updateItem.html',
    controller: 'itemUpdate'
  });
  $routeProvider.otherwise({ redirectTo: '/' });

});


var createItem = function () {
  document.getElementById("create").style.display = "block";
};


//notsurewhatthisleftoverscrapis
/*halfquart.filter('matchName', function() {
  return function(items, query) {
    return items.filter(function(item) {
      console.log('in matchName')
      return item.item_name.match(query);
    };
  };
});
*/

