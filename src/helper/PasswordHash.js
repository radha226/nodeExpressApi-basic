const bcrypt = require('bcrypt');

exports.hash = async (pass) => {
	return await bcrypt.hash(pass.toString(), 10);
}

exports.passCheck = async (pass,hash) => {
	return await bcrypt.compare(pass.toString(), hash)
}

