import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";

const Loader = () => {
  const [loaderColor, setLoaderColor] = useState("text-blue-500");

  useEffect(() => {
    const colors = ["text-blue-500", "text-orange-500", "text-green-500"];
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % colors.length;
      setLoaderColor(colors[index]);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`text-xl font-semibold ${loaderColor} w-full min-h-[60vh] flex justify-center items-center`}
    >
      <LoaderCircle className="w-20 h-20 animate-spin transition-colors" />
    </div>
  );
};

export default Loader;
