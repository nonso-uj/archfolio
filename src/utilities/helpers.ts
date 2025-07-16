// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const formatDateToMonthYear = (date: any) => {
  if (!(date instanceof Date)) {
    throw new Error('Invalid Date')
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
  }).format(date)
}

export const toTitleCaseArray = (arr: string[]) => {
  return arr
    .map((str) =>
      str
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '),
    )
    .join(', ')
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const formToEmail = (values: any) => {
  const { name='', email='', subject='', message='' } = values

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Template</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
      color: #333;
    }

    .container {
      width: 100%;
      padding: 20px;
      background-color: #f4f4f4;
    }

    .email-content {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }

    h1 {
      color: #2c3e50;
      font-size: 24px;
      text-align: center;
      margin-bottom: 20px;
    }

    p {
      line-height: 1.6;
      font-size: 16px;
    }

    .button {
      display: inline-block;
      background-color: #3498db;
      color: #ffffff;
      padding: 12px 20px;
      text-align: center;
      text-decoration: none;
      font-size: 16px;
      border-radius: 5px;
      margin: 20px 0;
    }

    .footer {
      font-size: 14px;
      text-align: center;
      color: #777;
      margin-top: 20px;
    }

    @media (max-width: 600px) {
      .email-content {
        padding: 20px;
      }
      h1 {
        font-size: 20px;
      }
      p {
        font-size: 14px;
      }
    }
  </style>
</head>
<body>

  <div class="container">
    <div class="email-content">
      <h1>New message for you</h1>
      <p>Hello User,</p>
      <p>Another message for you from your website:</p>
      <ul>
        <li>Name: ${name}</li>
        <li>Email: ${email}</li>
        <li>Subject: ${subject}</li>
        <li>Message: ${message}</li>
      </ul>
      <p>If you have any questions, feel free to contact our support team at any time.</p>
      
      <p>Best regards,</p>
      <p>Nonso</p>
    </div>
  </div>

</body>
</html>
`
}
