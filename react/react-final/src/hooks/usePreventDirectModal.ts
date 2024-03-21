import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBasePath } from ".";

export default function usePreventDirectModal() {
  const params = useParams();
  const firstLoad = useRef(false);
  const basePath = useBasePath();
  const navigate = useNavigate();

  useEffect(() => {
    if (params?.id && !firstLoad.current) {
      navigate(basePath ?? "/", { replace: true });
    }

    firstLoad.current = true;
  }, [params, navigate, basePath]);
}
