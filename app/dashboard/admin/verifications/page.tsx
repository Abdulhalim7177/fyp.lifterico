import { createClient } from "@/lib/supabase/server";
import { VerificationList } from "@/components/admin/verification-list";
import { Suspense } from "react";
import { Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function getPendingVerifications() {
  const supabase = await createClient();
  const requests = [];

  // Fetch pending SMEs
  const { data: smes } = await supabase
    .from('sme_profiles')
    .select('id, business_name, documents, created_at')
    .eq('verification_status', 'pending');
  
  if (smes) {
    requests.push(...smes.map(s => ({
      id: s.id,
      user_id: s.id,
      name: s.business_name || "Unknown SME",
      role: 'sme',
      status: 'pending',
      documents: s.documents || [],
      submitted_at: s.created_at
    })));
  }

  // Fetch pending Logistics
  const { data: logistics } = await supabase
    .from('logistics_profiles')
    .select('id, company_name, documents, created_at')
    .eq('verification_status', 'pending');

  if (logistics) {
    requests.push(...logistics.map(l => ({
      id: l.id,
      user_id: l.id,
      name: l.company_name || "Unknown Company",
      role: 'logistics',
      status: 'pending',
      documents: l.documents || [],
      submitted_at: l.created_at
    })));
  }

  return requests;
}

async function PageContent() {
  const pendingRequests = await getPendingVerifications();

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto p-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/admin">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pending Verifications</h1>
          <p className="text-muted-foreground">Manage all business verification requests.</p>
        </div>
      </div>

      <VerificationList requests={pendingRequests} />
    </div>
  );
}

export default function PendingVerificationsPage() {
  return (
    <Suspense fallback={<div className="flex justify-center p-12"><Loader2 className="animate-spin h-8 w-8 text-primary" /></div>}>
      <PageContent />
    </Suspense>
  );
}
