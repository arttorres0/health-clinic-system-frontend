export class Paciente {
  _id: string;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  dataDeNascimento: string;
  ativo: boolean;

  constructor(pacienteResponse?: any) {
    for (let propName in pacienteResponse) {
      this[propName] = pacienteResponse[propName];
    }
  }
}
