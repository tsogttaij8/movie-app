"use client";

import Link from "next/link";
import MovieZIcon from "../_icons/MovieZIcon";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export function Header() {
  const [genres, setGenres] = useState([]);
  const router = useRouter();

  const getGenres = async () => {
    try {
      const res = await fetch(`${BASE_URL}/genre/movie/list?language=en`, {
        headers: { Authorization: TOKEN },
      });
      const data = await res.json();
      if (data.genres) setGenres(data.genres);
    } catch (err) {
      console.error("Failed to load genres:", err);
    }
  };

  useEffect(() => {
    getGenres();
  }, []);

  return (
    <header className="flex justify-between items-center max-w-[1440px] h-[60px] px-6 mx-auto border-b bg-white/70 backdrop-blur-md">
      <Link
        href="/"
        className="flex items-center gap-2 text-indigo-600 font-semibold text-lg"
      >
        <MovieZIcon />
        <span className="italic">Movie Z</span>
      </Link>

      <div className="flex items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              onClick={() => router.push("/genres")}
              className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2 hover:bg-gray-50 transition text-sm"
            >
              Genre
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-[260px] p-3 mt-2 rounded-xl shadow-lg bg-white/80 backdrop-blur-md border border-gray-200">
            <p className="font-semibold mb-2 text-sm text-gray-700">
              Select Genre
            </p>
            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => (
                <Badge
                  key={genre.id}
                  onClick={() => router.push(`/genres/${genre.id}`)}
                  className="cursor-pointer hover:bg-indigo-100 hover:text-indigo-700 border-gray-300 transition"
                >
                  {genre.name}
                </Badge>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 w-[250px]">
          <input
            type="text"
            placeholder="Search..."
            className="w-full text-sm outline-none text-gray-700 placeholder-gray-400"
          />
        </div>
      </div>

      <button className="p-2 rounded-md hover:bg-gray-100 transition">
        <img className="w-6 h-6" src="/moon.svg" alt="toggle theme" />
      </button>
    </header>
  );
}
