"use server"

import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose"

interface Params {
    text: string,
    author: string,
    communityId: string | null,
    path: string
}

export async function createThread({ text, author, communityId, path }: Params) {
    connectToDB();

    try {
    const createdThread = await Thread.create({
        text,
        author,
        community: null,
    });

    // Not only enough to create a thread...we also have to push it to the user model
    // Update user model
    await User.findByIdAndUpdate(author, {
        $push: { threads: createdThread._id }
    });

    revalidatePath(path);
    } catch (error: any) {
        throw new Error(`Error creating thread: ${error.message}`);
    }
}