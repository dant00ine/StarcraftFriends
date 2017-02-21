angular.module('scApp')
    .controller('CompleteGroupCtrl', [
        '$state', '$scope', 'groups_factory',
        function($state, $scope, groups_factory){

            $scope.membersResults = $scope.members

            getResults()

            function getResults(){
                groups_factory.results($scope.group.id, function(res){
                    console.log(res);
                })
            }
        }
    ])
