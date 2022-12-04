let convict = require('convict');

convict.addFormat(require('convict-format-with-validator').url);

let conf = convict({
     env: {
         doc: 'The application environment.',
         format: ['production', 'development', 'test'],
         default: 'development',
         env: 'NODE_ENV'
     },
     port: {
         doc: "The port to bind.",
         format: "port",
         default: 3001,
         env: "PORT_API_2"
     },
     url: {
         format: "url",
         default: 'http://localhost:3000/',
         env: "URL_API_1"
     }
});

let env = conf.get('env');

conf.loadFile('../config/' + env + '.json');

conf.validate();

module.exports = conf;