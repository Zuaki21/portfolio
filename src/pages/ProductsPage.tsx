import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Chip,
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
        sx={{ borderRadius: 4, textTransform: "none", fontWeight: "bold" }}
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
        sx={{ borderRadius: 4, textTransform: "none", fontWeight: "bold" }}
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
        sx={{ borderRadius: 4, textTransform: "none", fontWeight: "bold" }}
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
      sx={{ borderRadius: 4, textTransform: "none", fontWeight: "bold" }}
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
        <Typography
          variant="h4"
          gutterBottom
          fontWeight="bold"
          textAlign="center"
          sx={{ fontFamily: `'Playfair Display', serif`, mt: 6 }}
        >
          Products
        </Typography>
        <Container maxWidth="xl" sx={{ py: 4 }}>
          <Grid container spacing={4} justifyContent="center">
            {products.map((item, index) => (
              <Grid
                item
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
                    boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
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
                              <Box
                                key={`icon-${i}`}
                                component="img"
                                src={iconRef}
                                alt={lang}
                                title={lang}
                                sx={{ height: 32 }}
                              />
                            );
                          }

                          return (
                            <Box
                              key={`icon-${i}`}
                              component="i"
                              className={iconRef}
                              title={lang}
                              sx={{ fontSize: "2rem" }}
                            />
                          );
                        })}
                      </Box>
                    </Box>
                  )}

                  <CardContent sx={{ flexGrow: 1, pb: 6 }}>
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

                    <Box mt={1} mb={1}>
                      {item.languages.map((lang, i) => (
                        <Chip
                          label={lang}
                          key={i}
                          size="small"
                          sx={{ mr: 1, mb: 1 }}
                        />
                      ))}
                    </Box>
                  </CardContent>

                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 8,
                      left: 8,
                      fontSize: "0.75rem",
                      color: "text.secondary",
                      px: 1,
                      py: 0.5,
                    }}
                  >
                    制作：{item.date} ／ {item.reason}
                  </Box>

                  {item.link && (
                    <CardActions
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        right: 4,
                        m: 0,
                      }}
                    >
                      {getLinkButton(item.link)}
                    </CardActions>
                  )}
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </div>
  );
}
