"use client";

import { useState, useEffect } from "react";
import * as Yup from "yup";
import { TextField, Typography, Link } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useFormik } from "formik";
import axios from "axios";
import { useSearchParams } from "next/navigation";

export default function DynamicLogin({ data }) {
    const [step, setStep] = useState(1);
    const [selectedOption, setSelectedOption] = useState(null);
    const [currentSecretType, setCurrentSecretType] = useState(null);

    const searchParams = useSearchParams();
    const callback = searchParams.get("callback");

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
        onSubmit: async (values, { setSubmitting }) => {
            try {
                if (step === 1) {
                    // Step 1: Find the matched option
                    const matchedOption = data.options.find((option) =>
                        new RegExp(option.regex).test(values.identifier)
                    );
                    if (matchedOption) {
                        setSelectedOption(matchedOption);
                        setCurrentSecretType(matchedOption.secrets[0].type);
                        setStep(2);

                        // Prepare the payload for the first API call
                        const payload = {
                            method: matchedOption.secrets[0].method, // Use the method from the first secret of the matched option
                            [matchedOption.identifier]: values.identifier, // e.g., "username": "USERNAME"
                        };

                        // Call the first step API using the matched option's API
                        await axios.post(matchedOption.api, payload, {
                            headers: { "Content-Type": "application/json" },
                        });

                        // Initialize secret fields
                        matchedOption.secrets.forEach((secret) => {
                            formik.setFieldValue(secret.type, "");
                        });
                    }
                } else {
                    // Step 2: Handle secret submission
                    const secret = selectedOption.secrets.find((s) => s.type === currentSecretType);
                    const payload = {
                        [selectedOption.identifier]: formik.values.identifier, // e.g., "username": "USERNAME"
                        [secret.name]: formik.values[secret.type], // e.g., "password": "PASSWORD"
                    };

                    // Call the second step API using the secret's API
                    const response = await axios.post(`${secret.api}?callback=${callback}`, payload, {
                        headers: { "Content-Type": "application/json" },
                    });

                    console.log("Login successful:", response.data);
                }
            } catch (error) {
                console.error("API call failed:", error);
            } finally {
                setSubmitting(false);
            }
        },
    });

    useEffect(() => {
        if (selectedOption && selectedOption.secrets.length > 0) {
            setCurrentSecretType(selectedOption.secrets[0].type);
        }
    }, [selectedOption]);

    const handleSecretTypeChange = async (secretType) => {
        setCurrentSecretType(secretType);

        // When secret type is changed, make another call to the first step API with the new method
        if (selectedOption) {
            const secret = selectedOption.secrets.find((s) => s.type === secretType);

            if (secret) {
                const payload = {
                    method: secret.method, // Use the new method corresponding to the new secret type
                    [selectedOption.identifier]: formik.values.identifier, // e.g., "username": "USERNAME"
                };

                try {
                    // Call the first step API again with the new method
                    await axios.post(selectedOption.api, payload, {
                        headers: { "Content-Type": "application/json" },
                    });

                    // Reset the value for the new secret type field
                    formik.setFieldValue(secret.type, "");
                } catch (error) {
                    console.error("API call failed while switching secret type:", error);
                }
            }
        }
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
                    dir="ltr"
                    name="identifier"
                    label={data.options.map((item) => item.identifier).join(", ")}
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
                        یا راه های زیر را امتحان کنید:
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
                {step === 1 ? "ارسال" : "ورود"}
            </LoadingButton>
        </form>
    );
}
