'use client'
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Category } from "@prisma/client"

type Props = {
    category: Category
}

export default function CategoryIcon({ category }: Props) {
    const params = useParams()

    return (
        <div
            className={`${category.slug === params.slug ? 'bg-amber-400' :  ''} flex items-center gap-4 w-full border-t border-gray-200 p-3 last-of-type:border-b`}
        >
            <div className="w-16 h-16 relative">
                <Image fill src={`/icon_${category.slug}.svg`} alt="Imagen Categoria" />
            </div>

            <Link className="font-bold" href={`/order/${category.slug}`}>{category.name}</Link>
        </div>
    )
}