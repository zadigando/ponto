import React, { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import CursorEffect from "@/components/CursorEffect";
import Footer from "@/components/Footer";
import TypewriterPonto from "@/components/TypewriterPonto";
import BottomBar from "@/components/BottomBorder";

const Index = () => {
  const currentYear = new Date().getFullYear();
  const [activeSection, setActiveSection] = useState<"home" | "quem">("home");
  const [transitioning, setTransitioning] = useState(false);

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

  const handleClickQuem = () => {
    setTransitioning(true);
    setTimeout(() => {
      setActiveSection("quem");
      setTransitioning(false);
    }, 500); // tempo da transição
  };

  return (
    <div className="relative">
      <CursorEffect />
      <Navigation onReset={() => setActiveSection("home")} />

      <section className="h-screen flex flex-col items-center justify-center text-center gap-12 section-transition bg-white">
        <TypewriterPonto
          overrideText={activeSection === "quem" ? "quem." : null}
        />
        <div
          className={`transition-opacity duration-500 ${
            transitioning ? "opacity-0" : "opacity-100"
          }`}
        >
          {activeSection === "home" && (
            <>
              <div className="flex flex-col items-center gap-6 text-base md:text-lg font-sans text-black">
                <button
                  onClick={handleClickQuem}
                  className="menu-link interactive text-black"
                >
                  <span className="relative z-10">quem.</span>
                </button>
                <a
                  href="/ponto-servicos.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="menu-link interactive"
                >
                  <span className="relative z-10">o que.</span>
                </a>
                <a href="#com-quem-fazemos" className="menu-link interactive">
                  <span className="relative z-10">com quem.</span>
                </a>
              </div>
              <div className="mt-16 md:mt-32 flex flex-col md:flex-row justify-between items-start md:items-center">
                <p className="text-xs text-black/50">
                  © {currentYear} ponto.ac. Todos os direitos reservados.
                </p>
              </div>
            </>
          )}
        </div>

        {/* conteúdo da seção "quem" */}
        {activeSection === "quem" && !transitioning && (
          <div className="max-w-4xl mx-auto mt-12 px-4 flex flex-col md:flex-row items-center md:items-start gap-8 text-black text-base leading-relaxed">
            {/* Imagem */}
            <div className="w-full md:w-1/2">
              <img
                src="/images/unnamed.jpg"
                alt="Equipe da Ponto ou representação visual"
                className="w-full h-auto rounded-md object-cover"
              />
            </div>

            {/* Texto */}
            <div className="w-full md:w-1/2">
              <p>Somos a PONTO.</p>
            </div>
          </div>
        )}
      </section>

      <BottomBar onReset={() => setActiveSection("home")} />
    </div>
  );
};

export default Index;
