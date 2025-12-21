import { Link } from "react-router-dom"
import MovieCard from "./moviecard"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function CarouselComponent({ items }:any) {
  if (!items || items.length === 0) return null

  return (
<div className="w-full flex justify-center px-4 sm:px-6 ">
      <Carousel
        opts={{ align: "start" }}
        className="w-full max-w-full md:max-w-3/5 lg:max-w-4/5 relative"
      >
        <CarouselContent className="flex gap-15 sm:gap-20 md:gap-26 lg:gap-20 custom-gap">
          {items.map((item: any) => (
            <CarouselItem
              key={item.id}
              className="
                flex-none 
                basis-[40%] sm:basis-[35%] md:basis-1/4 lg:basis-1/6 cursor-pointer
              "
            >
              <div className="p-2 ">
                <Link
          to={`title/${item.id}`}
        >
                <MovieCard item={item}   /></Link>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Buttons hidden on mobile, visible on md+ */}
        <CarouselPrevious className="hidden md:flex cursor-pointer" />
        <CarouselNext className="hidden md:flex  cursor-pointer" />
      </Carousel>
    </div>
  )
}
