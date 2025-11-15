"use client";

import React from 'react';
import Image from 'next/image';
import Logo from "@/assets/LogoPrincipal.svg";
import SocialIcon from '../../social-icons';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

import DefensoriaLogo from "@/assets/DPMG_logo.png";
import SescLogo from "@/assets/SESC_logo.png";
import BarbosaMeloLogo from "@/assets/barbosa_logo.webp";
import CasaAbertaLogo from "@/assets/casa_Aberta_Logo.png";
import IfmgLogo from "@/assets/IFMG_logo.png";
import InaperLogo from "@/assets/INAPER_Logo.png";

const sponsors = [
  { id: 1, name: 'Defensoria Pública de Minas Gerais', logo: DefensoriaLogo },
  { id: 2, name: 'Sesc Mesa Brasil', logo: SescLogo },
  { id: 3, name: 'Construtora Barbosa Melo', logo: BarbosaMeloLogo },
  { id: 4, name: 'Casa Aberta', logo: CasaAbertaLogo },
  { id: 5, name: 'Ifmg Sabará', logo: IfmgLogo },
  { id: 6, name: 'Inaper', logo: InaperLogo },
];

const Footer = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

  return (  
    <footer className="bg-[var(--color-primary)] text-slate-800 p-10 min-h-fit">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Coluna 1 - Logo e texto */}
        <div className="w-full flex flex-col items-center md:items-start">
          <Image 
            src={Logo} 
            alt="Logo Remediar" 
            width={150}
            height={75}
            className="mb-4"
          />
          <p className='text-lg text-center md:text-left'>Remediar - Uma forma diferente de amar.</p>
        </div>

        {/* Coluna 2 - Redes Sociais */}
        <div className="w-full flex flex-col items-center md:items-start">
          <h3 className="font-bold text-xl mb-4">Redes Sociais</h3>
          <div className="flex space-x-6">
            <SocialIcon kind="facebook" href="https://www.facebook.com/ongremediar/?locale=pt_BR" size={8} />
            <SocialIcon kind="linkedin" href="https://www.linkedin.com/company/ong-remediar/?originalSubdomain=br" size={8} />
            <SocialIcon kind="instagram" href="https://www.instagram.com/remediar/" size={8} />
          </div>
        </div>

        {/* Coluna 3 - Parceiros */}
        <div className="w-full max-w-[400px] mx-auto md:mx-0">
        <h3 className="font-bold text-xl mb-4">Empresas Parceiras</h3>
          <div className="relative overflow-hidden">
            <Carousel
              opts={{ 
                loop: true,
                align: "start",
              }}
              plugins={[plugin.current]}
              className="w-full"
            >
              <CarouselContent>
                {sponsors.map((sponsor) => (
                  <CarouselItem key={sponsor.id} className="basis-1/2 lg:basis-1/3">
                    <div className="p-2">
                      <div className="h-24 bg-white rounded-xl flex items-center justify-center p-4 shadow-lg hover:scale-105 transition-transform">
                        <Image
                          src={sponsor.logo}
                          alt={sponsor.name}
                          width={200}
                          height={100}
                          className="w-32 md:w-48 lg:w-64 object-contain max-h-20"
                        />
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center pt-8 border-t border-gray-700 mt-8">
        <p className="text-sm">&copy; {new Date().getFullYear()} Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;