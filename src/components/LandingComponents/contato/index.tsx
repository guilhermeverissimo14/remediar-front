import { Mail, MessageCircle , MapPin, Instagram, PhoneCall } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const Contato = () => {
    return (
        <section id="contato" className="text-center p-25 max-w-lg mx-auto mb-40">
            <h2 className="text-xl font-semibold mb-4">Quero falar com a Remediar</h2>
            <button className="bg-black text-white text-sm font-bold py-2 px-6 rounded-full">
                CONTATO
            </button>

            <div className="mt-6 space-y-4 text-gray-700">
                <div className="flex items-center justify-center gap-2">
                    <FaWhatsapp className="w-5 h-5" />
                    <span>+55 31 98573-0030</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                    <PhoneCall className="w-5 h-5" />
                    <span>(31) 98573-0030</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                    <Mail className="w-5 h-5" />
                    <span>remediarong@gmail.com</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                    <Instagram className="w-5 h-5" />
                    <span>@remediar</span>
                </div>

                <div className="mt-4 font-semibold">Endereço</div>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-5 h-5" />
                    <span>Rua Cláudio Marcelo 50, Nazaré</span>
                </div>
            </div>
        </section>
    );
};

export default Contato;
