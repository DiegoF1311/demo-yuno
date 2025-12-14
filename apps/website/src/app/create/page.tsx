"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createChat } from "@/lib/create-mv";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const name = "my-app";
  async function handleClick() {
    setLoading(true);
    const { repoId } = await createChat(name);
    router.push(`/ai/${repoId}`);
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">AI App Builder</h1>
      <Button onClick={handleClick} disabled={loading}>
        {loading ? "Creating..." : "Create App"}
      </Button>
    </div>
  );
}
