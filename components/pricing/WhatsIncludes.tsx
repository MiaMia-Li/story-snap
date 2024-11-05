// components/whats-includes.tsx
import {
  Sparkles,
  Palette,
  Download,
  Clock,
  MessageSquare,
  Settings,
  Wand2,
  BookOpen,
  Share2,
} from "lucide-react";

const features = [
  {
    icon: Wand2,
    title: "AI Story Generation",
    description: "Create unique stories with advanced AI technology",
  },
  {
    icon: Palette,
    title: "Style Customization",
    description: "Choose from various writing styles and tones",
  },
  {
    icon: BookOpen,
    title: "All Story Types",
    description: "Access every category and genre available",
  },
  {
    icon: Settings,
    title: "Character Control",
    description: "Full control over character development",
  },
  {
    icon: Clock,
    title: "Lifetime Access",
    description: "Credits never expire, use at your own pace",
  },
  {
    icon: Download,
    title: "Export Options",
    description: "Download stories in multiple formats",
  },
  {
    icon: Share2,
    title: "Easy Sharing",
    description: "Share your stories with others instantly",
  },
  {
    icon: MessageSquare,
    title: "Priority Support",
    description: "Get help whenever you need it",
  },
  {
    icon: Sparkles,
    title: "Regular Updates",
    description: "Access to new features as they launch",
  },
];

export function WhatsIncludes() {
  return (
    <div className="container max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-3">
          Everything You Need to Create Amazing Stories
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Every plan includes access to our full suite of features. No
          restrictions, no hidden costs.
        </p>
      </div>

      <div className="grid gap-x-12 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <div key={feature.title} className="flex items-start group">
            <div className="mr-4 p-2 rounded-lg bg-primary/5 group-hover:bg-primary/10 transition-colors duration-200">
              <feature.icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium mb-1 group-hover:text-primary transition-colors duration-200">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 pt-8 border-t">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-3xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-primary/5">
              <MessageSquare className="h-5 w-5 text-primary" />
            </div>
            <p className="text-sm">Need help choosing? We are here to help</p>
          </div>
          <button className="px-4 py-2 rounded-full bg-primary/5 hover:bg-primary/10 transition-colors duration-200 text-sm font-medium">
            Contact Sales Team
          </button>
        </div>
      </div>
    </div>
  );
}
