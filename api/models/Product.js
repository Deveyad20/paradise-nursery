const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 100]
      }
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [10, 2000]
      }
    },
    shortDescription: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [0, 200]
      }
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0
      }
    },
    compareAtPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      validate: {
        min: 0
      }
    },
    costPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      validate: {
        min: 0
      }
    },
    sku: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    barcode: {
      type: DataTypes.STRING,
      allowNull: true
    },
    category: {
      type: DataTypes.ENUM(
        'indoor',
        'outdoor',
        'succulents',
        'herbs',
        'flowers',
        'trees',
        'accessories'
      ),
      allowNull: false
    },
    tags: {
      type: DataTypes.JSON,
      defaultValue: []
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    stockStatus: {
      type: DataTypes.ENUM('in_stock', 'low_stock', 'out_of_stock'),
      defaultValue: 'in_stock'
    },
    minStockLevel: {
      type: DataTypes.INTEGER,
      defaultValue: 5,
      validate: {
        min: 0
      }
    },
    maxStockLevel: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    weight: {
      type: DataTypes.DECIMAL(8, 3),
      allowNull: true,
      validate: {
        min: 0
      }
    },
    dimensions: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: {
        length: null,
        width: null,
        height: null,
        unit: 'cm'
      }
    },
    careLevel: {
      type: DataTypes.ENUM('easy', 'medium', 'hard'),
      allowNull: false,
      defaultValue: 'medium'
    },
    lightRequirement: {
      type: DataTypes.ENUM('low', 'medium', 'bright', 'direct'),
      allowNull: true
    },
    waterRequirement: {
      type: DataTypes.ENUM('low', 'medium', 'high'),
      allowNull: true
    },
    temperatureRange: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: {
        min: 15,
        max: 30,
        unit: 'celsius'
      }
    },
    humidityRequirement: {
      type: DataTypes.ENUM('low', 'medium', 'high'),
      allowNull: true
    },
    toxicToPets: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    images: {
      type: DataTypes.JSON,
      defaultValue: []
    },
    featuredImage: {
      type: DataTypes.STRING,
      allowNull: true
    },
    gallery: {
      type: DataTypes.JSON,
      defaultValue: []
    },
    seoTitle: {
      type: DataTypes.STRING,
      allowNull: true
    },
    seoDescription: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    seoKeywords: {
      type: DataTypes.JSON,
      defaultValue: []
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    isFeatured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isDigital: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    requiresShipping: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    shippingClass: {
      type: DataTypes.ENUM('standard', 'express', 'fragile', 'oversized'),
      defaultValue: 'standard'
    },
    taxClass: {
      type: DataTypes.ENUM('standard', 'reduced', 'zero'),
      defaultValue: 'standard'
    },
    metadata: {
      type: DataTypes.JSON,
      defaultValue: {}
    }
  }, {
    timestamps: true,
    indexes: [
      {
        fields: ['category']
      },
      {
        fields: ['careLevel']
      },
      {
        fields: ['isActive', 'isFeatured']
      },
      {
        fields: ['price']
      },
      {
        fields: ['name']
      },
      {
        unique: true,
        fields: ['slug']
      }
    ]
  });

  // Instance methods
  Product.prototype.getDiscountPercentage = function() {
    if (this.compareAtPrice && this.compareAtPrice > this.price) {
      return Math.round(((this.compareAtPrice - this.price) / this.compareAtPrice) * 100);
    }
    return 0;
  };

  Product.prototype.isInStock = function() {
    return this.stock > 0 && this.stockStatus === 'in_stock';
  };

  Product.prototype.isLowStock = function() {
    return this.stock <= this.minStockLevel && this.stock > 0;
  };

  Product.prototype.updateStockStatus = function() {
    if (this.stock <= 0) {
      this.stockStatus = 'out_of_stock';
    } else if (this.stock <= this.minStockLevel) {
      this.stockStatus = 'low_stock';
    } else {
      this.stockStatus = 'in_stock';
    }
  };

  // Hooks
  Product.beforeSave(async (product) => {
    // Generate slug from name if not provided
    if (!product.slug && product.name) {
      product.slug = product.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      // Ensure unique slug
      let counter = 1;
      let uniqueSlug = product.slug;
      while (await Product.findOne({ where: { slug: uniqueSlug } })) {
        uniqueSlug = `${product.slug}-${counter}`;
        counter++;
      }
      product.slug = uniqueSlug;
    }

    // Update stock status
    product.updateStockStatus();
  });

  Product.afterCreate(async (product) => {
    // Could trigger low stock notifications or indexing
    if (product.isLowStock()) {
      console.log(`Low stock alert for product: ${product.name}`);
    }
  });

  return Product;
};