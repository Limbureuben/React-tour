import { fetchUsersAPI, deleteUserAPI, createUserAPI } from '../api/UserApi'

export async function fetchUsers() {
  const result = await fetchUsersAPI();

  if (!result.success) {
    throw new Error(result.message);
  }

  return result.Users; // this is the array of users
}


export async function deleteUser(userId) {
  return await deleteUserAPI(userId);
}


export async function createUser(data) {
  const result = await createUserAPI(data);
  return result;
}