import { prism } from "@/app/utels/db";
import { Login } from "@/app/validationshema";
import { NextRequest ,NextResponse} from "next/server";
import bcrypt from "bcryptjs"
import { Setcookie } from "@/app/utels/generateJWT";
export async function POST(re:NextRequest){
    type login={
        email:string,
        password:string
     }
    const body=(await re.json())as login ;
    const valdit=Login.safeParse(body);
    if(!valdit.success){
        return NextResponse.json({message:"error",data:valdit.error})
    }
    const user=await prism.user.findUnique({
        where:{email:body.email}
    })
    if(!user){
        return NextResponse.json(
            {message:"this user alredy is not rejester"},{status:200})
    }
const passmath=bcrypt.compare(body.password,user.password);
if(!passmath){
    return NextResponse.json({message:"invalied password"},{status:400})
}
const data={id:user.id,username:user.username,isAdmin:user.isAdmin};

const cookies=Setcookie(data)
    return NextResponse.json({message:"pass is tru",cookies},
        {status:201,
        headers:{"Set-cookie":cookies}
    })
}