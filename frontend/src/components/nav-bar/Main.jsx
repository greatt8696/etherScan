import React, { useRef, useState } from "react";
import {
  Book,
  Boxes,
  ChevronDown,
  LogIn,
  LogOut,
  User,
  Users,
  Wallet,
} from "lucide-react";
import MenuDropdown from "../userDropdown/Main";
import UserDropdown from "../userDropdown/Main1";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const nav = useNavigate();
  const userDropdownArrowRef = useRef();
  const [onUserDropdown, setOnUserDropdown] = useState(true);
  const [onMenusDropdown, setOnMenusDropdown] = useState([
    { type: "menu1", value: false },
    { type: "menu2", value: false },
    { type: "menu3", value: false },
    { type: "menu4", value: false },
    { type: "menu5", value: false },
  ]);

  const getClassState = (state) => {
    if (state)
      return {
        className: "transition-all rotate-180",
      };
    else
      return {
        className: "transition-all",
      };
  };

  const handleUserDropdown = (onOff) => {
    onOff ? setOnUserDropdown(true) : setOnUserDropdown(false);
  };

  const handleMenusDropdown = (type, onOff) => {
    const setThisType = onMenusDropdown.map((menuData) =>
      type === menuData.type ? { type, value: onOff } : { ...menuData }
    );

    let setAnotherType = [...setThisType];

    if (onOff) {
      setAnotherType = setThisType.map((menuData) =>
        type === menuData.type
          ? { ...menuData }
          : { type: menuData.type, value: !onOff }
      );
    }
    setOnMenusDropdown(setAnotherType);
  };

  const linkToGallery = () => nav("/gallery");
  const linkToMain = () => nav("/");

  const menu1Dropdown = [
    { title: "드롭다운1메뉴1", IconTag: Users, link: () => linkToGallery },
    { title: "드롭다운1메뉴2", IconTag: Users, link: () => linkToMain },
    { title: "드롭다운1메뉴3", IconTag: Users, link: () => linkToGallery },
    { title: "드롭다운1메뉴4", IconTag: Users, link: () => linkToMain },
    { title: "드롭다운1메뉴5", IconTag: Users, link: () => linkToGallery },
    { title: "드롭다운1메뉴6", IconTag: Users, link: () => linkToMain },
    { title: "드롭다운1메뉴7", IconTag: Users, link: () => linkToGallery },
    { title: "드롭다운1메뉴8", IconTag: Users, link: () => linkToMain },
  ];

  const menu2Dropdown = [
    { title: "드롭다운2메뉴1", IconTag: Users, link: () => linkToGallery },
    { title: "드롭다운2메뉴2", IconTag: Users, link: () => linkToMain },
    { title: "드롭다운2메뉴3", IconTag: Users, link: () => linkToGallery },
    { title: "드롭다운2메뉴4", IconTag: Users, link: () => linkToMain },
    { title: "드롭다운2메뉴5", IconTag: Users, link: () => linkToGallery },
    { title: "드롭다운2메뉴6", IconTag: Users, link: () => linkToMain },
    { title: "드롭다운2메뉴7", IconTag: Users, link: () => linkToGallery },
    { title: "드롭다운2메뉴8", IconTag: Users, link: () => linkToMain },
  ];

  const menu3Dropdown = [
    { title: "드롭다운3메뉴1", IconTag: Users, link: () => linkToGallery },
    { title: "드롭다운3메뉴2", IconTag: Users, link: () => linkToMain },
    { title: "드롭다운3메뉴3", IconTag: Users, link: () => linkToGallery },
    { title: "드롭다운3메뉴4", IconTag: Users, link: () => linkToMain },
    { title: "드롭다운3메뉴5", IconTag: Users, link: () => linkToGallery },
    { title: "드롭다운3메뉴6", IconTag: Users, link: () => linkToMain },
    { title: "드롭다운3메뉴7", IconTag: Users, link: () => linkToGallery },
    { title: "드롭다운3메뉴8", IconTag: Users, link: () => linkToMain },
  ];

  const menu4Dropdown = [
    { title: "드롭다운4메뉴1", IconTag: Users, link: () => linkToGallery },
    { title: "드롭다운4메뉴2", IconTag: Users, link: () => linkToMain },
    { title: "드롭다운4메뉴3", IconTag: Users, link: () => linkToGallery },
    { title: "드롭다운4메뉴4", IconTag: Users, link: () => linkToMain },
    { title: "드롭다운4메뉴5", IconTag: Users, link: () => linkToGallery },
    { title: "드롭다운4메뉴6", IconTag: Users, link: () => linkToMain },
    { title: "드롭다운4메뉴7", IconTag: Users, link: () => linkToGallery },
    { title: "드롭다운4메뉴8", IconTag: Users, link: () => linkToMain },
  ];
  const menu5Dropdown = [
    { title: "드롭다운5메뉴1", IconTag: Users, link: () => linkToGallery },
    { title: "드롭다운5메뉴2", IconTag: Users, link: () => linkToMain },
    { title: "드롭다운5메뉴3", IconTag: Users, link: () => linkToGallery },
    { title: "드롭다운5메뉴4", IconTag: Users, link: () => linkToMain },
    { title: "드롭다운5메뉴5", IconTag: Users, link: () => linkToGallery },
    { title: "드롭다운5메뉴6", IconTag: Users, link: () => linkToMain },
    { title: "드롭다운5메뉴7", IconTag: Users, link: () => linkToGallery },
    { title: "드롭다운5메뉴8", IconTag: Users, link: () => linkToMain },
  ];

  const userDropdown = [
    { title: "유저드롭메뉴1", IconTag: User, link: () => linkToGallery },
    { title: "유저드롭메뉴2", IconTag: Boxes, link: () => linkToMain },
    { title: "유저드롭메뉴3", IconTag: Book, link: () => linkToGallery },
    { title: "유저드롭메뉴4", IconTag: User, link: () => linkToMain },
    { title: "유저드롭메뉴5", IconTag: LogOut, link: () => linkToGallery },
    { title: "로그아웃6", IconTag: LogIn, link: () => linkToMain },
  ];

  return (
    <div className="animate-introX w-[94%] min-w-[800px] bg-slate-400/90 backdrop-blur-sm  rounded-lg p-2 mt-5 mx-auto z-50">
      <div className="w-full min-w-[600px] flex items-center justify-between space-x-1 relative">
        <nav
          className="flex items-center space-x-3 w-[80px] lg:w-[260px]"
          onClick={linkToMain}
        >
          <img
            className="h-20 w-20 -left-5 rounded-full absolute ring ring-slate-400"
            src="/images/1.jpg"
          ></img>
          <h1 className="hidden text-2xl font-bold pl-16 text-white lg:block  whitespace-nowrap">
            죠르디 귀여우다
          </h1>
        </nav>
        <nav className="flex items-center mx-auto divide-x divide-solid">
          <a
            className="introY cursor-pointer h-full scale-y-125  text-white font-bold text-lg px-5 whitespace-nowrap relative"
            style={{ animationDelay: "50ms" }}
            onClick={linkToGallery}
          >
            <div
              className="h-[88px] -top-5 w-full absolute  scale-x-75 -left-0"
              onMouseEnter={() => handleMenusDropdown("menu1", true)}
              onMouseLeave={() => handleMenusDropdown("menu1", false)}
            ></div>
            메뉴메뉴
            {onMenusDropdown[0].value && (
              <MenuDropdown
                on={() => handleMenusDropdown("menu1", true)}
                off={() => handleMenusDropdown("menu1", false)}
                menuData={menu1Dropdown}
              />
            )}
          </a>
          <a
            className="introY cursor-pointer text-white font-bold text-lg px-5  whitespace-nowrap"
            style={{ animationDelay: "100ms" }}
            onClick={linkToMain}
          >
            <div
              className="h-[88px] -top-5 w-full absolute  scale-x-75 -left-0"
              onMouseEnter={() => handleMenusDropdown("menu2", true)}
              onMouseLeave={() => handleMenusDropdown("menu2", false)}
            ></div>
            메뉴메뉴
            {onMenusDropdown[1].value && (
              <MenuDropdown
                on={() => handleMenusDropdown("menu2", true)}
                off={() => handleMenusDropdown("menu2", false)}
                menuData={menu2Dropdown}
              />
            )}
          </a>
          <a
            className="introY cursor-pointer text-white font-bold text-lg px-5  whitespace-nowrap"
            style={{ animationDelay: "150ms" }}
            onClick={linkToGallery}
          >
            <div
              className="h-[88px] -top-5 w-full absolute  scale-x-75 -left-0"
              onMouseEnter={() => handleMenusDropdown("menu3", true)}
              onMouseLeave={() => handleMenusDropdown("menu3", false)}
            ></div>
            메뉴메뉴
            {onMenusDropdown[2].value && (
              <MenuDropdown
                on={() => handleMenusDropdown("menu3", true)}
                off={() => handleMenusDropdown("menu3", false)}
                menuData={menu3Dropdown}
              />
            )}
          </a>
          <a
            className="introY cursor-pointer text-white font-bold text-lg px-5  whitespace-nowrap"
            style={{ animationDelay: "200ms" }}
            onClick={linkToMain}
          >
            <div
              className="h-[88px] -top-5 w-full absolute  scale-x-75 -left-0"
              onMouseEnter={() => handleMenusDropdown("menu4", true)}
              onMouseLeave={() => handleMenusDropdown("menu4", false)}
            ></div>
            메뉴메뉴
            {onMenusDropdown[3].value && (
              <MenuDropdown
                on={() => handleMenusDropdown("menu4", true)}
                off={() => handleMenusDropdown("menu4", false)}
                menuData={menu4Dropdown}
              />
            )}
          </a>
          <a
            className="introY cursor-pointer text-white font-bold text-lg px-5 whitespace-nowrap"
            style={{ animationDelay: "250ms" }}
            onClick={linkToGallery}
          >
            <div
              className="h-[88px] -top-5 w-full absolute  scale-x-75 -left-0"
              onMouseEnter={() => handleMenusDropdown("menu5", true)}
              onMouseLeave={() => handleMenusDropdown("menu5", false)}
            ></div>
            메뉴메뉴
            {onMenusDropdown[4].value && (
              <MenuDropdown
                on={() => handleMenusDropdown("menu5", true)}
                off={() => handleMenusDropdown("menu5", false)}
                menuData={menu5Dropdown}
              />
            )}
          </a>
        </nav>
        {/* userDropdown begin */}
        <nav className="flex items-center w-[80px] lg:w-[260px] mr-5 relate">
          <a className="flex items-center cursor-pointer ml-auto mr-2">
            <Wallet className="text-white ml-auto" size={30} />
          </a>
          <a
            className="flex items-center  w-18  cursor-pointer ml-5"
            onClick={handleUserDropdown}
            onMouseEnter={() => handleUserDropdown(true)}
            onMouseDown={() => handleUserDropdown(false)}
          >
            <img
              className="h-14 w-14 -left-5 rounded-full ring ring-slate-400"
              src="/images/0.jpg"
            ></img>
            <ChevronDown
              {...getClassState(onUserDropdown)}
              ref={userDropdownArrowRef}
              color="white"
              size={24}
            />
          </a>
          {onUserDropdown && (
            <UserDropdown handleUserDropdown={handleUserDropdown} />
          )}
        </nav>
        {/* userDropdown end */}
      </div>
    </div>
  );
};

export default Main;
