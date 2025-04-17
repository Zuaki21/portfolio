import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActionArea,
} from "@mui/material";
import { useEffect } from "react";
import Header from "../components/Header";
import ParticleBackground from "../components/ParticleBackground"; // パーティクル背景

const articles = [
  {
    title: "Unityの基礎【Unityの教科書#1】",
    url: "https://hu-gsd.com/lecture/unity-text-1/",
    image: "UnityText.webp",
  },
  {
    title: "Discordで配信したい人向けのOBS Studioの始め方",
    url: "https://hu-gsd.com/lecture/obs-for-discord/",
    image: "OBS.webp",
  },
  {
    title: "Live2Dモデルの作り方(我流)",
    url: "https://hu-gsd.com/lecture/how_to_make_live2d_models/",
    image: "Live2D.webp",
  },
  {
    title: "【Unity】サッとスプレットシートを読み込みたい",
    url: "https://hu-gsd.com/lecture/load_spreadsheets/",
    image: "spread.webp",
  },
  {
    title:
      "【Unity】GoogleDriveとUnityのAssetsフォルダ内の特定のフォルダと同期する",
    url: "https://hu-gsd.com/lecture/sync_googledrive/",
    image: "googledrive.gif",
  },
  {
    title: "死にゲーをつくってみたよ【GSD体験記】",
    url: "https://hu-gsd.com/diary/yurei_to_takara_no_tou_gsd/",
    image: "yurei.webp",
  },
];

export default function ArticlesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box sx={{ position: "relative", minHeight: "100vh" }}>
      <ParticleBackground />

      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Header />
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
          Articles
        </Typography>
        <Container sx={{ py: 4 }} maxWidth="lg">
          <Grid container spacing={4} justifyContent="center">
            {articles.map((article, index) => (
              <Grid
                key={index}
                sx={{
                  maxWidth: 350,
                  width: "100%",
                  flexGrow: 1,
                  display: "flex",
                }}
              >
                <Card
                  sx={{
                    height: 330,
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                    backdropFilter: "blur(6px)",
                    borderRadius: 4,
                    boxShadow: "0 0px 8px rgba(0, 0, 0, 0.2)",
                    overflow: "hidden",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease", // ★ 追加
                    "&:hover": {
                      transform: "scale(1.03)", // ★ カード全体の拡大
                    },
                  }}
                >
                  <CardActionArea
                    component="a"
                    href={article.url}
                    target="_blank"
                    rel="noopener"
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {article.image && (
                      <Box
                        component="img"
                        src={`${import.meta.env.BASE_URL}articleimages/${
                          article.image
                        }`}
                        alt={`${article.title}のサムネイル`}
                        sx={{
                          width: "100%",
                          height: 200,
                          objectFit: "cover",
                          objectPosition: "top",
                          borderTopLeftRadius: 16,
                          borderTopRightRadius: 16,
                          transition: "transform 0.3s ease",
                        }}
                      />
                    )}

                    <CardContent sx={{ flexGrow: 1, p: 2, width: "80%" }}>
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        gutterBottom
                        sx={{ wordBreak: "break-word", color: "text.primary" }}
                      >
                        {article.title}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
