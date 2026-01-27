"use client";

import { Header } from "@/app/_features/Header";
import { Footer } from "@/app/_features/Footer";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const BASE_URL = "https://api.themoviedb.org/3";

export default function MoviePage() {
  const [movieData, setMovieData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const { type } = useParams();
  const router = useRouter();
  const getData = async () => {
    const data = await fetch(
      `${BASE_URL}/movie/${type}?language=en-US&page=${page}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY",
        },
      },
    );
    const result = await data.json();

    setMovieData(result.results);
    setTotalPage(result.total_page);
  };

  useEffect(() => {
    getData();
  }, [page]);
  const handleNextdoublePageButton = () => {
    setPage(page + 2);
  };
  const handleNextPageButton = () => {
    setPage(page + 1);
  };
  const handlePreviousPageButton = () => {
    setPage(page - 1);
  };

  return (
    <div>
      <Header />
      <div className=" overflow-hidden mx-auto w-full max-w-[1440px] py-[50px] px-[90px] flex flex-col flex-wrap">
        <div className="flex justify-between pb-7">
          <h2 className="text-2xl font-semibold">
            {type.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
          </h2>
        </div>
        <div className="flex flex-wrap gap-5">
          {movieData.map((movie, index) => (
            <div
              key={index}
              onClick={() => router.push(`/moviesDetail/${movie.id}`)}
              className="cursor-pointer rounded-2xl overflow-hidden shadow-gray-600 hover:shadow-md transition"
            >
              <div
                className="w-[230px] h-[340px] rounded-t-2xl bg-cover bg-center "
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.poster_path})`,
                }}
              ></div>

              <div className="w-[230px] h-[94px] bg-gray-100 ">
                <div className=" pt-1 px-2 gap-1">
                  <span className="text-yellow-400 text-[14px]">★</span>
                  <span className="text-[15px]">{movie.vote_average}</span>
                  <span className="text-[14px] text-gray-400">/10</span>
                </div>
                <h1 className="px-2">{movie.title}</h1>
              </div>
            </div>
          ))}
        </div>
        <div className="flex mt-10 ml-130 ">
          <Pagination>
            <PaginationContent>
              <PaginationItem
                onClick={() => {
                  handlePreviousPageButton();
                }}
              >
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  {page}
                </PaginationLink>
              </PaginationItem>
              <PaginationItem
                onClick={() => {
                  handleNextPageButton();
                }}
              >
                <PaginationLink href="#">{page + 1}</PaginationLink>
              </PaginationItem>
              <PaginationItem
                onClick={() => {
                  handleNextdoublePageButton();
                }}
              >
                <PaginationLink href="#">{page + 2}</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem
                onClick={() => {
                  handleNextPageButton();
                }}
              >
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
      <Footer />
    </div>
  );
}
