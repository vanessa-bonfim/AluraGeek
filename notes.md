## Verifique se o NodeJS e NPM estão instalados.

- npm
```sh
$ npm --version
```

node
```sh
$ node --version
```

`Nota`: o caracter `$` é apenas indicativo que é executado na linha de comandos, não sendo necessário digitar no termal.

## certifique-se que já existe um ficheiro package.json

`Nota:` Se não existir, execute o comando abaixo para criar o package.json

```sh
$ npm --init
```

Algumas perguntas serão feitas como o nome do repositório, autor, etc...

## Quais bibliotecas npm preciso para executar este projeto?
Execute o comando abaixo

- json-server

## Como posso instalar as bibliotecas que preciso com o NPM?
Execute o comando abaixo

```sh
$ npm install json-server
```

## como posso iniciar o ficheiro db.json para começara a usar o json-server?
Execute o comando abaixo

```sh
$ echo "{}" > db.json
```

## como posso executar db.json no json-server?
Execute o comando abaixo

```sh
$ json-server --watch db.json
```

## como é a estrutura de um objeto json?
```
{} -> objeto vazio
{ name: "vanessa" } <- objeto com chave:valor
```

## como é a estrutura de um array json?
```
[] -> vazio
[{ name: "maria" }, { name: "pedro" }] <- com posições/índices, chave/valor
```