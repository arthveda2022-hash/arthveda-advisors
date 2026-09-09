import type { Article } from "@/backend";
import { ArticleStatus } from "@/backend";
import { ArticleEditor } from "@/components/admin/ArticleEditor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useBackend } from "@/hooks/useBackend";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

/**
 * Admin dashboard — lists every article (published + drafts) from the
 * backend, with create / edit / delete affordances. Switches to the
 * `ArticleEditor` when creating or editing.
 */
export function AdminDashboard() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<
    { mode: "create" } | { mode: "edit"; article: Article } | null
  >(null);
  const [deleting, setDeleting] = useState<Article | null>(null);
  const [deleteBusy, setDeleteBusy] = useState(false);

  const articlesQuery = useQuery<Article[]>({
    queryKey: ["admin", "articles"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listAllArticles();
    },
    enabled: !!actor,
  });

  if (editing) {
    return (
      <ArticleEditor
        mode={editing.mode}
        article={editing.mode === "edit" ? editing.article : undefined}
        onCancel={() => setEditing(null)}
        onSaved={() => {
          setEditing(null);
          void queryClient.invalidateQueries({
            queryKey: ["admin", "articles"],
          });
          void queryClient.invalidateQueries({ queryKey: ["articles"] });
          void queryClient.invalidateQueries({ queryKey: ["tags"] });
        }}
      />
    );
  }

  const articles = articlesQuery.data ?? [];

  async function confirmDelete() {
    if (!actor || !deleting) return;
    setDeleteBusy(true);
    try {
      const removed = await actor.deleteArticle(deleting.slug);
      if (removed) {
        toast.success(`Deleted “${deleting.title}”`);
        await queryClient.invalidateQueries({
          queryKey: ["admin", "articles"],
        });
        await queryClient.invalidateQueries({ queryKey: ["articles"] });
        await queryClient.invalidateQueries({ queryKey: ["tags"] });
      } else {
        toast.error("Article could not be found on the backend.");
      }
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to delete article.",
      );
    } finally {
      setDeleteBusy(false);
      setDeleting(null);
    }
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl tracking-tight text-foreground">
            Articles
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Create, edit, and publish articles. Drafts stay hidden from the
            public blog until you publish them.
          </p>
        </div>
        <Button
          variant="hero"
          onClick={() => setEditing({ mode: "create" })}
          data-ocid="admin.dashboard.new_article.primary_button"
        >
          <Plus className="size-4" aria-hidden="true" />
          New article
        </Button>
      </div>

      <Card className="admin-surface">
        <CardHeader className="border-b">
          <CardTitle className="font-display text-lg">All articles</CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          {articlesQuery.isLoading && (
            <div
              className="flex items-center justify-center gap-2 py-16 text-sm text-muted-foreground"
              data-ocid="admin.dashboard.loading_state"
            >
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              Loading articles…
            </div>
          )}
          {articlesQuery.isError && (
            <div
              className="py-16 text-center text-sm text-destructive"
              data-ocid="admin.dashboard.error_state"
            >
              Failed to load articles. Please refresh the page.
            </div>
          )}
          {!articlesQuery.isLoading &&
            !articlesQuery.isError &&
            articles.length === 0 && (
              <div
                className="flex flex-col items-center justify-center gap-3 py-16 text-center"
                data-ocid="admin.dashboard.empty_state"
              >
                <p className="text-sm text-muted-foreground">
                  No articles yet. Create your first article to get started.
                </p>
                <Button
                  variant="outlineHero"
                  onClick={() => setEditing({ mode: "create" })}
                  data-ocid="admin.dashboard.empty_state.primary_button"
                >
                  <Plus className="size-4" aria-hidden="true" />
                  New article
                </Button>
              </div>
            )}
          {articles.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40">
                  <TableHead className="pl-6">Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead>Published</TableHead>
                  <TableHead className="pr-6 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {articles.map((article, index) => (
                  <TableRow
                    key={article.slug}
                    data-ocid={`admin.dashboard.row.item.${index + 1}`}
                  >
                    <TableCell className="pl-6 max-w-xs">
                      <div className="font-medium text-foreground truncate">
                        {article.title}
                      </div>
                      <div className="text-xs text-muted-foreground truncate">
                        /{article.slug}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`status-badge ${
                          article.status === ArticleStatus.published
                            ? "status-published"
                            : "status-draft"
                        }`}
                        data-ocid={`admin.dashboard.status.${index + 1}`}
                      >
                        {article.status === ArticleStatus.published
                          ? "Published"
                          : "Draft"}
                      </span>
                    </TableCell>
                    <TableCell className="max-w-[12rem]">
                      {article.tags.length === 0 ? (
                        <span className="text-xs text-muted-foreground">—</span>
                      ) : (
                        <div className="flex flex-wrap gap-1">
                          {article.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="rounded-md bg-secondary px-1.5 py-0.5 text-xs text-secondary-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                          {article.tags.length > 3 && (
                            <span className="text-xs text-muted-foreground">
                              +{article.tags.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {article.publishedDate || "—"}
                    </TableCell>
                    <TableCell className="pr-6 text-right">
                      <div className="inline-flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={`Edit ${article.title}`}
                          onClick={() => setEditing({ mode: "edit", article })}
                          data-ocid={`admin.dashboard.edit_button.${index + 1}`}
                        >
                          <Pencil className="size-4" aria-hidden="true" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={`Delete ${article.title}`}
                          onClick={() => setDeleting(article)}
                          data-ocid={`admin.dashboard.delete_button.${index + 1}`}
                        >
                          <Trash2
                            className="size-4 text-destructive"
                            aria-hidden="true"
                          />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog
        open={!!deleting}
        onOpenChange={(open) => !open && setDeleting(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete article?</DialogTitle>
            <DialogDescription>
              {deleting
                ? `“${deleting.title}” will be permanently removed. This action cannot be undone.`
                : ""}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setDeleting(null)}
              disabled={deleteBusy}
              data-ocid="admin.delete.cancel_button"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={deleteBusy}
              data-ocid="admin.delete.confirm_button"
            >
              {deleteBusy ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                  Deleting…
                </>
              ) : (
                <>
                  <Trash2 className="size-4" aria-hidden="true" />
                  Delete article
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="mt-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setEditing({ mode: "create" })}
          data-ocid="admin.dashboard.create_link"
        >
          <ArrowLeft className="size-4 rotate-180" aria-hidden="true" />
          Create new article
        </Button>
      </div>
    </div>
  );
}

export default AdminDashboard;
