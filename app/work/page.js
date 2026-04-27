import HoverImagePop from "@/components/HoverImagePop";
import CustomCursor from "@/components/CustomCursor";

// Replace these with your real projects and images
const projects = [
  {
    id: 1,
    title: "Brand Identity",
    category: "Branding",
    year: "2024",
    tilt: 2,
    image: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=640&q=80",
  },
  {
    id: 2,
    title: "E-Commerce Platform",
    category: "Product Design",
    year: "2024",
    tilt: -2,
    image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=640&q=80",
  },
  {
    id: 3,
    title: "Motion & Visual",
    category: "Motion Design",
    year: "2023",
    tilt: 3,
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=640&q=80",
  },
  {
    id: 4,
    title: "Mobile Application",
    category: "UI / UX",
    year: "2023",
    tilt: -1,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=640&q=80",
  },
  {
    id: 5,
    title: "Editorial System",
    category: "Typography",
    year: "2023",
    tilt: 2,
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=640&q=80",
  },
  {
    id: 6,
    title: "Design System",
    category: "Systems",
    year: "2022",
    tilt: -2,
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=640&q=80",
  },
];

export default function WorkPage() {
  return (
    <>
      <CustomCursor />
      <main className="min-h-screen bg-[#0a0a0a] font-sans">
        <div className="max-w-5xl mx-auto px-6 md:px-10 lg:px-12">
          {/* Nav */}
          <nav className="flex items-center justify-between py-8 md:py-10">
            <span className="text-sm font-medium text-white/60 tracking-widest uppercase">
              Portfolio
            </span>
            <div className="flex gap-8 text-sm text-white/40">
              <a href="#" className="hover:text-white/80 transition-colors">About</a>
              <a href="#" className="hover:text-white/80 transition-colors">Contact</a>
            </div>
          </nav>

          {/* Header */}
          <header className="pt-12 md:pt-20 pb-10 md:pb-16">
            <p className="text-sm text-white/30 tracking-widest uppercase mb-4">
              Selected Works
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white leading-none">
              Work
            </h1>
          </header>

          {/* Project list with hover image pop */}
          <section className="pb-24">
            <HoverImagePop projects={projects} />
          </section>

          {/* Footer */}
          <footer className="border-t border-white/10 py-8 flex items-center justify-between text-xs text-white/25">
            <span>© 2024</span>
            <span>All rights reserved</span>
          </footer>
        </div>
      </main>
    </>
  );
}
