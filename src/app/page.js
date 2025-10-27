import { Header } from "./_features/Header";
import { HeroSection } from "./_features/home/HeroSection";
import MovieList from "./_components/MovieList";

export default function Page() {
  return (
    <div className="w-full max-w-[1440px] mx-auto">
      <Header />
      <HeroSection />
      <MovieList type="upcoming" />
      <MovieList type="popular" />
      <MovieList type="top_rated" />
    </div>
  );
}
