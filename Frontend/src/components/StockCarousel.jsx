"use client";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const StockCarousel = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Refs for navigation buttons
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/stocks/slides", {
          credentials: "include",
        });
        const data = await response.json();
        setStocks(data || []);
      } catch (err) {
        console.error("Failed to fetch stock slides:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <div className="text-center text-sm">Loading stock data...</div>;
  if (!stocks.length) return <div className="text-center text-sm text-red-500">No stock data available</div>;

  return (
    <div className="relative group w-full">
      {/* Custom Arrows */}
      <div
        ref={prevRef}
        className="custom-prev absolute left-2 top-1/2 -translate-y-1/2 text-blue-500 text-xl opacity-0 scale-75 transition-all group-hover:opacity-100 group-hover:scale-100 z-10 cursor-pointer"
      >
        &#8592;
      </div>
      <div
        ref={nextRef}
        className="custom-next absolute right-2 top-1/2 -translate-y-1/2 text-blue-500 text-xl opacity-0 scale-75 transition-all group-hover:opacity-100 group-hover:scale-100 z-10 cursor-pointer"
      >
        &#8594;
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          if (typeof swiper.params.navigation !== "boolean") {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }
        }}
        className="w-full"
      >
        {stocks.map((stock, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition duration-300 text-center">
              <h3 className="text-xl font-bold mb-2">
                {stock.shortName} ({stock.symbol})
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Market Price:{" "}
                <span className="text-black dark:text-white font-medium">
                  ₹{stock.regularMarketPrice}
                </span>
              </p>
              <div className="mt-4">
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={stock.chartData}>
                    <XAxis
                      dataKey="date"
                      stroke="#ccc"
                      tick={{ fontSize: 10 }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#ccc"
                      tick={{ fontSize: 10 }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        color: "#fff",
                        borderRadius: "8px",
                      }}
                      labelStyle={{ fontSize: "12px", color: "#ddd" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="close"
                      stroke="#10b981"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default StockCarousel;
