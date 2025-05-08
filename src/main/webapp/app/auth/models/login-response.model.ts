export interface Usuario {
  nombre: string;
  apellidos: string;
}

export interface LoginResponse {
  code: number;
  token: string;
  primerAcceso: boolean;
  usuario: Usuario;
}
