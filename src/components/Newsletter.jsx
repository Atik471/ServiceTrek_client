import { useState } from 'react';
import { toast } from 'react-toastify';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      toast.success(`Email submitted Successfully`, { position: "top-left", autoClose: 2000 });
    }
  };

  return (
    <section className="py-16 bg-primary text-white">
      <div className="container mx-auto text-center px-6">
        <h2 className="text-3xl font-semibold mb-4">Stay Updated</h2>
        <p className="text-lg mb-8">
          Subscribe to our newsletter and get the latest news and updates directly to your inbox.
        </p>

        {subscribed ? (
          <p className="text-xl text-green-400">Thank you for subscribing!</p>
        ) : (
          <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row gap-4 justify-center items-center space-x-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="p-3 w-72 rounded-md text-gray-800 focus:outline-none"
              required
            />
            <button
              type="submit"
              className="text-gray-800 bg-white py-3 px-8 rounded-md text-lg font-semibold hover:bg-primary-dark focus:outline-none transition duration-200"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Newsletter;
