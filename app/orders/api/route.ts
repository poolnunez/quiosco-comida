import { prisma } from "@/src/lib/prisma";

export async function GET() {
    const orders = await prisma.order.findMany({
        take: 5,
        where: {
            orderReatyAt: {
                not: null
            }
        },
        orderBy: {
            orderReatyAt: 'desc'
        },
        include: {
            orderProducts: {
                include:{
                    product: true
                }
            }
        }
    })

    return Response.json(orders)
}