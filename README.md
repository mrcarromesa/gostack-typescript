# TypeScript

- Iniciar projeto:

```bash
yarn init -y
```

- Instalamos o typescript:

```bash
yarn add typescript -D
```

- Criar uma pasta `src` e criar o arquivo `src/index.ts` agora estmos trabalhando com a extensão .ts e não .js

- Agora conseguimos adicionar as funcionalidades novas do JS.

---

- Instalamos o `express`:

```bash
yarn add express
```

- No arquivo `src/index.ts` importamos o `express` porém não conseguimos o intellisence dela, se observarmos o vscode irá mostrar discretamente 3 pontinhos informando que faltou informar a tipagem da lib, dessa forma seguimos as instruções e instalamos a tipagem como dependencia de desenvolvimento.

- No caso do express é:

```bash
yarn add @types/express -D
```

- E pronto adicionamos o intellisence da lib.

- Agora que o arquivo está pronto, teoricamente é só executarmos o comando:

```bash
node src/index.ts
```

- Porém como o node não reconhece arquivos `.ts` isso não irá funcionar, dessa forma precisamos converter o `.ts` para um arquivo `js`

- Para isso utilizamos a dependencia `typescript`, que fornece um binário o qual se observarmos na pasta `node_modules/bin/` encontramos eles o `tsc` e `tsserver`

- Dessa forma podemos executar o comando:

```bash
yarn tsc src/index.ts
```

- Será gerado um arquivo `.js` que possuí o código convertido para javascript normal. Embora tenha dado erro, pois precisamos inicializar o typescript no nosso repositório no nosso projeto, é necessário criar um `ts.config` e para facilitar a criação desse recurso utilizamos esse comando na raiz do projeto:

```bash
yarn tsc --init
```

- Esse comando irá gerar um arquivo `tsconfig.json` com algumas configurações padrões

- E agora só precisamos executar o comando:

```bash
yarn tsc
```

- Esse comando irá converter os arquivos automaticamente para js

- E agora se executarmos o comando:

```bash
node src/index.js
```

- irá seguir o fluxo normal

- Outra coisa importante é alterar onde os arquivos `.js` devem ser gerados para não misturar na pasta `src` para isso alteramos no arquivo `tsconfig.json` adicionando o seguinte:

```json
"outDir": "./dist",
```

- Esse ./dist irá seguir exatamente a estrutura do `src`

---

## Adicionar typagem

- Quando necessário adicionar tipagem o proprio vscode irá nos avisar da obrigatoriedade disso.

- No caso do seguinte código:

```ts
app.get('/', (req, res) => {
  return res.json({msg: 'Hello World!'});
})
```

- Não há nenhuma reclamação de erro, pois o express está importado nesse mesmo arquivo e juntamente temos a dependencia @types/express, caso o express não estivesse importado nesse arquivo iria apresentar os erros de tipagem.

- E como podemos pegar as tipagens desses arquivos?
- Quando passamos o mouse sobre uma variavel a ide nos mostra o tipo dessa variavel.
- Também quando damos ctrl + click na dependencia ele irá exibir uma arquivo `d.ts` ou seja definitions, e conseguimos ver basicamente todos os tipos de variaveis que essa dependencia tem, porém não precisamos toda vez consultar isso, até porque esses arquivos muitas vezes são dificieis de ser entidos, pois são gerados automaticamente na sua maioria;

- Porém em geral o intellisence do editor nos ajuda fazer isso.

- Para um exemplo mais claro, vamos criar o arquivo `src/routes.ts`

- Ajustar o arquivo `src/index.ts` para:

```ts
import express from 'express';
import { helloWorld } from 'routes';

const app = express();

app.get('/', helloWorld);

app.listen(3333, () => {
  console.log('🚀 Server is ready')
})
```

- No arquivo `src/routes.ts` adicionamos apenas:

```ts
export const helloWorld = (req,res) => {
  return res.json({msg: 'Hello World'})
}
```

- O editor irá acusar que não entende o que é o `req` e nem o  `res` pois de que tipos eles são?
- Como podemos resolver isso?
- Sabemos que essas props são utilizadas no express, então podemos importar esses tipos direto no express,
- Digitamos:

```ts
import { } from 'express';
```

- E ali dentro do `{ }` se dermos ctrl + space, ele irá sugerir alguns tipos com um simbolo assim: `<-()` mais ou menos assim.

E nesse caso o mais apropriado são `Request` e `Response`:

```ts
import { Request, Response } from 'express';
```

- Por fim aplicamos isso ao nosso código:

```ts
import { Request, Response } from 'express';

export const helloWorld = (req: Request, res: Response) => {
  return res.json({msg: 'Hello World'});
}
```

- E assim ganhamos toda intellisence da lib

---

## Tipagem de parametros

- para ganharmos o poder da intellisence nas functions podemos tipar os parametros

- Se apenas criarmos uma function assim:

```ts
export default function CreateUser(name, email, password) {
  const user = {
    name,
    email,
    password
  };

  return user;
}
```

- O editor irá reclamar, pois precisamos informar qual o tipo de variavel dessa forma:

```ts
export default function CreateUser(name = '', email: string, password: string) {
  const user = {
    name,
    email,
    password
  };

  return user;
}
```

- Dessa forma ganhamos também o poder do intellisence para chamar essa function

- Porém é melhor nomearmos essa function destruturando utilizando o objeto:

```ts
export default function CreateUser({name = '', email: string, password: string}) {
  const user = {
    name,
    email,
    password
  };

  return user;
}
```

- Porém da forma acima está errado, precisamos agora de uma interface:

```ts

interface CreateUserData {
  name?: string,
  email: string,
  password: string,
};

export default function CreateUser({name, email, password}: CreateUserData) {
  const user = {
    name,
    email,
    password
  };

  return user;
}
```

- O paramentro `name` utilizando a `?` significa que ele é opcional,

- Poderiamos então utilizar assim caso precisemos estipular um valor padrão:

```ts
export default function CreateUser({name = '', email, password}: CreateUserData) {
  // ...
}
```

- Array:

- `string[]`
- Utilizar interface ou array de string:

```ts
interface TechsData {
  tech: string;
  experience: number;
}

interface CreateUserData {
  name?: string;
  email: string;
  password: string;
  techs: Array<string | TechsData>;
};
```