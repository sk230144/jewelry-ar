import mongoose, { Schema, Document } from 'mongoose';

const OrderItemSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true },
  selectedColor: String,
  selectedSize: String,
});

const AddressSchema = new Schema({
  fullName: String,
  address: String,
  city: String,
  state: String,
  zipCode: String,
  country: String,
});

export interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  items: typeof OrderItemSchema[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  shippingAddress: typeof AddressSchema;
  paymentMethod: string;
}

const OrderSchema = new Schema<IOrder>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [OrderItemSchema],
  total: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'shipped', 'delivered'], default: 'pending' },
  shippingAddress: AddressSchema,
  paymentMethod: { type: String, default: 'card' },
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);
