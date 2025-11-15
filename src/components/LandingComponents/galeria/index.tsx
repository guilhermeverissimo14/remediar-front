import Image from "next/image";
import React from "react";
import Imagem from "../../assets/galeria06.jpeg"
import Imagem01 from "../../assets/galeria02.jpeg"
import Imagem02 from "../../assets/galeria04.jpeg"
import Imagem03 from "../../assets/galeria03.jpeg"
import Imagem04 from "../../assets/galeria05.jpeg"

const Galeria = () => {
  return (
    <div id="portfolio" className="max-w-[1240px] mx-auto py-16 text-center">
      <h1 className="font-bold text-2xl p-4">Galeria de Fotos da Remediar</h1>
      <div className="grid grid-rows-none md:grid-cols-5 p-4 gap-4">
        <div className="w-full h-full col-span-2 md:col-span-3 row-span-2">
          <Image
            src={Imagem01.src}
            alt="/"
            layout="responsive"
            width="677"
            height="451"
          />
        </div>
        <div className="w-full h-full">
          <Image
            src={Imagem.src}
            alt="/"
            width="215"
            height="217"
            layout="responsive"
            objectFit="cover"
          />
        </div>
        <div className="w-full h-full">
          <Image
            src={Imagem03.src}
            alt="/"
            width="215"
            height="217"
            layout="responsive"
            objectFit="cover"
          />
        </div>
        <div className="w-full h-full">
          <Image
            src={Imagem04.src}
            alt="/"
            width="215"
            height="217"
            layout="responsive"
            objectFit="cover"
          />
        </div>
        <div className="w-full h-full">
          <Image
            src={Imagem02.src}
            alt="/"
            width="215"
            height="217"
            layout="responsive"
            objectFit="cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Galeria;