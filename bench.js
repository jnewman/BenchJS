/**
 * @param {Function} method
 * @param {number} iterations
 * @param {Array} args
 * @param {T} context
 * @return {int} the time it took, in milliseconds, to execute.
 */
var bench = function (method, iterations, args, context) {

    var time = 0;
    var timer = function (action) {
        var begin = +(new Date);
        if (time < 1 || action === 'start') {
            time = begin;
            return 0;
        } else if (action === 'stop') {
            var t = begin - time;
            time = 0;
            return t;
        } else {
            return begin - time;
        }
    };

    var results = [];
    timer('start');
    var i = iterations;
    while (i --> 0) {
        results.push(method.apply(context, args));
    }
    var execTime = timer('stop');

    if (console && console.log) {
        console.log('Mean:', String(execTime / iterations) + 'ms');
        console.log('Sum:', String(execTime) + 'ms');
        
        var result = results[0];
        
        result === results[--iterations] ? 
            console.log('Result:', result) : 
                console.log('Result ranged between', result, 'and', results[iterations]);
    }
    
    return execTime;  
};
