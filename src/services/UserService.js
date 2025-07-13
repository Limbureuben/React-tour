import { fetchUsersAPI, deleteUserAPI, createUserAPI } from '../api/UserApi'
import { userProductAPI } from '../api/ProductAPI'

// export async function fetchUsers() {
//   const result = await fetchUsersAPI();

//   if (!result.success) {
//     throw new Error(result.message);
//   }

//   return result.Users; // this is the array of users
// }

export async function fetchUsers(page = 1) {
  const result = await fetchUsersAPI(page);

  if (!result.success) {
    throw new Error(result.message);
  }

  return result.Users;  // return full object with pagination info
}


export async function fetchProductUser() {
  const result = await userProductAPI();

  if (!result.success) {
    throw new Error(result.message);
  }

  return {
    products: result.products,
    total: result.total,
  };
}





export async function deleteUser(userId) {
  return await deleteUserAPI(userId);
}


export async function createUser(data) {
  const result = await createUserAPI(data);
  return result;
}