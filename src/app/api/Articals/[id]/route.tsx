import { prism } from "@/app/utels/db";
import { artical, verifytoken } from "@/app/utels/generateJWT";
import { NextRequest, NextResponse } from "next/server";
interface Params {
    params: {
      id: string;
    };
  }
  export async function PUT(request: NextRequest, { params }: Params) {
    const comment = await prism.article.findUnique({ where: { id: parseInt(params.id) } });
    if (!comment) return NextResponse.json("not found", { status: 404 });
  
    const user=verifytoken(request);
    if(user==null||user.isAdmin===false) return NextResponse.json({message:"unauthorized"},{status:401})
      
    const bodys = await request.json() as artical;
    const newComment = await prism.article.update({
      where: { id: parseInt(params.id) },
      data:{
        title:bodys.title,
        description:bodys.Description
      }
    });
    return NextResponse.json(newComment, { status: 200 });
  }
  export async function DELETE(request: NextRequest, { params }: Params) {
    const comment = await prism.article.findUnique({ where: { id: parseInt(params.id) } });
    if (!comment) return NextResponse.json("not found", { status: 404 });
    const newComment = await prism.article.delete({
      where: { id: parseInt(params.id) }});
    return NextResponse.json(newComment, { status: 200 });
  }

  export async function GET(request:NextRequest, { params }: Params) {
    const body=await prism.article.findUnique(
      { where: { id: parseInt(params.id) },
    include:{
      comments:{
        orderBy:{
          createdAt:"desc"
        }
      }
    }
    });

    return NextResponse.json(body,{status:201})
    }