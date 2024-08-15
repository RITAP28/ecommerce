import React from "react";

const Button = ({ text, onClick }: { text: string, onClick: () => void }) => {
  return (
    <button
      type="button"
      className="px-6 py-2 bg-black text-white hover:bg-white hover:text-black border-2 border-white rounded-sm transition ease-in-out duration-200"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

const SubmitButton = ({ text } : {
  text: string;
}) => {
  return (
    <button type="submit" className="px-6 py-2 bg-black text-white hover:bg-white hover:text-black border-2 border-white rounded-sm transition ease-in-out duration-200">
      {text}
    </button>
  )
}

export { Button, SubmitButton };
