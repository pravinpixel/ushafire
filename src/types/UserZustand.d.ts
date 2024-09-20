type UserStoreType = {
	token: string | null;
	user?: UserDateType["user"];
	setToken: (token?: string) => void;
	setUser: (user?: UserDateType["user"] | undefined) => void;
};

type LoginFormType = LoginType;

type UserDateType = {
	token: string;
	user: LoginFormType;
};
