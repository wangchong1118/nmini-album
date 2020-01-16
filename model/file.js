const fs = require('fs');
const pathlib = require('path');

exports.getCategores = function(callback){
	fs.readdir('./images', function(err, files){
		if(err){
			callback(new Error('画册文件夹不存在'), null)
			return;
		}
		let categores = [];
		(function iterator(i){
			if(i === files.length){
				callback(null, categores);
				return;
			}
			fs.stat('./images/' + files[i], function(err, file){
				if(file.isDirectory()){
					categores.push(files[i]);
				}
				iterator(i + 1);
			})
		})(0);
	})
}

exports.getImages = function(category, callback){
	if(category === 'favicon.ico'){
		return;
	}
	fs.readdir('./images/' + category , function(err, files){
		if(err){
			callback(new Error('画册访问失败'), null)
			return;
		}
		let images = [];
		(function iterator(i){
			if(i === files.length){
				callback(null, images);
				return;
			}
			fs.stat('./images/' + category + '/' + files[i], function(err, file){
				if(err){
					callback(new Error('图片访问失败'), null);
					return;
				}
				if(file.isFile()){
					images.push(files[i]);
				}
				iterator(i + 1);
			})
		})(0);
	})
}

exports.createCategory = function(name, callback){
	let url = pathlib.resolve(__dirname, '../images/', name);
	fs.mkdir(url, function(err){
		if(err){
			callback(new Error('图集文件创建失败'));
			return;
		}
		callback();
	})
}
