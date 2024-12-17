const Post = require("../models/PostModel");
const {errorHandler} = require("../auth.js");

module.exports.addPost = (req,res) =>{
	// console.log(req.user)
	if(!req.user){
		return res.status(400).send({message: "You need to login first"});
	}


	let newPost = new Post({
        
        title : req.body.title,
        content : req.body.content,
        author: req.user.username
    })

	Post.findOne({title: req.body.title})
	.then(existPost => {
		if(existPost){
			return res.status(409).send({message: "Post already exists"});
		}

		return newPost.save()
		.then(result => {
			// console.log(result);
			res.status(201).send({message: "Post Added", post: result})})
		.catch(error => errorHandler(error, req, res));

	}).catch(error => errorHandler(error, req, res));

}

module.exports.getPosts = (req, res) => {

	Post.find({})
	.then(result => {
		return res.status(200).send(result)
	})
}

module.exports.getMyPosts = (req, res) => {
	// console.log(req.user.id)
	Post.find({author: req.user.username})
	.then(result => {

		if(result.length === 0){
			return res.status(200).send({message: "You dont have any post"})
		}
		// console.log(result);
		return res.status(200).send(result)
	})
}

module.exports.viewPost = (req, res) => {
	// console.log(req.params.postId)
	Post.findById(req.params.postId)
	.then(result => {
		// console.log(result)
		return res.status(200).send(result)
	})
}


module.exports.editPost = (req,res) =>{

	// console.log(req.params)	
	let updatePost = {
		title: req.body.title ,
		content: req.body.content
	}


	Post.findById(req.params.postId )
	.then(result => {

		if(!result){
			return res.status(404).send({ message:"Post not found"});
		}

		if (result.author !== req.user.username) {
                
                return res.status(403).send({ message: 'You do not have permission to edit this post' });
        }
        
        	return Post.findByIdAndUpdate(req.params.postId, updatePost)
        	.then(result => {
        		res.status(200).send({mesage: "Updated post", updatedPost: result})
        	}).catch(error => errorHandler(error, req, res));
        

		

	}).catch(error => errorHandler(error, req, res));

}


module.exports.deletePost = (req,res) =>{
	// console.log(req.user.isAdmin)
	Post.findById(req.params.postId)
	.then(result => {
		console.log(result)
		if(!result){
			return res.status(404).send({message: "Post not found"})
		}

		if(req.user.id !== null || req.user.isAdmin){
        	return Post.findByIdAndDelete(req.params.postId)
        	.then(result => {
        		res.status(200).send({message: "Post deleted successfully"})
        	}) .catch(error => errorHandler(error, req, res));
        }

		if (result.author !== req.user.username) {
                
                return res.status(403).send({ message: 'You do not have permission to delete this post' });
        }

        
	})
	.catch(error => errorHandler(error, req, res));

}



// ADMIN CONTROLLER
