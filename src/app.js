(function(){
  'use strict';

  angular.module('AccessibilityReport',[])
  .controller('ReportController', ReportController)
  .directive('results', results)
  .directive('resultsList', resultsList)
  .service('ResultsService', ResultsService);

  ReportController.$inject = ['$scope', 'ResultsService'];
  function ReportController($scope, ResultsService) {
    var _this = this;

    _this.impact = {
      'critical': 1,
      'serious': 2,
      'moderate': 3,
      'minor': 4
    };

    $scope.impactLevel = function(v1, v2) {
      return (_this.impact[v1.value] < _this.impact[v2.value]) ? -1 : 1;
    };

    var promise = ResultsService.getResults();
    promise.then(function (response) {
      _this.violations = response.data.violations;
      // console.log(_this.violations);
    });

    _this.setColor = function(violation) {
      var textcolor = 'text-';
      switch (violation.impact) {
        case 'critical':
          textcolor += 'danger';
          break;
        case 'serious':
          textcolor += 'warning';
          break;
        case 'moderate':
          textcolor += 'info';
          break;
        case 'minor':
          textcolor += 'success';
          break;
      }
      console.log(textcolor);
      return textcolor;
    }

    _this.setBGColor = function(node) {
      var bgcolor = 'list-group-item-';
      switch (node.impact) {
        case 'critical':
          bgcolor += 'danger';
          break;
        case 'serious':
          bgcolor += 'warning';
          break;
        case 'moderate':
          bgcolor += 'info';
          break;
        case 'minor':
          bgcolor += 'success';
          break;
      }
      console.log(bgcolor);
      return bgcolor;
    }
  }
  
  function resultsList() {
    return {
      restrict: 'E',
      templateUrl: 'src/resultslist.template.html'
    };
  }

  ResultsService.$inject = ['$http'];
  function ResultsService($http){
    var _this = this;

    _this.getResults = function() {
      var response = $http({
        method: 'GET',
        url: ('src/example-results.json')
      });
      return response;
    };

  }

})();
