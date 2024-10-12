'use client'
import { getImagePath } from '@/src/utils'
import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'
import { useState } from 'react'
import { TbPhotoPlus } from 'react-icons/tb'
type Props = {
    image: string | undefined
}

export default function ImageUpload({ image }: Props) {
    const [imageUrl, setImageUrl] = useState(image)

    return (
        <CldUploadWidget
            onSuccess={(result, { widget }) => {
                if (result.event === 'success') {
                    widget.close()
                    //@ts-expect-error Ignorando error de types de cloudinary
                    const url = result.info.secure_url
                    setImageUrl(url)
                }
            }}
            uploadPreset='quiosco-comida'
            options={{
                maxFiles: 1
            }}
        >
            {({ open }) => (
                <>
                    <div className='space-y-2'>
                        <label className='text-slate-800'>Imagen Producto</label>
                        <div onClick={() => open()} className='relative cursor-pointer hover:opacity-70 transition p-10 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600 bg-slate-100'>
                            <TbPhotoPlus
                                size={50}
                            />
                            <p className='text-lg font-semibold'>Agregar Imagen</p>
                            {imageUrl && (
                                <div className='absolute inset-0 w-full h-full'>
                                    <Image
                                        fill
                                        style={{ objectFit: 'contain' }}
                                        src={getImagePath(imageUrl)}
                                        alt='Imagen de Producto'
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <input type="hidden" name='image' defaultValue={imageUrl} />
                </>
            )}
        </CldUploadWidget>
    )
}