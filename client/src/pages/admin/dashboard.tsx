import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { useLocation, Link } from "wouter";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Mail, MessageSquare, Shield, Send, CheckCircle, AlertCircle } from "lucide-react";
import { type ContactQuery, type NewsletterSubscriber } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

import logoImage from "@assets/Frame_33_copy2_2_(1)_1768895375486.png";
import { ExternalLink, LayoutDashboard, Search } from "lucide-react";

export default function AdminDashboard() {
  const { user, logoutMutation } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [broadcastSubject, setBroadcastSubject] = useState("");
  const [broadcastContent, setBroadcastContent] = useState("");

  // Protect the route
  React.useEffect(() => {
    if (!user) setLocation("/admin/auth");
  }, [user, setLocation]);

  const { data: queries, isLoading: queriesLoading } = useQuery<ContactQuery[]>({
    queryKey: ["/api/admin/queries"],
  });

  const { data: subscribers, isLoading: subscribersLoading } = useQuery<NewsletterSubscriber[]>({
    queryKey: ["/api/admin/subscribers"],
  });

  const broadcastMutation = useMutation({
    mutationFn: async (data: { subject: string; content: string }) => {
      const res = await apiRequest("POST", "/api/admin/newsletter/broadcast", data);
      return res.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Broadcast Successful",
        description: data.message,
      });
      setBroadcastSubject("");
      setBroadcastContent("");
    },
    onError: (error: Error) => {
      toast({
        title: "Broadcast Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastSubject || !broadcastContent) {
      toast({
        title: "Missing Information",
        description: "Please provide both subject and content for the newsletter.",
        variant: "destructive",
      });
      return;
    }
    broadcastMutation.mutate({ subject: broadcastSubject, content: broadcastContent });
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="bg-white border-b border-[#F0F0F0] px-8 py-5 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-10">
          <Link href="/">
            <img src={logoImage} alt="Gray Solutions" className="h-8 w-auto cursor-pointer" />
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2 text-[#1A1A1A] font-bold text-sm tracking-tight cursor-default">
              <LayoutDashboard size={16} />
              Dashboard
            </div>
            <a 
              href="/" 
              target="_blank" 
              className="flex items-center gap-2 text-[#666666] hover:text-[#1A1A1A] font-medium text-sm transition-colors"
            >
              <ExternalLink size={16} />
              Visit Site
            </a>
          </nav>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-sm font-bold text-[#1A1A1A]">{user.username}</span>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#999999]">Administrator</span>
          </div>
          <div className="h-10 w-[1px] bg-[#F0F0F0] hidden sm:block"></div>
          <Button 
            variant="ghost" 
            onClick={() => logoutMutation.mutate()}
            className="text-[#666666] hover:text-red-500 hover:bg-red-50/50 rounded-xl px-4 transition-all"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <main className="flex-1 p-8 sm:p-12 max-w-[1400px] mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <Card className="bg-white border-none shadow-[0_4px_20px_rgba(0,0,0,0.02)] rounded-2xl overflow-hidden">
            <CardContent className="pt-8 pb-8 px-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-[#999999]">Total Subscribers</p>
                  <h3 className="text-4xl font-bold mt-2 text-[#1A1A1A]">{subscribers?.length || 0}</h3>
                </div>
                <div className="bg-[#F8F9FA] p-4 rounded-2xl text-[#1A1A1A]">
                  <Mail size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-none shadow-[0_4px_20px_rgba(0,0,0,0.02)] rounded-2xl overflow-hidden">
            <CardContent className="pt-8 pb-8 px-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-[#999999]">New Inquiries</p>
                  <h3 className="text-4xl font-bold mt-2 text-[#1A1A1A]">{queries?.length || 0}</h3>
                </div>
                <div className="bg-[#F8F9FA] p-4 rounded-2xl text-[#1A1A1A]">
                  <MessageSquare size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="queries" className="w-full">
          <TabsList className="bg-[#F0F0F0]/50 border-none p-1.5 rounded-2xl mb-8 flex w-fit">
            <TabsTrigger value="queries" className="rounded-xl px-8 py-3 text-sm font-bold tracking-tight data-[state=active]:bg-white data-[state=active]:text-[#1A1A1A] data-[state=active]:shadow-sm transition-all">
              CONTACT QUERIES
            </TabsTrigger>
            <TabsTrigger value="subscribers" className="rounded-xl px-8 py-3 text-sm font-bold tracking-tight data-[state=active]:bg-white data-[state=active]:text-[#1A1A1A] data-[state=active]:shadow-sm transition-all">
              NEWSLETTER LIST
            </TabsTrigger>
            <TabsTrigger value="broadcast" className="rounded-xl px-8 py-3 text-sm font-bold tracking-tight data-[state=active]:bg-white data-[state=active]:text-[#1A1A1A] data-[state=active]:shadow-sm transition-all">
              SEND NEWSLETTER
            </TabsTrigger>
          </TabsList>

          <TabsContent value="queries">
            <Card className="border-none shadow-[0_4px_25px_rgba(0,0,0,0.03)] rounded-[24px] overflow-hidden bg-white">
              <CardHeader className="px-8 py-6 border-b border-[#F5F5F5]">
                <CardTitle className="text-xl font-bold text-[#1A1A1A]">Recent Communications</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-[#F9F9F9]/50">
                    <TableRow className="border-none hover:bg-transparent">
                      <TableHead className="font-bold text-[#999999] uppercase text-[10px] tracking-widest pl-8 h-12">User</TableHead>
                      <TableHead className="font-bold text-[#999999] uppercase text-[10px] tracking-widest h-12">Contact Point</TableHead>
                      <TableHead className="font-bold text-[#999999] uppercase text-[10px] tracking-widest h-12">Initial Message</TableHead>
                      <TableHead className="font-bold text-[#999999] uppercase text-[10px] tracking-widest h-12 pr-8">Submitted</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {queriesLoading ? (
                      <TableRow><TableCell colSpan={4} className="text-center py-20 text-[#666666]">Loading records...</TableCell></TableRow>
                    ) : queries?.length === 0 ? (
                      <TableRow><TableCell colSpan={4} className="text-center py-20 text-[#666666]">No records found yet.</TableCell></TableRow>
                    ) : (
                      queries?.map((query) => (
                        <TableRow key={query.id} className="hover:bg-[#F9F9F9]/50 transition-colors border-[#F5F5F5]">
                          <TableCell className="font-bold text-[#1A1A1A] pl-8 py-5">{query.name}</TableCell>
                          <TableCell className="text-[#1A1A1A] font-medium py-5">{query.email}</TableCell>
                          <TableCell className="max-w-md text-[#666666] leading-relaxed py-5 pr-10">{query.message}</TableCell>
                          <TableCell className="text-[#999999] whitespace-nowrap py-5 pr-8 text-xs font-medium uppercase tracking-wider">
                            {new Date(query.createdAt!).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subscribers">
            <Card className="border-none shadow-[0_4px_25px_rgba(0,0,0,0.03)] rounded-[24px] overflow-hidden bg-white">
              <CardHeader className="px-8 py-6 border-b border-[#F5F5F5]">
                <CardTitle className="text-xl font-bold text-[#1A1A1A]">Subscriber List</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-[#F9F9F9]/50">
                    <TableRow className="border-none hover:bg-transparent">
                      <TableHead className="font-bold text-[#999999] uppercase text-[10px] tracking-widest pl-8 h-12">Email Address</TableHead>
                      <TableHead className="font-bold text-[#999999] uppercase text-[10px] tracking-widest h-12 pr-8">Subscription Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subscribersLoading ? (
                      <TableRow><TableCell colSpan={2} className="text-center py-20 text-[#666666]">Loading...</TableCell></TableRow>
                    ) : subscribers?.length === 0 ? (
                      <TableRow><TableCell colSpan={2} className="text-center py-20 text-[#666666]">No subscribers yet</TableCell></TableRow>
                    ) : (
                      subscribers?.map((sub) => (
                        <TableRow key={sub.id} className="hover:bg-[#F9F9F9]/50 transition-colors border-[#F5F5F5]">
                          <TableCell className="font-bold text-[#1A1A1A] pl-8 py-5">{sub.email}</TableCell>
                          <TableCell className="text-[#999999] whitespace-nowrap py-5 pr-8 text-xs font-medium uppercase tracking-wider">
                            {new Date(sub.createdAt!).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="broadcast">
            <Card className="border-none shadow-[0_4px_25px_rgba(0,0,0,0.03)] rounded-[24px] overflow-hidden bg-white">
              <CardHeader className="px-8 py-6 border-b border-[#F5F5F5]">
                <CardTitle className="text-xl font-bold text-[#1A1A1A]">Broadcast Newsletter</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleBroadcast} className="space-y-6 max-w-2xl">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#999999]">Subject Line</label>
                    <input 
                      type="text" 
                      value={broadcastSubject}
                      onChange={(e) => setBroadcastSubject(e.target.value)}
                      placeholder="e.g. Weekly Design Insights #12"
                      className="w-full px-6 py-4 rounded-xl border border-[#F0F0F0] focus:border-[#1A1A1A] focus:outline-none transition-colors text-[#1A1A1A] font-medium"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#999999]">Message Content</label>
                    <textarea 
                      value={broadcastContent}
                      onChange={(e) => setBroadcastContent(e.target.value)}
                      placeholder="Type your newsletter message here... "
                      className="w-full h-64 px-6 py-4 rounded-xl border border-[#F0F0F0] focus:border-[#1A1A1A] focus:outline-none transition-colors text-[#1A1A1A] font-medium resize-none"
                    />
                  </div>

                  <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100 flex gap-4">
                    <AlertCircle className="text-amber-600 flex-shrink-0" size={20} />
                    <p className="text-sm text-amber-800 leading-relaxed">
                      <strong>Wait!</strong> This will send an email to <strong>{subscribers?.length || 0}</strong> subscribers immediately. Please triple-check your content before hitting send.
                    </p>
                  </div>

                  <Button 
                    type="submit"
                    disabled={broadcastMutation.isPending}
                    className="bg-[#1A1A1A] hover:bg-black text-white px-8 py-6 rounded-xl font-bold flex items-center gap-3 transition-all active:scale-95 disabled:opacity-50"
                  >
                    {broadcastMutation.isPending ? "SENDING..." : "SEND BROADCAST"}
                    <Send size={18} />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
