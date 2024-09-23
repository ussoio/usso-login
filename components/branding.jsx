import { Typography } from "@mui/material";

export default function Branding({ data }) {
    return (
        <div className="text-center mb-6">
            <img src={data.logo} alt={data.title} className="w-32 object-contain mx-auto mb-4" />
            <Typography variant="h4" className="mb-2">
                {data.title}
            </Typography>
            <Typography variant="subtitle1">{data.description}</Typography>
        </div>
    );
}
