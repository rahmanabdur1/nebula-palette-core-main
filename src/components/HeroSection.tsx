"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import heroBackground from "@/assets/hero-bg.jpg";

export const HeroSection = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      <div className="absolute inset-0 " /> {/* Dark overlay for contrast */}
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-glow">
          Enter the gateway of{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-500 to-cyan-400">
            Future Pro Space Blockchain Platform
          </span>
        </h1>

        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
          <h2
            className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent 
        bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500"
          >
            Registration Starts In
          </h2>

          <a
            href="/Future-Pro.Space.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              className="text-lg px-8 py-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 
                     text-white font-bold rounded-xl shadow-lg shadow-cyan-500/30 hover:scale-105 
                     transition-transform duration-300 glow-effect animate-pulse-glow"
            >
              Download PDF
              <FileDown className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};
