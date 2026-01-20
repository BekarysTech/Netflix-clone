import { NextResponse } from 'next/server';
// import bcrypt from 'bcrypt';
// import prisma from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, username, password } = body;
        
        return NextResponse.json(
            { message: 'User registered successfully', email, username },
            { status: 200 }
        );
    } catch (error: any) {
        console.log('Register error:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}

