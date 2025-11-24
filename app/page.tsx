"use client"

import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20 md:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <div className="mb-6 inline-block">
                <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  Smart Expense Splitting
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
                Split Group Expenses{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Fairly</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground mb-8 text-balance">
                SplitSmart makes it easy to split bills with friends, roommates, and travel groups. Track who paid what
                and settle up instantly.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/dashboard"
                  className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Go to Dashboard
                </Link>
                <button className="px-8 py-3 border border-border rounded-lg font-medium text-foreground hover:bg-muted transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-card border-b border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Choose SplitSmart?</h2>
              <p className="text-muted-foreground text-lg">Everything you need to manage group expenses</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Easy Splitting",
                  description: "Split expenses equally, by percentage, or custom amounts",
                  icon: "💰",
                },
                {
                  title: "Track Balances",
                  description: "Always know who owes whom and how much",
                  icon: "📊",
                },
                {
                  title: "Organize Groups",
                  description: "Create separate groups for roommates, trips, or events",
                  icon: "👥",
                },
              ].map((feature, idx) => (
                <div key={idx} className="bg-background border border-border rounded-lg p-8 text-center">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/5">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to simplify expense splitting?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Start tracking and splitting expenses with your group today.
            </p>
            <Link
              href="/dashboard"
              className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Get Started Now
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
