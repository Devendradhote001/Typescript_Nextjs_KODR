"use client";

import Image from "next/image";
import { Star } from "lucide-react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ProductCard({ product }) {
  return (
    <Card className="group overflow-hidden border-border bg-card transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Product Image */}
      <div className="relative h-64 overflow-hidden bg-muted p-6">
        <img
          src={product.image}
          alt={product.title}
          className="object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <CardContent className="space-y-3 p-5">
        {/* Category */}
        <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium capitalize text-primary">
          {product.category}
        </span>

        {/* Title */}
        <h2 className="line-clamp-2 text-lg font-semibold text-foreground">
          {product.title}
        </h2>

        {/* Description */}
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <Star className="fill-yellow-400 text-yellow-400" size={16} />

          <span className="text-sm font-medium">{product.rating?.rate}</span>

          <span className="text-sm text-muted-foreground">
            ({product.rating?.count} reviews)
          </span>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between p-5 pt-0">
        <div className="text-2xl font-bold text-primary">${product.price}</div>

        <Button>Add to Cart</Button>
      </CardFooter>
    </Card>
  );
}
