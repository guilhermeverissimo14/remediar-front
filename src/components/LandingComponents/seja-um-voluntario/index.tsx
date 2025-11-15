import Image from "next/image";
import Link from "next/link";
import volunteerImg from "../../assets/voluntario.svg";

const VoluntarioONG = () => {
    const whatsappNumber = "+5531985730030"; // Substitua pelo número da ONG
    const message = encodeURIComponent("Olá, gostaria de me tornar um voluntário!");
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;

    return (
        <section id="seja-um-voluntario" className="flex flex-col md:flex-row items-center gap-8 p-25 mx-auto max-w-6xl">
            <div className="w-full md:w-1/2">
                <Image 
                    src={volunteerImg} 
                    alt="Seja um voluntário" 
                    className="rounded-lg max-w-[350px] max-h-[350px] object-contain"
                />
            </div>
            <div className="w-full md:w-1/2 text-center md:text-left">
                <h2 className="text-2xl font-bold mb-4">Seja um Voluntário!</h2>
                <p className="text-lg font-normal text-gray-700 mb-6">
                    Faça a diferença na vida de muitas pessoas! Junte-se a nós e contribua para um mundo melhor. Seu tempo e dedicação podem transformar realidades. Venha fazer parte do nosso time!
                </p>
                <Link href={whatsappLink} target="_blank" className="inline-block bg-[var(--color-primary)] text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:opacity-90 transition">
                    Entrar em Contato
                </Link>
            </div>
        </section>
    );
};

export default VoluntarioONG;
