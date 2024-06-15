export interface AirProducts {
  id: number;
  name: string;
  price: number;
  image: string;
}

export async function fetchProductsByType(
  productType: number // 1 - AirPhone, 2 - AirTab, 3 - AirWatch , 4 - AirGlass
): Promise<AirProducts[]> {
  try {
    const response = await fetch(`/api/Products/byType?type=${productType}`); // oczekiwanie na endpoint w API
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.map((item: any) => ({
      id: item.productId,
      name: item.name,
      price: item.price,
      image: item.image,
    }));
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}

export async function fetchProductByID(
  id: number
): Promise<AirProducts | null> {
  try {
    const response = await fetch(`/api/Products/${id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const item = await response.json();
    return {
      id: item.productId,
      name: item.name,
      price: item.price,
      image: item.image,
    };
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

interface LoginResponse {
  token: string;
}

export const login = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  const response = await fetch("/api/User/login", {
    method: "POST",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data: LoginResponse = await response.json();
  return data;
};

interface RegisterResponse {
  token: string;
}

export const register = async (
  username: string,
  email: string,
  password: string
): Promise<RegisterResponse> => {
  const response = await fetch("/api/User/register", {
    method: "POST",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  });

  if (!response.ok) {
    throw new Error("Registration failed");
  }
  const data: RegisterResponse = await response.json();
  return data;
};
