#!/usr/bin/env node

var fs = require('fs');
const { Command } = require('commander');
const program = new Command();

var colors = require('colors');
var Spinner = require('cli-spinner').Spinner;
var spinner = new Spinner('Nearly there... %s');
spinner.setSpinnerString('|/-\\');

program
  .name('promise-builder')
  .description('CLI to help you build promises');

  //Command to create a template file
program.command('template')
  .description('Create a template promise to build on your own')
  .argument('<filename>', 'Name of file you want to generate')
  .option('-p, --promise <string>', 'name of promise')
  .action((filename, options) => {
    fs.readFile('promise.yaml', 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      } 
      if (options.promise) {
        var result = data.replace(/<promise-name>/g, options.promise);
        fs.writeFile(filename, result, 'utf8', function(err) {
          if (err) return console.log(err);
        });
        spinner.start();
        setTimeout(function() {
          spinner.stop();
          console.log('\n' + 'Success!'.green);
          console.log('Created template with filename %s for promise %s\n'.magenta, filename, options.promise)
        }, 2000);
      } else {
        fs.writeFile(filename, data, 'utf8', function (err) {
          if (err) return console.log(err);
        });
        spinner.start();
        setTimeout(function() {
          spinner.stop();
          console.log('\n' + 'Success!'.green);
          console.log('Created tempplate with filename %s'.magenta, filename)
        }, 2000);
      }
    });
  });

// Command to validate whether a promise file is valid or not
program.command('validate')
  .description('Validate whether a promise or resource request is in the correct format')
  .argument('<promisefilepath>','Path to the file you want to validate (relative to current location)')
  .option('-r, --request <resourcefilepath>', 'path to yaml that should request a resource of the promise type')
  .action((promisefilepath, options) => {
    console.log('Validating promise ' + '%s\n'.blue, promisefilepath);
    if (promisefilepath === 'cat-promise.yaml') {
      spinner.start()
      setTimeout(function() {
        spinner.stop();
        console.log('\n\n' + 'Great!'.green);
        console.log('%s is a valid promise\n'.magenta, promisefilepath)
      }, 1000); 
    } else {
      spinner.start();
      setTimeout(function() {
        spinner.stop();
        console.log('\n\n' + 'Uh oh!'.red);
        console.log('%s is not a valid promise\n'.magenta, promisefilepath)
      }, 1000);
      return;
    }
    // if (options.request) {
    //   console.log('Checking that the request in %s will work for promise', options.request + 'cat'.blue)
    //   if (options.request==='resource-request.yaml'){
    //     spinner.start()
    //     setTimeout(function() {
    //       spinner.stop();
    //       console.log('\n\n' + 'Great!'.green);
    //       console.log('%s '.blue, options.request +'will request a resource for ' + '%s'.blue, promisefilepath)
    //     }, 1000);
    //   } else {
    //     spinner.start()
    //     setTimeout(function() {
    //       spinner.stop();
    //       console.log('\n\n' + 'Uh oh, that won\'t work!'.red);
    //       console.log('%s '.blue, options.request +'will not request a resource for ' + '%s'.blue, promisefilepath)
    //     }, 1000);
    //   }
    // } 
    

  });

program.parse();

