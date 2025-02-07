import {
  useState,
  RefObject,
  ReactNode,
  useContext,
  cloneElement,
  ReactElement,
  createContext,
  isValidElement,
} from "react";
import Link from "next/link";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

import useClickOutside from "@/hooks/useClickOutside";

type CommonProps = {
  children: ReactNode;
  icon?: ReactNode;
};
type BtnProps = CommonProps & {
  as?: "button";
  onClick?: () => void;
};
type AnchorProps = CommonProps & {
  as: "Link";
  href: string;
};
type ButtonProps = BtnProps | AnchorProps;

type MenuContextType = {
  openID: string | number;
  open: (id: string | number) => void;
  close: () => void;
};

type MenuProviderProps = {
  children: ReactNode;
};

type ToggleProps = {
  id: string | number;
  children?: ReactElement<{
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  }>;
};

type ListProps = {
  id: string | number;
  children: ReactNode;
  isLast?: boolean;
};

const MenuContext = createContext<MenuContextType | undefined>(undefined);

function Menus({ children }: MenuProviderProps) {
  const [openID, setOpenID] = useState<string | number>("");

  const open = setOpenID;
  const close = () => setOpenID("");

  return (
    <MenuContext.Provider value={{ openID, open, close }}>
      {children}
    </MenuContext.Provider>
  );
}

function Menu({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex items-center justify-end w-fit mx-auto">
      {children}
    </div>
  );
}

function Toggle({ id, children }: ToggleProps) {
  const { open, close, openID } = useMenuContext();

  const handleClick = () => {
    if (openID == "" || openID != id) {
      open(id);
    } else {
      close();
    }
  };

  if (children) {
    if (isValidElement(children)) {
      return cloneElement(children, {
        onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
          if (children.props.onClick) {
            children.props.onClick(e);
          }
          handleClick();
        },
      });
    }
    return <>{children}</>;
  }
  return (
    <button
      onClick={handleClick}
      className="bg-transparent p-2 rounded-full text-gray-500 focus:ring-transparent focus:outline-none focus:ring-4 focus:bg-gray-200 focus:text-gray-900 hover:text-gray-900 hover:bg-gray-200"
    >
      <EllipsisVerticalIcon className="size-6 " />
    </button>
  );
}

function List({ children, id, isLast = false }: ListProps) {
  const { openID, close } = useMenuContext();

  const ref = useClickOutside(close, false);

  if (openID != id) return null;

  return (
    <ul
      ref={ref as RefObject<HTMLUListElement>}
      className={`absolute top-10 right-0.5 z-50 min-w-[170px] shadow rounded-md bg-white dark:bg-[#111827] ${
        isLast ? "!bottom-9 !top-[initial]" : ""
      }`}
    >
      {children}
    </ul>
  );
}

// function Button({ children, icon, onClick }: ButtonProps) {
//   const { close } = useMenuContext();

//   const handleClick = () => {
//     onClick?.();
//     close();
//   };

//   return (
//     <button
//       onClick={handleClick}
//       className="flex w-full items-center gap-3 rounded px-3 py-2 font-medium text-sm text-gray-600 hover:text-gray-900 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-300/30 dark:hover:bg-gray-700 dark:hover:text-white"
//     >
//       {icon} {children}
//     </button>
//   );
// }

function Button({ children, icon, as = "button", ...props }: ButtonProps) {
  const { close } = useMenuContext();

  const handleClick = () => {
    if (as === "button" && "onClick" in props) {
      props.onClick?.();
      close();
    }
  };

  const commonClasses =
    "flex w-full items-center gap-3 px-3 py-2 font-medium text-sm text-gray-600 hover:text-gray-900 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-300/30 dark:hover:bg-gray-700 dark:hover:text-white";

  if (as === "Link" && "href" in props) {
    return (
      <Link href={props.href} className={commonClasses}>
        {icon} {children}
      </Link>
    );
  }

  return (
    <button onClick={handleClick} className={commonClasses}>
      {icon} {children}
    </button>
  );
}

function Divider() {
  return <hr className="my-1 bg-gray-200 dark:bg-gray-600" />;
}

function ButtonGroup({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <div className="px-3 pt-1 pb-2">
      {title && (
        <h3 className="text-sm font-semibold text-gray-900 pb-2">{title}</h3>
      )}
      <div className="flex justify-between items-center">{children}</div>
    </div>
  );
}

function useMenuContext() {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenuContext must be used within a MenuProvider");
  }
  return context;
}

Menus.Menu = Menu;
Menus.List = List;
Menus.Toggle = Toggle;
Menus.Button = Button;
Menus.Divider = Divider;
Menus.ButtonGroup = ButtonGroup;

export default Menus;
