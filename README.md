# US Data Dashboard

Interactive choropleth map dashboard for visualising US state- and county-level data.

## Features

- **3 indicators**: Population, Median Household Income, Unemployment Rate
- **Two geography levels**: toggle between States and Counties
- **Hover tooltips**: see region name and formatted value
- **Colour-coded legend**: sequential colour scale per indicator

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Production Build

```bash
npm run build
npm run preview
```

## Tech Stack

- React 19 + Vite
- react-simple-maps (SVG choropleth)
- d3-scale + d3-scale-chromatic (colour scales)
- react-tooltip (hover tooltips)
- CSS Modules
