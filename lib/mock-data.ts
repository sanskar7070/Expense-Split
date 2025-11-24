import type { Group, Member, Expense, DashboardData, ActivityItem } from "./types"

const members: { [key: string]: Member } = {
  user1: { id: "user1", name: "You", email: "you@example.com" },
  alice: { id: "alice", name: "Alice Johnson", email: "alice@example.com" },
  bob: { id: "bob", name: "Bob Smith", email: "bob@example.com" },
  charlie: { id: "charlie", name: "Charlie Brown", email: "charlie@example.com" },
  diana: { id: "diana", name: "Diana Lee", email: "diana@example.com" },
}

const expenses: { [key: string]: Expense[] } = {
  group1: [
    {
      id: "exp1",
      description: "Dinner at Italian restaurant",
      amount: 120,
      paidBy: "user1",
      groupId: "group1",
      date: "2024-11-20",
      splits: [
        { memberId: "user1", amount: 40 },
        { memberId: "alice", amount: 40 },
        { memberId: "bob", amount: 40 },
      ],
    },
    {
      id: "exp2",
      description: "Groceries for party",
      amount: 85,
      paidBy: "alice",
      groupId: "group1",
      date: "2024-11-19",
      splits: [
        { memberId: "user1", amount: 28.33 },
        { memberId: "alice", amount: 28.34 },
        { memberId: "bob", amount: 28.33 },
      ],
    },
  ],
  group2: [
    {
      id: "exp3",
      description: "Airbnb for weekend trip",
      amount: 480,
      paidBy: "user1",
      groupId: "group2",
      date: "2024-11-18",
      splits: [
        { memberId: "user1", amount: 120 },
        { memberId: "charlie", amount: 120 },
        { memberId: "diana", amount: 120 },
        { memberId: "bob", amount: 120 },
      ],
    },
    {
      id: "exp4",
      description: "Gas and tolls",
      amount: 60,
      paidBy: "charlie",
      groupId: "group2",
      date: "2024-11-17",
      splits: [
        { memberId: "user1", amount: 15 },
        { memberId: "charlie", amount: 15 },
        { memberId: "diana", amount: 15 },
        { memberId: "bob", amount: 15 },
      ],
    },
  ],
}

export const mockGroups: Group[] = [
  {
    id: "group1",
    name: "Apartment Roommates",
    description: "Shared apartment expenses",
    members: [members["user1"], members["alice"], members["bob"]],
    expenses: expenses["group1"],
    createdAt: "2024-09-15",
  },
  {
    id: "group2",
    name: "Weekend Trip 2024",
    description: "Lake house getaway",
    members: [members["user1"], members["bob"], members["charlie"], members["diana"]],
    expenses: expenses["group2"],
    createdAt: "2024-11-01",
  },
]

export function getMockDashboardData(): DashboardData {
  let totalOwed = 0
  let totalOwes = 0

  const recentActivity: ActivityItem[] = []

  mockGroups.forEach((group) => {
    group.expenses.forEach((expense) => {
      const userSplit = expense.splits.find((s) => s.memberId === "user1")
      if (!userSplit) return

      const activityItem: ActivityItem = {
        id: expense.id,
        type: "expense",
        description: expense.description,
        amount: userSplit.amount,
        timestamp: expense.date,
        groupName: group.name,
        groupId: group.id,
      }
      recentActivity.push(activityItem)

      if (expense.paidBy === "user1") {
        totalOwed += userSplit.amount
      } else {
        totalOwes += userSplit.amount
      }
    })
  })

  recentActivity.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

  return {
    totalBalance: totalOwed - totalOwes,
    youOwe: totalOwes,
    youAreOwed: totalOwed,
    groups: mockGroups,
    recentActivity: recentActivity.slice(0, 6),
  }
}

export function getGroupById(groupId: string): Group | undefined {
  return mockGroups.find((g) => g.id === groupId)
}

export function calculateBalances(group: Group): { memberId: string; balance: number }[] {
  const balances: { [key: string]: number } = {}

  group.members.forEach((member) => {
    balances[member.id] = 0
  })

  group.expenses.forEach((expense) => {
    balances[expense.paidBy] = (balances[expense.paidBy] || 0) + expense.amount

    expense.splits.forEach((split) => {
      balances[split.memberId] = (balances[split.memberId] || 0) - split.amount
    })
  })

  return Object.entries(balances).map(([memberId, balance]) => ({
    memberId,
    balance,
  }))
}
