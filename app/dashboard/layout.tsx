import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "@/components/settings/sidebar-nav";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const sidebarNavItems = [
  {
    title: "Billing",
    href: "/dashboard/billing",
  },
  {
    title: "Stories",
    href: "/dashboard/stories",
  },
];

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  // if (!session) {
  //   redirect("/login");
  // }
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6 md:flex md:space-y-0 md:space-x-6">
        <aside className="md:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <Separator orientation="vertical" className="hidden md:block" />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
