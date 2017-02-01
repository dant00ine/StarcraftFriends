angular.module('scApp')
.factory('votes_factory', [
  '$http',
  function($http){
    var o = {
      groups: []
    }
    o.create = function(voteData){
      $http.post(`/votes/${voteData.vote.group_id}/vote.json`, voteData).then(function(res){
          console.log(res);
        return res.data
    }).catch( (error) => { console.log(error) })
    }
    return o
  }
])
