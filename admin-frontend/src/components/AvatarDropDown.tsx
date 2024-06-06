import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import AvatarC from "./Avatar";
import { useNavigate } from "react-router-dom";

const AvatarDropDown = () => {
  const navigate = useNavigate();
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="rounded-full w-[35px] h-[35px] inline-flex items-center justify-center text-violet11 bg-white shadow-[0_2px_10px] shadow-blackA4 outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black"
          aria-label="Customise options"
        >
          <AvatarC />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[150px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
          sideOffset={5}
        >
          <DropdownMenu.Item className=" hover:bg-slate-300 group text-[15px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative  select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
            Profile{" "}
          </DropdownMenu.Item>{" "}
          <DropdownMenu.Separator
            className="m-[5px]"
            style={{ border: "1px solid #E1E1E1" }}
          />
          <DropdownMenu.Item
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
            className="hover:bg-slate-300 group text-[15px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative  select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
          >
            LogOut{" "}
          </DropdownMenu.Item>
          <DropdownMenu.Separator className="h-[1px] bg-violet6 m-[5px]" />
          <DropdownMenu.Arrow className="fill-white" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default AvatarDropDown;
