import React from "react";

const holidays2025 = [
  {
    month: "January 25",
    days: [
      { name: "New Year’s Day", date: "1 January" },
      { name: "Lohri", date: "13 January" },
      { name: "Makar Sankranti", date: "14 January" },
      { name: "Republic Day", date: "26 January" },
    ],
  },
  {
    month: "February 25",
    days: [
      { name: "Basant Panchami", date: "4 February" },
      { name: "Shivaji Jayanti", date: "19 February" },
    ],
  },
  {
    month: "March 25",
    days: [
      { name: "Maha Shivratri", date: "1 March" },
      { name: "Holi", date: "14 March" },
      { name: "Good Friday", date: "29 March" },
    ],
  },
  {
    month: "April 25",
    days: [
      { name: "Ram Navmi", date: "6 April" },
      { name: "Mahavir Jayanti", date: "10 April" },
      { name: "Id-ul-Fitr", date: "11 April" },
    ],
  },
  {
    month: "May 25",
    days: [{ name: "Buddha Purnima", date: "8 May" }],
  },
  {
    month: "June 25",
    days: [{ name: "Bakrid / Eid al-Adha", date: "7 June" }],
  },
  {
    month: "July 25",
    days: [{ name: "Muharram", date: "27 July" }],
  },
  {
    month: "August 25",
    days: [
      { name: "Independence Day", date: "15 August" },
      { name: "Raksha Bandhan", date: "18 August" },
      { name: "Janmashtami", date: "26 August" },
    ],
  },
  {
    month: "September 25",
    days: [{ name: "Ganesh Chaturthi", date: "8 September" }],
  },
  {
    month: "October 25",
    days: [
      { name: "Gandhi Jayanti", date: "2 October" },
      { name: "Dussehra", date: "3 October" },
    ],
  },
  {
    month: "November 25",
    days: [
      { name: "Diwali", date: "21 November" },
      { name: "Guru Nanak Jayanti", date: "27 November" },
    ],
  },
  {
    month: "December 25",
    days: [{ name: "Christmas Day", date: "25 December" }],
  },
];

const Holidays = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Holiday</h2>
      <p className="text-center text-gray-600 mb-6">Your Complete List of Holidays for 2025</p>

      <div className="space-y-6">
        {holidays2025.map((month, index) => (
          <div key={index} className="bg-blue-100 p-4 rounded-lg shadow-md">
            <h3 className="font-bold text-lg">{month.month}</h3>
            {month.days.map((holiday, i) => (
              <div key={i} className="flex justify-between text-gray-700">
                <p>{holiday.name}</p>
                <p>{holiday.date}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Holidays;
