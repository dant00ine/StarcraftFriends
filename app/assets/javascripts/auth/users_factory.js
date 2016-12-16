angular.module('scApp')
  .factory('users', [
    '$http',
    function($http){
      var o = {}

      o.getOne = function(id){
        return $http.get(`/users/${id}.json`).success(function(res){
          return res
        })
      }
      return o
    }
  ])
