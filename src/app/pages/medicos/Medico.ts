export class Medico {
  _id: string;
  nome: string;
  login: string;
  senha: string;
  cpf: string;
  email: string;
  telefone: string;
  crm: string;
  dataDeNascimento: string;
  dataDeAdmissão: string;
  ativo: boolean;

  constructor(medicoResponse?: any) {
    for (let propName in medicoResponse) {
      this[propName] = medicoResponse[propName];
    }
  }
}
