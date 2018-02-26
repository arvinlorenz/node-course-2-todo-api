const {ObjectId} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

const {User} = require('./../server/models/user');

// var id = '5a939e397f9095801f7cf43211';

// if(!ObjectId.isValid(id)){
// 	console.log('ID not valid');
// }

// Todo.find({
// 	_id: id
// }).then((todos) =>{
// 	console.log('Todos',todos);
// });


//not return as an array of object, returns not an empty array but NULL
// Todo.findOne({
// 	_id: id
// }).then((todo) =>{
// 	console.log('Todo',todo);
// }); 


// Todo.findById(id).then((todo) =>{
// 	if(!todo){
// 		return console.log('ID not found');
// 	}
// 	console.log('Todo By ID',todo);
// }).catch((e) => console.log(e));


User.findById('5a82e6175c7cc10834498fb3').then((user)=>{
	if(!user){
		return console.log('ID not found');
	}
	console.log(user);
},(e) => console.log(e));

