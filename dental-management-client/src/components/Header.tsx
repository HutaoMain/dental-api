const Header = () => {
  return (
    <div className="max-w-[1200px] max-md:w-[98%]">
      <div className="flex items-center justify-between w-full py-4 my-4 max-md:flex-col">
        <section className="w-[40%] flex justify-center max-md:text-left mb-4 max-md:mb-0 max-md:w-full">
          <div className="w-[75%] h-15 max-md:w-full max-md:text-center">
            <p className="text-[20px] text-[#FFD774]">HEALTH.EVERYDAY</p>
            <p className="text-[40px] mt-2">
              A better life starts
              <br />
              <span className="font-medium text-[40px]">with a beautiful</span>
              <br />
              <h1 className="text-[40px] font-bold">Smile.</h1>
            </p>
            <button className="bg-[#FBC00E] hover:bg-[#FFD774] text-white font-bold py-2 px-4 rounded mt-4">
              <a href="#calendar" className="no-underline">
                Book an appointment
              </a>
            </button>
          </div>
        </section>
        <section className="w-[60%] max-md:hidden">
          <img
            src="https://www.orthodontist.ie/wp-content/uploads/2020/10/baby-teeth-min-1-scaled.jpg"
            alt="Kid smiling"
            className="w-11/12 object-cover object-center rounded-md"
          />
        </section>
      </div>
    </div>
  );
};

export default Header;
