export const authRole = {
  admin: ['user', 'admin'],
  user: ['user'],
};

export const getUserFromAuth = (user) => {
  if (user)
    return {
      id: 1,
      uid: user.uid,
      displayName: user.displayName ? user.displayName : 'Admin User',
      email: user.email,
      role: authRole.user,
    };
  return user;
};
