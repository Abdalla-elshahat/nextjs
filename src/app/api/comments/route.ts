import { NextRequest, NextResponse } from 'next/server';
import { prism } from '@/app/utels/db';
import { verifytoken } from '@/app/utels/generateJWT';
import { CreateCommentDto } from '@/app/utels/generateJWT';
import { createcommentschema } from '@/app/validationshema';


/**
 *  @method  POST
 *  @route   ~/api/comments
 *  @desc    Create New Comment
 *  @access  private (only logged in user)
 */
export async function POST(request: NextRequest) {
    try {
        const user = verifytoken(request);
        if(!user) {
            return NextResponse.json(
                { message: 'only logged in user, access denied' },
                { status: 401 }
            );
        }
        
        const body = await request.json() as CreateCommentDto;

        const validation = createcommentschema.safeParse(body);
        if(!validation.success) {
            return NextResponse.json({ message: validation.error.errors[0].message }, { status: 400 });
        }

        const newComment = await prism.comment.create({
            data:{
                text:body.text,
                articleId:body.ArticalId,
                userId:body.userId
            }
        });
        return NextResponse.json(newComment, { status: 201 });

    } catch (error) {
        return NextResponse.json(
            { message: 'internal server error' },
            { status: 500 }
        )
    }
}

/**
 *  @method  GET
 *  @route   ~/api/comments
 *  @desc    Get All Comments
 *  @access  private (only admin)
 */
export async function GET(request: NextRequest) {
    try {
        const user = verifytoken(request);
        if(user === null || user.isAdmin === false) {
           return NextResponse.json(
            { message: 'only admin, access denied' },
            { status: 403 }
           )
        }

        const comments = await prism.comment.findMany();
        return NextResponse.json(comments, { status: 200 });

    } catch (error) {
        return NextResponse.json(
            { message: 'internal server error' },
            { status: 500 }
        )
    }
}