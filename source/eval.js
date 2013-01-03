//execute arbitrary js code in a relatively safe environment
bot.eval = (function () {
window.URL = window.URL || window.webkitURL || window.mozURL || null;

//translation tool: https://tinker.io/b2ff5
var worker_code = atob( 'dmFyIGdsb2JhbCA9IHRoaXM7CgovKm1vc3QgZXh0cmEgZnVuY3Rpb25zIGNvdWxkIGJlIHBvc3NpYmx5IHVuc2FmZSovCnZhciB3aGl0ZXkgPSB7CgknQXJyYXknICAgICAgICAgICAgICA6IDEsCgknQm9vbGVhbicgICAgICAgICAgICA6IDEsCgknRGF0ZScgICAgICAgICAgICAgICA6IDEsCgknZGVjb2RlVVJJJyAgICAgICAgICA6IDEsCgknZGVjb2RlVVJJQ29tcG9uZW50JyA6IDEsCgknZW5jb2RlVVJJJyAgICAgICAgICA6IDEsCgknZW5jb2RlVVJJQ29tcG9uZW50JyA6IDEsCgknRXJyb3InICAgICAgICAgICAgICA6IDEsCgknZXZhbCcgICAgICAgICAgICAgICA6IDEsCgknRXZhbEVycm9yJyAgICAgICAgICA6IDEsCgknRnVuY3Rpb24nICAgICAgICAgICA6IDEsCgknZ2xvYmFsJyAgICAgICAgICAgICA6IDEsCgknSW5maW5pdHknICAgICAgICAgICA6IDEsCgknaXNGaW5pdGUnICAgICAgICAgICA6IDEsCgknaXNOYU4nICAgICAgICAgICAgICA6IDEsCgknSlNPTicgICAgICAgICAgICAgICA6IDEsCgknTWF0aCcgICAgICAgICAgICAgICA6IDEsCgknTmFOJyAgICAgICAgICAgICAgICA6IDEsCgknTnVtYmVyJyAgICAgICAgICAgICA6IDEsCgknT2JqZWN0JyAgICAgICAgICAgICA6IDEsCgknb25tZXNzYWdlJyAgICAgICAgICA6IDEsCgkncGFyc2VGbG9hdCcgICAgICAgICA6IDEsCgkncGFyc2VJbnQnICAgICAgICAgICA6IDEsCgkncG9zdE1lc3NhZ2UnICAgICAgICA6IDEsCgknUmFuZ2VFcnJvcicgICAgICAgICA6IDEsCgknUmVmZXJlbmNlRXJyb3InICAgICA6IDEsCgknUmVnRXhwJyAgICAgICAgICAgICA6IDEsCgknc2VsZicgICAgICAgICAgICAgICA6IDEsCgknU3RyaW5nJyAgICAgICAgICAgICA6IDEsCgknU3ludGF4RXJyb3InICAgICAgICA6IDEsCgknVHlwZUVycm9yJyAgICAgICAgICA6IDEsCgkndW5kZWZpbmVkJyAgICAgICAgICA6IDEsCgknVVJJRXJyb3InICAgICAgICAgICA6IDEsCgknd2hpdGV5JyAgICAgICAgICAgICA6IDEsCgoJLyogdHlwZWQgYXJyYXlzIGFuZCBzaGl0ICovCgknQXJyYXlCdWZmZXInICAgICAgIDogMSwKCSdCbG9iJyAgICAgICAgICAgICAgOiAxLAoJJ0Zsb2F0MzJBcnJheScgICAgICA6IDEsCgknRmxvYXQ2NEFycmF5JyAgICAgIDogMSwKCSdJbnQxNkFycmF5JyAgICAgICAgOiAxLAoJJ0ludDMyQXJyYXknICAgICAgICA6IDEsCgknSW50OEFycmF5JyAgICAgICAgIDogMSwKCSdVaW50MzJBcnJheScgICAgICAgOiAxLAoJJ1VpbnQ4QXJyYXknICAgICAgICA6IDEsCgknVWludDhDbGFtcGVkQXJyYXknIDogMSwKCgkvKgoJdGhlc2UgcHJvcGVydGllcyBhbGxvdyBGRiB0byBmdW5jdGlvbi4gd2l0aG91dCB0aGVtLCBhIGZ1Y2tmZXN0IG9mCglpbmV4cGxpY2FibGUgZXJyb3JzIGVudXNlcy4gdG9vayBtZSBhYm91dCA0IGhvdXJzIHRvIHRyYWNrIHRoZXNlIGZ1Y2tlcnMKCWRvd24uCglmdWNrIGhlbGwgaXQgaXNuJ3QgZnV0dXJlLXByb29mLCBidXQgdGhlIGVycm9ycyB0aHJvd24gYXJlIHVuY2F0Y2hhYmxlCglhbmQgdW50cmFjYWJsZS4gc28gYSBoZWFkcy11cC4gZW5qb3ksIGZ1dHVyZS1tZSEKCSovCgknRE9NRXhjZXB0aW9uJyA6IDEsCgknRXZlbnQnICAgICAgICA6IDEsCgknTWVzc2FnZUV2ZW50JyA6IDEKfTsKClsgZ2xvYmFsLCBnbG9iYWwuX19wcm90b19fIF0uZm9yRWFjaChmdW5jdGlvbiAoIG9iaiApIHsKCU9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKCBvYmogKS5mb3JFYWNoKGZ1bmN0aW9uKCBwcm9wICkgewoJCWlmKCAhd2hpdGV5Lmhhc093blByb3BlcnR5KCBwcm9wICkgKSB7CgkJCWRlbGV0ZSBvYmpbIHByb3AgXTsKCQl9Cgl9KTsKfSk7CgpPYmplY3QuZGVmaW5lUHJvcGVydHkoIEFycmF5LnByb3RvdHlwZSwgJ2pvaW4nLCB7Cgl3cml0YWJsZTogZmFsc2UsCgljb25maWd1cmFibGU6IGZhbHNlLAoJZW51bXJhYmxlOiBmYWxzZSwKCgl2YWx1ZTogKGZ1bmN0aW9uICggb2xkICkgewoJCXJldHVybiBmdW5jdGlvbiAoIGFyZyApIHsKCQkJaWYgKCB0aGlzLmxlbmd0aCA+IDUwMCB8fCAoYXJnICYmIGFyZy5sZW5ndGggPiA1MDApICkgewoJCQkJdGhyb3cgJ0V4Y2VwdGlvbjogdG9vIG1hbnkgaXRlbXMnOwoJCQl9CgoJCQlyZXR1cm4gb2xkLmFwcGx5KCB0aGlzLCBhcmd1bWVudHMgKTsKCQl9OwoJfSggQXJyYXkucHJvdG90eXBlLmpvaW4gKSkKfSk7CgooZnVuY3Rpb24oKXsKCSJ1c2Ugc3RyaWN0IjsKCgl2YXIgY29uc29sZSA9IHsKCQlfaXRlbXMgOiBbXSwKCQlsb2cgOiBmdW5jdGlvbigpIHsKCQkJY29uc29sZS5faXRlbXMucHVzaC5hcHBseSggY29uc29sZS5faXRlbXMsIGFyZ3VtZW50cyApOwoJCX0KCX07Cgl2YXIgcCA9IGNvbnNvbGUubG9nLmJpbmQoIGNvbnNvbGUgKTsKCglmdW5jdGlvbiBleGVjICggY29kZSApIHsKCQl2YXIgcmVzdWx0OwoJCXRyeSB7CgkJCXJlc3VsdCA9IGV2YWwoICcidXNlIHN0cmljdCI7dW5kZWZpbmVkO1xuJyArIGNvZGUgKTsKCQl9CgkJY2F0Y2ggKCBlICkgewoJCQlyZXN1bHQgPSBlLnRvU3RyaW5nKCk7CgkJfQoKCQlyZXR1cm4gcmVzdWx0OwoJfQoKCWdsb2JhbC5vbm1lc3NhZ2UgPSBmdW5jdGlvbiAoIGV2ZW50ICkgewoJCXZhciBqc29uU3RyaW5naWZ5ID0gSlNPTi5zdHJpbmdpZnksIC8qYmFja3VwKi8KCQkJcmVzdWx0ID0gZXhlYyggZXZlbnQuZGF0YSApOwoKCQl2YXIgc3RydW5nID0gewoJCQlGdW5jdGlvbiAgOiB0cnVlLCBFcnJvciAgOiB0cnVlLAoJCQlVbmRlZmluZWQgOiB0cnVlLCBSZWdFeHAgOiB0cnVlCgkJfTsKCQl2YXIgcmV2aXZlciA9IGZ1bmN0aW9uICgga2V5LCB2YWx1ZSApIHsKCQkJdmFyIHR5cGUgPSAoIHt9ICkudG9TdHJpbmcuY2FsbCggdmFsdWUgKS5zbGljZSggOCwgLTEgKSwKCQkJCW91dHB1dDsKCgkJCS8qSlNPTi5zdHJpbmdpZnkgZG9lcyBub3QgbGlrZSBmdW5jdGlvbnMsIGVycm9ycywgTmFOIG9yIHVuZGVmaW5lZCovCgkJCWlmICggdHlwZSBpbiBzdHJ1bmcgfHwgdmFsdWUgIT09IHZhbHVlICkgewoJCQkJb3V0cHV0ID0gJycgKyB2YWx1ZTsKCQkJfQoJCQllbHNlIHsKCQkJCW91dHB1dCA9IHZhbHVlOwoJCQl9CgoJCQlyZXR1cm4gb3V0cHV0OwoJCX07CgoJCXBvc3RNZXNzYWdlKHsKCQkJYW5zd2VyIDoganNvblN0cmluZ2lmeSggcmVzdWx0LCByZXZpdmVyICksCgkJCWxvZyAgICA6IGpzb25TdHJpbmdpZnkoIGNvbnNvbGUuX2l0ZW1zLCByZXZpdmVyICkuc2xpY2UoIDEsIC0xICkKCQl9KTsKCX07Cn0pKCk7Cg==' );
var blob = new Blob( [worker_code], { type : 'application/javascript' } ),
	code_url = window.URL.createObjectURL( blob );

return function ( msg ) {
	var timeout,
		worker = new Worker( code_url );

	worker.onmessage = function ( evt ) {
		finish( dressUpAnswer(evt.data) );
	};

	worker.onerror = function ( error ) {
		finish( error.toString() );
	};

	//and it all boils down to this...
	worker.postMessage( msg.content.replace(/^>/, '') );

	timeout = window.setTimeout(function() {
		finish( 'Maximum execution time exceeded' );
	}, 100 );

	function finish ( result ) {
		clearTimeout( timeout );
		worker.terminate();
		msg.directreply( result );
	}
};

function dressUpAnswer ( answerObj ) {
	console.log( answerObj, 'eval answerObj' );
	var answer = answerObj.answer,
		log = answerObj.log,
		result;

	result = snipAndCodify( answer );

	if ( log && log.length ) {
		result += ' Logged: ' + snipAndCodify( log );
	}

	return result;
}
function snipAndCodify ( str ) {
	var ret;

	if ( str.length > 400 ) {
		ret = '`' +  str.slice(0, 400) + '` (snip)';
	}
	else {
		ret = '`' + str +'`';
	}

	return ret;
}
}());
