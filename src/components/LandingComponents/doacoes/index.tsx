'use client'
import donates from "@/assets/donates01.png";
import donates02 from "@/assets/donates.png";
import qrcodde from "@/assets/QRcode.jpeg";
import { useRouter } from 'next/navigation';

const Doacoes = () => {
    const router = useRouter();
    return (
        <section id="doacoes" className="text-center p-25 mx-auto max-w-4xl lg:max-w-5xl">
            <button className="bg-black text-white text-sm font-bold py-1 px-6 rounded-full mb-2">
                DOAÇÕES
            </button>

            <h2 className="text-xl font-semibold mb-2 lg:mb-2 lg:text-2xl">Como você deseja doar?</h2>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <div className="flex flex-col w-50 sm:w-50 h-80 overflow-hidden rounded-xl cursor-pointer transition-transform duration-300 hover:scale-105 shadow-lg"
                onClick={() => router.push('/login')}>
                    <p className="text-black text-base p-1 bg-white lg:text-sm lg:p-4">
                        Doe medicamentos como pessoa física ou jurídica
                    </p>
                    <div className="h-70 md:h-70 lg:h-70">
                        <img 
                            src={donates.src}
                            alt="Doação de medicamentos"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
                
                <div className="flex flex-col w-50 sm:w-50 h-80 overflow-hidden rounded-xl cursor-pointer transition-transform duration-300 hover:scale-105 shadow-lg"
                onClick={() => router.push('/login')}>
                    <p className="text-black text-base p-1 bg-white lg:text-sm lg:p-1">
                        Doação de itens adversos
                    </p>
                    <div className="h-100 md:h-100 lg:h-100">
                        <img 
                            src={donates02.src}
                            alt="Doação de itens adversos"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                <div className="flex flex-col w-50 sm:w-50 h-80 overflow-hidden rounded-xl cursor-pointer transition-transform duration-300 hover:scale-105 shadow-lg"
                onClick={() => router.push('/login')}>

                    <div className="h-100 md:h-100 lg:h-100">
                        <img 
                            src={qrcodde.src}
                            alt="Doação de itens adversos"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Doacoes;
