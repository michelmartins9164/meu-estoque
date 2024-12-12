import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../api/firebase'
import { useQuery } from '@tanstack/react-query'

export function useAllOutfitsQuery() {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const outfitsRef = collection(db, 'users')
      const querySnapshot = await getDocs(outfitsRef)

      return querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }))
    }
  })
}
