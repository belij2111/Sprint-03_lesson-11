import {Request, Response} from "express";
import {blogsMongoRepository} from "../repositories/blogs-mongo-repository";
import {OutputBlogType} from "../types/blog-types";

export const createBlogController = async (req: Request, res: Response) => {
    const createdInfo = await blogsMongoRepository.createBlog(req.body)
    const newBlog = await blogsMongoRepository.getBlogById(createdInfo.id)
    res
        .status(201)
        .json(newBlog)
}

export const getBlogsController = async (req: Request, res: Response<OutputBlogType[]>) => {
    const allBlogs = await blogsMongoRepository.getBlogs()
    res
        .status(200)
        .json(allBlogs)
}

export const getBlogByIdController = async (req: Request, res: Response<OutputBlogType>) => {
    const blogId = req.params.id
    const blog = await blogsMongoRepository.getBlogById(blogId)
    console.log(blog)
    if (!blog) {
        res
            .sendStatus(404)
        return
    }
    res
        .status(200)
        .json(blog)
}