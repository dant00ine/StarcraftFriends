angular.module('scApp')
  .controller('GroupModalCtrl', [
    '$scope',
    '$uibModalInstance',
    'groups',
    'Auth',
    function($scope, $uibModalInstance, groups, Auth){

    Auth.currentUser().then(function(user){
      $scope.user = user
    })

    $scope.closeModal = function(){
      $uibModalInstance.dismiss()
    }

    $scope.newGroup = function(){
      if(!$scope.name || !$scope.description){ console.log("no body"); return }
      groups.create({
        name: $scope.name,
        description: $scope.description,
        user_id: $scope.user.id
      })
      $scope.title = ''
      $scope.link = ''

      $scope.groupModal = false

      $uibModalInstance.dismiss()
    }
  }])
