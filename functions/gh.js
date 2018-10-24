if(firstfillup.b !== null  ){
		
		}
		
		if(firstfillup.c !== null  ){
				//get results for firstfillup.c
		db.query( 'SELECT a, b, c, d, user from stage1_tree WHERE user  = ?',[firstfillup.c], function ( err, results, fields ){
			if( err ) throw err;
			var cfill = {
				a: results[0].a,
				b: results[0].b,
				c: results[0].c,
				d: results[0].d,
				user: results[0].user
			}
			//update firstfill.a
			db.query( 'UPDATE stage1_tree SET ca  = ?, cb = ?, cc = ?, cd  = ? WHERE user  = ?', [cfill.a, cfill.b, cfill.c, cfill.d, x], function ( err, results, fields ){
				if ( err ) throw err;	
			});
		});
		}
		if(firstfillup.d !== null  ){
				//get results for firstfillup.d
		db.query( 'SELECT a, b, c, d, user from stage1_tree WHERE user  = ?',[firstfillup.d], function ( err, results, fields ){
			if( err ) throw err;
			var dfill = {
				a: results[0].a,
				b: results[0].b,
				c: results[0].c,
				d: results[0].d,
				user: results[0].user
			}
			//update firstfill.a
			db.query( 'UPDATE stage1_tree SET da  = ?, db = ?, dc = ?, dd  = ? WHERE user  = ?', [dfill.a, dfill.b, dfill.c, dfill.d, x], function ( err, results, fields ){
				if ( err ) throw err;	
			});
		});
		}
		var firstfillup = {
			a: results[0].a,
			b: results[0].b,
			c: results[0].c,
			d: results[0].d,
			user: results[0].user
		}
		//get results for firstfillup.a
		
			
			
		});
		if( firstfillup.b )
		