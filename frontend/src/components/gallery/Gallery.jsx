import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const Gallery = ({ delay, idx }) => {
  const [life, setLife] = useState("intro"); // intro / hidden / delete
  const nav = useNavigate();
  const handleLink = () => nav(`/${idx}`);
  const gallerySet = (delay) => {
    return {
      className: "introY w-full p-1",
      style: { animationDelay: `${delay}ms` },
      state: "",
    };
  };

  // const imgUrl = (idx) => new URL(`/images/${idx}.jpg`, import.meta.url).href;

  return (
    <div {...gallerySet(delay)} onClick={handleLink}>
      {life === "intro" && (
        <div className="bg-slate-400 py-2 px-2 rounded flex-col space-y-2">
          <h1 className="text-xl font-bold">제목{idx}</h1>
          <img
            className="w-full h-66 min-w-66 min-h-66 rounded-md mx-auto object-contain"
            src={`/images/${idx}.jpg`}
          ></img>
          <p>
            내용{idx}내용{idx}내용{idx}내용{idx}내용{idx}내용{idx}내용{idx}내용
            {idx}내용{idx}내용{idx}내용{idx}내용{idx}내용{idx}내용{idx}내용{idx}
            내용{idx}
          </p>
        </div>
      )}
    </div>
  );
};

export default React.memo(Gallery);
