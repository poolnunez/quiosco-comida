import ProductCard from "@/components/products/ProductCard";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

type Props = {
    params: {
        slug: string
    }
}

async function getProducts(slug: string) {
    const products = await prisma.product.findMany({
        where: {
            category: {
                slug: slug
            }
        }
    })

    return products
}

export default async function page({ params: { slug } }: Props) {
    const products = await getProducts(slug)

    return (
        <>
            <Heading>Elige y personaliza tu pedido a continuación</Heading>
            <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-4 gap-4 items-start">
                {
                    products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))
                }
            </div>
        </>
    )
}