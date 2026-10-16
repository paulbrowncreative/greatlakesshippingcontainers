import { handleInquiry } from "@/lib/server/handle-inquiry";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function POST(request: Request) {
  return handleInquiry(request);
}
