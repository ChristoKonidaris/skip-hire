import { IdCard, Calendar, CreditCard, Check, Truck } from "lucide-react";

// Hardcoded booking progress for the purpose of this code challenge
const BookingProgress = () => {
  return (
    <div className="sticky top-0 z-40 bg-white border-b border-gray-200 py-4">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
              <Check className="w-4 h-4" />
            </div>
            <span className="mt-2 text-xs font-medium text-sky-700">
              Location
            </span>
          </div>
          <div className="flex-1 flex items-center">
            <div className="h-1 w-full bg-green-500"></div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
              <Check className="w-4 h-4" />
            </div>
            <span className="mt-2 text-xs font-medium text-sky-700">
              Waste Type
            </span>
          </div>
          <div className="flex-1 flex items-center">
            <div className="h-1 w-full bg-sky-600"></div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-sky-600 flex items-center justify-center text-white font-bold">
              <Truck className="w-6 h-6" />
            </div>
            <span className="mt-2 text-xs font-medium text-sky-700">
              Select Skip
            </span>
          </div>
          <div className="flex-1 flex items-center">
            <div className="h-1 w-full bg-gray-300"></div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-sky-600 flex items-center justify-center text-white font-bold">
              <IdCard className="w-6 h-6" />
            </div>
            <span className="mt-2 text-xs font-medium text-sky-700">
              Permit Check
            </span>
          </div>
          <div className="flex-1 flex items-center">
            <div className="h-1 w-full bg-gray-300"></div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-sky-600 flex items-center justify-center text-white font-bold">
              <Calendar className="w-6 h-6" />
            </div>
            <span className="mt-2 text-xs font-medium text-sky-700">
              Choose Date
            </span>
          </div>
          <div className="flex-1 flex items-center">
            <div className="h-1 w-full bg-gray-300"></div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-sky-600 flex items-center justify-center text-white font-bold">
              <CreditCard className="w-6 h-6" />
            </div>
            <span className="mt-2 text-xs font-medium text-sky-700">
              Payment
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingProgress;
