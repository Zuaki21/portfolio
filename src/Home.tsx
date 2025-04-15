import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function useRedirect() {
  const [isRedirected, setIsRedirected] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const url = window.href;
    const urlObj = new URL(url);
    const params = new URLSearchParams(urlObj.search);
    const targetPath = params.get("path");
    if (targetPath != null) {
      // ページ遷移
      setIsRedirected(true);
      navigate(targetPath);
    }
  }, [navigate]);

  return isRedirected;
}

export default useRedirect;
