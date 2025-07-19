import React from 'react'
import FeatureCard from './FeatureCard'
import { FaShieldAlt, FaTools, FaLink, FaPalette, FaStarOfLife } from 'react-icons/fa'
import { MdPhonelink } from 'react-icons/md'

const Features = () => {
  const features = [
    {
      icon: FaStarOfLife,
      title: 'No-Code Portfolio ',
      description: 'Just fill out your dashboard, your website updates itself.',
    },
    {
      icon: MdPhonelink,
      title: 'Mobile-Ready Design',
      description: 'Your portfolio looks great on every device, automatically.',
    },
    {
      icon: FaPalette,
      title: 'Tailored for Creatives',
      description: 'Built with architecture students and design minds in mind.',
    },
    {
      icon: FaLink,
      title: 'Shareable Custom Link',
      description: 'Get a personal portfolio link you can send to anyone — instantly.',
    },
    {
      icon: FaTools,
      title: 'Easy Edits Anytime',
      description: 'Update your projects, bio, or details whenever inspiration strikes.',
    },
    {
      icon: FaShieldAlt,
      title: 'Secure by Design',
      description: 'Your data is protected with best practices. You stay in control of your content.',
    },
  ]

  return (
    <section className="container mx-auto px-4 py-12 bg-gray-50 dark:bg-black transition-colors duration-200 lg:rounded-3xl shadow-2xl shadow-white/40 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-900 dark:text-white mb-4">
            Why You'll Love It
          </h2>
          <p className="mt-8 text-xl text-gray-600 dark:text-gray-300 font-light">
            Your creative work deserves more than a static PDF. Here's what makes this platform
            stand out
          </p>
        </div>
        <div className="mt-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features
