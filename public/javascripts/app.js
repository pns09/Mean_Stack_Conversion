var app = angular.module('newapp', ["ngRoute"])

app.config(function ($routeProvider) {
    $routeProvider.when('/', {
        template: `<h1>Welcome to Root Page!!!</h1>`,

    })
        .when('/signup', {
            templateUrl: 'views/signup.html',
            controller: 'signupController',
            // resolve: ['protect', function (protect) {
            //     return protect.protect()
            // }]
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'loginController',
            resolve: ['protect', function (protect) {
                return protect.protect()
            }]
        })
        .when('/home', {
            templateUrl: 'views/home.html',
            controller: 'homeController',
            resolve: ['protect', function (protect) {
                return protect.protect()
            }]
        })
        .when('/message', {
            templateUrl: 'views/message.html',
            controller: 'messageController',
            resolve: ['protect', function (protect) {
                return protect.protect()
            }]
        })
        .when('/message/:details', {
            templateUrl: 'views/messageDetails.html',
            controller: 'detailsController',
            resolve: ['protect', function (protect) {
                return protect.protect()
            }]
        })
        .when('/logout', {
            templateUrl: 'views/logout.html',
            controller: 'logoutController',
            // resolve: ['protect', function (protect) {
            //     return protect.protect()
            // }]
        }).otherwise('/')
})

app.factory('protect', function ($location, $window) {
    return {
        protect: function () {
            if (!$window.localStorage.getItem('Logged_in')) {
                $location.path(["/login"])
            }

        }
    }
})

app.factory('AuthService', function ($http) {

    return {
        getusers: function () {
            return $http.get("http://localhost:3000/user/getallusers")
        },
        getmessages: function () {
            return $http.get("http://localhost:3000/message/getallmessage")
        }
    }

})

app.controller('mainController', function ($scope) {

    $scope.logged_out = true;
    $scope.logged_in = false;
    // $scope.user = $window.localStorage.getItem("Logged_in");

    if ($scope.user == "") {
        $scope.logged_out = true;
        $scope.logged_in = false;
    } else {
        $scope.logged_out = false;
        $scope.logged_in = true;
    }

    $scope.$on("logging_in", function (event, obj) {
        console.log(obj.username);
        if (obj.username) {
            $scope.logged_out = false;
            $scope.logged_in = true;
        }
    })
    $scope.logout = function () {
        $scope.logged_out = true;
        $scope.logged_in = false;
    }

    //     $scope.isActive = function(viewLocation)
    // {
    //     console.log(viewLocation);
    //     console.log(viewLocation===$location.path());
    //     return viewLocation ===$location.path();
    // }
})

app.controller('signupController', function ($scope, $location, $http) {
    $scope.register = function () {

        if ($scope.username != undefined && $scope.password != undefined && $scope.fname != undefined && $scope.lname != undefined && $scope.phone != undefined && $scope.gender != undefined) {

            $scope.store = {
                "username": $scope.username,
                "password": $scope.password,
                "fname": $scope.fname,
                "Lname": $scope.lname,
                "phone": $scope.phone,
                "gender": $scope.gender
            }
            $http.post("http://localhost:3000/user/save_user", $scope.store)
                .then(function (resp) {
                    console.log("success")
                }, function errorCallback() {
                    console.log("failed")
                })
            $location.path(['/login'])
        } else {

            $scope.error = '*Enter all the fields'
            $location.path(['/signup'])

        }
    }
})

app.controller('loginController', function ($scope, $location, AuthService, $window) {

    $scope.login = function () {

        AuthService.getusers().then(function (res) {

            $scope.username = res.data;

            $scope.filter = $scope.username.filter(function (user) {
                return $scope.username == user.username && $scope.password == user.password
            })

            if ($scope.filter.length) {

                $window.localStorage.setItem('Logged_in', $scope.filter[0].username);
                $scope.$emit("logging_in", { username: $scope.filter });
                $location.path(['/home']);

            }
            else {
                $scope.error = '*Invalid credentials.Try again!!'

            }
        })
            .catch(function (err) {
                $scope.user = [];
                console.log(err);
            })

    }

})

app.controller('homeController', function ($scope, $window) {

    $scope.heading = $window.localStorage.getItem('Logged_in') || ""

})

app.controller('messageController', function ($scope, $window, AuthService, $http, $routeParams) {
    $scope.loginuser = $window.localStorage.getItem('Logged_in');

    AuthService.getmessages().then(function (res) {
        $scope.message = res.data;

        $scope.filter = $scope.message.filter(function (message) {
            return message.receiver == $scope.loginuser
        })
        $scope.urmsg = $scope.filter
        // window.localStorage.setItem('Messages', JSON.stringify($scope.filter))
    })


    $scope.remove = function (item) {
        console.log(item._id);
        // alert('Are you sure you want to delete?');
        $http({
            url: 'http://localhost:3000/message/delete/' + item._id,
            method: 'DELETE'
        }).then(function () {
            AuthService.getmessages().then(function (res) {
                $scope.message = res.data;
                $scope.filter = $scope.message.filter(function (message) {
                    return message.receiver == $scope.loginuser
                })
                $scope.urmsg = $scope.filter;

            })
        }).catch(function (error) {
            console.log(error);

        })
    }


    $scope.update = function (properties) {

        if ($scope.filter[$scope.filter.indexOf(properties)].important == "yes") {
            $scope.filter[$scope.filter.indexOf(properties)].important = "no"
        }
        else {
            $scope.filter[$scope.filter.indexOf(properties)].important = "yes"
        }

    }

})

app.controller('detailsController', function ($scope, $routeParams, $location, $window, $http, AuthService, $rootScope) {

    $scope.loginuser = $window.localStorage.getItem('Logged_in') || ""
    // $scope.msg = JSON.parse($window.localStorage.getItem('Messages')) || [];

    AuthService.getmessages().then(function (res) {
        $scope.message = res.data;

        $scope.filter = $scope.message.filter(function (message) {
            return message.receiver == $scope.loginuser
        })
        $scope.showdetails = $scope.filter[$routeParams.details]
    }).catch(function (err) {
        console.log(err);
    })



    $scope.back = function () {
        $location.path(['/message'])
    }

    $scope.send = function () {
        // $scope.username = $window.localStorage.getItem('Logged_in') || ""

        $scope.newMsg =
            {
                "sender": $scope.loginuser,
                "message": $scope.sendermsg,
                "receiver": $scope.showdetails.sender,
                "important": "no"
            }

        $http.post("http://localhost:3000/message/save_message", $scope.newMsg)
            .then(function () {
                AuthService.getmessages().then(function (res) {
                    res.sender = $scope.loginuser
                }).catch(function (err) {
                    console.log('error occured!!' + err)
                })
                alert('message sent!!')
            }).catch(function (err) {
                console.log('error occured!!' + err)
                alert('The input field should not be empty')
            })
    }
})
app.controller('logoutController', function ($window, $location) {
    $location.path(['/login'])
    $window.localStorage.setItem("Logged_in", "");

})
