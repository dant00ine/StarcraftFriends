angular.module('scApp')
  .controller('ProfCtrl', [
    '$state',
    '$scope',
    'profile',
    function($state, $scope, profile){
      $scope.user = profile.data
    }
  ])
