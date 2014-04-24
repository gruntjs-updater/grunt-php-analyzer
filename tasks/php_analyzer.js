/*
 * grunt-php-analyzer
 * https://github.com/chrsm/grunt-php-analyzer
 *
 * Copyright (c) 2013 Christopher Martinez
 * Licensed under the MIT license.
 */
module.exports = function(grunt) {
    var _ = grunt.util._, path = require('path');
    grunt.registerMultiTask( 'php_analyzer', 'Run analyzer', function() {
        var done = this.async(), options = this.options({
            bin: 'phpalizer',
            command: 'run'
        }), directory = path.normalize(this.data.dir), command = path.normalize(options.bin);
        
        if ( this.data.exclude ) {
            if ( Object.prototype.toString.call( this.data.exclude ) === '[object Array]' ) {
                for (var i = 0; i < this.data.exclude.length; i++) {
                    command += ' --exclude-pattern="' + this.data.exclude[i] + '"';
                };
            } else {
                command += ' --exclude-pattern="' + this.data.exclude + '"';
            }
        }
        command += ' --ansi ' + (this.data.command ? this.data.command : options.command) + ' ' + directory;
        
        grunt.log.writeln('Starting phpalizer (target: ' + this.target.cyan + ') in ' + directory.cyan);
        grunt.verbose.writeln('Exec: ' + command);
        
        // Execute php_analyzer
        require('child_process').exec(command, function( err, stdout, stderr) {
            
            if (stdout) {
                grunt.log.write(stdout);
            }

            if (err) {
                grunt.fatal(err);
            }

            done();
            
        });
    });
};
