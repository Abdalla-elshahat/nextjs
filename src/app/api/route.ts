import { prism } from "@/app/utels/db";
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// export async function GET(request:NextRequest){
//     const repo=new Headers(request.headers);
//     console.log(repo.get("Authorization"))

//     const another=headers();
//     console.log(another.get("Authorization"))

//     const theam=request.cookies.get("theam")
//     console.log(theam)
// cookies().set("jkj","salak")
// console.log(cookies().get("jkj"))


//     return new Response("<h1>hello mother</h1>",{
//         headers:{
//         "Content-Type":"text/html",
//         "Set-Cookie": "theam=dark"
       
// }})
// }
export async function GET(request:NextRequest){
    const users=await prism.user.findMany();
   return NextResponse.json(users)
}