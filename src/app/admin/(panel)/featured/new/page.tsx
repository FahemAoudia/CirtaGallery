import Link from "next/link";
import { FeaturedEditForm } from "@/components/admin/FeaturedEditForm";

export default function NewFeaturedPage() {
  return (
    <div>
      <Link href="/admin/featured" className="text-[0.7rem] font-semibold uppercase text-cirta-brown/50">
        ← Salon
      </Link>
      <h1 className="mt-4 font-serif text-3xl font-medium tracking-tight">Nouvelle mise en avant</h1>
      <div className="mt-8">
        <FeaturedEditForm />
      </div>
    </div>
  );
}
