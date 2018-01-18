const Router = require('koa-router')();
const index = require('./index.js');

module.exports = (app) => {
	
	Router.get('/', index);
	Router.get('/index.html', index);

	app.use(Router.routes());
}
