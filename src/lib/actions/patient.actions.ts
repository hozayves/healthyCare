'use server'
import { ID, Query } from "node-appwrite"
import { account } from "../appwrite.config"
import { parseStringify } from "../utils"


export const createUser = async (user: CreateUserParams) => {
    try {
        console.log("Try started...")
        const newUser = await account.create(
            ID.unique(),
            user.email,
            '',
            user.name
        )
        console.log({ newUser })

        return parseStringify(newUser)
    } catch (error) {
        console.log("Error...", error)
        if (error && error?.code === 409) {
            const document = await users.list([
                Query.equal('email', [user.email])
            ])
            return document?.users[0]
        }
    }
}