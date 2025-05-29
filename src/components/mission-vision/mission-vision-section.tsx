const MissionVisionSection = () => (
  <section className="w-full flex justify-center px-2 py-8">
    <div className="w-full bg-[#06342C] rounded-2xl flex flex-col md:flex-row overflow-hidden md:h-[350px] md:w-[1280px]">
      <div className="flex-1 p-6 md:p-16 border-b md:border-b-0 md:border-r-4 border-black">
        <h2 className="text-white text-2xl md:text-4xl font-bold mb-3 text-center md:text-left">Our Mission</h2>
        <p className="text-white text-xs md:text-lg font-normal">
          Our Mission as Intertex:<br />
          To gain customer loyalty by investing in people and systems, to offer them environmentally friendly first class clothing of competitive quality delivered on time.
        </p>
      </div>
      
      <div className="flex-1 p-6 md:p-16">
        <h2 className="text-white text-2xl md:text-4xl font-bold mb-3 text-center md:text-left">Our Visions</h2>
        <p className="text-white text-xs md:text-lg font-normal">
          To be a leader in the global and Nigerian retail and wholesale sectors by increasing the customer base and providing valuable services by delivering quality products on time.
        </p>
      </div>
    </div>
  </section>
);

export default MissionVisionSection;
