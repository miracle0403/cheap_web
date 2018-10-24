var db = require( '../db.js' );
var stage3func = require( './stage3.js' );
//var s1userfunc = require( './s1user.js' ); 
//var db = require( '../db.js' ); 
exports.stage2spill = function( x, u, y, res){
	db.query('SELECT node.user,   (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth FROM stage2 AS node, stage2 AS parent, stage2 AS sub_parent, ( SELECT node.user, (COUNT(parent.user) - 1) AS depth FROM stage2 AS node, stage2 AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? GROUP BY node.user ORDER BY node.lft) AS sub_tree WHERE node.amount < 4 AND node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt AND sub_parent.user = sub_tree.user GROUP BY node.user HAVING depth > 0 ORDER BY depth', [u], function(err, results, fields){
		if( err ) throw err;
		var stage2depth = results[0].depth;
		//console.log( feederdepth );
		db.query('SELECT node.user,   (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth FROM stage2 AS node, stage2 AS parent, stage2 AS sub_parent, ( SELECT node.user, (COUNT(parent.user) - 1) AS depth FROM stage2 AS node, stage2 AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? GROUP BY node.user ORDER BY node.lft) AS sub_tree WHERE node.amount = 0 AND node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt AND sub_parent.user = sub_tree.user GROUP BY node.user HAVING depth > 0 ORDER BY depth', [u], function(err, results, fields){
			if (err) throw err;
			var stage21spill = {
				user: results[0].user,
				depth: results[0].depth,
				amount: results[0].amount
			}
			if (stage21spill.depth === stage2depth){
				//update into the sponsor set
				db.query('UPDATE stage2_tree SET a = ? WHERE user = ?', [x, stage21spill.user], function(err, results, fields){
					if(err) throw err;
					//call the procedure for addingp
					db.query('CALL stage2try(?,?,?)', [y, stage21spill.user, x], function(err, results, fields){
						if (err) throw err;
						res.render('register', {title: 'Successful Entrance'});
					});
				});																
			}
			else{
				//check for 1 amount
				db.query('SELECT node.user,   (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth FROM stage2 AS node, stage2 AS parent, stage2 AS sub_parent, ( SELECT node.user, (COUNT(parent.user) - 1) AS depth FROM stage2 AS node, stage2 AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? GROUP BY node.user ORDER BY node.lft) AS sub_tree WHERE node.amount = 1 AND node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt AND sub_parent.user = sub_tree.user GROUP BY node.user HAVING depth > 0 ORDER BY depth', [u], function(err, results, fields){ 
					if( err ) throw err;
					if ( results.length === 0 ){
						//what happens if no 1. go to two
						db.query('SELECT node.user,   (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth FROM stage2 AS node, stage2 AS parent, stage2 AS sub_parent, ( SELECT node.user, (COUNT(parent.user) - 1) AS depth FROM stage2 AS node, stage2 AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? GROUP BY node.user ORDER BY node.lft) AS sub_tree WHERE node.amount = 2 AND node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt AND sub_parent.user = sub_tree.user GROUP BY node.user HAVING depth > 0 ORDER BY depth', [u], function(err, results, fields){	
							if( err ) throw err;
							if( results.length === 0 ){
								// what to do. go to 3 amount
								db.query('SELECT node.user,   (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth FROM stage2 AS node, stage2 AS parent, stage2 AS sub_parent, ( SELECT node.user, (COUNT(parent.user) - 1) AS depth FROM stage2 AS node, stage2 AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? GROUP BY node.user ORDER BY node.lft) AS sub_tree WHERE node.amount = 3 AND node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt AND sub_parent.user = sub_tree.user GROUP BY node.user HAVING depth > 0 ORDER BY depth', [u], function(err, results, fields){
											if( err ) throw err;
											var stage24spill = {
												user: results[0].user,
												depth: results[0].depth,
												amount: results[0].amount
											}
											console.log( stage24spill )
											if (stage24spill.depth === stage2depth){
												db.query('Update user_tree set stage3 = ? WHERE user = ?', ['yes', stage24spill.user], function(err, results, fields){
													if (err) throw err;
												db.query('UPDATE stage2_tree SET d = ? WHERE user = ?', [x, stage24spill.user], function(err, results, fields){
														if( err ) throw err;
														db.query('CALL stage2try(?,?,?)', [y, stage24spill.user, x], function(err, results, fields){
									 							if (err) throw err;
									 							db.query( 'SELECT balance from transactions Where user  = ?',[stage24spill.user], function ( err, results, fields ){
									 								if ( err ) throw err;
									 							});
									 								db.query('CALL stage2Amount(?)', [stage24spill.user], function(err, results, fields){
																	if (err) throw err;
									 	//import function to the s1user here
									s3userfunc.stage3(stage24spill.user, res);
																res.render('register', {title: 'Successful Entrance'});
															});
														});
													});
												});
											}										});
							}else{
								//start the next one which is 2
								var stage23spill = {
										user: results[0].user,
										depth: results[0].depth,
										amount: results[0].amount
									}
									if (stage23spill.depth === stage2depth){
										db.query('UPDATE stage2_tree SET c = ? WHERE user = ?', [x, stage23spill.user], function(err, results, fields){
											if( err ) throw err;
											db.query('CALL stage2try(?,?,?)', [y, stage23spill.user, x], function(err, results, fields){
									 			if (err) throw err;
									 		 	res.render('register', {title: 'Successful Entrance'});
											});
										});
									}
							}
						});
					}
					else{
						//start normal 1
						var stage22spill = {
							user: results[0].user,
							depth: results[0].depth,
							amount: results[0].amount
						}
						if (stage22spill.depth === stage2depth){
							db.query('UPDATE stage2_tree SET b = ? WHERE user = ?', [x, stage22spill.user], function(err, results, fields){
								if(err) throw err;
							//call the procedure for adding
								db.query('CALL stage2try (?,?,?)', [y, stage22spill.user, x], function(err, results, fields){
									if (err) throw err;
								 	res.render('register', {title: 'Successful Entrance'});
								});
							});
						}
						else{
							//check for two amount
							db.query('SELECT node.user,   (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth FROM stage2 AS node, stage2 AS parent, stage2 AS sub_parent, ( SELECT node.user, (COUNT(parent.user) - 1) AS depth FROM stage2 AS node, stage2 AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? GROUP BY node.user ORDER BY node.lft) AS sub_tree WHERE node.amount = 2 AND node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt AND sub_parent.user = sub_tree.user GROUP BY node.user HAVING depth > 0 ORDER BY depth', [u], function(err, results, fields){	
								if( err ) throw err;
								if( results.length === 0 ){
									//what will happen go to 3
									db.query('SELECT node.user,   (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth FROM stage2 AS node, stage2 AS parent, stage2 AS sub_parent, ( SELECT node.user, (COUNT(parent.user) - 1) AS depth FROM stage2 AS node, stage2 AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? GROUP BY node.user ORDER BY node.lft) AS sub_tree WHERE node.amount = 3 AND node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt AND sub_parent.user = sub_tree.user GROUP BY node.user HAVING depth > 0 ORDER BY depth', [u], function(err, results, fields){
										if( err ) throw err;
										var stage24spill = {
												user: results[0].user,
												depth: results[0].depth,
												amount: results[0].amount
											}
											if (stage24spill.depth === stage2depth){
												db.query('Update user_tree set stage3 = ? WHERE user = ?', ['yes', stage24spill.user], function(err, results, fields){
													if (err) throw err;
												db.query('UPDATE stage2_tree SET d = ? WHERE user = ?', [x, stage24spill.user], function(err, results, fields){
														if( err ) throw err;
														db.query('CALL stage2try(?,?,?)', [y, stage24spill.user, x], function(err, results, fields){
									 							if (err) throw err;
									 								db.query('CALL stage2Amount(?)', [stage24spill.user], function(err, results, fields){
																	if (err) throw err;
									 	//import function to the s1user here
									s3userfunc.stage3(stage24spill.user, res);
																res.render('register', {title: 'Successful Entrance'});
															});
														});
													});
												});
											}
									});				
								}
								else {
									//start normal two
									var stage23spill = {
										user: results[0].user,
										depth: results[0].depth,
										amount: results[0].amount
									}
									if (stage23spill.depth === stage2depth){
										db.query('UPDATE stage2_tree SET c = ? WHERE user = ?', [x, stage23spill.user], function(err, results, fields){
											if( err ) throw err;
											db.query('CALL stage2try(?,?,?)', [y, stage23spill.user, x], function(err, results, fields){
									 			if (err) throw err;
									 		 	res.render('register', {title: 'Successful Entrance'});
											});
										});
									}
									else {
										//go to amount 3
										db.query('SELECT node.user,   (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth FROM stage2 AS node, stage2 AS parent, stage2 AS sub_parent, ( SELECT node.user, (COUNT(parent.user) - 1) AS depth FROM stage2 AS node, stage2 AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? GROUP BY node.user ORDER BY node.lft) AS sub_tree WHERE node.amount = 3 AND node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt AND sub_parent.user = sub_tree.user GROUP BY node.user HAVING depth > 0 ORDER BY depth', [u], function(err, results, fields){
											if( err ) throw err;
											var stage24spill = {
												user: results[0].user,
												depth: results[0].depth,
												amount: results[0].amount
											}
											if (stage24spill.depth === stage2depth){
												db.query('Update user_tree set stage3 = ? WHERE user = ?', ['yes', stage24spill.user], function(err, results, fields){
													if (err) throw err;
												db.query('UPDATE stage2_tree SET d = ? WHERE user = ?', [x, stage24spill.user], function(err, results, fields){
														if( err ) throw err;
														db.query('CALL stage2try(?,?,?)', [y, stage24spill.user, x], function(err, results, fields){
									 							if (err) throw err;
									 								db.query('CALL stage2Amount(?)', [stage24spill.user], function(err, results, fields){
																	if (err) throw err;
									 	//import function to the s1user here
									s3userfunc.stage3(stage24spill.user, res);
																res.render('register', {title: 'Successful Entrance'});
															});
														});
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