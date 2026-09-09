import { Layout } from "@/components/Layout";
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
  useEffect(() => {
    const unsubscribe = router.subscribe("onLoad", ({ toLocation }) => {
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

const routeTree = rootRoute.addChildren([indexRoute, blogRoute, articleRoute]);

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
