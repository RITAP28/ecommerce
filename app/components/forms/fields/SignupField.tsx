export const SignupField = ({
    type,
    text,
    id,
    name,
    onChange
  }: {
    type: string;
    text: string;
    id: string;
    name: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }) => {
    return (
      <>
        <div className="w-full flex flex-col">
          <p className="text-white pb-1 font-Philosopher">{text}:</p>
          <input
            type={type}
            name={name}
            size={30}
            id={id}
            className="w-full pl-2 py-2 text-black rounded-sm font-Code"
            placeholder={`Your ${text}`}
            onChange={onChange}
          />
        </div>
      </>
    );
  };