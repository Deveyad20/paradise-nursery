const { User, Product, Cart, Order } = require('../models');
const bcrypt = require('bcryptjs');

const sampleUsers = [
  {
    id: '550e8400-e29b-41d4-a716-446655440000',
    email: 'admin@paradisenursery.com',
    password: 'Admin123!',
    firstName: 'Admin',
    lastName: 'User',
    phone: '+1234567890',
    role: 'admin',
    isEmailVerified: true,
    isActive: true
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    email: 'john.doe@example.com',
    password: 'Password123!',
    firstName: 'John',
    lastName: 'Doe',
    phone: '+1987654321',
    role: 'customer',
    isEmailVerified: true,
    isActive: true
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    email: 'jane.smith@example.com',
    password: 'Password123!',
    firstName: 'Jane',
    lastName: 'Smith',
    phone: '+1555123456',
    role: 'customer',
    isEmailVerified: true,
    isActive: true
  }
];

const sampleProducts = [
  {
    id: '660e8400-e29b-41d4-a716-446655440000',
    name: 'Monstera Deliciosa',
    slug: 'monstera-deliciosa',
    description: 'The iconic Swiss cheese plant, perfect for adding tropical vibes to any space. This easy-to-care-for plant features large, glossy leaves with natural holes that develop as it matures.',
    shortDescription: 'Iconic tropical houseplant with large split leaves',
    price: 45.99,
    compareAtPrice: 55.00,
    category: 'indoor',
    stock: 25,
    careLevel: 'easy',
    lightRequirement: 'medium',
    waterRequirement: 'medium',
    toxicToPets: false,
    isActive: true,
    isFeatured: true,
    tags: ['tropical', 'large-leaves', 'air-purifying', 'beginner-friendly']
  },
  {
    id: '660e8400-e29b-41d4-a716-446655440001',
    name: 'Snake Plant',
    slug: 'snake-plant',
    description: 'Also known as Mother-in-Law\'s Tongue, this hardy plant is nearly indestructible and perfect for beginners. It thrives in low light and helps purify indoor air.',
    shortDescription: 'Hardy, low-maintenance plant that purifies air',
    price: 29.99,
    category: 'indoor',
    stock: 40,
    careLevel: 'easy',
    lightRequirement: 'low',
    waterRequirement: 'low',
    toxicToPets: true,
    isActive: true,
    isFeatured: false,
    tags: ['low-light', 'air-purifying', 'drought-tolerant', 'beginner-friendly']
  },
  {
    id: '660e8400-e29b-41d4-a716-446655440002',
    name: 'Succulent Collection',
    slug: 'succulent-collection',
    description: 'A beautiful assortment of colorful succulents in various shapes and sizes. Perfect for desks, windowsills, or creating a mini desert landscape.',
    shortDescription: 'Colorful assortment of low-water succulents',
    price: 24.99,
    category: 'succulents',
    stock: 15,
    careLevel: 'easy',
    lightRequirement: 'bright',
    waterRequirement: 'low',
    toxicToPets: false,
    isActive: true,
    isFeatured: true,
    tags: ['colorful', 'low-water', 'desk-plant', 'collection']
  },
  {
    id: '660e8400-e29b-41d4-a716-446655440003',
    name: 'Lavender Plant',
    slug: 'lavender-plant',
    description: 'Fragrant English lavender perfect for herb gardens or containers. Attracts pollinators and can be used for crafts and cooking.',
    shortDescription: 'Fragrant herb perfect for gardens and crafts',
    price: 18.99,
    category: 'herbs',
    stock: 30,
    careLevel: 'medium',
    lightRequirement: 'bright',
    waterRequirement: 'low',
    toxicToPets: false,
    isActive: true,
    isFeatured: false,
    tags: ['fragrant', 'herb', 'pollinator-friendly', 'drought-tolerant']
  },
  {
    id: '660e8400-e29b-41d4-a716-446655440004',
    name: 'Peace Lily',
    slug: 'peace-lily',
    description: 'Elegant flowering plant with glossy leaves and white blooms. Excellent air purifier that thrives in low to medium light conditions.',
    shortDescription: 'Elegant flowering plant that purifies air',
    price: 35.99,
    category: 'indoor',
    stock: 20,
    careLevel: 'easy',
    lightRequirement: 'medium',
    waterRequirement: 'medium',
    toxicToPets: true,
    isActive: true,
    isFeatured: true,
    tags: ['flowering', 'air-purifying', 'elegant', 'low-light']
  },
  {
    id: '660e8400-e29b-41d4-a716-446655440005',
    name: 'Ceramic Plant Pot',
    slug: 'ceramic-plant-pot',
    description: 'Handcrafted ceramic pot with drainage hole and saucer. Available in multiple colors and sizes to complement any plant.',
    shortDescription: 'Handcrafted ceramic pot with drainage',
    price: 15.99,
    category: 'accessories',
    stock: 50,
    careLevel: 'easy',
    isActive: true,
    isFeatured: false,
    requiresShipping: true,
    tags: ['ceramic', 'handcrafted', 'drainage', 'decorative']
  }
];

const seedDatabase = async () => {
  try {
    console.log('🌱 Seeding database...');

    // Hash passwords for users
    for (let user of sampleUsers) {
      user.password = await bcrypt.hash(user.password, 12);
    }

    // Create users
    await User.bulkCreate(sampleUsers, {
      ignoreDuplicates: true
    });
    console.log('✅ Users created');

    // Create products
    await Product.bulkCreate(sampleProducts, {
      ignoreDuplicates: true
    });
    console.log('✅ Products created');

    // Create sample cart
    const user = await User.findOne({ where: { email: 'john.doe@example.com' } });
    const monstera = await Product.findOne({ where: { slug: 'monstera-deliciosa' } });
    const snakePlant = await Product.findOne({ where: { slug: 'snake-plant' } });

    if (user && monstera && snakePlant) {
      await Cart.create({
        userId: user.id,
        items: [
          {
            productId: monstera.id,
            name: monstera.name,
            price: parseFloat(monstera.price),
            image: monstera.featuredImage,
            quantity: 1,
            maxQuantity: monstera.stock
          },
          {
            productId: snakePlant.id,
            name: snakePlant.name,
            price: parseFloat(snakePlant.price),
            image: snakePlant.featuredImage,
            quantity: 2,
            maxQuantity: snakePlant.stock
          }
        ],
        subtotal: parseFloat(monstera.price) + (parseFloat(snakePlant.price) * 2),
        itemCount: 3,
        isActive: true
      });
      console.log('✅ Sample cart created');
    }

    console.log('🎉 Database seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
};

module.exports = {
  sampleUsers,
  sampleProducts,
  seedDatabase
};