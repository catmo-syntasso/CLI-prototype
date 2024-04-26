#!/usr/bin/env node

var fs = require('fs');
const { Command } = require('commander');
const program = new Command();

program
  .name('promise-builder')
  .description('CLI to help you build promises');

program.command('template')
  .description('Create a template promise to build on your own')
  .argument('<filename>', 'Name of file you want to generate')
  .option('-p, --promise <string>', 'name of promise, defaults to empty string', '')
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
        console.log('Created template with filename %s for promise %s', filename, options.promise);
      } else {
        fs.writeFile(filename, data, 'utf8', function (err) {
          if (err) return console.log(err);
        });
        console.log('Created tempplate with filename %s', filename)
      }
    });
  });

program.parse();


// program.command('split')
//   .description('Split a string into substrings and display as an array')
//   .argument('<string>', 'string to split')
//   .option('--first', 'display just the first substring')
//   .option('-s, --separator <char>', 'separator character', ',')
//   .action((str, options) => {
//     const limit = options.first ? 1 : undefined;
//     console.log(str.split(options.separator, limit));
//   });
