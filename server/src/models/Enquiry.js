import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Enquiry = mongoose.model('Enquiry', enquirySchema);

export default Enquiry;