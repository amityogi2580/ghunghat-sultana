const TermsOfService = () => {
  return (
    <div className="bg-ivory min-h-screen pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-serif text-charcoal mb-8">
          Terms of Service
        </h1>
        <div className="space-y-6 text-charcoal/70 text-sm leading-loose font-light">
          <p>
            Welcome to Ghunghat Fashion. By accessing our website and making
            enquiries, you agree to the following terms and conditions.
          </p>
          <h2 className="text-2xl font-serif text-charcoal pt-4">
            1. Product Representation
          </h2>
          <p>
            We strive to display our products and colors as accurately as
            possible. However, actual colors may vary slightly due to lighting
            and monitor settings.
          </p>
          <h2 className="text-2xl font-serif text-charcoal pt-4">
            2. Enquiries and Orders
          </h2>
          <p>
            Our website operates as a digital catalogue. All orders are
            finalized via WhatsApp. A confirmation message from our team is
            required to validate any order.
          </p>
          <h2 className="text-2xl font-serif text-charcoal pt-4">
            3. Intellectual Property
          </h2>
          <p>
            All content on this website, including images, designs, and text, is
            the intellectual property of Ghunghat Fashion and may not be used
            without permission.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
