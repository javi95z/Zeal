interface User {
  id: number;
  api_token: string;
  background_img: string;
  email: string;
  first_name: string;
  gender: "female" | "male";
  is_admin: boolean;
  last_name: string;
  profile_img: string;
  suffix: string;
}