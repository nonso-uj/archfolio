'use client'

import { JSX, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { motion } from 'motion/react'
import { FaLocationDot, FaXTwitter } from 'react-icons/fa6'
import {
  FaBehance,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPaperPlane,
  FaPhone,
  FaPinterest,
  FaRedditAlien,
  FaTiktok,
  FaYoutube,
} from 'react-icons/fa'
import { IoMdMail } from 'react-icons/io'
import { MagneticFramer } from './framer'
import { toast } from 'sonner'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ABOUT_PLACEHOLDER, CONTACT_DUMMY, EXPERIENCE_DUMMY } from '@/utilities/constants'

type SocialPlatform =
  | 'instagram'
  | 'linkedin'
  | 'pinterest'
  | 'behance'
  | 'facebook'
  | 'x'
  | 'youtube'
  | 'tiktok'
  | 'reddit'

const SOCIAL_ICONS: Record<SocialPlatform, JSX.Element> = {
  instagram: <FaInstagram size={30} className="hover:text-white" />,
  linkedin: <FaLinkedinIn size={30} className="hover:text-white" />,
  pinterest: <FaPinterest size={30} className="hover:text-white" />,
  behance: <FaBehance size={30} className="hover:text-white" />,
  facebook: <FaFacebookF size={30} className="hover:text-white" />,
  x: <FaXTwitter size={30} className="hover:text-white" />,
  youtube: <FaYoutube size={30} className="hover:text-white" />,
  tiktok: <FaTiktok size={30} className="hover:text-white" />,
  reddit: <FaRedditAlien size={30} className="hover:text-white" />,
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Contact = ({ details, slug }: { details: any; slug: string }) => {
  const [loading, setLoading] = useState(false)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const {
    address,
    phoneNumber = ABOUT_PLACEHOLDER,
    email = EXPERIENCE_DUMMY,
    socials = CONTACT_DUMMY,
  }: any = details

  const { values, handleSubmit, handleChange, errors, touched } = useFormik({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      subject: Yup.string().required('Required'),
      message: Yup.string().required('Required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      setLoading(true)
      try {
        const response = await fetch('/api/send-email', {
          method: 'POST',
          body: JSON.stringify({ values, slug, senderEmail: email }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if (!response.ok) {
          throw new Error(`Error: Something went wrong, check your connection and try again`)
        }
        toast.success('Message sent successfully!', { position: 'top-right' })
        resetForm()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        toast.error(error.message, { position: 'top-right' })
        console.error(error.message)
        // alert(JSON.stringify(values, null, 2))
      } finally {
        setLoading(false)
      }
    },
  })
  return (
    <div className="page-header w-full h-full top-0 left-0">
      <div className="w-full grow flex flex-col lg:flex-row items-center justify-center mb-10 lg:mb-0">
        <div className="flex flex-col items-start justify-between gap-y-8 w-full lg:w-1/3 text-neutral-400 pl-5 lg:pl-20 py-20 z-20">
          <p className="text-xl">Get In Touch</p>
          <p className="text-7xl font-semibold">
            Drop Us <br />A Line
          </p>

          <div className="flex flex-col items-start justify-start gap-y-5 text-base w-full">
            <div className="flex flex-row items-end justify-start gap-x-3 pr-16 ">
              <FaLocationDot />
              <p className="">{address}</p>
            </div>
            <div className="flex flex-row items-end justify-start gap-x-3">
              <FaPhone />
              <a
                href="tel:+2344567890000"
                className="transition-all hover:underline hover:decoration-neutral-400 hover:decoration-dotted hover:underline-offset-4"
              >
                {phoneNumber}
              </a>
            </div>
            <div className="flex flex-row items-end justify-start gap-x-3">
              <IoMdMail />
              <a
                href="mailto:company@email.com"
                className="transition-all hover:underline hover:decoration-neutral-400 hover:decoration-dotted hover:underline-offset-4"
              >
                {email}
              </a>
            </div>
          </div>

          <div className="w-full space-y-5">
            <p className="text-xl font-semibold">Follow:</p>

            <div className="lg:w-5/6 flex flex-row items-end justify-start flex-nowrap gap-x-5">
              {socials.map((item: { platform: SocialPlatform; link: string }, i: number) => (
                <MagneticFramer key={i}>
                  <a href={item.link} target="_blank">
                    {SOCIAL_ICONS[item.platform]}
                  </a>
                </MagneticFramer>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-y-8 w-full lg:w-2/3 text-neutral-400 px-3 lg:px-10 z-20">
          <div className="w-full flex flex-col md:flex-row gap-x-0 md:gap-x-3 items-end justify-between">
            <div className="grid w-full lg:max-w-sm items-center gap-y-5">
              <Label htmlFor="name" className="text-lg font-semibold">
                Name *
              </Label>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="Your name"
                className="bg-transparent"
                value={values.name}
                onChange={handleChange}
              />
              <div className="font_semibold text-red-700 text-sm">
                {touched.name && errors.name ? errors.name : ' '}
              </div>
            </div>
            <div className="grid w-full lg:max-w-sm items-center gap-y-5">
              <Label htmlFor="email" className="text-lg font-semibold">
                Email address *
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Your email address"
                className="bg-transparent"
                value={values.email}
                onChange={handleChange}
              />
              <div className="font_semibold text-red-700 text-sm">
                {touched.email && errors.email ? errors.email : ' '}
              </div>
            </div>
          </div>

          <div className="grid w-full items-center gap-y-5">
            <Label htmlFor="subject" className="text-lg font-semibold">
              Subject *
            </Label>
            <Input
              type="text"
              name="subject"
              id="subject"
              placeholder="Subject of message"
              className="bg-transparent w-full"
              value={values.subject}
              onChange={handleChange}
            />
            <div className="font_semibold text-red-700 text-sm">
              {touched.subject && errors.subject ? errors.subject : ' '}
            </div>
          </div>

          <div className="w-full">
            <div className="grid w-full gap-1.5">
              <Label htmlFor="message" className="text-lg font-semibold">
                Message *
              </Label>
              <Textarea
                name="message"
                placeholder="Type your message here."
                id="message"
                className="bg-transparent w-full"
                value={values.message}
                onChange={handleChange}
              />
              <div className="font_semibold text-red-700 text-sm">
                {touched.message && errors.message ? errors.message : ' '}
              </div>
            </div>
          </div>

          <div>
            <i className="font-semibold">Fields marked with an asterisk (*) are required!</i>
          </div>

          <div className="w-full flex flex-row items-center justify-center lg:justify-start">
            <MagneticFramer>
              <motion.button
                className="flex gap-x-3 bg-transparent text-neutral-400 rounded-full px-10 py-3 w-fit h-fit font_regular font-semibold text-lg border-2 border-neutral-400 hover:text-white hover:border-white"
                whileHover={{ scale: 1.2, transition: { type: 'spring', bounce: 0.3 } }}
                onClick={() => handleSubmit()}
                disabled={loading}
              >
                {loading ? (
                  /* From Uiverse.io by ashish-yadv */
                  <div className="submit-loader">
                    <li className="ball"></li>
                    <li className="ball"></li>
                    <li className="ball"></li>
                  </div>
                ) : (
                  <>
                    Send message <FaPaperPlane className="" />
                  </>
                )}
              </motion.button>
            </MagneticFramer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
