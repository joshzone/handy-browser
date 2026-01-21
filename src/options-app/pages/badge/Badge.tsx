import "@lib/styles/globals.css";
import { useState } from "react";


export function BadgeConfig() {
  const [status, setStatus] = useState("");

  const handleResetBadge = () => {
    if (typeof chrome === "undefined") {
      return;
    }
    chrome.runtime.sendMessage({ type: "RESET_BADGE" }, () => {
      if (chrome.runtime.lastError) {
        setStatus("Unable to reset badge.");
        return;
      }
      setStatus("Badge cleared.");
    });
  };

  return (
    <div>
      <div className="mt-4">
        <button
          className="inline-flex items-center rounded-md border border-white/20 px-3 py-2 text-sm font-semibold text-white hover:bg-white/10"
          type="button"
          onClick={handleResetBadge}
        >
          Reset badge count
        </button>
      </div>
      {status ? (
        <p className="mt-3 text-xs text-gray-400">{status}</p>
      ) : null}
    </div>
  );
}

