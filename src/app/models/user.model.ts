import {
  alpha,
  compare,
  email,
  password,
  required,
  ValidationAlphabetLocale,
} from '@rxweb/reactive-form-validators';

export interface User {
  id?: string;
  createdAt?: Date;
  name?: string;
  email?: string;
  isActive?: boolean;
}

export class RegisteModel {
  @required({ message: 'Este campo es obligatorio' })
  @alpha({
    message: 'Este campo solo debe tener letras',
    allowWhiteSpace: true,
    locale: ValidationAlphabetLocale.spanish,
  })
  name: string;

  @email({ message: 'Este campo debe tener un correo electrónico valido' })
  @required({ message: 'Este campo es requerido' })
  email: string;

  @required({ message: 'Este campo es requerido' })
  @password({
    validation: {
      minLength: 5,
      digit: true,
    },
    message:
      'Debes ingresar una contraseña con minimo 5 caracteres y un digito numerico',
  })
  password: string;

  @required({ message: 'Este campo es requerido' })
  @compare({ fieldName: 'password', message: 'Las contraseñas no coinciden' })
  comparePassword: string;
}

export class LoginModel {
  @email({ message: 'Este campo debe tener un correo electrónico valido' })
  @required({ message: 'Este campo es requerido' })
  email: string;

  @required({ message: 'Este campo es requerido' })
  password: string;
}
