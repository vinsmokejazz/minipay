import { AuthForm } from "@/components/forms/auth-form";

export const metadata = {
  title: "MiniPay | Sign In",
};

export default function SignInPage() {
  return <AuthForm mode="signin" />;
}
