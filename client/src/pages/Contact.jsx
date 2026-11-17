import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send } from "lucide-react";

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
    <div className="bg-ivory min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-serif text-burgundy mb-6">
              Get in Touch
            </h1>
            <p className="text-charcoal/60 mb-10 leading-relaxed">
              Whether you have a question about our collections, need help with
              sizing, or want to inquire about a custom design, our team is here
              to assist you.
            </p>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-beige p-4 rounded-full text-burgundy mr-6">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-charcoal mb-1">
                    Call Us
                  </h3>
                  <p className="text-charcoal/60 text-sm">+91 99999 99999</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-beige p-4 rounded-full text-burgundy mr-6">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-charcoal mb-1">
                    Email Us
                  </h3>
                  <p className="text-charcoal/60 text-sm">
                    hello@ghunghatfashion.com
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-beige p-4 rounded-full text-burgundy mr-6">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-charcoal mb-1">
                    Visit Our Studio
                  </h3>
                  <p className="text-charcoal/60 text-sm">
                    Mumbai, Maharashtra, India
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white p-8 md:p-10 shadow-xl border border-charcoal/10"
          >
            {submitted ? (
              <div className="text-center py-20">
                <div className="bg-green-50 text-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Send size={24} />
                </div>
                <h3 className="text-2xl font-serif text-charcoal mb-2">
                  Message Sent!
                </h3>
                <p className="text-charcoal/60 text-sm">
                  We will get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-serif text-charcoal mb-6">
                  Send a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-xs font-medium text-charcoal mb-2 uppercase tracking-wider">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full border border-charcoal/20 px-4 py-3 text-sm focus:outline-none focus:border-burgundy"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-charcoal mb-2 uppercase tracking-wider">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full border border-charcoal/20 px-4 py-3 text-sm focus:outline-none focus:border-burgundy"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-charcoal mb-2 uppercase tracking-wider">
                      Message
                    </label>
                    <textarea
                      rows="4"
                      required
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full border border-charcoal/20 px-4 py-3 text-sm focus:outline-none focus:border-burgundy"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-burgundy text-ivory py-4 text-sm tracking-widest uppercase hover:bg-charcoal transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
