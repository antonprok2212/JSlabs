const app = require('../router/app.js');
let conf = require('../service/config.js');

app.listen(conf.get('port'), () => {
     console.log('Server start at localhost:3001');
});