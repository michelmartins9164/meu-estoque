import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "."

export async function Register()  {
      
    try {
      await createUserWithEmailAndPassword(auth, 'michelmartins9164@gmail.com', '123456')
    } catch (err) {
     console.log( err)
    }
  }
