import { fetchUsers as fetchUsersAPI } from '../api/UserApi'

export async function fetchUsers() {
    const result = await fetchUsersAPI();

    if(!result.success) {
        throw new Error(result.message);
    } 
    return result.Users;
    
}