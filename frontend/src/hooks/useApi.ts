import { useState, useCallback } from "react";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "../constants";

type ApiState<T> = {
    data: T | null;
    isLoading: boolean;
    error: string | null;
};

export function useApi<T>() {
    const [state, setState] = useState<ApiState<T>>({
        data: null,
        isLoading: false,
        error: null,
    });

    const post = useCallback(
        async (endpoint: string, payload: unknown) => {
            setState({ data: null, isLoading: true, error: null });
            try {
                const response = await axios.post<T>(
                    `${BASE_URL}${endpoint}`,
                    payload,
                );
                setState({ data: response.data, isLoading: false, error: null });
                return { data: response.data, error: null };
            } catch (err) {
                const error =
                    err instanceof AxiosError
                        ? err.response?.data?.error || err.message
                        : "Unknown error";
                setState({ data: null, isLoading: false, error: String(error) });
                return { data: null, error: String(error) };
            }
        },
        [],
    );

    const get = useCallback(
        async (endpoint: string) => {
            setState({ data: null, isLoading: true, error: null });
            try {
                const response = await axios.get<T>(`${BASE_URL}${endpoint}`);
                setState({ data: response.data, isLoading: false, error: null });
                return { data: response.data, error: null };
            } catch (err) {
                const error =
                    err instanceof AxiosError
                        ? err.response?.data?.error || err.message
                        : "Unknown error";
                setState({ data: null, isLoading: false, error: String(error) });
                return { data: null, error: String(error) };
            }
        },
        [],
    );

    return { ...state, post, get };
}

