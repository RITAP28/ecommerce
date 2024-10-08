export const SigninField = ({
    type,
    text,
    id,
    name
  }: {
    type: string;
    text: string;
    id: string;
    name: string;
  }) => {
    return (
      <>
        <div className="w-full flex flex-col">
          <p className="text-black pb-1 font-Philosopher">{text}:</p>
          <input
            type={type}
            name={name}
            size={30}
            id={id}
            className="w-full pl-2 py-2 text-black rounded-sm font-Code"
            placeholder={`Your ${text}`}
          />
        </div>
      </>
    );
  };