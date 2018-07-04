const Clarifai = require('clarifai');

//Initialization for Clarifai api
const app = new Clarifai.App({
 apiKey: 'd47d4378f18341b08c43d1d6c5505f2c'
});

const handleApiCall = (req,res) =>{
	app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data => {
		res.json(data);
	})
	.catch(err => res.status(400).json('Unable to work with api'))
	;
}

const handleImage = (req,res,db)=>{
	const{id}=req.body;
	db('users').where('id', '=', id)
	.increment('entries',1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err => res.status(404).json('unable to get entries'))
}

module.exports={
	handleImage:handleImage,
	handleApiCall:handleApiCall
}