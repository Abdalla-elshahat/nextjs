import { prism } from "@/app/utels/db";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { JWTT, update } from "@/app/utels/generateJWT";
interface pros{
    params:{id:string}
}
export async function DELETE(request:NextRequest,{params}:pros){
const body=await prism.user.findUnique({where:{id:parseInt(params.id)}});
if(!body) return new Response("not found", {status:404});

 const token=request.headers.get("token") as string; 
 if(!token){
    return new Response("not found", {status:404});
 }
const toke=request.cookies.get("token")?.value as string;
 const decoded=jwt.verify(toke,process.env.JWT_SECRET as string) as JWTT;
 if(decoded.id==body.id){
    await prism.user.delete({where:{id:parseInt(params.id)}});
    return  NextResponse.json("ok", {status:200});
 }
 return  NextResponse.json("only user him self can delet this profile", {status:403});
}


export async function GET(request:NextRequest,{params}:pros){
   const user=await prism.user.findUnique({where:{id:parseInt(params.id)}});
   if(!user) return NextResponse.json("not found", {status:404});
    
    if(user.id!==parseInt(params.id)){
       return  NextResponse.json("you are not allow access denie", {status:404});
    }
    return  NextResponse.json(user, {status:200});
   }


   export async function PUT(request:NextRequest,{params}:pros){
      const user=await prism.user.findUnique({where:{id:parseInt(params.id)}});
      if(!user) return NextResponse.json("not found", {status:404});
       
       if(user.id!==parseInt(params.id)){
          return  NextResponse.json("you are not allow access denie", {status:404});
       }
    const body=await request.json() as update;
    if(body.password){
      const salt=await bcrypt.genSalt(10);
      body.password=await bcrypt.hash(body.password,salt);
    }
    const updateuser=await prism.user.update({where:{id:parseInt(params.id)},
      data:{
         username:body.username,
         email:body.email,
         password:body.password,
    },
   }
   )
   const {password,...other}=updateuser
   
    return  NextResponse.json({...other}, {status:200});
      }