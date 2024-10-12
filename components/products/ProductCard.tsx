import Image from "next/image"
import { formatCurrency, getImagePath } from "@/src/utils"
import { Product } from "@prisma/client"
import AddProductButton from "./AddProductButton"

type Props = {
    product: Product
}

export default function ProductCard({ product }: Props) {
    const imagePath = getImagePath(product.image)
    return (
        <div className="border bg-white">
            <Image src={imagePath} alt={`Imagen platillo ${product.name}`} width={400} height={500} />
            <div className="p-5">
                <h3 className="tex-2xl font-bold">{product.name}</h3>
                <p className="mt-5 font-black text-4xl text-amber-500">
                    {formatCurrency(product.price)}
                </p>
            </div>
            <AddProductButton product={product} />
        </div>
    )
}