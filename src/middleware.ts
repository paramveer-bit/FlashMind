import { auth } from "@/auth"

export default auth((req) => {
    try {
        const path = req.nextUrl.pathname
        console.log(req.auth)
        if (!req.auth && (path == '/dashboard' || path.startsWith('/view') || path.startsWith('/play'))) {
            console.log("Yessss")
            return Response.redirect(new URL('/', req.nextUrl.origin));
        } else if (req.auth && path == '/') {
            return Response.redirect(new URL('/dashboard', req.nextUrl.origin));
        }
        // Handle favicon.ico request
        if (path === '/favicon.ico') {
            return new Response(null, { status: 204 }); // No Content
        }
    } catch (error) {
        console.error("Middleware error:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
})