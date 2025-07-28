export default function HiCard() {
  return (
    <section className="h-screen w-screen flex flex-col items-center justify-center bg-[#FFFFE0]">
      <img src="/images/card-hi.png" alt="hi card" className="max-h-[50vh] w-auto shadow-xl" />
      <p className="mt-4 text-center text-gray-800">Share your hi in a bold way.</p>
    </section>
  );
}
