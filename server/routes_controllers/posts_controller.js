// This file exports a router that handles HTTP requests to manipulate posts.

import express from 'express';
import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";


const router =express.Router();

export function errorHandler(err, req, res, next) {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
  
    res.status(statusCode).json({ message });
    next(err);
  }
  

// GET all posts from the database.
export const getPosts = async (req, res, next) => {
    try {
      const postMessages = await PostMessage.find();
      if (!postMessages) {
        const error = new Error('No post messages found');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json(postMessages);
    } catch (error) {
      next(error);
    }
  }
  

// GET a specific post by ID from the database.
export const getPost = async (req, res, next) => {
    try {
      const { id } = req.params;
      const post = await PostMessage.findById(id);
  
      if (!post) {
        const error = new Error('Post not found');
        error.statusCode = 404;
        throw error;
      }
  
      res.status(200).json(post);
    } catch (error) {
      next(error);
    }
  }
  


// CREATE a new post and save it to the database.
export const createPost = async (req, res, next) => {
    try {
        const { title, description, selectedFile, creator, tags } = req.body;

        const newPostMessage = new PostMessage({ title, description, selectedFile, creator, tags });
        const savedPostMessage = await newPostMessage.save();

        res.status(201).json(savedPostMessage);
    } catch (error) {
        next(error);
    }
}


// UPDATE an existing post in the database.

export const updatePost = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { title, description, creator, selectedFile, tags } = req.body;
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error('Invalid post id');
        error.statusCode = 404;
        throw error;
      }
  
      const updatedPost = { creator, title, description, tags, selectedFile, _id: id };
      const post = await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });
  
      if (!post) {
        const error = new Error('Post not found');
        error.statusCode = 404;
        throw error;
      }
      console.log("Post updated successfully")
      res.json(post);
    } catch (error) {
      next(error);
    }
  };
  

// DELETE a post from the database.
export const deletePost = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error('Invalid post ID');
        error.statusCode = 404;
        throw error;
      }
  
      await PostMessage.findByIdAndRemove(id);
  
      res.json({ message: `Post deleted successfully` });
    } catch (error) {
      next(error);
    }
  };
  
  export const likePost = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error(`Invalid post ID: ${id}`);
        error.statusCode = 404;
        throw error;
      }
  
      const post = await PostMessage.findById(id);
  
      if (!post) {
        const error = new Error(`Post not found: ${id}`);
        error.statusCode = 404;
        throw error;
      }
  
      const updatedPost = await PostMessage.findByIdAndUpdate(
        id,
        { likeCount: post.likeCount + 1 },
        { new: true }
      );
  
      res.json(updatedPost);
    } catch (error) {
      next(error);
    }
  };
  

export default router


