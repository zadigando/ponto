import React, { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import CursorEffect from "@/components/CursorEffect";
import Footer from "@/components/Footer";
import TypewriterPonto from "@/components/TypewriterPonto";
import BottomBar from "@/components/BottomBorder";
import RadialMenu from "@/components/RadialMenu";

const Index = () => {
  const currentYear = new Date().getFullYear();
  const [activeSection, setActiveSection] = useState<
    | "home"
    | "quem"
    | "oque"
    | "oque-marketing"
    | "oque-ti"
    | "comquem"
    | "comquem-colaborador"
    | "comquem-enzo"
    | "comquem-zadig"
  >("home");

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

  const handleClickOque = () => {
    setTransitioning(true);
    setTimeout(() => {
      setActiveSection("oque");
      setTransitioning(false);
    }, 500);
  };

  const handleClickMarketing = () => {
    setTransitioning(true);
    setTimeout(() => {
      setActiveSection("oque-marketing");
      setTransitioning(false);
    }, 500);
  };

  const handleClickTI = () => {
    setTransitioning(true);
    setTimeout(() => {
      setActiveSection("oque-ti");
      setTransitioning(false);
    }, 500);
  };

  const handleClickComQuem = () => {
    setTransitioning(true);
    setTimeout(() => {
      setActiveSection("comquem");
      setTransitioning(false);
    }, 500);
  };

  const handleClickColaborador = () => {
    setTransitioning(true);
    setTimeout(() => {
      setActiveSection("comquem-colaborador");
      setTransitioning(false);
    }, 500);
  };
  const handleClickEnzo = () => {
    setTransitioning(true);
    setTimeout(() => {
      setActiveSection("comquem-enzo");
      setTransitioning(false);
    }, 500);
  };
  const handleClickZadig = () => {
    setTransitioning(true);
    setTimeout(() => {
      setActiveSection("comquem-zadig");
      setTransitioning(false);
    }, 500);
  };

  return (
    <div className="relative">
      <CursorEffect />
      <Navigation onReset={() => setActiveSection("home")} />

      <section className="h-screen flex flex-col items-center justify-center text-center gap-12 section-transition bg-white">
        <TypewriterPonto
          overrideText={
            activeSection === "quem"
              ? "quem."
              : activeSection === "oque"
              ? "o que."
              : activeSection === "oque-marketing"
              ? "marketing."
              : activeSection === "oque-ti"
              ? "ti."
              : activeSection === "comquem"
              ? "com quem."
              : activeSection === "comquem-colaborador"
              ? "nosso colaborador."
              : activeSection === "comquem-enzo"
              ? "enzo"
              : activeSection === "comquem-zadig"
              ? "zadig"
              : null
          }
          animate={
            activeSection === "home" ||
            activeSection === "comquem-enzo" ||
            activeSection === "comquem-zadig"
          }
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
                <button
                  onClick={handleClickOque}
                  className="menu-link interactive text-black"
                >
                  <span className="relative z-10">o que.</span>
                </button>
                <button
                  onClick={handleClickComQuem}
                  className="menu-link interactive text-black"
                >
                  <span className="relative z-10">com quem.</span>
                </button>
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
        {activeSection === "oque" && !transitioning && (
          <div className="mt-6 flex gap-12 justify-center text-black text-lg font-sans">
            <button
              onClick={handleClickMarketing}
              className="menu-link interactive"
            >
              marketing.
            </button>
            <button onClick={handleClickTI} className="menu-link interactive">
              ti.
            </button>
          </div>
        )}
        {activeSection === "oque-marketing" && !transitioning && (
          <div className="mt-10 text-black text-base leading-relaxed max-w-xl mx-auto px-4 text-left space-y-3">
            <p>Produção editorial (mídia kit)</p>
            <p>Planejamento de conteúdo</p>
            <p>Design gráfico (arte)</p>
            <p>Edição de conteúdo</p>
            <p>Soluções especiais</p>
            <p>Captação de mídia</p>
            <p>Análise de dados</p>
            <p>Tráfego pago</p>
          </div>
        )}
        {activeSection === "oque-ti" && !transitioning && (
          <div className="mt-10 text-black text-base leading-relaxed max-w-xl mx-auto px-4 text-left space-y-3">
            <p>Desenvolvimento de landing page</p>
            <p>Desenvolvimento de chat bot</p>
            <p>Desenvolvimento de CRM</p>
            <p>Desenvolvimento de site</p>
            <p>Soluções especiais</p>
          </div>
        )}
        {activeSection === "comquem" && !transitioning && (
          <div className="mt-12 opacity-0 scale-95 animate-fade-in">
            <RadialMenu
              items={[
                {
                  id: "colab1",
                  label: "Gregory",
                  onClick: handleClickColaborador,
                },
                {
                  id: "colab2",
                  label: "Lucas",
                  onClick: handleClickColaborador,
                },
                {
                  id: "colab3",
                  label: "Enzo",
                  onClick: handleClickEnzo,
                },
                {
                  id: "colab4",
                  label: "Zadig",
                  onClick: handleClickZadig,
                },
              ]}
            />
          </div>
        )}

        {activeSection === "comquem-colaborador" && !transitioning && (
          <div className="mt-12 text-black max-w-3xl mx-auto px-4 space-y-4 text-left text-base leading-relaxed">
            <h2 className="text-xl font-semibold">Nosso colaborador</h2>
            <p>
              Trabalhamos com uma rede de colaboradores especializados nas áreas
              de conteúdo, design, tecnologia e análise de dados.
            </p>
            <p>
              Cada parceiro é selecionado com base em sua experiência,
              criatividade e comprometimento com resultados.
            </p>
          </div>
        )}
        {activeSection === "comquem-enzo" && !transitioning && (
          <div className="mt-12 text-black max-w-3xl mx-auto px-4 space-y-4 text-left text-base leading-relaxed opacity-0 scale-95 animate-fade-in">
            <h2 className="text-xl font-semibold">Enzo, the dude</h2>
            <p>Enzo é DJ nosso.</p>
            <p>Ele bom e novo</p>
          </div>
        )}
        {activeSection === "comquem-zadig" && !transitioning && (
          <div className="mt-12 text-black max-w-3xl mx-auto px-4 space-y-4 text-left text-base leading-relaxed opacity-0 scale-95 animate-fade-in">
            <h2 className="text-xl font-semibold">Zadig, developer</h2>
            <p>
              Short bio or description highlighting Zadig’s role as a developer.
            </p>
          </div>
        )}
      </section>

      <BottomBar onReset={() => setActiveSection("home")} />
    </div>
  );
};

export default Index;
