interface slug{
    params:{slug:string[]}
}
function Slug( {params}:slug){
    console.log(params.slug)
    return(
        <>
        blog {params.slug}
        </>
    )
}
export default Slug;