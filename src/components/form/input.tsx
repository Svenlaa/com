import { Dispatch, SetStateAction } from "react";

type Props = {
  label: string;
  unit?: string;
  val: string;
  set: Dispatch<SetStateAction<string>>;
};

const Input = ({
  label,
  className,
  unit,
  set,
  val,
  ...props
}: Omit<JSX.IntrinsicElements["input"], "value"> & Props) => {
  return (
    <div className="my-2 flex w-full flex-row items-center justify-between">
      <span className="mr-1 font-bold">
        {label}
        {props.required && (
          <span className="px-1 font-bold text-red-600">*</span>
        )}
      </span>
      <span className={`flex w-[16ch] flex-row items-center ${className}`}>
        <input
          className={`w-full rounded-sm px-[2px] leading-relaxed text-black`}
          value={val}
          onChange={(e) => set(e.target.value)}
          {...props}
        />
        {unit && (
          <span className="ml-1 text-lg font-bold leading-tight">{unit}</span>
        )}
      </span>
    </div>
  );
};

export default Input;
