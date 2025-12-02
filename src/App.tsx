import { useState } from "react";
import { useQuery, skipToken } from "@tanstack/react-query";
import "./App.css";

// Query function that waits 1 second and returns input + date
const fetchData = async (input: string): Promise<string> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return `${input} - ${new Date().toISOString()}`;
};

function App() {
  // Left column (enabled) state
  const [enabledInput, setEnabledInput] = useState("");
  const [enabledChecked, setEnabledChecked] = useState(true);

  // Right column (skipToken) state
  const [skipTokenInput, setSkipTokenInput] = useState("");
  const [skipTokenChecked, setSkipTokenChecked] = useState(true);

  // Left column: uses `enabled` prop
  const enabledQuery = useQuery({
    queryKey: ["enabled", enabledInput],
    queryFn: () => fetchData(enabledInput),
    enabled: enabledChecked,
    staleTime: Infinity,
  });

  // Right column: uses skipToken
  const skipTokenQuery = useQuery({
    queryKey: ["skipToken", skipTokenInput],
    queryFn: skipTokenChecked ? () => fetchData(skipTokenInput) : skipToken,
    staleTime: Infinity,
  });

  return (
    <div style={{ padding: "20px", fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>
        TanStack Query: enabled vs skipToken
      </h1>
      <p style={{ textAlign: "center", color: "#666" }}>
        Compare how <code>enabled</code> and <code>skipToken</code> behave
        differently
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "40px",
          marginTop: "40px",
        }}
      >
        {/* Left Column - enabled */}
        <div
          style={{
            border: "2px solid #3b82f6",
            borderRadius: "8px",
            padding: "20px",
            backgroundColor: "#f0f9ff",
            color: "#1e293b",
          }}
        >
          <h2 style={{ marginTop: 0, color: "#1e40af" }}>Using enabled</h2>

          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Input Value:
            </label>
            <input
              type="text"
              value={enabledInput}
              onChange={(e) => setEnabledInput(e.target.value)}
              placeholder="Type something..."
              style={{
                width: "100%",
                padding: "8px",
                fontSize: "14px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <input
                type="checkbox"
                checked={enabledChecked}
                onChange={(e) => setEnabledChecked(e.target.checked)}
              />
              <span style={{ fontWeight: "bold" }}>Query Enabled</span>
            </label>
          </div>

          <div
            style={{
              backgroundColor: "white",
              padding: "15px",
              borderRadius: "4px",
              border: "1px solid #ddd",
            }}
          >
            <h3 style={{ marginTop: 0, fontSize: "16px" }}>Query States:</h3>
            <pre
              style={{
                margin: 0,
                fontSize: "12px",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                textAlign: "left",
              }}
            >
              {JSON.stringify(
                {
                  isLoading: enabledQuery.isLoading,
                  isFetching: enabledQuery.isFetching,
                  data: enabledQuery.data,
                },
                null,
                2
              )}
            </pre>
          </div>
        </div>

        {/* Right Column - skipToken */}
        <div
          style={{
            border: "2px solid #10b981",
            borderRadius: "8px",
            padding: "20px",
            backgroundColor: "#f0fdf4",
            color: "#1e293b",
          }}
        >
          <h2 style={{ marginTop: 0, color: "#047857" }}>Using skipToken</h2>

          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Input Value:
            </label>
            <input
              type="text"
              value={skipTokenInput}
              onChange={(e) => setSkipTokenInput(e.target.value)}
              placeholder="Type something..."
              style={{
                width: "100%",
                padding: "8px",
                fontSize: "14px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <input
                type="checkbox"
                checked={skipTokenChecked}
                onChange={(e) => setSkipTokenChecked(e.target.checked)}
              />
              <span style={{ fontWeight: "bold" }}>Query Enabled</span>
            </label>
          </div>

          <div
            style={{
              backgroundColor: "white",
              padding: "15px",
              borderRadius: "4px",
              border: "1px solid #ddd",
            }}
          >
            <h3 style={{ marginTop: 0, fontSize: "16px" }}>Query States:</h3>
            <pre
              style={{
                margin: 0,
                fontSize: "12px",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                textAlign: "left",
              }}
            >
              {JSON.stringify(
                {
                  isLoading: skipTokenQuery.isLoading,
                  isFetching: skipTokenQuery.isFetching,
                  data: skipTokenQuery.data,
                },
                null,
                2
              )}
            </pre>
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: "40px",
          padding: "20px",
          backgroundColor: "#fef3c7",
          borderRadius: "8px",
          border: "1px solid #f59e0b",
          color: "#1e293b",
        }}
      >
        <h3 style={{ marginTop: 0 }}>Key Differences:</h3>
        <ul style={{ margin: 0 }}>
          <li>
            <strong>enabled</strong>: When disabled, the query stays in its
            current state. Disabling after data is fetched keeps the data
            visible.
          </li>
          <li>
            <strong>skipToken</strong>: When used, the query is completely
            skipped and resets. Previous data is cleared.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default App;
