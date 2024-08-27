export const Callout = ({ emoji = null, text = null, children }) => (
  <div className="bg-gray-100 border-2 border-gray-700 rounded-lg dark:bg-[#333] dark:text-gray-300 flex items-start p-3 my-6 text-base">
    <span className="block w-6 text-center mr-2 scale-[1.2]">{emoji}</span>
    <span className="block grow">{text ?? children}</span>
  </div>
);
