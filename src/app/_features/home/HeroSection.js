"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const BASE_URL = "https://api.themoviedb.org/3";

export function HeroSection() {
  const [api, setApi] = React.useState(null);
  const [movieData, setMovieData] = useState([]);

  const getData = async () => {
    const data = await fetch(
      `${BASE_URL}/movie/now_playing?language=en-US&page=1`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY",
        },
      }
    );
    const result = await data.json();

    setMovieData(result.results);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="  overflow-hidden ">
      <Carousel setApi={setApi}>
        <CarouselContent>
          {movieData.map((item, index) => (
            <CarouselItem key={index}>
              <Card className="border-0 shadow-none relative">
                <CardContent>
                  <img
                    src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
                    alt={item.title}
                    className="w-full h-[600px] object-cover"
                  />

                  <div className="absolute bottom-[158px] md:left-[140px] text-white w-[404px] h-[264px]">
                    <div className="leading-tight py-1">
                      <h1 className="font-[16px] text-gray-200 mb-2 ">
                        Now Playing:
                      </h1>

                      <h2 className=" md:text-4xl font-semibold  mb-4">
                        {item.title}
                      </h2>
                      <span className="text-yellow-400 text-2xl">★</span>
                      <span className="text-2xl font-bold">{item.rating}</span>
                      <span className="text-2xl text-white">
                        {item.vote_average}
                      </span>
                      <span className="text-xl text-gray-400">/10</span>
                    </div>

                    <div className="flex items-center space-x-2 mb-4 py-1">
                      <p className="text-gray-200 text-[12px] w-[310px] h-[110px]">
                        {item.overview}
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
