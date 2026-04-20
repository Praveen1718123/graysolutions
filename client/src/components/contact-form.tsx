import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertQuerySchema, type InsertQuery } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<InsertQuery>({
    resolver: zodResolver(insertQuerySchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: InsertQuery) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to submit");

      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
      });
      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form 
      onSubmit={form.handleSubmit(onSubmit)} 
      className="space-y-5" 
      data-testid="contact-form"
    >
      {/* Full Name */}
      <div className="relative">
        <label 
          className="block text-sm font-medium mb-2 pl-1"
          style={{ color: '#1A1A1A' }}
        >
          Full Name
        </label>
        <input 
          type="text"
          {...form.register("name")}
          className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl text-base transition-all focus:outline-none focus:ring-1 focus:ring-black/5"
          style={{ 
            backgroundColor: '#F5F5F5',
            border: 'none',
            color: '#1A1A1A',
          }}
          placeholder="Enter your name"
          data-testid="input-full-name"
        />
        {form.formState.errors.name && (
          <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{form.formState.errors.name.message}</p>
        )}
      </div>

      {/* Email Address */}
      <div className="relative">
        <label 
          className="block text-sm font-medium mb-2 pl-1"
          style={{ color: '#1A1A1A' }}
        >
          Email Address
        </label>
        <input 
          type="email"
          {...form.register("email")}
          className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl text-base transition-all focus:outline-none focus:ring-1 focus:ring-black/5"
          style={{ 
            backgroundColor: '#F5F5F5',
            border: 'none',
            color: '#1A1A1A',
          }}
          placeholder="Enter email address"
          data-testid="input-email"
        />
        {form.formState.errors.email && (
          <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{form.formState.errors.email.message}</p>
        )}
      </div>

      {/* Write Your Message */}
      <div className="relative">
        <label 
          className="block text-sm font-medium mb-2 pl-1"
          style={{ color: '#1A1A1A' }}
        >
          Write Your Message
        </label>
        <textarea 
          rows={4}
          {...form.register("message")}
          className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl text-base transition-all focus:outline-none focus:ring-1 focus:ring-black/5 resize-none"
          style={{ 
            backgroundColor: '#F5F5F5',
            border: 'none',
            color: '#1A1A1A',
          }}
          placeholder="I want to collaborate"
          data-testid="textarea-message"
        />
        {form.formState.errors.message && (
          <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{form.formState.errors.message.message}</p>
        )}
      </div>

      {/* Button */}
      <button 
        type="submit"
        disabled={isSubmitting}
        className="w-full h-[56px] sm:h-[64px] rounded-[32px] text-lg font-semibold flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
        style={{ 
          backgroundColor: '#1A1A1A', 
          color: '#FFFFFF',
        }}
        data-testid="button-send-message"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M7 17L17 7M17 7H7M17 7V17" />
        </svg>
      </button>
    </form>
  );
}
