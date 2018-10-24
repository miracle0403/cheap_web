var s2func = require( './stage2.js' ); 
var fillup = require( './withsponsor.js' );
//var stage2func = require( '.stage2.js' ); 
var db = require( '../db.js' ); 
exports.stage1spill = function ( x, u, y, res){
	db.query ('SELECT * FROM stage1_tree WHERE user = ?', [u], function(err, results, fields){
	 	if (err) throw err;
		if (results.length === 1){
	 		var stage1 = {
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
	db.query('SELECT node.user,   (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth FROM  stage1 AS node, stage1 AS parent, feeder AS sub_parent, ( SELECT node.user, (COUNT(parent.user) - 1) AS depth FROM stage1 AS node, stage1 AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? GROUP BY node.user ORDER BY node.lft) AS sub_tree WHERE node.amount < 4 AND node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft sub_parent.user = sub_tree.user GROUP BY node.user HAVING depth > 0 ORDER BY depth', [u], function(err, results, fields){
		if( err ) throw err;
		var stage1depth = results[0].depth;
		//console.log( feederdepth );
		db.query('SELECT node.user,   (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth FROM stage1 AS node, a AS parent, a AS sub_parent, ( SELECT node.user, (COUNT(parent.user) - 1) AS depth FROM stage1 AS node, stage1 AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? GROUP BY node.user ORDER BY node.lft) AS sub_tree WHERE node.amount = 0 AND node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt AND sub_parent.user = sub_tree.user GROUP BY node.user HAVING depth > 0 ORDER BY depth', [u], function(err, results, fields){
			if (err) throw err;
			var stage11spill = {
				user: results[0].user,
				depth: results[0].depth,
				amount: results[0].amount
			}
			if (stage11spill.depth === stage1depth){
				//update into the sponsor set
				db.query('UPDATE stage1_tree SET a = ? WHERE user = ?', [x, stage11spill.user], function(err, results, fields){
					if(err) throw err;
					//call the procedure for addingp
					db.query('CALL stage1in(?,?,?)', [y, stage11spill.user, x], function(err, results, fields){
						if (err) throw err;
						fillup.fillup(x);
						if(stage1.a !== null && stage1.b !== null && stage1.c !== null && stage1.d !== null && stage1.aa !== null && stage1.ab !== null && stage1.bc !== null && stage1.bd !== null && stage1.ca !== null && stage1.cb !== null && stage1.cc !== null && stage1.cd !== null && stage1.da !== null && stage1.db !== null && stage1.dc !== null && stage1.dd !== null){
					db.query('Update user_tree set stage2 = ? WHERE user = ?', ['yes', u], function(err, results, fields){
							if (err) throw err;
							db.query('SELECT balance FROM transactions WHERE user = ?', [u], function(err, results, fields){
                    				if( err ) throw err;
                    				var las = results.slice(-1)[0];
                    				var balance = las.balance;
										//call function for stage 2 to 4
										s2func.restmatrix(u, res, balance);
										});
										});
				}else{						res.render('register', {title: 'Successful Entrance'});
				}
					});
				});																
			}
			else{
				//check for 1 amount
				db.query('SELECT node.user,   (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth FROM stage1 AS node, stage1 AS parent, stage1 AS sub_parent, ( SELECT node.user, (COUNT(parent.user) - 1) AS depth FROM stage1 AS node, stage1 AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? GROUP BY node.user ORDER BY node.lft) AS sub_tree WHERE node.amount = 1 AND node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt AND sub_parent.user = sub_tree.user GROUP BY node.user HAVING depth > 0 ORDER BY depth', [u], function(err, results, fields){ 
					if( err ) throw err;
					if ( results.length === 0 ){
						//what happens if no 1. go to two
						db.query('SELECT node.user,   (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth FROM stage1 AS node, stage1 AS parent, stage1 AS sub_parent, ( SELECT node.user, (COUNT(parent.user) - 1) AS depth FROM stage1 AS node, stage1 AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? GROUP BY node.user ORDER BY node.lft) AS sub_tree WHERE node.amount = 2 AND node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt AND sub_parent.user = sub_tree.user GROUP BY node.user HAVING depth > 0 ORDER BY depth', [u], function(err, results, fields){	
							if( err ) throw err;
							if( results.length === 0 ){
								// what to do. go to 3 amount
								db.query('SELECT node.user,   (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth FROM stage1 AS node, stage1 AS parent, stage1 AS sub_parent, ( SELECT node.user, (COUNT(parent.user) - 1) AS depth FROM stage1 AS node, stage1 AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? GROUP BY node.user ORDER BY node.lft) AS sub_tree WHERE node.amount = 3 AND node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt AND sub_parent.user = sub_tree.user GROUP BY node.user HAVING depth > 0 ORDER BY depth', [u], function(err, results, fields){
											if( err ) throw err;
											var stage14spill = {
												user: results[0].user,
												depth: results[0].depth,
												amount: results[0].amount
											}
											if (stage14spill.depth === stage1depth){
												
												db.query('UPDATE stage1_tree SET d = ? WHERE user = ?', [x, stage14spill.user], function(err, results, fields){
														if( err ) throw err;
														db.query('CALL stage1in(?,?,?)', [y, stage14spill.user, x], function(err, results, fields){
									 							if (err) throw err;
									 								fillup.fillup(x);
						if(stage1.a !== null && stage1.b !== null && stage1.c !== null && stage1.d !== null && stage1.aa !== null && stage1.ab !== null && stage1.bc !== null && stage1.bd !== null && stage1.ca !== null && stage1.cb !== null && stage1.cc !== null && stage1.cd !== null && stage1.da !== null && stage1.db !== null && stage1.dc !== null && stage1.dd !== null){
					db.query('Update user_tree set stage2 = ? WHERE user = ?', ['yes', u], function(err, results, fields){
							if (err) throw err;
							db.query('SELECT balance FROM transactions WHERE user = ?', [u], function(err, results, fields){
                    				if( err ) throw err;
                    				var las = results.slice(-1)[0];
                    				var balance = las.balance;
										//call function for stage 2 to 4
										s2func.restmatrix(u, res, balance);
										});
										});
				}else{
					res.render('register', {title: 'Successful Entrance'});
							}													});
												});
											}
										});
							}else{
								//start the next one which is 2
								var stage13spill = {
										user: results[0].user,
										depth: results[0].depth,
										amount: results[0].amount
									}
									if (stage13spill.depth === stage1depth){
										db.query('UPDATE stage1_tree SET c = ? WHERE user = ?', [x, stage13spill.user], function(err, results, fields){
											if( err ) throw err;
											db.query('CALL stage1in(?,?,?)', [y, stage13spill.user, x], function(err, results, fields){
									 			if (err) throw err;
									 		 	fillup.fillup(x);
						if(stage1.a !== null && stage1.b !== null && stage1.c !== null && stage1.d !== null && stage1.aa !== null && stage1.ab !== null && stage1.bc !== null && stage1.bd !== null && stage1.ca !== null && stage1.cb !== null && stage1.cc !== null && stage1.cd !== null && stage1.da !== null && stage1.db !== null && stage1.dc !== null && stage1.dd !== null){
					db.query('Update user_tree set stage2 = ? WHERE user = ?', ['yes', u], function(err, results, fields){
							if (err) throw err;
							db.query('SELECT balance FROM transactions WHERE user = ?', [u], function(err, results, fields){
                    				if( err ) throw err;
                    				var las = results.slice(-1)[0];
                    				var balance = las.balance;
										//call function for stage 2 to 4
										s2func.restmatrix(u, res, balance);
										});
										});
				}else{
					res.render('register', {title: 'Successful Entrance'});
							}
											});
										});
									}
							}
						});
					}
					else{
						//start normal 1
						var stage12spill = {
							user: results[0].user,
							depth: results[0].depth,
							amount: results[0].amount
						}
						if (stage12spill.depth === stage1depth){
							db.query('UPDATE stage1_tree SET b = ? WHERE user = ?', [x, stage12spill.user], function(err, results, fields){
								if(err) throw err;
							//call the procedure for adding
								db.query('CALL stage1in (?,?,?)', [y, stage12spill.user, x], function(err, results, fields){
									if (err) throw err;
								 fillup.fillup(x);
						if(stage1.a !== null && stage1.b !== null && stage1.c !== null && stage1.d !== null && stage1.aa !== null && stage1.ab !== null && stage1.bc !== null && stage1.bd !== null && stage1.ca !== null && stage1.cb !== null && stage1.cc !== null && stage1.cd !== null && stage1.da !== null && stage1.db !== null && stage1.dc !== null && stage1.dd !== null){
					db.query('Update user_tree set stage2 = ? WHERE user = ?', ['yes', u], function(err, results, fields){
							if (err) throw err;
							db.query('SELECT balance FROM transactions WHERE user = ?', [u], function(err, results, fields){
                    				if( err ) throw err;
                    				var las = results.slice(-1)[0];
                    				var balance = las.balance;
										//call function for stage 2 to 4
										s2func.restmatrix(u, res, balance);
										});
										});
				}else{
					res.render('register', {title: 'Successful Entrance'});
							}
								});
							});
						}
						else{
							//check for two amount
							db.query('SELECT node.user,   (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth FROM stage1 AS node, stage1 AS parent, stage1 AS sub_parent, ( SELECT node.user, (COUNT(parent.user) - 1) AS depth FROM stage1 AS node, stage1 AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? GROUP BY node.user ORDER BY node.lft) AS sub_tree WHERE node.amount = 2 AND node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt AND sub_parent.user = sub_tree.user GROUP BY node.user HAVING depth > 0 ORDER BY depth', [u], function(err, results, fields){	
								if( err ) throw err;
								if( results.length === 0 ){
									//what will happen go to 3
									db.query('SELECT node.user,   (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth FROM stage1 AS node, stage1 AS parent, stage1 AS sub_parent, ( SELECT node.user, (COUNT(parent.user) - 1) AS depth FROM stage1 AS node, stage1 AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? GROUP BY node.user ORDER BY node.lft) AS sub_tree WHERE node.amount = 3 AND node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt AND sub_parent.user = sub_tree.user GROUP BY node.user HAVING depth > 0 ORDER BY depth', [u], function(err, results, fields){
										if( err ) throw err;
										var stage14spill = {
												user: results[0].user,
												depth: results[0].depth,
												amount: results[0].amount
											}
											if (stage14spill.depth === stage1depth){
												
												db.query('UPDATE stage1_tree SET d = ? WHERE user = ?', [x, stage14spill.user], function(err, results, fields){
														if( err ) throw err;
														db.query('CALL stage1in(?,?,?)', [y, stage14spill.user, x], function(err, results, fields){
									 							if (err) throw err;
									 								
						if(stage1.a !== null && stage1.b !== null && stage1.c !== null && stage1.d !== null && stage1.aa !== null && stage1.ab !== null && stage1.bc !== null && stage1.bd !== null && stage1.ca !== null && stage1.cb !== null && stage1.cc !== null && stage1.cd !== null && stage1.da !== null && stage1.db !== null && stage1.dc !== null && stage1.dd !== null){
					db.query('Update user_tree set stage2 = ? WHERE user = ?', ['yes', u], function(err, results, fields){
							if (err) throw err;
							db.query('SELECT balance FROM transactions WHERE user = ?', [u], function(err, results, fields){
                    				if( err ) throw err;
                    				var las = results.slice(-1)[0];
                    				var balance = las.balance;
										//call function for stage 2 to 4
										s2func.restmatrix(u, res, balance);
										});
										});
				}else{
					res.render('register', {title: 'Successful Entrance'});
							}
													});
												});
											}
									});				
								}
								else {
									//start normal two
									var stage13spill = {
										user: results[0].user,
										depth: results[0].depth,
										amount: results[0].amount
									}
									if (stage13spill.depth === stage1depth){
										db.query('UPDATE stage1_tree SET c = ? WHERE user = ?', [x, stage13spill.user], function(err, results, fields){
											if( err ) throw err;
											db.query('CALL stage1in(?,?,?)', [y, stage13spill.user, x], function(err, results, fields){
									 			if (err) throw err;
	fillup.fillup(x);
						if(stage1.a !== null && stage1.b !== null && stage1.c !== null && stage1.d !== null && stage1.aa !== null && stage1.ab !== null && stage1.bc !== null && stage1.bd !== null && stage1.ca !== null && stage1.cb !== null && stage1.cc !== null && stage1.cd !== null && stage1.da !== null && stage1.db !== null && stage1.dc !== null && stage1.dd !== null){
					db.query('Update user_tree set stage2 = ? WHERE user = ?', ['yes', u], function(err, results, fields){
							if (err) throw err;
							db.query('SELECT balance FROM transactions WHERE user = ?', [u], function(err, results, fields){
                    				if( err ) throw err;
                    				var las = results.slice(-1)[0];
                    				var balance = las.balance;
										//call function for stage 2 to 4
										s2func.restmatrix(u, res, balance);
										});
										});
				}else{
					res.render('register', {title: 'Successful Entrance'});
							}
											});
										});
									}
									else {
										//go to amount 3
										db.query('SELECT node.user,   (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth FROM stage1 AS node, stage1 AS parent, stage1 AS sub_parent, ( SELECT node.user, (COUNT(parent.user) - 1) AS depth FROM stage1 AS node, stage1 AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? GROUP BY node.user ORDER BY node.lft) AS sub_tree WHERE node.amount = 3 AND node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt AND sub_parent.user = sub_tree.user GROUP BY node.user HAVING depth > 0 ORDER BY depth', [u], function(err, results, fields){
											if( err ) throw err;
											var stage14spill = {
												user: results[0].user,
												depth: results[0].depth,
												amount: results[0].amount
											}
											if (feeder4spill.depth === feederdepth){
													db.query('UPDATE stage1_tree SET d = ? WHERE user = ?', [x, stage14spill.user], function(err, results, fields){
														if( err ) throw err;
														db.query('CALL stage1in(?,?,?)', [y, stage14spill.user, x], function(err, results, fields){
									 							if (err) throw err;
									 								
									 	//fillup.fillup(x);
						if(stage1.a !== null && stage1.b !== null && stage1.c !== null && stage1.d !== null && stage1.aa !== null && stage1.ab !== null && stage1.bc !== null && stage1.bd !== null && stage1.ca !== null && stage1.cb !== null && stage1.cc !== null && stage1.cd !== null && stage1.da !== null && stage1.db !== null && stage1.dc !== null && stage1.dd !== null){
					db.query('Update user_tree set stage2 = ? WHERE user = ?', ['yes', u], function(err, results, fields){
							if (err) throw err;
							db.query('SELECT balance FROM transactions WHERE user = ?', [u], function(err, results, fields){
                    				if( err ) throw err;
                    				var las = results.slice(-1)[0];
                    				var balance = las.balance;
										//call function for stage 2 to 4
										s2func.restmatrix(u, res, balance);
										});
										});
				}else{
					res.render('register', {title: 'Successful Entrance'});
							}
															
													});
												});
											}
										});
									}
								}
							});
						}
					}
				});
			}
		});
	});
	}
	});
}