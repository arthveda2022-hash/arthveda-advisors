import { Layout } from "@/components/Layout";
import { AdminPage } from "@/pages/AdminPage";
import { ArticlePage } from "@/pages/ArticlePage";
import { BlogPage } from "@/pages/BlogPage";
import { HomePage } from "@/pages/HomePage";
import {
  Outlet,
  ScrollRestoration,
  createRootRoute,
  createRoute,
  createRouter,
  useRouter,
} from "@tanstack/react-router";
import { useEffect } from "react";

const rootRoute = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const router = useRouter();
  // Scroll to top on route change (TanStack Router does not do this by default
  // for client-side navigations). Anchor-based in-page scroll is handled in
  // Header.tsx and the homepage sections.
  useEffect(() => {
    const unsubscribe = router.subscribe("onLoad", ({ toLocation }) => {
      // Only scroll to top when navigating to a new pathname without a hash.
      if (!toLocation.hash && typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "auto" });
      }
    });
    return unsubscribe;
  }, [router]);

  return (
    <Layout>
      <Outlet />
      <ScrollRestoration />
    </Layout>
  );
}

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const blogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog",
  validateSearch: (search: Record<string, unknown>): { tag?: string } => ({
    tag: typeof search.tag === "string" ? search.tag : undefined,
  }),
  component: BlogPage,
});

const articleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog/$slug",
  component: ArticlePage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  blogRoute,
  articleRoute,
  adminRoute,
]);

export const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  scrollRestoration: true,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <Outlet />;
}
