export const getAPI = async (URL: string): Promise<Object> => {
    const response = await fetch(URL, {
        method: "GET"
    });
    return await response.json();
}