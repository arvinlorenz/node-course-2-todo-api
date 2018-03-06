const mongoose = require('mongoose');
const validator = require('validator'); //isEmail
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

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

//LIMIT WHAT TO RETURN WHEN RES.SEND()
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

//.static model method while .methods  - instance method
//model method
// User.findByToken


//instance method
// user.generateAuthToken
UserSchema.statics.findByToken = function(token) {
	var User = this;
	var decoded;

	try{
		decoded = jwt.verify(token, 'abc123');
	} catch (e){
		// return new Promise((resolve, reject)=> {
		// 	reject();
		// });
		// OR SIMPLY

		return Promise.reject();

	}


	return User.findOne({
		'_id': decoded._id,
		'tokens.token': token,
		'tokens.access': 'auth'
	}); //return so we could use then in server
};


UserSchema.pre('save', function(next) {
	var user = this;

	if(user.isModified('password')){
		bcrypt.genSalt(10, (err,salt) => {
			bcrypt.hash(user.password, salt, (err,hash) => {
				user.password = hash;
				next();
			});
		});

	} else{
		next();
	}
});

var User = mongoose.model('User', UserSchema);

module.exports = {User};