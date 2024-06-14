import { NextRequest, NextResponse } from 'next/server';

interface User {
    name: string;
    age: number;
    city: string;
}

// 模拟数据库中的数据
const users: Record<string, User> = {
    '1': {
        name: 'John',
        age: 30,
        city: 'New York'
    },
    '2': {
        name: 'Jane',
        age: 25,
        city: 'Los Angeles'
    },
    '3': {
        name: 'Bob',
        age: 35,
        city: 'Chicago'
    }
}


export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;
    const user = users[id];
    return NextResponse.json({ id, user });
}