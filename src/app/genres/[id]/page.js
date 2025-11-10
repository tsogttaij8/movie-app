"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Header } from "@/app/_features/Header";

import { Badge } from "@/components/ui/badge";

const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export default function GenrePage() {
  const { id } = useParams();
  const [movies, setMovies] = useState([]);
  const [genreName, setGenreName] = useState("");
  const router = useRouter();

  const getMoviesByGenre = async () => {
    try {
      const res = await fetch(
        `${BASE_URL}/discover/movie?with_genres=${id}&language=en-US`,
        {
          headers: { Authorization: TOKEN },
        }
      );
      const data = await res.json();
      setMovies(data.results || []);
    } catch (error) {
      console.error("Failed to load movies:", error);
    }
  };

  const getGenreName = async () => {
    try {
      const res = await fetch(`${BASE_URL}/genre/movie/list?language=en-US`, {
        headers: { Authorization: TOKEN },
      });
      const data = await res.json();
      const found = data.genres.find((g) => String(g.id) === id);
      if (found) setGenreName(found.name);
    } catch (error) {
      console.error("Failed to load genre name:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getMoviesByGenre();
      getGenreName();
    }
  }, [id]);

  return (
    <div>
      <Header />

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            {genreName || "Loading..."} Movies
          </h1>
        </div>

        {movies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-3">
                  <h3 className="text-sm font-medium truncate">
                    {movie.title}
                  </h3>
                  <p className="text-xs text-gray-500">
                    ⭐ {movie.vote_average?.toFixed(1) || "N/A"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No movies found.</p>
        )}
      </main>
    </div>
  );
}
