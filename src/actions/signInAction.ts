'use server'

import { signIn } from '@/auth';

export default async function handleSignIn() {
    await signIn('google');
}