export const fetcher = async (
  url: string,
  method = "GET",
  data: Record<string, unknown> | null = null
) => {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: data ? JSON.stringify(data) : null,
    });

    if (!response.ok) {
      const errorData = await response
        .text()
        .then((text) => (text ? JSON.parse(text) : {}));
      throw new Error(
        errorData.message || `HTTP error! Status: ${response.status}`
      );
    }

    const text = await response.text();
    return text ? JSON.parse(text) : {};
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
