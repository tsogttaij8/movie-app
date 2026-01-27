"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import MovieZIcon from "../_icons/MovieZIcon";
import Image from "next/image";

const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export function Header() {
  const [genres, setGenres] = useState([]);
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await fetch(`${BASE_URL}/genre/movie/list?language=en`, {
          headers: { Authorization: TOKEN },
        });
        const data = await res.json();
        setGenres(data.genres || []);
      } catch (err) {
        console.error("Failed to fetch genres:", err);
      }
    };
    fetchGenres();
  }, []);
  useEffect(() => {
    if (!searchValue.trim()) {
      setResults([]);
      setShowResults(false);
      return;
    }

    setLoading(true);
    const delay = setTimeout(async () => {
      const res = await fetch(
        `${BASE_URL}/search/movie?query=${searchValue}&language=en-US`,
        { headers: { Authorization: TOKEN } },
      );
      const data = await res.json();
      setResults(data.results || []);
      setShowResults(true);
      setLoading(false);
    }, 500);

    return () => clearTimeout(delay);
  }, [searchValue]);
  return (
    <div className="flex justify-between items-center max-w-[1440px] h-[50px] px-[21px] mx-auto">
      <Link
        href="/"
        className="flex items-center gap-2 text-indigo-500 font-semibold transition hover:bg-gray-100 text-lg"
      >
        <MovieZIcon />
        <span className="italic">Movie Z</span>
      </Link>

      <div className="flex items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="flex items-center gap-1 border border-gray-300 rounded-md px-3 py-2 hover:bg-gray-50 transition text-sm"
              onClick={() => router.push("/genres")}
            >
              <Image
                src="/Vector.png"
                className="w-2 h-2"
                alt=""
                height={4}
                width={4}
              />
              <span>Genre</span>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="p-4 max-w-[500px]">
            <h3 className="text-2xl font-bold mb-2">Genres</h3>
            <p className="text-sm mb-3">See lists of movies by genre</p>
            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => (
                <Badge
                  key={genre.id}
                  className="cursor-pointer text-sm gap-2 text-black bg-white border border-gray-300 hover:bg-indigo-50 rounded-2xl"
                  onClick={() => router.push(`/genres/${genre.id}`)}
                >
                  {genre.name}
                  <Image src="/public/Vector.png" alt="" height={1} width={1} />
                </Badge>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="relative w-[300px]">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none"
          />
          {showResults && (
            <div className="absolute top-[110%] left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-[400px] overflow-y-auto z-50">
              {loading ? (
                <p className="text-center py-4 text-gray-500">Loading...</p>
              ) : results.length > 0 ? (
                results.map((movie) => (
                  <div
                    key={movie.id}
                    className="flex items-center gap-3 p-2 hover:bg-gray-100 cursor-pointer transition"
                    onClick={() => router.push(`./moviesDetail/${movie.id}`)}
                  >
                    <Image
                      src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                      alt={movie.title}
                      className="w-[41px] h-[60px] object-cover rounded"
                      height={60}
                      width={41}
                    />
                    <span className="text-sm font-medium text-gray-800">
                      {movie.title}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-center py-4 text-gray-400">
                  No results found
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      <button className="p-2 rounded-md hover:bg-gray-50 transition">
        <Image
          className="w-[30px] h-[30px]"
          src="/moon.svg"
          alt=""
          height={35}
          width={35}
        />
      </button>
    </div>
  );
}
