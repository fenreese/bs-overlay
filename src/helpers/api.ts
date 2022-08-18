export const getAPI = async (URL: string): Promise<Record<string, unknown>> => {
    const response = await fetch(URL, {
        method: "GET"
    });
    return await response.json();
}