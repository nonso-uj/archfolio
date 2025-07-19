import nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'
import { formToEmail } from '@/utilities/helpers'

export async function POST(req: Request) {
  const { values, slug, senderEmail } = await req.json()

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  const htmlContent = formToEmail(values)
  try {
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: senderEmail,
      bcc: 'nonso.homemade@proton.me',
      subject: 'A message from your portfolio website',
      html: htmlContent,
    })
    return NextResponse.json({ success: true })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error('Mail error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

// import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend'

// export async function POST(req: Request) {
//   const body = await req.json()
//   const { values, slug, senderEmail } = body
//   try {
//     const mailerSend = new MailerSend({
//       apiKey: process.env.MAILERSEND_API_KEY!,
//     })

//     const sentFrom = new Sender('nonso.udonne@gmail.com', 'Your portfolio site')

//     const recipients = [new Recipient(senderEmail, slug)]

//     const bcc = [new Recipient('nonso.homemade@proton.me')]

//     const emailParams = new EmailParams()
//       .setFrom(sentFrom)
//       .setTo(recipients)
//       .setBcc(bcc)
//       .setSubject('This is a Subject')
//       .setHtml('<strong>This is the HTML content</strong>')
//       .setText('This is the text content')

//     await mailerSend.email.send(emailParams)
//     return new Response(JSON.stringify({ success: true }))
//   } catch (error: any) {
//     console.log('error===', error)
//     return new Response(JSON.stringify({ success: false, message: error.body.message }))
//   }
// }

// import { NextResponse } from "next/server";
// import * as SibApiV3Sdk from "@getbrevo/brevo";

// export async function POST(req: Request) {
//   const { senderEmail, subject, values } = await req.json();

//   const client = new SibApiV3Sdk.TransactionalEmailsApi();
//   client.setApiKey(
//     SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
//     process.env.BREVO_API_KEY!
//   );

//   const sendData = {
//     sender: { email: "no-reply@yourdomain.com", name: "Your Brand" },
//     to: [{ email: senderEmail }],
//     subject: values.subject,
//     htmlContent: '<strong>This is the HTML content</strong>',
//   };

//   try {
//     const response = await client.sendTransacEmail(sendData);
//     return NextResponse.json({ success: true, response });
//   } catch (err: any) {
//     console.error("Error sending email:", err);
//     return NextResponse.json({ error: err?.response?.body || err }, { status: 500 });
//   }
// }
