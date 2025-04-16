import { useState, useRef, MouseEvent, WheelEvent, useEffect } from "react";
import {
  Box,
  Modal,
  IconButton,
  Container,
  Typography,
  Tooltip,
  Fade,
} from "@mui/material";

import { Routes } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CenterFocusStrongIcon from "@mui/icons-material/CenterFocusStrong";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import { Masonry } from "@mui/lab";
import Header from "../components/Header";
import imageList from "../data/galleryImages";

export default function GalleryPage() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [zoomScale, setZoomScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [hoverStyle, setHoverStyle] = useState<
    Record<number, React.CSSProperties>
  >({});
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(
    null
  );
  const [isDragging] = useState(false);
  const [isImageDragging, setIsImageDragging] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  const selected = selectedIndex !== null ? imageList[selectedIndex] : null;

  const [loadedCount, setLoadedCount] = useState(0);
  const [allLoaded, setAllLoaded] = useState(false);

  const handlePrev = () => {
    if (selectedIndex !== null) {
      setZoomScale(1);
      setOffset({ x: 0, y: 0 });
      setSelectedIndex(
        (selectedIndex - 1 + imageList.length) % imageList.length
      );
    }
  };

  const handleNext = () => {
    if (selectedIndex !== null) {
      setZoomScale(1);
      setOffset({ x: 0, y: 0 });
      setSelectedIndex((selectedIndex + 1) % imageList.length);
    }
  };

  const handleZoom = (e: WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const rect = imageRef.current?.getBoundingClientRect();
    if (!rect) return;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const scaleBefore = zoomScale;
    const scaleAfter = Math.min(5, Math.max(0.5, scaleBefore + delta));

    const offsetX =
      offset.x -
      ((mouseX - rect.width / 2) * (scaleAfter - scaleBefore)) / scaleAfter;
    const offsetY =
      offset.y -
      ((mouseY - rect.height / 2) * (scaleAfter - scaleBefore)) / scaleAfter;

    setZoomScale(Math.round(scaleAfter * 100) / 100);
    setOffset({ x: offsetX, y: offsetY });
  };

  const handleImageMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    setIsImageDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleWindowMouseUp = () => {
    setDragStart(null);
    setIsImageDragging(false);
  };

  useEffect(() => {
    window.addEventListener("mouseup", handleWindowMouseUp);
    return () => window.removeEventListener("mouseup", handleWindowMouseUp);
  }, []);

  const handleMouseMove = (e: MouseEvent) => {
    if (dragStart && isImageDragging) {
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;
      setOffset((prev) => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY,
      }));
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleClickBackdrop = (e: MouseEvent<HTMLDivElement>) => {
    if (isDragging) return;
    const target = e.target as HTMLElement;
    if (!target.closest("img") && !target.closest("button")) {
      setSelectedIndex(null);
    }
  };

  const resetZoom = () => {
    setZoomScale(1);
    setOffset({ x: 0, y: 0 });
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement && imageRef.current) {
      imageRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const handleMouseHover = (e: MouseEvent<HTMLDivElement>, index: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = -((y - centerY) / centerY) * 3;
    const rotateY = ((x - centerX) / centerX) * 5;

    setHoverStyle((prev) => ({
      ...prev,
      [index]: {
        transform: `perspective(300px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.08)`,
        transition: "transform 0.1s ease-out",
        zIndex: 10,
      },
    }));
  };

  const handleMouseLeave = (index: number) => {
    setHoverStyle((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        transform: "none",
        transition: "transform 0.15s ease-in",
        zIndex: 10,
      },
    }));

    setTimeout(() => {
      setHoverStyle((prev) => ({
        ...prev,
        [index]: {
          ...prev[index],
          zIndex: "auto",
        },
      }));
    }, 200);
  };

  useEffect(() => {
    if (loadedCount === imageList.length) {
      setAllLoaded(true);
    }
  }, [loadedCount]);

  return (
    <>
      <Header />
      <Routes>{/* your routes here */}</Routes>

      <Box
        sx={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg,rgb(255, 243, 250),rgb(177, 186, 206))",
          py: 4,
        }}
      >
        <Container maxWidth="xl">
          {imageList.map((filename) => (
            <img
              key={filename}
              src={`${import.meta.env.BASE_URL}galleryimages/${filename}`}
              onLoad={() => setLoadedCount((prev) => prev + 1)}
              style={{ display: "none" }}
              alt=""
            />
          ))}
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <svg viewBox="0 0 500 100" width="100%" height="100">
              <defs>
                <linearGradient
                  id="glitterGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#8b7500" />
                  <stop offset="50%" stopColor="#d49d17" />
                  <stop offset="100%" stopColor="#8b7500" />
                </linearGradient>
              </defs>
              <text
                x="50%"
                y="40%"
                dominantBaseline="middle"
                textAnchor="middle"
                fill="url(#glitterGradient)"
                fontFamily="'Cinzel', serif"
                fontSize="48"
                style={{ letterSpacing: 2, fontWeight: "bold" }}
              >
                Gallery
              </text>
            </svg>

            <Box
              sx={{
                width: "300px",
                height: "4px",
                background:
                  "linear-gradient(to right,rgb(184, 141, 0),rgb(255, 216, 110) )",
                mx: "auto",
                borderRadius: "2px",
                mt: -4,
                mb: 5,
              }}
            />
          </Box>
          {!allLoaded ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mt: 6,
              }}
            >
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  border: "6px solid",
                  borderColor: "transparent",
                  borderTopColor: "#daa520",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                  mb: 2,
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "'Cinzel', serif",
                  fontWeight: 600,
                  color: "#555555",
                  letterSpacing: 1,
                  textShadow: "0.5px 0.5px 1px rgba(0, 0, 0, 0.1)",
                }}
              >
                読み込み中… {loadedCount} / {imageList.length}
              </Typography>
            </Box>
          ) : (
            <Masonry
              columns={{ xs: 2, sm: 3, md: 4, lg: 5, xl: 6 }}
              spacing={2}
            >
              {imageList.map((filename, index) => (
                <Box
                  key={filename}
                  onClick={() => {
                    setSelectedIndex(index);
                    setZoomScale(1);
                    setOffset({ x: 0, y: 0 });
                  }}
                  onMouseMove={(e) => handleMouseHover(e, index)}
                  onMouseLeave={() => handleMouseLeave(index)}
                  sx={{
                    cursor: "pointer",
                    borderRadius: 2,
                    overflow: "hidden",
                    backgroundColor: "#ffffff80",
                    position: "relative",
                    transformStyle: "preserve-3d",
                    animation: "fadeIn 0.8s ease forwards",
                    animationDelay: `${index * 60}ms`,
                    opacity: 0,
                    ...hoverStyle[index],
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: "-75%",
                      width: "50%",
                      height: "100%",
                      background:
                        "linear-gradient(120deg, rgba(255,255,255,0.0) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.0) 100%)",
                      transform: "skewX(-20deg)",
                      transition: "left 0.5s ease-in-out, opacity 0.2s",
                      zIndex: 2,
                      pointerEvents: "none",
                      opacity: 0,
                    },
                    "&:hover::before": { left: "125%", opacity: 1 },
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      height: "auto",
                      borderRadius: 2,
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      component="img"
                      src={`${
                        import.meta.env.BASE_URL
                      }galleryimages/${filename}`}
                      alt={filename}
                      sx={{
                        width: "100%",
                        height: "auto",
                        display: "block",
                        userSelect: "none",
                        pointerEvents: "none",
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        zIndex: 10,
                      }}
                    />
                  </Box>
                </Box>
              ))}
            </Masonry>
          )}
          {allLoaded && (
            <Typography
              variant="caption"
              display="block"
              textAlign="center"
              mt={3}
              color="text.secondary"
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                padding: "8px",
                borderRadius: "8px",
                fontFamily: "Cinzel, serif",
                fontWeight: "bold",
                fontSize: "0.rem",
              }}
            >
              ※イラストの無断転載・利用・学習はご遠慮ください。
            </Typography>
          )}
        </Container>
        <Modal
          open={selected !== null}
          onClose={() => setSelectedIndex(null)}
          closeAfterTransition
        >
          <Fade in={selected !== null} timeout={300}>
            <Box
              onWheel={handleZoom}
              onMouseMove={handleMouseMove}
              onClick={handleClickBackdrop}
              sx={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(0,0,0,0.7)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 2000,
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  position: "absolute",
                  top: 16,
                  left: 16,
                  color: "white",
                  backgroundColor: "rgba(0,0,0,0.5)",
                  px: 2,
                  py: 0.5,
                  borderRadius: 1,
                  zIndex: 2100,
                }}
              >
                {selected?.replace(/\.[^/.]+$/, "")}
              </Typography>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                sx={{ ...iconButtonStyle, left: 16, zIndex: 2100 }}
              >
                <ChevronLeftIcon fontSize="large" />
              </IconButton>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                sx={{ ...iconButtonStyle, right: 16, zIndex: 2100 }}
              >
                <ChevronRightIcon fontSize="large" />
              </IconButton>
              <Box
                sx={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  display: "flex",
                  gap: 1,
                  zIndex: 2100,
                }}
              >
                <Tooltip title="拡大をリセット">
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      resetZoom();
                    }}
                    sx={controlButtonStyle}
                  >
                    <CenterFocusStrongIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="全画面表示">
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFullScreen();
                    }}
                    sx={controlButtonStyle}
                  >
                    <OpenInFullIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="閉じる">
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedIndex(null);
                    }}
                    sx={controlButtonStyle}
                  >
                    <CloseIcon />
                  </IconButton>
                </Tooltip>
              </Box>
              {selected && (
                <Box
                  ref={imageRef}
                  component="img"
                  src={`${import.meta.env.BASE_URL}galleryimages/${selected}`}
                  alt={selected}
                  onLoad={() => setLoadedCount((count) => count + 1)}
                  onError={() => setLoadedCount((count) => count + 1)}
                  onMouseDown={handleImageMouseDown}
                  onClick={(e) => e.stopPropagation()}
                  onContextMenu={(e) => e.preventDefault()}
                  sx={{
                    transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoomScale})`,
                    transition: "transform 0.1s ease-out",
                    maxWidth: "100%",
                    maxHeight: "100%",
                    userSelect: "none",
                    zIndex: 2000,
                    pointerEvents: "auto",
                    position: "relative",
                    cursor: "grab",
                  }}
                />
              )}
            </Box>
          </Fade>
        </Modal>
      </Box>
    </>
  );
}

const iconButtonStyle = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  backdropFilter: "blur(6px)",
  backgroundColor: "rgba(255, 255, 255, 0.6)",
  outline: "none",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  "&:focus": {
    outline: "none",
  },
};

const controlButtonStyle = {
  backdropFilter: "blur(4px)",
  backgroundColor: "rgba(255,255,255,0.6)",
  outline: "none",
  "&:hover": {
    backgroundColor: "rgba(255,255,255,0.9)",
  },
  "&:focus": {
    outline: "none",
  },
};
