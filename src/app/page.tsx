import Carousel from "@/components/LandingComponents/carrossel";
import banner01 from '../assets/banner1.png';
import banner02 from "../assets/banner04.svg";
import { SobreNos } from "@/components/LandingComponents/sobre-nos";
import Footer from "@/components/LandingComponents/footer";
import Doacoes from "@/components/LandingComponents/doacoes";
import EstatisticasDoacoes from "@/components/LandingComponents/card-dados";
import { Navbar } from "@/components/LandingComponents/navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Carousel
        items={[
          { src: banner01.src, alt: "Banner 1" },
          { src: banner02.src, alt: "Banner 2" },
        ]}
      />
      <SobreNos />
      <EstatisticasDoacoes />
      <Doacoes />
      <Footer />
    </div>
  )
}