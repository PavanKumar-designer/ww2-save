"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

function ProjectRow({ project, onMouseEnter, onMouseLeave, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
      onMouseEnter={() => onMouseEnter(project)}
      onMouseLeave={onMouseLeave}
      className="group relative flex items-center justify-between border-b border-white/10 py-6 md:py-8 cursor-none"
    >
      {/* Hover underline fill */}
      <div className="absolute inset-0 bg-white/[0.03] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]" />

      <div className="relative flex items-baseline gap-4 md:gap-6">
        <span className="text-xs text-white/30 tabular-nums w-6">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-white/90 group-hover:text-white transition-colors duration-300">
          {project.title}
        </h2>
      </div>

      <div className="relative flex items-center gap-6 md:gap-10">
        <span className="hidden md:block text-sm text-white/40 group-hover:text-white/60 transition-colors duration-300">
          {project.category}
        </span>
        <span className="text-xs text-white/25 group-hover:text-white/50 transition-colors duration-300 tabular-nums">
          {project.year}
        </span>
        <motion.span
          className="text-white/30 group-hover:text-white/80 transition-colors duration-300"
          animate={{ x: 0 }}
          whileHover={{ x: 4 }}
        >
          →
        </motion.span>
      </div>
    </motion.div>
  );
}

export default function HoverImagePop({ projects }) {
  const [activeProject, setActiveProject] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const rafRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    });
  }, []);

  const handleMouseEnter = useCallback((project) => {
    setActiveProject(project);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setActiveProject(null);
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative"
    >
      {/* Custom cursor */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            className="pointer-events-none absolute z-50 flex items-center justify-center"
            style={{
              left: mousePos.x,
              top: mousePos.y,
              translateX: "-50%",
              translateY: "-50%",
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
              <span className="text-black text-xs font-bold">→</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating preview image — follows cursor */}
      <AnimatePresence mode="wait">
        {activeProject && (
          <motion.div
            key={activeProject.id}
            className="pointer-events-none absolute z-40 overflow-hidden rounded-xl shadow-2xl"
            style={{
              left: mousePos.x,
              top: mousePos.y,
              width: 320,
              height: 220,
              translateX: "5%",
              translateY: "-55%",
            }}
            initial={{ scale: 0.7, opacity: 0, rotate: -4 }}
            animate={{ scale: 1, opacity: 1, rotate: activeProject.tilt ?? 2 }}
            exit={{ scale: 0.7, opacity: 0, rotate: 4 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Image
              src={activeProject.image}
              alt={activeProject.title}
              fill
              className="object-cover"
              sizes="320px"
              priority
            />
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project list */}
      <div>
        {projects.map((project, index) => (
          <ProjectRow
            key={project.id}
            project={project}
            index={index}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        ))}
      </div>
    </div>
  );
}
