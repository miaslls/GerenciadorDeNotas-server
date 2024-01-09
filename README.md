# <img src="assets/img/server.png" width="20" alt="Server"> Gerenciador de Notas (Server)

![Static Badge: Node.js](https://img.shields.io/badge/Node.js-5a5a5a?logo=nodedotjs)
![Static Badge: Express](https://img.shields.io/badge/Express-5a5a5a?logo=express)
![Static Badge: Prisma](https://img.shields.io/badge/Prisma-5a5a5a?logo=prisma)

Desafio MB Psicologia: **BACKEND**

## ⚙️ Install & Setup

Clone the project

```bash
> git clone https://github.com/miaslls/GerenciadorDeNotas-server.git
```

Go to the project directory

```bash
> cd GerenciadorDeNotas-server
```

Install dependencies

```bash
> npm install
```

Run the project

```bash
> npm run build
```

Seed the database

```bash
> npm run seed
```

## 🌐 API Reference

### Resultados

#### Create resultado

```http
POST /resultados
```

#### Get all resultados

```http
GET /resultados
```

#### Remove resultado

```http
DELETE /resultados/${id}
```

| Parameter | Type     | Description                                      |
| :-------- | :------- | :----------------------------------------------- |
| `id`      | `string` | **Required**. Id of resultado to fetch (uuid v4) |

## 📇 Schemas

### Bimestre

| Type   | Values                                      |
| :----- | :------------------------------------------ |
| `Enum` | `PRIMEIRO`, `SEGUNDO`, `TERCEIRO`, `QUARTO` |

### Disciplina

| Type   | Values                                         |
| :----- | :--------------------------------------------- |
| `Enum` | `BIOLOGIA`, `ARTES`, `GEOGRAFIA`, `SOCIOLOGIA` |

### Resultado

| Field          | Type         | Description                                                              |
| :------------- | :----------- | :----------------------------------------------------------------------- |
| `bimestre`     | `Bimestre`   | Bimestre of resultado (`PRIMEIRO`, `SEGUNDO`, `TERCEIRO`, `QUARTO`)      |
| `disciplina`   | `Disciplina` | Disciplina of resultado (`BIOLOGIA`, `ARTES`, `GEOGRAFIA`, `SOCIOLOGIA`) |
| `nota`         | `Float`      | Nota of resultado                                                        |
| `criadoEm`     | `DateTime`   | Creation timestamp of resultado                                          |
| `atualizadoEm` | `DateTime`   | Update timestamp of resultado                                            |
| `id`           | `String`     | Unique identifier (uuid v4) of resultado                                 |

### CreateResultadoDto

| Field        | Type         | Description                                                              |
| :----------- | :----------- | :----------------------------------------------------------------------- |
| `bimestre`   | `Bimestre`   | Bimestre of resultado (`PRIMEIRO`, `SEGUNDO`, `TERCEIRO`, `QUARTO`)      |
| `disciplina` | `Disciplina` | Disciplina of resultado (`BIOLOGIA`, `ARTES`, `GEOGRAFIA`, `SOCIOLOGIA`) |
| `nota`       | `Float`      | Nota of resultado                                                        |
