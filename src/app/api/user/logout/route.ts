
import { NextRequest ,NextResponse} from "next/server";

import { cookies } from "next/headers";
export async function GET(re:NextRequest){
   cookies().delete("token");
    return NextResponse.json({message:"logout"},{status:201})
}