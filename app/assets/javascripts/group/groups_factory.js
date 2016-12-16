angular.module('scApp')
  .factory('groups', [
    '$http',
    function($http){
      var o = {
        groups: []
      }

      o.getAll = function(){
        return $http.get('/groups.json').success(function(data){
          // console.log(data);
          angular.copy(data, o.groups)
        })
      }

      o.create = function(group){
        $http.post('/groups.json', group).success(function(res){
          console.log(res);
        })
      }

      o.getOne = function(id){
        return $http.get(`/groups/${id}.json`).success(function(res){
          // console.log(res);
          return res.data
        })
      }

      o.inviteMember = function(id, email){
        $http.post(`/groups/${id}/invite.json`, email).success(function(res){
          o.groups.push(res.data)
          return res.data
        })
      }

      return o
    }
  ])