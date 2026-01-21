import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

type ApiProvider = {
  id: string;
  name: string;
  url: string;
  apiKey?: string;
};

export function EditPage() {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const isEditMode = !!params.id;

  const [formData, setFormData] = useState<ApiProvider>({
    id: crypto.randomUUID(),
    name: "",
    url: "",
    apiKey: "",
  });
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (isEditMode) {
      loadApiProvider();
    }
  }, [isEditMode, params.id]);

  const loadApiProvider = () => {
    if (typeof chrome === "undefined" || !params.id) return;

    chrome.storage.sync.get("apiProviders", (result) => {
      const providers = result.apiProviders || [];
      const provider = providers.find((p: ApiProvider) => p.id === params.id);
      if (provider) {
        setFormData(provider);
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.url) {
      setStatus("Name and URL are required");
      setTimeout(() => setStatus(""), 2000);
      return;
    }

    if (typeof chrome === "undefined") return;

    chrome.storage.sync.get("apiProviders", (result) => {
      const providers = result.apiProviders || [];
      let updatedProviders;

      if (isEditMode) {
        updatedProviders = providers.map((p: ApiProvider) =>
          p.id === params.id ? formData : p
        );
      } else {
        updatedProviders = [...providers, formData];
      }

      chrome.storage.sync.set({ apiProviders: updatedProviders }, () => {
        setStatus(isEditMode ? "API provider updated successfully" : "API provider created successfully");
        setTimeout(() => {
          navigate("/api-providers");
        }, 1000);
      });
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">
        {isEditMode ? "Edit API Provider" : "Create API Provider"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            className="w-full rounded-md border border-white/20 bg-gray-800 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter API provider name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">URL</label>
          <input
            type="url"
            className="w-full rounded-md border border-white/20 bg-gray-800 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            placeholder="Enter API provider URL"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">API Key (optional)</label>
          <input
            type="text"
            className="w-full rounded-md border border-white/20 bg-gray-800 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
            value={formData.apiKey || ""}
            onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
            placeholder="Enter API key"
          />
        </div>

        <div className="flex space-x-2">
          <button
            type="submit"
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-200"
          >
            {isEditMode ? "Update" : "Create"}
          </button>
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-white/20 px-3 py-2 text-sm font-semibold text-white hover:bg-white/10"
            onClick={() => navigate("/api-providers")}
          >
            Cancel
          </button>
        </div>
      </form>

      {status && (
        <p className={`mt-2 text-xs ${status.includes("required") ? "text-red-400" : "text-green-400"}`}>
          {status}
        </p>
      )}
    </div>
  );
}
