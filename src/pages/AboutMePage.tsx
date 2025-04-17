import {
  Box,
  Typography,
  Link,
  Container,
  Divider,
  Avatar,
  Stack,
  Tooltip,
  IconButton,
} from "@mui/material";
import Header from "../components/Header";
import { Routes } from "react-router-dom";
import ParticleBackground from "../components/ParticleBackground";
import { useEffect, useState } from "react";
import { GitHub } from "@mui/icons-material";
import LaunchIcon from "@mui/icons-material/Launch";

export default function AboutMePage() {
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
          sx={{
            fontFamily: `'Playfair Display', serif`,
            mt: 6,
            color: "text.primary", // 色をテーマに基づいて設定
          }}
        >
          About Me
        </Typography>
        <Container
          sx={{
            mt: 4,
            mb: 8,
            p: 4,
            backgroundColor: "rgba(255,255,255,0.2)",
            backdropFilter: "blur(6px)",
            borderRadius: 4,
            border: "1px solid rgba(255,255,255,0.3)",
            boxShadow: "0 0px 8px rgba(0, 0, 0, 0.2)",
            zIndex: 1,
            position: "relative",
            fontFamily: `'Poppins', 'Noto Sans JP', sans-serif`,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
            <Avatar
              alt="Zuaki"
              src={`${import.meta.env.BASE_URL}image/icon.webp`}
              sx={{ width: 120, height: 120 }}
            />
          </Box>

          <Typography
            variant="h6"
            gutterBottom
            align="center"
            sx={{ color: "text.primary" }} // 色をテーマに基づいて設定
          >
            Zuaki
          </Typography>

          <Box display="flex" justifyContent="center" mb={2}>
            <Tooltip title="GitHub">
              <IconButton
                component="a"
                href="https://github.com/Zuaki21"
                target="_blank"
                rel="noopener"
              >
                <GitHub fontSize="large" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Twitter">
              <IconButton
                component="a"
                href="https://x.com/Zuaki_"
                target="_blank"
                rel="noopener"
              >
                <Box
                  component="img"
                  src={`${import.meta.env.BASE_URL}image/x_logo.svg`}
                  alt="X"
                  sx={{
                    height: 28,
                    width: 28,
                    filter:
                      "invert(33%) sepia(0%) saturate(0%) hue-rotate(178deg) brightness(90%) contrast(85%)",
                  }}
                />
              </IconButton>
            </Tooltip>
          </Box>

          <Typography
            gutterBottom
            align="center"
            sx={{ color: "text.primary" }}
          >
            広島大学 先進理工系化学研究科 / 情報科学プログラム /{" "}
            <Link
              href="https://www.iec.hiroshima-u.ac.jp/"
              target="_blank"
              rel="noopener"
              underline="always" // 下線を常に表示
              sx={{
                color: "inherit", // 青くしない
                display: "inline-flex",
                alignItems: "center",
                textDecorationColor: "inherit", // 下線の色も親と同じに
              }}
            >
              計算機基礎学研究室
              <LaunchIcon sx={{ fontSize: 16, ml: 0.5 }} />
            </Link>
          </Typography>

          <Typography
            gutterBottom
            align="center"
            sx={{ color: "text.primary" }}
          >
            所属：{" "}
            <Link
              href="https://hu-gsd.com/"
              target="_blank"
              rel="noopener"
              underline="always"
              sx={{
                color: "inherit",
                display: "inline-flex",
                alignItems: "center",
                textDecorationColor: "inherit",
              }}
            >
              広島大学ゲーム制作同好会
              <LaunchIcon sx={{ fontSize: 16, ml: 0.5 }} />
            </Link>
          </Typography>

          <Typography
            gutterBottom
            align="center"
            sx={{ color: "text.primary" }}
          >
            出身：愛知県 ／ 現在：広島県
          </Typography>

          <LiveAge birthDate={new Date("2000-04-23")} />

          <Divider sx={{ my: 4 }} />

          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: "text.primary", textAlign: "center" }}
          >
            趣味・活動
          </Typography>
          <Typography
            gutterBottom
            sx={{ color: "text.primary", textAlign: "center" }}
          >
            趣味：お絵描き・VRChat・TRPG・ゲーム・アニメ
            <br />
            創作が好きで幅広く制作しています。
            <br />
            MetaQuest2を購入し、VR方面に興味あり。
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: "text.primary", textAlign: "center" }}
          >
            リサーチ & 実績
          </Typography>
          <Typography
            gutterBottom
            sx={{ color: "text.primary", textAlign: "center" }}
          >
            研究：セキュリティ分野（リング署名・秘匿共通集合・近距離通信）
            <br />
            資格：ITパスポート／基本情報技術者／応用情報技術者
            <br />
            実績：NTTドコモハッカソン(2024/9/10-2024/9/13)最優秀賞、ICCT Pacific
            2025にて学会発表
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: "text.primary", textAlign: "center" }}
          >
            インターン経験
          </Typography>
          <Typography
            gutterBottom
            sx={{ color: "text.primary", textAlign: "center" }}
          >
            マツダ株式会社、合同会社DMM.com、株式会社NTTドコモ、
            株式会社野村総合研究所（NRI）、アマゾン ウェブ
            サービスジャパン合同会社（AWS）、株式会社ゲームフリーク、
            東日本電信電話株式会社（NTT東日本）、西日本電信電話株式会社（NTT西日本）、中部電力株式会社
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: "text.primary", textAlign: "center" }}
          >
            スキルセット
          </Typography>

          <Box textAlign="center" sx={{ mt: 2 }}>
            <Typography fontWeight="bold" mb={1} sx={{ color: "text.primary" }}>
              制作で頻繁に使用
            </Typography>
            <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
              flexWrap="wrap"
              useFlexGap
            >
              <Tooltip title="C#">
                <Box
                  component="i"
                  className="devicon-csharp-plain colored"
                  sx={{ fontSize: "3rem" }}
                />
              </Tooltip>
              <Tooltip title="C">
                <Box
                  component="i"
                  className="devicon-c-plain colored"
                  sx={{ fontSize: "3rem" }}
                />
              </Tooltip>
              <Tooltip title="Unity">
                <Box
                  component="i"
                  className="devicon-unity-plain colored"
                  sx={{ fontSize: "3rem" }}
                />
              </Tooltip>
              <Tooltip title="Python">
                <Box
                  component="i"
                  className="devicon-python-plain colored"
                  sx={{ fontSize: "3rem" }}
                />
              </Tooltip>
              <Tooltip title="GitHub">
                <Box
                  component="i"
                  className="devicon-github-original colored"
                  sx={{ fontSize: "3rem" }}
                />
              </Tooltip>
              <Tooltip title="Git">
                <Box
                  component="i"
                  className="devicon-git-plain colored"
                  sx={{ fontSize: "3rem" }}
                />
              </Tooltip>
            </Stack>

            <Typography
              fontWeight="bold"
              mt={4}
              mb={1}
              sx={{ color: "text.primary" }}
            >
              使って制作経験あり
            </Typography>
            <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
              flexWrap="wrap"
              useFlexGap
            >
              <Tooltip title="C++">
                <Box
                  component="i"
                  className="devicon-cplusplus-plain colored"
                  sx={{ fontSize: "3rem" }}
                />
              </Tooltip>
              <Tooltip title="HTML">
                <Box
                  component="i"
                  className="devicon-html5-plain colored"
                  sx={{ fontSize: "3rem" }}
                />
              </Tooltip>
              <Tooltip title="CSS">
                <Box
                  component="i"
                  className="devicon-css3-plain colored"
                  sx={{ fontSize: "3rem" }}
                />
              </Tooltip>
              <Tooltip title="Java">
                <Box
                  component="i"
                  className="devicon-java-plain colored"
                  sx={{ fontSize: "3rem" }}
                />
              </Tooltip>
              <Tooltip title="React">
                <Box
                  component="i"
                  className="devicon-react-original colored"
                  sx={{ fontSize: "3rem" }}
                />
              </Tooltip>
              <Tooltip title="Material UI">
                <Box
                  component="i"
                  className="devicon-materialui-plain colored"
                  sx={{ fontSize: "3rem" }}
                />
              </Tooltip>
              <Tooltip title="TailwindCSS">
                <Box
                  component="i"
                  className="devicon-tailwindcss-plain colored"
                  sx={{ fontSize: "3rem" }}
                />
              </Tooltip>
              <Tooltip title="MySQL">
                <Box
                  component="i"
                  className="devicon-mysql-plain colored"
                  sx={{ fontSize: "3rem" }}
                />
              </Tooltip>
              <Tooltip title="MariaDB">
                <Box
                  component="i"
                  className="devicon-mariadb-plain colored"
                  sx={{ fontSize: "3rem" }}
                />
              </Tooltip>
            </Stack>

            <Typography
              fontWeight="bold"
              mt={4}
              mb={1}
              sx={{ color: "text.primary" }}
            >
              講義・講習会で触れたことがある
            </Typography>
            <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
              flexWrap="wrap"
              useFlexGap
            >
              <Tooltip title="Go">
                <Box
                  component="i"
                  className="devicon-go-plain colored"
                  sx={{ fontSize: "3rem" }}
                />
              </Tooltip>
              <Tooltip title="JavaScript">
                <Box
                  component="i"
                  className="devicon-javascript-plain colored"
                  sx={{ fontSize: "3rem" }}
                />
              </Tooltip>
              <Tooltip title="Docker">
                <Box
                  component="i"
                  className="devicon-docker-plain colored"
                  sx={{ fontSize: "3rem" }}
                />
              </Tooltip>
              <Tooltip title="Dart">
                <Box
                  component="i"
                  className="devicon-dart-plain colored"
                  sx={{ fontSize: "3rem" }}
                />
              </Tooltip>
              <Tooltip title="Vite">
                <Box
                  component="i"
                  className="devicon-vitejs-plain colored"
                  sx={{ fontSize: "3rem" }}
                />
              </Tooltip>
              <Tooltip title="Flutter">
                <Box
                  component="i"
                  className="devicon-flutter-plain colored"
                  sx={{ fontSize: "3rem" }}
                />
              </Tooltip>
              <Tooltip title="Android Studio">
                <Box
                  component="i"
                  className="devicon-androidstudio-plain colored"
                  sx={{ fontSize: "3rem" }}
                />
              </Tooltip>
              <Tooltip title="Kotlin">
                <Box
                  component="i"
                  className="devicon-kotlin-plain colored"
                  sx={{ fontSize: "3rem" }}
                />
              </Tooltip>
              <Tooltip title="apache">
                <Box
                  component="i"
                  className="devicon-apache-plain colored"
                  sx={{ fontSize: "3rem" }}
                />
              </Tooltip>
              <Tooltip title="PHP">
                <Box
                  component="i"
                  className="devicon-php-plain colored"
                  sx={{ fontSize: "3rem" }}
                />
              </Tooltip>
            </Stack>
          </Box>
        </Container>
      </Box>
    </div>
  );
}
function LiveAge({ birthDate }: { birthDate: Date }) {
  const [age, setAge] = useState(0);

  useEffect(() => {
    const calculateAge = () => {
      const now = new Date();
      let calculatedAge = now.getFullYear() - birthDate.getFullYear();

      // 誕生日がまだ来ていない場合は1歳引く
      const hasHadBirthdayThisYear =
        now.getMonth() > birthDate.getMonth() ||
        (now.getMonth() === birthDate.getMonth() &&
          now.getDate() >= birthDate.getDate());

      if (!hasHadBirthdayThisYear) {
        calculatedAge--;
      }

      setAge(calculatedAge);
    };

    calculateAge();
    const interval = setInterval(calculateAge, 60 * 1000); // 1分ごとに再計算

    return () => clearInterval(interval);
  }, [birthDate]);

  return (
    <Typography variant="body1" align="center" sx={{ color: "text.primary" }}>
      年齢：{age}歳
    </Typography>
  );
}
