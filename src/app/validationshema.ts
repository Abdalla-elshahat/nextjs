
import { date, number, z } from "zod";
//rejister
export const Rejisterscema=z.object({
        username:z.string().min(2).max(100),//.optional()
        email:z.string().min(3).max(200).email(),
        password:z.string().min(6),

        })

        //login
export const Login=z.object({
    email:z.string().min(3).max(200).email(),
    password:z.string().min(6),
    })

    export const createcommentschema=z.object({
        text:z.string().min(2).max(500),
        articlid:z.number(),
        })
        export const createarticalschema=z.object({
            title:z.string().min(2).max(500),
            Description:z.string().min(2).max(500),
            })