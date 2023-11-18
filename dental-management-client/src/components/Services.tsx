const Services = () => {
  return (
    // Add the background color and the container width
    <div className="w-full">
      <div className="max-w-[1200px] mx-auto flex items-center justify-center flex-col md:flex-row py-14 max-md:py-0">
        {/* Left column with an image of a kid */}
        <div className="md:w-1/2 p-4">
          <img
            src="https://www.iqsolutions.com/sites/default/files/articles/kid-smile.jpg" // Replace this with your image URL
            alt="Kid smiling"
            width={500}
            height={500}
            className="rounded-lg"
          />
        </div>
        {/* Right column with text and list */}
        <div className="md:w-1/2 flex justify-center flex-col">
          <h2 className="text-3xl font-bold text-[#FBC00E] mb-4 max-md:text-center">
            Why choose our qualified dentists?
          </h2>
          <p className="text-lg text-black mb-4 max-md:text-center max-md:w-[90%]">
            Our dentists are highly trained and experienced in providing a wide
            range of dental services for your oral health needs. Whether you
            need a routine checkup, a filling, a root canal, or a cosmetic
            treatment, we have the right dentist for you. Here are some of the
            services we offer:
          </p>
          <ul className="list-disc list-inside text-black max-md:pl-[10px]">
            <li>Teeth cleaning and whitening</li>
            <li>Cavity prevention and treatment</li>
            <li>Gum disease prevention and treatment</li>
            <li>Root canal therapy</li>
            <li>Crowns, bridges, and implants</li>
            <li>Veneers, braces, and invisalign</li>
            <li>Oral surgery and extractions</li>
            <li>Emergency dental care</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Services;
