    import { Input } from "@/components/ui/input";
    import { LucideIcon } from "lucide-react";
    import { ForwardedRef, forwardRef } from "react";

    interface FormInputProps {
        icon: LucideIcon;
        type: string;
        placeholder: string;
        mask?: (value: string) => string;
        error?: string;
    }

    const FormInput = forwardRef(
        ({ icon: Icon, type, placeholder, mask, error, ...rest }: FormInputProps, ref: ForwardedRef<HTMLInputElement>) => {
            return (
                <div className="flex flex-col">
                    <div className="flex flex-row items-center border border-[#D1D1D1] rounded-md">
                        <div>
                            <Icon className="ml-2 mr-2" />
                        </div>
                        <div className="border-l w-full">
                            <Input
                                type={type}
                                placeholder={placeholder}
                                ref={ref}
                                {...rest}
                                autoComplete="off"
                                onChange={(e) => {
                                    if (mask) {
                                        e.target.value = mask(e.target.value);
                                    }
                                }}
                                className="border-none focus:ring-0 shadow-none focus-visible:border-none focus-visible:ring-0 focus-visible:shadow-none border-l w-full"
                            />
                        </div>
                    </div>
                    {error && <p className="text-red-500 animate-fade-in">{error}</p>}
                </div>
            );
        }
    );

    FormInput.displayName = "FormInput";

    export default FormInput;