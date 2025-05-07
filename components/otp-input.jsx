import React, { useState, useRef, useEffect } from "react";
import { TextField } from "@mui/material";

const OTPInput = ({ length = 4, onChange, onComplete, onFocus, onBlur, value }) => {
    const [otp, setOtp] = useState(Array(length).fill(""));
    const inputRefs = useRef(Array(length).fill(null));

    useEffect(() => {
        if (onChange) {
            onChange(otp.join("")); // Call onChange with the current OTP value
        }
        // Only call onComplete if every digit is filled
        if (otp.every((digit) => digit) && onComplete) {
            onComplete(otp.join("")); // Call onComplete when OTP is fully entered
        }
    }, [otp]);

    useEffect(() => {
        if (value) {
            setOtp((prev) => {
                Array.from({ length }).forEach((_, index) => {
                    prev[index] = value[index] || "";
                });
                return prev;
            });
        }
    }, [value]);

    const handleChange = (index, event) => {
        const value = event.target.value;

        // Allow only numeric input
        if (/^\d*$/.test(value) && value.length <= 1) {
            const newOtp = [...otp];
            newOtp[index] = value;

            // Only update state if it actually changes
            if (JSON.stringify(newOtp) !== JSON.stringify(otp)) {
                setOtp(newOtp);

                // Move to the next input
                if (value && index < length - 1) {
                    inputRefs.current[index + 1].focus();
                }
            }
        }
    };

    const handleKeyDown = (index, event) => {
        if (event.key === "Backspace" && !otp[index] && index > 0) {
            // Move to the previous input on backspace
            inputRefs.current[index - 1].focus();
        }
    };

    const handleFocus = (index) => {
        inputRefs.current[index].select();
        if (onFocus) {
            onFocus(index); // Call onFocus with the index of the focused input
        }
    };

    const handleBlur = (index) => {
        if (onBlur) {
            onBlur(index); // Call onBlur with the index of the blurred input
        }
    };

    const handlePaste = (event) => {
        const pasteData = event.clipboardData.getData("Text").trim();
        if (/^\d+$/.test(pasteData)) {
            const pasteDigits = pasteData.slice(0, length).split("");
            const newOtp = [...otp];
            pasteDigits.forEach((digit, idx) => {
                newOtp[idx] = digit;
                if (inputRefs.current[idx]) {
                    inputRefs.current[idx].value = digit;
                }
            });
            setOtp(newOtp);
            // Focus the next empty input or the last one
            const nextIndex = pasteDigits.length < length ? pasteDigits.length : length - 1;
            inputRefs.current[nextIndex].focus();
            event.preventDefault();
        }
    };

    return (
        <div dir="ltr" className="flex justify-center gap-2">
            {otp.map((value, index) => (
                <TextField
                    autoComplete="one-time-code"
                    key={index}
                    inputRef={(el) => (inputRefs.current[index] = el)}
                    value={value}
                    onChange={(event) => handleChange(index, event)}
                    onKeyDown={(event) => handleKeyDown(index, event)}
                    onFocus={() => handleFocus(index)}
                    onBlur={() => handleBlur(index)}
                    onPaste={handlePaste}
                    inputProps={{
                        maxLength: 1,
                        style: { textAlign: "center", width: "50px" },
                    }}
                    variant="outlined"
                    type="tel"
                    className="border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            ))}
        </div>
    );
};

export default OTPInput;
