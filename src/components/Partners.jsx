import { motion } from "framer-motion";

const partners = [
  {
    name: "Belmont Park",
    logo: "/assets/silvr-inside-pages_04.jpg",
    description: "Providing cutting-edge cloud and server infrastructure for seamless performance.",
  },
  {
    name: "Escapology",
    logo: "/assets/silvr-inside-pages_05.jpg",
    description: "Crafting user-friendly and visually stunning design solutions for the platform.",
  },
  {
    name: "Michael Franti",
    logo: "/assets/silvr-inside-pages_14.jpg",
    description: "Ensuring robust security and authentication systems to protect user data.",
  },
];

const fadeInVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 5 } },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3 },
  },
};

const Partners = () => {
  return (
    <section className="py-16 bg-gray-50 px-24">
      <div className="container mx-auto px-4">
        <motion.h2
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
          className="text-3xl font-semibold text-center mb-12 text-gray-800"
        >
          Meet Our Partners
        </motion.h2>
        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg hover:shadow-lg transition-shadow p-6 text-center"
              variants={fadeInVariants}
            >
              <img
                src={partner.logo}
                alt={`${partner.name} logo`}
                className="mx-auto mb-4"
              />
              <h3 className="text-xl font-medium text-gray-800 mb-2">
                {partner.name}
              </h3>
              <p className="text-gray-600 text-sm">{partner.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Partners;
