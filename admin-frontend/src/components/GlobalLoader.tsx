import { Flex } from "@radix-ui/themes";
import { BeatLoader } from "react-spinners";

const GlobalLoader = ({ opacity = 0 }: { opacity: number }) => {
  return (
    <Flex
      align="center"
      justify={"center"}
      gap="4"
      className={`min-h-[100vh] min-w-[99vw] fixed bg-slate-300 ${
        opacity === 0 ? "opacity-0" : `opacity-${opacity}`
      }  overflow-hidden z-50`}
    >
      <BeatLoader color="#36d7b7" />
    </Flex>
  );
};

export default GlobalLoader;
