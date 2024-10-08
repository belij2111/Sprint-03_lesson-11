import {OutputPostType} from "../types/post-types";
import {PostDbType} from "../db/post-db-type";
import {BlogDBType} from "../db/blog-db-type";
import {ObjectId} from "mongodb";
import {Paginator} from "../common/types/paginator-types";
import {SortQueryFilterType} from "../common/helpers/sort-query-fields-util";
import {PostModel} from "../domain/post.entity";
import {BlogModel} from "../domain/blog.entity";

export class PostsMongoQueryRepository {
    async getPost(inputQuery: SortQueryFilterType): Promise<Paginator<OutputPostType[]>> {
        const filter = {}
        const items = await PostModel
            .find(filter)
            .sort({[inputQuery.sortBy]: inputQuery.sortDirection})
            .skip((inputQuery.pageNumber - 1) * inputQuery.pageSize)
            .limit(inputQuery.pageSize)
            .lean()
            .exec()
        const totalCount = await PostModel.countDocuments(filter)
        return {
            pagesCount: Math.ceil(totalCount / inputQuery.pageSize),
            page: inputQuery.pageNumber,
            pageSize: inputQuery.pageSize,
            totalCount,
            items: items.map(this.postMapToOutput)
        }
    }

    async getPostById(id: string): Promise<OutputPostType | null> {
        if (!this.checkObjectId(id)) return null
        const post = await this.findById(new ObjectId(id))
        if (!post) return null
        return this.postMapToOutput(post)
    }

    async getPostsByBlogId(blogId: string, inputQuery: SortQueryFilterType): Promise<Paginator<OutputPostType[]> | null> {
        if (!this.checkObjectId(blogId)) return null
        const blog = await this.findBlogById(blogId)
        if (!blog) return null
        const byId = blogId ? {blogId: new ObjectId(blogId)} : {}
        const filter = {
            ...byId
        }
        const items = await PostModel
            .find(filter)
            .sort({[inputQuery.sortBy]: inputQuery.sortDirection})
            .skip((inputQuery.pageNumber - 1) * inputQuery.pageSize)
            .limit(inputQuery.pageSize)
            .lean()
            .exec()
        const totalCount = await PostModel.countDocuments(filter)
        return {
            pagesCount: Math.ceil(totalCount / inputQuery.pageSize),
            page: inputQuery.pageNumber,
            pageSize: inputQuery.pageSize,
            totalCount,
            items: items.map(this.postMapToOutput)
        }
    }

    async findById(id: ObjectId): Promise<PostDbType | null> {
        return PostModel.findOne({_id: id})
    }

    async findBlogById(blogId: string): Promise<BlogDBType | null> {
        return BlogModel.findOne({_id: new ObjectId(blogId)})
    }

    postMapToOutput(post: PostDbType): OutputPostType {
        return {
            id: post._id.toString(),
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: post.blogId.toString(),
            blogName: post.blogName,
            createdAt: post.createdAt
        }
    }

    checkObjectId(id: string): boolean {
        return ObjectId.isValid(id)
    }
}