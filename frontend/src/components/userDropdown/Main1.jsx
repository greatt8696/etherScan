import React from "react";
import { User, Boxes, Book, LogIn, LogOut } from "lucide-react";

const Main = ({ handleUserDropdown }) => {
  return (
    <div onMouseLeave={() => handleUserDropdown(false)}>
      <div className="introX w-48 py-2 px-3 bg-slate-400/90 absolute top-[72px] -right-[7px] rounded-lg backdrop-blur-sm flex-col space-y-2">
        <div
          className="introY py-2 px-4 w-full rounded-lg cursor-pointer flex hover:bg-black/50"
          style={{ animationDelay: "10ms" }}
        >
          <User color="white" size={24} />
          <a className="mx-auto text-white font-bold whitespace-nowrap">
            메뉴메뉴
          </a>
        </div>
        <div
          className="introY py-2 px-4 w-full rounded-lg cursor-pointer flex hover:bg-black/50"
          style={{ animationDelay: "50ms" }}
        >
          <Boxes color="white" size={24} />
          <a className="mx-auto text-white font-bold  whitespace-nowrap">
            메뉴메뉴
          </a>
        </div>
        <div
          className="introY py-2 px-4 w-full rounded-lg cursor-pointer flex hover:bg-black/50"
          style={{ animationDelay: "100ms" }}
        >
          <Book color="white" size={24} />
          <a className="mx-auto text-white font-bold  whitespace-nowrap">
            메뉴메뉴
          </a>
        </div>
        <div
          className="introY py-2 px-4 w-full rounded-lg cursor-pointer flex hover:bg-black/50"
          style={{ animationDelay: "150ms" }}
        >
          <User color="white" size={24} />
          <a className="mx-auto text-white font-bold  whitespace-nowrap">
            메뉴메뉴
          </a>
        </div>
        <div
          className="introY py-2 px-4 w-full rounded-lg cursor-pointer flex hover:bg-black/50"
          style={{ animationDelay: "200ms" }}
        >
          <User color="white" size={24} />
          <a className="mx-auto text-white font-bold  whitespace-nowrap">
            메뉴메뉴
          </a>
        </div>
        <div
          className="introY py-2 px-4 w-full rounded-lg cursor-pointer flex"
          style={{ animationDelay: "200ms" }}
        >
          <div className="group w-full h-full rounded-lg border-red-600 border-2 p-2 flex hover:bg-red-600 transition-all">
            <LogOut
              className="rounded-sm text-red-600 group-hover:text-white transition-all"
              size={24}
            />
            <p className="text-red-600 font-bold mx-auto group-hover:text-white transition-all  whitespace-nowrap">
              로그아웃
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
