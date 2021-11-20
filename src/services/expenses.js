import { db } from '@/main'
import { addDoc, collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { EXPENSES_COLLECTION_NAME } from '@/constants'

export const createExpense = async (expense) => {
  try {
    return await addDoc(collection(db, EXPENSES_COLLECTION_NAME), expense)
  } catch (error) {
    console.error(error)
  }
}

export const fetchExpenses = async () => {
  let docs = []
  try {
    const querySnapshot = await getDocs(
      collection(db, EXPENSES_COLLECTION_NAME)
    )
    querySnapshot.forEach((doc) => {
      docs.push(doc.data())
    })

    return docs
  } catch (error) {
    console.error(error)
  }
}

export const deleteExpenses = async () => {
  try {
    doc()
    return await deleteDoc(collection(db, EXPENSES_COLLECTION_NAME))
  } catch (error) {
    console.error(error)
  }
}
