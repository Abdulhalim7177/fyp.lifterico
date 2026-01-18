import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShieldAlert, ArrowRight, Clock, AlertTriangle, XCircle } from "lucide-react";

interface VerificationGateProps {
  status: 'unverified' | 'pending' | 'rejected' | 'verified';
  reason?: string | null;
}

export function VerificationGate({ status, reason }: VerificationGateProps) {
  if (status === 'verified') return null;

  const isRejection = status === 'rejected';
  const isReupload = status === 'unverified' && reason;
  const isResubmission = status === 'pending' && reason;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full max-w-2xl mx-auto p-4">
      <Card className={`w-full ${isRejection ? 'border-red-500/50 bg-red-50 dark:bg-red-950/10' : 'border-orange-500/50 bg-orange-50 dark:bg-orange-950/10'}`}>
        <CardHeader className="text-center">
          <div className={`mx-auto p-4 rounded-full w-fit mb-4 ${isRejection ? 'bg-red-100 dark:bg-red-900/30' : 'bg-orange-100 dark:bg-orange-900/30'}`}>
            {status === 'pending' ? (
              <Clock className="h-10 w-10 text-orange-600 dark:text-orange-500" />
            ) : isRejection ? (
              <XCircle className="h-10 w-10 text-red-600 dark:text-red-500" />
            ) : (
              <ShieldAlert className="h-10 w-10 text-orange-600 dark:text-orange-500" />
            )}
          </div>
          <CardTitle className={`text-2xl font-bold ${isRejection ? 'text-red-800 dark:text-red-500' : 'text-orange-800 dark:text-orange-500'}`}>
            {status === 'pending' ? (isResubmission ? 'Update Submitted' : 'Verification In Progress') : 
             isRejection ? 'Verification Rejected' :
             isReupload ? 'Action Required' : 'Account Not Verified'}
          </CardTitle>
          <CardDescription className={`${isRejection ? 'text-red-700/80' : 'text-orange-700/80'} dark:text-opacity-80 text-base max-w-md mx-auto`}>
            {status === 'pending' 
              ? (isResubmission 
                  ? "You have updated your profile. Our team will review your changes shortly."
                  : "Your documents have been submitted and are currently under review by our admin team. You will be notified once approved.")
              : isRejection 
                ? "Your verification request has been rejected. Please review the reason below."
                : "Your account requires verification to access system services."
            }
          </CardDescription>
        </CardHeader>
        
        {reason && (
          <CardContent>
            <div className={`relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground ${isRejection ? "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive" : "border-orange-500/50 text-orange-800 bg-orange-100/50 [&>svg]:text-orange-600"}`}>
              <AlertTriangle className="h-4 w-4" />
              <h5 className="mb-1 font-medium leading-none tracking-tight">Admin Message</h5>
              <div className="text-sm [&_p]:leading-relaxed">
                {reason}
              </div>
            </div>
          </CardContent>
        )}

        <CardFooter className="justify-center pb-8 gap-4">
          {status !== 'pending' && !isRejection && (
            <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700 text-white border-none shadow-lg">
              <Link href="/dashboard/settings">
                {isReupload ? 'Update Documents' : 'Complete Verification'} <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          )}
          {isRejection && (
             <Button variant="outline" className="border-red-200 text-red-700 hover:bg-red-50">
               Contact Support
             </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
