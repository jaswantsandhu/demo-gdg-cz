var exec = require('child_process').exec;

const reviewer = () => {
    // Run the dependency gulp file first
    exec('npm run gulp', function (error, stdout, stderr) {
        console.log('Processing Gulp File');
        if (error) {
            console.log("Some error occured while doing code review - ", error, stderr);
        } else {
            console.log(`Code review complete. Enjoy your day!`, stdout, stderr);
        }
    });
};

module.exports = reviewer;