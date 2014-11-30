
//create services container
angular.module('inventoryNg.services', []).
  factory('zipcodeService', function () {
    var serviceInstance = {};
    return serviceInstance;
  });


// our zipcode service
inventoryNg.service('zipcodeService', function ($http) {
  function getZipcode(zipData) {
    return $http({
      url: zipData.baseurl,
      method: "GET",
      params: {'auth-id': zipData.auth_id, 'auth-token': zipData.auth_token,
        street: zipData.street, street2: zipData.street2, city: zipData.city,
        state: zipData.state, zipcode: zipData.zipcode}
    });
  }
  return {
    returnData: function (zipData) {
      return getZipcode(zipData, 'd');
    }
  };
});
