// dayjs-setup.ts
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import localeEs from "dayjs/locale/es";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale(localeEs);

// Ecuador no tiene DST; fija la zona para evitar desfaces.
dayjs.tz.setDefault("America/Guayaquil");

export default dayjs;