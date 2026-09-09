import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { ShieldCheck } from "lucide-react";

/**
 * Internet Identity sign-in prompt shown on the hidden /admin route when the
 * visitor is not yet authenticated. Reuses the teal/gold Card + Button
 * patterns from the public site.
 */
export function SignInPrompt() {
  const { login, isLoggingIn, isLoginError, loginError } = useAuth();

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md items-center justify-center px-4 py-16">
      <Card className="admin-surface w-full border-border shadow-sm">
        <CardHeader className="items-center text-center">
          <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <ShieldCheck className="size-6" aria-hidden="true" />
          </div>
          <CardTitle className="font-display text-2xl">Admin sign-in</CardTitle>
          <CardDescription>
            This area is restricted to the site owner. Sign in with Internet
            Identity to manage articles.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <Button
            variant="hero"
            size="lg"
            className="w-full"
            onClick={login}
            disabled={isLoggingIn}
            data-ocid="admin.signin.primary_button"
          >
            {isLoggingIn
              ? "Opening Internet Identity…"
              : "Sign in with Internet Identity"}
          </Button>
          {isLoginError && loginError && (
            <p
              className="text-sm text-destructive"
              role="alert"
              data-ocid="admin.signin.error_state"
            >
              {loginError.message || "Sign-in failed. Please try again."}
            </p>
          )}
          <p className="text-xs text-muted-foreground">
            Only the authorised owner principal can access this dashboard.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default SignInPrompt;
