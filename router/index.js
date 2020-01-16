const file = require('../model/file.js');
const Formidable = require('formidable');
const sd = require('silly-datetime');
const pathlib = require('path');
const fs = require('fs');

// 首页
exports.showIndex = function(req, res){
	file.getCategores(function(err, categores){
		if(err){
			console.log(err);
			return;
		}
		res.render('index', {
			categores
		});
	})
}

// 上传页
exports.showUpload = function(req, res){
	file.getCategores(function(err, categores){
		if(err){
			console.log(err);
			return;
		}
		res.render('upload', {
			categores
		});
	})
}
exports.doUpload = function(req, res){
	let form = new Formidable.IncomingForm();
	form.uploadDir = pathlib.resolve(__dirname, '../images');
	form.parse(req, function(err, fields, files){
		let originUrl = files.pic.path
		let timeMark = sd.format(new Date(), 'YYYYMMDDHHmmss');
		let random = '_' + parseInt(Math.random()*(100000-10000) + 10000) + '_';
		let name = files.pic.name;
		let targetUrl = pathlib.resolve(__dirname, `../images/${fields.category}/${timeMark}${random}${name}`)

		if(err){
			next();
			return;
		}
		fs.rename(originUrl, targetUrl, function(err){
			if(err){
				throw new Error('上传失败');
			}
			res.setHeader('Content-Type', 'text/html');
			res.write("<head><meta charset='UTF-8' /></head><body><script>alert('上传成功');window.location='/upload';</script></body>");
		})
	})
}

// 创建新图集目录
exports.doCreate = function(req, res){
	let name = req.query.name;
	file.createCategory(name, function(err){
		if(err){
			res.send({
				code: 1,
				msg: '图集创建失败'
			});
			return;
		}
		res.send({
			code: 0,
			msg: '图集创建成功'
		});
	})
}

// 分类列表页
exports.showCategory = function(req, res){
	let category = req.params.category;
	file.getImages(category, function(err, images){
		if(err){
			console.log(err);
			res.render('404');
			return;
		}
		res.render('category', {
			category,
			images
		})
	})
}
