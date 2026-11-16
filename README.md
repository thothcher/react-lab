# React Flow Lab

A static web app that teaches **how a React app works** with a drag-and-drop block canvas: the React sibling of JS Flow Lab. A student builds a flow (state → event → setState → render, or page → hook → lib → server), presses **Check Answer** and **Run Flow**, and reads what React does at every step: renders, requests, and the sentence a real mistake produces.

No build step, no dependencies. Open `index.html`, or use the hosted copy: **https://thothcher.github.io/react-lab/**. Task addresses work there too, for example `https://thothcher.github.io/react-lab/#effects-2`.

It shares the look and the canvas of [JS Flow Lab](https://thothcher.github.io/js-lab/) and [Angular Flow Lab](https://thothcher.github.io/schemas/): dark theme by default, a quiet header, a canvas toolbar that stays put while you pan, any number of wires per port (only loops are refused), a library that folds into an icon rail and side panels that hide with the double arrow on their edge. Each lab takes its colour from its logo: React cyan here, JavaScript yellow and Angular red in the other two.

## Files

- `index.html` — the shell.
- `styles.css` — the JS Flow Lab stylesheet with the React palette (`--b1` / `--b2` at the top), plus a short block of additions at the end.
- `react-data.js` — **everything React**: the blocks, what each does when a flow runs, the code it writes, the tasks and the reference schemas. This is the file to edit.
- `app.js` — the canvas engine (the same one JS Flow Lab uses, patched to read `react-data.js`). Branches fire in the order their blocks were placed: the tasks were written and checked against that order.

## Lecture tasks: 29, grouped by lecture (the **Lectures** menu)

| Group | Address | Tasks |
|---|---|---|
| Components, JSX, props | `#components` | 4 |
| State and events | `#state` | 4 |
| Effects and data from the API | `#effects` | 4 |
| Routing: pages and addresses | `#routing` | 3 |
| Login and guards | `#auth` | 4 |
| Architecture and custom hooks | `#architecture` | 5 |
| Context and reducer | `#context` | 3 |
| Zustand store | `#store` | 2 |

**A link to one task:** `index.html#effects-2`. `index.html#effects` opens the first task of the group. The button **Copy task link** next to the hint copies the address of the open task. Solved tasks are remembered in that browser.

Three kinds of task:

- **Chain** — put the blocks in the order things happen.
- **Schema** — a flow with branches (two components fed by one state, three readers of one context). Marked "Schema" in the menu.
- **Fix it** — the flow is already on the canvas and has a bug. Run it, read the red line, repair it. **Reset** brings the broken flow back.

## What a run shows

- **Trace** — one line per block, then the block's own remark for this run ("Render #2: React calls DishList() again"). An error stops the flow at the block that caused it, in red.
- **Data** — the value after every block.
- **Code** — the flow as a component file. A flow is drawn in the order things happen; the Code tab arranges the same blocks in the order a file is written (hooks, the effect, the handler, the return).
- **The result window** — the page, plus `renders · requests · readers of the shared state` for this run. Compare the numbers of two flows.

Mistakes the lab answers with an explanation: `fetch` in the component body; an effect without a dependency array; `.push()` and then `setState`; a Promise or a Response stored in state; mapping over `null`; a route param compared with a number; a request without the Bearer token (401); a guard that lets a wrong role through (403); `useContext` with no provider; a selector with no store; a search without a debounce (a warning with the request count).

## Real-world tasks: 10 food apps (the **Tasks** button)

A brief from a product students have used, an empty canvas and a checklist that ticks as they wire blocks: Wolt (a menu without sold-out dishes), a McDonald's kiosk (add to order), Uber Eats (a search that waits), Glovo (a cart store with persist), Starbucks (one order, three readers), Bolt Food (a dish page from a link), TheFork (favourites that survive F5), Domino's (a status request that cleans up), OpenTable (a staff page behind a login) and HelloFresh (loading, error and empty states). **Show blocks** lists the blocks needed, **Show solution** reveals the reference flow, and solved tasks are remembered. The rules are in `tasks` in `react-data.js`.

The lab's data is a restaurant menu, so these products keep the trace, the code and the result window consistent: the result window shows the product's own address, title and banner around the dishes of the run.

## The API block

Press **API** in the toolbar to use a real URL instead of the built-in menu (for example `https://dummyjson.com/products`, array path `products`). The form is the one from JS Flow Lab.

## Reference Schemas (26)

Ten are the food apps above. The other sixteen are ready-made flows for the projector: one render, a click, the mutation bug, fetch in the body, data from the API, a request that can be cancelled, a page for one dish, a login step by step, a page for the staff only, the layers of one request, one menu and three requests, a debounced search, lifted state, one cart and three readers, a store with selectors, and the whole app on one canvas.

## Adding a task

Append to `levels` in `react-data.js`:

```js
{
    id: 'state-5', lec: 'state',
    title: ['English title', 'ქართული სათაური'],
    mission: ['What the student has to build.', '…'],
    hint: ['Block → Block → Block.', '…'],
    expected: ['useStateBlk', 'onClick', 'setStateBlk', 'component', 'jsxList', 'reactRender', 'browser'],
    banner: ['The sentence shown above the result.', '…']
}
```

- `expected` is a chain of block types. For a schema with branches use `expectedGraph: { nodes: [...], edges: [[from, to], ...] }`.
- `preset: [...]` puts a (broken) chain on the canvas when the task opens; add `fix: true` for the tag.
- `ctx: { urlPath: '/kitchen' }` hands values to the run.

The block types are the keys of `defs` in the same file.

## Language

English and Georgian. Titles, missions, hints, block names and the trace are in both; the long explanations of the React blocks and the red error sentences are in English only.

## How it was checked

`node --check` on both scripts, and a headless-Chrome run that builds the expected flow of all 29 tasks, presses Check Answer and Run Flow, runs each "fix it" task broken first (it must fail the check and stop with an error), runs the 26 schemas and builds the 10 real-world tasks from their reference flows (every checklist row must tick). When the lab moved onto the new engine, the trace, the generated code and the result window of every task and schema were recorded before and after and compared.

## Notes

Static front end. `file://` works for everything except real API calls to servers that need CORS; a plain static server avoids that.
