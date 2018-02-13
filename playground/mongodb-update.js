// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db) => {
	if(err){
		return console.log('Unable to connect to MongoDB server');
	}
	console.log('Connected to MongoDB server');


	//findOneAndUpdate  learn update operator
		// db.collection('Todos').findOneAndUpdate({
		// 	_id: new ObjectID('5a82497d1e6a8316e88e3432')
		// },{
		// 	$set: {
		// 		completed: true
		// 	}
		// }, {
		// 	returnOriginal: false
		// }).then((result) =>{
		// 	console.log(result);
		// });

		db.collection('Users').findOneAndUpdate({
			_id: new ObjectID('5a824af21e6a8316e88e34ed')
		},{
			$inc: {
				age: 1
			},
			$set: {
				name: 'Arvin'
			}
		},{
			returnOriginal: false
		}).then((result) => {
			console.log(result);
		})
	// db.close();
});