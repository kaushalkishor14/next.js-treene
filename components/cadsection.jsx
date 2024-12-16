function CarSection() {
  return (
    <div className="w-full m-auto mt-5 p-4">
      <h1 className="text-3xl lg:text-6xl md:text-4xl font-bold text-gray-300 mb-8 text-center">
        Why TechTrail Academy works
      </h1>
      <section className="bg-gray-900 py-12">
        <div className="w-container mx-auto">
          <div className="w-full mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 px-6 py-6 justify-items-center">
            {/* Card 1 */}
            <div className=" p-4 rounded-lg  text-center w-full max-w-lg">
              <img
                src="/p1.png"
                alt="Personalized learning"
                className="w-20 h-20 mx-auto object-cover rounded-full mb-6 animate-bounce"
              />
              <h2 className="text-white text-2xl font-bold mb-4">
                Personalized Learning
              </h2>
              <p className="text-gray-300">
                Students practice at their own pace, first filling in gaps in
                their understanding and then accelerating their learning.
              </p>
            </div>

            {/* Card 2 */}
            <div className=" p-4 rounded-lg  text-center w-full max-w-lg">
              <img
                src="/p2.png"
                alt="Trusted content"
                className="w-20 h-20 mx-auto object-cover rounded-full mb-6 animate-bounce"
              />
              <h2 className="text-white text-2xl font-bold mb-4">
                Trusted Content
              </h2>
              <p className="text-gray-300">
                Created by experts, our library of trusted, standards-aligned
                lessons covers math, grammar, science, history, and more. It's
                all free for learners and teachers.
              </p>
            </div>

            {/* Card 3 */}
            <div className=" p-4 rounded-lg  text-center w-full max-w-lg">
              <img
                src="/p3.png"
                alt="Tools to empower teachers"
                className="w-20 h-20 mx-auto object-cover rounded-full mb-6 animate-bounce"
              />
              <h2 className="text-white text-2xl font-bold mb-4">
                Tools to Empower Teachers
              </h2>
              <p className="text-gray-300">
                With Khan Academy, teachers can identify gaps in their students'
                understanding, tailor instruction, and meet the needs of every
                student.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default CarSection;
