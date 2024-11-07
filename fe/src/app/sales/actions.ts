"use server";

export const getSales = async () => {
  const response = await fetch(`${process.env.API_URL}/sales`, {
    method: "GET",
  });
  return await response.json();
};
