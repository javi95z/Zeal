export interface ProfileBox {
  title: string;
  resourceName: string;
  subtitle?: string;
  profileImage?: string;
  backgroundImage?: string;
  icon?: string;
  stats?: { number: number; label: string }[];
}
