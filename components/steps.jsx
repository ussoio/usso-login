"use client";

import { useState, useEffect } from "react";
import * as Yup from "yup";
import { TextField, Typography, Link } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useFormik } from "formik";

export default function DynamicLogin({ data }) {
    const [step, setStep] = useState(1);
    const [selectedOption, setSelectedOption] = useState(null);
    const [currentSecretType, setCurrentSecretType] = useState(null);

    const validationSchema = Yup.object().shape({
        identifier: Yup.string().test("match-any", "Invalid input", function (value) {
            return data.options.some((option) => new RegExp(option.regex).test(value));
        }),
    });

    const formik = useFormik({
        initialValues: {
            identifier: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values, { setSubmitting }) => {
            if (step === 1) {
                const matchedOption = data.options.find((option) => new RegExp(option.regex).test(values.identifier));
                if (matchedOption) {
                    setSelectedOption(matchedOption);
                    setCurrentSecretType(matchedOption.secrets[0].type);
                    setStep(2);
                    // Initialize secret fields
                    matchedOption.secrets.forEach((secret) => {
                        formik.setFieldValue(secret.type, "");
                    });
                }
            } else {
                // Handle final form submission here
                console.log("Form submitted:", values);
                // You can send the data to your API here
            }
            setSubmitting(false);
        },
    });

    useEffect(() => {
        if (selectedOption && selectedOption.secrets.length > 0) {
            setCurrentSecretType(selectedOption.secrets[0].type);
        }
    }, [selectedOption]);

    const handleSecretTypeChange = (secretType) => {
        setCurrentSecretType(secretType);
    };

    const renderSecretField = () => {
        if (!selectedOption || !currentSecretType) return null;

        const secret = selectedOption.secrets.find((s) => s.type === currentSecretType);
        if (!secret) return null;

        return (
            <TextField
                name={secret.type}
                label={secret.description}
                placeholder={secret.placeholder}
                type={secret.type === "password" ? "password" : "text"}
                fullWidth
                margin="normal"
                className="mb-4"
                value={formik.values[secret.type] || ""}
                onChange={formik.handleChange}
                error={formik.touched[secret.type] && Boolean(formik.errors[secret.type])}
                helperText={formik.touched[secret.type] && formik.errors[secret.type]}
            />
        );
    };

    const renderSecretOptions = () => {
        if (!selectedOption) return null;

        return selectedOption.secrets.map((secret, index) => {
            if (secret.type === currentSecretType) return null;
            return (
                <Link
                    key={index}
                    component="button"
                    variant="body2"
                    onClick={() => handleSecretTypeChange(secret.type)}
                    className="mr-4"
                >
                    Try {secret.description}
                </Link>
            );
        });
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            {step === 1 && (
                <TextField
                    name="identifier"
                    label="Username, Email, or Phone"
                    fullWidth
                    margin="normal"
                    value={formik.values.identifier}
                    onChange={formik.handleChange}
                    error={formik.touched.identifier && Boolean(formik.errors.identifier)}
                    helperText={formik.touched.identifier && formik.errors.identifier}
                    className="mb-4"
                />
            )}
            {step === 2 && (
                <>
                    {renderSecretField()}
                    <Typography variant="body2" className="mt-2 mb-4">
                        Or try another way:
                    </Typography>
                    <div className="flex flex-col mb-4">{renderSecretOptions()}</div>
                </>
            )}
            <LoadingButton
                type="submit"
                variant="contained"
                color="primary"
                loading={formik.isSubmitting}
                disabled={formik.isSubmitting}
                fullWidth
                className="mt-4"
            >
                {step === 1 ? "Next" : "Login"}
            </LoadingButton>
        </form>
    );
}
