import { motion } from 'framer-motion'
import { Truck, Clock, Shield, MapPin, Package, CreditCard, Globe, Phone } from 'lucide-react'

const ShippingInfo = () => {
  const shippingOptions = [
    {
      name: 'Standard Shipping',
      time: '5-7 Business Days',
      cost: '$9.99',
      description: 'Most economical option for non-urgent orders',
      features: ['Order tracking', 'Insurance included', 'Signature required']
    },
    {
      name: 'Express Shipping',
      time: '2-3 Business Days',
      cost: '$19.99',
      description: 'Faster delivery for when you need it sooner',
      features: ['Priority handling', 'Order tracking', 'Insurance included', 'Signature required']
    },
    {
      name: 'Overnight Shipping',
      time: '1 Business Day',
      cost: '$39.99',
      description: 'Urgent delivery for time-sensitive plants',
      features: ['Next-day delivery', 'Priority handling', 'Order tracking', 'Insurance included', 'Signature required']
    },
    {
      name: 'Free Shipping',
      time: '7-10 Business Days',
      cost: 'FREE',
      description: 'Free shipping on orders over $75',
      features: ['Order tracking', 'Insurance included', 'Signature required', 'Free on orders $75+']
    }
  ]

  const shippingZones = [
    {
      zone: 'Zone 1 - Local',
      areas: ['Plant City Metro Area', 'Surrounding Counties'],
      time: '1-2 Business Days',
      cost: '$4.99'
    },
    {
      zone: 'Zone 2 - Regional',
      areas: ['State-wide', 'Neighboring States'],
      time: '2-4 Business Days',
      cost: '$9.99'
    },
    {
      zone: 'Zone 3 - National',
      areas: ['Continental US', 'Alaska & Hawaii'],
      time: '3-7 Business Days',
      cost: '$14.99'
    },
    {
      zone: 'International',
      areas: ['Canada', 'Mexico', 'Europe', 'Asia Pacific'],
      time: '7-14 Business Days',
      cost: '$29.99+'
    }
  ]

  const packagingInfo = [
    {
      icon: Package,
      title: 'Secure Packaging',
      description: 'Plants are carefully wrapped and secured to prevent damage during transit'
    },
    {
      icon: Shield,
      title: 'Temperature Controlled',
      description: 'Special packaging maintains optimal temperature for plant health'
    },
    {
      icon: Truck,
      title: 'Insured Shipping',
      description: 'All shipments are fully insured against loss or damage'
    },
    {
      icon: Clock,
      title: 'Fast Processing',
      description: 'Orders processed within 1-2 business days of placement'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Shipping Information
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          We take great care in shipping your plants to ensure they arrive healthy and beautiful.
          Learn about our shipping options, rates, and policies.
        </p>
      </motion.div>

      {/* Shipping Options */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Shipping Options
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {shippingOptions.map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 ${
                option.name === 'Free Shipping' ? 'ring-2 ring-green-500' : ''
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {option.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {option.description}
                  </p>
                </div>
                {option.name === 'Free Shipping' && (
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Popular
                  </span>
                )}
              </div>

              <div className="flex justify-between items-center mb-6">
                <div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-300">{option.time}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {option.cost}
                  </span>
                </div>
              </div>

              <ul className="space-y-2">
                {option.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Shipping Zones */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Shipping Zones & Rates
        </h2>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Shipping Zone
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Areas Covered
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Delivery Time
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Standard Rate
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                {shippingZones.map((zone, index) => (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      {zone.zone}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                      {zone.areas.join(', ')}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                      {zone.time}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-green-600 dark:text-green-400">
                      {zone.cost}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* Packaging & Protection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Packaging & Protection
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {packagingInfo.map((info, index) => {
            const IconComponent = info.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
              >
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {info.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {info.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Important Notes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Important Shipping Notes
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4">
              📦 Order Processing
            </h3>
            <ul className="space-y-2 text-blue-800 dark:text-blue-200">
              <li>• Orders placed before 2 PM EST ship same business day</li>
              <li>• Weekend orders ship on Monday (or next business day)</li>
              <li>• All plants are inspected before shipping</li>
              <li>• Tracking information sent via email</li>
            </ul>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-4">
              🌱 Plant Protection
            </h3>
            <ul className="space-y-2 text-green-800 dark:text-green-200">
              <li>• Temperature-controlled packaging</li>
              <li>• Secure plant stabilization</li>
              <li>• Moisture-retaining materials</li>
              <li>• Damage protection insurance</li>
            </ul>
          </div>

          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6 border border-orange-200 dark:border-orange-800">
            <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-4">
              ⚠️ Weather Delays
            </h3>
            <ul className="space-y-2 text-orange-800 dark:text-orange-200">
              <li>• Extreme weather may delay shipping</li>
              <li>• We hold orders during heat/cold waves</li>
              <li>• You'll be notified of any delays</li>
              <li>• Plant health is our priority</li>
            </ul>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
            <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-4">
              🚚 Delivery Options
            </h3>
            <ul className="space-y-2 text-purple-800 dark:text-purple-200">
              <li>• Signature required for all deliveries</li>
              <li>• Delivery attempts: up to 3 times</li>
              <li>• Alternative delivery options available</li>
              <li>• Contact us for special arrangements</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              How do you protect plants during shipping?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              We use specialized plant packaging with temperature-controlled materials, secure stabilization,
              and moisture-retaining elements to ensure your plants arrive in perfect condition.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              What if my plant arrives damaged?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              All shipments are fully insured. If your plant arrives damaged, contact us within 48 hours
              with photos and we'll replace it or refund your order.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Do you ship internationally?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Yes! We ship to Canada, Mexico, Europe, and Asia Pacific. International shipping rates
              and times vary by destination. Some plant restrictions may apply.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Can I change my shipping address after ordering?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              You can update your shipping address within 1 hour of placing your order by contacting
              our customer service team immediately.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Contact CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="text-center"
      >
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-8 border border-green-200 dark:border-green-800">
          <Truck className="w-12 h-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Questions About Shipping?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Our shipping experts are here to help! Contact us if you have any questions about
            shipping options, rates, or special delivery arrangements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Contact Shipping Support
            </a>
            <a
              href="tel:+15551234567"
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-8 py-3 rounded-lg font-semibold border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center"
            >
              <Phone className="w-4 h-4 mr-2" />
              Call: (555) 123-4567
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ShippingInfo