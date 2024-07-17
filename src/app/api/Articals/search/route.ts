import { prism } from '@/app/utels/db';
import { NextRequest, NextResponse } from 'next/server';


/**
 *  @method  GET
 *  @route   ~/api/articles/search?searchText=value
 *  @desc    Get Articles By Search Text
 *  @access  public
 */
export async function GET(request: NextRequest) {
    try {
        const searchText = request.nextUrl.searchParams.get("searchText");
        let articles;
        if (searchText) {
            articles = await prism.article.findMany({
                where: {
                    title: {
                        contains: searchText,
                        mode: "insensitive"
                    }
                }
            })
        } else {
            articles = await prism.article.findMany({ take: 6 });
        }

        return NextResponse.json(articles, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: 'internal server error' },
            { status: 500 }
        )
    }
}