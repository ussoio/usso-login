import { Typography } from "@mui/material";

export default function Legals({ data }) {
    return (
        <Typography variant="body2" className="mt-8 text-gray-600">
            <a href={data.terms} className="hover:underline mr-4">
                شرایط استفاده
            </a>
            {"  |  "}
            <a href={data.privacy} className="hover:underline">
                سیاست حفظ حریم خصوصی
            </a>
        </Typography>
    );
}
