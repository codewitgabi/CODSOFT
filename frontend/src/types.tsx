interface User {
  username: string | null;
  email: string | null;
  picture: string | null;
}

interface Product {
  id: number | string;
  name: string;
  price: number;
  image: string;
}
