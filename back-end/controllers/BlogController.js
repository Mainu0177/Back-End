import mongoose from "mongoose";
import Blog from "../model/Blog";
import User from "../model/User";


export const getAllBlogs = async (req, res, next) =>{
    let blogs
    try {
        blogs = await Blog.find();
    } catch (err) {
       return console.log(err)
    }
    if(!blogs) {
        return res.status(404).json({message: "No Blog Found"})
    }
    return res.status(200).json({blogs})
}

// add a new blog
export const addBlog = async (req, res, next) =>{
    const {title, description, image, user} = req.body;

    let existingUser;
    try{
        existingUser = await User.findById(user);
    }catch(err){
        return console.log(err)
    }
    if(!existingUser){
        return res.status(400).json({message: "Unable to find User By This ID"})
    }
    const blog = new Blog({
        title,
        description,
        image,
        user,
    });
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({session});
        existingUser.blogs.push(blog);
        await existingUser.save({session});
        await session.commitTransaction();
    } catch (err) {
         console.log(err);
         return res.status(500).json({message: err})
    }
    return res.status(200).json({blog})
}

// blog update
export const updateBlog = async (req, res, next) =>{
    const { title, description } = req.body;
    const blogId = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndUpdate(blogId, {
            title,
            description,
        })
    } catch (err) {
        return console.log(err)
    }
    if(!blog) {
        return res.status(500).json({message: "Unable to Update the Blog"})
    }
    return res.status(200).json({blog}) 
}

// get id
export const getById = async (req, res, next) =>{
    const id = req.params.id;
    let blog;
    try {
        blog = await Blog.findById(id);
    } catch (err) {
        return console.log(err);
    }
    if(!blog){
        return res.status(404).json({message: "No Blog Found"})
    }
    return res.status(200).json({ blog })
}

//delete Blog
export const deleteBlog = async (req, res, next) =>{
    const id = req.params.id;

    let blog;
    try {
        blog = await Blog.findByIdAndRemove(id).populate("user");
        await blog.user.blogs.pull(blog);
        await blog.user.save();
    } catch (err) {
        return console.log(err)
    }
    if(!blog) {
        return res.status(400).json({message: "Unable to Delete"})
    }
    return res.status(200).json({ message: "Successfully Deleted" })
};

// get user Id
export const getByUserId = async (req, res, next) =>{
    const userId = req.params.id;
    let userBlogs;
    try{
        userBlogs = await User.findById(userId).populate("blogs");
    }catch(err){
        return console.log(err)
    }
    if(!userBlogs) {
        return res.status(404).json({message: "No Blog Found"})
    }
    return res.status(200).json({blogs:userBlogs})
}