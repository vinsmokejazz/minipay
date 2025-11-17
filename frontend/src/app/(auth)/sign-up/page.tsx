import { AuthForm } from "@/components/forms/auth-form";

export const metadata = {
  title: "MiniPay | Sign Up",
};

export default function SignUpPage() {
  return <AuthForm mode="signup" />;
}
