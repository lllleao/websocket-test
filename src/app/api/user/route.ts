import prisma from "@/lib/prisma";

export async function GET(id: number) {
    const user = await prisma.user.findUnique({
        where: {
            id
        }
    })

    return Response.json(user)
}