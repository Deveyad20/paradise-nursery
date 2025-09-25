/**
 * @typedef {Object} Product
 * @property {string} id - Unique product identifier
 * @property {string} name - Product name
 * @property {number} price - Product price
 * @property {string} image - Product image URL
 * @property {string} category - Product category
 * @property {string} description - Product description
 * @property {number} rating - Product rating (1-5)
 * @property {number} reviews - Number of reviews
 * @property {boolean} inStock - Whether product is in stock
 * @property {string[]} tags - Product tags
 * @property {string} [careInstructions] - Care instructions
 * @property {string} [size] - Product size
 * @property {string} [lightRequirement] - Light requirements
 * @property {string} [waterRequirement] - Water requirements
 * @property {string[]} [images] - Additional product images
 * @property {number} [discount] - Discount percentage
 * @property {number} [originalPrice] - Original price before discount
 */

/**
 * @typedef {Object} CartItem
 * @property {string} id - Unique cart item identifier
 * @property {string} name - Product name
 * @property {number} price - Product price
 * @property {string} image - Product image URL
 * @property {number} quantity - Quantity in cart
 * @property {string} category - Product category
 * @property {string} [description] - Product description
 */

/**
 * @typedef {Object} User
 * @property {string} id - Unique user identifier
 * @property {string} email - User email
 * @property {string} name - User name
 * @property {string} [avatar] - User avatar URL
 * @property {string} [phone] - User phone number
 * @property {Address} [address] - User address
 * @property {UserPreferences} [preferences] - User preferences
 * @property {string} [createdAt] - Account creation date
 * @property {string} [updatedAt] - Last update date
 */

/**
 * @typedef {Object} Address
 * @property {string} street - Street address
 * @property {string} city - City
 * @property {string} state - State/Province
 * @property {string} zipCode - ZIP/Postal code
 * @property {string} country - Country
 */

/**
 * @typedef {Object} UserPreferences
 * @property {boolean} newsletter - Newsletter subscription
 * @property {boolean} notifications - Notification preferences
 * @property {string} currency - Preferred currency
 * @property {string} language - Preferred language
 */

/**
 * @typedef {Object} WishlistItem
 * @property {string} id - Unique wishlist item identifier
 * @property {string} productId - Product identifier
 * @property {string} addedAt - Date added to wishlist
 */

/**
 * @typedef {Object} Review
 * @property {string} id - Unique review identifier
 * @property {string} productId - Product identifier
 * @property {string} userId - User identifier
 * @property {string} userName - Reviewer name
 * @property {string} [userAvatar] - Reviewer avatar URL
 * @property {number} rating - Review rating (1-5)
 * @property {string} comment - Review comment
 * @property {string[]} [images] - Review images
 * @property {string} createdAt - Review creation date
 * @property {number} helpful - Number of helpful votes
 */

/**
 * @typedef {Object} Order
 * @property {string} id - Unique order identifier
 * @property {string} userId - User identifier
 * @property {OrderItem[]} items - Order items
 * @property {number} total - Order total
 * @property {OrderStatus} status - Order status
 * @property {Address} shippingAddress - Shipping address
 * @property {Address} billingAddress - Billing address
 * @property {PaymentMethod} paymentMethod - Payment method
 * @property {string} createdAt - Order creation date
 * @property {string} updatedAt - Last update date
 * @property {string} [trackingNumber] - Tracking number
 * @property {string} [estimatedDelivery] - Estimated delivery date
 */

/**
 * @typedef {Object} OrderItem
 * @property {string} productId - Product identifier
 * @property {string} name - Product name
 * @property {string} image - Product image URL
 * @property {number} price - Product price
 * @property {number} quantity - Quantity ordered
 * @property {string} category - Product category
 */

/**
 * @typedef {OrderStatus} OrderStatus
 */

/**
 * @typedef {Object} PaymentMethod
 * @property {'credit_card'|'debit_card'|'paypal'|'apple_pay'|'google_pay'} type - Payment method type
 * @property {string} [last4] - Last 4 digits of card
 * @property {string} [brand] - Card brand
 */

/**
 * @typedef {Object} ProductFilters
 * @property {string} [category] - Product category filter
 * @property {[number, number]} [priceRange] - Price range filter
 * @property {number} [rating] - Minimum rating filter
 * @property {boolean} [inStock] - In stock filter
 * @property {string[]} [tags] - Tags filter
 * @property {string} [searchQuery] - Search query
 */

/**
 * @typedef {Object} SortOption
 * @property {string} value - Sort value
 * @property {string} label - Sort label
 * @property {'asc'|'desc'} direction - Sort direction
 */

/**
 * @typedef {Theme} Theme
 */

/**
 * @typedef {Object} ApiResponse
 * @property {*} data - Response data
 * @property {string} [message] - Response message
 * @property {boolean} success - Success status
 */

/**
 * @typedef {Object} PaginatedResponse
 * @property {*[]} data - Paginated data
 * @property {Object} pagination - Pagination info
 * @property {number} pagination.page - Current page
 * @property {number} pagination.limit - Items per page
 * @property {number} pagination.total - Total items
 * @property {number} pagination.totalPages - Total pages
 */

/**
 * @typedef {Object} LoginForm
 * @property {string} email - User email
 * @property {string} password - User password
 * @property {boolean} [rememberMe] - Remember me option
 */

/**
 * @typedef {Object} RegisterForm
 * @property {string} name - User name
 * @property {string} email - User email
 * @property {string} password - User password
 * @property {string} confirmPassword - Password confirmation
 * @property {boolean} acceptTerms - Terms acceptance
 */

/**
 * @typedef {Object} ProfileForm
 * @property {string} name - User name
 * @property {string} email - User email
 * @property {string} [phone] - User phone
 * @property {File} [avatar] - User avatar file
 */

/**
 * @typedef {Object} AddressForm
 * @property {string} street - Street address
 * @property {string} city - City
 * @property {string} state - State/Province
 * @property {string} zipCode - ZIP/Postal code
 * @property {string} country - Country
 */

/**
 * @typedef {Object} ReviewForm
 * @property {number} rating - Review rating
 * @property {string} comment - Review comment
 * @property {File[]} [images] - Review images
 */

/**
 * @typedef {Object} Notification
 * @property {string} id - Unique notification identifier
 * @property {'success'|'error'|'warning'|'info'} type - Notification type
 * @property {string} title - Notification title
 * @property {string} message - Notification message
 * @property {string} timestamp - Notification timestamp
 * @property {boolean} read - Read status
 * @property {string} [actionUrl] - Action URL
 * @property {string} [actionText] - Action text
 */

/**
 * @typedef {Object} ModalState
 * @property {boolean} isOpen - Modal open state
 * @property {string} [type] - Modal type
 * @property {*} [data] - Modal data
 */

/**
 * @typedef {Object} LoadingState
 * @property {boolean} [key] - Loading state by key
 */