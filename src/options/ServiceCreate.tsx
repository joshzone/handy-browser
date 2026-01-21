import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface AIService {
  id: string;
  name: string;
  provider: "openai" | "google" | "openai-compatible";
  baseUrl?: string;
  apiKey?: string;
  model?: string;
}

function ServiceCreate() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("");
  const [newService, setNewService] = useState<AIService>({
    id: "",
    name: "",
    provider: "openai-compatible",
  });

  const handleSaveService = () => {
    if (!newService.name) {
      setStatus("Service name is required.");
      return;
    }

    if (newService.provider === "openai-compatible") {
      if (!newService.baseUrl) {
        setStatus("Base URL is required for OpenAI-compatible services.");
        return;
      }
      if (!newService.model) {
        setStatus("Model is required for OpenAI-compatible services.");
        return;
      }
    }

    // 这里应该保存到存储中，现在只模拟成功
    setStatus("Service created successfully.");

    // 保存后导航回设置页面
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-900 px-6 py-8 text-white">
      <div className="flex items-center mb-6">
        <button
          className="mr-4 inline-flex items-center rounded-md border border-white/20 px-3 py-2 text-sm font-semibold text-white hover:bg-white/10"
          onClick={() => navigate("/")}
        >
          Back
        </button>
        <h1 className="text-lg font-semibold">Create New Service</h1>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="space-y-4">
          {/* 服务名称 */}
          <div>
            <label className="block text-sm font-medium mb-1">Service Name</label>
            <input
              type="text"
              className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white"
              value={newService.name}
              onChange={(e) => setNewService({ ...newService, name: e.target.value })}
            />
          </div>

          {/* 供应商选择 */}
          <div>
            <label className="block text-sm font-medium mb-1">Provider</label>
            <select
              className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white"
              value={newService.provider}
              onChange={(e) => setNewService({ ...newService, provider: e.target.value as "openai-compatible" })}
            >
              <option value="openai-compatible">OpenAI Compatible</option>
              {/* 暂时只启用OpenAI兼容 */}
              {/* <option value="openai">OpenAI</option> */}
              {/* <option value="google">Google</option> */}
            </select>
          </div>

          {/* OpenAI兼容模式的额外字段 */}
          {newService.provider === "openai-compatible" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Service Address</label>
                <input
                  type="text"
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white"
                  value={newService.baseUrl || ""}
                  onChange={(e) => setNewService({ ...newService, baseUrl: e.target.value })}
                  placeholder="e.g., http://localhost:11434/v1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">API Key</label>
                <input
                  type="password"
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white"
                  value={newService.apiKey || ""}
                  onChange={(e) => setNewService({ ...newService, apiKey: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Model</label>
                <input
                  type="text"
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white"
                  value={newService.model || ""}
                  onChange={(e) => setNewService({ ...newService, model: e.target.value })}
                  placeholder="e.g., gpt-4, llama3"
                />
              </div>
            </div>
          )}

          {/* 状态消息 */}
          {status ? (
            <p className="text-xs text-gray-400">{status}</p>
          ) : null}

          {/* 按钮 */}
          <div className="flex space-x-3 mt-6">
            <button
              className="flex-1 bg-gray-600 hover:bg-gray-500 rounded-md px-4 py-2 text-sm font-medium"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
            <button
              className="flex-1 bg-blue-600 hover:bg-blue-500 rounded-md px-4 py-2 text-sm font-medium"
              onClick={handleSaveService}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceCreate;