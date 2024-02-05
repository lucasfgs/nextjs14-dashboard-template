"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "@aws-amplify/ui-react/styles.css";
import * as Auth from "aws-amplify/auth";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

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

const forgotPasswodFormSchema = z.object({
  email: z.string().email(),
});

const confirmForgotPasswordCodeSchema = z
  .object({
    confirmationCode: z.string().min(6),
    password: z
      .string()
      .min(8)
      .regex(new RegExp(/(?=.*?[A-Z])/), "At least one uppercase letter")
      .regex(new RegExp(/(?=.*?[a-z])/), "At least one lowercase letter")
      .regex(new RegExp(/(?=.*?[0-9])/), "At least one number")
      .regex(
        new RegExp(/(?=.*?[#?!@$%^&*-.])/),
        "At least one special character"
      ),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ForgotPasswordFormSchema = z.infer<typeof forgotPasswodFormSchema>;
type ConfirmForgotPasswordCodeSchema = z.infer<
  typeof confirmForgotPasswordCodeSchema
>;

export default function Login() {
  const router = useRouter();

  const [shouldConfirmPasswordCode, setShouldConfirmPasswordCode] =
    useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const forgotPasswordForm = useForm<ForgotPasswordFormSchema>({
    resolver: zodResolver(forgotPasswodFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const confirmForgotPasswordCodeForm =
    useForm<ConfirmForgotPasswordCodeSchema>({
      resolver: zodResolver(confirmForgotPasswordCodeSchema),
      defaultValues: {
        confirmationCode: "",
        confirmPassword: "",
        password: "",
      },
      shouldUnregister: true,
    });

  async function resetPassword(values: ForgotPasswordFormSchema) {
    setIsLoading(true);
    try {
      await Auth.resetPassword({
        username: values.email,
      });

      setShouldConfirmPasswordCode(true);

      //   router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong!");
      console.error("ERROR: ", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function confirmPasswordCode(values: ConfirmForgotPasswordCodeSchema) {
    setIsLoading(true);
    try {
      await Auth.confirmResetPassword({
        confirmationCode: values.confirmationCode,
        newPassword: values.password,
        username: forgotPasswordForm.getValues("email"),
      });

      router.push("/auth/login");
    } catch (error: any) {
      console.error("ERROR: ", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Reset password
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter the email address associated with your account
        </p>
      </div>
      <div className="grid gap-4">
        {shouldConfirmPasswordCode ? (
          <Form {...confirmForgotPasswordCodeForm}>
            <form
              onSubmit={confirmForgotPasswordCodeForm.handleSubmit(
                confirmPasswordCode
              )}
            >
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <FormField
                    control={forgotPasswordForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <FormControl>
                          <Input
                            id="email"
                            type="email"
                            autoCapitalize="none"
                            autoCorrect="off"
                            disabled={true}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={confirmForgotPasswordCodeForm.control}
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
                  <FormField
                    control={confirmForgotPasswordCodeForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <FormControl>
                          <Input
                            id="password"
                            placeholder="************"
                            type="password"
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
                  <FormField
                    control={confirmForgotPasswordCodeForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="confirmPassword">
                          Confirm Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="confirmPassword"
                            placeholder="************"
                            type="password"
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
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Next
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <Form {...forgotPasswordForm}>
            <form onSubmit={forgotPasswordForm.handleSubmit(resetPassword)}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <FormField
                    control={forgotPasswordForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <FormControl>
                          <Input
                            id="email"
                            type="email"
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
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Send
                </Button>
              </div>
            </form>
          </Form>
        )}
      </div>

      {/* <div className="flex flex-col text-center text-sm text-muted-foreground">
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
      </div> */}
    </div>
  );
}
