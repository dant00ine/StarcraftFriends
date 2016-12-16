angular.module('scApp')
  .controller('GroupsCtrl', [
    '$state',
    '$scope',
    'groups',
    'thisGroup',
    '$uibModal',
    function($state, $scope, groups, thisGroup, $uibModal){
      $scope.group = thisGroup.data.group
      $scope.members = thisGroup.data.members
      $scope.votes = thisGroup.data.votes

      console.log($scope.votes)

      console.log($scope.members);

      $scope.voted = function(id){
        for(i in $scope.votes){
          if($scope.votes[i].votee_id == id)
            return false
        }
        return true
      }

      $scope.invite = function(){
        var invParams = {invite: {email: $scope.email}}
        groups.inviteMember($scope.group.id, invParams)
        $scope.email = ''
      }

      $scope.vote = function(){
        var modalInstance = $uibModal.open({
          templateUrl: "vote/_voteModal.html",
          controller: "VoteModalCtrl",
          ariaLabelledBy: "modal-title",
          ariaDescribedBy: "modal-body"
        })
      }

    }
  ])
