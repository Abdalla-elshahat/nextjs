import { Metadata } from "next";
import React from "react";
import Link from "next/link";
/////static object metadata

export const metadata:Metadata={
    title:"Posts",
    description:"Postdis"
}
 type pros={params:{proid:string}}
// export const genrateMetadata =async({params}:pros): Promise<Metadata>=>{
//     const yo=await new Promise(resolve=>{
//         setTimeout(()=>{
//             resolve(`iphone ${params.proid}`)
//         },1000)
//     })
//     return{
//         title:`title ${yo}`,
//         description:"CDWXSQ"
//     }
// }
function Prodectdetials({params}:pros){
    if(parseInt(params.proid)===1){
        throw new Error("loadinfgf")
    }
    return(
        <>
        <div>prodect{params.proid}</div>
        <Link href={"forget"}>Forget</Link>
        </>
    )
}
export default Prodectdetials;