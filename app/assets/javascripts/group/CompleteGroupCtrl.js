angular.module('scApp')
    .controller('CompleteGroupCtrl', [
        '$state', '$scope',
        function($state, $scope){
            $scope.heya = function(){
                console.log("heya");
            }
            console.log($scope.members);
            console.log($scope.votes);

            $scope.membersResults = $scope.members


            function determineCharacters(){
                for(member in $scope.membersResults){

                }
            }
        }
    ])
