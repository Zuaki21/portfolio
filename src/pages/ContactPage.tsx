import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Container,
} from "@mui/material";
import Header from "../components/Header";
import { Routes } from "react-router-dom";
import ParticleBackground from "../components/ParticleBackground";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const GOOGLE_FORM_ACTION_URL =
    "https://docs.google.com/forms/u/0/d/e/1FAIpQLSdNrcqxDKK2eiu-fvxvMSn0MpEr-x-vMuj2Xg_K_2Hrps7ouA/formResponse";

  const ENTRY_IDS = {
    name: "entry.770108957",
    email: "entry.1296220887",
    message: "entry.1999902006",
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = new FormData();
    form.append(ENTRY_IDS.name, formData.name);
    form.append(ENTRY_IDS.email, formData.email);
    form.append(ENTRY_IDS.message, formData.message);

    try {
      await fetch(GOOGLE_FORM_ACTION_URL, {
        method: "POST",
        mode: "no-cors",
        body: form,
      });
      setSubmitted(true);
      setError(false);
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("送信エラー:", err);
      setError(true);
    }
  };

  const isFormIncomplete =
    !formData.name || !formData.email || !formData.message;

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <Routes>{/* your routes here */}</Routes>

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "flex-start", // 上寄せにする
          justifyContent: "center", // 横方向に中央寄せ
          position: "relative",
          overflow: "hidden",
        }}
      >
        <ParticleBackground />

        {/* Contactタイトルをカード外に配置 */}
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            color: "text.primary", // 色をテーマに基づいて設定
            fontWeight: "bold",
            textAlign: "center",
            fontFamily: `'Playfair Display', serif`,
            position: "absolute", // 上に配置するための絶対配置
            top: "5%", // 上から少し余裕を持たせる
            zIndex: 1, // パーティクル背景の上に配置
            width: "100%",
          }}
        >
          Contact
        </Typography>

        {/* フォームエリア（グラスモーフィズム効果） */}
        <Container
          sx={{
            py: 1.5,
            display: "flex",
            justifyContent: "center", // フォームを中央寄せに
            zIndex: 1,
            marginTop: "120px", // Contactとフォームの間に余裕を持たせる
          }}
        >
          <Box
            sx={{
              position: "relative",
              zIndex: 1,
              backdropFilter: "blur(6px)",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: 4,
              boxShadow: "0 0px 8px rgba(0, 0, 0, 0.2)",
              padding: 4,
              maxWidth: 600,
              width: "100%", // カードの幅を100%にして中央寄せ
              border: "1px solid rgba(255, 255, 255, 0.3)",
              overflow: "hidden",
            }}
          >
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                color: "text.primary", // 色をテーマに基づいて設定
                fontWeight: "bold",
                textAlign: "center",
                fontFamily: `'Playfair Display', serif`,
              }}
            >
              お問い合わせ
            </Typography>

            {submitted && (
              <Alert severity="success" sx={{ mt: 2 }}>
                送信が完了しました！
              </Alert>
            )}
            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                送信に失敗しました。再試行してください。
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="名前・会社・団体名"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                margin="normal"
                variant="outlined"
                InputProps={{
                  style: {
                    backgroundColor: "rgba(255, 255, 255, 0.85)",
                    borderRadius: 12,
                  },
                }}
                InputLabelProps={{
                  style: { color: "#333" },
                }}
              />
              <TextField
                fullWidth
                label="メールアドレス"
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                required
                margin="normal"
                variant="outlined"
                InputProps={{
                  style: {
                    backgroundColor: "rgba(255, 255, 255, 0.85)",
                    borderRadius: 12,
                  },
                }}
                InputLabelProps={{
                  style: { color: "#333" },
                }}
              />
              <TextField
                fullWidth
                label="お問い合わせ内容"
                name="message"
                value={formData.message}
                onChange={handleChange}
                multiline
                rows={5}
                required
                margin="normal"
                variant="outlined"
                InputProps={{
                  style: {
                    backgroundColor: "rgba(255, 255, 255, 0.85)",
                    borderRadius: 12,
                  },
                }}
                InputLabelProps={{
                  style: { color: "#333" },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                disabled={isFormIncomplete}
                sx={{
                  mt: 3,
                  py: 1.5,
                  borderRadius: "999px",
                  fontWeight: "bold",
                  background: "linear-gradient(to right, #7e57c2, #9575cd)",
                  opacity: isFormIncomplete ? 0.5 : 1,
                  transition: "opacity 0.3s",
                  "&:hover": {
                    background: "linear-gradient(to right, #673ab7, #7e57c2)",
                    opacity: isFormIncomplete ? 0.5 : 1, // ホバー時も透明度維持
                  },
                }}
                fullWidth
              >
                送信
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </div>
  );
}
