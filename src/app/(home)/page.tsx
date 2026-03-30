import BookPillars from '@/components/content/blockpillars';
import ContentHome from '@/components/content/content';
import ContentAcademic from '@/components/content/contentAcademic';
import ContentPillars from '@/components/content/contentpillars';
import Footer from '@/components/features/homepage/footer/footer';
import FormRegister from '@/components/features/homepage/form/formregister';

export default function HomePage() {
  return (
    <>
      <div className="bg-[#fcfcfc] min-h-screen">
        <div className="mx-auto w-full max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-5xl space-y-6">
          {/* content main */}
          <ContentHome />
          {/* Pillarscontent  */}
          <ContentPillars />
          {/* bolckshow */}
          <BookPillars />
          {/* content academic */}
          <ContentAcademic />
          {/* Form contect*/}
          <FormRegister />
        </div>
        <Footer />
      </div>
    </>
  );
}
