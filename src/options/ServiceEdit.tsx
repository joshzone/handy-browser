import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface AIService {
  id: string;
  name: string;
  provider: "openai" | "google" | "openai-compatible";
  baseUrl?: string;
  apiKey?: string;
  model?: string;
}

function ServiceEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [status, setStatus] = useState("");
  const [editingService, setEditingService] = useState<AIService>({
    id: id || "",
    name: "",
    provider: "openai-compatible",
  });
  const [aiServices, setAiServices] = useState<AIService[]>([]);

  // 加载AI服务列表和编辑的服务
  useEffect(() => {
    // 这里应该从存储中加载，现在使用模拟数据
    const mockServices: AIService[] = [
      {
        id: "1",
        name: "OpenAI",
        provider: "openai",
        apiKey: "sk-...",
        model: "gpt-4",
      },
      {
        id: "2",
        name: "Local AI",
        provider: "openai-compatible",
        baseUrl: "http://localhost:11434/v1",
        model: "llama3",
      },
    ];
    setAiServices(mockServices);

    // 加载要编辑的服务
    if (id) {
      const serviceToEdit = mockServices.find(service => service.id === id);
      if (serviceToEdit) {
        setEditingService(serviceToEdit);
      }
    }
  }, [id]);

  const handleSaveService = () => {
    if (!editingService.name) {
      setStatus("Service name is required.");
      return;
    }

    if (editingService.provider === "openai-compatible") {
      if (!editingService.baseUrl) {
        setStatus("Base URL is required for OpenAI-compatible services.");
        return;
      }
      if (!editingService.model) {
        setStatus("Model is required for OpenAI-compatible services.");
        return;
      }
    }

    // 更新现有服务
    const updatedServices = aiServices.map(service => 
      service.id === editingService.id ? editingService : service
    );
    setAiServices(updatedServices);

    setStatus("Service saved successfully.");
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
        <h1 className="text-lg font-semibold">Edit Service</h1>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="space-y-4">
          {/* 服务名称 */}
          <div>
            <label className="block text-sm font-medium mb-1">Service Name</label>
            <input
              type="text"
              className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white"
              value={editingService.name}
              onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
            />
          </div>

          {/* 供应商选择 */}
          <div>
            <label className="block text-sm font-medium mb-1">Provider</label>
            <select
              className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white"
              value={editingService.provider}
              onChange={(e) => setEditingService({ ...editingService, provider: e.target.value as "openai-compatible" })}
            >
              <option value="openai-compatible">OpenAI Compatible</option>
              {/* 暂时只启用OpenAI兼容 */}
              {/* <option value="openai">OpenAI</option> */}
              {/* <option value="google">Google</option> */}
            </select>
          </div>

          {/* OpenAI兼容模式的额外字段 */}
          {editingService.provider === "openai-compatible" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Service Address</label>
                <input
                  type="text"
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white"
                  value={editingService.baseUrl || ""}
                  onChange={(e) => setEditingService({ ...editingService, baseUrl: e.target.value })}
                  placeholder="e.g., http://localhost:11434/v1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">API Key</label>
                <input
                  type="password"
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white"
                  value={editingService.apiKey || ""}
                  onChange={(e) => setEditingService({ ...editingService, apiKey: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Model</label>
                <input
                  type="text"
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white"
                  value={editingService.model || ""}
                  onChange={(e) => setEditingService({ ...editingService, model: e.target.value })}
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
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceEdit;