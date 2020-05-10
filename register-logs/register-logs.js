let consoleHolder = console;


module.exports.debugger = (enable) => {
	if(enable){
		console = consoleHolder;
		return;
    }
	else {
		console = {};
		Object.keys(consoleHolder).forEach( (key) => {
			console[key] = function(){};
		} )
	}
}
