import React, { useEffect } from "react";
import Navigation from "@/components/Navigation";
import CursorEffect from "@/components/CursorEffect";
import Footer from "@/components/Footer";
import TypewriterPonto from "@/components/TypewriterPonto";

const Index = () => {
  const currentYear = new Date().getFullYear();
  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
    });

    document.querySelectorAll(".section-transition").forEach((el) => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="relative">
      <CursorEffect />
      <Navigation />

      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center text-center gap-12 section-transition bg-white">
        <TypewriterPonto />
        <div className="flex flex-col gap-6 text-base md:text-lg font-sans text-black">
          <a href="#quem-somos" className="menu-link interactive">
            quem.
          </a>
          <a
            href="/ponto-servicos.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="menu-link interactive"
          >
            o que.
          </a>
          <a href="#com-quem-fazemos" className="menu-link interactive">
            com quem.
          </a>
        </div>
        <div className="mt-16 md:mt-32 flex flex-col md:flex-row justify-between items-start md:items-center">
          <p className="text-xs text-black/50">
            © {currentYear} ponto.ac. Todos os direitos reservados.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Index;
