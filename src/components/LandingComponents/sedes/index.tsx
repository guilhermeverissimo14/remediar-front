const Sedes = () => {
    return (
        <section id="sedes" className="p-25 max-w-4xl mx-auto mb-40">
            <div className="text-center mb-8">
                <button className="bg-black text-white text-sm font-bold py-2 px-6 rounded-full mb-4">
                    Sedes
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Sede 1 */}
                <div className="text-center">
                    <h2 className="text-xl font-light mb-4">Sede - Rua Cláudio Marcelo 50 Nazaré</h2>
                    <div className="relative w-full aspect-video">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3752.70318597044!2d-43.89008624659661!3d-19.85250796860789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa69b34f4dd02a3%3A0x3a6ddd324dd3976b!2sR.%20Cl%C3%A1udio%20Marcelo%2C%2050%20-%20Nazare%2C%20Belo%20Horizonte%20-%20MG%2C%2031990-130!5e0!3m2!1spt-BR!2sbr!4v1741179696639!5m2!1spt-BR!2sbr"
                            className="absolute top-0 left-0 w-full h-full border-0 rounded-lg"
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>

                {/* Sede 2 */}
                <div className="text-center">
                    <h2 className="text-xl font-light mb-4">Av. Bias Fortes, 431 - Lourdes (Ponto de apoio)</h2>
                    <div className="relative w-full aspect-video">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3750.876386024475!2d-43.943653624772914!3d-19.929613281458813!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa699de342fae1d%3A0x81316840d7757d90!2sAv.%20Bias%20Fortes%2C%20431%20-%20Lourdes%2C%20Belo%20Horizonte%20-%20MG%2C%2030170-011!5e0!3m2!1spt-BR!2sbr!4v1743271458172!5m2!1spt-BR!2sbr"
                            className="absolute top-0 left-0 w-full h-full border-0 rounded-lg"
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
                {/* Sede 3 */}
                <div className="text-center">
                    <h2 className="text-xl font-light mb-4">Rua Edson, 312 - União</h2>
                    <div className="relative w-full aspect-video">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4450.6459938252465!2d-43.92445412401585!3d-19.88110373678924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa69a5ef0ba01bd%3A0x8c0d1a4657043f45!2sRua%20Edson%2C%20312%20-%20Uni%C3%A3o%2C%20Belo%20Horizonte%20-%20MG%2C%2031170-620!5e1!3m2!1spt-BR!2sbr!4v1750358918908!5m2!1spt-BR!2sbr" 
                        className="absolute top-0 left-0 w-full h-full border-0 rounded-lg"
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade">
                        </iframe>
                    </div>
                </div>
            </div>
        </section >
    );
};

export default Sedes;