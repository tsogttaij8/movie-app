"use client";
import { Header } from "@/app/_features/Header";
import { Footer } from "@/app/_features/Footer";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/original";
const TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export default function MoviesDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [videos, setVideos] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [director, setDirector] = useState([]);
  const [writers, setWriters] = useState([]);
  const [stars, setStars] = useState([]);
  const router = useRouter();

  const getMovie = async () => {
    const result = await fetch(`${BASE_URL}/movie/${id}?language=en-US`, {
      headers: { Authorization: TOKEN },
    });
    const data = await result.json();
    setMovie(data);
  };

  const getVideos = async () => {
    const result = await fetch(
      `${BASE_URL}/movie/${id}/videos?language=en-US`,
      {
        headers: { Authorization: TOKEN },
      },
    );
    const data = await result.json();
    setVideos(data.results);
  };

  const getCredits = async () => {
    const result = await fetch(
      `${BASE_URL}/movie/${id}/credits?language=en-US`,
      {
        headers: { Authorization: TOKEN },
      },
    );
    const data = await result.json();
    setStars(data.cast ? data.cast.slice(0, 5) : []);
    if (data.crew) {
      const directors = data.crew.filter((person) => person.job === "Director");
      const writers = data.crew.filter((person) =>
        ["Writer", "Screenplay", "Story"].includes(person.job),
      );
      setDirector(directors);
      setWriters(writers);
    }
  };

  const getSimilar = async () => {
    const result = await fetch(
      `${BASE_URL}/movie/${id}/similar?language=en-US&page=1`,
      { headers: { Authorization: TOKEN } },
    );
    const data = await result.json();
    setSimilar(data.results ? data.results.slice(0, 6) : []);
  };

  useEffect(() => {
    getMovie();
    getVideos();
    getCredits();
    getSimilar();
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  const trailer = videos.find(
    (v) => v.type === "Trailer" && v.site === "YouTube",
  );

  return (
    <div>
      <Header />
      <div className="w-full max-w-[1440px] mx-auto overflow-hidden py-[50px] px-[90px] flex flex-wrap">
        <div className="gap-8 w-full">
          <div className="flex flex-row justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
              <p className="text-gray-400 mb-4">
                {movie.release_date} • {movie.runtime}m
              </p>
            </div>
            <div>
              <h1>Rating</h1>
              <p className="text-yellow-400 text-lg mb-4">
                ★ {movie.vote_average?.toFixed(1)} / 10
              </p>
            </div>
          </div>

          <div className="flex flex-row gap-9">
            <Image
              src={`${IMAGE_URL}${movie.poster_path}`}
              alt={movie.title}
              className="w-[300px] h-[450px] rounded-xl"
              height={450}
              width={300}
            />
            {trailer ? (
              <iframe
                className="rounded-lg mt-4"
                width="760"
                height="428"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title="Trailer"
                allowFullScreen
              ></iframe>
            ) : (
              <p className="text-gray-400 mt-4">No trailer available</p>
            )}
          </div>
          <div className="flex flex-wrap gap-3 mt-[30px] mb-5">
            {movie.genres.map((genre) => (
              <span
                key={genre.id}
                onClick={() => router.push(`/genres/${genre.id}`)}
                className="px-3 cursor-pointer py-1 text-black border rounded-full text-sm"
              >
                {genre.name}
              </span>
            ))}
          </div>
          <div>
            <p className="text-lg mb-4">{movie.overview}</p>
          </div>
          <div className="mt-5">
            {director.length > 0 && (
              <p>
                <strong>Director:</strong>{" "}
                {director.map((d) => d.name).join(", ")}
              </p>
            )}
          </div>

          <div className="mt-5">
            {writers.length > 0 && (
              <p>
                <strong>Writers:</strong>{" "}
                {writers.map((w) => w.name).join(", ")}
              </p>
            )}
          </div>

          <div className="mt-5">
            {stars.length > 0 && (
              <p>
                <strong>Stars:</strong> {stars.map((s) => s.name).join(", ")}
              </p>
            )}
          </div>
        </div>
        <h2 className="text-2xl font-semibold mt-10 mb-4 w-full">
          More like this
        </h2>
        <div className="flex gap-5 overflow-x-auto pb-5 w-full">
          {similar.map((movie) => (
            <div
              key={movie.id}
              className="w-[200px] cursor-pointer"
              onClick={() => router.push(`/moviesDetail/${movie.id}`)}
            >
              <Image
                src={
                  movie.poster_path
                    ? `${IMAGE_URL}${movie.poster_path}`
                    : "/no-poster.png"
                }
                alt={movie.title}
                className="rounded-lg w-full h-[300px] object-cover"
                height={300}
                width={1440}
              />
              <p className="text-sm mt-2">{movie.title}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
