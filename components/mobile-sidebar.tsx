"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close sidebar on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <>
      <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(true)}>
        <Menu className="h-5 w-5" />
      </Button>

      {mounted && createPortal(
        <AnimatePresence>
          {isOpen && (
            <>
                          {/* Backdrop */}
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 z-[100] bg-black/5 backdrop-blur-[1px]"
                          />
                          {/* Sidebar */}
                          <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 left-0 z-[101] h-full w-[280px] border-r border-white/10 bg-background/60 backdrop-blur-2xl shadow-2xl flex flex-col"
                          >
                            <div className="flex h-16 items-center px-6 border-b border-black/5 dark:border-white/5 justify-between shrink-0">
                               <span className="font-bold text-lg tracking-tight">Lifterico</span>
                               <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="-mr-2 h-8 w-8">
                                  <X className="h-4 w-4" />
                               </Button>
                            </div>
                            <div className="flex-1 overflow-y-auto">
                              <DashboardSidebar className="h-full" />
                            </div>
                          </motion.div>
              
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
