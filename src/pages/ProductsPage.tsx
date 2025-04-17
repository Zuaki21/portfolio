import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  Button,
  Grid,
  Tooltip,
} from "@mui/material";
import Header from "../components/Header";
import { Routes } from "react-router-dom";
import ParticleBackground from "../components/ParticleBackground";
import { products } from "../data/productsdata";
import { languageIconMap } from "../data/languageicondata";

// アイコン
import GitHubIcon from "@mui/icons-material/GitHub";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StoreIcon from "@mui/icons-material/Store";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const getLinkButton = (url: string) => {
  if (url.includes("github.com")) {
    return (
      <Button
        size="medium"
        variant="outlined"
        startIcon={<GitHubIcon />}
        href={url}
        target="_blank"
        sx={{
          borderRadius: 4,
          textTransform: "none",
          fontWeight: "bold",
          width: "auto",
          [`@media (max-width:600px)`]: {
            width: "100%",
          },
        }}
      >
        リポジトリ
      </Button>
    );
  }
  if (url.includes("unityroom.com")) {
    return (
      <Button
        size="medium"
        variant="outlined"
        startIcon={<PlayArrowIcon />}
        href={url}
        target="_blank"
        sx={{
          borderRadius: 4,
          textTransform: "none",
          fontWeight: "bold",
          width: "auto",
          [`@media (max-width:600px)`]: {
            width: "100%",
          },
        }}
      >
        プレイ
      </Button>
    );
  }
  if (url.includes("chromewebstore.google.com")) {
    return (
      <Button
        size="medium"
        variant="outlined"
        startIcon={<StoreIcon />}
        href={url}
        target="_blank"
        sx={{
          borderRadius: 4,
          textTransform: "none",
          fontWeight: "bold",
          width: "auto",
          [`@media (max-width:600px)`]: {
            width: "100%",
          },
        }}
      >
        ストアページ
      </Button>
    );
  }
  return (
    <Button
      size="medium"
      variant="outlined"
      startIcon={<OpenInNewIcon />}
      href={url}
      target="_blank"
      sx={{
        borderRadius: 4,
        textTransform: "none",
        fontWeight: "bold",
        width: "auto",
        [`@media (max-width:600px)`]: {
          width: "100%",
        },
      }}
    >
      詳細を見る
    </Button>
  );
};

export default function ProductsPage() {
  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Header />
      <Routes>{/* your routes here */}</Routes>
      <Box sx={{ flexGrow: 1, position: "relative", overflow: "hidden" }}>
        <ParticleBackground />
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            textAlign="center"
            sx={{
              fontFamily: `'Playfair Display', serif`,
              mt: 6,
              color: "text.primary",
            }}
          >
            Products
          </Typography>
        </Box>
        <Container maxWidth="xl" sx={{ py: 4 }}>
          <Grid container spacing={4} justifyContent="center">
            {products.map((item, index) => (
              <Grid
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                  maxWidth: "550px",
                }}
              >
                <Card
                  sx={{
                    backgroundColor: "rgba(255,255,255,0.2)",
                    backdropFilter: "blur(6px)",
                    borderRadius: 4,
                    boxShadow: "0 0px 8px rgba(0, 0, 0, 0.2)",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    width: "100%",
                    position: "relative",
                  }}
                >
                  {/* 画像 + 技術アイコン右上 */}
                  {item.image && (
                    <Box sx={{ position: "relative" }}>
                      <Box
                        component="img"
                        src={`${import.meta.env.BASE_URL}productimages/${
                          item.image
                        }`}
                        alt={`${item.title}の画像`}
                        sx={{
                          width: "100%",
                          height: 200,
                          objectFit: "cover",
                          objectPosition: "top",
                          borderTopLeftRadius: 16,
                          borderTopRightRadius: 16,
                        }}
                      />
                      <Box
                        sx={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                          display: "flex",
                          gap: 1,
                          backgroundColor: "rgb(255, 255, 255)",
                          borderRadius: 2,
                          p: 0.5,
                        }}
                      >
                        {item.languages.map((lang, i) => {
                          const iconRef = languageIconMap[lang];
                          if (!iconRef) return null;

                          if (iconRef.startsWith("http")) {
                            return (
                              <Tooltip title={lang} key={`icon-${i}`}>
                                <Box
                                  component="img"
                                  src={iconRef}
                                  alt={lang}
                                  sx={{ height: 32 }}
                                />
                              </Tooltip>
                            );
                          }

                          return (
                            <Tooltip title={lang} key={`icon-${i}`}>
                              <Box
                                component="i"
                                className={iconRef}
                                sx={{ fontSize: "2rem" }}
                              />
                            </Tooltip>
                          );
                        })}
                      </Box>
                    </Box>
                  )}

                  <CardContent
                    sx={{
                      flexGrow: 1,
                      pt: 1,
                      pb: 2,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center", // ← 中央揃えのままでOK
                      justifyContent: "flex-start", // ← ここを変更して上寄せ
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {item.title}
                    </Typography>
                    <Typography variant="body1" component="div">
                      {item.description.split("\n").map((line, i) => (
                        <Box key={i} component="span">
                          {line}
                          <br />
                        </Box>
                      ))}
                    </Typography>
                  </CardContent>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "flex-end",
                      px: 1.5,
                      pb: 1.5,
                      flexWrap: "wrap",
                      gap: 1,
                      [`@media (max-width:600px)`]: {
                        flexDirection: "column",
                        alignItems: "stretch",
                      },
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: "0.75rem",
                        color: "text.secondary",
                        [`@media (max-width:600px)`]: {
                          textAlign: "center",
                        },
                      }}
                    >
                      制作：{item.date} ／ {item.reason}
                    </Typography>

                    {item.link && (
                      <Box
                        sx={{
                          width: "auto",
                          [`@media (max-width:600px)`]: {
                            width: "100%",
                          },
                        }}
                      >
                        {getLinkButton(item.link)}
                      </Box>
                    )}
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </div>
  );
}
