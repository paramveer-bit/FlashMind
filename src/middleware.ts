import { auth } from "@/auth"

export default auth((req) => {
    const path = req.nextUrl.pathname
    if (!req.auth && (path == '/dashboard' || path.startsWith('/view') || path.startsWith('/play'))) {
        console.log("Yessss")
        return Response.redirect(new URL('/', req.nextUrl.origin));
    }
    else if (req.auth && path == '/') {
        return Response.redirect(new URL('/dashboard', req.nextUrl.origin));
    }
})

