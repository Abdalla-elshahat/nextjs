import { Rejisterscema } from "@/app/validationshema";
import { NextRequest ,NextResponse} from "next/server";
import bcrypt from "bcryptjs"
import { prism } from "@/app/utels/db";
import { Setcookie } from "@/app/utels/generateJWT";

export async function POST(request:NextRequest){
    const body=(await request.json())as datt ;
    const valdit=Rejisterscema.safeParse(body);
    if(!valdit.success){
        return NextResponse.json({message:"error",data:valdit.error})
    }
    const user=await prism.user.findUnique({
        where:{email:body.email}
    })
    if(user){
        return NextResponse.json(
            {message:"this user alredy is rejester"},{status:200})
    }

    type datt={
       username:string,
       email:string,
       password:string
       isAdmin?:boolean
    }
    const salt=await bcrypt.genSalt(10);
    const hash=await bcrypt.hash(body.password,salt);
const newuser=await prism.user.create({
    data:{
        username:body.username,
        email:body.email,
        password:hash,
        isAdmin:body.isAdmin
    }
})
const cookies=Setcookie({id:newuser.id,isAdmin:newuser.isAdmin,username:newuser.username})
    return NextResponse.json({...newuser},{status:201,
        headers:{
            "Set-Cookie":cookies
        }
    })
}