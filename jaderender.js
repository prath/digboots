var jade = require('jade');

var html = jade.renderFile('src/templates/index.jade', {
    pretty: true,
    out: 'dest'
});