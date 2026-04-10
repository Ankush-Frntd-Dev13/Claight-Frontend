import { useState, useEffect } from "react";
import { Zap, Recycle, Droplets, ExternalLink, Loader2 } from "lucide-react";

interface MetricItem {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
  bgColor: string;
}

const metrics: MetricItem[] = [
  {
    icon: <Zap size={14} />,
    label: "Renewable Energy",
    value: 75,
    color: "#14b8a6",
    bgColor: "#ccfbf1",
  },
  {
    icon: <Recycle size={14} />,
    label: "Waste Reduction",
    value: 60,
    color: "#14b8a6",
    bgColor: "#ccfbf1",
  },
  {
    icon: <Droplets size={14} />,
    label: "Water Efficiency",
    value: 82,
    color: "#7c3aed",
    bgColor: "#ede9fe",
  },
];

const badges = ["Carbon Neutral Target 2025", "Tier 1 Certified", "ISO 14001"];

const SustainabilityTrackerCard = () => {
  const [animated, setAnimated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpen = () => {
    const newTab = window.open("about:blank", "_blank");
    setIsLoading(true);
    setTimeout(() => {
      if (newTab) {
        newTab.location.href =
          "https://sustainability.procurementresource.com/login?utam_cli=$2a$15$BkVVmRsU4w2da3yVLBERG.HuBS.gsQy5DWaL5YFaH1mh9Phtl4GaC";
      }
      setIsLoading(false);
    }, 2000);
  };

  useEffect(() => {
    const t = requestAnimationFrame(() => setAnimated(true));
    return () => cancelAnimationFrame(t);
  }, []);

  return (
    <article onClick={handleOpen} className="bg-card rounded-2xl p-5 shadow-sm border border-border flex flex-col h-full cursor-pointer hover:shadow-md hover:border-primary-200 transition-all duration-200">
      {/* Header */}
      <div className="mb-4">
        <h2 className="font-body text-lg font-semibold text-text-primary">
          Sustainability Tracker
        </h2>
        <p className="text-sm text-text-muted mt-0.5 w-full leading-relaxed">
          Intelligent Journeys,The Modern Explorer & Experience With Intelligent
          AI
        </p>
      </div>

      {/* ESG Grade + Metrics */}
      <div className="flex gap-5 flex-1">
        {/* ESG Grade */}
        <div className="flex flex-col items-center justify-center shrink-0">
          <div className="w-16 h-16 rounded-2xl bg-surface border border-border flex items-center justify-center">
            <span className="text-xl font-bold text-[#14b8a6] font-body">
              A+
            </span>
          </div>
          <span className="text-[10px] text-text-muted font-medium mt-1.5">
            ESG Grade
          </span>
        </div>

        {/* Progress bars */}
        <div className="flex flex-col gap-4 flex-1 justify-center">
          {metrics.map((item, i) => (
            <div key={item.label}>
              <div className="flex items-center justify-between mb-1.5">
                <div
                  className="flex items-center gap-1.5"
                  style={{ color: item.color }}
                >
                  {item.icon}
                  <span className="text-xs font-medium text-text-secondary">
                    {item.label}
                  </span>
                </div>
                <span
                  className="text-xs font-bold"
                  style={{ color: item.color }}
                >
                  {item.value}%
                </span>
              </div>
              <div
                className="w-full h-2 rounded-full"
                style={{ backgroundColor: item.bgColor }}
              >
                <div
                  className="h-full rounded-full ease-out"
                  style={{
                    width: animated ? `${item.value}%` : "0%",
                    backgroundColor: item.color,
                    transitionProperty: "width",
                    transitionDuration: `${700 + i * 150}ms`,
                  }}
                />
              </div>
            </div>
          ))}
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
              Open Sustainability Tracker <ExternalLink size={12} />
            </>
          )}
        </button>
      </div>
    </article>
  );
};

export default SustainabilityTrackerCard;
