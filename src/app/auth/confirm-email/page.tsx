"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import "@aws-amplify/ui-react/styles.css";
import * as Auth from "aws-amplify/auth";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  confirmationCode: z.string().min(6),
});

type FormSchema = z.infer<typeof formSchema>;

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      confirmationCode: "",
    },
  });

  async function onSubmit(values: FormSchema) {
    setIsLoading(true);
    try {
      const email = searchParams.get("email");

      if (!email) {
        toast.error("Email not found");
        return router.push("/auth/login");
      }

      const confirmedUser = await Auth.confirmSignUp({
        username: email,
        confirmationCode: values.confirmationCode,
      });

      if (confirmedUser.isSignUpComplete) {
        await Auth.autoSignIn();
        router.push("/dashboard");
      }
    } catch (error: any) {
      toast.error("Invalid code provided, please request a code again.");
      console.error("ERROR: ", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function resendCode() {
    setIsLoading(true);
    try {
      const email = searchParams.get("email");

      if (!email) {
        toast.error("Email not found");
        return router.push("/auth/login");
      }

      await Auth.resendSignUpCode({
        username: email,
      });
    } catch (error: any) {
      console.error("ERROR: ", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Confirm</h1>
        <p className="text-sm text-muted-foreground">
          Enter the code sent to your email
        </p>
      </div>
      <div className="grid gap-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="confirmationCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="confirmationCode">
                        Confirmation Code
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="confirmationCode"
                          autoCapitalize="none"
                          autoCorrect="off"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Next
              </Button>
            </div>
          </form>
        </Form>
      </div>

      <div className="flex flex-col text-center text-sm text-muted-foreground">
        Code not found or invalid?{" "}
        <Button
          variant={"secondary"}
          size={"sm"}
          className="mt-2"
          onClick={() => resendCode()}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Resend
        </Button>
      </div>
    </div>
  );
}
