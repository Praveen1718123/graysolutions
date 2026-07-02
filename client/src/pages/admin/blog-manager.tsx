import { Suspense, lazy, useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { type Post } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, ArrowLeft, ExternalLink, ImagePlus, Loader2 } from "lucide-react";

const RichEditor = lazy(() => import("./rich-editor"));

const CATEGORIES = ["General", "Brand & Identity", "Digital Marketing", "Product & Software", "AI & Automation"];

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function estimateReadTime(html: string) {
  const text = html.replace(/<[^>]+>/g, " ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

type Draft = {
  id?: number;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  coverImage: string | null;
  category: string;
  author: string;
  status: "draft" | "published";
};

const EMPTY: Draft = {
  title: "",
  slug: "",
  excerpt: "",
  body: "",
  coverImage: null,
  category: "General",
  author: "Gray Solutions",
  status: "draft",
};

export default function BlogManager() {
  const { toast } = useToast();
  const [editing, setEditing] = useState<Draft | null>(null);
  const [slugTouched, setSlugTouched] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);

  const { data: posts, isLoading } = useQuery<Post[]>({ queryKey: ["/api/admin/posts"] });

  const saveMutation = useMutation({
    mutationFn: async (draft: Draft) => {
      const payload = {
        title: draft.title,
        slug: draft.slug || slugify(draft.title),
        excerpt: draft.excerpt,
        body: draft.body,
        coverImage: draft.coverImage || null,
        category: draft.category,
        author: draft.author,
        readTime: estimateReadTime(draft.body),
        status: draft.status,
      };
      const res = draft.id
        ? await apiRequest("PUT", `/api/admin/posts/${draft.id}`, payload)
        : await apiRequest("POST", "/api/admin/posts", payload);
      if (!res.ok) {
        const e = await res.json().catch(() => ({}));
        throw new Error(e.error || "Failed to save");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/posts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/overview"] });
      toast({ title: "Saved", description: "Your post has been saved." });
      setEditing(null);
      setSlugTouched(false);
    },
    onError: (e: Error) => toast({ title: "Couldn't save", description: e.message, variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => apiRequest("DELETE", `/api/admin/posts/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/posts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/overview"] });
      toast({ title: "Deleted", description: "The post was removed." });
    },
  });

  // Auto-fill slug from the title until the user edits the slug manually.
  useEffect(() => {
    if (editing && !slugTouched && !editing.id) {
      setEditing((d) => (d ? { ...d, slug: slugify(d.title) } : d));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing?.title]);

  const uploadCover = async (file: File) => {
    setUploadingCover(true);
    try {
      const res = await fetch(`/api/admin/upload?filename=${encodeURIComponent(file.name)}`, {
        method: "POST",
        headers: { "Content-Type": file.type || "application/octet-stream" },
        body: file,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        setEditing((d) => (d ? { ...d, coverImage: data.url } : d));
      } else {
        const url = window.prompt(data.error || "Upload unavailable. Paste a cover image URL:");
        if (url) setEditing((d) => (d ? { ...d, coverImage: url } : d));
      }
    } catch {
      const url = window.prompt("Upload failed. Paste a cover image URL instead:");
      if (url) setEditing((d) => (d ? { ...d, coverImage: url } : d));
    } finally {
      setUploadingCover(false);
    }
  };

  // ── Editor view ───────────────────────────────────────────────────────────
  if (editing) {
    const d = editing;
    const set = (patch: Partial<Draft>) => setEditing((cur) => (cur ? { ...cur, ...patch } : cur));
    return (
      <div className="max-w-3xl">
        <button
          onClick={() => { setEditing(null); setSlugTouched(false); }}
          className="inline-flex items-center gap-2 text-sm font-medium text-[#666] hover:text-[#1A1A1A] mb-6"
        >
          <ArrowLeft size={16} /> Back to posts
        </button>

        <div className="space-y-6">
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-[#999]">Title</label>
            <input
              value={d.title}
              onChange={(e) => set({ title: e.target.value })}
              placeholder="A clear, compelling headline"
              className="mt-2 w-full px-5 py-4 rounded-xl border border-[#ECECEC] focus:border-[#1A1A1A] focus:outline-none text-lg font-bold text-[#1A1A1A]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-[#999]">Slug</label>
              <input
                value={d.slug}
                onChange={(e) => { setSlugTouched(true); set({ slug: slugify(e.target.value) }); }}
                placeholder="url-friendly-slug"
                className="mt-2 w-full px-5 py-3 rounded-xl border border-[#ECECEC] focus:border-[#1A1A1A] focus:outline-none text-[#1A1A1A] font-mono text-sm"
              />
              <p className="mt-1 text-xs text-[#999]">/blogs/{d.slug || "…"}</p>
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-[#999]">Category</label>
              <select
                value={d.category}
                onChange={(e) => set({ category: e.target.value })}
                className="mt-2 w-full px-5 py-3 rounded-xl border border-[#ECECEC] focus:border-[#1A1A1A] focus:outline-none text-[#1A1A1A] bg-white"
              >
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-[#999]">Excerpt</label>
            <textarea
              value={d.excerpt}
              onChange={(e) => set({ excerpt: e.target.value })}
              placeholder="One or two sentences shown on the blog list and previews."
              className="mt-2 w-full h-20 px-5 py-3 rounded-xl border border-[#ECECEC] focus:border-[#1A1A1A] focus:outline-none text-[#1A1A1A] resize-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-[#999]">Cover image</label>
            <div className="mt-2 flex items-center gap-4">
              <div className="h-20 w-32 rounded-xl border border-[#ECECEC] bg-[#FAFAFA] overflow-hidden flex items-center justify-center shrink-0">
                {d.coverImage ? (
                  <img src={d.coverImage} alt="cover" className="h-full w-full object-cover" />
                ) : (
                  <ImagePlus size={20} className="text-[#CCC]" />
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label className="inline-flex items-center gap-2 text-sm font-medium text-[#1A1A1A] cursor-pointer hover:underline">
                  {uploadingCover ? <Loader2 size={14} className="animate-spin" /> : <ImagePlus size={14} />}
                  {uploadingCover ? "Uploading…" : "Upload image"}
                  <input type="file" accept="image/*" className="hidden"
                    onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadCover(f); e.target.value = ""; }} />
                </label>
                <button
                  type="button"
                  className="text-sm text-[#666] hover:text-[#1A1A1A] text-left"
                  onClick={() => { const url = window.prompt("Paste a cover image URL", d.coverImage || ""); if (url !== null) set({ coverImage: url || null }); }}
                >
                  Or paste a URL
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-[#999] mb-2 block">Body</label>
            <Suspense fallback={<div className="h-[420px] rounded-2xl border border-[#ECECEC] flex items-center justify-center text-[#999]"><Loader2 className="animate-spin mr-2" size={16}/> Loading editor…</div>}>
              <RichEditor value={d.body} onChange={(html) => set({ body: html })} />
            </Suspense>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[#F2F2F2]">
            <label className="inline-flex items-center gap-3 text-sm font-medium text-[#1A1A1A]">
              <span className="text-xs font-bold uppercase tracking-widest text-[#999]">Status</span>
              <select
                value={d.status}
                onChange={(e) => set({ status: e.target.value as Draft["status"] })}
                className="px-4 py-2 rounded-lg border border-[#ECECEC] bg-white focus:outline-none focus:border-[#1A1A1A]"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </label>
            <div className="flex items-center gap-3">
              <Button variant="ghost" onClick={() => { setEditing(null); setSlugTouched(false); }} className="text-[#666]">Cancel</Button>
              <Button
                onClick={() => {
                  if (!d.title.trim()) { toast({ title: "Title required", variant: "destructive" }); return; }
                  saveMutation.mutate(d);
                }}
                disabled={saveMutation.isPending}
                className="bg-[#1A1A1A] hover:bg-black text-white px-6 rounded-xl font-bold"
              >
                {saveMutation.isPending ? "Saving…" : d.status === "published" ? "Publish" : "Save draft"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── List view ───────────────────────────────────────────────────────────
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-[#1A1A1A]">Blog posts</h2>
          <p className="text-sm text-[#999]">Create, edit, and publish — changes go live on /blogs.</p>
        </div>
        <Button onClick={() => { setEditing({ ...EMPTY }); setSlugTouched(false); }} className="bg-[#1A1A1A] hover:bg-black text-white rounded-xl font-bold">
          <Plus size={16} className="mr-2" /> New post
        </Button>
      </div>

      <div className="rounded-[24px] border border-[#F0F0F0] bg-white overflow-hidden shadow-[0_4px_25px_rgba(0,0,0,0.03)]">
        {isLoading ? (
          <div className="py-20 text-center text-[#999]"><Loader2 className="animate-spin inline mr-2" size={16} /> Loading posts…</div>
        ) : !posts || posts.length === 0 ? (
          <div className="py-20 text-center text-[#999]">No posts yet. Click “New post” to write your first one.</div>
        ) : (
          <ul className="divide-y divide-[#F5F5F5]">
            {posts.map((p) => (
              <li key={p.id} className="flex items-center gap-4 px-6 py-4 hover:bg-[#FAFAFA] transition-colors">
                <div className="h-12 w-16 rounded-lg bg-[#F4F4F4] overflow-hidden shrink-0">
                  {p.coverImage && <img src={p.coverImage} alt="" className="h-full w-full object-cover" />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#1A1A1A] truncate">{p.title}</span>
                    <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${p.status === "published" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                      {p.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#999] truncate">{p.category} · /{p.slug}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  {p.status === "published" && (
                    <a href={`/blogs/${p.slug}`} target="_blank" rel="noreferrer" title="View" className="h-9 w-9 inline-flex items-center justify-center rounded-lg text-[#666] hover:bg-[#F0F0F0]">
                      <ExternalLink size={16} />
                    </a>
                  )}
                  <button
                    title="Edit"
                    onClick={() => { setEditing({ id: p.id, title: p.title, slug: p.slug, excerpt: p.excerpt, body: p.body, coverImage: p.coverImage, category: p.category, author: p.author, status: p.status as Draft["status"] }); setSlugTouched(true); }}
                    className="h-9 w-9 inline-flex items-center justify-center rounded-lg text-[#666] hover:bg-[#F0F0F0]"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    title="Delete"
                    onClick={() => { if (window.confirm(`Delete “${p.title}”? This can't be undone.`)) deleteMutation.mutate(p.id); }}
                    className="h-9 w-9 inline-flex items-center justify-center rounded-lg text-[#666] hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
