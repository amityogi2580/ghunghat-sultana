const ShippingReturns = () => {
  return (
    <div className="bg-ivory min-h-screen pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-serif text-charcoal mb-8">
          Shipping & Returns
        </h1>
        <div className="space-y-6 text-charcoal/70 text-sm leading-loose font-light">
          <h2 className="text-2xl font-serif text-charcoal">Shipping Policy</h2>
          <p>
            We currently offer shipping across India. Complimentary standard
            shipping is available on all orders above ₹5000. For orders below
            this amount, a nominal shipping fee will be calculated during your
            WhatsApp enquiry.
          </p>
          <p>
            Since our pieces are often handcrafted to order, please allow 7-14
            business days for dispatch. You will be notified via WhatsApp once
            your order is shipped.
          </p>

          <h2 className="text-2xl font-serif text-charcoal pt-4">
            Return & Exchange Policy
          </h2>
          <p>
            We take pride in the quality of our craftsmanship. If you receive a
            damaged or incorrect item, please contact us via WhatsApp within 48
            hours of delivery with photographic evidence.
          </p>
          <p>
            Exchanges are subject to availability. We do not offer returns on
            custom-tailored or made-to-order pieces unless there is a
            manufacturing defect.
          </p>

          <h2 className="text-2xl font-serif text-charcoal pt-4">
            International Shipping
          </h2>
          <p>
            For international orders, please reach out to us directly on
            WhatsApp for a custom shipping quote and delivery timeline.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShippingReturns;
