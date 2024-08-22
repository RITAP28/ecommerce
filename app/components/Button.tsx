import React from "react";

const Button = ({ text, onClick }: { text: string, onClick: () => void }) => {
  return (
    <button
      type="button"
      className="px-6 py-1 bg-slate-500 text-white hover:bg-white hover:text-black border-2 border-black rounded-md transition ease-in-out duration-200 font-Philosopher"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

const SubmitButton = ({ text, isPending, afterSubmitText } : {
  text: string;
  isPending?: boolean;
  afterSubmitText: string
}) => {
  return (
    <button aria-disabled={isPending} type="submit" className="px-6 py-1 font-Philosopher bg-slate-500 text-white hover:bg-white hover:text-black border-2 border-black rounded-md transition ease-in-out duration-200">
      {isPending ? afterSubmitText : text}
    </button>
  )
}

export { Button, SubmitButton };
