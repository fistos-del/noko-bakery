export default function Loading() {
  return (
    <div
      style={{
        minHeight: "50vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontSize: 48,
            marginBottom: 16,
            animation: "sproutPulse 1.5s ease-in-out infinite",
            display: "inline-block",
          }}
        >
          🌱
        </div>
        <div
          style={{
            fontSize: 11,
            color: "var(--text-muted)",
            letterSpacing: 2,
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          Loading
        </div>

        <div
          style={{
            width: 140,
            height: 2,
            background: "var(--surface-2)",
            borderRadius: 100,
            overflow: "hidden",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              height: "100%",
              width: "40%",
              background:
                "linear-gradient(90deg, #4A7C59, #D4A843, #7BA7BC)",
              borderRadius: 100,
              animation: "loadingSlide 1.2s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes sproutPulse {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.15) rotate(-5deg); }
        }
        @keyframes loadingSlide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(350%); }
        }
      `}</style>
    </div>
  );
}