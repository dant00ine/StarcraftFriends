angular.module('scApp')
.factory('VoteFactory', [
  '$http',
  function($http){
    var o = {
      groups: []
    }

    o.create = function(vote){
      $http.post("/votes.json", vote).success(function(res){
        console.log(res)
      })
    }


  }
])
