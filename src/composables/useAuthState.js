import { ref, provide, inject, onMounted, watch } from 'vue'
import { useAuthStore } from '../stores/auth'
import { getFirestore, doc, getDoc } from 'firebase/firestore'

const authStateSymbol = Symbol()

export function provideAuthState() {
  const authStore = useAuthStore()
  const isAuthenticated = ref(false)
  const user = ref(null)
  const profilePicture = ref(null)
  const db = getFirestore()

  const checkAuthState = async () => {
    isAuthenticated.value = authStore.isAuthenticated
    user.value = authStore.user

    if (isAuthenticated.value && user.value?.uid) {
      try {
        const userDoc = doc(db, 'users', user.value.uid)
        const userSnapshot = await getDoc(userDoc)

        if (userSnapshot.exists()) {
          profilePicture.value = userSnapshot.data().profilePicture || null
        } else {
          console.log('User document not found!')
          profilePicture.value = null
        }
      } catch (error) {
        console.error('Error fetching profile picture:', error)
        profilePicture.value = null
      }
    } else {
      profilePicture.value = null
    }
  }

  onMounted(checkAuthState)
  watch(() => authStore.user, checkAuthState)

  const authState = {
    isAuthenticated,
    user,
    profilePicture,
    checkAuthState
  }

  provide(authStateSymbol, authState)

  return authState
}

export function useAuthState() {
  const authState = inject(authStateSymbol)
  if (!authState) {
    throw new Error('Auth state not provided')
  }
  return authState
}
