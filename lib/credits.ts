import { prisma } from "./prisma";
import { auth } from "@/auth";

export const getCredits = async () => {
  const session = await auth();
  const user = await prisma.user.findUnique({
    where: { id: session?.user?.id },
    select: { credits: true },
  });
  return user?.credits ?? 0;
};

export const updateCredits = async (credits: number) => {
  const session = await auth();
  await prisma.user.update({
    where: { id: session?.user?.id },
    data: { credits: credits },
  });
};
