var request = require('request');
var async = require('async');


function testGetBody() {
    async.waterfall([
        function (callback) {
            request = request.defaults({jar: true})
            request.post({
                url: 'https://stockcharts.com/login/index.php',
                form: 'form_Name=Login&redirect=&form_UserID=mhsin.seb%40gmail.com&form_UserPassword=fantszching'
            }, function (error, response, body) {

                callback(null, response);
            });
            //callback(null, 'one');
        },
        function (arg1, callback) {
            request.get({
                url: 'https://stockcharts.com/j-sum/sum?cmd=sctr&view=L&timeframe=W',
                gzip: true
            }, function (error, response, body) {
                // console.log(body);
                callback(null, body);
            });
            // arg1 now equals 'one' and arg2 now equals 'two'
            //callback(null, 'three');
        }
    ], function (err, result) {

        console.log(err);
        console.log(result);
        // result now equals 'done'
    });
}

function getBody() {
    request = request.defaults({jar: true});

    request.post({
        url: 'https://stockcharts.com/login/index.php',
        form: 'form_Name=Login&redirect=&form_UserID=mhsin.seb%40gmail.com&form_UserPassword=fantszching'
    }, function (error, response, body) {
        console.log(body);
    });

    // console.log(response.headers);
    // console.log(response.headers['set-cookie']);

    request.get({
        url: 'https://stockcharts.com/j-sum/sum?cmd=sctr&view=L&timeframe=W',
        gzip: true
    }, function (error, response, body) {
        console.log(body);
    });

}
console.log(testGetBody());
