import React from "react";
import { notFound } from "next/navigation";
function Prodectdetials({params}:
    {params:{
        reviewid:string
        proid:string
        }}){
            if(parseInt(params.reviewid)>600){
notFound();
            }
            else{

    return(
        <>
        <div>{params.proid}prodect{params.reviewid}</div>
        </>
    )
}
        }
export default Prodectdetials;