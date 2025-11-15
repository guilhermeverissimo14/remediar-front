import Imagem from "@/assets/galeria00.jpeg"


export const SobreNos = () => {
    const texto = `A associação Remediar é uma organização sem fins lucrativos, formalizada em 2020 e sediada em Belo Horizonte, que tem como Missão assistir o indivíduo em sua integralidade por meio de uma rede do bem que promova saúde, qualidade de vida, inclusão social e educação ambiental. Para assistir o indivíduo em sua integralidade, temos projetos nas áreas da Saúde, Segurança alimentar, apoio psicológico e jurídico, inclusão social e qualidade vida. Nosso principal projeto é uma farmácia solidária, onde atuamos na captação e na distribuição de doações de medicamentos, evitando que tratamentos de saúde sejam interrompidos e medicamentos sejam desperdiçados ou descartados incorretamente. As doações respeitam os protocolos do ministério da saúde e já beneficiaram mais de 10 mil famílias com mais de 100 mil unidades de medicamentos.`;

    return (
        <section id="sobre-nos" className="bg-white py-12 md:py-25 px-2">
            <div className="w-full flex justify-center mb-6">
                <button className="bg-[var(--color-letter)] text-white font-bold py-2 px-6 rounded-full">
                    SOBRE NÓS
                </button>
            </div>  
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 items-center">
                <img
                    src={Imagem.src}
                    alt="Equipe Remediar"
                    className="rounded-lg w-full max-w-[400px] h-56 object-cover md:order-[1]"
                />
                <div className="flex flex-col items-center md:order-1 w-full">
                    <article className="space-y-3 text-center md:text-left">
                        <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                            O que é a Remediar ?
                        </h2>
                        <p className="text-gray-600 text-sm font-light leading-normal sm:leading-relaxed break-words hyphens-auto whitespace-pre-line">
                            {texto}
                        </p>
                    </article>
                </div>
            </div>
        </section>

    );
};