"use client";

import Link from "next/link";

import {
  useEffect,
  useState,
} from "react";

import {
  usePathname,
} from "next/navigation";

import {
  signIn,
  signOut,
  useSession,
} from "next-auth/react";

export default function Navbar() {

  const pathname =
    usePathname();

  const {
    data: session,
  } = useSession();

  const [scrolled, setScrolled] =
    useState(false);

  const [menuOpen, setMenuOpen] =
    useState(false);

  useEffect(() => {

    const handleScroll = () => {

      setScrolled(
        window.scrollY > 20
      );

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

  useEffect(() => {

    document.body.style.overflow =
      menuOpen
        ? "hidden"
        : "auto";

  }, [menuOpen]);

  const navLinks = [
    {
      href: "/",
      label: "Inicio",
    },

    {
      href: "/catalogo",
      label: "Catálogo",
    },

    {
      href: "/temporadas",
      label: "Temporadas",
    },

    {
      href: "/watchlist",
      label: "Watchlist",
    },

    {
      href: "/news",
      label: "Noticias",
    },
  ];

  return (
    <>

      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 w-[96%] max-w-7xl z-50 rounded-[32px] border transition-all duration-700 ${
          scrolled
            ? "bg-black/70 backdrop-blur-2xl border-white/10 shadow-2xl shadow-black/40"
            : "bg-white/[0.03] backdrop-blur-xl border-white/5"
        }`}
      >

        <div className="px-5 md:px-8 py-4 flex items-center justify-between">

          {/* LOGO */}
          <Link
            href="/"
            className="text-lg sm:text-xl md:text-2xl font-black tracking-[0.25em] text-white transition duration-500 hover:text-zinc-200 hover:scale-[1.02]"
          >

            24 MINUTES

          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-8">

            {navLinks.map(
              (link) => {

              const isActive =
                pathname ===
                link.href;

              return (

                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-sm tracking-wide transition duration-300 ${
                    isActive
                      ? "text-white"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >

                  {link.label}

                  {/* ACTIVE LINE */}
                  <span
                    className={`absolute -bottom-2 left-0 h-[2px] bg-white rounded-full transition-all duration-300 ${
                      isActive
                        ? "w-full"
                        : "w-0"
                    }`}
                  />

                </Link>

              );

            })}

          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4">

            {/* PROFILE */}
            {session?.user && (

              <Link
                href="/perfil"
                className="hidden md:flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition duration-300"
              >

                <div className="w-8 h-8 rounded-full overflow-hidden bg-white/10">

                  {session.user.image && (

                    <img
                      src={
                        session.user.image
                      }
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />

                  )}

                </div>

                <span className="text-sm text-zinc-300">

                  Perfil

                </span>

              </Link>

            )}

            {/* AUTH */}
            <div className="hidden md:flex items-center">

              {session?.user ? (

                <button
                  onClick={() =>
                    signOut()
                  }
                  className="px-5 py-2.5 rounded-2xl bg-white text-black font-semibold hover:scale-105 transition duration-300"
                >

                  Logout

                </button>

              ) : (

                <button
                  onClick={() =>
                    signIn("google")
                  }
                  className="px-5 py-2.5 rounded-2xl bg-white text-black font-semibold hover:scale-105 transition duration-300"
                >

                  Login

                </button>

              )}

            </div>

            {/* MOBILE BUTTON */}
            <button
              onClick={() =>
                setMenuOpen(
                  !menuOpen
                )
              }
              className="md:hidden text-white text-3xl transition duration-300 hover:scale-110"
            >

              {menuOpen
                ? "✕"
                : "☰"}

            </button>

          </div>

        </div>

      </nav>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 z-[999] md:hidden transition-all duration-500 ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >

        {/* BACKDROP */}
        <div className="absolute inset-0 bg-black/90 backdrop-blur-3xl" />

        {/* CONTENT */}
        <div className="relative flex flex-col items-center justify-center h-full gap-10 px-8">

          {/* CLOSE */}
          <button
            onClick={() =>
              setMenuOpen(false)
            }
            className="absolute top-8 right-8 text-4xl text-white hover:scale-110 transition"
          >

            ✕

          </button>

          {/* LINKS */}
          {navLinks.map(
            (link) => {

            const isActive =
              pathname ===
              link.href;

            return (

              <Link
                key={link.href}
                href={link.href}
                onClick={() =>
                  setMenuOpen(false)
                }
                className={`text-3xl font-semibold transition duration-300 ${
                  isActive
                    ? "text-white"
                    : "text-zinc-400 hover:text-white"
                }`}
              >

                {link.label}

              </Link>

            );

          })}

          {/* PROFILE */}
          {session?.user && (

            <Link
              href="/perfil"
              onClick={() =>
                setMenuOpen(false)
              }
              className="mt-6 text-zinc-300 hover:text-white transition"
            >

              Perfil

            </Link>

          )}

          {/* AUTH */}
          {session?.user ? (

            <button
              onClick={() =>
                signOut()
              }
              className="mt-10 px-8 py-4 rounded-2xl bg-white text-black font-semibold hover:scale-105 transition duration-300"
            >

              Logout

            </button>

          ) : (

            <button
              onClick={() =>
                signIn("google")
              }
              className="mt-10 px-8 py-4 rounded-2xl bg-white text-black font-semibold hover:scale-105 transition duration-300"
            >

              Login

            </button>

          )}

        </div>

      </div>

    </>
  );
}