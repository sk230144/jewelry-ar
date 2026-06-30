import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  wishlist: mongoose.Types.ObjectId[];
  comparePassword(password: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  wishlist: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
}, { timestamps: true });

UserSchema.methods.hashPassword = async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password as string, 12);
  }
};

UserSchema.methods.comparePassword = async function (password: string) {
  return bcrypt.compare(password, this.password as string);
};

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
