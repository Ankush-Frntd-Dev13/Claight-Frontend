import { useState, useRef, useEffect } from "react";
import { ExternalLink, Loader2, ChevronLeft, ChevronRight } from "lucide-react";

const destinations = [
  { name: "Bangladesh", flag: "🇧🇩" },
  { name: "India", flag: "🇮🇳" },
  { name: "Pakistan", flag: "🇵🇰" },
  { name: "Turkey", flag: "🇹🇷" },
];

const origins = [
  {
    name: "Indonesia",
    flag: "🇮🇩",
    values: [
      { text: "25.0%", color: "#b8860b" },
      { text: "0.3%", color: "#10b981" },
      { text: "32.4 USD", color: "#b8860b" },
      { text: "31.2%", color: "#b8860b" },
    ],
  },
  {
    name: "Malaysia",
    flag: "🇲🇾",
    values: [
      { text: "25.0%", color: "#b8860b" },
      { text: "0.3%", color: "#10b981" },
      { text: "32.4 USD", color: "#b8860b" },
      { text: "21.8%", color: "#b8860b" },
    ],
  },
  {
    name: "Singapore",
    flag: "🇸🇬",
    values: [
      { text: "25.0%", color: "#b8860b" },
      { text: "0.3%", color: "#10b981" },
      { text: "32.4 USD", color: "#b8860b" },
      { text: "31.2%", color: "#b8860b" },
    ],
  },
  {
    name: "Vietnam",
    flag: "🇻🇳",
    values: [
      { text: "18.5%", color: "#10b981" },
      { text: "1.2%", color: "#b8860b" },
      { text: "28.7 USD", color: "#10b981" },
      { text: "24.6%", color: "#b8860b" },
    ],
  },
  {
    name: "Thailand",
    flag: "🇹🇭",
    values: [
      { text: "20.5%", color: "#b8860b" },
      { text: "0.5%", color: "#10b981" },
      { text: "29.8 USD", color: "#10b981" },
      { text: "23.1%", color: "#b8860b" },
    ],
  },
];

const SourcingCompassCard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -120 : 120, behavior: "smooth" });
  };

  const handleOpen = () => {
    // Open new blank tab immediately
    const newTab = window.open("about:blank", "_blank");
    setIsLoading(true);
    // Redirect the tab to the URL after 2 seconds
    setTimeout(() => {
      if (newTab) {
        newTab.location.href =
          "https://sourcingcompass.procurementresource.com/login?utam_cli=$2a$15$BkVVmRsU4w2da3yVLBERG.HuBS.gsQy5DWaL5YFaH1mh9Phtl4GaC";
      }
      setIsLoading(false);
    }, 2000);
  };

  return (
    <article onClick={handleOpen} className="bg-card rounded-2xl p-5 shadow-sm border border-border flex flex-col h-full cursor-pointer hover:shadow-md hover:border-primary-200 transition-all duration-200 overflow-hidden">
      {/* Header */}
      <div className="mb-4">
        <h2 className="font-body text-lg font-semibold text-text-primary">
          Sourcing Compass
        </h2>
        <p className="text-sm text-text-muted mt-0.5 w-full leading-relaxed">
          Instantly compare tariffs across all origin & destination country
          combinations.
        </p>
      </div>

      {/* Tariff Table */}
      <div className="relative flex-1 -mx-1">
        {/* Left arrow */}
        {canScrollLeft && (
          <button
            onClick={(e) => { e.stopPropagation(); scroll("left"); }}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-7 h-7 bg-primary-50 border border-primary-200 rounded-full flex items-center justify-center shadow-md cursor-pointer hover:bg-primary-100 transition-colors hidden max-[1024px]:flex"
          >
            <ChevronLeft size={14} className="text-primary-500" />
          </button>
        )}

        {/* Right arrow */}
        {canScrollRight && (
          <button
            onClick={(e) => { e.stopPropagation(); scroll("right"); }}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-7 h-7 bg-primary-50 border border-primary-200 rounded-full flex items-center justify-center shadow-md cursor-pointer hover:bg-primary-100 transition-colors hidden max-[1024px]:flex"
          >
            <ChevronRight size={14} className="text-primary-500" />
          </button>
        )}

      <div ref={scrollRef} onScroll={checkScroll} className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-[10px] sm:text-xs min-w-[400px]">
          {/* Header row */}
          <thead>
            <tr className="bg-gradient-to-r from-[#2d1b69] to-[#4c1d95] text-white">
              <th className="text-left py-1.5 sm:py-2 px-2 sm:px-3 rounded-tl-lg font-semibold whitespace-nowrap">
                Tariff %
              </th>
              {destinations.map((dest) => (
                <th
                  key={dest.name}
                  className="py-1.5 sm:py-2 px-2 sm:px-3 font-semibold whitespace-nowrap last:rounded-tr-lg"
                >
                  <span className="flex items-center justify-center gap-1">
                    <span>{dest.name}</span>
                    <span>{dest.flag}</span>
                  </span>
                </th>
              ))}
            </tr>
          </thead>

          {/* Data rows */}
          <tbody>
            {origins.map((origin, i) => (
              <tr
                key={origin.name}
                className={i % 2 === 0 ? "bg-primary-50/40" : "bg-white"}
              >
                <td className="py-2 sm:py-2.5 px-2 sm:px-3 whitespace-nowrap">
                  <span className="flex items-center gap-1.5 sm:gap-2">
                    <span className="text-sm sm:text-base">{origin.flag}</span>
                    <span className="font-medium text-text-primary">
                      {origin.name}
                    </span>
                  </span>
                </td>
                {origin.values.map((val, j) => (
                  <td
                    key={j}
                    className="py-2 sm:py-2.5 px-2 sm:px-3 text-center whitespace-nowrap"
                  >
                    <span className="flex items-center justify-center gap-1">
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: val.color }}
                      />
                      <span
                        className="font-semibold"
                        style={{ color: val.color }}
                      >
                        {val.text}
                      </span>
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>

      {/* Redirect link */}
      <div className="mt-4 pt-3 border-t border-border">
        <button
          onClick={handleOpen}
          disabled={isLoading}
          className="flex items-center gap-1 text-xs font-semibold text-primary-500 hover:text-primary-700 transition-colors disabled:opacity-60 cursor-pointer"
        >
          {isLoading ? (
            <>
              <Loader2 size={12} className="animate-spin" />
              Opening...
            </>
          ) : (
            <>
              Open Sourcing Compass <ExternalLink size={12} />
            </>
          )}
        </button>
      </div>
    </article>
  );
};

export default SourcingCompassCard;
