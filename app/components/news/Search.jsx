
export default function Search({ setSearchTerm }) {
  return (
    <div className="flex justify-center mb-4">
      <input
        type="text"
        placeholder="Search posts..."
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 w-[250px] h-[40px] text-white rounded-[18px] bg-[#353535]"
      />
    </div>
  );
}
