import { useState, useEffect } from "react";
import { Check, AlertTriangle, ArrowRight } from "lucide-react";
import BookingProgress from "./components/BookingProgress";

function App() {
  const [skips, setSkips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedYardSkip, setSelectedYardSkip] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Fetch skip data
  useEffect(() => {
    const fetchSkips = async () => {
      try {
        const response = await fetch(
          "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch skip data");
        }
        const data = await response.json();

        const transformedSkipsData = data.map((skip) => {
          // Calculate VAT, price including VAT
          const vatPrice = ((skip.price_before_vat * skip.vat) / 100).toFixed(2);
          const priceWithVat = (
            skip.price_before_vat *
            (1 + skip.vat / 100)
          ).toFixed(2);
          const formattedPrice = `£${priceWithVat}`;

          // Returns fetched skip data with included vatPrice and formattedPrice for display
          return {
            ...skip,
            vatPrice: vatPrice,
            formattedPrice: formattedPrice,
          };
        });

        setSkips(transformedSkipsData);
      } catch (err) {
        console.error("Error fetching skips:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSkips();
  }, []);

  const selectedSkipData = selectedYardSkip
    ? skips.find((skip) => skip.id.toString() === selectedYardSkip)
    : null;

  const handleSkipSelection = (skipId) => {
    setSelectedYardSkip(skipId);
    setShowConfirmation(true);
  };

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto mb-4"></div>
          <p className="text-sky-900">Loading skip selection...</p>
        </div>
      </div>
    );
  }

  // No Yard Skip data
  if (!loading && skips.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <BookingProgress />
        <main className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="w-24 h-24 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-12 h-12 text-orange-500" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              No Skips Available
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto text-lg">
              We're sorry, but there are currently no skip options available.
              Please try again later.
            </p>

            <div className="space-y-6">
              <button
                onClick={() => window.location.reload()}
                className="bg-sky-600 hover:bg-sky-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                Try Again
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <BookingProgress />
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
            Choose Your Skip Size
          </h2>
          <p className="text-gray-600 text-center">
            Select the perfect skip size for your project.
          </p>
        </div>

        {/* Skip List */}
        <div className="space-y-6">
          {skips.map((skip) => (
            <div
              key={skip.id}
              className={`bg-white border rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg ${
                selectedYardSkip === skip.id.toString()
                  ? "ring-2 ring-sky-500 shadow-md"
                  : ""
              }`}
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 relative">
                  <img
                    src={`https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/${skip.size}-yarder-skip.jpg`}
                    alt={`${skip.size} Yard Skip`}
                    className="w-full h-full object-cover"
                  />
                  {selectedYardSkip === skip.id.toString() && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white p-2 rounded-full">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                </div>

                <div className="p-6 md:w-2/3 flex flex-col">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {skip.size} Yard Skip
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {skip.hire_period_days} day hire period
                      </p>
                    </div>
                    <div className="mt-2 md:mt-0 md:text-right">
                      <div className="text-3xl font-bold text-sky-600">
                        {skip.formattedPrice}
                      </div>
                      <p className="text-gray-500 text-sm">includes VAT</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">
                    {skip.size <= 8
                      ? "Perfect for small to medium home renovation projects and garden clearance."
                      : skip.size <= 14
                      ? "Ideal for larger renovation projects and substantial waste removal."
                      : "Great for commercial projects and large-scale waste disposal."}
                  </p>
                  <div className="mb-6">
                    <ul className="space-y-2">
                      <li className="flex items-center text-gray-600">
                        <Check className="w-4 h-4 text-green-500 mr-2" />
                        {skip.allowed_on_road
                          ? "Road placement allowed"
                          : "Private land only"}
                      </li>
                      <li className="flex items-center text-gray-600">
                        <Check className="w-4 h-4 text-green-500 mr-2" />
                        {skip.allows_heavy_waste
                          ? "Heavy waste allowed"
                          : "Standard waste only"}
                      </li>
                      {skip.transport_cost && (
                        <li className="flex items-center text-gray-600">
                          <Check className="w-4 h-4 text-green-500 mr-2" />
                          Transport: £{skip.transport_cost}.00
                        </li>
                      )}
                      {skip.per_tonne_cost && (
                        <li className="flex items-center text-gray-600">
                          <Check className="w-4 h-4 text-green-500 mr-2" />
                          Per tonne: £{skip.per_tonne_cost}.00
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="mt-auto">
                    <button
                      className={`w-full md:w-auto py-3 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                        selectedYardSkip === skip.id.toString()
                          ? "bg-green-500 hover:bg-green-600 text-white"
                          : "bg-sky-600 hover:bg-sky-700 text-white"
                      }`}
                      onClick={() => handleSkipSelection(skip.id.toString())}
                    >
                      {selectedYardSkip === skip.id.toString() ? (
                        <>
                          <Check className="w-4 h-4" />
                          Selected
                        </>
                      ) : (
                        <>
                          Select This Skip
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Selection Confirmation Modal */}
        {showConfirmation && selectedSkipData && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-md w-full shadow-2xl">
              <div className="p-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Great Choice!
                  </h3>
                  <p className="text-gray-600">Review your selection below</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Skip Size:</span>
                    <span className="font-semibold text-gray-900">
                      {selectedSkipData.size} Yard Skip
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Hire Period:</span>
                    <span className="font-semibold text-gray-900">
                      {selectedSkipData.hire_period_days} days
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Placement:</span>
                    <span
                      className={`font-semibold ${
                        selectedSkipData.allowed_on_road
                          ? "text-green-600"
                          : "text-amber-600"
                      }`}
                    >
                      {selectedSkipData.allowed_on_road
                        ? "Road & Private Land"
                        : "Private Land Only"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Heavy Waste:</span>
                    <span
                      className={`font-semibold ${
                        selectedSkipData.allows_heavy_waste
                          ? "text-green-600"
                          : "text-amber-600"
                      }`}
                    >
                      {selectedSkipData.allows_heavy_waste
                        ? "Allowed"
                        : "Not Allowed"}
                    </span>
                  </div>
                  {selectedSkipData.transport_cost && (
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">
                        Transport Cost (not-included):
                      </span>
                      <span className="font-semibold text-gray-900">
                        £{selectedSkipData.transport_cost.toFixed(2)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Price (before VAT):</span>
                    <span className="font-semibold text-gray-900">
                      £{selectedSkipData.price_before_vat.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">
                      VAT ({selectedSkipData.vat}%):
                    </span>
                    <span className="font-semibold text-gray-900">
                      £{selectedSkipData.vatPrice}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-900 font-semibold">
                      Total Price:
                    </span>
                    <span className="font-bold text-sky-600 text-xl">
                      {selectedSkipData.formattedPrice}
                    </span>
                  </div>
                </div>

                {!selectedSkipData.allowed_on_road && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
                      <div>
                        <p className="text-amber-800 font-medium text-sm">
                          Private Land Placement Only
                        </p>
                        <p className="text-amber-700 text-sm mt-1">
                          This skip can only be placed on private property, not
                          on public roads.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {!selectedSkipData.allows_heavy_waste && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-blue-800 font-medium text-sm">
                          Standard Waste Only
                        </p>
                        <p className="text-blue-700 text-sm mt-1">
                          This skip is suitable for general household and garden
                          waste only.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowConfirmation(false)}
                    className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-semibold transition-all duration-300"
                  >
                    Change Selection
                  </button>
                  <button
                    onClick={() => {
                      setShowConfirmation(false);
                    }}
                    className="flex-1 py-3 px-4 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-semibold transition-all duration-300"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">&copy; 2025. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
