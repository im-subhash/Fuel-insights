
const restrictTo = (user, roles = []) => {
    if(!user) return false;
    return roles.includes(user.role);
} 

export default restrictTo