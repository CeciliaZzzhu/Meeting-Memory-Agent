"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Calendar, FileText, Home, Mail, Settings, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Navbar() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/follow-up", label: "Follow-up", icon: Calendar },
    { href: "/follow-up/email", label: "Email", icon: Mail },
    { href: "/automation", label: "Automation", icon: Sparkles, highlight: true },
    { href: "/settings", label: "Settings", icon: Settings },
  ]

  return (
    <div className="fixed top-0 left-0 right-0 z-10 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-slate-900 dark:text-white">
              <FileText className="h-6 w-6 text-violet-600" />
              <span>MeetingMind</span>
            </Link>
          </div>

          <nav className="flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "flex items-center gap-1 px-3",
                    pathname === item.href
                      ? "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white"
                      : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white",
                    item.highlight && "text-violet-600 dark:text-violet-400",
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                  {item.highlight && <span className="ml-1 flex h-2 w-2 rounded-full bg-violet-600"></span>}
                </Button>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}
