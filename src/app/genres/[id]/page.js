"use client";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/app/_features/Header";
import { Footer } from "@/app/_features/Footer";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Image from "next/image";

const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";
const TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export default function Page() {
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const router = useRouter();
  const { id: genreId } = useParams();
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const [genreName, setGenreName] = useState("");
  useEffect(() => {
    async function getGenres() {
      const response = await fetch(`${BASE_URL}/genre/movie/list?language=en`, {
        headers: { Authorization: TOKEN },
      });
      const data = await response.json();
      setGenres(data.genres);
    }
    getGenres();
  }, []);

  useEffect(() => {
    async function getMoviesByGenre() {
      const response = await fetch(
        `${BASE_URL}/discover/movie?language=en&with_genres=${genreId}&page=${page}`,
        {
          headers: { Authorization: TOKEN },
        },
      );
      const data = await response.json();
      setMovies(data.results);
      setTotalPages(data.total_pages);
      const genreObject = genres.find((g) => g.id === Number(genreId));
      setGenreName(genreObject ? genreObject.name : "");

      setTotalResults(data.total_results);
    }
    getMoviesByGenre();
  }, [genres, genreId, page]);
  const handleNextPageButton = () => {
    setPage(page + 1);
  };
  const handlePreviousPageButton = () => {
    setPage(page - 1);
  };
  const handleNextPageBtn = () => {
    setPage(page + 2);
  };
  return (
    <div>
      <Header />
      <div className="max-w-[1440px] flex mx-auto px-10 py-10">
        <div>
          <h1 className="text-3xl font-semibold mb-6">Search filter</h1>
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-2">Genres</h3>
            <p className=" mb-4 text-sm">See lists of movies by genre</p>
            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => (
                <Badge
                  key={genre.id}
                  onClick={() => router.push(`/genres/${genre.id}`)}
                  className={`cursor-pointer px-3 py-2 rounded-full text-black text-sm transition ${
                    genreId === genre.id
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 hover:bg-indigo-50"
                  }`}
                >
                  {genre.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-medium mb-4">
            {totalResults} titles in {genreName}
          </h2>

          <div className="grid grid-cols-4 gap-6 ">
            {movies.slice(0, 12).map((movie) => (
              <div
                key={movie.id}
                onClick={() => router.push(`/moviesDetail/${movie.id}`)}
                className="cursor-pointer rounded-2xl overflow-hidden shadow-gray-500 hover:shadow-md transition"
              >
                <Image
                  src={
                    movie.poster_path
                      ? `${IMAGE_URL}${movie.poster_path}`
                      : "/no-poster.png"
                  }
                  alt={movie.title}
                  height={244}
                  width={1440}
                  className="w-full h-[244px] object-cover rounded-t-2xl"
                />
                <div className="bg-gray-100 p-2 h-[87px] rounded-b-2xl">
                  <div className="flex items-center">
                    <p className="text-[14px] px-2">
                      ⭐{movie.vote_average.toFixed(1)}
                    </p>
                    <p className="text-gray-500 text-sm">/10</p>
                  </div>

                  <p className="mt-1 text-sm font-medium px-1 line-clamp-2">
                    {movie.title}
                  </p>
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
                    handleNextPageBtn();
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
      </div>
      <Footer />
    </div>
  );
}
