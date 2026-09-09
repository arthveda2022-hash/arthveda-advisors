import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { SignInPrompt } from "@/components/admin/SignInPrompt";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { LogOut } from "lucide-react";

export function AdminPage() {
  const { isAuthed, isAdmin, isAdminLoading, logout } = useAuth();

  if (!isAuthed) {
    return <SignInPrompt />;
  }

  if (isAuthed && !isAdmin && !isAdminLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4 py-16">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="font-display text-2xl">
              Access denied
            </CardTitle>
            <CardDescription>
              You are signed in, but this area is restricted to the site owner.
              Sign out and try again with an authorized identity.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button
              variant="outline"
              onClick={logout}
              data-ocid="admin.access_denied.signout_button"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-12">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl tracking-tight">Admin</h1>
          <p className="text-sm text-muted-foreground">
            Manage articles, drafts, and published content.
          </p>
        </div>
        <Button
          variant="outline"
          onClick={logout}
          data-ocid="admin.signout_button"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </Button>
      </div>
      <AdminDashboard />
    </div>
  );
}
