const {ObjectId} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const {app} = require('./../../server');


const userOneId = new ObjectId();
const userTwoId = new ObjectId();

const users = [{
	_id: userOneId,
	email: 'arvinlorenz@gmail.com',
	password: 'userOnePass',
	tokens: [{
		access: 'auth',
		token: jwt.sign({_id: userOneId, access:'auth'},'abc123').toString()
	}]
}, {
	_id: userTwoId,
	email: 'email@example.com',
	password: 'userTwoPass'
}];


const populateUsers = (done) =>{
	User.remove({}).then(()=>{

		//not insert many so the middleware to bcypt password would be stored
		var userOne = new User(users[0]).save();
		var userTwo = new User(users[1]).save();

		return Promise.all([userOne,userTwo]);
	}).then(() => done());
};




const todos = [
	{
		_id: new ObjectId,
		text: 'First test todo'
	},
	{
		_id: new ObjectId,
		text: 'Second test todo',
		completed: true,
		completedAt: 111,
	}
];



const populateTodos = (done) =>{
	Todo.remove({}).then(()=>{
		return Todo.insertMany(todos);
	}).then(()=> done());
};




module.exports = {
	todos, populateTodos, users, populateUsers
};

