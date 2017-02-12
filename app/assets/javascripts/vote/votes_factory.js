angular.module('scApp')
.factory('votes_factory', [
  '$http',
  function($http){
    var o = {
      groups: []
    }
    o.create = function(voteData, callback){
       $http.post(`/votes/${voteData.vote.group_id}/vote.json`, voteData).then(function(res){
           callback(res.data)
      }).catch( (error) => { console.log(error) })
    }

    o.get = function(id, callback){
        $http.get(`/votes/${id}/vote.json`).then(function(res){
            console.log(res);
            callback(res.data)
        }).catch( (error) => { console.log(error) })
    }
    
    o.finalize = function(id, callback){
        $http.get(`/votes/${id}/finalize.json`).then(function(res){
            callback(res.data)
        }).catch( (error) => { console.log(error) })
    }
    return o
  }
])
