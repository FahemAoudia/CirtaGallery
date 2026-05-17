import Link from "next/link";
import { FeaturedEditForm } from "@/components/admin/FeaturedEditForm";

export default function NewFeaturedPage() {
  return (
    <div>
      <Link href="/admin/featured" className="text-[0.7rem] font-semibold uppercase text-cirta-brown/50">
        ← Salon
      </Link>
      <h1 className="admin-page-title mt-4">Nouvelle mise en avant</h1>
      <div className="mt-8">
        <FeaturedEditForm />
      </div>
    </div>
  );
}
