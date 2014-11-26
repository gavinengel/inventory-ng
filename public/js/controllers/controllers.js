var testApp = angular.module('testApp', []);
//create simple controller
testApp.controller('testController', function($scope, zipcodeService){
  $scope.hello="Hello There!";
  $scope.testControllerTest = '';
 
  $scope.processAddress = function (){
    $scope.testControllerTest = "waiting for service--";
   //build GET options -- substitute street, city, etc with your form data
    var zipData  = {
      baseurl:'https://api.smartystreets.com/street-address',
      auth_id: 'f9f5b120-b95b-4dc0-81d1-f62a30c5e7b3',
      auth_token: 'usLhmPVxda78SOCMa3eD', 
      street: '90 Fleet St', 
      street2: '', 
      city: 'Portsmouth', 
      state: 'NH', 
      zipcode: ''
    };


    //link this function up to ng-click or whichever event you like
    zipcodeService.returnData(zipData)
     .success(function(data, status, headers) {
      //view object properties in console, remove later
      //console.log(data[0]);
      
      //replace console.log with form elements (e.g. form.zipcode = ...)
      for (var d in data){
        comps = data[d].components;
        console.log(comps.zipcode);
        console.log(comps.plus4_code);
        console.log(comps.city_name);
        console.log(comps.state_abbreviation);
        $scope.testControllerTest = comps.zipcode; 
      }
    });
  };
});

    //query built from smartystreets.com

    //https://api.smartystreets.com/street-address?
    //auth-id=f9f5b120-b95b-4dc0-81d1-f62a30c5e7b3&
    //auth-token=usLhmPVxda78SOCMa3eD&
    //street=950%20Winter%20St&
    //street2=&
    //city=Waltham&
    //state=MA&zipcode=&candidates=10


