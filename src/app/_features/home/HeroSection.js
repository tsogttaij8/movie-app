"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const heroData = [
  {
    title: "Wicked",
    desc: "Elphaba, a misunderstood young woman because of her green skin, and Glinda, a popular girl, become friends until society turns them against each other...",
    img: "/Feature.png",
    rating: "6.9",
    fullrating: "/10",
  },
  {
    title: "Gladiator II",
    desc: "After his home is conquered by the tyrannical emperors who now lead Rome, Lucius is forced to enter the Colosseum and must look to his past to find strength to return the glory of Rome to its people.",
    img: "/Feature (1).png",
    rating: "6.9",
    fullrating: "/10",
  },
  {
    title: "Moana 2",
    desc: "After receiving an unexpected call from her wayfinding ancestors, Moana must journey to the far seas of Oceania and into dangerous, long-lost waters for an adventure unlike anything she's ever faced.",
    img: "/Feature (2).png",
    rating: "6.8",
    fullrating: "/10",
  },
];

export function HeroSection() {
  const [api, setApi] = React.useState(null);
  return (
    <div className=" w-full max-w-[1440px] mx-auto overflow-hidden ">
      <Carousel setApi={setApi}>
        <CarouselContent>
          {heroData.map((item, index) => (
            <CarouselItem key={index}>
              <Card className="border-0 shadow-none relative">
                <CardContent>
                  <img src={item.img} />

                  <div className="absolute bottom-[158px] md:left-[140px] text-white w-[404px] h-[264px]">
                    <div className="leading-tight py-1">
                      <h1 className="font-[16px] text-gray-200 mb-2 ">
                        Now Playing:
                      </h1>

                      <h2 className=" md:text-6xl font-semibold  mb-4">
                        {item.title}
                      </h2>
                      <span className="text-yellow-400 text-2xl">★</span>
                      <span className="text-2xl font-bold">{item.rating}</span>
                      <span className="text-2xl text-gray-400">
                        {item.fullrating}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 mb-4 py-1">
                      <p className="text-gray-200 text-[12px] w-[302px] h-[80px]">
                        {item.desc}
                      </p>
                    </div>

                    <Button className="bg-white text-black font-semibold  rounded-md hover:bg-gray-200 w-[145px] h-[40px] text-lg">
                      ▶ Watch Trailer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious
          onClick={() => api?.scrollPrev()}
          className="left-4 top-1/2 -translate-y-1/2 h-12 w-12 bg-white/60 text-black border-0 hover:bg-black/80 z-20"
        />
        <CarouselNext
          onClick={() => api?.scrollNext()}
          className="right-4 top-1/2 -translate-y-1/2 h-12 w-12 bg-white/60 text-black border-0 hover:bg-black/80 z-20"
        />
      </Carousel>
    </div>
  );
}
