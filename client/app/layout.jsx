import './globals.css'

export const metadata = {
  title: 'Vanua Academy',
  description: 'Vanua Academy - Professional spa training and certification programs',
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}


