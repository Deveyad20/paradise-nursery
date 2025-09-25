import { motion } from 'framer-motion'
import { Droplets, Sun, Wind, Thermometer, Heart, AlertTriangle, Leaf, Flower } from 'lucide-react'

const CareGuide = () => {
  const careCategories = [
    {
      icon: Droplets,
      title: 'Watering Guide',
      description: 'Learn how to properly water different types of plants',
      color: 'blue',
      tips: [
        'Check soil moisture before watering - stick your finger 1-2 inches into the soil',
        'Most plants prefer to dry out slightly between waterings',
        'Use room temperature water to avoid shocking plant roots',
        'Water in the morning so plants can dry during the day',
        'Succulents and cacti need much less water than tropical plants'
      ]
    },
    {
      icon: Sun,
      title: 'Light Requirements',
      description: 'Understanding sunlight needs for optimal plant health',
      color: 'yellow',
      tips: [
        'Low light: 2-4 hours of indirect light (perfect for offices)',
        'Medium light: 4-6 hours of indirect light (most common)',
        'Bright light: 6+ hours of direct or indirect light',
        'Direct sun can burn leaves - use sheer curtains to filter',
        'Rotate plants regularly for even growth'
      ]
    },
    {
      icon: Thermometer,
      title: 'Temperature & Humidity',
      description: 'Maintaining ideal growing conditions',
      color: 'red',
      tips: [
        'Most houseplants prefer 65-75°F (18-24°C)',
        'Avoid cold drafts and hot air vents',
        'Increase humidity with pebble trays or humidifiers',
        'Bathrooms are great for humidity-loving plants',
        'Protect plants from temperature fluctuations'
      ]
    },
    {
      icon: Leaf,
      title: 'Soil & Fertilizer',
      description: 'Choosing the right growing medium and nutrients',
      color: 'green',
      tips: [
        'Use well-draining potting mix appropriate for your plant type',
        'Fertilize during growing season (spring and summer)',
        'Dilute fertilizer to half strength to avoid burning roots',
        'Flush soil every few months to remove salt buildup',
        'Repot when roots become crowded or soil breaks down'
      ]
    }
  ]

  const plantTypes = [
    {
      name: 'Succulents & Cacti',
      icon: Flower,
      care: {
        water: 'Every 2-3 weeks',
        light: 'Bright, direct light',
        temp: '65-80°F (18-27°C)',
        humidity: 'Low',
        tips: 'Allow soil to dry completely between waterings. Use well-draining cactus soil.'
      }
    },
    {
      name: 'Tropical Plants',
      icon: Leaf,
      care: {
        water: 'When top inch is dry',
        light: 'Bright, indirect light',
        temp: '65-75°F (18-24°C)',
        humidity: 'High',
        tips: 'Mist regularly or use pebble trays. Avoid cold drafts and direct sun.'
      }
    },
    {
      name: 'Flowering Plants',
      icon: Flower,
      care: {
        water: 'Keep soil moist',
        light: 'Bright, indirect light',
        temp: '65-75°F (18-24°C)',
        humidity: 'Moderate',
        tips: 'Fertilize regularly during growing season. Remove dead flowers to encourage more blooms.'
      }
    },
    {
      name: 'Herbs',
      icon: Leaf,
      care: {
        water: 'When top inch is dry',
        light: 'Bright, direct light',
        temp: '65-75°F (18-24°C)',
        humidity: 'Low to moderate',
        tips: 'Harvest regularly to encourage bushy growth. Use well-draining soil.'
      }
    }
  ]

  const commonProblems = [
    {
      problem: 'Yellow Leaves',
      causes: ['Overwatering', 'Poor drainage', 'Too much direct sun', 'Nutrient deficiency'],
      solutions: ['Check soil moisture', 'Improve drainage', 'Move to indirect light', 'Fertilize appropriately']
    },
    {
      problem: 'Brown Leaf Tips',
      causes: ['Low humidity', 'Fluoride in water', 'Dry air', 'Salt buildup'],
      solutions: ['Increase humidity', 'Use filtered water', 'Mist regularly', 'Flush soil periodically']
    },
    {
      problem: 'Wilting',
      causes: ['Underwatering', 'Overwatering', 'Root rot', 'Temperature stress'],
      solutions: ['Check soil moisture', 'Ensure proper drainage', 'Repot if needed', 'Maintain consistent temperature']
    },
    {
      problem: 'No Growth',
      causes: ['Insufficient light', 'Wrong season', 'Root-bound', 'Nutrient poor soil'],
      solutions: ['Increase light exposure', 'Be patient with seasonal changes', 'Repot in larger container', 'Fertilize regularly']
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
          Plant Care Guide
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Everything you need to know to keep your plants healthy and thriving.
          From watering basics to troubleshooting common problems.
        </p>
      </motion.div>

      {/* Care Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Essential Care Categories
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {careCategories.map((category, index) => {
            const IconComponent = category.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8"
              >
                <div className="flex items-center mb-6">
                  <div className={`p-3 bg-${category.color}-100 dark:bg-${category.color}-900 rounded-lg mr-4`}>
                    <IconComponent className={`w-8 h-8 text-${category.color}-600 dark:text-${category.color}-400`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {category.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {category.description}
                    </p>
                  </div>
                </div>

                <ul className="space-y-3">
                  {category.tips.map((tip, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">{tip}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Plant Type Specific Care */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Plant-Specific Care Guides
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {plantTypes.map((plant, index) => {
            const IconComponent = plant.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
              >
                <div className="flex items-center mb-6">
                  <IconComponent className="w-8 h-8 text-green-600 dark:text-green-400 mr-3" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {plant.name}
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-300">Watering</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{plant.care.water}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-300">Light</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{plant.care.light}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-300">Temperature</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{plant.care.temp}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-300">Humidity</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{plant.care.humidity}</span>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <strong>Pro Tip:</strong> {plant.care.tips}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Common Problems */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Troubleshooting Common Problems
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {commonProblems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
            >
              <div className="flex items-center mb-4">
                <AlertTriangle className="w-6 h-6 text-orange-500 mr-3" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {problem.problem}
                </h3>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Possible Causes:</h4>
                  <ul className="space-y-1">
                    {problem.causes.map((cause, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">{cause}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Solutions:</h4>
                  <ul className="space-y-1">
                    {problem.solutions.map((solution, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">{solution}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-16 text-center"
      >
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-8 border border-green-200 dark:border-green-800">
          <Heart className="w-12 h-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Need More Help?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Our plant experts are always here to help! Contact us with specific questions about your plants,
            and we'll provide personalized care advice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Contact Support
            </a>
            <a
              href="/products"
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-8 py-3 rounded-lg font-semibold border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              Shop Plants
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default CareGuide