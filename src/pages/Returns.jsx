import { motion } from 'framer-motion'
import { RotateCcw, Clock, Shield, CheckCircle, XCircle, AlertTriangle, Package, RefreshCw } from 'lucide-react'

const Returns = () => {
  const returnPolicies = [
    {
      title: '30-Day Return Window',
      description: 'Return any plant within 30 days of delivery for a full refund',
      icon: Clock,
      color: 'blue'
    },
    {
      title: 'Plant Health Guarantee',
      description: 'If your plant arrives damaged or dies within 30 days, we replace it free',
      icon: Shield,
      color: 'green'
    },
    {
      title: 'Easy Return Process',
      description: 'Simple online return request with prepaid return shipping',
      icon: RotateCcw,
      color: 'purple'
    },
    {
      title: 'Quality Assurance',
      description: 'All plants inspected before shipping with 100% satisfaction guarantee',
      icon: CheckCircle,
      color: 'green'
    }
  ]

  const returnProcess = [
    {
      step: '1',
      title: 'Initiate Return',
      description: 'Contact us within 30 days of delivery with your order number',
      time: 'Within 30 days'
    },
    {
      step: '2',
      title: 'Package Plant',
      description: 'Securely package the plant in its original container if possible',
      time: '1-2 days'
    },
    {
      step: '3',
      title: 'Ship Back',
      description: 'Use prepaid return label or drop off at any shipping location',
      time: '2-5 days'
    },
    {
      step: '4',
      title: 'Process Refund',
      description: 'Once received and inspected, refund processed to original payment method',
      time: '3-7 days'
    }
  ]

  const nonReturnableItems = [
    'Plants damaged due to customer neglect',
    'Plants exposed to extreme weather conditions',
    'Seasonal items after their season has passed',
    'Custom or personalized plant arrangements',
    'Clearance or final sale items',
    'Plants older than 30 days from delivery'
  ]

  const returnableItems = [
    'Plants that arrive damaged or diseased',
    'Wrong items shipped',
    'Plants that die within 30 days (with proper care)',
    'Items not matching product description',
    'Quality issues or defects',
    'Customer dissatisfaction within return window'
  ]

  const faqs = [
    {
      question: 'How do I know if my plant qualifies for return?',
      answer: 'Most plants qualify for return within 30 days if they arrive damaged, die with proper care, or if you\'re simply not satisfied. Contact our customer service team to discuss your specific situation.'
    },
    {
      question: 'Do I need the original packaging for returns?',
      answer: 'While original packaging is preferred, it\'s not required. We just need the plant securely packaged to prevent damage during return shipping.'
    },
    {
      question: 'How long does the refund process take?',
      answer: 'Once we receive and inspect your returned plant, refunds are typically processed within 3-5 business days. You\'ll receive an email confirmation when the refund is issued.'
    },
    {
      question: 'Can I exchange a plant instead of getting a refund?',
      answer: 'Yes! We offer exchanges for different plants of equal or lesser value. Just let our customer service team know your preference when initiating the return.'
    },
    {
      question: 'What if my plant dies after the 30-day return window?',
      answer: 'While our standard return policy is 30 days, we still want to help. Contact our plant care experts for troubleshooting advice, and we may be able to offer store credit or replacement options.'
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
          Returns & Exchanges
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          We're committed to your satisfaction. If you're not completely happy with your plants,
          our hassle-free return policy makes it easy to make things right.
        </p>
      </motion.div>

      {/* Return Policies */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Our Return Promise
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {returnPolicies.map((policy, index) => {
            const IconComponent = policy.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8"
              >
                <div className="flex items-center mb-4">
                  <div className={`p-3 bg-${policy.color}-100 dark:bg-${policy.color}-900 rounded-lg mr-4`}>
                    <IconComponent className={`w-8 h-8 text-${policy.color}-600 dark:text-${policy.color}-400`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {policy.title}
                    </h3>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {policy.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Return Process */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          How Returns Work
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {returnProcess.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                {step.step}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                {step.description}
              </p>
              <p className="text-sm text-green-600 dark:text-green-400 font-semibold">
                ⏱️ {step.time}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Returnable vs Non-Returnable */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-16"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Returnable Items */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400 mr-3" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                What's Returnable
              </h3>
            </div>
            <ul className="space-y-3">
              {returnableItems.map((item, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Non-Returnable Items */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <XCircle className="w-8 h-8 text-red-600 dark:text-red-400 mr-3" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                What's Not Returnable
              </h3>
            </div>
            <ul className="space-y-3">
              {nonReturnableItems.map((item, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Special Cases */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Special Return Cases
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
            <Package className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3 text-center">
              Damaged on Arrival
            </h3>
            <p className="text-blue-800 dark:text-blue-200 text-sm text-center">
              If your plant arrives damaged, contact us within 48 hours with photos.
              We'll replace it immediately at no cost to you.
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
            <RefreshCw className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-3 text-center">
              Plant Health Guarantee
            </h3>
            <p className="text-green-800 dark:text-green-200 text-sm text-center">
              If your plant dies within 30 days with proper care, we'll replace it
              or provide store credit. Just show us your care routine.
            </p>
          </div>

          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6 border border-orange-200 dark:border-orange-800">
            <AlertTriangle className="w-8 h-8 text-orange-600 dark:text-orange-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-3 text-center">
              Weather Delays
            </h3>
            <p className="text-orange-800 dark:text-orange-200 text-sm text-center">
              During extreme weather, we may delay shipping. If this affects your plant's
              health, we'll work with you on a solution.
            </p>
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
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                {faq.question}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {faq.answer}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Contact CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="text-center"
      >
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-8 border border-green-200 dark:border-green-800">
          <RotateCcw className="w-12 h-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Need to Start a Return?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Our customer service team is here to help make the return process as smooth as possible.
            Contact us with your order number and we'll guide you through the process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Start Return Process
            </a>
            <a
              href="tel:+15551234567"
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-8 py-3 rounded-lg font-semibold border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center"
            >
              📞 Call: (555) 123-4567
            </a>
          </div>
        </div>
      </motion.div>

      {/* Fine Print */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg"
      >
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
          Important Notes:
        </h3>
        <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
          <li>• Return shipping costs are covered by Paradise Nursery for approved returns</li>
          <li>• Refunds are processed to the original payment method</li>
          <li>• Plants must be returned in resalable condition for full refund</li>
          <li>• We reserve the right to deny returns for items damaged due to customer neglect</li>
          <li>• Return policy subject to change; current policy applies to all orders</li>
        </ul>
      </motion.div>
    </div>
  )
}

export default Returns