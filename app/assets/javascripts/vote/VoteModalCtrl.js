angular.module('scApp')
  .controller('VoteModalCtrl', [
    '$scope',
    '$uibModalInstance',
    'Auth',
    'votes_factory',
    'group', 'member', 'characterId',
    function($scope, $uibModalInstance, Auth,
        votes_factory, group, member, characterId){

      $scope.selected = ""
      $scope.group = group
      $scope.member = member

      Auth.currentUser().then(function(user){
        $scope.user = user
      })

      $scope.select = function(selection){
          setTimeout(function(){
              var oldElement = document.getElementById("char" + $scope.selected)
              angular.element(oldElement).attr("class", "")
              $scope.selected = selection
              var charId = "char"+selection
              var element = document.getElementById(charId)
              angular.element(element).attr("class", "selected")
          }, 0)
      }

      if(characterId){
          $scope.$on('$viewContentLoaded', $scope.select(characterId))
      }

      $scope.decide = function(){

        var voteData = { vote: {
            voter_id: $scope.user.id,
            votee_id: $scope.member.id,
            group_id: $scope.group.id,
            character_id: $scope.selected
          }
        }

        var res = votes_factory.create(voteData, function(response){
            console.log("callback yoooooo");
        })

        $scope.group = "test"
        $uibModalInstance.dismiss()
      }

      $scope.closeModal = function(result){
        $uibModalInstance.dismiss()
      }
    }
  ])
