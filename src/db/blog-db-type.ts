import {ObjectId} from "mongodb";

export class BlogDBType {
    constructor(
        public _id: ObjectId,
        public name: string,
        public description: string,
        public websiteUrl: string,
        public createdAt: string,
        public isMembership: boolean
    ) {
    }
}