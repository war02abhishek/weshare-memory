import express from 'express';
import mongoose from 'mongoose';

import PostMessage from '../models/postMessage.js';
// Routing refers to determining how an application responds to a client request to a particular endpoint, which is a URI (or path) and a specific HTTP request method (GET, POST, and so on). Each route can have one or more handler functions, which are executed when the route is matched.
const router=express.Router();

export const getPosts = async (req, res) => { 
    try {
        const postMessages = await PostMessage.find();
        //  console.log(postMessages);       
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}




export const getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
  const post = req.body; //

  const newPostMessage = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  }); //hence our backend automatically specifies creator of the post
  //toISOString()-->It make sure our date definately shows the value when it was created
  console.log(newPostMessage);

  try {
    await newPostMessage.save();

    res.status(201).json(newPostMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}

export const likePost = async (req, res) => {
    const { id } = req.params;

     //first we have to check whether user is authenticated or not
    if(!req.userId)//req.useId is coming from  auth middleware
    {
        return res.json({message:'Unauthenticated user'})
    }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    const post = await PostMessage.findById(id);
  
    const index=post.likes.findIndex((id)=>id===String(req.userId));

    //if user havenot already liked the post thenn he can like the post
    if(index===-1)
    {
        //like the post
        post.likes.push(req.userId);
    }
    else{
      //if user have already liked the post thenn he can dislike the post
      //dislike the post
      post.likes=post.likes.filter((id)=>id!=String(req.userId));

    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id,post, { new: true });
    
    res.json(updatedPost);
}


export default router;