
interface TechsData {
  tech: string;
  experience: number;
}

interface CreateUserData {
  name?: string;
  email: string;
  password: string;
  techs: Array<string | TechsData>;
};

// export default function CreateUser({name = 'valor padrão', email, password}: CreateUserData) {
export default function CreateUser({name, email, password, techs }: CreateUserData) {
  const user = {
    name,
    email,
    password,
    techs
  };

  return user;
}