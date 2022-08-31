var app = angular.module('myApp', ['ngRoute'])

app.controller('appCtrl', function ($scope, $http, $interval) {
  
  $http.get("data.json").then(function (response) {
    $scope.product = response.data.festival
    $scope.account = response.data.account
    $scope.religions = response.data.religion
    $scope.nations = response.data.nation
  })

  $scope.reliFilter = function (id){
    // alert(id)
    $scope.religionsId = id;
    $scope.relisfilter = function(product){
      if(product.rel_id == $scope.religionsId){
        return product;
      }
    }
  }

  $scope.nationFilter = function (id){
    $scope.nationId = id;
    $scope.nationfilter = function(product){
      if(product.nation_id == $scope.nationId){
        return product;
      }
    }
  }

  $scope.status = false;
  $scope.filterMonth = function(month){
    $scope.time = +month;
    $scope.monthfilter = function(product){
      if($scope.time < 1 || $scope.time > 12){
        $scope.status = true;
        // return product;
      }
      if($scope.time == product.time_id){
        $scope.status = false;
        return product;
      }
    }
  }

  $scope.reload = () => {
    window.location.reload();
  }

  var controller = this;
  controller.date = new Date();
  $interval(function(){
    controller.date = new Date()
  }, 1000)

  $interval(function(){
    window.location.href = window.location.href + "?rnd=" + Math.random()
  }, 1800000)
})
  
app.controller("detailCtrl", function($scope, $routeParams, $location, $http){
  console.log($routeParams.id)
  $scope.uid = $routeParams.id;
  $http.get("data.json")
  .then((response) => {
    $scope.religions = response.data.religion;
    $scope.festivals = response.data.festival;
  })
})
// Register Services
app.controller(
  "registerController",
  function ($scope, $routeParams, $location, $http) {
    $scope.match = function () {
      $scope.isMatch = angular.equals($scope.pass, $scope.PASS);
    };
    console.log($scope.isMatch);
    $scope.emails = {
      EMAIL_FORMAT: /^\w+([\.-]?\w+)*@(list.)?gmail.com+((\s*)+,(\s*)+\w+([\.-]?\w+)*@(list.)?gmail.com)*$/,
      EMAIL_FORMAT_HELP: "Email... Ex: example@example.com",
    };

    $scope.register = function (name, email, pass, PASS) {
      $scope.users = JSON.parse(localStorage.getItem("user") || "[]");
      $scope.data = {
        name,
        email,
        pass,
        PASS,
      };
      if (!name || !email || !pass || !PASS || angular.equals($scope.pass, $scope.PASS) == false) {
        alert("Name, Email and Password must be provided");
      } else {
        $scope.users.push($scope.data);
        localStorage.setItem("user", JSON.stringify($scope.users));
        alert("Register Successfully");
        console.log($scope.users);
        $location.path("/login");
      }
    };
  }
);

// Login Services
app.controller("loginController", function ($scope, $location) {
  $scope.lgs = JSON.parse(localStorage.getItem("user") || "[]");
  
  $scope.login = function (name, pass) {
    $scope.lgs.map((item) => {
      $scope.lg = item;
    })
    if (
      $scope.lg.name !== name ||
      $scope.lg.pass !== pass ||
      !$scope.lg.name ||
      !$scope.lg.pass
    ) {
      alert("Invalid ");
    } else {
      $location.path("/");
      alert("Login Successfully");
    }
  }
});
app.config(function ($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "view/home.html"
    })
    .when("/festival", {
      templateUrl: "view/festival.html"
    })
    .when("/news", {
      templateUrl: "view/news.html"
    })
    .when("/tour", {
      templateUrl: "view/tour.html"
    })
    .when("/contact", {
      templateUrl: "view/contact.html"
    })
    .when("/login", {
      templateUrl: "view/login.html"
    })
    .when("/register", {
      templateUrl: "view/register.html"
    })
    .when("/detail/:id",{
      templateUrl: "view/detail.html"
    })
})