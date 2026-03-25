import BookPillars from "@/components/content/blockpillars";
import ContentHome from "@/components/content/content";
import ContentAcademic from "@/components/content/contentAcademic";
import ContentPillars from "@/components/content/contentpillars";

export default function HomePage() {
  return (
    <>
      <div className="bg-[#fcfcfc] min-h-screen">
        <div className="mx-auto w-full max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-5xl space-y-6">
          <ContentHome />
          <ContentPillars />
          <BookPillars/>
          <ContentAcademic/>
        </div>
      </div>
    </>
  );
}
