const fs = require('fs');
const path = require('path');

exports.searchF = (folder, searchFolder) => {
	fs.readdir(folder, (err, files) => {
    if (err) return false;
    
		files.forEach((file) => {
      if (file === searchFolder) {
				fs.stat(path.join(folder, file), (err, stats) => {
					if(stats.isDirectory()){
						return path.join(folder, file);
					};
				});
			};
		});
	});
	return false;
};

exports.deleteF = (folder) => {
  fs.readdir(folder, (err, files) => {
    if (err) return false;
    
    files.forEach((file) => {
      fs.unlink(`${folder}/${file}`, (err) => {
        if(err) throw err;
      });
    });

    fs.rmdir(folder, (err) => {
      if(err) throw err;
    });
  });
  return false;
};
