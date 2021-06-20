import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/vi";
dayjs.locale("vi");
dayjs.extend(relativeTime);

export default function useDateTime({ date_time }) {
    const createdDate = dayjs(date_time);
    const createdDateStr = createdDate.format("DD/MM/YYYY");
    const currentDate = dayjs();
    const relativeTimeStr = createdDate.from(currentDate);
    return {
        createdDateStr,
        relativeTimeStr,
    };
}
