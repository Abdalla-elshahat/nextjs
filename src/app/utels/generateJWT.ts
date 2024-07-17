import jwt from "jsonwebtoken"
import { serialize } from "cookie";
import { NextRequest } from "next/server";
import{Article,Comment,User} from "@prisma/client";
const privetkey=process.env.JWT_SECRET as string
export type JWTT={
id:number,
username:string,
isAdmin:boolean
}
export interface update{
    username?:string,
    email?:string,
    password?:string
    }
export interface comment{
    ArticalId:number,
        }

        export interface CreateCommentDto {
            text: string;
            ArticalId: number;
            userId:number
        }
        export interface UpdateCommentDto {
            text: string;
        }

export interface artical{
            title:string,
            Description:string
            isAdmin:boolean
            }


export type commentwithuser=Comment & {user:User}
export type singleartical=Article&{comment:commentwithuser[]}
            
export function Generat( jwtt: JWTT):string{
    const token=jwt.sign(jwtt,privetkey,{
        expiresIn:"30d"//obtinal
    })
    return token;
}

export function  verifytoken(request:NextRequest){
    const jwttoken=request.cookies.get("token");
    const token=jwttoken?.value as string 
 if(!token){
return null
 }
 return jwt.verify(token,privetkey) as JWTT;
}
// Verify Token For Page
export function verifyTokenForPage(token: string): JWTT | null {
    try {
        const privateKey = process.env.JWT_SECRET as string;
        const userPayload = jwt.verify(token, privateKey) as JWTT;
        if(!userPayload) return null;

        return userPayload;
    } catch (error) {
        return null;
    }
}

export function Setcookie(cookie:JWTT):string{
const token=jwt.sign(cookie,privetkey,{
    expiresIn:"30d"
})
const cookies=serialize("token",token,{
    httpOnly:true,
    secure:process.env.NODE_ENV==="production",
    sameSite:"strict", //more scure for cookie
    path:"/", //for all app
    maxAge:60*60*24*30
})
return cookies;
}