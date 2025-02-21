import axios from "axios";

export async function loginAPI(email, password) {
  try {
    let request = {
      email,
      password,
    };

    const response = await axios.post("http://localhost:3001/login", request);

    return response.data;
  } catch (error) {
    console.error("Erro no login:", error.response?.data || error.message);
    throw error;
  }
}
export async function editUserInfoAPI(id, name, email, password, type) {
  try {
    let request = {
      id,
      name,
      email,
      password,
      type,
    };

    const response = await axios.post(
      "http://localhost:3001/updateUser",
      request,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar:", error.response?.data || error.message);
    throw (
      error.response?.data || { message: "Erro desconhecido ao atualizar." }
    );
  }
}
export async function createUserAPI(name, email, password, type) {
  try {
    let request = {
      name,
      email,
      password,
      type,
    };

    const response = await axios.post(
      "http://localhost:3001/createUser",
      request,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Erro ao criar:", error.response?.data || error.message);
    throw error.response?.data || { message: "Erro ao criar." };
  }
}
export async function deleteUserAPI(id) {
  try {
    let request = {
      id,
    };

    const response = await axios.post(
      "http://localhost:3001/deleteUser",
      request,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar:", error.response?.data || error.message);
    throw (
      error.response?.data || { message: "Erro desconhecido ao atualizar." }
    );
  }
}
export async function getUsersAPI() {
  try {
    const response = await axios.get("http://localhost:3001/getUsers", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erro no login:", error.response?.data || error.message);
    throw error;
  }
}
export async function getUserInfoAPI(id) {
  try {
    const response = await axios.get("http://localhost:3001/getUser", {
      params: { id },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erro no login:", error.response?.data || error.message);
    throw error;
  }
}
