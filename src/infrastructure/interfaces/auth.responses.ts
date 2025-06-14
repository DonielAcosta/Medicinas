export interface AuthResponse {
    us_codigo: string;
    us_clave:  string;
    us_nombre: string;
    cedula:    string;
    conexion:  string;
}

  export interface UserFromScliInterface {
    cliente: string
    nombre: string
    dscCliente: string
    clave: string
    rifci: string
    deposito: string
  }
  export interface MyUserInterface {
    access: {
      labAccess: boolean;
      salespersonAccess: boolean;
    };
    clipro?: string;
    cliente?: string;
    dscCliente?: string;
    cedula?: string;
    image_url?: URL | string;
    nombre?: string;
    us_nombre?: string;
    us_codigo?: string;
    conexion?: string;
    vendedor?: string;
    datamedi?: boolean;
    deposito?: string;
  }
