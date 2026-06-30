import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Product from '@/models/Product';

const seedProducts = [
  {
    name: 'Eternal Rose Diamond Ring',
    description: 'A timeless solitaire diamond ring crafted in 18K rose gold. Features a 1.2ct brilliant-cut diamond with VS1 clarity and G color, set in a classic four-prong setting that maximizes light performance.',
    price: 2499,
    originalPrice: 3299,
    category: 'rings',
    material: '18K Rose Gold',
    gemstone: 'Diamond',
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80',
    ],
    colors: ['Rose Gold', 'Yellow Gold', 'White Gold'],
    sizes: ['5', '6', '7', '8', '9'],
    stock: 15,
    rating: 4.9,
    reviewCount: 127,
    tags: ['diamond', 'ring', 'engagement', 'rose gold', 'solitaire'],
    featured: true,
    arEnabled: true,
  },
  {
    name: 'Sapphire Celestial Necklace',
    description: 'An enchanting pendant necklace featuring a rare blue sapphire center stone surrounded by a halo of pavé diamonds, suspended from a delicate 18K white gold chain.',
    price: 1899,
    originalPrice: 2400,
    category: 'necklaces',
    material: '18K White Gold',
    gemstone: 'Sapphire',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80',
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80',
    ],
    colors: ['White Gold', 'Yellow Gold'],
    stock: 8,
    rating: 4.8,
    reviewCount: 89,
    tags: ['sapphire', 'necklace', 'pendant', 'white gold', 'halo'],
    featured: true,
    arEnabled: true,
  },
  {
    name: 'Emerald Tennis Bracelet',
    description: 'A stunning tennis bracelet featuring alternating emeralds and diamonds set in 18K yellow gold. Each emerald is hand-selected for exceptional color and clarity.',
    price: 3299,
    originalPrice: 4100,
    category: 'bracelets',
    material: '18K Yellow Gold',
    gemstone: 'Emerald',
    images: [
      'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800&q=80',
      'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800&q=80',
    ],
    colors: ['Yellow Gold'],
    stock: 5,
    rating: 4.7,
    reviewCount: 54,
    tags: ['emerald', 'bracelet', 'tennis', 'yellow gold', 'diamond'],
    featured: true,
    arEnabled: true,
  },
  {
    name: 'Pearl Drop Earrings',
    description: 'Elegant freshwater pearl drop earrings with 14K gold lever-back closures. These lustrous AAA-grade pearls are perfectly matched for size, shape, and luster.',
    price: 459,
    originalPrice: 599,
    category: 'earrings',
    material: '14K Yellow Gold',
    gemstone: 'Pearl',
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80',
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80',
    ],
    colors: ['Yellow Gold', 'White Gold'],
    stock: 20,
    rating: 4.6,
    reviewCount: 203,
    tags: ['pearl', 'earrings', 'drop', 'gold', 'freshwater'],
    featured: false,
    arEnabled: true,
  },
  {
    name: 'Ruby Vintage Cocktail Ring',
    description: 'A bold cocktail ring featuring a 2.5ct oval ruby surrounded by a vintage-inspired milgrain diamond halo, crafted in 18K yellow gold with intricate filigree detailing.',
    price: 3799,
    category: 'rings',
    material: '18K Yellow Gold',
    gemstone: 'Ruby',
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80',
    ],
    colors: ['Yellow Gold', 'Rose Gold'],
    sizes: ['5', '6', '7', '8'],
    stock: 6,
    rating: 4.9,
    reviewCount: 45,
    tags: ['ruby', 'ring', 'cocktail', 'vintage', 'halo'],
    featured: true,
    arEnabled: true,
  },
  {
    name: 'Diamond Infinity Bracelet',
    description: 'A delicate infinity bracelet crafted in 14K white gold, adorned with a continuous row of round brilliant diamonds totaling 0.75ct. Adjustable length for a perfect fit.',
    price: 1299,
    originalPrice: 1599,
    category: 'bracelets',
    material: '14K White Gold',
    gemstone: 'Diamond',
    images: [
      'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800&q=80',
    ],
    colors: ['White Gold', 'Rose Gold', 'Yellow Gold'],
    stock: 12,
    rating: 4.8,
    reviewCount: 178,
    tags: ['diamond', 'bracelet', 'infinity', 'white gold', 'delicate'],
    featured: false,
    arEnabled: true,
  },
  {
    name: 'Amethyst Stud Earrings',
    description: 'Vibrant purple amethyst stud earrings set in 14K rose gold bezel settings. These cushion-cut stones measure 8mm and exhibit exceptional color saturation.',
    price: 349,
    category: 'earrings',
    material: '14K Rose Gold',
    gemstone: 'Amethyst',
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80',
    ],
    colors: ['Rose Gold', 'Yellow Gold', 'White Gold'],
    stock: 25,
    rating: 4.5,
    reviewCount: 312,
    tags: ['amethyst', 'earrings', 'stud', 'rose gold', 'cushion'],
    featured: false,
    arEnabled: true,
  },
  {
    name: 'Gold Chain Layering Necklace Set',
    description: 'A versatile set of three delicate 14K gold chains in varying lengths (16", 18", 20") designed for effortless layering. Each chain features a different texture: cable, figaro, and rope.',
    price: 799,
    originalPrice: 999,
    category: 'necklaces',
    material: '14K Yellow Gold',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80',
    ],
    colors: ['Yellow Gold', 'White Gold', 'Rose Gold'],
    stock: 18,
    rating: 4.7,
    reviewCount: 256,
    tags: ['gold', 'necklace', 'chain', 'layering', 'set'],
    featured: false,
    arEnabled: true,
  },
];

export async function GET() {
  try {
    await connectDB();
    await Product.deleteMany({});
    await Product.insertMany(seedProducts);
    return NextResponse.json({ message: `Seeded ${seedProducts.length} products` });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Seed failed' }, { status: 500 });
  }
}
