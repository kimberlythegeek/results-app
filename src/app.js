(function(){
  'use strict';

  angular.module('AccessibilityReport',[])
  .controller('ReportController', ReportController)
  .directive('results', results)
  .directive('resultsTable', resultsTable)
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
      var color = 'text-';
      switch (violation.impact) {
        case 'critical':
          color += 'danger';
          break;
        case 'serious':
          color += 'warning';
          break;
        case 'moderate':
          color += 'info';
          break;
        case 'minor':
          color += 'success';
          break;
      }
      return color;
    }

    _this.setBGColor = function(node) {
      var color = 'bg-';
      switch (node.impact) {
        case 'critical':
          color += 'danger';
          break;
        case 'serious':
          color += 'warning';
          break;
        case 'moderate':
          color += 'info';
          break;
        case 'minor':
          color += 'success';
          break;
      }
      return color;
    }
  }

  function results() {
    return {
      templateUrl: 'src/results.template.html'
    };
  }

  function resultsTable() {
    return {
      restrict: 'E',
      templateUrl: 'src/resultstable.template.html'
    };
  }

  ResultsService.$inject = ['$http'];
  function ResultsService($http){
    var _this = this;

    _this.getResults = function() {
      var response = $http({
        method: 'GET',
        url: ('https://raw.githubusercontent.com/kimberlythegeek/axe_selenium_python/master/axe_selenium_python/tests/examples/example-results.json')
      });
      return response;
    };

  }

})();
