import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { Eye, EyeOff, Lock, User as UserIcon } from "lucide-react";
import logoImage from "@assets/Frame_33_copy2_2_(1)_1768895375486.png";

export default function AuthPage() {
  const [, setLocation] = useLocation();
  const { user, loginMutation } = useAuth();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Redirect if already logged in
  React.useEffect(() => {
    if (user) setLocation("/admin");
  }, [user, setLocation]);

  const onSubmit = async (data: any) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        toast({ title: "Welcome back", description: "Login successful" });
        setLocation("/admin");
      },
      onError: (error: any) => {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: error.message || "Invalid credentials",
        });
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAFA] px-4">
      <div className="mb-8">
        <img src={logoImage} alt="Gray Solutions" className="h-10 w-auto" />
      </div>
      
      <Card className="w-full max-w-md border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-2xl overflow-hidden">
        <CardHeader className="pt-10 pb-2 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight text-[#1A1A1A]">Admin Portal</CardTitle>
          <p className="text-[#666666] text-sm mt-1">Manage your website content and inquiries</p>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#999999] ml-1">Username</label>
              <div className="relative">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#CCCCCC]" />
                <Input 
                  {...form.register("username")} 
                  placeholder="Username" 
                  className="bg-[#F8F9FA] border-none focus:ring-1 focus:ring-black h-12 pl-12 rounded-xl transition-all"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#999999] ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#CCCCCC]" />
                <Input 
                  type={showPassword ? "text" : "password"} 
                  {...form.register("password")} 
                  placeholder="••••••••" 
                  className="bg-[#F8F9FA] border-none focus:ring-1 focus:ring-black h-12 pl-12 pr-12 rounded-xl transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#CCCCCC] hover:text-[#1A1A1A] transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-[#1A1A1A] hover:bg-black text-white h-12 rounded-xl text-sm font-bold tracking-widest transition-all mt-4"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? "SIGNING IN..." : "LOGIN"}
            </Button>
          </form>
        </CardContent>
      </Card>
      
      <p className="mt-8 text-xs text-[#CCCCCC]">
        &copy; {new Date().getFullYear()} Gray Solutions. All rights reserved.
      </p>
    </div>
  );
}
