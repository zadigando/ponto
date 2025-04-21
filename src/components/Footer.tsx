import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="contato"
      className="py-16 md:py-32 px-8 md:px-16 border-t border-black/10"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
        <div>
          <h2 className="text-lg mb-8">PONTO</h2>
          <p className="text-sm leading-relaxed">
            Um ponto de conexão entre o visível e o invisível, entre o tangível
            e o poético, entre forma e silêncio.
          </p>
        </div>

        <div>
          <h3 className="text-sm mb-6">Contato</h3>
          <ul className="space-y-4">
            <li>
              <a
                href="mailto:ola@agenciaponto.com"
                className="interactive text-sm menu-link"
              >
                ola@agenciaponto.com
              </a>
            </li>
            <li>
              <a
                href="tel:+551199999999"
                className="interactive text-sm menu-link"
              >
                +55 11 9999 9999
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm mb-6">Social</h3>
          <ul className="space-y-4">
            {["Instagram", "Behance", "LinkedIn", "Vimeo"].map(
              (item, index) => (
                <li key={index}>
                  <a href="#" className="interactive text-sm menu-link">
                    {item}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>
      </div>

      <div className="mt-16 md:mt-32 flex flex-col md:flex-row justify-between items-start md:items-center">
        <p className="text-xs text-black/50">
          © {currentYear} Ponto. Todos os direitos reservados.
        </p>
        <p className="text-xs text-black/50 mt-4 md:mt-0">
          Silêncio. Pausa. Gesto.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
