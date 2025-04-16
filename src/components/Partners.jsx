export default function Partners() {
    const orgs = ['Al Noor School', 'UAE Women’s Fund', 'Hope Foundation'];
  
    return (
      <section className="bg-[#D0E8F2] py-12 px-6 rounded-xl shadow-md text-center">
        <h2 className="text-2xl font-bold text-[#22577A] mb-8">Our Partners</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {orgs.map((org) => (
            <div
              key={org}
              className="bg-white px-6 py-4 rounded-lg shadow text-[#22577A] font-semibold"
            >
              {org}
            </div>
          ))}
        </div>
      </section>
    );
  }
  