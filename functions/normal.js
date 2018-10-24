var s1userfunc = require( './s1user.js' );
var feederfunc = require( './feederspill.js' );
exports.normal = function normal(x, res){
	var db = require( '../db.js' );
	db.query('SELECT parent.sponsor, parent.user FROM user_tree AS node, user_tree AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? AND parent.feeder is not null ORDER BY parent.lft', [x], function(err, results, fields){
	if( err ) throw err;
	var last = results.slice(-1)[0];
    var user = last.user;
    var y = last.sponsor;
    //console.log(last);
    	db.query ('SELECT * FROM feeder_tree WHERE user = ?', [user], function(err, results, fields){
	 		if (err) throw err;
	 		if (results.length === 1){
	 			var first = {
			  		a: results[0].a,
			  		b: results[0].b,
			  		c: results[0].c,
			  		d: results[0].d
				 }
				 if(first.a === null && first.b === null && first.c === null && first.d === null){
					db.query('UPDATE feeder_tree SET a = ? WHERE user = ?', [x, user], function(err, results, fields){
						if(err) throw err;
						db.query('CALL leafadd(?,?,?)', [y, user, x], function(err, results, fields){
				  			if (err) throw err;
				  			res.render('register', {title: 'Successful Entrance'});
				  		});
					});
				 } 
				 if(first.a !== null && first.b === null && first.c === null && first.d === null){
				 	db.query('UPDATE feeder_tree SET b = ? WHERE user = ?', [x, user], function(err, results, fields){
						if(err) throw err;
						db.query('CALL leafadd(?,?,?)', [y, user, x], function(err, results, fields){
				  			if (err) throw err;
							res.render('register', {title: 'Successful Entrance'});
						});
					}); 
				 }
				 if(first.a !== null && first.b !== null && first.c === null && first.d == null){
				 	db.query('UPDATE feeder_tree SET c = ? WHERE user = ?', [x, user], function(err, results, fields){
						if(err) throw err;
						db.query('CALL leafadd(?,?,?)', [y, user, x], function(err, results, fields){
				  			if (err) throw err;
				  			res.render('register', {title: 'Successful Entrance'});
				  		});
					});
				 } 
				 if(first.a !== null && first.b !== null && first.c !== null && first.d === null){
				 	db.query('CALL feederAmount(?)', [user], function(err, results, fields){
						if (err) throw err;
						db.query('Update user_tree set stage1 = ? WHERE user = ?', ['yes', user], function(err, results, fields){
							if (err) throw err;
							db.query('UPDATE feeder_tree SET d = ? WHERE user = ?', [x, user], function(err, results, fields){
								if(err) throw err;
								db.query('CALL leafadd(?,?,?)', [y, user, x], function(err, results, fields){
									if (err) throw err;
									//import function to the s1user here
									s1userfunc.s1user(user, res);
									
								});	
							});
					  	});
					}); 
				 }
				//if the first is not null
				if(first.a !== null && first.b !== null && first.c !== null && first.d !== null){
					feederfunc.feederspill(x, user, y, res);
				}				 
			}
		});
	});
}