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
          <p className="text-black pb-1 font-Philosopher">{text}:</p>
          <input
            type={type}
            name={name}
            size={30}
            id={id}
            className="w-full pl-2 py-2 text-black rounded-sm font-Philosopher"
            placeholder={`Your ${text}`}
            onChange={onChange}
          />
        </div>
      </>
    );
  };