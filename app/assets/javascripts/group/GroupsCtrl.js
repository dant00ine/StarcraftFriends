angular.module('scApp')
  .controller('GroupsCtrl', [
    '$state',
    '$scope', '$rootScope',
    '$uibModal',
    'Auth',
    'groups_factory',
    'votes_factory',
    'thisGroup',
    function($state, $scope, $rootScope, $uibModal, Auth,
        groups_factory, votes_factory, thisGroup){

      $scope.group = thisGroup.data.group
      $scope.members = thisGroup.data.members
      $scope.votes = thisGroup.data.votes
      $scope.currentUser
      $scope.selectedMember
      $scope.votedChar

      Auth.currentUser().then(function(user){
          $scope.currentUser = user
      })

      function updateVoteGraphics(id){
          setTimeout(function(){
              for(i in $scope.votes){
                  if($scope.currentUser.id == $scope.votes[i].voter_id){
                      var character_id = $scope.votes[i].character_id
                      var url = `/images/terran/${character_id}.jpg`
                      var votee_id = $scope.votes[i].votee_id.toString()

                      var button = document.getElementById(votee_id)
                      var label = document.getElementById("charNameFor" + votee_id)

                      label.innerHTML = $scope.votes[i].name

                      button.style.backgroundImage = `url(${url})`
                      button.style.backgroundSize = `cover`
                      button.innerHTML = ""
                  }
              }
              return true
          }, 0)
      }

      $scope.$on('$viewContentLoaded', updateVoteGraphics)

      $rootScope.$on('vote_created', function(){
          votes_factory.get($scope.group.id, function(data){
              $scope.votes = data.votes
              console.log("vote created event");
              updateVoteGraphics()
          })
        })

      $scope.invite = function(){
        var invParams = {invite: {email: $scope.email}}
        groups_factory.inviteMember($scope.group.id, invParams)
        $scope.email = ''
      }

    $scope.vote = function(id){
        for(var i = 0; i < $scope.members.length; i++){
            if($scope.members[i].id == id){
                $scope.selectedMember = $scope.members[i]
            }
        }
        $scope.votedChar = $scope.votes.filter(function(item){
            return item.votee_id == $scope.selectedMember.id &&
            item.voter_id == $scope.currentUser.id
        })

        var modalInstance = $uibModal.open({
          templateUrl: "vote/_voteModal.html",
          controller: "VoteModalCtrl",
          ariaLabelledBy: "modal-title",
          ariaDescribedBy: "modal-body",
          resolve: {
            group: function(){
              return $scope.group
            },
            member: function(){
              return $scope.selectedMember
            },
            characterId: function(){
                return $scope.votedChar[0] ? $scope.votedChar[0].id : null
            }
          }
      })
            //   .closed.then(function(){
            //      handler for modal close
            //   })

    } // $scope.vote

    $scope.finalize = function(){
        votes_factory.finalize($scope.group.id, function(data){
            console.log(data);
            // navigate to the completed version of the group
            $state.go(`group.complete`, {id: $scope.group.id})
        })
    }

    } // end of controller definition function
  ])
