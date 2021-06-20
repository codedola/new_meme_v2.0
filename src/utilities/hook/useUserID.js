import { useMemo } from "react";
import { useSelector } from "react-redux";
import parseJwt from "../parseJwt";

export default function useUserID() {
    const token = useSelector((state) => state.Auth.token);
    const userid = useMemo(() => {
        try {
            const parseObj = parseJwt(token);
            if (parseObj.id) {
                return parseObj.id;
            }
            return null;
        } catch (error) {
            return null;
        }
    }, [token]);
    return userid;
}
