var app = angular.module("test", ['ui.router']);


app.run( [ '$rootScope', function ($rootScope) {
    $rootScope.$on('$stateChangeSuccess', function(event, to, toParams, from, fromParams) {
        $rootScope.$previousState = from;
    });
}]);
app.config([
'$stateProvider',
'$urlRouterProvider',
'$locationProvider',
function($stateProvider, $urlRouterProvider, $locationProvider){

    $stateProvider
    .state('login', {
        url: '/login',
        views:{
            "pages":{
                templateUrl: "/partials/login"
            }
        }
    })
    .state('register', {
        url: '/register',
        views:{
            "pages":{
                templateUrl: "/partials/register"
            }
        }

    })
    .state('app', {
        url: '/app',
        views:{
            "pages":{
                templateUrl: "/partials/app"
            },
            "app_view@app":{
                templateUrl: "/app_partials/home"
            }
        }

    })
    .state('app.view1', {
        url: '/view1',
        views:{
            "app_view@app":{
                templateUrl: "/app_partials/view1"
            }
        }

    })
    .state('app.view2', {
        url: '/view2',
        views:{
            "app_view@app":{
                templateUrl: "/app_partials/view2"
            }
        }

    })
    .state('app.view2.modal1', {
        views:{
            "modal_view@app":{
                templateUrl: "/modals/modal1",
            }

        }

    });

    $urlRouterProvider.otherwise("login");
    $locationProvider.html5Mode(true);

}]);

app.directive('goback', [
'$state',
'$rootScope',
function($state, $rootScope){
    return function(scope, element, attrs) {
        element.bind("click", function(){
            if($rootScope.$previousState.name) {
                $state.go($rootScope.$previousState);
            }else {
                $state.go(attrs.goback);
            }
        });
    }
}]);