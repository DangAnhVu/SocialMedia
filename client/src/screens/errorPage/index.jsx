import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
    const navigate = useNavigate();
    return (
        <div
            style={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px",
            }}
        >
            <div
                style={{
                    textAlign: "center",
                    maxWidth: "600px",
                }}
            >
                {/* 404 Number */}
                <div
                    style={{
                        position: "relative",
                        marginBottom: "32px",
                    }}
                >
                    <h1
                        style={{
                            fontSize: "clamp(80px, 15vw, 150px)",
                            fontWeight: "bold",
                            color: "white",
                            margin: 0,
                            textShadow: "0 0 40px rgba(255,255,255,0.5)",
                            animation: "pulse 2s ease-in-out infinite",
                        }}
                    >
                        404
                    </h1>
                </div>

                {/* Content Card */}
                <div
                    style={{
                        background: "rgba(255, 255, 255, 0.15)",
                        backdropFilter: "blur(10px)",
                        borderRadius: "20px",
                        padding: "40px 30px",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                        marginBottom: "24px",
                    }}
                >
                    <h2
                        style={{
                            fontSize: "clamp(24px, 5vw, 36px)",
                            fontWeight: "600",
                            color: "white",
                            marginBottom: "16px",
                        }}
                    >
                        Trang không tồn tại
                    </h2>
                    <p
                        style={{
                            fontSize: "18px",
                            color: "rgba(255, 255, 255, 0.9)",
                            lineHeight: "1.6",
                            marginBottom: "32px",
                        }}
                    >
                        Trang bạn đang tìm kiếm không có hoặc đã bị xóa
                    </p>

                    {/* Buttons */}
                    <div
                        style={{
                            display: "flex",
                            flexDirection:
                                window.innerWidth < 600 ? "column" : "row",
                            gap: "16px",
                            justifyContent: "center",
                        }}
                    >
                        <button
                            style={{
                                padding: "14px 32px",
                                background: "white",
                                color: "#667eea",
                                border: "none",
                                borderRadius: "10px",
                                fontSize: "16px",
                                fontWeight: "600",
                                cursor: "pointer",
                                transition: "all 0.3s ease",
                                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                            }}
                            onMouseOver={(e) => {
                                e.target.style.transform = "translateY(-2px)";
                                e.target.style.boxShadow =
                                    "0 6px 20px rgba(0, 0, 0, 0.3)";
                            }}
                            onMouseOut={(e) => {
                                e.target.style.transform = "translateY(0)";
                                e.target.style.boxShadow =
                                    "0 4px 15px rgba(0, 0, 0, 0.2)";
                            }}
                            onClick={() => {
                                navigate("/login");
                            }}
                        >
                            Về trang chủ
                        </button>
                        <button
                            style={{
                                padding: "14px 32px",
                                background: "rgba(255, 255, 255, 0.2)",
                                color: "white",
                                border: "2px solid white",
                                borderRadius: "10px",
                                fontSize: "16px",
                                fontWeight: "600",
                                cursor: "pointer",
                                transition: "all 0.3s ease",
                            }}
                            onMouseOver={(e) => {
                                e.target.style.background =
                                    "rgba(255, 255, 255, 0.3)";
                                e.target.style.transform = "translateY(-2px)";
                            }}
                            onMouseOut={(e) => {
                                e.target.style.background =
                                    "rgba(255, 255, 255, 0.2)";
                                e.target.style.transform = "translateY(0)";
                            }}
                            onClick={() => navigate(-1)}
                        >
                            Quay lại
                        </button>
                    </div>
                </div>

                {/* Decorative dots */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "8px",
                        marginTop: "24px",
                    }}
                >
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            style={{
                                width: "10px",
                                height: "10px",
                                background: "white",
                                borderRadius: "50%",
                                animation: `bounce 1s ease-in-out infinite`,
                                animationDelay: `${i * 0.15}s`,
                            }}
                        />
                    ))}
                </div>
            </div>

            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.8; }
                }
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
            `}</style>
        </div>
    );
};

export default ErrorPage;
