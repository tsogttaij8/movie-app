import MovieZIcon from "../_icons/MovieZIcon";
export function Header() {
  return (
    <div className="flex justify-between  items-center max-w-[1440px] h-[50px] px-[20px] mx-auto">
      <div className="flex items-center gap-2 text-indigo-500  font-semibold text-lg ">
        <MovieZIcon />
        <span className="italic">Movie Z</span>
      </div>

      <div className="flex item-center gap-3">
        <button className="flex item-center gay-1 border border-gray-300 rounded-md px-3 py-2 hover:bg-gray-50 transition text-sm">
          <span> Genre</span>
        </button>
        <div className="flex item-center border border-gray-300 rounded-md px-3 py-2 w-[250px]">
          <input
            type="text"
            placeholder="search.."
            className="ml-2 text-ms outline-none text-gray-600"
          />
        </div>
      </div>

      <button className="p-2  rounded-md hover;bg-gray-50 transition">
        <img className="w-[36px] h-[36px]" src="/moon.svg" />
      </button>
    </div>
  );
}
