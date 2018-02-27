const {ObjectId} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

const {User} = require('./../server/models/user');

//remove all
// Todo.remove({}).then((result) => console.log(result)); 


//remove and return 
// Todo.findOneAndRemove({_id:'5a94c8410b5ace000638fd28'}).then((todo)=>{
// 	console.log(todo);
// })

//remove and return 
// Todo.findByIdAndRemove('5a94c8410b5ace000638fd28').then((todo)=>{
// 	console.log(todo);
// });