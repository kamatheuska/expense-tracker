import request from '@/request'

export const createExpense = async (expense, opts) => {
  try {
    return request({
      ...opts,
      method: 'POST',
      body: expense
    })
  } catch (error) {
    console.error(error)
  }
}

export const editExpense = async (expense, opts) => {
  try {
    return request({
      ...opts,
      method: 'POST',
      body: expense
    })
  } catch (error) {
    console.error(error)
  }
}

export const fetchExpenses = async (opts) => {
  return request({ ...opts })
}

export const deleteExpense = async (expense, opts) => {
  console.log('Printing- - - - opts:', opts)
  try {
    return request({
      ...opts,
      body: expense
    })
  } catch (error) {
    console.error(error)
  }
}
