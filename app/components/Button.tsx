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

const SubmitButton = ({ text, isPending, afterSubmitText } : {
  text: string;
  isPending?: boolean;
  afterSubmitText: string
}) => {
  return (
    <button aria-disabled={isPending} type="submit" className="px-6 py-2 font-Philosopher bg-black text-white hover:bg-white hover:text-black border-2 border-white rounded-lg transition ease-in-out duration-200">
      {isPending ? afterSubmitText : text}
    </button>
  )
}

export { Button, SubmitButton };
