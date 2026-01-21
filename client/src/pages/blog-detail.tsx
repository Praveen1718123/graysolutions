import React, { useState, useEffect } from "react";
import { Link, useParams } from "wouter";
import { motion } from "framer-motion";
import logoImage from "@assets/Frame_33_copy2_2_(1)_1768895375486.png";
import Footer from "@/components/footer";

interface BlogPost {
  id: number;
  slug: string;
  category: string;
  categoryColor: string;
  title: string;
  bgColor: string;
  date: string;
  author: string;
  sections: { heading: string; content: string }[];
}

const blogPostsData: Record<string, BlogPost> = {
  "ai-marketing-copilot": {
    id: 1,
    slug: "ai-marketing-copilot",
    category: "AI & Marketing",
    categoryColor: "#7C3AED",
    title: "AI Becomes Your Marketing Co-Pilot (Not a Magic Replacement)",
    bgColor: "#F5F3FF",
    date: "Dec 27, 2025",
    author: "Gray Team",
    sections: [
      {
        heading: "AI is No Longer a Novelty",
        content: "AI is no longer a novelty — it's quickly becoming the backbone of modern marketing workflows. In 2026, the teams that win won't \"use AI sometimes.\" They'll treat it like a co-pilot embedded into daily execution: content drafting, creative iterations, audience insights, reporting, and campaign optimisation."
      },
      {
        heading: "The Real Shift in Marketing",
        content: "The real shift isn't \"ChatGPT can write a blog.\" The shift is AI becoming a marketing operating system under the hood — helping teams make faster decisions, automate repetitive actions, and personalize journeys at scale. Even the biggest ad platforms are moving toward heavier automation, where marketers provide inputs (creative + objectives + budget) and the system handles targeting, testing, and delivery logic."
      },
      {
        heading: "The Smart Question to Ask",
        content: "The smartest companies have stopped asking \"Should we use AI?\" and started asking \"Where can AI save time and improve output quality?\" The goal is simple: reduce friction and elevate human focus. Let machines handle repetitive, data-heavy work, so your team can spend more time on strategy, narrative, creative direction, and relationship-building."
      },
      {
        heading: "Actionable Tip",
        content: "Pick one manual process that quietly burns hours every week — reporting, lead qualification, competitor tracking, content repurposing — and pilot one AI workflow to reduce that workload by 30–50%. And document a basic internal policy (what's allowed, what's not, what requires human review), so AI improves consistency instead of creating chaos."
      },
      {
        heading: "The Bottom Line",
        content: "The move is not \"full automation.\" The move is human-led systems with AI acceleration — fast, measurable, and controlled."
      }
    ]
  },
  "aligning-teams-efficiency": {
    id: 2,
    slug: "aligning-teams-efficiency",
    category: "Plan Smart",
    categoryColor: "#3B82F6",
    title: "The Key to Aligning Teams and Boosting Efficiency",
    bgColor: "#EEF4FF",
    date: "Jun 3, 2025",
    author: "Samantha Collins",
    sections: [
      {
        heading: "The Problem with Manual Task Planning",
        content: "Manual assignment often causes duplicated work, missed deadlines, and overwhelmed team members juggling priorities without a clear plan. As projects grow in complexity, relying on spreadsheets or emails to assign work can lead to tasks slipping through the cracks, misunderstandings about ownership, and increased stress for everyone involved. Without a system that understands real-time workload or shifting priorities, teams quickly lose alignment, and projects fall apart despite everyone's best efforts."
      },
      {
        heading: "Why Automation Alone Isn't Enough",
        content: "Basic automation like repeating tasks or fixed workflows can reduce routine work, but static systems can't handle the realities of changing deadlines, unexpected absences, or shifting project scopes. Without context-awareness, automations may assign tasks unevenly or fail to reprioritize urgent items. Truly smart task assignment adapts dynamically, taking into account team members' capacity, previous workload patterns, and priority levels to distribute work in a way that keeps projects on track — even as requirements evolve."
      },
      {
        heading: "Bringing AI into Task Management",
        content: "Modern AI-enhanced task tools analyze your team's working patterns, project histories, and communication habits to anticipate bottlenecks before they occur. By understanding how your team collaborates and the typical pace of different tasks, these tools proactively suggest the best assignee for each task, optimal deadlines, and necessary adjustments when changes arise. This shifts workflows from reactive firefighting to a proactive, optimized process that keeps everyone aligned with less manual intervention."
      },
      {
        heading: "Results Teams Can Expect",
        content: "Teams adopting AI-driven task assignment often report completing projects faster and with fewer mistakes. By reducing redundant meetings, clarifying task ownership, and keeping everyone updated automatically, these tools create space for deep work. Over time, teams see improved morale as members focus on high-value tasks instead of chasing updates, leading to smoother handoffs, clearer accountability, and measurable improvements in overall project delivery speed and quality."
      }
    ]
  },
  "dynamic-workflows": {
    id: 3,
    slug: "dynamic-workflows",
    category: "Stay Ahead",
    categoryColor: "#3B82F6",
    title: "How Dynamic Workflows Keep Teams Moving Forward",
    bgColor: "#E8F4F8",
    date: "May 28, 2025",
    author: "Marcus Chen",
    sections: [
      {
        heading: "The Evolution of Team Workflows",
        content: "Traditional workflows were designed for predictable, linear processes. But today's teams face constantly shifting priorities, remote collaboration challenges, and the need to pivot quickly. Dynamic workflows adapt in real-time to changing conditions, ensuring that work continues to flow smoothly even when unexpected changes occur."
      },
      {
        heading: "Key Components of Dynamic Systems",
        content: "Effective dynamic workflows combine real-time status updates, automated routing rules, and intelligent prioritization. These systems monitor project health continuously and can automatically reassign tasks, adjust deadlines, or escalate blockers before they become critical issues."
      },
      {
        heading: "Implementation Best Practices",
        content: "Starting with dynamic workflows requires mapping your current processes, identifying bottlenecks, and defining clear triggers for automation. The most successful implementations begin small, focusing on one team or project type before expanding across the organization."
      },
      {
        heading: "Measuring Success",
        content: "Track metrics like cycle time, blocked task duration, and team satisfaction to gauge the impact of dynamic workflows. Teams typically see 20-40% improvements in delivery speed within the first quarter of adoption."
      }
    ]
  },
  "task-prioritization": {
    id: 4,
    slug: "task-prioritization",
    category: "Smart Priorities",
    categoryColor: "#DC2626",
    title: "Mastering Task Prioritization in Fast-Paced Teams",
    bgColor: "#FEF2F2",
    date: "May 15, 2025",
    author: "Elena Rodriguez",
    sections: [
      {
        heading: "The Prioritization Challenge",
        content: "When everything feels urgent, nothing is truly prioritized. Teams struggle with competing demands from stakeholders, unclear success criteria, and the constant pressure to do more with less. Effective prioritization starts with understanding true business value."
      },
      {
        heading: "Frameworks That Actually Work",
        content: "While popular frameworks like Eisenhower Matrix or MoSCoW provide starting points, the best teams develop customized approaches. Consider factors unique to your context: customer impact, revenue potential, technical debt reduction, and strategic alignment."
      },
      {
        heading: "Making Decisions Stick",
        content: "Prioritization fails when decisions aren't respected. Create clear escalation paths, establish review cadences, and ensure leadership supports the process. Document reasoning so future discussions start from context, not confusion."
      },
      {
        heading: "Tools and Techniques",
        content: "Modern project tools offer scoring systems, dependency mapping, and capacity planning features that support better prioritization. Combine these with regular team discussions to maintain alignment and adapt to changing conditions."
      }
    ]
  },
  "progress-insights": {
    id: 5,
    slug: "progress-insights",
    category: "Data Driven",
    categoryColor: "#059669",
    title: "Advanced Progress Insights for Modern Teams",
    bgColor: "#ECFDF5",
    date: "May 8, 2025",
    author: "David Park",
    sections: [
      {
        heading: "Beyond Basic Dashboards",
        content: "Standard progress reports show what happened, but advanced insights reveal why and predict what's next. Machine learning models can identify patterns in your team's work that humans might miss, surfacing risks and opportunities earlier."
      },
      {
        heading: "Predictive Analytics in Practice",
        content: "By analyzing historical project data, AI can forecast completion dates with increasing accuracy. These predictions account for team velocity patterns, seasonal variations, and even individual working styles to provide realistic timelines."
      },
      {
        heading: "Actionable Intelligence",
        content: "The best insights drive action. Configure alerts for early warning signs, automate status updates to stakeholders, and use trend data to support resource allocation decisions. Make data accessible without overwhelming your team."
      },
      {
        heading: "Building a Data Culture",
        content: "Progress insights are only valuable when teams trust and use them. Invest in data quality, provide training on interpretation, and celebrate decisions made with data support. Over time, data-driven thinking becomes second nature."
      }
    ]
  },
  "project-sprint-overview": {
    id: 6,
    slug: "project-sprint-overview",
    category: "Sprint Planning",
    categoryColor: "#7C3AED",
    title: "Project Sprint Overview: A Complete Guide",
    bgColor: "#F5F3FF",
    date: "Apr 25, 2025",
    author: "Jennifer Walsh",
    sections: [
      {
        heading: "Understanding Sprint Methodology",
        content: "Sprints provide a structured rhythm for teams to plan, execute, and reflect on their work. While originating in software development, sprint methodology now applies across industries for any project requiring iterative progress and regular feedback."
      },
      {
        heading: "Planning Effective Sprints",
        content: "Great sprints start with clear goals, realistic capacity planning, and well-refined backlogs. Invest time upfront to ensure everyone understands the sprint objective and their individual contributions toward it."
      },
      {
        heading: "Running Daily Operations",
        content: "Daily standups, continuous integration of completed work, and visible progress tracking keep sprints on course. Address blockers immediately and maintain focus on sprint commitments rather than incoming requests."
      },
      {
        heading: "Sprint Reviews and Retrospectives",
        content: "End each sprint by demonstrating completed work and gathering stakeholder feedback. Follow with retrospectives to identify process improvements. This dual focus on output and process creates continuous improvement."
      }
    ]
  },
  "user-activity-tracking": {
    id: 7,
    slug: "user-activity-tracking",
    category: "User Analytics",
    categoryColor: "#DC2626",
    title: "Advanced User Activity Overview",
    bgColor: "#FEF2F2",
    date: "Apr 12, 2025",
    author: "Michael Torres",
    sections: [
      {
        heading: "The Value of Activity Data",
        content: "Understanding how users interact with your product reveals opportunities for improvement, adoption blockers, and feature usage patterns. Activity tracking provides the foundation for data-driven product decisions."
      },
      {
        heading: "Implementing Tracking Responsibly",
        content: "Balance comprehensive tracking with user privacy. Be transparent about data collection, provide opt-out options, and ensure compliance with relevant regulations. Focus on aggregate patterns rather than individual surveillance."
      },
      {
        heading: "From Data to Insights",
        content: "Raw activity data requires analysis to become actionable. Build dashboards that answer specific questions, set up automated alerts for unusual patterns, and regularly review trends with cross-functional teams."
      },
      {
        heading: "Driving Product Improvements",
        content: "Use activity insights to prioritize features, identify friction points, and validate changes. A/B testing combined with activity tracking creates a powerful feedback loop for continuous product enhancement."
      }
    ]
  }
};

export default function BlogDetail() {
  const { slug } = useParams();
  const [isScrolled, setIsScrolled] = useState(false);
  
  const post = slug ? blogPostsData[slug] : null;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 150);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FAFAFA' }}>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Blog post not found</h1>
          <Link href="/blogs">
            <a className="text-blue-600 hover:underline">Back to blogs</a>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="min-h-screen w-full font-sans overflow-x-hidden"
      style={{ 
        backgroundColor: post.bgColor,
        color: '#1A1A1A',
        fontFamily: '-apple-system, system-ui, sans-serif',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Fixed Header */}
      <header 
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 md:px-0"
        style={{
          height: isScrolled ? '70px' : '80px',
          backgroundColor: 'transparent',
          pointerEvents: 'none',
          transition: 'height 500ms cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div 
          className="flex items-center justify-center"
          style={{
            pointerEvents: 'auto',
            width: isScrolled ? '180px' : '100%',
            height: isScrolled ? '44px' : '100%',
            marginTop: isScrolled ? '12px' : '0',
            backgroundColor: isScrolled ? 'rgba(255,255,255,0.92)' : post.bgColor,
            backdropFilter: isScrolled ? 'blur(12px)' : 'none',
            WebkitBackdropFilter: isScrolled ? 'blur(12px)' : 'none',
            boxShadow: isScrolled ? '0 4px 24px rgba(0,0,0,0.08)' : 'none',
            borderRadius: isScrolled ? '999px' : '0',
            padding: isScrolled ? '0 24px' : '0',
            transition: 'all 500ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <Link href="/">
            <img 
              src={logoImage} 
              alt="Gray Solutions Logo" 
              className="cursor-pointer"
              style={{
                height: isScrolled ? '28px' : '48px',
                width: 'auto',
                transition: 'height 500ms cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              data-testid="logo-nav"
            />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-28 md:pt-32 pb-20">
        <div className="max-w-[900px] mx-auto px-4 md:px-8">
          
          {/* Category */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span 
              className="text-sm font-medium"
              style={{ color: post.categoryColor }}
            >
              {post.category}
            </span>
          </motion.div>
          
          {/* Title */}
          <motion.h1 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-10 leading-tight"
            style={{ color: '#1A1A1A' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            data-testid="blog-detail-title"
          >
            {post.title}
          </motion.h1>

          {/* Hero Image */}
          <motion.div 
            className="rounded-2xl overflow-hidden mb-12"
            style={{ 
              backgroundColor: '#FFFFFF',
              boxShadow: '0 4px 40px rgba(0,0,0,0.08)',
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="aspect-[16/9] p-8 flex items-center justify-center">
              {/* Placeholder dashboard mockup */}
              <div className="w-full max-w-lg">
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-medium text-gray-500">Member Productivity Chart</span>
                    <div className="w-12 h-12 rounded-full border-4 border-blue-500 flex items-center justify-center">
                      <span className="text-xs font-bold text-blue-600">62%</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {[80, 65, 90, 45, 70].map((width, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-gray-100" />
                        <div 
                          className="h-4 rounded"
                          style={{ width: `${width}%`, backgroundColor: post.categoryColor + '40' }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content with Sidebar */}
          <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-8 md:gap-12">
            
            {/* Sidebar */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">Date</p>
                <p className="text-sm font-medium text-gray-700">{post.date}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">Author</p>
                <p className="text-sm font-medium text-gray-700">{post.author}</p>
              </div>
            </motion.div>

            {/* Article Content */}
            <motion.article 
              className="space-y-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {post.sections.map((section, index) => (
                <div key={index}>
                  <h2 className="text-xl font-bold mb-3" style={{ color: '#1A1A1A' }}>
                    {section.heading}
                  </h2>
                  <p className="text-base leading-relaxed" style={{ color: '#444444' }}>
                    {section.content}
                  </p>
                </div>
              ))}
            </motion.article>
          </div>

        </div>
      </main>

      {/* More Articles Section */}
      <section 
        className="py-16 md:py-20"
        style={{ backgroundColor: '#FAFAFA' }}
      >
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold text-center mb-12"
            style={{ color: '#1A1A1A' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            More Articles
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.values(blogPostsData)
              .filter(p => p.slug !== slug)
              .slice(0, 3)
              .map((relatedPost, index) => (
                <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                  <motion.article
                    className="rounded-2xl overflow-hidden cursor-pointer group"
                    style={{
                      backgroundColor: '#FFFFFF',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                      border: '1px solid rgba(0,0,0,0.04)',
                    }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.08)' }}
                    data-testid={`related-blog-${relatedPost.id}`}
                  >
                    {/* Image Area */}
                    <div 
                      className="aspect-[4/3] flex items-center justify-center p-6 overflow-hidden"
                      style={{ backgroundColor: relatedPost.bgColor }}
                    >
                      <div className="w-full h-full rounded-xl bg-white/60 flex items-center justify-center" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                        <div className="text-center">
                          <div className="w-16 h-16 mx-auto mb-3 rounded-xl" style={{ backgroundColor: relatedPost.categoryColor + '20' }}>
                            <div className="w-full h-full flex items-center justify-center">
                              <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: relatedPost.categoryColor + '40' }} />
                            </div>
                          </div>
                          <div className="space-y-1.5">
                            <div className="h-2 w-24 mx-auto rounded-full" style={{ backgroundColor: 'rgba(0,0,0,0.1)' }} />
                            <div className="h-2 w-16 mx-auto rounded-full" style={{ backgroundColor: 'rgba(0,0,0,0.06)' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-5">
                      <span 
                        className="text-sm font-medium"
                        style={{ color: relatedPost.categoryColor }}
                      >
                        {relatedPost.category}
                      </span>
                      <h3 
                        className="text-lg font-bold mt-2 leading-snug group-hover:text-gray-600 transition-colors"
                        style={{ color: '#1A1A1A' }}
                      >
                        {relatedPost.title}
                      </h3>
                    </div>
                  </motion.article>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <Footer />
    </motion.div>
  );
}
