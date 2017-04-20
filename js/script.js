 var index = 0;
 jQuery.noConflict();
 var pim = angular.module('pim', [ 'socket.io','ngRoute' ]);

// pim.config(function ($socketProvider) {
//     $socketProvider.setConnectionUrl('http://192.168.1.3:3001');
// });


pim.factory('sock', function(){
    var socket = io.connect('http://192.168.1.3:3001')
   // console.log(socket);
    return socket;
});


pim.controller('GeneralController', ['$scope', '$interval','$http','sock' ,  function GeneralController($scope,$interval,$http, $socket,sock) {
$scope.msg = [];
$scope.TicketWaiting = 0;
$scope.tickets = [];
$scope.test = 0;
var socket = io();
    
    $scope.TicketWaitings = 0;
          socket.on('refresh feed',function(msg){
           //console.log("de angularrrrr le test du socket",msg);
            if(msg.length == 0){
                $scope.tickets = [{
                    ticket_number: 'not set',
                    window_number: 'not set',
                    service: 'not set'
                }];
            }else{
                $scope.tickets = msg;
            }
              
          });
    
          socket.on('waiting',function(msg){
          $scope.TicketWaitings = msg[0].num;
          });

    
    
      socket.on('count ticket',function(msg){
          //console.log(msg.user[0].num);
          $scope.test = msg.user[0].num;
      });

      $scope.$watchCollection(
                      "test",
                      function( newValue, oldValue ) {
                          $scope.test = newValue;
                      }
                  );


// $http.get("http://192.168.1.100:8080/smart_queue/public/api/ticket_windows/status?office_id=1").success(function(data){
//         $scope.tickets = data;
//         console.log("lkgmbflkgbmflkgbm",data);
//     });

// var socket = io( 'http://192.168.1.100:8080/smart_queue/public/api/ticket_windows/status?office_id=1' );
//
//sock.on('get data', function(data){
//    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",data);
//    // msg = data;
//    // $scope.$digest();
//});


      // socket.on( 'connect', function() {
      //   var data = {
      //     url: window.location.href,
      //     touch: "test",
      //     video: "blaaa"
      //   };

      // } );

// socket.emit( 'client-data', $scope.tickets );
// socket.on( 'connection', function( socket ) {
//   socket.on( 'client-data', function( $scope.tickets ) {
//     console.log( $scope.tickets );
//   } );
// } );



//console.log("asascasdvfvdfbfgb",$scope.tickets);
$scope.news = [
        {
            'desc': 'Les protestations ont repris ce matin 29 mars 2017 à Tataouine avec la tenue d’un rassemblement protestataire devant le siège de la délégation de Bir Lahmar'
        },
        {
            'desc': 'L’administrateur général de la maison de retraite de Sfax, Mohamed Bouazizi accuse Naziha Laâbidi de négligence financière et logistique'
        },
        {
            'desc': 'Les manifestations à la région de Maztouria à la délégation de Tataouine du Sud ont repris dans la soirée du mardi 28 mars 2017.'
        },
        {
            'desc': 'Un groupe de jeunes originaires du gouvernorat de Kasserine viennent d’achever la transformation d’un bâtiment délaissé au centre de la ville en salle de Cinéma.'
        }
    ];


//             $.getJSON("http://192.168.1.100:8080/smart_queue/public/api/ticket_windows/status?office_id=1", function(ret){
//            $scope.tickets = ret;
//            console.log("111",ret);
//
//          }.bind(this));
//
//             $.getJSON("http://192.168.1.100:8080/smart_queue/public/api/tickets/waiting?office_id=1", function(ret){
//            $scope.TicketWaiting = ret;
//            console.log("waiting",ret);
//
//          }.bind(this));
//
//     // $.getJSON("http://192.168.137.1:8080/smart_queue/public/api/ticket_windows/status?office_id=1", function(ret){
//     //        $scope.tickets = ret;
//     //        console.log("windows service",ret);
//
//     //      }.bind(this));
//
//    $scope.$watchCollection(
//                    "tickets",
//                    function( newValue, oldValue ) {
//                        $.getJSON("http://192.168.1.100:8080/smart_queue/public/api/ticket_windows/status?office_id=1", function(ret){
//                            $scope.tickets = ret;
//                            console.log("windows service",ret);
//
//                        }.bind(this));
//                    }
//                );
//
//     // $.getJSON("http://192.168.1.100:8080/smart_queue/public/api/ticket_windows/status?office_id=1", function(ret){
//     //        $scope.tickets = ret;
//     //        console.log("windows service",ret);
//
//     //      }.bind(this));
//
//    $scope.$watchCollection(
//                    "TicketWaiting",
//                    function( newValue, oldValue ) {
//                        $.getJSON("http://192.168.1.100:8080/smart_queue/public/api/tickets/waiting?office_id=1", function(ret){
//                            $scope.TicketWaiting = ret;
//                            console.log("waiting",ret);
//
//                          }.bind(this));
//                    }
//                );
//
//
//$interval(function() {
//            $scope.times =  new moment().format('LTS');
//            }, 1000);
//
//$scope.day = new moment().format('dddd');
//
//$scope.date =  new moment().format('LL');


  //   c.get("http://www.mosaiquefm.net/smart/newscast.xml?Cat=2",
  //           {
  //   transformResponse: function (cnv) {
  //     var x2js = new X2JS();
  //     var aftCnv = x2js.xml_str2json(cnv);
  //     return aftCnv;
  //   }
  // })
  //   .success(function (response) {
  //   console.log(response);
  // });


$scope.conditions = ['pub', 'screen'];
$scope.selection = $scope.conditions[index];
$interval(function(){

    if(index == 0){
        index++;

        //console.log("------"+index);

    }else{
        index = 0;
        //console.log("------"+index);
    }
    $scope.selection = $scope.conditions[index];
    //console.log("------"+$scope.selection);

}, 10000);

  // var index = changeView(index);
  // console.log("//////"+i);

  function changeView(index){
    if(index == 0){
        index++;
        //console.log("------"+index);
    }else{
        index = 0;
       // console.log("------"+index);
    }
    return index;
 }

}]);


//pim.service('GuicherAPI', function($http) {
//  var donne = [];
//
//  donne.getDataTW = function() {
//
//    console.log("--------------",$http.jsonp("http://192.168.137.1:8080/smart_queue/public/api/ticket_windows/status?office_id=1"));
//    return $http.jsonp("http://192.168.137.1:8080/smart_queue/public/api/ticket_windows/status?office_id=1");
//  };
//  console.log("=====",donne.getDataTW());
//  return donne;
//});
//
//
//pim.service('WeatherAPI', function($http) {
//  var data = {};
//
//  data.getLocation = function() {
//    return $http.jsonp("http://ip-api.com/json?callback=JSON_CALLBACK");
//  };
//
//  data.getWeather = function(city) {
//    return $http.jsonp("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=58858ca5e7596d7affb365733faaa48b&units=metric&callback=JSON_CALLBACK");
//  };
//console.log("testt",data);
//  return data;
//});
//
//
//pim.controller('WeatherCtrl', function($scope, WeatherAPI,GuicherAPI,$http) {
//
//  $scope.data = {
//    'location': [],
//    'temp': '',
//    'temp_c': '',
//    'temp_f': '',
//    'unit': '',
//    'city': '',
//    'weatherinfo': '',
//    'time': '',
//    'checked': false
//  };
//   $scope.donne = [];
//  console.log($scope.data);
//  $scope.switchUnit = function(){
//
//    if($scope.data["unit"].toLowerCase() == "c"){
//      $scope.data["unit"] = 'F';
//      $scope.data['temp'] = $scope.data['temp_f'];
//    } else{
//      $scope.data["unit"] = 'C';
//      $scope.data['temp'] = $scope.data['temp_c'];
//    }
//  }
//
//
//
//   $scope.getdataTW = function(){
//    var t = [];
//     // $.getJSON("http://localhost:8080/testing/get_Ticket.php", function(tickets){
//     //        $scope.tickets = tickets;
//     //      }.bind(this));
//     // console.log($scope.tickets);
//
//     // GuicherAPI.getDataTW().then(function(result){
//     //   console.log("hhhhhh",result.donne[0]);
//
//
//     // $http.get("http://localhost:8080/smart_queue/public/api/ticket_windows/status?office_id=1").success(function (data)
//     //  {
//     //     $scope.donne = data;
//     //     console.log("users" , data);
//     //     console.log("donne" , $scope.donne);
//     //     return $scope.donne;
//     //  });
//$.getJSON("http://192.168.137.1:8080/smart_queue/public/api/ticket_windows/status?office_id=1", function(ret){
//            this.t = ret;
//            console.log("acacad",ret);
//
//          }.bind(this));
//     //  for (var i = result.length - 1; i >= 0; i--) {
//     //    console.log(result);
//     //   $scope.donne[i].service = result[i].service;
//     //  };
//     // });
//     // console.log($scope.donne);
//  // })
//return t;
//   };
//
//  $scope.refresh = function() {
//    WeatherAPI.getLocation().then(function(result) {
//
//      //$scope.data["location"] = result.data.loc.split(',');
//
//      WeatherAPI.getWeather(result.data.regionName).then(function(res) {
//        $scope.data['city'] = res.data.name;
//        $scope.data['temp'] = Math.round(res.data.main.temp, 2);
//        $scope.data['temp_c'] = Math.round(res.data.main.temp, 2);
//        $scope.data['temp_f'] = Math.round((res.data.main.temp * 9) / 5 + 32);;
//        $scope.data['unit'] = 'C';
//        $scope.data['weather'] = res.data.weather[0].main.toLowerCase();
//        $scope.data['weatherinfo'] = res.data.weather[0].description;
//        $scope.data['time'] = Date().substr(0, 10);
//        $scope.data['checked'] = false;
//      });
//    });
//    console.log($scope.data);
//  };
//
//  $scope.refreshTicket = function(){
//    var t = $scope.getdataTW();
//    console.log("bbbbb");
//    console.log($scope.getdataTW());
//  }
//
//  $scope.refresh();
//  $scope.getdataTW();
//  $scope.refreshTicket();
//  console.log("testttttt",$scope.donne);
//
//
//});
//
//
//
//
//pim.controller('Ctrl',['$scope', 'Tickets', 'socket.io',  function Ctrl($scope,Tickets, $socket) {
//
//    $socket.on('echo', function (data) {
//        $scope.serverResponse = data;
//        $scope.tickets = Tickets.query();
//        console.log("////////////////// ",$scope.tickets );
//    });
//    $socket.emit('echo', $scope.dataToSend, function (data) {
//            //se nao tivesse sido feito $apply
//            //a variavel $scope não seria reconhecida
//            $scope.tickets = Tickets.query();
//        });
//
//    $scope.emitBasic = function emitBasic() {
//        console.log('echo event emited');
//        $socket.emit('echo', $scope.dataToSend);
//        $scope.dataToSend = '';
//    };
//
//    $scope.emitACK = function emitACK() {
//        $socket.emit('echo-ack', $scope.dataToSend, function (data) {
//            //se nao tivesse sido feito $apply
//            //a variavel $scope não seria reconhecida
//            $scope.serverResponseACK = data;
//        });
//        $scope.dataToSend = '';
//    };
//}]);
//
//
//
//
// pim.controller('DashboardCtrl', ['$scope', 'Tickets', 'socket.io', function ($scope, Tickets, $socket) {
//        'use strict';
//
//        $scope.tickets = Tickets.query();
//
//        $socket.on('ticket', function (msg) {
//            $scope.tickets.push(msg);
//        });
//    }]);
//   pim.controller('CreateCtrl', ['$scope', '$location', 'Tickets', function ($scope, $location, Tickets) {
//        'use strict';
//
//        $scope.save = function (newTicket) {
//            Tickets.save(newTicket);
//            $location.path('/');
//        };
//
//
//        $scope.cancel = function () {
//            $location.path('/');
//        };
//
//    }]);
//   pim.config(['$routeProvider', function ($routeProvider) {
//        'use strict';
//
//        $routeProvider
//            .when('/new', {
//                controller: 'DashboardCtrl',
//                templateUrl: 'ticket.html'
//            })
//            .otherwise({
//                redirectTo: '/'
//            });
//    }]);
    // pim.filter('reverse', function () {
    //     'use strict';

    //     return function (items) {
    //         return items.slice().reverse();
    //     };
    // });
    // From http://briantford.com/blog/angular-socket-io
//    pim.factory('socket.io', ['$rootScope', function ($rootScope) {
//        'use strict';
//
//        var socket = io.connect();
//        return {
//            on: function (eventName, callback) {
//                socket.on(eventName, function () {
//                    var args = arguments;
//                    $rootScope.$apply(function () {
//                        callback.apply(socket, args);
//                    });
//                });
//            },
//            emit: function (eventName, data, callback) {
//                socket.emit(eventName, data, function () {
//                    var args = arguments;
//                    $rootScope.$apply(function () {
//                        if (callback) {
//                            callback.apply(socket, args);
//                        }
//                    });
//                });
//            }
//        };
//    }]);
