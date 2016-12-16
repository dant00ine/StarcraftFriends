angular.module('scApp')
  .controller('VoteModalCtrl', [
    '$scope',
    '$uibModalInstance',
    function($scope, $uibModalInstance){

      $scope.selected = ""

      $scope.select = function(selection){
        var oldElement = document.getElementById($scope.selected)
        angular.element(oldElement).attr("class", "")
        $scope.selected = selection
        var element = document.getElementById(selection)
        angular.element(element).attr("class", "selected");
      }

      $scope.decide = function(){
        console.log("chose: ", $scope.selected);
        $uibModalInstance.dismiss()
      }

      $scope.closeModal = function(result){
        $uibModalInstance.dismiss()
      }
    }
  ])
