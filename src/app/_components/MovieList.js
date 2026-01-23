"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const BASE_URL = "https://api.themoviedb.org/3";

export default function MovieList({ type }) {
  const [movieData, setMovieData] = useState([]);
  const router = useRouter();

  const getData = async () => {
    const data = await fetch(
      `${BASE_URL}/movie/${type}?language=en-US&page=1`,
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
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSeeMoreButton = () => {
    router.push(`/movies/${type}`);
  };
  return (
    <div className=" overflow-hidden py-[50px] px-[90px] flex flex-col flex-wrap">
      <div className="flex justify-between pb-7">
        <h2 className="text-2xl font-semibold">
          {type.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
        </h2>
        <button
          onClick={handleSeeMoreButton}
          className="text-xl flex items-center gap-3 justify-center rounded-md cursor-pointer hover:bg-gray-200 w-[120px] h-[35px]"
        >
          see more
          <Image
            className="w-[15px] h-[15px]"
            src="/arrow continue.png"
            alt=""
            height={15}
            width={15}
          />
        </button>
      </div>
      <div className="flex flex-wrap gap-5 ">
        {movieData.slice(0, 10).map((movie, index) => (
          <div
            key={index}
            onClick={() => router.push(`/moviesDetail/${movie.id}`)}
            className="cursor-pointer rounded-2xl overflow-hidden shadow-gray-500 hover:shadow-md transition"
          >
            <div
              className="w-[230px] h-[340px] bg-cover bg-center rounded-t-2xl"
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
    </div>
  );
}
