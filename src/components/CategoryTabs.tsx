import React from "react";

interface CategoryTabsProps {
  categories: string[];
  selectedCategory: string;
  onSelect: (cat: string) => void;
}

export function CategoryTabs({
  categories,
  selectedCategory,
  onSelect,
}: CategoryTabsProps) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-none mb-2 mt-4">
      {categories.map((cat, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(cat)}
          className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap cursor-pointer transition-all ${
            selectedCategory === cat
              ? "bg-[#059669] text-white shadow-sm"
              : "bg-white text-slate-700 hover:bg-slate-50"
          }`}
        >
          {cat === "All" && selectedCategory === "All" ? `All 🎓` : cat}
        </button>
      ))}
    </div>
  );
}
