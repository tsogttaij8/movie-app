import MovieZIcon from "../_icons/MovieZIcon";

export function Footer() {
  return (
    <footer className="bg-indigo-600 text-white mt-16">
      <div className="max-w-[1440px] h-[280px] mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h1 className="text-xl font-semibold">🎬 Movie Z</h1>
          <p className="text-sm opacity-80 mt-2">
            © 2024 Movie Z. All Rights Reserved.
          </p>
        </div>
        <div className="ml-50">
          <h3 className="font-semibold mb-3">Contact Imformation</h3>
          <p className="text-sm ">Email: support@moviez.com</p>
          <p className="text-sm ">Phone: +976 7012-4567</p>
        </div>
        <div>
          <h3 className="font-semibold mb-3">Follow us</h3>
          <div className="flex gap-4">
            <a href="#" className="text-sm hover:underline">
              Facebook
            </a>
            <a href="#" className="text-sm hover:underline">
              Instagram
            </a>
            <a href="#" className="text-sm hover:underline">
              Twitter
            </a>
            <a href="#" className="text-sm hover:underline">
              YouTube
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
