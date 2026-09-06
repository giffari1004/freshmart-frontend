"use client";
import { useState } from "react";
import { ProductImage } from "../../constans";
interface ImageProductProps {
  images: ProductImage[];
  productName: string;
}
export function ImageProduct({
  images,
  productName,
}: ImageProductProps) {
  const primary =
    images.find((img) => img.isPrimary) ?? images[0];

  const [selected, setSelected] = useState(primary);
  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">
        {selected ? (
          <img
            src={selected.imageUrl}
            alt={productName}
            className="aspect-square w-full object-cover"
          />
        ) : (
          <div className="flex aspect-square items-center justify-center text-sm text-stone-400">
            No image
          </div>
        )}
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((image) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setSelected(image)}
              className={`overflow-hidden rounded-2xl border transition ${
                selected?.id === image.id
                  ? "border-emerald-600 ring-2 ring-emerald-100"
                  : "border-stone-200 hover:border-stone-300"
              }`}
            >
              <img
                src={image.imageUrl}
                alt={productName}
                className="aspect-square w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}