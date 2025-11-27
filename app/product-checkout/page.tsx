"use client";

import { useState } from "react";
import { Plus, Minus, Loader2 } from "lucide-react";

const productsList = [
  { id: 1, name: " VisitorManagmentSystem", price: 100 },
  { id: 2, name: "Payments", price: 200 },
  { id: 3, name: "SmartDailyHelp", price: 100 },
];

export default function ProductCheckout() {
  const [products, setProducts] = useState(
    productsList.map((p) => ({ ...p, qty: 0 }))
  );

  const [showPopup, setShowPopup] = useState(false);
  const [processing, setProcessing] = useState(false);

  // Increase qty
  const increase = (id: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, qty: p.qty + 1 } : p))
    );
  };

  // Decrease qty
  const decrease = (id: number) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id && p.qty > 0 ? { ...p, qty: p.qty - 1 } : p
      )
    );
  };

  const totalAmount = products.reduce(
    (sum, p) => sum + p.price * p.qty,
    0
  );

  // Checkout handler
  const handleCheckout = () => {
    if (totalAmount === 0) return;

    setShowPopup(true);
    setProcessing(true);

    // simulate backend work
    setTimeout(() => {
      setProcessing(false);
    }, 2200);
  };

  return (
    <div className="relative">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-xl mx-auto mt-10">
        <h2 className="text-2xl font-bold text-[#28B8AE] mb-6 text-center">
          Product Checkout
        </h2>

        {products.map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between bg-gray-50 p-4 rounded-xl mb-4"
          >
            <div>
              <p className="font-semibold text-gray-800">{p.name}</p>
              <p className="text-gray-500 text-sm">₹ {p.price}</p>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => decrease(p.id)}
                className="bg-red-100 hover:bg-red-200 p-2 rounded-full"
              >
                <Minus className="w-4 h-4 text-red-500" />
              </button>

              <span className="text-lg font-semibold w-6 text-center">
                {p.qty}
              </span>

              <button
                onClick={() => increase(p.id)}
                className="bg-green-100 hover:bg-green-200 p-2 rounded-full"
              >
                <Plus className="w-4 h-4 text-green-600" />
              </button>
            </div>
          </div>
        ))}

        <div className="mt-6 text-xl font-bold text-right text-gray-800">
          Total: ₹ {totalAmount}
        </div>

        <button
          disabled={totalAmount === 0}
          onClick={handleCheckout}
          className={`w-full mt-6 p-3 rounded-xl text-white font-semibold transition
            ${
              totalAmount === 0
                ? "bg-gray-300"
                : "bg-[#28B8AE] hover:bg-[#239e97]"
            }
          `}
        >
          Checkout
        </button>
      </div>

      {/* ================================
              POPUP
          ================================ */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[999]">
          <div className="bg-white p-8 rounded-3xl shadow-2xl w-[90%] max-w-sm text-center">

            {processing ? (
              <>
                <Loader2 className="w-10 h-10 mx-auto animate-spin text-[#28B8AE]" />
                <p className="mt-4 text-gray-700 font-semibold text-lg">
                  Please wait, processing...
                </p>
              </>
            ) : (
              <>
                <p className="text-xl font-bold text-green-600">Success!</p>
                <p className="text-gray-600 mt-2">
                  Checkout completed successfully.
                </p>

                <button
                  className="mt-6 bg-[#28B8AE] text-white px-6 py-2 rounded-lg hover:bg-[#239e97]"
                  onClick={() => setShowPopup(false)}
                >
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
