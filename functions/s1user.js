var db = require( '../db.js' );
var stage2func = require( './stage2.js' );
var stage1func = require( './stage1spill.js' );
var fillup = require( './withsponsor.js' );
exports.s1user = function(x, res){
		db.query('SELECT parent.sponsor, parent.user FROM user_tree AS node, user_tree AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? AND parent.stage1 is not null ORDER BY parent.lft', [x], function(err, results, fields){
			if( err ) throw err;
			console.log(results)
			var last1 = results.slice( -2 )[0];
			var s1user = last1.user;
			var s1spon = last1.sponsor;
			console.log(last1);
			db.query ('SELECT * FROM stage1_tree WHERE a = ? or b  = ? or c  = ? or d  = ?', [s1user, s1user, s1user, s1user], function(err, results, fields){
	 	if (err) throw err;
		if (results.length === 0){
			console.log('s2user has not entered a or b or c or d yet');
		}else{
	 		var user = {
	 			user: results[0].user,
			  	a: results[0].a,
			  	b: results[0].b,
			  	c: results[0].c,
			  	d: results[0].d,
			  	aa: results[0].a,
			  	ab: results[0].b,
		 		ac: results[0].c,
			  	ad: results[0].d,
			  	ba: results[0].a,
			  	bb: results[0].b,
			  	bc: results[0].c,
			  	bd: results[0].d,
			  	ca: results[0].a,
			  	cb: results[0].b,
			  	cc: results[0].c,
			  	cd: results[0].d,
		 		da: results[0].a,
			  	db: results[0].b,
			  	dc: results[0].c,
			  	dd: results[0].d
			 }
			 console.log(user)
			db.query('SELECT * FROM stage1_tree WHERE user = ?', [s1user], function(err, results, fields){
				if (err) throw err;
				var stage1  = {
					a: results[0].a,
					b: results[0].b,
					c: results[0].c,
					d: results[0].d,
					aa: results[0].a,
					ab: results[0].b,
					ac: results[0].c,
					ad: results[0].d,
					ba: results[0].a,
					bb: results[0].b,
					bc: results[0].c,
					bd: results[0].d,
					ca: results[0].a,
					cb: results[0].b,
					cc: results[0].c,
					cd: results[0].d,
					da: results[0].a,
					db: results[0].b,
					dc: results[0].c,
					dd: results[0].d
				}
				if(stage1.a === null && stage1.b === null && stage1.c === null && stage1.d === null){
					db.query('UPDATE stage1_tree SET a = ? WHERE user = ?', [x, s1user], function(err, results, fields){
						if(err) throw err;
														//call the procedure for adding
						db.query('CALL stage1in(?,?,?)', [s1spon, s1user, x], function(err, results, fields){
							if (err) throw err;
							fillup.fillup(x);
							if(user.a !== null && user.b !== null && user.c !== null && user.a.d !== null && user.aa !== null && user.ab !== null && user.bc !== null && user.bd !== null && user.ca !== null && user.cb !== null && user.cc !== null && user.cd !== null && user.da !== null && user.db !== null && user.dc !== null && user.dd !== null){
					db.query('Update user_tree set stage2 = ? WHERE user = ?', ['yes', user.user], function(err, results, fields){
							if (err) throw err;
							db.query('SELECT balance FROM transactions WHERE user = ?', [user.user], function(err, results, fields){
                    				if( err ) throw err;
                    				var las = results.slice(-1)[0];
                    				var balance = las.balance;
										//call function for stage 2 to 4
										s2func.restmatrix(user.user, res, balance);
										});
										});
				}else{
							res.render('register', {title: 'Successful Entrance'});
							}
						});
					});
				}
				if(stage1.a !== null && stage1.b === null && stage1.c === null && stage1.d === null){
					 //update into the sponsor set
					 db.query('UPDATE stage1_tree SET b = ? WHERE user = ?', [x, s1user], function(err, results, fields){
					 	if(err) throw err;
						//call the procedure for adding
						db.query('CALL stage1in(?,?,?)', [s1spon, s1user, x], function(err, results, fields){												
							if (err) throw err;
							fillup.fillup(x);
							if(user.a !== null && user.b !== null && user.c !== null && user.a.d !== null && user.aa !== null && user.ab !== null && user.bc !== null && user.bd !== null && user.ca !== null && user.cb !== null && user.cc !== null && user.cd !== null && user.da !== null && user.db !== null && user.dc !== null && user.dd !== null){
					db.query('Update user_tree set stage2 = ? WHERE user = ?', ['yes', user.user], function(err, results, fields){
							if (err) throw err;
							db.query('SELECT balance FROM transactions WHERE user = ?', [user.user], function(err, results, fields){
                    				if( err ) throw err;
                    				var las = results.slice(-1)[0];
                    				var balance = las.balance;
										//call function for stage 2 to 4
										s2func.restmatrix(user.user, res, balance);
										});
										});
				}else{
							res.render('register', {title: 'Successful Entrance'});
							}
						});
					});
				}
				if(stage1.a !== null && stage1.b !== null && stage1.c === null && stage1.d === null){
					db.query('UPDATE stage1_tree SET c = ? WHERE user = ?', [x, s1user], function(err, results, fields){
						if( err ) throw err;
						db.query('CALL stage1in(?,?,?)', [s1spon, s1user, x], function(err, results, fields){
							if( err ) throw err;
							fillup.fillup(x);
							if(user.a !== null && user.b !== null && user.c !== null && user.a.d !== null && user.aa !== null && user.ab !== null && user.bc !== null && user.bd !== null && user.ca !== null && user.cb !== null && user.cc !== null && user.cd !== null && user.da !== null && user.db !== null && user.dc !== null && user.dd !== null){
					db.query('Update user_tree set stage2 = ? WHERE user = ?', ['yes', user.user], function(err, results, fields){
							if (err) throw err;
							db.query('SELECT balance FROM transactions WHERE user = ?', [user.user], function(err, results, fields){
                    				if( err ) throw err;
                    				var las = results.slice(-1)[0];
                    				var balance = las.balance;
										//call function for stage 2 to 4
										s2func.restmatrix(user.user, res, balance);
										});
										});
				}else{
							res.render('register', {title: 'Successful Entrance'});
							}
						});
					});
				}
				if(stage1.a !== null && stage1.b !== null && stage1.c !== null && stage1.d === null){
					db.query('UPDATE stage1_tree SET d = ? WHERE user = ?', [x, s1user], function(err, results, fields){
						if(err) throw err;
						
							db.query('CALL stage1in(?,?,?)', [s1spon, s1user, x], function(err, results, fields){
								 if (err) throw err;
								 fillup.fillup(x);
							if(user.a !== null && user.b !== null && user.c !== null && user.a.d !== null && user.aa !== null && user.ab !== null && user.bc !== null && user.bd !== null && user.ca !== null && user.cb !== null && user.cc !== null && user.cd !== null && user.da !== null && user.db !== null && user.dc !== null && user.dd !== null){
					db.query('Update user_tree set stage2 = ? WHERE user = ?', ['yes', user.user], function(err, results, fields){
							if (err) throw err;
							db.query('SELECT balance FROM transactions WHERE user = ?', [user.user], function(err, results, fields){
                    				if( err ) throw err;
                    				var las = results.slice(-1)[0];
                    				var balance = las.balance;
										//call function for stage 2 to 4
										s2func.restmatrix(user.user, res, balance);
										});
										});
				}else{
							res.render('register', {title: 'Successful Entrance'});
							}
							 
					});
				});
				}
				if(stage1.a !== null && stage1.b !== null && stage1.c !== null && stage1.d !== null){
					//call function for stage 2 spill
					stage1func.stage1spill( x, s1user, s1spon, res );
				}
				
				});
			}
		});
	});
}