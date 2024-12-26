
const OurStorySection = () => {
  return (
    <section className="py-16 md:px-24 px-6 bg-blue-100">
      <div className="container mx-auto text-left flex flex-col md:flex-row gap-8 items-center justify-between px-6">
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8">Our Story</h2>
          <p className="text-lg text-gray-600 mb-6">
            Our platform was created with one goal in mind: to connect people with services they can trust. Whether you&apos;re looking to hire or offer services, our platform makes the process simple, secure, and efficient.
          </p>
          <p className="text-lg text-gray-600">
            We believe in empowering our users to make informed decisions by providing them with high-quality services and reviews from real people.
          </p>
        </div>
        <div className="w-full md:w-1/2 mt-8 md:mt-0">
          <img
            src="/assets/our_story.jpg"
            alt="Our Story"
            className="w-[80%] h-auto rounded-lg shadow-xl ml-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default OurStorySection;
