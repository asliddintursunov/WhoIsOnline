import { useQuery } from "@tanstack/react-query";
import { useApi } from "./useApi.hook";
import { API_ENDPIINTS } from "../constants";

export function useGetAllUsers() {
    const { get } = useApi();

    return useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const result = await get<UsersType[]>(API_ENDPIINTS.USERS.GET_ALL);

            if (result.error) {
                throw new Error(result.error);
            }

            return result.data || [];
        },
        refetchOnWindowFocus: false,
        staleTime: 60000,
    });
}


type UsersType = {
    id: string,
    username: string,
    createdAt: string,
    lastOnline: string | null
}
