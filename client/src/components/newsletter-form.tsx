import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertNewsletterSchema, type InsertNewsletter } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<InsertNewsletter>({
    resolver: zodResolver(insertNewsletterSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: InsertNewsletter) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Subscription failed");

      toast({
        title: "Subscribed!",
        description: "Welcome to the Gray Solutions inner circle.",
      });
      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full md:w-auto">
      <form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className="flex flex-col w-full md:w-auto gap-2"
        data-testid="newsletter-form"
      >
        <div className="relative">
          <input
            type="email"
            placeholder="Email Address"
            {...form.register("email")}
            className="px-3 sm:px-4 py-2.5 sm:py-2 text-sm w-full md:w-56 transition-all focus:outline-none focus:ring-1 focus:ring-black/5"
            style={{ 
              backgroundColor: '#F5F5F5',
              border: '1px solid #E5E5E5',
              color: '#1A1A1A',
              borderRadius: '2px',
            }}
            data-testid="footer-email-input"
          />
          {form.formState.errors.email && (
            <p className="absolute -bottom-5 left-0 text-red-500 text-[10px]">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>
        <button 
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2.5 sm:py-2 font-medium text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90 whitespace-nowrap w-full md:w-auto disabled:opacity-50"
          style={{ 
            backgroundColor: '#1A1A1A', 
            color: '#FFFFFF',
            borderRadius: '2px',
          }}
          data-testid="footer-subscribe"
        >
          {isSubmitting ? "..." : "SUBSCRIBE"}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </button>
      </form>
    </div>
  );
}
