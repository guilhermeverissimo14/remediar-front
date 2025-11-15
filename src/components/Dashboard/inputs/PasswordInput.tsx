import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Lock } from "lucide-react";
import { ChangeEventHandler } from "react";

interface PasswordInputProps {
  placeholder: string;
  label: string;
  visible: boolean;
  toggle: () => void;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  fieldName: string;
  camposComErro?: string[];
}

export default function PasswordInput({
  placeholder,
  label,
  visible,
  toggle,
  value,
  onChange,
  fieldName,
  camposComErro = [],
}: PasswordInputProps) {
  const temErro = camposComErro.includes(fieldName);

  return (
    <div className="space-y-2">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <Lock className="h-6 w-6 text-gray-400" />
        </div>
        <Input
          type={visible ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`pl-14 h-16 text-lg border-2 rounded-md w-full bg-white ${
            temErro ? "border-red-500 focus:border-red-500" : ""
          }`}
        />
        <button
          type="button"
          onClick={toggle}
          className="absolute inset-y-0 right-0 flex items-center pr-4"
        >
          {visible ? (
            <EyeOff className="h-6 w-6 text-gray-400" />
          ) : (
            <Eye className="h-6 w-6 text-gray-400" />
          )}
        </button>
      </div>
      <div
        className={`text-base pl-3 ${
          temErro ? "text-red-500" : "text-gray-500"
        }`}
      >
        {label} <span className="text-red-500">*</span>
      </div>
    </div>
  );
}