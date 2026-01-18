"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Building, Truck } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

interface VerificationRequest {
  id: string;
  user_id: string;
  name: string;
  role: string;
  status: string;
  documents: any[];
  submitted_at: string;
}

interface CompactVerificationListProps {
  requests: VerificationRequest[];
}

export function CompactVerificationList({ requests }: CompactVerificationListProps) {
  if (requests.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-sm text-muted-foreground">No pending requests.</p>
      </div>
    );
  }

  // Show only top 5 in compact mode
  const displayRequests = requests.slice(0, 5);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {displayRequests.map((req) => (
          <div key={req.id} className="flex items-center justify-between p-3 bg-muted/40 rounded-lg border hover:bg-muted/60 transition-colors">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="p-2 bg-background rounded-full border shrink-0">
                {req.role === 'sme' ? (
                  <Building className="h-4 w-4 text-primary" />
                ) : (
                  <Truck className="h-4 w-4 text-blue-600" />
                )}
              </div>
              <div className="grid gap-0.5">
                <span className="font-medium text-sm truncate">{req.name}</span>
                <span className="text-xs text-muted-foreground capitalize">{req.role}</span>
              </div>
            </div>
            <Button variant="ghost" size="sm" asChild className="h-8 w-8 p-0">
              <Link href={`/dashboard/admin/verifications/${req.id}?role=${req.role}`}>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            </Button>
          </div>
        ))}
      </div>
      
      {requests.length > 5 && (
        <div className="text-center text-xs text-muted-foreground">
          +{requests.length - 5} more
        </div>
      )}

      <Button variant="outline" className="w-full" asChild>
        <Link href="/dashboard/admin/verifications">
          View All Requests
        </Link>
      </Button>
    </div>
  );
}
