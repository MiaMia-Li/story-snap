// app/stories/page.tsx
import { BookOpenIcon } from "lucide-react";
import UserLogin from "@/components/header/UserLogin";
import StoriesPage from "./StoriesPage";
import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();

  const LoginPrompt = () => (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-65px)] p-6">
      <div className="text-center max-w-md">
        <div className="mb-6 p-6 bg-muted rounded-full inline-block">
          <BookOpenIcon className="h-12 w-12 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold mb-3">
          Sign in to View Your Stories
        </h2>
        <p className="text-muted-foreground mb-6">
          Please sign in to access your personal story collection and start
          creating amazing AI-generated stories.
        </p>
        <UserLogin
          buttonText="Sign In to Continue"
          buttonClassName="hover:scale-105 transition-transform duration-200"
          buttonVariant="default"
        />
      </div>
    </div>
  );

  return !session ? <LoginPrompt /> : <StoriesPage />;
}
