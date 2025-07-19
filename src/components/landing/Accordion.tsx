'use client'

import { useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'

interface AccordionItemProps {
  title: string
  content: string
  isOpen: boolean
  toggleOpen: () => void
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, content, isOpen, toggleOpen }) => {
  return (
    <div className="mb-4">
      <div
        className={`w-full rounded-lg overflow-hidden ${
          isOpen ? 'bg-black dark:bg-gray-900' : 'bg-black dark:bg-gray-900'
        }`}
      >
        <button
          className="w-full text-left p-4 flex justify-between items-center"
          onClick={toggleOpen}
        >
          <span className="text-xl font-semibold text-white dark:text-white">{title}</span>
          <span
            className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          >
            <FaChevronDown className="text-2xl text-white" />
          </span>
        </button>
        <div
          className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
            isOpen ? 'max-h-[1000px]' : 'max-h-0'
          }`}
        >
          <div className="p-4">
            <p className="text-white font-light">{content}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const defaultAccordionItems = [
  {
    title: 'Step 1: Sign Up',
    content: 'Create a free account in seconds, no design or coding skills required.',
  },
  {
    title: 'Step 2: Add Your Work',
    content:
      'Fill in your bio, upload your projects, list your education, and more, all from a simple dashboard.',
  },
  {
    title: 'Step 3: Share Your Portfolio',
    content:
      'Get a unique link to your personalized portfolio website. Update it anytime, impress every time.',
  },
]

interface AccordionProps {
  items?: { title: string; content: string }[]
}

const Accordion: React.FC<AccordionProps> = ({ items = defaultAccordionItems }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="w-[90%]">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content={item.content}
          isOpen={openIndex === index}
          toggleOpen={() => toggleItem(index)}
        />
      ))}
    </div>
  )
}

export default Accordion
