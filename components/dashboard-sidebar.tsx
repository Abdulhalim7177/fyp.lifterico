"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Users, Truck, ShoppingBag, Globe } from "lucide-react";
import { motion } from "framer-motion";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DashboardSidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  const groups = [
    {
      label: "Platform",
      routes: [
        { 
          href: "/dashboard", 
          label: "Overview", 
          icon: LayoutDashboard 
        },
      ],
    },
    {
      label: "Workspaces",
      routes: [
        { 
          href: "/dashboard/sme", 
          label: "SME Portal", 
          icon: ShoppingBag 
        },
        { 
          href: "/dashboard/logistics", 
          label: "Logistics Hub", 
          icon: Truck 
        },
        { 
          href: "/dashboard/admin", 
          label: "Admin Console", 
          icon: Users 
        },
      ],
    },
  ];

  return (
    <div className={cn("flex flex-col h-full w-full", className)}>
      <div className="flex-1 space-y-6 py-6 overflow-y-auto px-4 scrollbar-none">
        {groups.map((group, i) => (
          <div key={i} className="space-y-2">
            <h3 className="px-2 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] opacity-60">
              {group.label}
            </h3>
            <div className="space-y-1">
              {group.routes.map((route) => {
                const isActive = pathname === route.href || (route.href !== "/dashboard" && pathname.startsWith(route.href));
                return (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                      "group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                      isActive 
                        ? "bg-primary/10 text-primary shadow-sm ring-1 ring-primary/20" 
                        : "text-muted-foreground hover:bg-black/5 dark:hover:bg-white/5 hover:text-foreground"
                    )}
                  >
                    <div className="flex items-center gap-3">
                        <route.icon className={cn("h-4 w-4 transition-colors", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                        <span>{route.label}</span>
                    </div>
                    {isActive && (
                        <motion.div 
                          layoutId="active-pill"
                          className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary),0.6)]" 
                        />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 mt-auto">
         <div className="bg-primary/10 dark:bg-primary/5 rounded-2xl p-4 border border-primary/10 backdrop-blur-md relative overflow-hidden group">
            <div className="absolute -right-2 -top-2 h-12 w-12 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all" />
            <div className="flex items-center gap-2 mb-2 relative z-10">
               <div className="p-1.5 bg-primary/20 rounded-lg">
                  <Globe className="h-3.5 w-3.5 text-primary" />
               </div>
               <span className="text-xs font-bold tracking-tight">Lifterico Net</span>
            </div>
            <p className="text-[10px] text-muted-foreground leading-relaxed relative z-10 font-medium">
               Real-time tracking enabled.
            </p>
         </div>
      </div>
    </div>
  );
}
