import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/api/webhook",
    "question/:id",
    "/tags",
    "/tags/:id",
    "/profile/:id",
    "/community",
    "/jops",
  ],
  ignoredRoutes: ["/api/webhook", "/api/chatgpt"],
  debug: true,
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
