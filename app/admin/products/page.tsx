import { redirect } from "next/navigation";
import ProductsPagination from "@/components/products/ProductsPagination";
import ProductTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import ProductSearchForm from "@/components/products/ProductSearchForm";

async function productCount() {
  return await prisma.product.count()
}

async function getProducts(page: number, pageZise: number) {

  const skip = (page-1)*pageZise

  const products = await prisma.product.findMany({
    take: pageZise,
    skip,
    include: {
      category: true
    }
  })

  return products
}

export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>>

export default async function ProductsPage({ searchParams }: { searchParams: { page: string } }) {

  const pageZise = 10
  const page = +searchParams.page || 1

  if(page < 0) redirect('/admin/products')

  const productsData = getProducts(page, pageZise)
  const totalProductsData = productCount()

  const [products, totalProducts] = await Promise.all([productsData, totalProductsData])

  const totalPages = Math.ceil(totalProducts / pageZise)

  if(page > totalPages) redirect('/admin/products')

  return (
    <>
      <Heading>Administrar Productos</Heading>
      <div className="flex flex-col gap-5 lg:flex-row lg:justify-between">
        <Link href="/admin/products/new" className="bg-amber-400 w-full lg:w-auto px-10 py-3 text-center font-bold cursor-pointer">Crear Producto</Link>
        <ProductSearchForm/>
      </div>
      <ProductTable products={products} />
      <ProductsPagination page={page} totalPages={totalPages}/>
    </>
  )
}