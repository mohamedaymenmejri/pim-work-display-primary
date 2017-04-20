var express = require('express');
var app = express();
var http = require('http');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path	=	require("path");
var mysql	=	require("mysql");
var router	=	express.Router();

require('events').EventEmitter.defaultMaxListeners = Infinity;

app.use(express.static(__dirname));

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
// var getJSON = require('get-json')
//var request = require("request")

var pool    =    mysql.createPool({
      connectionLimit   :   100,
      host              :   'localhost',
      user              :   'root',
      password          :   'aymen11859835',
      database          :   'smart_queue',
      debug             :   false
});


var url = "http://192.168.1.3:8080/smart_queue/public/api/ticket_windows/status?office_id=1"
var url1 = "http://192.168.1.6:8080/smart_queue/public/api/tickets/waiting?office_id=1"
var ticketInfo =[];


var donne = [
  {
    "service": "Vire",
    "member": "5ou5a zayati",
    "ticket_number": 1555,
    "window_number": 1
  },
  {
    "service": "Mandat bank",
    "member": "Mohamed Cherni",
    "ticket_number": 1,
    "window_number": 2
  },
  {
    "service": "Virement",
    "member": "Mouldi l Baney",
    "ticket_number": 1,
    "window_number": 3
  }
]


router.get('/',function(req,res){
	res.sendFile(__dirname + '/index.html');
});




router.get('/getStatus',function(req,res){
	pool.getConnection(function(err,connection){
		if(err) {
			return res.json({"error" : true,"message" : "Error in database."});
		} else {
			var sqlQuery = "SELECT * FROM ??";
			var inserts = ["UserPost"];
			sqlQuery = mysql.format(sqlQuery,inserts);
			connection.query(sqlQuery,function(err,rows){
				connection.release();
				if(err) {
					return res.json({"error" : true,"message" : "Error in database."});
				} else {
					res.json({"error" : false,"message" : rows});
				}
			});
		}
		connection.on('error', function(err) {
			return res.json({"error" : true,"message" : "Error in database."});
        });
	});
});





app.use('/',router);

io.on('connection',function(socket){
//	console.log('We have user connected !');
//    console.log('sdsdvsdv !');

//    var i = 0;

  setInterval(function() {
//      i = i + 1;
//      console.log("test marche depuit"+ i);
      getDataTicket(function(error,result){

			if(error) {
				io.emit('error');
			} else {
//				io.emit("count ticket", result);
                
                io.emit('refresh feed',result);
                
			}
		});
    }, 100);

    setInterval(function() {
      
      getDataTicketwaiting(function(error,result){

			if(error) {
				io.emit('error');
			} else {
                
                io.emit('waiting',result);
                
			}
		});
      
    }, 100);
//	socket.on('comment added',function(data){
//         console.log(data);
//		addComment(data.user,data.comment,function(error,result){
//
//			if(error) {
//				io.emit('error');
//			} else {
//				io.emit("notify everyone",{user : data.user,comment : data.comment});
//			}
//		});
//
//
//      getDataTicket(function(error,result){
//
//			if(error) {
//				io.emit('error');
//			} else {
//				io.emit("count ticket",{user : result ,comment : "data.comment"});
//			}
//		});
//
//
//	});

});

//var addComment = function(user,comment,callback) {
//	var self = this;
//	pool.getConnection(function(err,connection){
//		if(err) {
//			return callback(true,null);
//		} else {
//			var sqlQuery = "INSERT into ?? (??,??,??) VALUES ((SELECT ?? FROM ?? WHERE ?? = ?),?,?)";
//			var inserts = ["UserComment","UserId","UserName","Comment","UserId","User","UserName",user,user,comment];
//			sqlQuery = mysql.format(sqlQuery,inserts);
//			connection.query(sqlQuery,function(err,rows){
//				connection.release();
//				if(err) {
//					return callback(true,null);
//				} else {
//					callback(false,"comment added");
//				}
//			});
//		}
//		connection.on('error', function(err) {
//			return callback(true,null);
//        });
//	});
//}

var getDataTicket = function(callback) {
	var self = this;
	pool.getConnection(function(err,connection){
		if(err) {
			return callback(true,null);
		} else {
    var office_id = 1;
			var sqlQuery = "SELECT a.number as ticket_number, b.number as window_number, c.name as service"
            +" From ?? a"
            +" Inner JOIN ticket_windows b"
            +" On a.ticket_window_id = b.id"
            +" Inner JOIN services c"
            +" On b.service_id = c.id"
            +" WHERE a.office_id = "+office_id
            +" AND a.status = 'in_service'"
            +" AND b.office_id = "+office_id
            +" AND b.status = 'Online'"
            +" AND b.service_id IN (SELECT id from services WHERE company_id = "+office_id+" )"
            +" AND DATE_FORMAT(a.created_at,'%Y%c%d') = DATE_FORMAT(now(),'%Y%c%d')";
            
			var inserts = ["tickets"];
			sqlQuery = mysql.format(sqlQuery,inserts);
			connection.query(sqlQuery,function(err,rows){
				connection.release();
				if(err) {
                   // console.log(err)
					return callback(true,null);
				} else {
                   
					callback(false,rows);
				}
			});
		}
		connection.on('error', function(err) {
			return callback(true,null);
        });
	});
}


var getDataTicketwaiting = function(callback) {
	var self = this;
	pool.getConnection(function(err,connection){
		if(err) {
			return callback(true,null);
		} else {

			var sqlQuery = "SELECT count(*) as num FROM ?? where status = 'waiting'";
			var inserts = ["tickets"];
			sqlQuery = mysql.format(sqlQuery,inserts);
			connection.query(sqlQuery,function(err,rows){
				connection.release();
				if(err) {
                    //console.log("aaaa");
					return callback(true,null);
				} else {
                   // console.log(rows);
					callback(false,rows);
				}
			});
		}
		connection.on('error', function(err) {
			return callback(true,null);
        });
	});
}

server.listen(3001, function(){
    console.log('Listening at port 3001');
});
