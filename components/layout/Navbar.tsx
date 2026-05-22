"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

import Link from "next/link";

import { usePathname } from "next/navigation";

import GlobalSearch from "@/components/ui/GlobalSearch";

import {
  signIn,
  signOut,
  useSession,
} from "next-auth/react";

export default function Navbar() {

  const [scrolled, setScrolled] =
    useState(false);

  const [menuOpen, setMenuOpen] =
    useState(false);

  const pathname = usePathname();

  const { data: session } =
    useSession();

  useEffect(() => {

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };

  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/60 backdrop-blur-2xl border-b border-white/10 shadow-2xl shadow-black/20"
          : "bg-transparent"
      }`}
    >

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link
          href="/"
          className="text-2xl font-black tracking-[0.2em] text-white transition duration-500 hover:text-zinc-200"
        >
          24 MINUTES
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-8">

          {/* SEARCH */}
          <GlobalSearch />

          {/* INICIO */}
          <Link
            href="/"
            className={`relative transition duration-300 hover:text-white ${
              pathname === "/"
                ? "text-white"
                : "text-zinc-400"
            }`}
          >
            Inicio

            {pathname === "/" && (
              <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-fuchsia-500 to-cyan-400 rounded-full shadow-lg shadow-fuchsia-500/20" />
            )}

          </Link>

          {/* CATALOGO */}
          <Link
            href="/catalogo"
            className={`relative transition duration-300 hover:text-white ${
              pathname === "/catalogo"
                ? "text-white"
                : "text-zinc-400"
            }`}
          >
            Catálogo

            {pathname === "/catalogo" && (
              <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-fuchsia-500 to-cyan-400 rounded-full shadow-lg shadow-fuchsia-500/20" />
            )}

          </Link>

          {/* TEMPORADAS */}
          <Link
            href="/temporadas"
            className={`relative transition duration-300 hover:text-white ${
              pathname === "/temporadas"
                ? "text-white"
                : "text-zinc-400"
            }`}
          >
            Temporadas

            {pathname === "/temporadas" && (
              <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-fuchsia-500 to-cyan-400 rounded-full shadow-lg shadow-fuchsia-500/20" />
            )}

          </Link>

          {/* WATCHLIST */}
          <Link
            href="/watchlist"
            className={`relative transition duration-300 hover:text-white ${
              pathname === "/watchlist"
                ? "text-white"
                : "text-zinc-400"
            }`}
          >
            Watchlist

            {pathname === "/watchlist" && (
              <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-fuchsia-500 to-cyan-400 rounded-full shadow-lg shadow-fuchsia-500/20" />
            )}

          </Link>

          {/* PERFIL */}
          <Link
            href="/perfil"
            className={`relative transition duration-300 hover:text-white ${
              pathname === "/perfil"
                ? "text-white"
                : "text-zinc-400"
            }`}
          >
            Perfil

            {pathname === "/perfil" && (
              <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-fuchsia-500 to-cyan-400 rounded-full shadow-lg shadow-fuchsia-500/20" />
            )}

          </Link>

          {/* AUTH */}
          {session?.user ? (

            <div className="flex items-center gap-4">

              {/* AVATAR */}
              {session.user.image && (

                <Image
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  width={42}
                  height={42}
                  className="rounded-full border border-white/10 transition duration-300 hover:scale-110 hover:border-white/20"
                />

              )}

              {/* LOGOUT */}
              <button
                onClick={() => signOut()}
                className="px-5 py-2 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition duration-300 backdrop-blur-xl"
              >
                Logout
              </button>

            </div>

          ) : (

            <button
              onClick={() => signIn("google")}
              className="px-5 py-2 rounded-2xl bg-white text-black font-semibold hover:scale-105 transition duration-300"
            >
              Login
            </button>

          )}

        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
          className="md:hidden text-white text-3xl transition duration-300 hover:scale-110"
        >
          ☰
        </button>

      </div>

      {/* MOBILE MENU */}
      {menuOpen && (

        <div className="md:hidden bg-black/95 backdrop-blur-2xl border-t border-white/10">

          <div className="flex flex-col p-6 gap-6 text-lg">

            <Link
              href="/"
              className="text-zinc-300 hover:text-white transition duration-300"
              onClick={() =>
                setMenuOpen(false)
              }
            >
              Inicio
            </Link>

            <Link
              href="/catalogo"
              className="text-zinc-300 hover:text-white transition duration-300"
              onClick={() =>
                setMenuOpen(false)
              }
            >
              Catálogo
            </Link>

            <Link
              href="/temporadas"
              className="text-zinc-300 hover:text-white transition duration-300"
              onClick={() =>
                setMenuOpen(false)
              }
            >
              Temporadas
            </Link>

            <Link
              href="/watchlist"
              className="text-zinc-300 hover:text-white transition duration-300"
              onClick={() =>
                setMenuOpen(false)
              }
            >
              Watchlist
            </Link>

            <Link
              href="/perfil"
              className="text-zinc-300 hover:text-white transition duration-300"
              onClick={() =>
                setMenuOpen(false)
              }
            >
              Perfil
            </Link>

            <Link
            href="/news"
            className="text-zinc-300 hover:text-white transition duration-300"
            onClick={() =>
              setMenuOpen(false)
            }
          >
            Noticias
          </Link>

          </div>

        </div>

      )}

    </nav>
  );
}