'use client'

import React, { useState } from 'react'
import { useAuth } from '@payloadcms/ui'
import type { User } from '@/payload-types.ts'

import './index.scss'

const baseClass = 'before-dashboard'

const BeforeDashboard: React.FC = () => {
  const base = process.env.NEXT_PUBLIC_BASE_URL
  if (!base) throw new Error('Base URL not configured')
  const { user = { username: '' } } = useAuth<User>()
  const [copyText, setCopyText] = useState(false)

  return (
    <div className={baseClass}>
      <h4>Welcome to your dashboard!</h4>
      Here&apos;s what to do next:
      <ul className={`${baseClass}__instructions`}>
        <li>{'Edit the pages of your website at Home page, About page and Contact page'}</li>
        <li>{'Add your projects at "Works"'}</li>
        <li>
          <a href={`/${user?.username}`} target="_blank">
            Visit your website ↗
          </a>
          {' to see the results.'}
        </li>
        <li>
          <span
            style={{ textDecoration: 'underline', cursor: 'pointer' }}
            onClick={() => {
              navigator.clipboard.writeText(`${base}/${user?.username}`)
              setCopyText(true)
            }}
          >
            You can click here
          </span>{' '}
          to copy your link and share. {copyText && 'copied!'}
        </li>
        <li>Don't forget to update your full name in the Users settings</li>
        <li>Keep iterating and exploring</li>
      </ul>
    </div>
  )
}

export default BeforeDashboard
