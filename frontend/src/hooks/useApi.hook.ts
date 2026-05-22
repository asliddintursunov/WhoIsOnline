import { useState, useCallback } from "react";
import axios, { AxiosError, type Method } from "axios";
import { BASE_URL } from "../constants";
import { token } from "../lib/helpers.lib";

type ApiState<T> = {
    data: T | null;
    message: string | null;
    isLoading: boolean;
    error: string | null;
};

type ApiResult<T> =
    | { data: T; message: string; error: null }
    | { data: null; message: string | null; error: string };

type BackendResponse<T> = { message: string; data: T };


export function useApi<Default = unknown>() {
    const [state, setState] = useState<ApiState<Default>>({
        data: null,
        message: null,
        isLoading: false,
        error: null,
    });


    const request = useCallback(
        async <T = Default>(
            method: Method,
            endpoint: string,
            payload?: unknown,
        ): Promise<ApiResult<T>> => {
            setState((prev) => ({ ...prev, isLoading: true, error: null }));

            try {
                const { data: res } = await axios.request<BackendResponse<T>>({
                    method,
                    url: `${BASE_URL}${endpoint}`,
                    data: payload,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token("get")}`
                    }
                });

                setState({
                    data: res.data as unknown as Default,
                    message: res.message,
                    isLoading: false,
                    error: null,
                });

                return { data: res.data, message: res.message, error: null };
            } catch (err) {
                const error =
                    err instanceof AxiosError
                        ? err.response?.data?.message ?? err.message
                        : "Unknown error";

                setState((prev) => ({
                    ...prev,
                    isLoading: false,
                    error: String(error),
                }));

                return { data: null, message: null, error: String(error) };
            }
        },
        [],
    );


    const get = useCallback(<T = Default>(endpoint: string) => request<T>("GET", endpoint), [request]);
    const post = useCallback(<T = Default>(endpoint: string, payload: unknown) => request<T>("POST", endpoint, payload), [request]);
    const patch = useCallback(<T = Default>(endpoint: string, payload: unknown) => request<T>("PATCH", endpoint, payload), [request]);
    const del = useCallback(<T = Default>(endpoint: string) => request<T>("DELETE", endpoint), [request]);

    return { ...state, get, post, patch, del };
}