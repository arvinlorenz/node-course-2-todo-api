var mongoose = require('mongoose');
//User Mongoose model

var User = mongoose.model('User',{
	email: {
		require: true,
		type: String,
		trim: true,
		minlength: 1
	}
});

module.exports = {User};