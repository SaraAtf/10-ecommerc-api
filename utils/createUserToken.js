const createUserToken = (user) => {
	return {
		userId: user.id,
		name: user.name,
		role: user.role,
	};
};

module.exports = createUserToken;
