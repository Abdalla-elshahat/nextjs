import { NextRequest, NextResponse } from "next/server";
 function Middleware(request:NextRequest){
    if(request.nextUrl.pathname==="/hello"){
        return NextResponse.rewrite(new URL("/forget",request.url))
    }
    NextResponse.redirect(new URL("/",request.url))
}
export const config={
    matcher:["/api/user/profile/:path*"]
}
export default Middleware;