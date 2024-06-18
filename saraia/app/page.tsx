import Link from "next/link";
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-black to-purple-900">
      <div className="text-center">
        <h1 className="text-white text-9xl font-bold mb-6">SARA AI</h1>
        <div className="flex justify-center mb-6">
          <img src="/LogoSara.svg" alt="Logo" className="h-40 w-40" />
        </div>
        <div>
          <Button asChild className="mb-6">
            <Link href="/api/auth/signin">¡Start here!</Link>
          </Button>
        </div>
        <div>
          <Button asChild>
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
