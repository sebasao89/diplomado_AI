# Diplomado AI

Aplicacion web del diplomado enfocada en contenido teorico-practico de IA por semanas.

## Stack

- React + Vite
- Tailwind CSS
- Lucide React (iconos)

## Estructura principal

- src/main.jsx: punto de entrada de React
- src/App.jsx: navegacion principal y menu
- src/index.css: estilos globales
- semana1.jsx a semana6.jsx: contenido por semana
- materialesPDF.jsx: acceso a materiales en PDF
- public/pdfs/: PDFs estaticos para visualizacion/descarga

## Contenido actual

La app ya incluye:

- Semana 1 a Semana 4 con contenido previo del diplomado
- Semana 5: aprendizaje supervisado con
  - tipos de problema (clasificacion/regresion)
  - secciones por algoritmo
  - comparacion final en tabla
  - simulador de seleccion de algoritmo
- Semana 6: ajuste y generalizacion con
  - exploracion de metodos de busqueda de hiperparametros
  - simulador de regularizacion L1 vs L2
  - simulador de overfitting vs underfitting
  - conclusiones integradas de Semana 5 y Semana 6
- Navegacion optimizada para desktop y movil

## Como ejecutar

1. Instalar dependencias:

	npm install

2. Levantar entorno de desarrollo:

	npm run dev

3. Generar build de produccion:

	npm run build

4. Previsualizar build:

	npm run preview

## Despliegue en Cloudflare (Pages)

Este proyecto ya puede publicarse como sitio estatico en Cloudflare Pages.

### Opcion 1: Deploy por CLI

1. Autenticar en Cloudflare (una sola vez):

  npx wrangler login

2. Publicar:

  npm run cf:deploy

3. Deploy de produccion forzando rama main:

  npm run cf:deploy:prod

Notas:

- El proyecto de Pages se crea/reutiliza con nombre diplomadoia.
- El build command es npm run build.
- El directorio publicado es dist.

### Opcion 2: Deploy por Dashboard

1. Ir a Cloudflare Pages y crear proyecto.
2. Conectar el repositorio.
3. Configurar:
  - Framework preset: Vite
  - Build command: npm run build
  - Build output directory: dist
4. Guardar y desplegar.

### Publicar en subdominio del dominio propio

Para publicar en subdominio, usa etiqueta en minusculas: diplomadoia.

1. En Cloudflare Pages, abrir el proyecto diplomadoia.
2. Ir a Custom domains y agregar:
  - diplomadoia.tudominio.com
3. Si el dominio esta en la misma cuenta de Cloudflare, DNS se configura automaticamente.
4. Si no, crear el CNAME apuntando al dominio pages.dev generado por el proyecto.

## PDF de clases

Los PDF del diplomado deben copiarse dentro de:

public/pdfs/

Notas importantes:

- Los PDF dentro de public/pdfs SI se versionan en Git.
- Los PDF fuera de public/pdfs se mantienen fuera del flujo de publicacion.
- En deploy, estos archivos se sirven como estaticos.

Ejemplo de ruta publica para enlazar un PDF:

/pdfs/Semana 4.pdf

Indicacion local adicional:

public/pdfs/COPIA_TUS_PDF_AQUI.txt