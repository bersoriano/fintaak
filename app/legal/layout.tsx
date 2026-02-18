import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 md:pb-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-gray max-w-none
          prose-headings:text-[#2D3142] prose-headings:font-semibold
          prose-h1:text-3xl prose-h1:sm:text-4xl prose-h1:mb-4
          prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4
          prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3
          prose-p:text-gray-600 prose-p:leading-relaxed
          prose-li:text-gray-600
          prose-a:text-[#1565C0] prose-a:no-underline hover:prose-a:underline
          prose-strong:text-[#2D3142]
          prose-table:text-sm
          prose-th:text-left prose-th:text-[#2D3142] prose-th:font-semibold prose-th:p-3 prose-th:bg-gray-50
          prose-td:p-3 prose-td:text-gray-600 prose-td:border-t prose-td:border-gray-200"
        >
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
