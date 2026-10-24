import { Link } from "react-router-dom";

export const defaultSizes = ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "12"];

/**
 * sizes:       list of size labels
 * value:       the selected size (or null)
 * onChange:    (size) => void
 * unavailable: sizes that are sold out (shown crossed out and disabled)
 * error:       shows "Please select a size"
 * guideTo:     optional link for the "Size guide" text
 */
const SizeSelector = ({ sizes = defaultSizes, value, onChange, unavailable = [], error = false, unit = "US", guideTo }) => {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <p id="size-label" className="text-[11px] font-bold text-neutral-900">
          Select size <span className="font-medium text-neutral-500">({unit})</span>
        </p>

        {error ? (
          <p role="alert" className="text-[11px] font-medium text-red-600">Please select a size</p>
        ) : (
          guideTo && (
            <Link to={guideTo} className="text-[11px] font-medium text-neutral-500 underline underline-offset-4 transition-colors hover:text-[#ff5a1f]">
              Size guide
            </Link>
          )
        )}
      </div>

      <div role="radiogroup" aria-labelledby="size-label" className="grid grid-cols-5 gap-2">
        {sizes.map((s) => {
          const soldOut = unavailable.includes(s);
          const selected = value === s;

          return (
            <button
              key={s}
              role="radio"
              aria-checked={selected}
              disabled={soldOut}
              onClick={() => onChange?.(s)}
              className={`h-11 border text-[12px] font-bold transition ${
                soldOut
                  ? "cursor-not-allowed border-neutral-200 text-neutral-300 line-through"
                  : selected
                  ? "border-neutral-900 bg-neutral-900 text-white"
                  : error
                  ? "border-red-300 text-neutral-900 hover:border-neutral-900"
                  : "border-neutral-300 text-neutral-900 hover:border-neutral-900"
              }`}
            >
              {s}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SizeSelector;