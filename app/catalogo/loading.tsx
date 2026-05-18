import Container from "@/components/ui/Container";

import SkeletonCard from "@/components/ui/SkeletonCard";

export default function Loading() {

  return (
    <main className="min-h-screen bg-black text-white pt-32">

      <Container>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">

          {Array.from({ length: 15 }).map(
            (_, i) => (

              <SkeletonCard key={i} />

            )
          )}

        </div>

      </Container>

    </main>
  );
}