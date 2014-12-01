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

var itemControllers = angular.module('itemControllers', []);

  //get ItemList
itemControllers.controller('ItemListCtrl', function ($scope, $http, $location, $route) {
  $scope.showupdate = false;
  // X-f35e678261fde10f4ce97d1a91881c9f
  ///$http.get('http://inventory-ktleary.rhcloud.com/items/').success(function (data) {

  //by default, load the cards

  $http.get('/api/items').success(function (data) {
    $scope.items = data;
  });


  // create the update card
  $scope.updateItem = function (_id) {
    $scope.showupdate = true;



    $http.get('/api/items/' + _id).success(function (data) {
      for (d in data){
        if (data.hasOwnProperty(d)) {
          console.log('property: ' + d + 'value: ' + data[d]);
        }
      }

      $scope.formData = data;
    });
  };



//be sure to inject $scope and $location
var changeLocation = function(url, forceReload) {
  $scope = $scope || angular.element(document).scope();
  if(forceReload || $scope.$$phase) {
    window.location = url;
  }
  else {
    //only use this if you want to replace the history stack
    //$location.path(url).replace();

    //this this if you want to change the URL and add it to the history stack
    $location.path(url);
    $scope.$apply();
  }
};

  $scope.processUpdate = function () {
    $http.put('/api/items/' + $scope.formData._id, $scope.formData).success(function (d) {
      console.log(d);
    });

    changeLocation('/', false);
  }


  $scope.deleteItem = function (item_id) {
    $http({
      method  : 'DELETE',
      url     : 'items/index.php',
      data    : "del_itemid=" + item_id,
      headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
    });
    $route.reload();
  };

});

// create Update Form  and pass in $scope and $http
itemControllers.controller('itemCreate', function itemCreate($scope, $http) {

  // holds the form data
  $scope.formData = {};

/*
  //rewrite the PUT params in form-encoded format
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

   // process the update form
  $scope.processUpdate = function () {
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
      data    : $scope.formData,  // pass in data as strings
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

// create Update Form  and pass in $scope and $http
itemControllers.controller('itemUpdate', function itemUpdate($scope, $http) {

  // holds the form data
  $scope.formData = {};

  //rewrite the PUT params in form-encoded format
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

   // process the update form
  $scope.processUpdate = function () {

    console.log('parm:' + param($scope.formData));
    $http({
      method  : 'PUT',
      url     : 'items/index.php',
      data    : param($scope.formData),  // pass in data as strings
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


