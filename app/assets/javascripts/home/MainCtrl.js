angular.module('scApp')
  .controller('MainCtrl', [
    '$scope',
    'Auth',
    '$uibModal',
    'groups_factory',
    function($scope, Auth, $uibModal, groups_factory){

      Auth.currentUser().then(function(user){
        $scope.user = user
      })

      $scope.groups = groups_factory.groups

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
