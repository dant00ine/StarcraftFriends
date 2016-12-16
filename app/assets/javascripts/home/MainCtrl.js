angular.module('scApp')
  .controller('MainCtrl', [
    '$scope',
    'Auth',
    '$uibModal',
    'groups',
    function($scope, Auth, $uibModal, groups){

      Auth.currentUser().then(function(user){
        $scope.user = user
      })

      $scope.groups = groups.groups
      console.log($scope.groups);

      $scope.openModal = function(){
        var modalInstance = $uibModal.open({
          templateUrl: "home/_groupModal.html",
          controller: "GroupModalCtrl",
          ariaLabelledBy: "modal-title",
          ariaDescribedBy: "modal-body"
        })
      }
    }
  ])
