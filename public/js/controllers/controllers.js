var itemFilters = angular.module('itemFilters', []);

itemFilters.filter('array', function () {

  return function (items) {
    var filtered = [];
    angular.forEach(items, function (item) {
      filtered.push(item);
    });
    return filtered.reverse();
  };
});

// controller for main view (home.html)
var itemControllers = angular.module('itemControllers', []);

  //get list of all -- should be paginated
itemControllers.controller('ItemListCtrl', function ($scope, $http, $location) {
   // holds the form data
  $scope.formData = {};

  $scope.showupdate = false;
  $scope.showcreate = false;

  //by default, load the cards when the controller loads
  $http.get('/api/items').success(function (data) {
    $scope.items = data;
  });


  //show the create new item section
  $scope.showCreate = function () {
    $scope.showcreate = true;
  };

  // show and populate the update card
  $scope.updateItem = function (_id) {
    $scope.showupdate = true;
    var d;
    $http.get('/api/items/' + _id).success(function (data) {
      for (d in data) {
        if (data.hasOwnProperty(d)) {
          console.log('property: ' + d + 'value: ' + data[d]);
        }
      }

      $scope.formData = data;
    });
  };


  //change the location after post/put
  var changeLocation = function (url, forceReload) {
    $scope = $scope || angular.element(document).scope();
    if (forceReload || $scope.$$phase) {
      window.location = url;
    } else {
      $location.path(url);
      $scope.$apply();
    }
  };


   // process the create form
  $scope.processCreate = function () {
    //console.log('parm:' + param($scope.formData));
    $http({
      method  : 'POST',
      url     : '/api/items',
      data    : $scope.cformData,  // pass in data as strings
      headers : { 'Content-Type': 'application/json' }  // set the headers so angular passing info as form data (not request payload)
    })
      .success(function (data) {
        if (!data.success) {
          console.log(data.message);
        } else {
          // if successful, bind success message to message
          $scope.message = data.message;
        }
      });
    changeLocation('/', false);
  };



  $scope.processUpdate = function () {
    $http.put('/api/items/' + $scope.formData._id, $scope.formData).success(function (d) {
      console.log(d);
    });

    changeLocation('/', false);
  };


  $scope.deleteItem = function (_id) {
    $http({
      method  : 'DELETE',
      url     : '/api/items/' + _id,
      headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
    }).success(function (d) {
      console.log(d);
    });
  };
});

// not really being used in this implementation -- was written for partials and maybe someday a dedicated data entry page
itemControllers.controller('itemCreate', function itemCreate($scope, $http) {

  // holds the form data
  $scope.formData = {};

   // process the create form
  $scope.processCreate = function () {
    var d;
    for (d in $scope.formData) {
      if ($scope.formData.hasOwnProperty(d)) {
        console.log($scope.formData);
      }
    }

    //console.log('parm:' + param($scope.formData));
    $http({
      method  : 'POST',
      url     : '/api/items',
      data    : $scope.cformData,  // pass in data as strings
      headers : { 'Content-Type': 'application/json' }  // set the headers so angular passing info as form data (not request payload)
    })
      .success(function (data) {
        if (!data.success) {
          console.log(data.message);
        } else {
          // if successful, bind success message to message
          $scope.message = data.message;
        }
      });
  };
});

// not being used in this implementation
itemControllers.controller('itemUpdate', function itemUpdate($scope, $http) {

  // holds the form data
  $scope.formData = {};


   // process the update form
  $scope.processUpdate = function () {

    $http({
      method  : 'PUT',
      url     : 'items/index.php',
      data    : $scope.formData,  // pass in data as strings
      headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
    }).success(function (data) {
      console.log(data);

      if (!data.success) {
        console.log('error');
      } else {
        // if successful, bind success message to message
        $scope.message = data.message;
      }
    });
  };
});



/*  //rewrite the PUT params in form-encoded format -- was used for original PHP version
  var param = function (obj) {
    var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

    for (name in obj) {
      if (obj.hasOwnProperty(name)) {
        value = obj[name];

        if (value instanceof Array) {
          for (i = 0; i < value.length; ++i) {
            subValue = value[i];
            fullSubName = name + '[' + i + ']';
            innerObj = {};
            innerObj[fullSubName] = subValue;
            query += param(innerObj) + '&';
          }
        } else if (value instanceof Object) {
          for (subName in value) {
            if (value.hasOwnProperty(subName)) {
              subValue = value[subName];
              fullSubName = name + '[' + subName + ']';
              innerObj = {};
              innerObj[fullSubName] = subValue;
              query += param(innerObj) + '&';
            }
          }
        } else if (value !== undefined && value !== null) {
          query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
        }
      }
    }
    return query.length ? query.substr(0, query.length - 1) : query;
  };
*/


/*
var phonecatApp = angular.module('phonecatApp', []);

phonecatApp.controller('PhoneListCtrl', function ($scope) {
  $scope.phones = [
    {'name': 'Nexus S',
     'snippet': 'Fast just got faster with Nexus S.'},
    {'name': 'Motorola XOOM™ with Wi-Fi',
     'snippet': 'The Next, Next Generation tablet.'},
    {'name': 'MOTOROLA XOOM™',
     'snippet': 'The Next, Next Generation tablet.'}
  ];
});
*/





    //query built from smartystreets.com

    //https://api.smartystreets.com/street-address?
    //auth-id=f9f5b120-b95b-4dc0-81d1-f62a30c5e7b3&
    //auth-token=usLhmPVxda78SOCMa3eD&
    //street=950%20Winter%20St&
    //street2=&
    //city=Waltham&
    //state=MA&zipcode=&candidates=10


