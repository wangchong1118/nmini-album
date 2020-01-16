const express = require('express');
const app = express();
const router = require('./router');

app.set('view engine', 'ejs');
app.use('/static', express.static('./static'));
app.use(express.static('./images'));

app.get('/', router.showIndex);
app.get('/upload', router.showUpload);
app.post('/upload', router.doUpload);
app.get('/create', router.doCreate);
app.get('/:category', router.showCategory);

app.use(function(req, res){
	res.render('404')
})

app.listen(3000, function(err){
	if(err){
		console.log(err);
	}
	console.log('app is starting at port 3000');
});
