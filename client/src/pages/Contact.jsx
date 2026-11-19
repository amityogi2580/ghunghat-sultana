import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, Instagram } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => setSubmitted(true), 1000);
  };

  return (
    <div className="bg-ivory min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left Side: Contact Info (Dark Editorial) */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-charcoal text-ivory p-12 lg:p-24 flex flex-col justify-center relative overflow-hidden"
        >
          {/* Decorative Background Text */}
          <h2 className="absolute -top-10 -right-10 text-[150px] font-serif text-white/5 pointer-events-none">
            GS
          </h2>

          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-serif text-gold mb-6">
              Get in Touch
            </h1>
            <p className="text-ivory/60 mb-12 leading-relaxed max-w-md">
              Whether you have a question about our collections, need help with
              sizing, or want to inquire about a custom design, our team is here
              to assist you.
            </p>

            <div className="space-y-8">
              <div className="flex items-center group cursor-pointer">
                <div className="bg-white/5 border border-white/10 p-4 rounded-full text-gold mr-6 group-hover:bg-burgundy group-hover:border-burgundy transition-all duration-300">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-ivory/50 mb-1">
                    Call Us
                  </h3>
                  <p className="text-lg font-medium">+91 9782675316</p>
                </div>
              </div>

              <div className="flex items-center group cursor-pointer">
                <div className="bg-white/5 border border-white/10 p-4 rounded-full text-gold mr-6 group-hover:bg-burgundy group-hover:border-burgundy transition-all duration-300">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-ivory/50 mb-1">
                    Email Us
                  </h3>
                  <p className="text-lg font-medium">
                    hello@ghunghatfashion.com
                  </p>
                </div>
              </div>

              <div className="flex items-center group cursor-pointer">
                <div className="bg-white/5 border border-white/10 p-4 rounded-full text-gold mr-6 group-hover:bg-burgundy group-hover:border-burgundy transition-all duration-300">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-ivory/50 mb-1">
                    Visit Our Studio
                  </h3>
                  <p className="text-lg font-medium">
                    Cement Road, Sultana, Rajasthan
                  </p>
                </div>
              </div>

              <div className="flex items-center group cursor-pointer">
                <div className="bg-white/5 border border-white/10 p-4 rounded-full text-gold mr-6 group-hover:bg-burgundy group-hover:border-burgundy transition-all duration-300">
                  <Instagram size={24} />
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-ivory/50 mb-1">
                    Follow Us
                  </h3>
                  <a
                    href="https://www.instagram.com/ghunghat_sultana_"
                    target="_blank"
                    rel="noreferrer"
                    className="text-lg font-medium hover:text-gold transition-colors"
                  >
                    @ghunghat_sultana_
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Form (Clean & Modern) */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center p-8 lg:p-24 bg-ivory relative"
        >
          <div className="w-full max-w-md">
            {submitted ? (
              <div className="text-center py-20 bg-white p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-charcoal/5">
                <div className="bg-green-50 text-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Send size={32} />
                </div>
                <h3 className="text-3xl font-serif text-charcoal mb-3">
                  Message Sent
                </h3>
                <p className="text-charcoal/60 text-sm">
                  Thank you for reaching out. We will get back to you shortly.
                </p>
              </div>
            ) : (
              <>
                <h2 className="text-3xl font-serif text-charcoal mb-2">
                  Send a Message
                </h2>
                <p className="text-charcoal/50 text-sm mb-10">
                  Fill out the form below and we'll be in touch.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder=" "
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="peer w-full border-b border-charcoal/20 bg-transparent py-3 text-sm focus:outline-none focus:border-burgundy transition-colors"
                    />
                    <label className="absolute left-0 top-3 text-charcoal/40 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-burgundy peer-valid:-top-4 peer-valid:text-xs pointer-events-none">
                      Your Name
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder=" "
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="peer w-full border-b border-charcoal/20 bg-transparent py-3 text-sm focus:outline-none focus:border-burgundy transition-colors"
                    />
                    <label className="absolute left-0 top-3 text-charcoal/40 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-burgundy peer-valid:-top-4 peer-valid:text-xs pointer-events-none">
                      Email Address
                    </label>
                  </div>
                  <div className="relative">
                    <textarea
                      rows="4"
                      required
                      placeholder=" "
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="peer w-full border-b border-charcoal/20 bg-transparent py-3 text-sm focus:outline-none focus:border-burgundy transition-colors resize-none"
                    />
                    <label className="absolute left-0 top-3 text-charcoal/40 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-burgundy peer-valid:-top-4 peer-valid:text-xs pointer-events-none">
                      Your Message
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-burgundy text-ivory py-4 text-xs tracking-[0.2em] uppercase hover:bg-charcoal transition-all duration-300 shadow-lg hover:shadow-xl mt-4"
                  >
                    Send Message
                  </button>
                </form>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
