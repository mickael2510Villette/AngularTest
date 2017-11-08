'use strict';

/**
 * @ngdoc function
 * @name a577435App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the a577435App
 */
angular.module('a577435App')
  .controller('MainCtrl', ['$scope', 'reverseFilter', '$http', '$uibModal', function ($scope, reverseFilter, $http, $uibModal) {
    
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
      
    $scope.listepersonnes = [{
        nom: "Villette",
        prenom: "Mickael",
        telephone: "0632357210",
        email:"vivi@mi.fr",
        montant:"302"
    }, {
        nom: "Dupond",
        prenom: "Damien",
        telephone: "0632357211",
        email:"dada@mi.fr",
        montant:"303"
    }, {
        nom: "Louis",
        prenom: "Dimitri",
        telephone: "0632357212",
        email:"lolo@mi.fr",
        montant:"3000"
    }, {
        nom: "Quennehen",
        prenom: "Simon",
        telephone: "0632357213",
        email:"ququ@mi.fr",
        montant:"1302"
    }, {
        nom: "Mars",
        prenom: "Bruno",
        telephone: "0632357214",
        email:"mama@mi.fr",
        montant:"2302"
    }, {
        nom: "Pitt",
        prenom: "Brad",
        telephone: "0632357215",
        email:"brbr@mi.fr",
        montant:"530"
    }];   
      
    $scope.valueMontants = [
      {value:'1000'},
      {value:'2000'},
      {value:'3000'}
    ];
      
    $scope.valider = function() {
        console.log($scope.formulaireTest.nom.$invalid);
        console.log($scope.formulaireTest.prenom.$invalid);
        console.log($scope.formulaireTest.email.$invalid);
        console.log($scope.formulaireTest.tel.$invalid);
        console.log($scope.formulaireTest.credit.$invalid);
    };
      
    $scope.viderChamps = function() {
        $scope.user.nom = '';
        $scope.user.prenom = '';
        $scope.usertel = '';
        $scope.user.email = '';
        $scope.user.credit  = '';
    };
      
    $scope.remplirTableau = function(personne) {
        
        $scope.personne = {
            nom: personne.nom,
            prenom: personne.prenom,
            telephone: personne.tel,
            email: personne.mail,
            montant: personne.montant
        };

        if (!$scope.personne.isEmpty) {
            $scope.listepersonnes.push($scope.personne);
        }
    };
      
    $scope.envoyerPost = function (){
        $http({
            method: 'POST',
            url: '',
            data : $scope.personne
        }).then(function successCallback(response) {
            console.log(response);
        }, function errorCallback(response) {
            console.log(response);
            $scope.response = response;
            $uibModal.open({
                animation: true,
                templateUrl: '404.html'
            }); 
        });
    };
      
    $scope.envoyerGet = function (){
        $http({
            method: 'GET',
            url: 'personne.json'
        }).then(function successCallback(response) {
            console.log(response);
            $scope.personnes = response.data.Personnes;
            angular.forEach($scope.personnes, function (personne) {
                $scope.remplirTableau(personne);
            });
        }, function errorCallback(response) {
            $scope.response = response;
            $uibModal.open({
                animation: true,
                templateUrl: '404.html'
            }); 
        });
    };
      
    $scope.submit = function() {
        
        $scope.personne = {
            nom: $scope.user.nom,
            prenom: $scope.user.prenom,
            telephone: $scope.usertel,
            email: $scope.user.email,
            montant: $scope.user.credit.value
        };

        if (!$scope.personne.isEmpty) {
            $scope.listepersonnes.push($scope.personne);
            $scope.viderChamps();
            $scope.envoyerPost();
            $scope.envoyerGet();
        }
    };
      
}]).directive('formulaire', function() {
    return {
        restrict: 'E',
        templateUrl: '../views/formulaire.html'
    };
}).directive('tableaufiltre', function() {
    return {
        restrict: 'E',
        templateUrl: '../views/tableaufiltre.html'
    };
}).directive('404Error', function() {
    return {
        restrict: 'E',
        templateUrl: '../404.html'
    };
}).directive('numValidator', function() {
   return {
        require: 'ngModel',
        restrict: 'A',
        link: function($scope, element, attrs, ngModel) {
        ngModel.$validators.usertel = function(value) {
            return !value || /^(0|\+33)[1-9]([-. ]?[0-9]{2}){4}$/.test(value);
            }
        }
   };
}).directive('numbersOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                    var transformedInput = text.replace(/[^0-9],+/g, '');

                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return undefined;
            }            
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
}).filter('reverse', function() {
    return function(input, uppercase) {
        input = input || '';
        var out = '';
        for (var i = 0; i < input.length; i++) {
            out = input.charAt(i) + out;
        }
        // conditional based on optional argument
        if (uppercase) {
            out = out.toUpperCase();
        }
        return out;
    };
});