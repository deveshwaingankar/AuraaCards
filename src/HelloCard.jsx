export default function HelloCard() {
  return (
    <section className="h-screen w-screen flex flex-col items-center justify-center bg-[#d1f5e0]">
      <img
        src="/images/card-hello.png"
        alt="honored card"
        className="max-h-[50vh] w-auto shadow-xl"
      />
      <p className="mt-4 text-center text-gray-800">Make a lasting impression.</p>
      <button className="mt-2 px-4 py-2 bg-orange-500 text-black rounded-xl hover:bg-orange-600 transition">
        Get Now
      </button>
    </section>
  );
}
