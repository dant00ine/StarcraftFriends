angular.module('scApp')
  .controller('VoteModalCtrl', [
    '$scope', '$rootScope',
    '$uibModalInstance',
    'Auth',
    'votes_factory',
    'group', 'member', 'characterId',
    function($scope, $rootScope, $uibModalInstance, Auth,
        votes_factory, group, member, characterId){

      $scope.selected = ""
      $scope.selectedCategory = "terran"
      $scope.group = group
      $scope.member = member

      $scope.zerg = false
      $scope.protoss = false
      $scope.terran = true

      Auth.currentUser().then(function(user){
        $scope.user = user
      })

      $scope.select = function(selection){
          setTimeout(function(){
              var oldElement = document.getElementById($scope.selected)
              angular.element(oldElement).attr("class", "")
              $scope.selected = selection
              var element = document.getElementById(selection)
              angular.element(element).attr("class", "selected")
          }, 0)
      }

      $scope.selectCategory = function(selection){
          setTimeout(function(){
              var oldSelection = document.getElementById($scope.selectedCategory + "Button")
              angular.element(oldSelection).attr("class", "")
              $scope.selectedCategory = selection
              var buttonId = selection+"Button"
              var element = document.getElementById(buttonId)
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
            character: $scope.selected
          }
        }

        var res = votes_factory.create(voteData, function(response){
            console.log('time to emit');
            $rootScope.$broadcast('vote_created')
        })

        $scope.group = "test"
        $uibModalInstance.dismiss()
      }

      $scope.closeModal = function(result){
        $uibModalInstance.dismiss()
      }
    }
  ])
