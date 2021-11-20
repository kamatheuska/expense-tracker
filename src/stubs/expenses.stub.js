export const expensesStub = [
  {
    id: '10001',
    date: '2021-10-27',
    description: 'Medicina X',
    cost: 25000
  },
  {
    id: '10002',
    date: '2021-10-12',
    description: 'Transporte Empleada',
    cost: 50000
  },
  {
    id: '10003',
    date: '2021-11-09',
    description: 'Ultimo pago limpieza habitacion',
    cost: 22500
  },
  {
    id: '10004',
    date: '2021-10-20',
    description: 'Almuerzo dia 21/10',
    cost: 7500
  }
]

export const addExpenseMock = async (args) => {
  expensesStub.push(args.body)

  return Promise.resolve()
}

export const editExpenseMock = async ({ body }) => {
  const expenseIndex = expensesStub.findIndex((stub) => stub.id === body.id)

  expensesStub[expenseIndex] = body

  return Promise.resolve()
}

export const deleteExpenseMock = ({ body }) => {
  const start = expensesStub.findIndex((stub) => stub.id === body.id)
  expensesStub.splice(start, 1)

  return Promise.resolve()
}
