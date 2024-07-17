
import { prism } from "@/app/utels/db";
import { artical, verifytoken} from "@/app/utels/generateJWT";
import { createarticalschema } from "@/app/validationshema";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request:NextRequest) {
    const body=await prism.article.findMany();
    return NextResponse.json(body,{status:201})
    }

    
export async function POST(request:NextRequest) {
    const body =await request.json() as artical
    const user=verifytoken(request);
    if(user==null||user.isAdmin===false) return NextResponse.json({message:"unauthorized"},{status:401})

    const valditation=createarticalschema.safeParse(body);
    if(!valditation.success) {
        return NextResponse.json(valditation.error)
}
const newcomment=await prism.article.create({
data:{
    title:body.title,
    description:body.Description
}})
return NextResponse.json(newcomment,{status:201})
}
