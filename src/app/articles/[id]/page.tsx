//import { getSingleArticle } from "@/apiCalls/articleApiCall";

import { singleartical } from "@/app/utels/generateJWT";
import { cookies } from "next/headers";
import { verifyTokenForPage } from "@/app/utels/generateJWT";
import { prism } from "@/app/utels/db";
import { redirect } from "next/navigation";

interface SingleArticlePageProps {
    params: { id: string }
}

const SingleArticlePage = async ({ params }: SingleArticlePageProps) => {
    const token = cookies().get("token")?.value || "";
    const payload = verifyTokenForPage(token);

   // const article: SingleArticle = await getSingleArticle(params.id);

    const article = await prism.article.findUnique({
        where: { id: parseInt(params.id) },
        include: {
            comments: {
                include: {
                    user: {
                        select: {
                            username: true,
                        }
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                }
            }
        }
    }) as unknown as singleartical

    if(!article){
       redirect("/not-found");
    }
   
    return (
        <section className="fix-height container m-auto w-full px-5 pt-8 md:w-3/4">
            <div className="bg-white p-7 rounded-lg mb-7">
                <h1 className="text-3xl font-bold text-gray-700 mb-2">
                    {article.title}
                </h1>
                <div className="text-gray-400">
                    {new Date(article.createdAt).toDateString()}
                </div>
                <p className="text-gray-800 text-xl mt-5">{article.description}</p>
            </div>
            <div className="mt-7">
                {payload ? (
                    ""
                ) : (
                    <p className="text-blue-600 md:text-xl">
                        to write a comment you should log in first
                    </p>
                )}
            </div>
            <h4 className="text-xl text-gray-800 ps-1 font-semibold mb-2 mt-7">
                Comments
            </h4>
        </section>
    )
}

export default SingleArticlePage;