'use client'

import React, { useState } from 'react'
import type { FormEvent } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { toast } from 'sonner'

export default function Signup() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)

  const usernameRef = React.useRef<HTMLInputElement>(null)
  const emailRef = React.useRef<HTMLInputElement>(null)
  const passwordRef = React.useRef<HTMLInputElement>(null)
  const confirmPasswordRef = React.useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (
      !usernameRef?.current?.value ||
      !emailRef?.current?.value ||
      !passwordRef?.current?.value ||
      !confirmPasswordRef?.current?.value
    ) {
      toast.error('Please fill all required fields!', { position: 'top-right' })
      return
    }

    if (passwordRef?.current?.value !== confirmPasswordRef?.current?.value) {
      toast.error('Passwords must match!', { position: 'top-right' })
      return
    }

    const testUsername = /[^a-z0-9\-]/g
    if (testUsername.test(usernameRef?.current?.value)) {
      toast.error('Incorrect username format!', { position: 'top-right' })
      return
    }

    const actionRes = await fetch('/api/users/signup', {
      body: JSON.stringify({
        username: usernameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
        confirmPassword: confirmPasswordRef.current.value,
      }),
      headers: {
        'content-type': 'application/json',
      },
      method: 'post',
    })
    const json = await actionRes.json()

    if (actionRes.status === 200) {
      toast.success('Account created successfully!', { position: 'top-right' })
      const redirectTo = searchParams.get('redirect')
      if (redirectTo) {
        router.push(redirectTo)
        return
      } else {
        router.push('/admin')
      }
    } else if (actionRes.status === 400 && json?.errors?.[0]?.message) {
      toast.error(json.errors[0].message, { position: 'top-right' })
    } else {
      toast.error('Something went wrong, please try again.', { position: 'top-right' })
    }

    setLoading(false)
  }

  return (
    <div className="h-screen w-screen lg:grid lg:grid-cols-2 lg:grid-rows-1">
      <div className="hidden lg:block w-full h-full">
        <Image
          src={'/img/signup.webp'}
          width={720}
          height={1071}
          alt="Singup image"
          className="w-full h-full object-cover object-center"
          blurDataURL="/img/blur.png"
        />
      </div>

      <div className={`bg-black w-full h-full flex flex-col justify-center items-center`}>
        <form
          onSubmit={handleSubmit}
          className="w-3/4 lg:w-1/2 flex flex-col justify-start items-start gap-y-5"
        >
          <div className="w-full text-center">
            <h3 className="text-white text-5xl font-bold">Archfolio</h3>
            <h5 className="text-white text-lg">Create an Account</h5>
          </div>
          <div className="w-full flex flex-col">
            <label className="text-white">Username*</label>
            <input
              name="username"
              ref={usernameRef}
              type="text"
              className="w-full text-white h-10 p-2 rounded-lg"
            />
            <small className="text-xs text-yellow-500">
              Only lower case characters and hyphens(-)
            </small>
          </div>
          <div className="w-full flex flex-col">
            <label className="text-white">Email*</label>
            <input
              name="email"
              ref={emailRef}
              type="email"
              className="w-full text-white h-10 p-2 rounded-lg"
            />
          </div>
          <div className="w-full flex flex-col">
            <label className="text-white">Password*</label>
            <input
              name="password"
              ref={passwordRef}
              type="password"
              className="w-full text-white h-10 p-2 rounded-lg"
            />
          </div>
          <div className="w-full flex flex-col">
            <label className="text-white">Confirm password*</label>
            <input
              name="confirmPassword"
              ref={confirmPasswordRef}
              type="password"
              className="w-full text-white h-10 p-2 rounded-lg"
            />
          </div>

          <button type="submit" className="bg-white mx-auto px-5 py-2 text-lg rounded-xl">
            {loading ? (
              /* From Uiverse.io by ashish-yadv */
              <div className="submit-loader">
                <li className="ball"></li>
                <li className="ball"></li>
                <li className="ball"></li>
              </div>
            ) : (
              <span className='text-black'>Sign-up</span>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
