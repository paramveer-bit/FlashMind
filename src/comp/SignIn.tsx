'use client'
import handleSignIn from "@/actions/signInAction"

export default function SignIn() {
  return (
    <form
      action={handleSignIn}
    >
      <button type="submit" >Signin with Google</button>
    </form>
  )
} 
