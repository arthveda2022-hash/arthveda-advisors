import {
  type Article,
  type ArticleInput,
  ArticleStatus,
  ExternalBlob,
} from "@/backend";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useBackend } from "@/hooks/useBackend";
import { ArrowLeft, ImagePlus, Loader2, Save, X } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { toast } from "sonner";

interface ArticleEditorProps {
  mode: "create" | "edit";
  article?: Article;
  onCancel: () => void;
  onSaved: () => void;
}

const QUILL_MODULES = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["blockquote", "link"],
    ["clean"],
  ],
};

const QUILL_FORMATS = [
  "header",
  "bold",
  "italic",
  "underline",
  "list",
  "bullet",
  "blockquote",
  "link",
];

/** Rough reading-time estimate in minutes from the plain-text body length. */
function estimateReadingTime(body: string): bigint {
  const text = body.replace(/<[^>]*>/g, " ").trim();
  const words = text ? text.split(/\s+/).length : 0;
  const minutes = Math.max(1, Math.round(words / 200));
  return BigInt(minutes);
}

/** Derive a URL-safe slug from a title. */
function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Create / edit form for an article. Pre-fills every field when editing, and
 * calls `createArticle` or `updateArticle` on save. Cover images are uploaded
 * via the object-storage extension (ExternalBlob) with an upload-progress bar.
 */
export function ArticleEditor({
  mode,
  article,
  onCancel,
  onSaved,
}: ArticleEditorProps) {
  const { actor } = useBackend();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState(article?.title ?? "");
  const [excerpt, setExcerpt] = useState(article?.excerpt ?? "");
  const [body, setBody] = useState(article?.body ?? "");
  const [coverAlt, setCoverAlt] = useState(article?.coverAlt ?? "");
  const [coverImage, setCoverImage] = useState<ExternalBlob | null>(
    article?.coverImage ?? null,
  );
  const [coverPreview, setCoverPreview] = useState<string | null>(
    article?.coverImage?.getDirectURL() ?? null,
  );
  const [coverName, setCoverName] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [authorName, setAuthorName] = useState(article?.authorName ?? "");
  const [authorRole, setAuthorRole] = useState(article?.authorRole ?? "");
  const [tags, setTags] = useState<string[]>(article?.tags ?? []);
  const [tagInput, setTagInput] = useState("");
  const [publishedDate, setPublishedDate] = useState(
    article?.publishedDate ?? new Date().toISOString().slice(0, 10),
  );
  const [published, setPublished] = useState(
    article?.status === ArticleStatus.published,
  );
  const [saving, setSaving] = useState(false);
  const [touched, setTouched] = useState(false);

  const titleError =
    touched && title.trim().length === 0 ? "Title is required." : null;
  const bodyError =
    touched && body.replace(/<[^>]*>/g, "").trim().length === 0
      ? "Body is required."
      : null;

  const canSave = useMemo(
    () =>
      title.trim().length > 0 && body.replace(/<[^>]*>/g, "").trim().length > 0,
    [title, body],
  );

  function addTag(value: string) {
    const trimmed = value.trim();
    if (!trimmed) return;
    if (tags.some((t) => t.toLowerCase() === trimmed.toLowerCase())) {
      setTagInput("");
      return;
    }
    setTags((prev) => [...prev, trimmed]);
    setTagInput("");
  }

  function removeTag(tag: string) {
    setTags((prev) => prev.filter((t) => t !== tag));
  }

  function handleTagKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(tagInput);
    } else if (e.key === "Backspace" && tagInput === "" && tags.length > 0) {
      setTags((prev) => prev.slice(0, -1));
    }
  }

  async function handleCoverSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const bytes = new Uint8Array(await file.arrayBuffer());
    const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) => {
      setUploadProgress(pct);
    });
    setCoverImage(blob);
    setCoverName(file.name);
    setCoverPreview(URL.createObjectURL(file));
    setUploadProgress(0);
  }

  function clearCover() {
    setCoverImage(null);
    setCoverPreview(null);
    setCoverName(null);
    setUploadProgress(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleSave() {
    setTouched(true);
    if (!canSave || !actor) return;
    setSaving(true);
    try {
      const slug = slugify(title);
      const input: ArticleInput = {
        status: published ? ArticleStatus.published : ArticleStatus.draft,
        title: title.trim(),
        readingTime: estimateReadingTime(body),
        body,
        publishedDate,
        slug,
        tags,
        authorName: authorName.trim(),
        authorRole: authorRole.trim(),
        coverImage: coverImage ?? undefined,
        excerpt: excerpt.trim(),
        coverAlt: coverAlt.trim(),
      };

      if (mode === "create") {
        await actor.createArticle(input);
        toast.success(published ? "Article published." : "Draft saved.");
      } else {
        const existingSlug = article?.slug ?? slug;
        const updated = await actor.updateArticle(existingSlug, input);
        if (updated) {
          toast.success(published ? "Article published." : "Changes saved.");
        } else {
          toast.error("Article could not be found on the backend.");
        }
      }
      onSaved();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to save article.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onCancel}
          data-ocid="admin.editor.cancel_button"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to dashboard
        </Button>
        <h1 className="font-display text-2xl tracking-tight text-foreground">
          {mode === "create" ? "New article" : "Edit article"}
        </h1>
      </div>

      <div className="grid gap-6">
        {/* Title + excerpt */}
        <Card className="admin-surface">
          <CardHeader className="border-b">
            <CardTitle className="font-display text-lg">Overview</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-5">
            <div className="grid gap-2">
              <Label htmlFor="article-title">Title</Label>
              <Input
                id="article-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="A clear, search-friendly headline"
                aria-invalid={!!titleError}
                data-ocid="admin.editor.title.input"
              />
              {titleError && (
                <p
                  className="text-sm text-destructive"
                  data-ocid="admin.editor.title.field_error"
                >
                  {titleError}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="article-excerpt">Excerpt</Label>
              <Textarea
                id="article-excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="One or two sentences summarising the article — shown on cards and search results."
                rows={3}
                data-ocid="admin.editor.excerpt.textarea"
              />
            </div>
          </CardContent>
        </Card>

        {/* Body */}
        <Card className="admin-surface">
          <CardHeader className="border-b">
            <CardTitle className="font-display text-lg">Body</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            <div className="editor-content overflow-hidden rounded-md border border-border">
              <ReactQuill
                theme="snow"
                value={body}
                onChange={setBody}
                modules={QUILL_MODULES}
                formats={QUILL_FORMATS}
                placeholder="Write the article body. Use headings, lists, links, and blockquotes to structure it."
              />
            </div>
            {bodyError && (
              <p
                className="text-sm text-destructive"
                data-ocid="admin.editor.body.field_error"
              >
                {bodyError}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Cover image */}
        <Card className="admin-surface">
          <CardHeader className="border-b">
            <CardTitle className="font-display text-lg">Cover image</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="article-cover">Upload from your computer</Label>
              <div className="flex items-center gap-3">
                <input
                  ref={fileInputRef}
                  id="article-cover"
                  type="file"
                  accept="image/*"
                  onChange={handleCoverSelected}
                  className="hidden"
                  data-ocid="admin.editor.cover.upload_button"
                />
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  data-ocid="admin.editor.cover.open_modal_button"
                >
                  <ImagePlus className="size-4" aria-hidden="true" />
                  Choose image
                </Button>
                {coverName && (
                  <span className="truncate text-sm text-muted-foreground">
                    {coverName}
                  </span>
                )}
                {coverImage && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearCover}
                    data-ocid="admin.editor.cover.close_button"
                  >
                    <X className="size-4" aria-hidden="true" />
                    Remove
                  </Button>
                )}
              </div>
              {uploadProgress !== null && uploadProgress < 100 && (
                <div
                  className="grid gap-1"
                  data-ocid="admin.editor.cover.loading_state"
                >
                  <Progress value={uploadProgress} />
                  <span className="text-xs text-muted-foreground">
                    Uploading… {Math.round(uploadProgress)}%
                  </span>
                </div>
              )}
            </div>
            {coverPreview && (
              <div className="overflow-hidden rounded-md border border-border">
                <img
                  src={coverPreview}
                  alt={coverAlt || "Cover preview"}
                  className="aspect-[16/9] w-full object-cover"
                />
              </div>
            )}
            <div className="grid gap-2">
              <Label htmlFor="article-cover-alt">Cover alt text</Label>
              <Input
                id="article-cover-alt"
                value={coverAlt}
                onChange={(e) => setCoverAlt(e.target.value)}
                placeholder="Describe the cover image for accessibility and SEO."
                data-ocid="admin.editor.cover_alt.input"
              />
            </div>
          </CardContent>
        </Card>

        {/* Author + tags + date + status */}
        <Card className="admin-surface">
          <CardHeader className="border-b">
            <CardTitle className="font-display text-lg">Details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="article-author-name">Author name</Label>
                <Input
                  id="article-author-name"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="e.g. Pandhari Burkul"
                  data-ocid="admin.editor.author_name.input"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="article-author-role">Author role</Label>
                <Input
                  id="article-author-role"
                  value={authorRole}
                  onChange={(e) => setAuthorRole(e.target.value)}
                  placeholder="e.g. Founder & Lead Advisor"
                  data-ocid="admin.editor.author_role.input"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="article-tags">Tags</Label>
              <p className="text-xs text-muted-foreground">
                Type a tag and press Enter to add it. New tags are created on
                the fly.
              </p>
              <div className="flex flex-wrap items-center gap-2 rounded-md border border-input bg-transparent px-2 py-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground"
                    data-ocid={`admin.editor.tags.item.${tags.indexOf(tag) + 1}`}
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="text-muted-foreground hover:text-foreground"
                      aria-label={`Remove tag ${tag}`}
                      data-ocid={`admin.editor.tags.close_button.${tags.indexOf(tag) + 1}`}
                    >
                      <X className="size-3" aria-hidden="true" />
                    </button>
                  </span>
                ))}
                <input
                  id="article-tags"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  onBlur={() => addTag(tagInput)}
                  placeholder={tags.length === 0 ? "Add a tag…" : ""}
                  className="flex-1 min-w-[8rem] bg-transparent text-sm outline-none"
                  data-ocid="admin.editor.tags.input"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="article-date">Published date</Label>
                <Input
                  id="article-date"
                  type="date"
                  value={publishedDate}
                  onChange={(e) => setPublishedDate(e.target.value)}
                  data-ocid="admin.editor.published_date.input"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="article-status">Status</Label>
                <div className="flex items-center gap-3 pt-1">
                  <Switch
                    id="article-status"
                    checked={published}
                    onCheckedChange={setPublished}
                    data-ocid="admin.editor.status.switch"
                  />
                  <span
                    className={`status-badge ${
                      published ? "status-published" : "status-draft"
                    }`}
                    data-ocid="admin.editor.status.toggle"
                  >
                    {published ? "Published" : "Draft"}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {published
                      ? "Visible on the public blog."
                      : "Hidden until you publish."}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <Button
            variant="ghost"
            onClick={onCancel}
            disabled={saving}
            data-ocid="admin.editor.cancel_button"
          >
            Cancel
          </Button>
          <Button
            variant="hero"
            onClick={handleSave}
            disabled={saving}
            data-ocid="admin.editor.save_button"
          >
            {saving ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                Saving…
              </>
            ) : (
              <>
                <Save className="size-4" aria-hidden="true" />
                {mode === "create"
                  ? published
                    ? "Publish article"
                    : "Save draft"
                  : "Save changes"}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ArticleEditor;
