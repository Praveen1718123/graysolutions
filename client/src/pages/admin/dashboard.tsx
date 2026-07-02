import React, { Suspense, lazy, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { useLocation, Link } from "wouter";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  LogOut, Mail, MessageSquare, Send, AlertCircle, Bell, ExternalLink,
  LayoutDashboard, Inbox, Users, Megaphone, FileText, Settings as SettingsIcon,
  Download, UserPlus, Loader2, KeyRound, Clock, RefreshCw,
} from "lucide-react";
import { type ContactQuery, type NewsletterSubscriber } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import logoImage from "@assets/Frame_33_copy2_2_(1)_1768895375486.png";

const BlogManager = lazy(() => import("./blog-manager"));

type Section = "overview" | "submissions" | "subscribers" | "broadcasts" | "blog" | "settings";

type OverviewData = {
  stats: { submissions: number; subscribers: number; posts: number; drafts: number };
  activity: Array<{ id: string; type: "submission" | "subscriber"; title: string; subtitle: string; source: string; createdAt: string | null }>;
};

// ── Brands (unified inbound hub) ──────────────────────────────────────────────
const BRAND_ORDER = ["gray-solutions", "gva", "magic-trucks", "gray-neo"] as const;
type BrandFilter = "all" | (typeof BRAND_ORDER)[number];
const BRAND_META: Record<string, { label: string; badge: string }> = {
  "gray-solutions": { label: "Gray Solutions", badge: "bg-blue-50 text-blue-600" },
  "gva": { label: "GVA", badge: "bg-purple-50 text-purple-600" },
  "magic-trucks": { label: "Magic Trucks", badge: "bg-amber-50 text-amber-700" },
  "gray-neo": { label: "Gray Neo", badge: "bg-emerald-50 text-emerald-600" },
};

function SourceBadge({ source }: { source?: string }) {
  const meta = BRAND_META[source ?? "gray-solutions"] ?? { label: source ?? "—", badge: "bg-gray-100 text-gray-600" };
  return (
    <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${meta.badge}`}>
      {meta.label}
    </span>
  );
}

function OrgSwitcher({
  value, onChange, counts,
}: { value: BrandFilter; onChange: (b: BrandFilter) => void; counts: Record<string, number> }) {
  const tabs: Array<{ id: BrandFilter; label: string }> = [
    { id: "all", label: "All brands" },
    ...BRAND_ORDER.map((b) => ({ id: b, label: BRAND_META[b].label })),
  ];
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
            value === t.id ? "bg-[#1A1A1A] text-white" : "bg-white border border-[#ECECEC] text-[#666] hover:text-[#1A1A1A]"
          }`}
        >
          {t.label}
          <span className={`ml-2 text-[11px] ${value === t.id ? "opacity-70" : "text-[#BBB]"}`}>{counts[t.id] ?? 0}</span>
        </button>
      ))}
    </div>
  );
}

const NAV: Array<{ id: Section; label: string; icon: React.ComponentType<{ size?: number }> }> = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "submissions", label: "Submissions", icon: Inbox },
  { id: "subscribers", label: "Subscribers", icon: Users },
  { id: "broadcasts", label: "Broadcasts", icon: Megaphone },
  { id: "blog", label: "Blog", icon: FileText },
  { id: "settings", label: "Settings", icon: SettingsIcon },
];

function fmtDate(d: string | Date | null | undefined) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
function timeAgo(d: string | null) {
  if (!d) return "";
  const s = Math.floor((Date.now() - new Date(d).getTime()) / 1000);
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

export default function AdminDashboard() {
  const { user, logoutMutation } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [section, setSection] = useState<Section>("overview");
  const [brand, setBrand] = useState<BrandFilter>("all");
  const [refreshing, setRefreshing] = useState(false);

  // Universal refresh — re-fetches everything in the portal (all sections + blog).
  const refreshAll = async () => {
    setRefreshing(true);
    try {
      await queryClient.invalidateQueries();
    } finally {
      setTimeout(() => setRefreshing(false), 500);
    }
  };

  React.useEffect(() => {
    if (!user) setLocation("/admin/auth");
  }, [user, setLocation]);

  const { data: queries, isLoading: queriesLoading } = useQuery<ContactQuery[]>({
    queryKey: ["/api/admin/queries"], refetchInterval: 30000,
  });
  const { data: subscribers, isLoading: subscribersLoading } = useQuery<NewsletterSubscriber[]>({
    queryKey: ["/api/admin/subscribers"], refetchInterval: 30000,
  });
  const { data: overview } = useQuery<OverviewData>({
    queryKey: ["/api/admin/overview"], refetchInterval: 30000,
  });
  const { data: unread } = useQuery<{ count: number }>({
    queryKey: ["/api/admin/notifications/unread"], refetchInterval: 20000,
  });

  const seenMutation = useMutation({
    mutationFn: async () => apiRequest("POST", "/api/admin/notifications/seen", {}),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/admin/notifications/unread"] }),
  });

  const openNotifications = () => {
    setSection("overview");
    if (unread?.count) seenMutation.mutate();
  };

  if (!user) return null;

  const stats = overview?.stats;

  // Brand filtering (client-side) for the unified inbound hub
  const matchesBrand = (s?: string) => brand === "all" || (s ?? "gray-solutions") === brand;
  const fQueries = queries?.filter((q) => matchesBrand(q.source));
  const fSubscribers = subscribers?.filter((s) => matchesBrand(s.source));
  const fActivity = overview?.activity?.filter((a) => matchesBrand(a.source));
  const brandCounts: Record<string, number> = {
    all: (queries?.length ?? 0) + (subscribers?.length ?? 0),
  };
  for (const b of BRAND_ORDER) {
    brandCounts[b] =
      (queries?.filter((q) => (q.source ?? "gray-solutions") === b).length ?? 0) +
      (subscribers?.filter((s) => (s.source ?? "gray-solutions") === b).length ?? 0);
  }
  const showSwitcher = section === "overview" || section === "submissions" || section === "subscribers" || section === "broadcasts";

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-[#1A1A1A] flex">
      {/* ── Sidebar ─────────────────────────────────────────────────────── */}
      <aside className="hidden lg:flex flex-col w-[248px] shrink-0 bg-white border-r border-[#F0F0F0] sticky top-0 h-screen">
        <div className="px-6 py-6 border-b border-[#F5F5F5]">
          <Link href="/"><img src={logoImage} alt="Gray Solutions" className="h-7 w-auto cursor-pointer" /></Link>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setSection(id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                section === id ? "bg-[#1A1A1A] text-white" : "text-[#666] hover:bg-[#F5F5F5] hover:text-[#1A1A1A]"
              }`}
            >
              <Icon size={17} />
              {label}
              {id === "submissions" && !!unread?.count && (
                <span className="ml-auto text-[10px] font-bold bg-blue-500 text-white rounded-full px-1.5 py-0.5">{unread.count}</span>
              )}
            </button>
          ))}
        </nav>
        <div className="px-3 py-4 border-t border-[#F5F5F5]">
          <a href="/" target="_blank" rel="noreferrer" className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-[#666] hover:bg-[#F5F5F5] hover:text-[#1A1A1A] transition-colors">
            <ExternalLink size={17} /> Visit site
          </a>
          <button onClick={() => logoutMutation.mutate()} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-[#666] hover:bg-red-50 hover:text-red-500 transition-colors">
            <LogOut size={17} /> Logout
          </button>
        </div>
      </aside>

      {/* ── Main ─────────────────────────────────────────────────────────── */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Topbar */}
        <header className="bg-white border-b border-[#F0F0F0] px-6 sm:px-10 py-4 flex items-center justify-between sticky top-0 z-40">
          {/* Mobile section switcher */}
          <div className="lg:hidden">
            <select value={section} onChange={(e) => setSection(e.target.value as Section)} className="px-3 py-2 rounded-lg border border-[#ECECEC] bg-white text-sm font-semibold">
              {NAV.map((n) => <option key={n.id} value={n.id}>{n.label}</option>)}
            </select>
          </div>
          <h1 className="hidden lg:block text-lg font-bold capitalize">{section}</h1>

          <div className="flex items-center gap-4">
            <button onClick={refreshAll} disabled={refreshing} className="relative h-10 w-10 inline-flex items-center justify-center rounded-xl hover:bg-[#F5F5F5] transition-colors disabled:opacity-60" title="Refresh data">
              <RefreshCw size={18} className={`text-[#555] ${refreshing ? "animate-spin" : ""}`} />
            </button>
            <button onClick={openNotifications} className="relative h-10 w-10 inline-flex items-center justify-center rounded-xl hover:bg-[#F5F5F5] transition-colors" title="Notifications">
              <Bell size={18} className="text-[#555]" />
              {!!unread?.count && (
                <span className="absolute top-1.5 right-1.5 min-w-[16px] h-4 px-1 text-[10px] font-bold bg-blue-500 text-white rounded-full flex items-center justify-center">
                  {unread.count > 9 ? "9+" : unread.count}
                </span>
              )}
            </button>
            <div className="h-8 w-px bg-[#F0F0F0]" />
            <div className="flex flex-col items-end">
              <span className="text-sm font-bold leading-tight">{user.username}</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#999]">Administrator</span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 sm:p-10 max-w-[1200px] w-full">
          {showSwitcher && <OrgSwitcher value={brand} onChange={setBrand} counts={brandCounts} />}
          {section === "overview" && (
            <Overview
              submissions={fQueries?.length ?? 0}
              subscribers={fSubscribers?.length ?? 0}
              posts={stats?.posts ?? 0}
              drafts={stats?.drafts ?? 0}
              activity={fActivity}
            />
          )}
          {section === "submissions" && <Submissions queries={fQueries} loading={queriesLoading} />}
          {section === "subscribers" && <Subscribers subscribers={fSubscribers} loading={subscribersLoading} brand={brand} />}
          {section === "broadcasts" && <Broadcasts subscriberCount={fSubscribers?.length || 0} brand={brand} />}
          {section === "blog" && (
            <Suspense fallback={<div className="py-20 text-center text-[#999]"><Loader2 className="animate-spin inline mr-2" size={16} /> Loading…</div>}>
              <BlogManager />
            </Suspense>
          )}
          {section === "settings" && <SettingsPanel username={user.username} />}
        </main>
      </div>
    </div>
  );
}

// ── Overview ────────────────────────────────────────────────────────────────
function StatCard({ label, value, icon: Icon }: { label: string; value: number; icon: React.ComponentType<{ size?: number }> }) {
  return (
    <div className="bg-white border border-[#F0F0F0] rounded-2xl p-6 flex items-center justify-between">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-widest text-[#999]">{label}</p>
        <h3 className="text-3xl font-bold mt-2">{value}</h3>
      </div>
      <div className="bg-[#F8F9FA] p-3.5 rounded-2xl text-[#1A1A1A]"><Icon size={22} /></div>
    </div>
  );
}

function Overview({ submissions, subscribers, posts, drafts, activity }: {
  submissions: number; subscribers: number; posts: number; drafts: number;
  activity?: OverviewData["activity"];
}) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard label="Submissions" value={submissions} icon={MessageSquare} />
        <StatCard label="Subscribers" value={subscribers} icon={Mail} />
        <StatCard label="Posts" value={posts} icon={FileText} />
        <StatCard label="Drafts" value={drafts} icon={FileText} />
      </div>

      <div className="bg-white border border-[#F0F0F0] rounded-[24px] overflow-hidden">
        <div className="px-7 py-5 border-b border-[#F5F5F5] flex items-center gap-2">
          <Clock size={16} className="text-[#999]" />
          <h2 className="text-lg font-bold">Recent activity</h2>
        </div>
        {!activity || activity.length === 0 ? (
          <div className="py-16 text-center text-[#999]">Nothing yet. New submissions and subscribers will show up here.</div>
        ) : (
          <ul className="divide-y divide-[#F5F5F5]">
            {activity.map((a) => (
              <li key={a.id} className="flex items-center gap-4 px-7 py-4">
                <div className={`h-9 w-9 rounded-xl flex items-center justify-center ${a.type === "submission" ? "bg-blue-50 text-blue-600" : "bg-green-50 text-green-600"}`}>
                  {a.type === "submission" ? <MessageSquare size={16} /> : <UserPlus size={16} />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-sm truncate">{a.title}</p>
                  <p className="text-xs text-[#999] truncate">{a.subtitle}</p>
                </div>
                <SourceBadge source={a.source} />
                <span className="text-xs text-[#BBB] whitespace-nowrap">{timeAgo(a.createdAt)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// ── Submissions ───────────────────────────────────────────────────────────
function Submissions({ queries, loading }: { queries?: ContactQuery[]; loading: boolean }) {
  return (
    <div className="bg-white border border-[#F0F0F0] rounded-[24px] overflow-hidden">
      <div className="px-7 py-5 border-b border-[#F5F5F5]"><h2 className="text-lg font-bold">Contact submissions</h2></div>
      <Table>
        <TableHeader className="bg-[#F9F9F9]/50">
          <TableRow className="border-none hover:bg-transparent">
            <TableHead className="font-bold text-[#999] uppercase text-[10px] tracking-widest pl-7 h-12">Name</TableHead>
            <TableHead className="font-bold text-[#999] uppercase text-[10px] tracking-widest h-12">Email</TableHead>
            <TableHead className="font-bold text-[#999] uppercase text-[10px] tracking-widest h-12">Message</TableHead>
            <TableHead className="font-bold text-[#999] uppercase text-[10px] tracking-widest h-12">Brand</TableHead>
            <TableHead className="font-bold text-[#999] uppercase text-[10px] tracking-widest h-12 pr-7">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow><TableCell colSpan={5} className="text-center py-20 text-[#999]">Loading…</TableCell></TableRow>
          ) : !queries || queries.length === 0 ? (
            <TableRow><TableCell colSpan={5} className="text-center py-20 text-[#999]">No submissions yet.</TableCell></TableRow>
          ) : (
            [...queries].reverse().map((q) => (
              <TableRow key={q.id} className="hover:bg-[#F9F9F9]/50 border-[#F5F5F5]">
                <TableCell className="font-bold pl-7 py-5">{q.name}</TableCell>
                <TableCell className="font-medium py-5">{q.email}</TableCell>
                <TableCell className="max-w-md text-[#666] leading-relaxed py-5 pr-8">{q.message}</TableCell>
                <TableCell className="py-5"><SourceBadge source={q.source} /></TableCell>
                <TableCell className="text-[#999] whitespace-nowrap py-5 pr-7 text-xs font-medium uppercase tracking-wider">{fmtDate(q.createdAt)}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

// ── Subscribers ─────────────────────────────────────────────────────────────
function Subscribers({ subscribers, loading, brand }: { subscribers?: NewsletterSubscriber[]; loading: boolean; brand: BrandFilter }) {
  const exportCsv = () => {
    if (!subscribers?.length) return;
    const rows = [
      ["email", "brand", "list", "subscribed_at"],
      ...subscribers.map((s) => [s.email, s.source ?? "gray-solutions", s.kind ?? "newsletter", s.createdAt ? new Date(s.createdAt).toISOString() : ""]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url; a.download = `subscribers-${brand}-${new Date().toISOString().slice(0, 10)}.csv`; a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <div className="bg-white border border-[#F0F0F0] rounded-[24px] overflow-hidden">
      <div className="px-7 py-5 border-b border-[#F5F5F5] flex items-center justify-between">
        <h2 className="text-lg font-bold">Newsletter subscribers</h2>
        <Button onClick={exportCsv} disabled={!subscribers?.length} variant="ghost" className="text-sm font-semibold text-[#1A1A1A] hover:bg-[#F5F5F5] rounded-lg">
          <Download size={15} className="mr-2" /> Export CSV
        </Button>
      </div>
      <Table>
        <TableHeader className="bg-[#F9F9F9]/50">
          <TableRow className="border-none hover:bg-transparent">
            <TableHead className="font-bold text-[#999] uppercase text-[10px] tracking-widest pl-7 h-12">Email</TableHead>
            <TableHead className="font-bold text-[#999] uppercase text-[10px] tracking-widest h-12">Brand</TableHead>
            <TableHead className="font-bold text-[#999] uppercase text-[10px] tracking-widest h-12">List</TableHead>
            <TableHead className="font-bold text-[#999] uppercase text-[10px] tracking-widest h-12 pr-7">Subscribed</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow><TableCell colSpan={4} className="text-center py-20 text-[#999]">Loading…</TableCell></TableRow>
          ) : !subscribers || subscribers.length === 0 ? (
            <TableRow><TableCell colSpan={4} className="text-center py-20 text-[#999]">No subscribers yet.</TableCell></TableRow>
          ) : (
            [...subscribers].reverse().map((s) => (
              <TableRow key={s.id} className="hover:bg-[#F9F9F9]/50 border-[#F5F5F5]">
                <TableCell className="font-bold pl-7 py-5">{s.email}</TableCell>
                <TableCell className="py-5"><SourceBadge source={s.source} /></TableCell>
                <TableCell className="py-5 text-xs font-medium uppercase tracking-wider text-[#888]">{s.kind ?? "newsletter"}</TableCell>
                <TableCell className="text-[#999] whitespace-nowrap py-5 pr-7 text-xs font-medium uppercase tracking-wider">{fmtDate(s.createdAt)}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

// ── Broadcasts ──────────────────────────────────────────────────────────────
function Broadcasts({ subscriberCount, brand }: { subscriberCount: number; brand: BrandFilter }) {
  const { toast } = useToast();
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const brandName = brand === "all" ? "all brands" : BRAND_META[brand]?.label ?? brand;
  const broadcast = useMutation({
    mutationFn: async (data: { subject: string; content: string; source?: string }) => {
      const res = await apiRequest("POST", "/api/admin/newsletter/broadcast", data);
      if (!res.ok) { const e = await res.json().catch(() => ({})); throw new Error(e.error || "Failed"); }
      return res.json();
    },
    onSuccess: (data) => { toast({ title: "Broadcast sent", description: data.message }); setSubject(""); setContent(""); },
    onError: (e: Error) => toast({ title: "Broadcast failed", description: e.message, variant: "destructive" }),
  });
  return (
    <div className="bg-white border border-[#F0F0F0] rounded-[24px] overflow-hidden max-w-2xl">
      <div className="px-7 py-5 border-b border-[#F5F5F5] flex items-center justify-between">
        <h2 className="text-lg font-bold">Send a newsletter</h2>
        <span className="text-xs font-semibold text-[#999]">Audience: <span className="text-[#1A1A1A]">{brandName}</span></span>
      </div>
      <form onSubmit={(e) => { e.preventDefault(); if (!subject || !content) { toast({ title: "Add a subject and message", variant: "destructive" }); return; } broadcast.mutate({ subject, content, source: brand === "all" ? undefined : brand }); }} className="p-7 space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-[#999]">Subject</label>
          <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g. What we shipped in June" className="w-full px-5 py-3.5 rounded-xl border border-[#ECECEC] focus:border-[#1A1A1A] focus:outline-none font-medium" />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-[#999]">Message</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write your update… line breaks are preserved." className="w-full h-56 px-5 py-3.5 rounded-xl border border-[#ECECEC] focus:border-[#1A1A1A] focus:outline-none font-medium resize-none" />
        </div>
        <div className="bg-amber-50 p-5 rounded-2xl border border-amber-100 flex gap-3">
          <AlertCircle className="text-amber-600 shrink-0" size={18} />
          <p className="text-sm text-amber-800 leading-relaxed">This sends immediately to <strong>{subscriberCount}</strong> <strong>{brandName}</strong> subscriber{subscriberCount === 1 ? "" : "s"} (BCC). Double-check before sending.</p>
        </div>
        <Button type="submit" disabled={broadcast.isPending} className="bg-[#1A1A1A] hover:bg-black text-white px-7 py-5 rounded-xl font-bold">
          {broadcast.isPending ? "Sending…" : "Send broadcast"} <Send size={16} className="ml-2" />
        </Button>
      </form>
    </div>
  );
}

// ── Settings ──────────────────────────────────────────────────────────────
function SettingsPanel({ username }: { username: string }) {
  const { toast } = useToast();
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const change = useMutation({
    mutationFn: async (newPassword: string) => {
      const res = await apiRequest("POST", "/api/admin/change-password", { newPassword });
      if (!res.ok) { const e = await res.json().catch(() => ({})); throw new Error(e.error || "Failed"); }
      return res.json();
    },
    onSuccess: () => { toast({ title: "Password updated" }); setPw(""); setPw2(""); },
    onError: (e: Error) => toast({ title: "Couldn't update", description: e.message, variant: "destructive" }),
  });
  return (
    <div className="bg-white border border-[#F0F0F0] rounded-[24px] overflow-hidden max-w-xl">
      <div className="px-7 py-5 border-b border-[#F5F5F5] flex items-center gap-2"><KeyRound size={16} className="text-[#999]" /><h2 className="text-lg font-bold">Account</h2></div>
      <div className="p-7 space-y-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#999]">Admin username</p>
          <p className="mt-1 font-semibold">{username}</p>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); if (pw.length < 6) { toast({ title: "Use at least 6 characters", variant: "destructive" }); return; } if (pw !== pw2) { toast({ title: "Passwords don't match", variant: "destructive" }); return; } change.mutate(pw); }} className="space-y-4 pt-2 border-t border-[#F5F5F5]">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-[#999]">New password</label>
            <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="••••••••" className="w-full px-5 py-3 rounded-xl border border-[#ECECEC] focus:border-[#1A1A1A] focus:outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-[#999]">Confirm new password</label>
            <input type="password" value={pw2} onChange={(e) => setPw2(e.target.value)} placeholder="••••••••" className="w-full px-5 py-3 rounded-xl border border-[#ECECEC] focus:border-[#1A1A1A] focus:outline-none" />
          </div>
          <Button type="submit" disabled={change.isPending} className="bg-[#1A1A1A] hover:bg-black text-white px-6 rounded-xl font-bold">
            {change.isPending ? "Updating…" : "Update password"}
          </Button>
        </form>
      </div>
    </div>
  );
}
