import { Typography } from "@mui/material";
import { isEmpty } from "lodash";

export default function Legals({ data }) {
    return (
        <Typography variant="body2" className="mt-8 text-gray-600">
            {!isEmpty(data.terms) && (
                <a href={data.terms} className="hover:underline mr-4">
                    شرایط استفاده
                </a>
            )}
            {!isEmpty(data.terms) && !isEmpty(data.privacy) && "  |  "}
            {!isEmpty(data.privacy) && (
                <a href={data.privacy} className="hover:underline">
                    سیاست حفظ حریم خصوصی
                </a>
            )}
        </Typography>
    );
}
