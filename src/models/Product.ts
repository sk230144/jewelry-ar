import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: 'rings' | 'necklaces' | 'bracelets' | 'earrings';
  material: string;
  gemstone?: string;
  images: string[];
  modelUrl?: string;
  colors: string[];
  sizes?: string[];
  stock: number;
  rating: number;
  reviewCount: number;
  tags: string[];
  featured: boolean;
  arEnabled: boolean;
}

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  category: { type: String, enum: ['rings', 'necklaces', 'bracelets', 'earrings'], required: true },
  material: { type: String, required: true },
  gemstone: { type: String },
  images: [{ type: String }],
  modelUrl: { type: String },
  colors: [{ type: String }],
  sizes: [{ type: String }],
  stock: { type: Number, default: 10 },
  rating: { type: Number, default: 4.5 },
  reviewCount: { type: Number, default: 0 },
  tags: [{ type: String }],
  featured: { type: Boolean, default: false },
  arEnabled: { type: Boolean, default: true },
}, { timestamps: true });

ProductSchema.index({ name: 'text', description: 'text', tags: 'text' });

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
