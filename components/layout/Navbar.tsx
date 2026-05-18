"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import Image from "next/image";

import { usePathname } from "next/navigation";

import {
  signIn,
  signOut,
  useSession,
} from "next-auth/react";

import GlobalSearch from "@/components/ui/GlobalSearch";

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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
        scrolled
          ? "bg-black/70 backdrop-blur-xl border-white/10"
          : "bg-transparent border-transparent"
      }`}
    >

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-wide text-white"
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
            className={`relative transition hover:text-white ${
              pathname === "/"
                ? "text-white"
                : "text-zinc-400"
            }`}
          >
            Inicio

            {pathname === "/" && (
              <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-white rounded-full" />
            )}

          </Link>

          {/* CATALOGO */}
          <Link
            href="/catalogo"
            className={`relative transition hover:text-white ${
              pathname === "/catalogo"
                ? "text-white"
                : "text-zinc-400"
            }`}
          >
            Catálogo

            {pathname === "/catalogo" && (
              <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-white rounded-full" />
            )}

          </Link>

          {/* TEMPORADAS */}
          <Link
            href="/temporadas"
            className={`relative transition hover:text-white ${
              pathname === "/temporadas"
                ? "text-white"
                : "text-zinc-400"
            }`}
          >
            Temporadas

            {pathname === "/temporadas" && (
              <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-white rounded-full" />
            )}

          </Link>

          {/* WATCHLIST */}
          <Link
            href="/watchlist"
            className={`relative transition hover:text-white ${
              pathname === "/watchlist"
                ? "text-white"
                : "text-zinc-400"
            }`}
          >
            Watchlist

            {pathname === "/watchlist" && (
              <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-white rounded-full" />
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
                  className="rounded-full border border-white/10"
                />

              )}

              {/* LOGOUT */}
              <button
                onClick={() => signOut()}
                className="px-5 py-2 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
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
          className="md:hidden text-white text-2xl"
        >
          ☰
        </button>

      </div>

      {/* MOBILE MENU */}
      {menuOpen && (

        <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10">

          <div className="flex flex-col p-6 gap-6 text-lg">

            <Link
              href="/"
              className="text-zinc-300 hover:text-white transition"
              onClick={() =>
                setMenuOpen(false)
              }
            >
              Inicio
            </Link>

            <Link
              href="/catalogo"
              className="text-zinc-300 hover:text-white transition"
              onClick={() =>
                setMenuOpen(false)
              }
            >
              Catálogo
            </Link>

            <Link
              href="/temporadas"
              className="text-zinc-300 hover:text-white transition"
              onClick={() =>
                setMenuOpen(false)
              }
            >
              Temporadas
            </Link>

            <Link
              href="/watchlist"
              className="text-zinc-300 hover:text-white transition"
              onClick={() =>
                setMenuOpen(false)
              }
            >
              Watchlist
            </Link>
            <Link
              href="/perfil"
              className={`relative transition hover:text-white ${
                pathname === "/perfil"
                  ? "text-white"
                  : "text-zinc-400"
              }`}
            >
              Perfil

              {pathname === "/perfil" && (
                <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-white rounded-full" />
              )}

            </Link>

            {/* MOBILE AUTH */}
            {session?.user ? (

              <button
                onClick={() => signOut()}
                className="text-left text-zinc-300 hover:text-white transition"
              >
                Logout
              </button>

            ) : (

              <button
                onClick={() => signIn("google")}
                className="text-left text-zinc-300 hover:text-white transition"
              >
                Login
              </button>

            )}

          </div>

        </div>

      )}

    </nav>
  );
}