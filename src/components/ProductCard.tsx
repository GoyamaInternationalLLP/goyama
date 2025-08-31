"use client";

import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { Product } from "../../types";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <CardContainer
      className="inter-var"
      containerClassName="py-0"
    >
      <CardBody className="bg-gray-100 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-4 pt-2 border">
        <CardItem
          translateZ="100"
          className="w-full mt-4"
        >
          <img
            src={product.images![0]}
            height="1000"
            width="1000"
            className="h-72 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-5">
          <CardItem
            translateZ="50"
            className="text-xl font-bold text-neutral-600 dark:text-white"
          >
            {product.title}
          </CardItem>
          <CardItem
            translateZ={20}
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white hover:underline bg-emerald-500 text-white"
          >
            Explore →
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
};

export default ProductCard;
