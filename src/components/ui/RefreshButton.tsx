import { IoMdRefresh } from "react-icons/io";

const RefreshButton = ({ onRefresh }: { onRefresh: () => void }) => {
  return (
    <button
      onClick={onRefresh}
      className="text-gray-500 p-1 rounded-full hover:bg-slate-100 active:rotate-360 transition-all duration-500 hover:text-blue-500 cursor-pointer "
    >
      <IoMdRefresh size={20} />
    </button>
  );
};
export default RefreshButton;
