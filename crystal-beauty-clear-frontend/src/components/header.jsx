export default function Header() {
    return (
      <header className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white h-[60px] flex items-center justify-between px-6 shadow-md">
        <h1 className="text-xl font-bold tracking-wide">Crystal Beauty Clear</h1>
        <nav className="hidden md:flex space-x-4 text-sm">
          <a href="#" className="hover:underline hover:text-blue-100 transition">Home</a>
          <a href="#" className="hover:underline hover:text-blue-100 transition">Services</a>
          <a href="#" className="hover:underline hover:text-blue-100 transition">Contact</a>
        </nav>
      </header>
    );
  }
  