import { date, z } from "zod";
import { comments } from "./data";
import { PrismaClient } from "@prisma/client";
import { NextRequest,NextResponse } from "next/server";
import { createarticalschema } from "../validationshema";
const prisma=new PrismaClient();
// export async function GET(){
//     return  Response.json(comments);
// }
// export async function POST(request:Request){
//     const comment=await request.json();

//     const artical=z.object({
//         name:z.string().min(1).max(20),
//     })
//     const vald =artical.safeParse(comment);
//     if(!vald.success){
// return Response.json(vald.error,{status:404})
//     }
    
//     const newcomment={
//             id:comments.length+1,
//             name:comment.name,
//         };
//     comments.push(newcomment);
//     return new Response(JSON.stringify(comments),{
//         headers:{
//             "Content-Type":"application/json"
//         },
//         status:201,
//     })
// }

//prisma
type datt={
    title:string,
    Description:string
}
export async function GET(){
    const body=await prisma.article.findMany()
    return  Response.json(body);
}
export async function POST(re:NextRequest){
    const body=(await re.json())as datt;
const vald=createarticalschema.safeParse(body)
if(!vald.success){
    return NextResponse.json("error not valed",{status:404})
}
    const dat= await prisma.article.create({
        data:{
           title:body.title,
           description:body.Description
        }
    })
    return NextResponse.json(dat,{status:201})
}