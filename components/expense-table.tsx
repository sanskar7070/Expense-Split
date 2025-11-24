"use client"

import type { Expense, Group } from "@/lib/types"

interface ExpenseTableProps {
  expenses: Expense[]
  group: Group
}

export function ExpenseTable({ expenses, group }: ExpenseTableProps) {
  const getMemberName = (memberId: string): string => {
    return group.members.find((m) => m.id === memberId)?.name || "Unknown"
  }

  return (
    <div className="overflow-x-auto border border-border rounded-lg">
      <table className="w-full">
        <thead className="bg-muted border-b border-border">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Description</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Amount</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Paid By</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Date</th>
          </tr>
        </thead>
        <tbody>
          {expenses.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-4 py-8 text-center text-sm text-muted-foreground">
                No expenses yet. Add one to get started!
              </td>
            </tr>
          ) : (
            expenses.map((expense) => (
              <tr key={expense.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                <td className="px-4 py-3 text-sm text-foreground">{expense.description}</td>
                <td className="px-4 py-3 text-sm font-medium text-foreground">${expense.amount.toFixed(2)}</td>
                <td className="px-4 py-3 text-sm text-foreground">{getMemberName(expense.paidBy)}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  {new Date(expense.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "2-digit",
                  })}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
