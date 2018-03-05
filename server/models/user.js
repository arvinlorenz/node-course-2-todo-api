const mongoose = require('mongoose');
const validator = require('validator'); //isEmail
const jwt = require('jsonwebtoken');
const _ = require('lodash');


// {
// 	email: 'arvin@gmail.com',
// 	password: 'fkldjlkfdsk',
// 	tokens: [{
// 		access: 'auth', //emai,resettingpasswordd
// 		token: 'fsdklklkfjiwejij'		
// 	}]
// }
//User Mongoose model



//schema, so we can add a method in a model
var UserSchema = new mongoose.Schema({
	email: {
		required: true,
		type: String,
		trim: true,
		minlength: 1,
		unique: true,
		validate: {
			validator: validator.isEmail,
			message: '{value} is not a valid email'
		}

	},
	password: {
		type: String,
		required: true,
		minlength: 6
	},
	tokens: [{
		access: {
			type: String,
			required: true
		},
		token: {
			type: String,
			required: true

		}
	}]
});

UserSchema.methods.toJSON = function () {
	var user = this;
	var userObject = user.toObject();

	return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function() {
	var user = this;
	var access = 'auth';
	var token =  jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

	// user.tokens.push({access, token});
	user.tokens = user.tokens.concat([{access, token}]);

	return user.save().then(() =>{
		return token;
	});
};

var User = mongoose.model('User', UserSchema);

module.exports = {User};