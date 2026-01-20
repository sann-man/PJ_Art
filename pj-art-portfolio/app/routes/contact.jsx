import { useState } from "react";
import { MdEmail, MdPhone, MdLocationOn, MdSend } from "react-icons/md";
import Navbar from "../components/navbar";

export default function Contact() {
  const [formData, setFormData] = useState({
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <main className="text-white min-h-screen">
      <Navbar />
      <div className="pt-20 md:pt-24 pb-12 px-4 md:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-6xl text-white font-mono gradient-text text-shadow-glow">CONTACT</h1>
            <p className="text-gray-300 mt-4 text-lg">Let's create something beautiful together</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4 gradient-text">Send a Message</h2>
                {/* <p className="text-gray-300">
                  Interested in commissioning a piece or have questions about my work? 
                  I'd love to hear from you.
                </p> */}
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="group">
                  <label className="block text-white text-sm font-mono mb-2" htmlFor="email">
                    EMAIL *
                  </label>
                  <input
                    className="w-full py-3 px-4 glass-effect rounded-xl text-white placeholder-gray-400
                             focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent
                             transition-all duration-300 ease-in-out"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="group">
                  <label className="block text-white text-sm font-mono mb-2" htmlFor="message">
                    MESSAGE *
                  </label>
                  <textarea
                    className="w-full py-3 px-4 glass-effect rounded-xl text-white placeholder-gray-400
                             focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent
                             transition-all duration-300 ease-in-out h-40 resize-none"
                    id="message"
                    name="message"
                    placeholder="Tell me about your project or inquiry..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="modern-button w-full py-4 px-8 rounded-xl font-mono text-white 
                           hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <MdSend className="text-lg" />
                  SEND MESSAGE
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4 gradient-text">Get in Touch</h2>
                {/* <p className="text-gray-300">
                  Whether you're interested in purchasing artwork, commissioning a custom piece, 
                  or exploring collaboration opportunities, I'm here to help bring your vision to life.
                </p> */}
              </div>

              <div className="space-y-6">
                <div className="glass-effect p-6 rounded-xl hover:scale-105 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-3">
                    <MdEmail className="text-2xl text-white" />
                    <h3 className="text-lg font-bold">Email</h3>
                  </div>
                  <p className="text-gray-300">pryce510@gmail.com</p>
                  <p className="text-sm text-gray-400 mt-1">Response within 24 hours</p>
                </div>

                <div className="glass-effect p-6 rounded-xl hover:scale-105 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-3">
                    <MdPhone className="text-2xl text-white" />
                    <h3 className="text-lg font-bold">Phone</h3>
                  </div>
                  <p className="text-gray-300">+1 (415) 235 1286</p>
                  <p className="text-sm text-gray-400 mt-1">Available Mon-Fri, 10AM-6PM</p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}