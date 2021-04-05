export interface IUniqueUserDTO {
  email: string;
  driver_license: string;
}

export interface ICreateUserDTO extends IUniqueUserDTO {
  name: string;
  password: string;
  is_admin?: boolean;
}
