angular.module('scApp', ['ui.router', 'templates', 'Devise', 'ui.bootstrap'])
.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'home/_home.html',
        controller: 'MainCtrl',
        onEnter: ['$state', 'Auth', function($state, Auth){
          Auth.currentUser().then(function(user){
          }, function(error){
            $state.go('login')
          })
        }],
        resolve: {
          myGroups: ['groups', function(groups){
            return groups.getAll()
          }]
        }
      })
      .state('group', {
        url: '/groups/:id',
        templateUrl: 'group/_groups.html',
        controller: 'GroupsCtrl',
        onEnter: ['$state', 'Auth', function($state, Auth){
          Auth.currentUser().then(function(user){

          }, function(error){
            $state.go('login')
          })
        }],
        resolve: {
          thisGroup: ['groups', '$stateParams', function(groups, $stateParams){
            return groups.getOne($stateParams.id)
          }]
        }
      })
      .state('profile', {
        url: '/profile/:id',
        templateUrl: 'profile/_profile.html',
        controller: 'ProfCtrl',
        resolve : {
          profile: ['users', '$stateParams', function(users, $stateParams){
            return users.getOne($stateParams.id)
          }]
        },
        onEnter: ['$state', 'Auth', function($state, Auth){
          Auth.currentUser().then(function(user){

          }, function(error){
            $state.go('login')
          })
        }]
      })
      .state('login', {
        url: '/login',
        templateUrl: 'auth/_login.html',
        controller: 'AuthCtrl',
        onEnter: ['$state', 'Auth', function($state, Auth){
          Auth.currentUser().then(function(user){
            $state.go('home')
          }, function(error){
            $state.go('login')
          })
        }]
      })
      .state('register', {
        url: '/register',
        templateUrl: 'auth/_register.html',
        controller: 'AuthCtrl',
        onEnter: ['$state', 'Auth', function($state, Auth){
          Auth.currentUser().then(function(user){
            $state.go('home')
          }, function(error){
            $state.go('register')
          })
        }]
      })
    $urlRouterProvider.otherwise('login');
  }
])
