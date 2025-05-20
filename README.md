# Study buddy - POC

En testapp för att prova på konceptet med AI-assistent som läxhjälp.

## Development

Installera appen:

```
yarn
```

Skapa en env-fil genom att kopiera exemplet.

```
cp .env.example.env .env
```

Appen pratar med [Intric](https://www.intric.ai/) via [AI Proxy api](https://github.com/Sundsvallskommun/web-app-intric-backend).

Lägg in dina assistenter i din proxy och ange dom i din env:

```
VITE_ASSISTANT_EN=
VITE_HASH_EN=
VITE_APPLICATION_EN=
VITE_ASSISTANT_DE=
VITE_HASH_DE=
VITE_APPLICATION_DE=
VITE_ASSISTANT_ES=
VITE_HASH_ES=
VITE_APPLICATION_ES=
VITE_ASSISTANT_FR=
VITE_HASH_FR=
VITE_APPLICATION_FR=
```

Du behöver även ange urlen till din instans av AI proxy apit.

```
VITE_INTRIC_API_BASE_URL=
```

Stara sedan utvecklingsmiljön:

```
yarn dev
```

För produktion kör du

```
yarn build
yarn preview
```

### React + TypeScript + Vite

Appen är byggd med [React](https://react.dev/), [Typescript](https://www.typescriptlang.org/) och [Vite](https://vite.dev/).
