import { Montserrat } from "next/font/google"

import "../assets/css/globals.css"

const montserrat = Montserrat({ subsets: ["latin"] })

export const metadata = {
  title: "Zenboard",
  description: "Collaborative Kanban Board Application",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>{children}</body>
    </html>
  )
}
