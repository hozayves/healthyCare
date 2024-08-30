'use server'
import { ID, Query } from "node-appwrite"
import { users } from "../appwrite.config"
import { parseStringify } from "../utils"


export const createUser = async (user: CreateUserParams) => {
    try {
        console.log("Try started...")
        const newUser = await users.create(
            ID.unique(),
            user.email,
            user.phone,
            "1234567890",
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

export const getUser = async (userId: string) => {
    try {
        const user = await users.get(userId)
        console.log("Get loggedIn user", user)
        return parseStringify(user)
    } catch (error) {
        console.log(error)
    }
}