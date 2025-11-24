"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ExpenseTable } from "@/components/expense-table"
import { AddExpenseModal } from "@/components/add-expense-modal"
import { getGroupById, calculateBalances } from "@/lib/mock-data"

export default function GroupPage() {
  const params = useParams()
  const groupId = params.id as string
  const group = getGroupById(groupId)
  const [isModalOpen, setIsModalOpen] = useState(false)

  if (!group) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">Group not found</h1>
            <Link href="/dashboard" className="text-primary hover:underline">
              Back to Dashboard
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const balances = calculateBalances(group)

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <Link href="/dashboard" className="text-primary hover:underline text-sm mb-4 inline-block">
              ← Back to Dashboard
            </Link>
            <div className="flex items-start justify-between mb-2">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">{group.name}</h1>
                {group.description && <p className="text-muted-foreground mt-1">{group.description}</p>}
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors whitespace-nowrap"
              >
                Add Expense
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Members */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Members</h2>
                <div className="space-y-3">
                  {group.members.map((member) => {
                    const balance = balances.find((b) => b.memberId === member.id)?.balance || 0
                    return (
                      <div key={member.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                            {member.name.charAt(0)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-foreground truncate">{member.name}</p>
                            <p className="text-xs text-muted-foreground truncate">{member.email}</p>
                          </div>
                        </div>
                        <div
                          className={`text-sm font-semibold whitespace-nowrap ml-2 ${
                            balance > 0 ? "text-success" : balance < 0 ? "text-destructive" : "text-muted-foreground"
                          }`}
                        >
                          {balance > 0 ? "+" : ""}${balance.toFixed(2)}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="lg:col-span-2">
              <div className="bg-card border border-border rounded-lg p-6 mb-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Summary</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Expenses</p>
                    <p className="text-2xl font-bold text-foreground">
                      ${group.expenses.reduce((sum, e) => sum + e.amount, 0).toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Number of Expenses</p>
                    <p className="text-2xl font-bold text-foreground">{group.expenses.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Per-Person Balance</h2>
                <div className="space-y-2">
                  {balances.map((balance) => {
                    const member = group.members.find((m) => m.id === balance.memberId)
                    return (
                      <div key={balance.memberId} className="flex items-center justify-between p-2">
                        <span className="text-foreground">{member?.name}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 h-2 bg-border rounded-full overflow-hidden">
                            <div
                              className={`h-full ${
                                balance.balance > 0 ? "bg-success" : balance.balance < 0 ? "bg-destructive" : "bg-muted"
                              }`}
                              style={{
                                width: `${Math.min((Math.abs(balance.balance) / 50) * 100, 100)}%`,
                              }}
                            />
                          </div>
                          <span className="text-sm font-medium text-foreground w-16 text-right">
                            {balance.balance > 0 ? "+" : ""}${balance.balance.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Expenses Table */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Expenses</h2>
            <ExpenseTable expenses={group.expenses} group={group} />
          </div>
        </div>
      </main>

      <AddExpenseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} group={group} />

      <Footer />
    </div>
  )
}
