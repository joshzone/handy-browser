import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type ApiProvider = {
  id: string;
  name: string;
  url: string;
  apiKey?: string;
};

export default function SelectApi() {
  const navigate = useNavigate();
  const [apiProviders, setApiProviders] = useState<ApiProvider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<string>("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    loadApiProviders();
  }, []);

  const loadApiProviders = () => {
    if (typeof chrome === "undefined") return;

    chrome.storage.sync.get("apiProviders", (result) => {
      const providers = result.apiProviders || [];
      setApiProviders(providers);
      if (providers.length > 0) {
        setSelectedProvider(providers[0].id);
      }
    });
  };

  const handleCreateNew = () => {
    navigate("/api-provider/create");
  };

  const handleEdit = (id: string) => {
    navigate(`/api-provider/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this API provider?")) return;

    const updatedProviders = apiProviders.filter((provider) => provider.id !== id);
    setApiProviders(updatedProviders);

    if (typeof chrome !== "undefined") {
      chrome.storage.sync.set({ apiProviders: updatedProviders }, () => {
        setStatus("API provider deleted successfully");
        setTimeout(() => setStatus(""), 2000);
        if (selectedProvider === id) {
          setSelectedProvider(updatedProviders.length > 0 ? updatedProviders[0].id : "");
        }
      });
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Select API Provider</h2>
      
      {apiProviders.length === 0 ? (
        <div className="border border-white/20 rounded-md p-4">
          <p className="text-gray-400">No API providers found</p>
          <button
            className="mt-2 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-200"
            type="button"
            onClick={handleCreateNew}
          >
            Create New API Provider
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">API Providers</label>
            <select
              className="w-full rounded-md border border-white/20 bg-gray-800 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
              value={selectedProvider}
              onChange={(e) => setSelectedProvider(e.target.value)}
            >
              {apiProviders.map((provider) => (
                <option key={provider.id} value={provider.id}>
                  {provider.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex space-x-2">
            <button
              className="inline-flex items-center rounded-md border border-white/20 px-3 py-2 text-sm font-semibold text-white hover:bg-white/10"
              type="button"
              onClick={() => handleEdit(selectedProvider)}
              disabled={!selectedProvider}
            >
              Edit Selected
            </button>
            <button
              className="inline-flex items-center rounded-md border border-red-500/30 px-3 py-2 text-sm font-semibold text-red-400 hover:bg-red-500/20"
              type="button"
              onClick={() => handleDelete(selectedProvider)}
              disabled={!selectedProvider}
            >
              Delete Selected
            </button>
            <button
              className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-200"
              type="button"
              onClick={handleCreateNew}
            >
              Create New
            </button>
          </div>
        </div>
      )}
      
      {status && (
        <p className="mt-2 text-xs text-green-400">{status}</p>
      )}
    </div>
  );
}
