const BASE_URL = "http://localhost:5000";

export const getSlots = async () => {
  const response = await fetch(`${BASE_URL}/slots`);
  return response.json();
};

export const bookSlot = async (id, name) => {
  await fetch(`${BASE_URL}/book`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id: id,
      name: name
    })
  });
};