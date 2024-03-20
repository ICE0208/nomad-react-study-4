import { useLocation, useParams } from "react-router-dom";

const useBasePath = () => {
  const location = useLocation();
  const params = useParams<Record<string, string>>();

  const pathWithoutParams = Object.values(params).reduce(
    (path, param) => path?.replace("/" + param, ""),
    location.pathname,
  );

  if (pathWithoutParams && pathWithoutParams?.length >= 2) {
    return "/" + pathWithoutParams.slice(1).replace("/", "");
  }
  return pathWithoutParams;
};

export default useBasePath;
