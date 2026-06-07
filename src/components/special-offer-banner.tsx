import Link from "next/link";

export default function SpecialOfferBanner() {
  return (
    <section className="relative flex h-screen min-h-[700px] w-full items-center justify-center overflow-hidden bg-[#f4f4f1]">
      <div className="pointer-events-none absolute top-1/2 left-0 h-px w-full bg-[#2f3331] opacity-10" />
      <div className="container relative z-10 mx-auto grid items-center gap-12 px-12 lg:grid-cols-2 lg:px-24">
        <div className="flex flex-col items-start space-y-6">
          <div className="text-[#2f3331] text-2xl font-extrabold tracking-[1em]">
            ...
          </div>
          <h2 className="text-7xl font-[900] leading-none tracking-tighter text-[#2f3331] md:text-8xl lg:text-9xl">
            SPECIAL OFFER
          </h2>
          <div className="flex w-full max-w-[280px] flex-col items-start">
            <div className="mb-4 h-px w-full bg-[#2f3331]/80" />
            <Link
              href="/shop"
              className="py-1 font-sans text-sm font-extrabold tracking-[0.4em] text-[#2f3331] transition-colors duration-300 hover:text-[#735a45]"
            >
              SHOP NOW
            </Link>
            <div className="mt-4 h-px w-full bg-[#2f3331]/80" />
          </div>
        </div>
        <div className="relative flex h-[500px] items-center justify-center lg:justify-end">
          <div className="relative flex w-full max-w-[500px] items-center justify-center">
            <div className="absolute left-0 z-10 -translate-x-12 scale-90 opacity-80">
              <div className="bg-[#e0e3e0] p-4 shadow-sm">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRri_RpsLtJtPVr75Hd41nZSJ7K8jMemSv7YkBSmWytiKZMs16EF0ilPhaW484SiGbHgr-_dC5czoTG2OJn6OHADQMpGvDVsD3mEZ1a6FAPSSXQLv3ghFxkTlQxyFkU6UUFXC33ruxzN_XlpJeLVbd5QRZoEQj6TjWBo8WH71nuxRaPkztNcLfUZ800EARlcApEMX1lw9nX55XdTMdd6V8-lSrzCR5YRdk7tvsYLXrDT57nj4lLV6DHujPVc2tWwlrwpC3_8zhOeI0"
                  alt="Tailored linen shorts"
                  className="h-64 w-48 object-cover"
                />
              </div>
            </div>
            <div className="relative z-30 scale-110">
              <div className="bg-[#e0e3e0] p-6 shadow-xl">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuChEHjJKP7Sps-wK1D9uqbV8PfdcvzCyW3d4W7zvM8xn-VTDT7gUUSJlUCQBb76ohVM9ElYM_R8G2rScrLF4s27SBuXuI5ytsN0jUlQp-2CqP61QmC4rAkByFf2O64Ku9pSA6-SAW3OW9PxoLtBy4CL25mZd78Av9mTjh_XZH5M7dq9jtZLap43lxkTCy3U35iXhexnrh0gKs9lt_-oDJQ6ruK4z1qbg4U4jKIsIElWQa33wary7G6k5ARs3mIdxoeqZ0SBdSCYGpkZ"
                  alt="Bespoke tailored shorts"
                  className="h-80 w-64 object-cover"
                />
              </div>
            </div>
            <div className="absolute right-0 z-10 translate-x-12 scale-90 opacity-80">
              <div className="bg-[#e0e3e0] p-4 shadow-sm">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCX13TleiC-dr8nHH3m1Oe_kdlq1iNbkSjvyGjWMYH03rp1SOSr8hZnoGTvmtayIOR6f0gBcKK74UirOhHHeyZd9CTE63g50D_hrL8D1Y-RzsHLCkmjN5Nge5jvODLLXrwdE_FNe1IF0H07iw3cuLT7eJwx-hN4xntU07hkY8BjrWSoK9q55BdI2qhgPk-su_6w0yXB99CCpkg3OoNA3kHEC8GW34bLJ2P6HRWK7WtIhqR1WYlpohqNirw4ekYoyiwNS07C8M-rl-fE"
                  alt="High-end summer shorts"
                  className="h-64 w-48 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 hidden select-none p-12 opacity-20 lg:block">
        <span className="font-serif text-4xl italic text-[#2f3331]">
          Digital Tailor Edition
        </span>
      </div>
    </section>
  );
}
