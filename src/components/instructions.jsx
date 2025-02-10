import React, { useState } from 'react';

const Instructions = () => {
  const [openDropdown, setOpenDropdown] = useState(null); // ✅ No TypeScript types

  const toggleDropdown = (title) => {
    setOpenDropdown(openDropdown === title ? null : title);
  };

  return (
<div className='mx-4 md:mx-20 my-6 md:my-12'>
          <div className="mb-4">
        <button
          onClick={() => toggleDropdown('How to Use')}
          className="w-full bg-black text-white p-4 flex justify-between items-center"
        >
          <span className="font-medium">How to Use</span>
          <svg
            className={`w-5 h-5 transition-transform ${openDropdown === 'How to Use' ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {openDropdown === 'How to Use' && (
          <div className="p-4 border border-gray-200 space-y-4">
            <div><span className="font-semibold">Warm the oil: </span>Gently heat the oil mixture to a warm temperature.</div>
            <div><span className="font-semibold">Massage: </span>Apply the warmed oil to your scalp and massage it in gently.</div>
            <div><span className="font-semibold">Leave in: </span>Leave the oil in your hair for at least 30 minutes, or overnight for deeper penetration.</div>
            <div><span className="font-semibold">Wash out: </span>Shampoo and condition your hair as usual to remove the oil.</div>
            <div><span className="font-semibold">Repeat regularly: </span>For best results, use the hair oil regularly, ideally 2-3 times a week.</div>
          </div>
        )}
      </div>

      {/* Ingredients Dropdown */}
      <div className="mb-4">
        <button
          onClick={() => toggleDropdown('Ingredients')}
          className="w-full bg-black text-white p-4 flex justify-between items-center"
        >
          <span className="font-medium">Ingredients</span>
          <svg
            className={`w-5 h-5 transition-transform ${openDropdown === 'Ingredients' ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {openDropdown === 'Ingredients' && (
            <div className="p-4 border border-gray-200">
  <h3 className="font-semibold mb-2">Herbs and Plants:</h3>
  <div className="grid grid-cols-2 gap-2">
    {[
      "Jatamansi", "Amla", "Bhringaraj", "Kesharaj", "Neem", "Tulsi",
      "Henna", "Shikakai", "Aritha", "Kari Patta", "Brahmi", "Dhatri",
      "Gundali", "Jyotishmati", "Kamal", "Karanj", "Lajjalu", "Nagarmotha",
      "Sariva", "Vetiver"
    ].map((herb, index) => (
      <span key={index} className="block">{herb}</span>
    ))}
  </div>
</div>


        )}
      </div>
    </div>
  );
};

export default Instructions;
