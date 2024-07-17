import { redirect } from "next/navigation";
import { comments } from "../data";
import { PrismaClient } from "@prisma/client";
import { NextRequest,NextResponse } from "next/server";
const prisma=new PrismaClient();
type datt={
    title:string,
    Description:string
}
// export async function GET(request:NextRequest,{params}:{params:{id:string}}){
//     const comment=comments.find((co)=>{co.id==parseInt(params.id)})
//     if(parseInt(params.id)>comments.length){
//         redirect("/commentfull");
//     }
//     return Response.json(comment,{status:201})
// }

// export async function PATCH(request:Request,{params}:{params:{id:string}}){
//     const body=await request.json();
//     const {name}=body;
//     const index=comments.findIndex((comment)=>{comment.id===parseInt(params.id)})
//     comments[index].name=name
//     return Response.json(comments[index])
// }
// export async function DELETE(request:Request,{params}:{params:{id:string}}){
//     const index=comments.findIndex((comment)=>{comment.id===parseInt(params.id)})
//     const deletcomment=comments[index]
//     comments.splice(index,1)
//     return Response.json(deletcomment) 
// }


//prisma
export async function GET(request:NextRequest,{params}:{params:{id:string}}){
    const comment=await prisma.article.findUnique({where:{id:parseInt(params.id)}})
    return Response.json(comment)
}

export async function PUT(request:NextRequest,{params}:{params:{id:string}}){
    const body=(await request.json())as datt;
    const dat=await prisma.article.update({
        where:{id:parseInt(params.id)},
        data:{
            title:body.title,
            description:body.Description
        }
})
    return Response.json(dat)
}

export async function DELETE(request:NextRequest,{params}:{params:{id:string}}){
    const dat=await prisma.article.delete({
        where:{id:parseInt(params.id)},
})
    return Response.json(dat)
}