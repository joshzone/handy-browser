import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "@lib/styles/globals.css";
import ServiceEdit from "./ServiceEdit";
import ServiceCreate from "./ServiceCreate";

const manifest =
  typeof chrome !== "undefined" && chrome.runtime?.getManifest
    ? chrome.runtime.getManifest()
    : null;
const extensionName = manifest?.name ?? "Extension";
const extensionVersion = manifest?.version ?? "0.0.0";

interface AIService {
  id: string;
  name: string;
  provider: "openai" | "google" | "openai-compatible";
  baseUrl?: string;
  apiKey?: string;
  model?: string;
}

function OptionsApp() {
  const [status, setStatus] = useState("");
  const [aiServices, setAiServices] = useState<AIService[]>([]);
  const [selectedService, setSelectedService] = useState<string>("");

  // 加载AI服务列表
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
    if (mockServices.length > 0) {
      setSelectedService(mockServices[0].id);
    }
  }, []);

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
    <div className="min-h-screen bg-gray-900 px-6 py-8 text-white">
      <h1 className="text-lg font-semibold">{extensionName} Settings</h1>
      
      {/* AI服务设置 */}
      <div className="mt-6">
        <h2 className="text-md font-medium mb-3">AI Service</h2>
        <div className="space-y-4">
          {/* 服务选择 */}
          <div className="bg-gray-800 rounded-md p-4">
            <label className="block text-sm font-medium mb-2">Select AI Service</label>
            <select
              className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white"
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
            >
              {aiServices.map(service => (
                <option key={service.id} value={service.id}>
                  {service.name} ({service.provider})
                </option>
              ))}
            </select>
            <Link
              to="/service/create"
              className="mt-3 inline-flex items-center rounded-md border border-white/20 px-3 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              Add New Service
            </Link>
          </div>

          {/* 已添加服务列表 */}
          <div className="bg-gray-800 rounded-md p-4">
            <h3 className="text-sm font-medium mb-2">Added Services</h3>
            <div className="space-y-2">
              {aiServices.map(service => (
                <div key={service.id} className="flex items-center justify-between p-2 bg-gray-700 rounded">
                  <div>
                    <div className="font-medium">{service.name}</div>
                    <div className="text-xs text-gray-400">{service.provider}</div>
                  </div>
                  <Link
                    to={`/service/edit/${service.id}`}
                    className="text-xs px-2 py-1 bg-gray-600 rounded hover:bg-gray-500"
                  >
                    Edit
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 重置徽章按钮 */}
      <div className="mt-4">
        <button
          className="inline-flex items-center rounded-md border border-white/20 px-3 py-2 text-sm font-semibold text-white hover:bg-white/10"
          type="button"
          onClick={handleResetBadge}
        >
          Reset badge count
        </button>
      </div>

      {/* 状态消息 */}
      {status ? (
        <p className="mt-3 text-xs text-gray-400">{status}</p>
      ) : null}

      {/* 版本信息 */}
      <p className="mt-6 text-xs text-gray-500">
        Version {extensionVersion}
      </p>
    </div>
  );
}

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(
    <StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<OptionsApp />} />
          <Route path="/service/edit/:id" element={<ServiceEdit />} />
          <Route path="/service/create" element={<ServiceCreate />} />
        </Routes>
      </Router>
    </StrictMode>
  );
}