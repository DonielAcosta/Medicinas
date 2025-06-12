export interface AuthResponse {
    us_codigo: string;
    us_clave:  string;
    us_nombre: string;
    cedula:    string;
    conexion:  string;
}
export interface MyUserInterface {
    access: {
      customerAccess: boolean
      labAccess: boolean
      salespersonAccess: boolean
    }
    clipro?: string
    cliente?: string
    dscCliente?: string
    cedula?: string
    image_url?: URL | string
    nombre?: string
    us_nombre?: string
    us_codigo?: string
    conexion?: string
    vendedor?: string
    datamedi?: boolean
    customer?: {
      cliente: string
      dscCliente: string
      nombre: string
    }
    deposito?: string
  }
