import { Caption } from "./caption";

export const Snippet = ({ children, caption = null }) => {
  return (
    <div className="my-6">
      <div
        className={`p-2 rounded-lg bg-gray-800 text-white dark:bg-[#222] dark:text-gray-300`}
      >
        {children}
      </div>
      {caption != null ? <Caption>{caption}</Caption> : null}
    </div>
  );
};
