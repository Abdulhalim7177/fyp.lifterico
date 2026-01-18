"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { CheckCircle, Loader2 } from "lucide-react";
import Link from "next/link";

export default function Page() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push("/auth/login");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-muted/20">
      <div className="w-full max-w-sm">
        <Card className="border-green-200 shadow-lg">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-green-700">
              Sign Up Successful!
            </CardTitle>
            <CardDescription className="text-base mt-2">
              Welcome to the platform
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              Your account has been created successfully. Please check your email to confirm your registration.
            </p>
            <div className="text-sm font-medium text-muted-foreground flex items-center justify-center gap-2">
               <Loader2 className="h-4 w-4 animate-spin text-primary" />
               Redirecting to login in <span className="text-primary font-bold">{countdown}</span> seconds...
            </div>
          </CardContent>
          <CardFooter className="flex justify-center pb-6">
            <Button asChild className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold shadow-md transition-all">
              <Link href="/auth/login">
                Go to Login Now
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}