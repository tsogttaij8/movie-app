"use client";

import { useEffect, useState } from "react";

const BASE_URL = "https://api.themoviedb.org/3";

export default function MovieList({ type }) {
  const [movieData, setMovieData] = useState([]);

  const getData = async () => {
    const data = await fetch(
      `${BASE_URL}/movie/${type}?language=en-US&page=1`,
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
    <div className="overflow-hidden py-[50px] px-[90px] flex flex-col flex-wrap">
      <div className="flex justify-between pb-7 ">
        <h1 className="text-2xl font-semibold ">{type}</h1>
        <button
          className=" flex  justify-center text-xl hover:bg-gray-300 w-[120px] h-[35px]
        rounded-md "
        >
          see more
        </button>
      </div>
      <div className="flex flex-wrap gap-5 ">
        {movieData.map((movie, index) => (
          <div key={index} className="rounded-md">
            <div
              className="w-[230px] h-[340px] bg-cover bg-center shadow-md"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.poster_path})`,
              }}
            ></div>
            <div></div>
          </div>
        ))}
      </div>
    </div>
  );
}
