// ============================================================
// REACT FLOW LAB — the React content
// Blocks, their simulation, the tasks (grouped by lecture) and the
// reference schemas. The canvas engine lives in app.js and is the
// same one JS Flow Lab uses.
//
// To add a task: append an object to `levels` (see the comment there).
// To add a block: add it to `defs` (what the student reads), to `sim`
// (what it does when the flow runs) and to one of the `groups`.
// Texts are [English, Georgian]; a plain string is used for both.
// ============================================================
window.RFL = (function () {
    'use strict';

    // The data that travels through a flow: a small Le Bistro menu.
    // `inStock` keeps the name the engine's preview already understands.
    const DISHES = [
        { id: 1, name: 'Coq au vin',   price: 24, inStock: true,  category: 'mains' },
        { id: 2, name: 'Ratatouille',  price: 16, inStock: true,  category: 'mains' },
        { id: 3, name: 'Crème brûlée', price: 9,  inStock: false, category: 'desserts' },
        { id: 4, name: 'Tarte Tatin',  price: 10, inStock: true,  category: 'desserts' },
        { id: 5, name: 'Espresso',     price: 3,  inStock: true,  category: 'drinks' }
    ];
    const NEW_DISH = { id: 6, name: 'Macarons', price: 8, inStock: true, category: 'desserts' };
    const API_PATH = '/api/v1/enterprise/dishes';

    // ------------------------------------------------------------
    // ICONS for the new block types (names from the engine's icon set)
    // ------------------------------------------------------------
    const icons = {
        component: 'box', pageComp: 'screen', props: 'importIn', jsxList: 'map', jsxCond: 'branch',
        childComp: 'layers', reactRender: 'refresh',
        useStateBlk: 'layers', onClick: 'mouse', setStateBlk: 'edit', mutateBlk: 'warning',
        derived: 'sum', liftState: 'upload', callbackProp: 'fn', controlledInput: 'form',
        useEffectBlk: 'zap', depsArray: 'array', cleanup: 'trash',
        urlBlk: 'cloud', routeTable: 'sort', layoutOutlet: 'template', routeParam: 'key',
        toNumber: 'code', findById: 'search', searchParamsBlk: 'filter', linkNav: 'importIn',
        guard: 'shield', loginPost: 'lock',
        customHook: 'fn', apiHelper: 'module', proxyBlk: 'branch', serverBlk: 'disk',
        useDebounceBlk: 'clock', useLocalStorageBlk: 'save', useRefBlk: 'target',
        createCtx: 'plus', providerBlk: 'layers', useCtxBlk: 'download', dispatchBlk: 'upload', reducerBlk: 'fn',
        storeBlk: 'disk', selectorBlk: 'target', persistBlk: 'save'
    };

    // ------------------------------------------------------------
    // UI strings added to the engine's table
    // ------------------------------------------------------------
    const T = {
        brand:        ['React Flow Lab', 'React Flow Lab'],
        clickAnyBlock:['Click any block on the canvas to see what it does, the real React code behind it, and the mistake people make with it.', 'დააწკაპუნე ნებისმიერ ბლოკზე, რომ ნახო რას აკეთებს, რა React კოდი დგას მის უკან და რა შეცდომას უშვებენ ხოლმე.'],
        toWatch:      ['to watch state, renders and requests happen in the order React runs them.', 'რათა ნახო, რა თანმიმდევრობით ხდება state, რენდერი და მოთხოვნა React-ში.'],
        correctMsg:   ['Great job — that is the order React really works in.', 'შესანიშნავია — React ზუსტად ამ თანმიმდევრობით მუშაობს.'],
        renderedBy:   ['drawn by your React flow.', 'დახატულია შენი React ნაკადით.'],
        ourProducts:  ['Le Bistro', 'Le Bistro'],
        codeEmpty:    ['Connect some blocks — the React code they describe appears here.', 'შეაერთე ბლოკები — აქ გამოჩნდება მათი შესაბამისი React კოდი.'],
        grpData:      ['Data', 'მონაცემი'],
        grpComp:      ['Components & JSX', 'კომპონენტები და JSX'],
        grpStateR:    ['State & events', 'State და ივენთები'],
        grpEffect:    ['Effects & requests', 'ეფექტები და მოთხოვნები'],
        grpRoute:     ['Routing', 'როუტინგი'],
        grpArch:      ['Hooks & architecture', 'ჰუკები და არქიტექტურა'],
        grpCtx:       ['Context & reducer', 'Context და reducer'],
        grpStore:     ['Store (Zustand)', 'Store (Zustand)'],
        grpOut:       ['Output', 'შედეგი'],
        taskWord:     ['Task', 'დავალება'],
        fixIt:        ['Fix it', 'გაასწორე'],
        graphTag:     ['Schema', 'სქემა'],
        statRenders:  ['renders', 'რენდერები'],
        statRequests: ['requests', 'მოთხოვნები'],
        statReaders:  ['readers of the shared state', 'საზიარო state-ის მკითხველები'],
        noList:       ['The page is drawn. This flow did not load a list.', 'გვერდი დახატულია. ამ ნაკადს სია არ ჩაუტვირთავს.'],
        presetNote:   ['This flow is already on the canvas and it has a bug. Press Run Flow, read the red line, then repair it.', 'ეს ნაკადი უკვე აწყობილია და მასში შეცდომაა. დააჭირე გაშვებას, წაიკითხე წითელი ხაზი და გაასწორე.'],
        flowStopped:  ['<strong>The flow stopped at this block.</strong> Read the red line above, repair the flow and run it again.', '<strong>ნაკადი ამ ბლოკზე გაჩერდა.</strong> წაიკითხე ზემოთ წითელი ხაზი, გაასწორე ნაკადი და გაუშვი ხელახლა.'],
        cartBadge:    ['Cart', 'კალათა'],
        copyLink:     ['Copy task link', 'დავალების ბმული'],
        linkCopied:   ['Link to this task copied.', 'დავალების ბმული დაკოპირდა.'],
        levels:       ['Lectures', 'ლექციები'],
        realWorld:    ['From real products', 'რეალური პროდუქტებიდან'],
        realWorldSub: ['The same React ideas inside food apps everyone has used: Wolt, Glovo, Uber Eats, Starbucks, Domino\'s and more.', 'იგივე React-ის იდეები საკვების აპებში, რომლებსაც ყველა იყენებს: Wolt, Glovo, Uber Eats, Starbucks, Domino\'s და სხვა.'],
        tasksSub:     ['Each task is a job from a real food app. Read the brief, then design the React flow yourself: the checklist ticks as you build.', 'თითო დავალება რეალური საკვების აპის ამოცანაა. წაიკითხე აღწერა და React-ის ნაკადი თავად ააწყვე: სია აწყობისას ინიშნება.']
    };

    // ------------------------------------------------------------
    // BLOCK DEFINITIONS
    // code: plain source, highlighted by the engine when it loads
    // ------------------------------------------------------------
    const defs = {

        // ---------- Data (two engine blocks re-labelled for Le Bistro) ----------
        dataArray: {
            label: ['Array of dishes', 'კერძების მასივი'],
            category: ['Source', 'წყარო'], color: '',
            short: ['A data file: dishes.ts', 'მონაცემთა ფაილი: dishes.ts'],
            long: 'The simplest data source: an array of objects in a file of your project. No network and no waiting: the value exists as soon as the module is imported. Every React idea is easier to learn on a file first, and on a real API second.',
            file: 'src/data/dishes.ts',
            raw: "export const dishes: Dish[] = [\n  { id: 1, name: 'Coq au vin', price: 24, inStock: true },\n  { id: 2, name: 'Ratatouille', price: 16, inStock: true },\n];",
            mistake: 'Changing this array while the app runs and expecting React to notice. A plain variable is not state: React re-renders only after a setState.',
            io: 'nothing in → Array of objects out'
        },
        apiEndpoint: {
            label: ['API endpoint', 'API მისამართი'],
            category: ['Source', 'წყარო'], color: '',
            short: ['The path the data comes from', 'მისამართი, საიდანაც მოდის მონაცემი'],
            long: 'A path that answers with JSON. It is only a string until fetch() calls it. In Le Bistro the path is relative (/api/…), so the request goes through the Vite proxy. If a search text or a category came earlier in the flow, it becomes part of this address. Press API in the toolbar to use a real URL instead of the built-in menu.',
            file: 'src/lib/api.ts · vite.config.ts',
            raw: "const path = '/api/v1/enterprise/dishes';\n// with a filter:  `${path}?category=${category}`\n// a path is data too: nothing is sent until fetch() runs",
            mistake: 'Writing the full https://srmsapi… address in a component. The browser blocks it (CORS). Use the relative /api path, so the dev server forwards it.',
            io: 'nothing in → URL string out'
        },

        // ---------- Components & JSX ----------
        component: {
            label: ['Component', 'კომპონენტი'],
            category: ['Component', 'კომპონენტი'], color: 'c-info',
            short: ['A function that returns JSX', 'ფუნქცია, რომელიც JSX-ს აბრუნებს'],
            long: 'A component is a function. React calls it; you never do. Every call is one render: the function runs from top to bottom, reads its props and state, and returns JSX that describes the screen for exactly that moment. When state changes, React calls the same function again.',
            file: 'src/components/DishList.tsx',
            raw: "export function DishList({ dishes }: { dishes: Dish[] }) {\n  return <ul>{/* JSX for this render */}</ul>;\n}",
            mistake: 'Starting a request, a timer or a subscription directly in the function body. The body runs on every render, so the work is repeated on every render.',
            io: 'props + state in → JSX out (one render)'
        },
        pageComp: {
            label: ['Page', 'გვერდი'],
            category: ['Component', 'კომპონენტი'], color: 'c-info',
            short: ['A component the router draws', 'კომპონენტი, რომელსაც როუტერი ხატავს'],
            long: 'A page is an ordinary component with one extra job: the router draws it for an address. A good page is thin. It reads the address, asks hooks for data, and hands the result to smaller components. It contains no fetch and no business rules of its own.',
            file: 'src/pages/MenuPage.tsx',
            raw: "export function MenuPage() {\n  const dishes = useApi<Dish[]>('/api/v1/enterprise/dishes');\n  return <DishGrid dishes={dishes.data ?? []} />;\n}",
            mistake: 'A page of 300 lines that fetches, filters, validates and draws. Nobody can find anything in it, and nothing in it can be reused on another page.',
            io: 'address in → hooks called → JSX out'
        },
        props: {
            label: ['Props', 'Props'],
            category: ['Component', 'კომპონენტი'], color: 'c-info',
            short: ['Values a parent hands to a child', 'მნიშვნელობები, რომლებსაც მშობელი შვილს გადასცემს'],
            long: 'Props are the arguments of a component. The parent writes them as attributes, the child receives them as one object. They travel in one direction only, from parent to child, and the child must not change them.',
            file: 'the parent component',
            raw: "<DishList dishes={dishes} />\n\nfunction DishList({ dishes }: { dishes: Dish[] }) { /* … */ }",
            mistake: 'Changing a prop inside the child (props.dishes.push(…)). The parent owns the value. To change it, the child calls a function the parent gave it.',
            io: 'a value in → { dishes } out'
        },
        jsxList: {
            label: ['List: .map() + key', 'სია: .map() + key'],
            category: ['JSX', 'JSX'], color: 'c-info',
            short: ['One element per item', 'თითო ელემენტი თითო ერთეულზე'],
            long: 'JSX has no loop tag. A list is an array of elements, made with .map(). Each element needs a key: a stable id React uses to tell which item moved, which is new and which is gone.',
            file: 'src/components/DishGrid.tsx',
            raw: "<ul>\n  {dishes.map((dish) => (\n    <DishCard key={dish.id} dish={dish} />\n  ))}\n</ul>",
            mistake: 'Using the array index as the key. After a delete or a sort, React attaches the old state to the wrong item. Use the id from the data.',
            io: 'Array in → that many JSX elements out'
        },
        jsxCond: {
            label: ['Loading / error / empty', 'Loading / error / empty'],
            category: ['JSX', 'JSX'], color: 'c-warning',
            short: ['Choose what to draw', 'აირჩიე, რა დაიხატოს'],
            long: 'Every request has more than one ending: still loading, failed, arrived empty, arrived with data. A component decides between them with plain JavaScript before it draws the list. The first render always meets the "no data yet" case.',
            file: 'src/pages/MenuPage.tsx',
            raw: "if (error) return <ErrorState onRetry={reload} />;\nif (loading) return <DishGridSkeleton />;\nif (dishes.length === 0) return <p>No dishes yet.</p>;\nreturn <DishGrid dishes={dishes} />;",
            mistake: 'Designing only the happy path. The first render has no data, so dishes.map(…) on null crashes the page before the answer arrives.',
            io: 'state in → one of four pieces of JSX out'
        },
        childComp: {
            label: ['Child: DishCard', 'შვილი: DishCard'],
            category: ['Component', 'კომპონენტი'], color: 'c-info',
            short: ['One card, used many times', 'ერთი ბარათი, ბევრჯერ გამოყენებული'],
            long: 'A child component is the same idea one level down: a function with props. The list calls it once per item. One file describes a card; the data decides how many there are.',
            file: 'src/components/DishCard.tsx',
            raw: "export function DishCard({ dish }: { dish: Dish }) {\n  return <article>{dish.name}</article>;\n}",
            mistake: 'Copying the card markup into every page instead of making one component. A change then has to be made in five places.',
            io: 'one dish in → one card out'
        },
        reactRender: {
            label: ['React updates the DOM', 'React აახლებს DOM-ს'],
            category: ['React', 'React'], color: 'c-success',
            short: ['Compare, then change only the difference', 'შეადარე, შეცვალე მხოლოდ განსხვავება'],
            long: 'After a render React holds a new description of the screen. It compares it with the previous one and touches only the DOM nodes that differ. You describe what the screen should be; React works out the steps.',
            file: 'React itself (react-dom)',
            raw: "createRoot(document.getElementById('root')!).render(<App />);\n// after that, React updates the page on every state change",
            mistake: 'Reaching into the page with document.querySelector to change it yourself. React will overwrite the change on the next render.',
            io: 'JSX in → DOM nodes out'
        },

        // ---------- State & events ----------
        useStateBlk: {
            label: ['useState', 'useState'],
            category: ['State', 'State'], color: 'c-warning',
            short: ['Memory that survives renders', 'მეხსიერება, რომელიც რენდერებს შორის რჩება'],
            long: 'A variable inside a component is created again on every render. useState gives the component a value React keeps between renders, plus the only function that may change it. Calling that function is what makes React render again.',
            file: 'inside a component',
            raw: "const [dishes, setDishes] = useState<Dish[] | null>(null);\nconst [cart, setCart] = useState<CartItem[]>([]);",
            mistake: 'Putting things in state that can be calculated from other state (a total, a filtered list). Two copies of one truth drift apart.',
            io: 'initial value in → [value, setValue] out'
        },
        onClick: {
            label: ['Event handler', 'ივენთის handler'],
            category: ['Event', 'ივენთი'], color: 'c-warning',
            short: ['Runs when the guest clicks', 'ეშვება, როცა სტუმარი დააწკაპუნებს'],
            long: 'An event handler is a function you hand to JSX. React calls it when the event happens, not while it renders. This is where a click turns into a state change or a request the click caused.',
            file: 'inside a component',
            raw: "<button onClick={() => add(dish)}>Add</button>",
            mistake: 'onClick={add(dish)} calls the function during render. Pass a function: onClick={() => add(dish)}.',
            io: 'a click in → your function runs'
        },
        setStateBlk: {
            label: ['setState', 'setState'],
            category: ['State', 'State'], color: 'c-warning',
            short: ['Store a new value, render again', 'შეინახე ახალი მნიშვნელობა, დაიხატოს ხელახლა'],
            long: 'The setter stores the next value and asks React for a new render. React compares the old and the new value by reference. A new array or object means "changed"; the same one means "nothing to do".',
            file: 'inside a handler or an effect',
            raw: "setCart([...cart, dish]);      // a new array\nsetDishes(data);               // the answer of a request",
            mistake: 'cart.push(dish); setCart(cart); The array is the same object as before, so React sees no change and the screen stays as it was.',
            io: 'a new value in → the next render is scheduled'
        },
        mutateBlk: {
            label: ['.push() in place', '.push() ადგილზე'],
            category: ['Mistake', 'შეცდომა'], color: 'c-error',
            short: ['Changes the same array', 'ცვლის იმავე მასივს'],
            long: 'push, sort, splice and direct assignment change an array or object in place. The value has a new content but the same identity. React compares identity, so a later setState with this array changes nothing on the screen. This block is here so you can see that happen.',
            file: 'a bug you will write at least once',
            raw: "cart.push(dish);   // same array object\nsetCart(cart);     // React: Object.is(old, new) → true → no render",
            mistake: 'This block IS the mistake. Replace it with a copy: [...cart, dish], cart.filter(…), cart.map(…).',
            io: 'Array in → the same array out (changed inside)'
        },
        derived: {
            label: ['Derived value', 'გამოთვლილი მნიშვნელობა'],
            category: ['State', 'State'], color: 'c-success',
            short: ['Calculated during render', 'გამოითვლება რენდერის დროს'],
            long: 'A total, a count, a filtered list: if a value can be worked out from props or state, work it out in the function body on every render. It is always in step with its source, and it costs no extra state and no effect.',
            file: 'inside a component',
            raw: "const count = cart.reduce((sum, item) => sum + item.qty, 0);\nconst total = cart.reduce((sum, item) => sum + item.dish.price * item.qty, 0);",
            mistake: 'const [total, setTotal] = useState(0) plus a useEffect that keeps it in step. That is one render too many and a second truth that can be wrong.',
            io: 'state in → a calculated value out'
        },
        liftState: {
            label: ['Lift state up', 'State-ის აწევა'],
            category: ['State', 'State'], color: 'c-warning',
            short: ['One owner: the common parent', 'ერთი მფლობელი: საერთო მშობელი'],
            long: 'When two components need the same value, neither of them may own it. The state moves to the closest parent they share. The parent hands the value down as props and hands a function down for changes.',
            file: 'the closest common parent',
            raw: "function MenuSection() {\n  const [category, setCategory] = useState('all');\n  return (<>\n    <CategoryChips selected={category} onSelect={setCategory} />\n    <DishGrid dishes={dishes.filter(byCategory(category))} />\n  </>);\n}",
            mistake: 'Keeping a copy of the same value in both children and trying to keep the copies equal with effects.',
            io: 'state in the parent → props for every child'
        },
        callbackProp: {
            label: ['Callback prop', 'Callback prop'],
            category: ['Component', 'კომპონენტი'], color: 'c-info',
            short: ['The child asks, the parent changes', 'შვილი ითხოვს, მშობელი ცვლის'],
            long: 'Data goes down as props; requests for a change go up as function calls. The parent passes a function (onSelect, onAdd). The child calls it. The child never learns where the state lives.',
            file: 'parent → child',
            raw: "<CategoryChips onSelect={setCategory} />\n\n// in the child:\n<button onClick={() => onSelect('desserts')}>Desserts</button>",
            mistake: 'Passing the setter three levels down through components that do not use it. That is prop drilling: the sign that the value wants a context or a store.',
            io: 'a function down → a call back up'
        },
        controlledInput: {
            label: ['Controlled input', 'კონტროლირებადი input'],
            category: ['Event', 'ივენთი'], color: 'c-warning',
            short: ['State holds what was typed', 'State ინახავს აკრეფილს'],
            long: 'A controlled input shows what state says and reports every keystroke through onChange. The text lives in React, so any other code can read it, clear it or search with it.',
            file: 'src/components/SearchBox.tsx',
            raw: "const [query, setQuery] = useState('');\n<input value={query} onChange={(e) => setQuery(e.target.value)} />",
            mistake: 'value={query} without onChange: the input becomes read-only and React prints a warning.',
            io: 'keystrokes in → a string in state'
        },

        // ---------- Effects & requests ----------
        useEffectBlk: {
            label: ['useEffect', 'useEffect'],
            category: ['Effect', 'ეფექტი'], color: 'c-error',
            short: ['Runs after the screen is drawn', 'ეშვება ეკრანის დახატვის შემდეგ'],
            long: 'Rendering must stay a pure calculation. Work that touches the outside world (the network, timers, listeners, localStorage) goes into an effect. React draws first, then runs the effect. That is why a list from an API is always drawn at least twice.',
            file: 'inside a component or a custom hook',
            raw: "useEffect(() => {\n  // talk to the outside world\n  return () => { /* cleanup */ };\n}, [dependencies]);",
            mistake: 'useEffect(async () => …). An effect must return nothing or a cleanup function, and an async function returns a Promise. Use .then, or an inner async function.',
            io: 'a function in → it runs after render'
        },
        depsArray: {
            label: ['Dependency array', 'დამოკიდებულებების მასივი'],
            category: ['Effect', 'ეფექტი'], color: 'c-error',
            short: ['Decides when the effect runs again', 'წყვეტს, როდის გაეშვას ეფექტი ხელახლა'],
            long: 'The second argument of useEffect. [] means once, after the first render. [category] means again whenever category changed. No array at all means after every render. The rule: list every value from the component that the effect uses.',
            file: 'the second argument of useEffect',
            raw: "useEffect(load, []);            // once\nuseEffect(load, [category]);    // when category changes\nuseEffect(load);                // after EVERY render",
            mistake: 'Leaving the array out when the effect calls setState: render → effect → setState → render … an endless loop.',
            io: 'a list of values in → "run again?" out'
        },
        cleanup: {
            label: ['Cleanup', 'Cleanup'],
            category: ['Effect', 'ეფექტი'], color: 'c-error',
            short: ['Undo what the effect started', 'გააუქმე, რაც ეფექტმა დაიწყო'],
            long: 'The function an effect returns. React calls it before the effect runs again and when the component leaves the page. Whatever the effect started (a request, a timer, a listener) the cleanup stops.',
            file: 'returned from useEffect',
            raw: "useEffect(() => {\n  const controller = new AbortController();\n  fetch(path, { signal: controller.signal });\n  return () => controller.abort();\n}, [path]);",
            mistake: 'No cleanup for a request whose address can change. A slow old answer arrives after a fast new one and overwrites it: a race condition.',
            io: 'nothing in → the old work is cancelled'
        },

        // ---------- Routing ----------
        urlBlk: {
            label: ['Address bar', 'მისამართის ზოლი'],
            category: ['Routing', 'როუტინგი'], color: 'c-success',
            short: ['/menu/3?category=desserts', '/menu/3?category=desserts'],
            long: 'The address is state the browser keeps for you. It survives F5, it can be bookmarked and sent to a friend, and Back moves through it. The path says which page and which thing; the query says how to show it.',
            file: 'the browser',
            raw: "// origin          path      query\n// lebistro.app   /menu/3   ?category=desserts",
            mistake: 'Keeping "which page am I on" in useState. Back, Refresh and shared links stop working, because the browser knows about one page only.',
            io: 'nothing in → an address out'
        },
        routeTable: {
            label: ['Route table', 'როუტების ცხრილი'],
            category: ['Routing', 'როუტინგი'], color: 'c-success',
            short: ['Address → page', 'მისამართი → გვერდი'],
            long: 'The router reads the address and looks for the route that fits. /menu/:id fits any address with one segment after /menu and calls that segment "id". The most specific route wins; the order in the file does not matter.',
            file: 'src/App.tsx',
            raw: "<Route element={<RootLayout />}>\n  <Route index element={<HomePage />} />\n  <Route path=\"menu\" element={<MenuPage />} />\n  <Route path=\"menu/:id\" element={<DishPage />} />\n  <Route path=\"*\" element={<NotFoundPage />} />\n</Route>",
            mistake: 'A child path with a leading slash (path="/menu" under a parent). Child paths are relative to their parent.',
            io: 'an address in → the matched route out'
        },
        layoutOutlet: {
            label: ['Layout + <Outlet />', 'Layout + <Outlet />'],
            category: ['Routing', 'როუტინგი'], color: 'c-success',
            short: ['One frame, many pages', 'ერთი ჩარჩო, ბევრი გვერდი'],
            long: 'A layout route draws what every page shares: the header and the footer. <Outlet /> marks the hole where the matched page is drawn. Moving between pages replaces only what is inside the hole.',
            file: 'src/layouts/RootLayout.tsx',
            raw: "export function RootLayout() {\n  return (<>\n    <Header />\n    <main><Outlet /></main>\n    <Footer />\n  </>);\n}",
            mistake: 'Forgetting <Outlet />. The header and footer appear and every page is empty.',
            io: 'the matched route in → frame + page out'
        },
        routeParam: {
            label: ['useParams()', 'useParams()'],
            category: ['Routing', 'როუტინგი'], color: 'c-success',
            short: ['Read :id from the address', 'წაიკითხე :id მისამართიდან'],
            long: 'useParams returns the named parts of the matched route. They were cut out of a string (the address), so every one of them is a string, even when it looks like a number.',
            file: 'src/pages/DishPage.tsx',
            raw: "const { id } = useParams();   // \"3\"",
            mistake: 'Comparing the param with a number: d.id === id is 3 === "3", which is false. The page says "not found" for a dish that exists.',
            io: 'the matched route in → a string out'
        },
        toNumber: {
            label: ['Number(id)', 'Number(id)'],
            category: ['Routing', 'როუტინგი'], color: '',
            short: ['A string becomes a number', 'სტრიქონი ხდება რიცხვი'],
            long: 'Everything that comes from the address or from an input is text. Convert it once, at the edge, and work with the right type from there on.',
            file: 'src/pages/DishPage.tsx',
            raw: "const dishId = Number(id);\nif (Number.isNaN(dishId)) return <NotFoundPage />;",
            mistake: 'Converting in five places instead of one, or not checking NaN for an address like /menu/abc.',
            io: '"3" in → 3 out'
        },
        findById: {
            label: ['Find by id', 'იპოვე id-ით'],
            category: ['Data', 'მონაცემი'], color: '',
            short: ['One dish out of the list', 'ერთი კერძი სიიდან'],
            long: 'The Le Bistro API has no endpoint for one dish, so the page loads the menu and picks the dish out of it. .find() returns the first item that passes the test, or undefined.',
            file: 'src/pages/DishPage.tsx',
            raw: "const dish = dishes.find((d) => d.id === dishId);\nif (!dish) return <DishNotFound />;",
            mistake: 'Not handling undefined. dish.name crashes the page when the id is not in the list.',
            io: 'a number in → one dish (or undefined) out'
        },
        searchParamsBlk: {
            label: ['useSearchParams()', 'useSearchParams()'],
            category: ['Routing', 'როუტინგი'], color: 'c-success',
            short: ['State kept in the query', 'State, რომელიც query-ში ინახება'],
            long: 'The part after "?" is a good home for filters, sorting and search text. It works like useState, with one difference: the value is in the address, so a filtered page can be shared and survives F5.',
            file: 'src/pages/MenuPage.tsx',
            raw: "const [searchParams, setSearchParams] = useSearchParams();\nconst category = searchParams.get('category');   // \"desserts\" or null",
            mistake: 'Copying the param into useState "to have it in state". Now there are two truths and they disagree after Back.',
            io: 'the address in → one value of the query out'
        },
        linkNav: {
            label: ['<Link>', '<Link>'],
            category: ['Routing', 'როუტინგი'], color: 'c-success',
            short: ['Change the address, keep the page', 'შეცვალე მისამართი, გვერდი დარჩეს'],
            long: '<Link> changes the address without asking the server for a new document. The router sees the new address and React draws the matching page. State outside the page (the cart) is still there.',
            file: 'any component',
            raw: "<Link to={`/menu/${dish.id}`}>{dish.name}</Link>",
            mistake: '<a href="/menu/3"> between your own pages. The whole app reloads and all state is lost.',
            io: 'a click in → a new address out'
        },
        guard: {
            label: ['RequireAuth guard', 'RequireAuth მცველი'],
            category: ['Routing', 'როუტინგი'], color: 'c-error',
            short: ['No session → to the login', 'სესია არ არის → login-ზე'],
            long: 'A guard is a layout route that looks at the session before it lets a page through. Without a session it sends the guest to the login and remembers the address they wanted. It is a sign on the door: the server checks the token again, and that check is the real lock.',
            file: 'src/components/RequireAuth.tsx',
            raw: "if (!session) {\n  return <Navigate to=\"/login\" replace state={{ from: location.pathname }} />;\n}\nreturn <Outlet />;",
            mistake: 'Redirecting without replace. Back then returns to the protected page, which redirects again: the guest is stuck.',
            io: 'a route in → the page, or a redirect'
        },
        loginPost: {
            label: ['POST /auth/login', 'POST /auth/login'],
            category: ['Request', 'მოთხოვნა'], color: 'c-error',
            short: ['Email + password → a token', 'ელფოსტა + პაროლი → token'],
            long: 'A login is a request a click causes, so it starts in an event handler, not in an effect. The server answers with a token. The app keeps the token and sends it with later requests in the Authorization header.',
            file: 'src/lib/auth.ts',
            raw: "const tokens = await api<AuthTokens>('/api/v1/auth/login', {\n  method: 'POST',\n  body: { email, password },\n});",
            mistake: 'Saving the password in state or localStorage "for later". Only the token is kept.',
            io: 'credentials in → { accessToken } out'
        },

        // ---------- Hooks & architecture ----------
        customHook: {
            label: ['Custom hook: useApi', 'საკუთარი ჰუკი: useApi'],
            category: ['Hook', 'ჰუკი'], color: 'c-error',
            short: ['State + effect, packed for reuse', 'State + ეფექტი, შეფუთული ხელახლა გამოსაყენებლად'],
            long: 'A function whose name starts with "use" and that calls other hooks. useApi packs the state, the effect, the AbortController and the cleanup of a request, so a page writes one line. Each component that calls it gets its own copy of the state: a hook shares logic, not data.',
            file: 'src/hooks/useApi.ts',
            raw: "const { data, error, loading, reload } = useApi<Dish[]>(path);",
            mistake: 'Expecting two components that call useApi with the same path to share one request. They do not: two callers, two requests.',
            io: 'a path in → { data, error, loading } out'
        },
        apiHelper: {
            label: ['lib/api.ts', 'lib/api.ts'],
            category: ['Layer', 'შრე'], color: '',
            short: ['The one place that calls fetch', 'ერთადერთი ადგილი, სადაც fetch გამოიძახება'],
            long: 'A plain function, not a hook and not a component. It knows the things every request needs: the headers, the res.ok check, how an error body looks. Hooks call it; components never see fetch.',
            file: 'src/lib/api.ts',
            raw: "export async function api<T>(path: string, options: ApiOptions = {}): Promise<T> {\n  const res = await fetch(path, options);\n  if (!res.ok) throw await toApiError(res);\n  return res.json();\n}",
            mistake: 'fetch written by hand in ten components, each with a slightly different error check.',
            io: 'a path in → a request is prepared'
        },
        proxyBlk: {
            label: ['Vite proxy', 'Vite proxy'],
            category: ['Layer', 'შრე'], color: '',
            short: ['/api → the real server', '/api → ნამდვილი სერვერი'],
            long: 'The browser lets a page read answers only from its own origin, unless the other server allows it (CORS). The dev server forwards every /api request to the API. The browser talks to its own origin; servers have no such rule between them.',
            file: 'vite.config.ts · vercel.json',
            raw: "server: {\n  proxy: {\n    '/api': { target: 'https://srmsapi.stepacademy.ge', changeOrigin: true },\n  },\n},",
            mistake: 'Editing vite.config.ts and not restarting npm run dev. The old config keeps running and /api answers 404.',
            io: 'a request in → the same request, forwarded'
        },
        serverBlk: {
            label: ['API server', 'API სერვერი'],
            category: ['Layer', 'შრე'], color: '',
            short: ['Answers with JSON and a status', 'პასუხობს JSON-ით და სტატუსით'],
            long: 'The other side of the wire. It answers with a status code and, usually, JSON. It can be slow, it can say 404 or 429, and it can be down. The app has to stay usable in each of those cases.',
            file: 'https://srmsapi.stepacademy.ge',
            raw: "// 200 OK   [ { id: 1, name: \"Coq au vin\", … } ]\n// 429 Too Many Requests   Retry-After: 60",
            mistake: 'Trusting the client for rules that matter (prices, roles). Everything in the browser can be changed by the guest.',
            io: 'a request in → a response out'
        },
        useDebounceBlk: {
            label: ['useDebounce', 'useDebounce'],
            category: ['Hook', 'ჰუკი'], color: 'c-error',
            short: ['Wait until typing stops', 'დაელოდე აკრეფის დასრულებას'],
            long: 'Returns the same value, but only after it has stopped changing for a moment. Inside: a timer started by an effect, and a cleanup that cancels it on the next keystroke. Ten letters become one search.',
            file: 'src/hooks/useDebounce.ts',
            raw: "const search = useDebounce(query.trim(), 400);\n\nuseEffect(() => {\n  const timer = setTimeout(() => setDebounced(value), delay);\n  return () => clearTimeout(timer);\n}, [value, delay]);",
            mistake: 'The request effect depends on query, not on the debounced value. The debounce exists and changes nothing.',
            io: 'a fast-changing value in → a calm value out'
        },
        useLocalStorageBlk: {
            label: ['useLocalStorage', 'useLocalStorage'],
            category: ['Hook', 'ჰუკი'], color: 'c-error',
            short: ['useState that survives F5', 'useState, რომელიც F5-ს უძლებს'],
            long: 'Looks like useState and behaves like it, with two additions: the first value is read from localStorage, and an effect writes every new value back. Storage keeps text only, so the hook uses JSON.stringify and JSON.parse.',
            file: 'src/hooks/useLocalStorage.ts',
            raw: "const [cart, setCart] = useLocalStorage<CartItem[]>('cart', []);",
            mistake: 'Changing the shape of the saved data and reading the old shape after a deploy. Clear the key or version it ("cart.v2").',
            io: 'a key in → [value, setValue] that persists'
        },
        useRefBlk: {
            label: ['useRef', 'useRef'],
            category: ['Hook', 'ჰუკი'], color: 'c-error',
            short: ['A box React does not watch', 'ყუთი, რომელსაც React არ უყურებს'],
            long: 'A ref is a box with one field, .current, that survives renders. Changing it does not cause a render. Two uses: holding a real DOM element (to call .focus() or .showModal()), and holding a value the screen does not show (a timer id).',
            file: 'src/components/CartDrawer.tsx',
            raw: "const dialogRef = useRef<HTMLDialogElement>(null);\n// <dialog ref={dialogRef}>\ndialogRef.current?.showModal();",
            mistake: 'Using a ref for something the screen shows. The value changes, the screen does not. That is a job for state.',
            io: 'nothing in → { current } out'
        },

        // ---------- Context & reducer ----------
        createCtx: {
            label: ['createContext', 'createContext'],
            category: ['Context', 'Context'], color: 'c-warning',
            short: ['A place for one shared value', 'ადგილი ერთი საზიარო მნიშვნელობისთვის'],
            long: 'createContext makes a channel for one kind of value. On its own it holds nothing: the default (null here) is what a component receives when there is no provider above it.',
            file: 'src/context/cart-context.ts',
            raw: "export const CartContext = createContext<CartContextValue | null>(null);",
            mistake: 'A default value that looks real (an empty cart). A forgotten provider then fails silently instead of loudly.',
            io: 'nothing in → an empty context out'
        },
        providerBlk: {
            label: ['Provider', 'Provider'],
            category: ['Context', 'Context'], color: 'c-warning',
            short: ['Puts the value around the tree', 'მნიშვნელობას ხის გარშემო ათავსებს'],
            long: 'The provider is a component that owns the state and wraps the part of the tree that may read it. Every component inside, at any depth, can pick the value up. Nobody in between passes a prop.',
            file: 'src/context/CartProvider.tsx',
            raw: "<CartContext value={{ items, count, add }}>\n  {children}\n</CartContext>",
            mistake: 'A new object in value on every render ({ items, add } written inline). Every reader re-renders even when nothing changed. Build the value with useMemo.',
            io: 'state in → available to everything inside'
        },
        useCtxBlk: {
            label: ['useContext / use()', 'useContext / use()'],
            category: ['Context', 'Context'], color: 'c-warning',
            short: ['Pick the value up anywhere inside', 'აიღე მნიშვნელობა ნებისმიერი ადგილიდან'],
            long: 'Reads the value of the closest provider above the component. The component re-renders whenever that value changes. Wrap the call in your own hook (useCart) that throws when the provider is missing.',
            file: 'src/hooks/useCart.ts',
            raw: "export function useCart() {\n  const context = use(CartContext);\n  if (!context) throw new Error('useCart must be used inside <CartProvider>');\n  return context;\n}",
            mistake: 'Calling it in a component that is not inside the provider. The value is null and the page crashes on the first property you read.',
            io: 'nothing in → the provider\'s value out'
        },
        dispatchBlk: {
            label: ['dispatch(action)', 'dispatch(action)'],
            category: ['Reducer', 'Reducer'], color: 'c-warning',
            short: ['Say what happened', 'თქვი, რა მოხდა'],
            long: 'With a reducer, a component no longer changes state itself. It sends an action: a small object that says what happened ("add", this dish). The rules for what that means live in one function, the reducer.',
            file: 'any component, through the context',
            raw: "dispatch({ type: 'add', dish });",
            mistake: 'Actions that describe the new state ({ type: "setItems", items }). Then the rules are back in the components.',
            io: 'a click in → an action out'
        },
        reducerBlk: {
            label: ['Reducer', 'Reducer'],
            category: ['Reducer', 'Reducer'], color: 'c-warning',
            short: ['(state, action) → new state', '(state, action) → ახალი state'],
            long: 'A plain function with all the rules of one piece of state. It receives the current state and an action and returns the next state. It must be pure: the same input always gives the same output, and it changes nothing outside.',
            file: 'src/context/cart-context.ts',
            raw: "export function cartReducer(items: CartItem[], action: CartAction): CartItem[] {\n  switch (action.type) {\n    case 'add':    return [...items, { dish: action.dish, qty: 1 }];\n    case 'remove': return items.filter((item) => item.dish.id !== action.dishId);\n  }\n}",
            mistake: 'A fetch, a localStorage call or items.push(…) inside the reducer. React may call it twice; the side effect then happens twice.',
            io: 'state + action in → new state out'
        },

        // ---------- Store ----------
        storeBlk: {
            label: ['Store (create)', 'Store (create)'],
            category: ['Store', 'Store'], color: 'c-success',
            short: ['State that lives outside React', 'State, რომელიც React-ის გარეთ ცხოვრობს'],
            long: 'A Zustand store keeps state and the functions that change it in one object outside the component tree. There is no provider. Any component reads it with a hook, and code outside React can read it too.',
            file: 'src/stores/cart-store.ts',
            raw: "export const useCart = create<CartStore>()((set) => ({\n  items: [],\n  add: (dish) => set((s) => ({ items: [...s.items, { dish, qty: 1 }] })),\n}));",
            mistake: 'Putting server data (the menu) in the store. Data that belongs to the server needs loading, errors and freshness: that is a job for a query library.',
            io: 'an action in → new store state out'
        },
        selectorBlk: {
            label: ['Selector', 'Selector'],
            category: ['Store', 'Store'], color: 'c-success',
            short: ['Read only the part you need', 'წაიკითხე მხოლოდ საჭირო ნაწილი'],
            long: 'A selector is a function that picks one value out of the store. The component re-renders only when that picked value changes. A badge that reads the count does not re-render when a note on an item changes.',
            file: 'any component',
            raw: "const count = useCart((s) => s.items.length);",
            mistake: 'useCart() with no selector, or a selector that builds a new object every time. The component re-renders on every change of the store.',
            io: 'the store in → one picked value out'
        },
        persistBlk: {
            label: ['persist', 'persist'],
            category: ['Store', 'Store'], color: 'c-success',
            short: ['The store survives F5', 'Store უძლებს F5-ს'],
            long: 'A middleware that writes the store to localStorage after every change and reads it back when the app starts. It does for a store what useLocalStorage does for one useState.',
            file: 'src/stores/cart-store.ts',
            raw: "create<CartStore>()(\n  persist((set) => ({ /* … */ }), { name: 'bistro.cart' }),\n);",
            mistake: 'Persisting a token together with everything else. Decide key by key what may be written to the disk.',
            io: 'the store in → saved, and restored on load'
        }
    };

    // ------------------------------------------------------------
    // LIBRARY GROUPS
    // ------------------------------------------------------------
    const groups = [
        { title: 'grpData',   items: ['dataArray', 'apiEndpoint', 'filterOp', 'spreadOp', 'findById', 'toNumber'] },
        { title: 'grpComp',   items: ['component', 'pageComp', 'props', 'jsxList', 'jsxCond', 'childComp'] },
        { title: 'grpStateR', items: ['useStateBlk', 'onClick', 'setStateBlk', 'mutateBlk', 'derived', 'liftState', 'callbackProp', 'controlledInput'] },
        { title: 'grpEffect', items: ['useEffectBlk', 'depsArray', 'abortCtl', 'fetchCall', 'jsonParse', 'cleanup'] },
        { title: 'grpRoute',  items: ['urlBlk', 'routeTable', 'layoutOutlet', 'routeParam', 'searchParamsBlk', 'linkNav', 'guard', 'loginPost'] },
        { title: 'grpArch',   items: ['customHook', 'apiHelper', 'proxyBlk', 'serverBlk', 'useDebounceBlk', 'useLocalStorageBlk', 'useRefBlk'] },
        { title: 'grpCtx',    items: ['createCtx', 'providerBlk', 'useCtxBlk', 'dispatchBlk', 'reducerBlk'] },
        { title: 'grpStore',  items: ['storeBlk', 'selectorBlk', 'persistBlk'] },
        { title: 'grpOut',    items: ['reactRender', 'browser', 'consoleLog'] }
    ];

    // ------------------------------------------------------------
    // How custom values are shown in the Data tab and on the badges
    // ------------------------------------------------------------
    function format(v, k) {
        if (k === 'jsx') return '<' + v.tag + ' /> × ' + v.count + (v.note ? '   ' + v.note : '');
        if (k === 'component') return 'function ' + v.name + '() { … }   // React will call it';
        if (k === 'url') return 'address: ' + v.path + (v.search || '') + (v.state ? '   state: ' + JSON.stringify(v.state) : '');
        if (k === 'route') return 'route "' + v.pattern + '" → <' + v.page + ' />   params: ' + JSON.stringify(v.params);
        if (k === 'context') return v.name + ' value: ' + (v.value === null ? 'null (no provider yet)' : JSON.stringify({ items: v.value.items.length + ' items', count: v.value.count }));
        if (k === 'action') return '{ type: "' + v.type + '", dish: ' + JSON.stringify(v.dish) + ' }';
        return null;
    }
    function size(v, k) {
        if (k === 'jsx') return v.count + ' elements';
        if (k === 'component') return 'a function';
        if (k === 'url') return 'address';
        if (k === 'route') return 'route';
        if (k === 'context') return v.value === null ? 'empty' : v.value.count + ' items';
        if (k === 'action') return 'action';
        if (k === 'event') return 'event';
        if (k === 'element') return 'DOM element';
        if (k === 'object' && v && 'items' in v) return v.items === null ? 'no data yet' : v.items.length + ' items';
        if (k === 'object' && v && Array.isArray(v.dishes)) return v.dishes.length + ' dishes';
        return null;
    }

    // ------------------------------------------------------------
    // SIMULATION + CODE GENERATION
    // h: helpers handed over by the engine
    //    { clone, kindOf, isPlainObject, mkPromise, mkDom, mkEvent, mkElement, SIM }
    // run(v, c): what the block does to the travelling value `v`;
    //            `c` is the run context (renders, requests, state, …)
    // gen(c):    the source lines the block contributes to the Code tab
    // ------------------------------------------------------------
    function sim(h) {
        const say = (c, en, ka) => { c.notes.push([en, ka || en]); };
        const kind = h.kindOf;
        const plain = h.isPlainObject;
        const KIND_WORDS = {
            promise: 'a Promise', response: 'a Response', event: 'a click event', jsx: 'JSX', component: 'a component',
            url: 'an address', route: 'a route', context: 'a context', action: 'an action', element: 'a DOM element',
            dom: 'the DOM', string: 'a string', number: 'a number', undefined: 'nothing', null: 'null', array: 'an array', object: 'an object'
        };
        const desc = (v) => KIND_WORDS[kind(v)] || ('a ' + kind(v));

        // Finds the list inside whatever travels through the flow.
        function arr(v, who, c) {
            if (Array.isArray(v)) return v;
            if (plain(v)) {
                for (const key of ['items', 'dishes', 'data']) if (Array.isArray(v[key])) return v[key];
                if (v.items === null) throw new Error(who + ' received null. On the first render there is no data yet: handle "loading" before you map over the list.');
            }
            if (c.graph) return c.state.items || c.lastArray || [];
            const k = kind(v);
            if (k === 'promise') throw new Error(who + ' received a Promise. The answer of a fetch has to be read (res.json()) and stored with setState before it can be drawn.');
            if (k === 'response') throw new Error(who + ' received a Response. Read its body with res.json() first.');
            throw new Error(who + ' needs an array, but received ' + desc(v) + '.');
        }
        function endEffectInCode(c) {
            if (c.effectOpen) { c.closeBefore = 1; c.effectOpen = false; }
        }
        function matchRoute(path) {
            const m = /^\/menu\/([^/]+)$/.exec(path);
            if (m) return { __kind: 'route', pattern: '/menu/:id', params: { id: m[1] }, page: 'DishPage', path };
            if (path === '/menu') return { __kind: 'route', pattern: '/menu', params: {}, page: 'MenuPage', path };
            if (path === '/kitchen') return { __kind: 'route', pattern: '/kitchen', params: {}, page: 'KitchenPage', path };
            if (path === '/') return { __kind: 'route', pattern: '/', params: {}, page: 'HomePage', path };
            return { __kind: 'route', pattern: '*', params: {}, page: 'NotFoundPage', path };
        }
        function endpointFor(c) {
            let u = c.api.url || API_PATH;
            if (!c.api.url) {
                if (c.query) {
                    u = '/api/v1/enterprise/search?q=' + c.query;
                    c.payload = DISHES.filter(d => d.name.toLowerCase().includes(c.query));
                    c.payloadLoaded = true;
                } else if (c.category) {
                    u = API_PATH + '?category=' + c.category;
                    c.payload = DISHES.filter(d => d.category === c.category);
                    c.payloadLoaded = true;
                }
                c.requestUrl = u;
            }
            return u;
        }
        const renderNote = (c, who) => {
            if (c.pendingRender) {
                c.pendingRender = false;
                say(c, 'Render #' + c.renders + ': React calls ' + who + '() again, now with the new state.',
                       'რენდერი #' + c.renders + ': React ხელახლა იძახებს ' + who + '()-ს, უკვე ახალი state-ით.');
            } else {
                c.renders++;
                say(c, 'Render #' + c.renders + ': React calls ' + who + '(). The function runs from top to bottom.',
                       'რენდერი #' + c.renders + ': React იძახებს ' + who + '()-ს. ფუნქცია ეშვება თავიდან ბოლომდე.');
            }
        };
        const origFetch = h.SIM.fetchCall;
        const origJson = h.SIM.jsonParse;
        const inReact = (c) => (c.types || []).some(t => t === 'useEffectBlk' || t === 'customHook');

        const S = {
            // ---------- Data ----------
            dataArray: {
                op: 'const dishes = [...]',
                run: (v, c) => { const a = h.clone(DISHES); c.lastArray = a; return a; },
            },
            apiEndpoint: {
                op: 'const path = \'/api/…\'',
                run: (v, c) => endpointFor(c),
            },
            fetchCall: {
                op: origFetch.op,
                run: async (v, c) => {
                    if (c.renders > 0 && !c.inEffect && !c.inHandler && !c.graph) {
                        throw new Error('fetch() in the component body runs on EVERY render. Its answer calls setState, that renders again, that fetches again … hundreds of requests. Start it inside useEffect.');
                    }
                    const calls = Math.max(1, c.hookCalls || 1);
                    c.requests += calls;
                    if (calls > 1) {
                        say(c, calls + ' components called the hook, so ' + calls + ' requests for the SAME menu are on their way. A hook shares logic, not data.',
                               calls + ' კომპონენტმა გამოიძახა ჰუკი, ამიტომ ' + calls + ' მოთხოვნა მიდის ერთსა და იმავე მენიუზე. ჰუკი აზიარებს ლოგიკას, არა მონაცემს.');
                    } else {
                        say(c, 'Request #' + c.requests + ' is on its way. React does not wait for it: the screen still shows what the last render returned.',
                               'მოთხოვნა #' + c.requests + ' გზაშია. React მას არ ელოდება: ეკრანზე ისევ ბოლო რენდერის შედეგია.');
                    }
                    if (c.typed && !c.debounced) {
                        c.requests += c.keystrokes - 1;
                        say(c, 'No debounce: each of the ' + c.keystrokes + ' keystrokes started its own request. The search endpoint allows 10 a minute, then answers 429.',
                               'Debounce არ არის: ' + c.keystrokes + '-ვე ასომ თავისი მოთხოვნა გაუშვა. ძებნის endpoint წუთში 10-ს უშვებს, მერე 429-ს პასუხობს.');
                    }
                    if (c.addressChanges && !c.cleanup && !c.abort) {
                        say(c, 'Nothing cancels the previous request. If the address changes while it is in flight, the slower answer can arrive last and win.',
                               'წინა მოთხოვნას არაფერი აუქმებს. თუ მისამართი შეიცვალა, ნელი პასუხი შეიძლება ბოლოს მოვიდეს და გადაფაროს სწორი.');
                    }
                    return origFetch.run(v, c);
                },
            },
            jsonParse: {
                op: 'res.json()',
                run: (v, c) => {
                    const k = kind(v);
                    if (c.graph && k !== 'promise' && k !== 'response' && typeof v !== 'string') return h.clone(c.payload);
                    return origJson.run(v, c);
                },
            },
            abortCtl: {
                op: 'new AbortController()',
                run: (v, c) => {
                    c.abort = true;
                    say(c, 'An AbortController is created. Its signal travels with the request, so the request can be called back.',
                           'შეიქმნა AbortController. მისი signal მოთხოვნას მიჰყვება, ამიტომ მოთხოვნის გაუქმება შესაძლებელია.');
                    return v;
                },
            },
            findById: {
                op: 'dishes.find((d) => d.id === dishId)',
                run: (v, c) => {
                    if (typeof v === 'string') {
                        throw new Error('dishes.find((d) => d.id === "' + v + '") finds nothing: ' + v + ' === "' + v + '" is false. A route param is a string. Convert it first: Number(id).');
                    }
                    if (typeof v !== 'number') throw new Error('Find by id needs the id (a number), but received ' + desc(v) + '.');
                    const d = DISHES.find(x => x.id === v);
                    if (!d) throw new Error('No dish has the id ' + v + '. A real page shows "not found" here.');
                    c.lastArray = [d];
                    c.pageTitle = d.name;
                    say(c, 'Found: ' + d.name + '. One object out of the list.', 'ნაპოვნია: ' + d.name + '. ერთი ობიექტი სიიდან.');
                    return h.clone(d);
                },
            },
            toNumber: {
                op: 'Number(id)',
                run: (v, c) => {
                    if (typeof v === 'number') return v;
                    if (typeof v !== 'string' || v.trim() === '' || Number.isNaN(Number(v))) throw new Error('Number() needs text that looks like a number, but received ' + desc(v) + '.');
                    say(c, '"' + v + '" (a string) became ' + Number(v) + ' (a number).', '"' + v + '" (სტრიქონი) გახდა ' + Number(v) + ' (რიცხვი).');
                    return Number(v);
                },
            },

            // ---------- Components & JSX ----------
            component: {
                op: 'function DishList() { return <…/> }',
                run: (v, c) => {
                    c.inHandler = false;
                    renderNote(c, 'DishList');
                    return v === undefined ? { __kind: 'component', name: 'DishList' } : v;
                },
            },
            pageComp: {
                op: 'function MenuPage() { … }',
                run: (v, c) => {
                    c.inHandler = false;
                    const name = (c.route && c.route.page) || 'MenuPage';
                    c.pageTitle = c.pageTitle || name;
                    renderNote(c, name);
                    return v === undefined ? { __kind: 'component', name } : v;
                },
            },
            props: {
                op: '<DishList dishes={dishes} />',
                run: (v, c) => {
                    if (v === undefined || kind(v) === 'event') {
                        if (c.graph) v = { items: c.state.items || c.lastArray || [] };
                        else throw new Error('Props carry a value from the parent to the child, but nothing came in. Connect data or state before this block.');
                    }
                    say(c, 'The parent hands the value down. Props are read-only: the child may read them, never change them.',
                           'მშობელი მნიშვნელობას ქვემოთ გადასცემს. Props მხოლოდ წასაკითხია: შვილი კითხულობს, მაგრამ არ ცვლის.');
                    if (Array.isArray(v)) return { dishes: v };
                    if (plain(v) && Array.isArray(v.items)) return { dishes: v.items };
                    return v;
                },
            },
            jsxList: {
                op: 'dishes.map((d) => <DishCard key={d.id} />)',
                run: (v, c) => {
                    const a = arr(v, '.map() in JSX', c);
                    c.lastArray = a;
                    say(c, a.length + ' elements are described, each with key={dish.id}. Nothing is on the page yet: JSX is a description.',
                           'აღწერილია ' + a.length + ' ელემენტი, თითო key={dish.id}-ით. გვერდზე ჯერ არაფერია: JSX მხოლოდ აღწერაა.');
                    return { __kind: 'jsx', tag: 'DishCard', count: a.length };
                },
            },
            jsxCond: {
                op: 'if (loading) return <Skeleton />',
                run: (v, c) => {
                    const items = Array.isArray(v) ? v : plain(v) ? v.items : (c.graph ? c.state.items : undefined);
                    if (c.status >= 400 || c.status === 0 && c.live === false && c.failed) {
                        say(c, 'The request failed → the error branch: a message and a "Try again" button.', 'მოთხოვნა ჩავარდა → error ტოტი: შეტყობინება და ღილაკი „სცადე ხელახლა“.');
                        c.lastArray = [];
                        return { __kind: 'jsx', tag: 'ErrorState', count: 1 };
                    }
                    if (items === null || items === undefined) {
                        if (kind(v) === 'promise') throw new Error('The check received a Promise, not state. Store the answer with setState first; the component reads state, not requests.');
                        say(c, 'There is no data yet → the loading branch: six grey cards.', 'მონაცემი ჯერ არ არის → loading ტოტი: ექვსი ნაცრისფერი ბარათი.');
                        c.lastArray = [];
                        return { __kind: 'jsx', tag: 'DishCardSkeleton', count: 6 };
                    }
                    if (items.length === 0) {
                        say(c, 'The answer arrived and it is empty → the empty branch: "No dishes here yet."', 'პასუხი მოვიდა და ცარიელია → empty ტოტი.');
                        c.lastArray = [];
                        return { __kind: 'jsx', tag: 'EmptyMessage', count: 1 };
                    }
                    say(c, 'Render #1 took the loading branch. Now there are ' + items.length + ' dishes → the list branch.',
                           'რენდერმა #1 loading ტოტი აირჩია. ახლა ' + items.length + ' კერძია → სიის ტოტი.');
                    return v;
                },
            },
            childComp: {
                op: '<DishCard dish={dish} />',
                run: (v, c) => {
                    const n = kind(v) === 'jsx' ? v.count : arr(v, '<DishCard />', c).length;
                    say(c, 'DishCard() is called ' + n + ' times: one function, ' + n + ' different props.', 'DishCard() გამოიძახება ' + n + '-ჯერ: ერთი ფუნქცია, ' + n + ' განსხვავებული props.');
                    return kind(v) === 'jsx' ? v : { __kind: 'jsx', tag: 'DishCard', count: n };
                },
            },
            reactRender: {
                op: 'React: compare, then update the DOM',
                run: (v, c) => {
                    const k = kind(v);
                    let n;
                    if (k === 'promise') throw new Error('React cannot draw a Promise ("Objects are not valid as a React child"). Put the answer into state first.');
                    if (k === 'jsx') n = v.count;
                    else if (Array.isArray(v)) { n = v.length; c.lastArray = v; }
                    else if (plain(v) && Array.isArray(v.items)) { n = v.items.length; c.lastArray = v.items; }
                    else if (plain(v) && Array.isArray(v.dishes)) { n = v.dishes.length; c.lastArray = v.dishes; }
                    else if (plain(v) && v.name) { n = 1; c.lastArray = [v]; }
                    else if (k === 'undefined' && !c.graph) throw new Error('Nothing to draw: no JSX reached React. Connect a component or a list before this block.');
                    else if (k === 'number' || k === 'string') { n = 1; c.textOut = String(v); }
                    else n = c.graph ? (c.lastArray || []).length || 1 : 1;
                    say(c, 'React compared the new description with the previous one and updated ' + n + ' DOM node(s). Renders so far: ' + Math.max(1, c.renders) + '.',
                           'React-მა ახალი აღწერა წინას შეადარა და განაახლა ' + n + ' DOM კვანძი. რენდერები ჯამში: ' + Math.max(1, c.renders) + '.');
                    return h.mkDom('#root', n);
                },
            },

            // ---------- State & events ----------
            useStateBlk: {
                op: 'const [value, setValue] = useState(initial)',
                run: (v, c) => {
                    if (typeof v === 'string') { c.state.text = v; return v; }
                    let items = null;
                    if (Array.isArray(v)) items = v;
                    else if (plain(v) && Array.isArray(v.items)) items = v.items;
                    // a cart that waits for clicks starts empty; a list that waits for the API starts as null
                    const cartFlow = c.types.some(t => t === 'onClick' || t === 'liftState') && !c.types.some(t => t === 'useEffectBlk' || t === 'customHook');
                    if (!items && cartFlow) {
                        c.state.items = [];
                        say(c, 'State starts as an empty array: the cart has no dishes yet. Render #1 draws an empty cart.',
                               'State იწყება ცარიელი მასივით: კალათაში კერძები ჯერ არ არის. რენდერი #1 ცარიელ კალათას ხატავს.');
                        return { items: [] };
                    }
                    c.state.items = items;
                    if (items) {
                        c.lastArray = items;
                        say(c, 'State holds ' + items.length + ' items. React keeps the value between renders; a plain variable would be lost.',
                               'State-ში ' + items.length + ' ერთეულია. React მნიშვნელობას რენდერებს შორის ინახავს; ჩვეულებრივი ცვლადი დაიკარგებოდა.');
                    } else {
                        say(c, 'State starts as null: there is no data yet. Whatever render #1 draws, it draws without the data.',
                               'State იწყება null-ით: მონაცემი ჯერ არ არის. რენდერი #1 რასაც დახატავს, მონაცემის გარეშე დახატავს.');
                    }
                    return { items };
                },
            },
            onClick: {
                op: 'onClick={() => add(dish)}',
                run: (v, c) => {
                    c.inHandler = true;
                    c.clicked = h.clone(DISHES[3]);
                    say(c, 'The guest clicks "Add" on Tarte Tatin. React calls the handler now: on the event, not during a render.',
                           'სტუმარი აჭერს „დამატებას“ Tarte Tatin-ზე. React handler-ს ახლა იძახებს: ივენთზე და არა რენდერის დროს.');
                    return h.mkEvent('click', 'button "Add" · Tarte Tatin');
                },
            },
            setStateBlk: {
                op: 'setValue(next)',
                run: (v, c) => {
                    const k = kind(v);
                    if (c.mutated) {
                        throw new Error('Same array, same reference. React compares with Object.is(old, new), gets "true" and does NOT render again: the screen keeps the old cart. Build a new array: [...cart, dish].');
                    }
                    if (c.inEffect && !c.hasDeps && !c.graph) {
                        throw new Error('This effect has no dependency array, so it runs after EVERY render. setState → render → effect → setState … an endless loop. Add [] (or the values the effect uses).');
                    }
                    if (k === 'promise') throw new Error('You are storing a Promise in state. The JSON has not arrived: read it with res.json() first, then call setState with the data.');
                    if (k === 'response') throw new Error('You are storing the Response, not the data. Call res.json() first.');
                    let items;
                    if (k === 'event' || k === 'action') items = [...(c.state.items || []), c.clicked || h.clone(DISHES[3])];
                    else if (Array.isArray(v)) items = v;
                    else if (plain(v) && Array.isArray(v.items)) items = v.items;
                    else if (c.graph) items = c.state.items || c.lastArray || [];
                    else if (k === 'undefined') throw new Error('setState needs the next value, but nothing came in.');
                    else throw new Error('This task keeps a list in state, but setState received ' + desc(v) + '.');
                    c.state.items = items;
                    c.lastArray = items;
                    if (c.renders === 0) c.renders = 1; // the screen was drawn once before this change
                    c.renders++;
                    c.pendingRender = true;
                    say(c, 'setState stored a new array (' + items.length + ' items). React schedules render #' + c.renders + '.',
                           'setState-მა ახალი მასივი შეინახა (' + items.length + ' ერთეული). React გეგმავს რენდერს #' + c.renders + '.');
                    if (c.persist) say(c, 'The effect inside useLocalStorage wrote the new cart to localStorage. F5 will find it there.',
                                          'useLocalStorage-ის შიგნით ეფექტმა ახალი კალათა localStorage-ში ჩაწერა. F5 მას იქ იპოვის.');
                    return { items };
                },
            },
            mutateBlk: {
                op: 'cart.push(dish)',
                run: (v, c) => {
                    const a = arr(v, '.push()', c);
                    a.push(h.clone(NEW_DISH));
                    c.mutated = true;
                    say(c, 'cart.push(dish): the array has ' + a.length + ' items now, but it is still the SAME array object as before.',
                           'cart.push(dish): მასივში ახლა ' + a.length + ' ერთეულია, მაგრამ ეს ისევ იგივე მასივის ობიექტია.');
                    return v;
                },
            },
            derived: {
                op: 'const total = cart.reduce(…)',
                run: (v, c) => {
                    const a = arr(v, 'A derived value', c);
                    const total = a.reduce((s, d) => s + (d.price || 0), 0);
                    c.lastArray = a;
                    say(c, 'Calculated while rendering: ' + a.length + ' dishes, total $' + total + '. No second useState and no effect to keep it in step.',
                           'გამოითვალა რენდერის დროს: ' + a.length + ' კერძი, ჯამი $' + total + '. არც მეორე useState, არც ეფექტი.');
                    return { items: a, count: a.length, total };
                },
            },
            liftState: {
                op: 'state lives in the common parent',
                run: (v, c) => {
                    say(c, 'The state lives in the closest common parent. Children get the value as props and ask for changes through a function.',
                           'State ცხოვრობს უახლოეს საერთო მშობელში. შვილები მნიშვნელობას props-ით იღებენ და ცვლილებას ფუნქციით ითხოვენ.');
                    if (v === undefined || kind(v) === 'event') return { items: c.state.items || [] };
                    return v;
                },
            },
            callbackProp: {
                op: 'onAdd={handleAdd}',
                run: (v, c) => {
                    say(c, 'The child calls onAdd(dish). It does not know where the state lives; the parent does.',
                           'შვილი იძახებს onAdd(dish)-ს. მან არ იცის, სად ცხოვრობს state; ეს მშობელმა იცის.');
                    return v;
                },
            },
            controlledInput: {
                op: '<input value={query} onChange={…} />',
                run: (v, c) => {
                    c.query = 'tar';
                    c.typed = true;
                    c.keystrokes = 3;
                    c.inHandler = true;
                    c.addressChanges = true;
                    c.renders = Math.max(1, c.renders) + 3;
                    say(c, 'The guest types "t", "ta", "tar": three change events, three setQuery calls, three renders.',
                           'სტუმარი კრეფს "t", "ta", "tar": სამი change ივენთი, სამი setQuery, სამი რენდერი.');
                    return 'tar';
                },
            },

            // ---------- Effects ----------
            useEffectBlk: {
                op: 'useEffect(() => { … }, [deps])',
                run: (v, c) => {
                    c.inEffect = true;
                    c.hasDeps = false;
                    say(c, 'React has drawn the screen. Only now does the effect run: this is the place for requests, timers and listeners.',
                           'React-მა ეკრანი დახატა. ეფექტი მხოლოდ ახლა ეშვება: ეს არის ადგილი მოთხოვნებისთვის, ტაიმერებისთვის და listener-ებისთვის.');
                    return v;
                },
            },
            depsArray: {
                op: '}, [deps])',
                run: (v, c) => {
                    if (!c.inEffect && !c.graph) throw new Error('A dependency array is the second argument of useEffect. Put it after a useEffect block.');
                    c.hasDeps = true;
                    if (c.query || c.category) {
                        say(c, 'The effect lists the value it uses. It runs again only when that value changes.',
                               'ეფექტი ასახელებს მნიშვნელობას, რომელსაც იყენებს. ხელახლა ეშვება მხოლოდ მისი შეცვლისას.');
                    } else {
                        say(c, '[] → the effect runs once, after the first render. (In development StrictMode runs it twice on purpose.)',
                               '[] → ეფექტი ეშვება ერთხელ, პირველი რენდერის შემდეგ. (development-ში StrictMode მას განზრახ ორჯერ უშვებს.)');
                    }
                    return v;
                },
            },
            cleanup: {
                op: 'return () => controller.abort()',
                run: (v, c) => {
                    if (!c.inEffect && !c.graph) throw new Error('A cleanup is the function an effect returns. It needs a useEffect before it.');
                    c.cleanup = true;
                    say(c, c.abort
                        ? 'The cleanup is in place: when the address changes or the component leaves, the old request is aborted. A slow old answer can no longer win.'
                        : 'A cleanup is in place, but there is nothing for it to cancel. Add an AbortController before the request.',
                        c.abort
                        ? 'Cleanup ადგილზეა: მისამართის შეცვლისას ან კომპონენტის წასვლისას ძველი მოთხოვნა უქმდება. ნელი ძველი პასუხი ვეღარ გაიმარჯვებს.'
                        : 'Cleanup ადგილზეა, მაგრამ გასაუქმებელი არაფერია. მოთხოვნამდე დაამატე AbortController.');
                    return v;
                },
            },

            // ---------- Routing ----------
            urlBlk: {
                op: 'location: /menu/3?category=desserts',
                run: (v, c) => {
                    c.url = { __kind: 'url', path: c.urlPath || '/menu/3', search: c.urlSearch === undefined ? '?category=desserts' : c.urlSearch };
                    c.addressChanges = true;
                    say(c, 'The address bar says ' + c.url.path + c.url.search + '. It is state the browser keeps: it survives F5 and can be shared.',
                           'მისამართის ზოლში წერია ' + c.url.path + c.url.search + '. ეს state-ია, რომელსაც ბრაუზერი ინახავს: უძლებს F5-ს და გაზიარებადია.');
                    return c.url;
                },
            },
            routeTable: {
                op: '<Route path="menu/:id" element={…} />',
                run: (v, c) => {
                    const u = kind(v) === 'url' ? v : c.url;
                    if (!u) throw new Error('The router matches an ADDRESS against the route table, but received ' + desc(v) + '. Start the flow from the address bar.');
                    c.route = matchRoute(u.path);
                    say(c, '"' + u.path + '" fits the route "' + c.route.pattern + '" → <' + c.route.page + ' />. The most specific route wins, not the first one in the file.',
                           '"' + u.path + '" ემთხვევა როუტს "' + c.route.pattern + '" → <' + c.route.page + ' />. იმარჯვებს ყველაზე კონკრეტული როუტი და არა ფაილში პირველი.');
                    return c.route;
                },
            },
            layoutOutlet: {
                op: '<Header /> <Outlet /> <Footer />',
                run: (v, c) => {
                    if (!c.route && !c.graph) throw new Error('A layout draws the matched page in its <Outlet />, but no route has been matched yet. Put the route table before it.');
                    say(c, 'RootLayout stays on the screen: header and footer. The matched page is drawn where <Outlet /> stands.',
                           'RootLayout ეკრანზე რჩება: header და footer. ნაპოვნი გვერდი იხატება იქ, სადაც <Outlet /> დგას.');
                    return c.route || v;
                },
            },
            routeParam: {
                op: 'const { id } = useParams()',
                run: (v, c) => {
                    const r = kind(v) === 'route' ? v : c.route;
                    if (!r) throw new Error('useParams() reads the parameters of the MATCHED route. Put the route table before it.');
                    if (r.params.id === undefined) throw new Error('The route "' + r.pattern + '" has no :id parameter to read.');
                    say(c, 'useParams() → { id: "' + r.params.id + '" }. It was cut out of the address, so it is a string.',
                           'useParams() → { id: "' + r.params.id + '" }. ის მისამართიდან ამოიჭრა, ამიტომ სტრიქონია.');
                    return r.params.id;
                },
            },
            searchParamsBlk: {
                op: 'searchParams.get("category")',
                run: (v, c) => {
                    if (!c.url) throw new Error('useSearchParams() reads the query of the address. Start the flow from the address bar.');
                    const cat = new URLSearchParams(c.url.search).get('category');
                    c.category = cat;
                    c.inHandler = false;
                    say(c, 'useSearchParams() → category = "' + cat + '". The filter lives in the address, not in useState.',
                           'useSearchParams() → category = "' + cat + '". ფილტრი ცხოვრობს მისამართში და არა useState-ში.');
                    return cat;
                },
            },
            linkNav: {
                op: '<Link to={`/menu/${dish.id}`}>',
                run: (v, c) => {
                    c.url = { __kind: 'url', path: '/menu/3', search: '' };
                    c.inHandler = true;
                    say(c, 'The guest clicks a <Link>. The address changes to /menu/3 and no new HTML document is requested.',
                           'სტუმარი აჭერს <Link>-ს. მისამართი იცვლება /menu/3-ზე და ახალი HTML დოკუმენტი არ მოითხოვება.');
                    return c.url;
                },
            },
            guard: {
                op: 'if (!session) return <Navigate to="/login" />',
                run: (v, c) => {
                    const want = c.from || (c.route && c.route.path) || (c.url && c.url.path) || '/kitchen';
                    if (!c.session) {
                        c.from = want;
                        c.url = { __kind: 'url', path: '/login', search: '', state: { from: want } };
                        say(c, 'No session → <Navigate to="/login" replace />. The wanted address ("' + want + '") travels along in state.',
                               'სესია არ არის → <Navigate to="/login" replace />. სასურველი მისამართი ("' + want + '") state-ში მიჰყვება.');
                        return c.url;
                    }
                    c.route = matchRoute(want);
                    c.url = { __kind: 'url', path: want, search: '' };
                    c.pageTitle = c.route.page;
                    say(c, 'A session exists (' + c.session.user.email + ') → the guard lets the page through. It is a sign on the door; the server checks the token again.',
                           'სესია არსებობს (' + c.session.user.email + ') → მცველი გვერდს უშვებს. ეს მხოლოდ ნიშანია კარზე; სერვერი token-ს ხელახლა ამოწმებს.');
                    return c.route;
                },
            },
            loginPost: {
                op: 'POST /api/v1/auth/login',
                run: (v, c) => {
                    c.inHandler = true;
                    c.requests++;
                    c.session = { accessToken: 'eyJhbGciOi…', user: { email: 'waiter@itstep.ge', role: 'Waiter' } };
                    say(c, 'POST /api/v1/auth/login → 200 { accessToken, expiresIn: 120 }. The session is kept; the password is not.',
                           'POST /api/v1/auth/login → 200 { accessToken, expiresIn: 120 }. სესია ინახება; პაროლი არა.');
                    return { accessToken: 'eyJhbGciOi…', expiresIn: 120 };
                },
            },

            // ---------- Hooks & architecture ----------
            customHook: {
                op: 'const { data, loading } = useApi(path)',
                run: (v, c) => {
                    c.hookCalls = (c.hookCalls || 0) + 1;
                    c.inEffect = true; c.hasDeps = true; c.abort = true; c.cleanup = true;
                    say(c, 'useApi(path), call #' + c.hookCalls + ': this caller gets its OWN state, its own effect and its own request.',
                           'useApi(path), გამოძახება #' + c.hookCalls + ': ამ გამომძახებელს აქვს საკუთარი state, საკუთარი ეფექტი და საკუთარი მოთხოვნა.');
                    return v === undefined ? API_PATH : v;
                },
            },
            apiHelper: {
                op: 'api<T>(path)',
                run: (v, c) => {
                    say(c, 'lib/api.ts: the one place that knows fetch, the headers, the res.ok check and ApiError. No React in this file.',
                           'lib/api.ts: ერთადერთი ადგილი, რომელმაც იცის fetch, header-ები, res.ok შემოწმება და ApiError. ამ ფაილში React არ არის.');
                    return endpointFor(c);
                },
            },
            proxyBlk: {
                op: '/api → srmsapi.stepacademy.ge',
                run: (v, c) => {
                    if (kind(v) !== 'promise' && !c.graph) throw new Error('The proxy forwards a REQUEST. Put it after fetch(), which is what sends one.');
                    say(c, '/api/… reaches the dev server, which forwards it to https://srmsapi.stepacademy.ge. For the browser it is its own origin: no CORS.',
                           '/api/… მიდის dev სერვერთან, რომელიც მას https://srmsapi.stepacademy.ge-ზე აგზავნის. ბრაუზერისთვის ეს საკუთარი origin-ია: CORS არ არის.');
                    return v;
                },
            },
            serverBlk: {
                op: '200 OK · application/json',
                run: (v, c) => {
                    if (kind(v) !== 'promise' && !c.graph) throw new Error('A server answers a REQUEST. Put fetch() (and the proxy) before it.');
                    say(c, 'The API answers 200 with JSON. It could also say 404, 429 or 500, or not answer at all: the page needs a plan for each.',
                           'API პასუხობს 200-ით და JSON-ით. მას შეეძლო ეთქვა 404, 429 ან 500, ან საერთოდ არ ეპასუხა: გვერდს თითოეულისთვის გეგმა სჭირდება.');
                    return v;
                },
            },
            useDebounceBlk: {
                op: 'useDebounce(query, 400)',
                run: (v, c) => {
                    if (typeof v !== 'string') throw new Error('useDebounce(value, delay) needs the value that changes fast (the typed text), but received ' + desc(v) + '.');
                    c.debounced = true;
                    c.inHandler = false;
                    say(c, 'Three keystrokes went in, one value came out: "' + v + '", after 400 ms of silence. Each keystroke cancelled the timer of the one before.',
                           'სამი ასო შევიდა, ერთი მნიშვნელობა გამოვიდა: "' + v + '", 400 მწმ სიჩუმის შემდეგ. ყოველმა ასომ წინა ტაიმერი გააუქმა.');
                    return v;
                },
            },
            useLocalStorageBlk: {
                op: 'useLocalStorage("cart", [])',
                run: (v, c) => {
                    const saved = [h.clone(DISHES[0]), h.clone(DISHES[4])];
                    c.state.items = saved;
                    c.lastArray = saved;
                    c.persist = true;
                    say(c, 'The first value was READ from localStorage: 2 dishes from the last visit. A plain useState([]) would start empty after F5.',
                           'პირველი მნიშვნელობა localStorage-დან წაიკითხა: 2 კერძი წინა ვიზიტიდან. ჩვეულებრივი useState([]) F5-ის შემდეგ ცარიელი დაიწყებოდა.');
                    return { items: saved };
                },
            },
            useRefBlk: {
                op: 'const ref = useRef(null)',
                run: (v, c) => {
                    say(c, 'A ref holds the real <input> element. Changing ref.current never causes a render.',
                           'Ref ინახავს ნამდვილ <input> ელემენტს. ref.current-ის შეცვლა რენდერს არასდროს იწვევს.');
                    return h.mkElement('input#search');
                },
            },

            // ---------- Context & reducer ----------
            createCtx: {
                op: 'createContext(null)',
                run: (v, c) => {
                    c.ctxMade = true;
                    say(c, 'createContext(null): the channel exists, but nothing is on it. null is what a component gets with no provider above it.',
                           'createContext(null): არხი არსებობს, მაგრამ მასზე არაფერია. null-ს იღებს კომპონენტი, რომლის ზემოთაც provider არ არის.');
                    return { __kind: 'context', name: 'CartContext', value: null };
                },
            },
            providerBlk: {
                op: '<CartContext value={…}>',
                run: (v, c) => {
                    const items = Array.isArray(v) ? v : (plain(v) && Array.isArray(v.items)) ? v.items : (c.state.items || []);
                    c.state.items = items;
                    c.lastArray = items;
                    c.hasProvider = true;
                    c.ctxValue = { items, count: items.length };
                    say(c, 'The provider puts the value around the tree: every component INSIDE can read it (' + items.length + ' items). No props in between.',
                           'Provider მნიშვნელობას ხის გარშემო ათავსებს: შიგნით ყველა კომპონენტს შეუძლია წაკითხვა (' + items.length + ' ერთეული). შუაში props არ არის.');
                    return { __kind: 'context', name: 'CartContext', value: c.ctxValue };
                },
            },
            useCtxBlk: {
                op: 'const { items } = useCart()',
                run: (v, c) => {
                    if (!c.hasProvider) throw new Error('useCart() must be used inside <CartProvider>. There is no provider above this component, so the context value is null.');
                    c.readers = (c.readers || 0) + 1;
                    say(c, 'Reader #' + c.readers + ' picks the value up from the context. It will render again whenever that value changes.',
                           'მკითხველი #' + c.readers + ' მნიშვნელობას context-იდან იღებს. ის ხელახლა დაიხატება ყოველთვის, როცა ეს მნიშვნელობა შეიცვლება.');
                    return { items: c.ctxValue.items, count: c.ctxValue.count };
                },
            },
            dispatchBlk: {
                op: 'dispatch({ type: "add", dish })',
                run: (v, c) => {
                    const dish = c.clicked || h.clone(DISHES[3]);
                    c.clicked = dish;
                    say(c, 'dispatch({ type: "add", dish }): a ticket that says WHAT happened. The component no longer knows HOW the cart changes.',
                           'dispatch({ type: "add", dish }): ბილეთი, რომელიც ამბობს, რა მოხდა. კომპონენტმა აღარ იცის, როგორ იცვლება კალათა.');
                    return { __kind: 'action', type: 'add', dish: { id: dish.id, name: dish.name } };
                },
            },
            reducerBlk: {
                op: 'cartReducer(state, action)',
                run: (v, c) => {
                    if (kind(v) !== 'action' && !c.graph) throw new Error('A reducer is called with (state, action). It received ' + desc(v) + ' instead of an action: dispatch one first.');
                    const dish = c.clicked || h.clone(DISHES[3]);
                    const items = [...(c.state.items || []), dish];
                    c.state.items = items;
                    c.lastArray = items;
                    if (c.renders === 0) c.renders = 1;
                    c.renders++;
                    c.pendingRender = true;
                    say(c, 'cartReducer(state, action) returned a NEW array (' + items.length + '). A pure function: no fetch, no localStorage, no push inside.',
                           'cartReducer(state, action)-მა ახალი მასივი დააბრუნა (' + items.length + '). სუფთა ფუნქცია: შიგნით არც fetch, არც localStorage, არც push.');
                    return { items };
                },
            },

            // ---------- Store ----------
            storeBlk: {
                op: 'create((set) => ({ items, add }))',
                run: (v, c) => {
                    const base = c.state.items || [];
                    const k = kind(v);
                    const items = (k === 'event' || k === 'action') ? [...base, c.clicked || h.clone(DISHES[3])] : Array.isArray(v) ? v : base;
                    c.state.items = items;
                    c.lastArray = items;
                    c.hasStore = true;
                    c.inHandler = false;
                    if (k === 'event' || k === 'action') { if (c.renders === 0) c.renders = 1; c.renders++; c.pendingRender = true; }
                    say(c, 'The store lives OUTSIDE the component tree: no provider. set() replaced the cart with a new array (' + items.length + ').',
                           'Store ცხოვრობს კომპონენტების ხის გარეთ: provider არ არის. set()-მა კალათა ახალი მასივით შეცვალა (' + items.length + ').');
                    return { items, count: items.length };
                },
            },
            selectorBlk: {
                op: 'useCart((s) => s.items.length)',
                run: (v, c) => {
                    if (!c.hasStore) throw new Error('A selector reads from a store: useCart((s) => s.items.length). There is no store before this block.');
                    c.readers = (c.readers || 0) + 1;
                    const n = c.state.items.length;
                    say(c, 'Selector #' + c.readers + ' picked one value: ' + n + '. This component renders again only when THAT value changes.',
                           'Selector #' + c.readers + '-მა ერთი მნიშვნელობა აირჩია: ' + n + '. ეს კომპონენტი ხელახლა იხატება მხოლოდ მაშინ, როცა ეს მნიშვნელობა შეიცვლება.');
                    return n;
                },
            },
            persistBlk: {
                op: 'persist(…, { name: "bistro.cart" })',
                run: (v, c) => {
                    if (!c.hasStore) throw new Error('persist wraps a store. There is no store before this block.');
                    c.persist = true;
                    say(c, 'persist: the store is written to localStorage after every change and read back when the app starts.',
                           'persist: store ყოველი ცვლილების შემდეგ იწერება localStorage-ში და აპის გაშვებისას იკითხება უკან.');
                    return v;
                },
            },

            // ---------- engine blocks, told the React way ----------
            filterOp: {
                op: '.filter((d) => d.inStock)',
                run: (v, c) => {
                    const a = arr(v, '.filter()', c).filter(d => d.inStock);
                    c.lastArray = a;
                    return a;
                }
            },
            spreadOp: {
                op: '[...cart, dish]',
                run: (v, c) => {
                    const a = [...arr(v, 'The spread copy', c), h.clone(NEW_DISH)];
                    c.lastArray = a;
                    say(c, '[...cart, dish] built a NEW array with ' + a.length + ' items. The old one is untouched.',
                           '[...cart, dish]-მა ააგო ახალი მასივი ' + a.length + ' ერთეულით. ძველი ხელუხლებელია.');
                    return a;
                }
            },
            browser: { op: h.SIM.browser.op, run: h.SIM.browser.run }
        };

        // --------------------------------------------------------
        // CODE TAB
        // A flow is drawn in the order things HAPPEN; a file is written in
        // another order. So a block does not print lines one after another:
        // it puts them into a part of the component, and the engine
        // assembles the parts:
        //   top      above the component (data, route table, context, store)
        //   hooks    the first lines of the component
        //   effect   inside useEffect(() => { … }, [deps])
        //   handler  inside the event handler
        //   body     calculations and early returns
        //   jsx      the final return
        //   after    below the component
        // A block returns lines for the current zone (c.zone), or sets c.slot.
        // --------------------------------------------------------
        const stateVar = (c) => c.stateVar || 'dishes';
        const listVar = (c) => (c.inHook ? 'data' : (!c.v || c.v === 'data' || c.v === 'next' || c.v === 'search' || c.v === 'category' || c.v === 'query') ? stateVar(c) : c.v);
        const intoHandler = (c) => { if (c.zone !== 'effect') { c.handler = true; c.slot = 'handler'; } };
        const GEN = {
            dataArray: (c) => {
                c.slot = 'top'; c.v = 'dishes';
                return ['const dishes: Dish[] = [', '  { id: 1, name: \'Coq au vin\', price: 24, inStock: true },', '  { id: 2, name: \'Ratatouille\', price: 16, inStock: true },', '  { id: 3, name: \'Crème brûlée\', price: 9, inStock: false },', '];'];
            },
            filterOp: (c) => {
                const from = c.v || 'dishes';
                if (!c.stateVar) c.slot = 'top'; else { c.slot = 'body'; }
                c.v = 'available';
                return ['const available = ' + from + '.filter((d) => d.inStock);'];
            },
            spreadOp: (c) => {
                intoHandler(c);
                const from = (c.v && c.v !== 'data') ? c.v : 'cart';
                c.v = 'next';
                return ['const next = [...' + from + ', dish]; // a NEW array'];
            },
            apiEndpoint: (c) => {
                c.url = 'path';
                const t = c.types;
                if (c.api.url) return ['const path = \'' + c.api.url + '\';'];
                if (t.includes('useDebounceBlk')) return ['const path = `/api/v1/enterprise/search?q=${encodeURIComponent(search)}`;'];
                if (t.includes('controlledInput')) return ['const path = `/api/v1/enterprise/search?q=${encodeURIComponent(query)}`;'];
                if (t.includes('searchParamsBlk')) return ['const path = category ? `' + API_PATH + '?category=${category}` : \'' + API_PATH + '\';'];
                return ['const path = \'' + API_PATH + '\';'];
            },
            fetchCall: (c) => {
                if (c.inHook) { c.slot = 'after'; return ['//   fetch(path, { signal })     the request leaves the browser']; }
                if (c.zone === 'effect' || c.zone === 'handler') {
                    c.reactFetch = true;
                    return ['fetch(' + (c.url || 'path') + (c.signal ? ', { signal: controller.signal }' : '') + ')',
                            '  .then((res) => {', '    if (!res.ok) throw new Error(`HTTP ${res.status}`);', '    return res.json();', '  })'];
                }
                if (c.types.includes('component') || c.types.includes('pageComp')) {
                    c.reactFetch = true; c.thenDone = true;
                    return ['// BUG: the body runs on every render, so this request starts on every render',
                            'fetch(' + (c.url || 'path') + ')', '  .then((res) => res.json())', '  .then((data: Dish[]) => ' + (c.setter || 'setDishes') + '(data)); // setState → render → fetch → …'];
                }
                return origFetch.gen(c);
            },
            jsonParse: (c) => {
                if (c.inHook) { c.slot = 'after'; return ['//   res.json()                   the body becomes Dish[]']; }
                return c.reactFetch ? [] : origJson.gen(c);
            },
            abortCtl: (c) => { c.signal = true; return ['const controller = new AbortController();']; },
            findById: (c) => {
                c.slot = 'body';
                const id = c.v === 'dishId' ? 'dishId' : (c.v || 'id');
                c.v = 'dish';
                return ['const dish = dishes.find((d) => d.id === ' + id + ');' + (id === 'id' ? ' // BUG: number === string' : ''), 'if (!dish) return <DishNotFound />;'];
            },
            toNumber: (c) => { c.slot = 'body'; c.v = 'dishId'; return ['const dishId = Number(id);']; },

            component: (c) => { c.zone = 'body'; if (!c.named) c.name = c.types.includes('useCtxBlk') ? 'Header' : c.types.includes('selectorBlk') ? 'CartBadge' : 'DishList'; return []; },
            pageComp: (c) => {
                c.zone = 'body'; c.exported = true; c.named = true;
                c.name = c.types.includes('guard') ? 'KitchenPage' : c.types.includes('routeParam') ? 'DishPage' : 'MenuPage';
                return [];
            },
            props: (c) => {
                c.slot = 'top';
                const from = c.v || 'dishes';
                c.params = '{ dishes }: { dishes: Dish[] }';
                c.v = 'dishes';
                return ['', '// the parent hands the data down:', '// <DishList dishes={' + from + '} />'];
            },
            jsxList: (c) => {
                c.slot = 'jsx'; c.zone = 'body'; c.hasJsx = true;
                const nullable = c.stateVar === 'dishes' && !c.inHook && listVar(c) === 'dishes' && !c.types.includes('jsxCond') && c.types.includes('useStateBlk') && !c.params;
                return ['return (', '  <ul>', '    {' + listVar(c) + (nullable ? '?' : '') + '.map((dish) => (', '      <DishCard key={dish.id} dish={dish} />', '    ))}', '  </ul>', ');'];
            },
            jsxCond: (c) => {
                c.slot = 'body'; c.zone = 'body';
                return c.inHook
                    ? ['if (error) return <ErrorState onRetry={reload} />;', 'if (loading) return <DishGridSkeleton />;', 'if (data.length === 0) return <p>No dishes here yet.</p>;']
                    : ['if (failed) return <ErrorState />;', 'if (' + stateVar(c) + ' === null) return <DishGridSkeleton />;', 'if (' + stateVar(c) + '.length === 0) return <p>No dishes here yet.</p>;'];
            },
            childComp: (c) => { c.slot = 'after'; return ['// DishCard.tsx', 'function DishCard({ dish }: { dish: Dish }) {', '  return <article>{dish.name} · ${dish.price}</article>;', '}']; },
            reactRender: (c) => {
                if (c.hasJsx) return [];
                c.slot = 'jsx'; c.hasJsx = true;
                if (c.v === 'count') return ['return <span className="badge">{count}</span>;'];
                if (c.v === 'dish') return ['return <h1>{dish.name}</h1>;'];
                if (c.v === 'total' || c.hasDerived) return ['return <p>{count} dishes · ${total}</p>;'];
                return ['return <main>{/* what this component draws */}</main>;'];
            },
            browser: () => [],

            useStateBlk: (c) => {
                c.slot = 'hooks';
                if (c.v === 'dishes' || c.v === 'available') { const from = c.v; c.v = 'cart'; c.stateVar = 'cart'; c.setter = 'setCart'; return ['const [cart, setCart] = useState<Dish[]>(' + from + ');']; }
                if (c.types.some(t => t === 'onClick' || t === 'liftState') && !inReact(c)) { c.v = 'cart'; c.stateVar = 'cart'; c.setter = 'setCart'; return ['const [cart, setCart] = useState<Dish[]>([]);']; }
                c.stateVar = 'dishes'; c.setter = 'setDishes';
                return ['const [dishes, setDishes] = useState<Dish[] | null>(null);', 'const [failed, setFailed] = useState(false);'];
            },
            onClick: (c) => { c.handler = true; c.zone = 'handler'; return []; },
            setStateBlk: (c) => {
                const setter = c.setter || 'setDishes';
                if (c.inHook) { c.slot = 'after'; return ['//   setResult({ key, data })     state changes → the page renders again']; }
                if (c.reactFetch) {
                    if (c.thenDone) return [];
                    c.thenDone = true;
                    return ['  .then((data: Dish[]) => ' + setter + '(data))',
                            c.signal ? '  .catch(() => { if (!controller.signal.aborted) setFailed(true); });' : '  .catch(() => setFailed(true));'];
                }
                intoHandler(c);
                if (c.mutatedGen) return [setter + '(' + stateVar(c) + '); // the same reference: React sees no change'];
                if (c.v === 'next') return [setter + '(next);'];
                return [setter + '([...' + (c.stateVar || 'cart') + ', dish]); // a new array, never push'];
            },
            mutateBlk: (c) => { intoHandler(c); c.mutatedGen = true; return [(c.stateVar || 'cart') + '.push(dish); // BUG: the same array, changed in place']; },
            derived: (c) => {
                c.slot = 'body'; c.zone = 'body'; c.hasDerived = true;
                const from = listVar(c);
                return ['const count = ' + from + '.length;', 'const total = ' + from + '.reduce((sum, d) => sum + d.price, 0); // derived: not state'];
            },
            liftState: (c) => { c.slot = 'top'; return ['// MenuSection (the parent) owns this state. Both children get it as props.']; },
            callbackProp: (c) => { c.slot = 'top'; return ['// <DishGrid onAdd={handleAdd} />   the child calls it; the parent changes the state']; },
            controlledInput: (c) => { c.slot = 'hooks'; c.v = 'query'; return ['const [query, setQuery] = useState(\'\');', '// <input value={query} onChange={(e) => setQuery(e.target.value)} />']; },

            useEffectBlk: (c) => { c.effect = true; c.zone = 'effect'; return []; },
            depsArray: (c) => {
                const t = c.types;
                c.deps = t.includes('useDebounceBlk') ? 'search' : t.includes('controlledInput') ? 'query' : t.includes('searchParamsBlk') ? 'category' : '';
                return [];
            },
            cleanup: (c) => [c.signal ? 'return () => controller.abort(); // cleanup: call back the old request' : 'return () => { /* cancel what this effect started */ };'],

            urlBlk: (c) => { c.slot = 'top'; return ['// address bar: ' + (c.types.includes('guard') ? '/kitchen' : c.types.includes('searchParamsBlk') ? '/menu?category=desserts' : '/menu/3')]; },
            routeTable: (c) => {
                c.slot = 'top';
                return ['', '// App.tsx', '<Route element={<RootLayout />}>', '  <Route index element={<HomePage />} />', '  <Route path="menu" element={<MenuPage />} />', '  <Route path="menu/:id" element={<DishPage />} />',
                        '  <Route path="*" element={<NotFoundPage />} />', '</Route>'];
            },
            layoutOutlet: (c) => { c.slot = 'top'; return ['', '// RootLayout.tsx:  <Header />  <main><Outlet /></main>  <Footer />']; },
            routeParam: (c) => { c.slot = 'hooks'; c.v = 'id'; return ['const { id } = useParams(); // "3": always a string']; },
            searchParamsBlk: (c) => { c.slot = 'hooks'; c.v = 'category'; c.named = true; c.name = 'MenuPage'; c.exported = true; return ['const [searchParams] = useSearchParams();', 'const category = searchParams.get(\'category\'); // "desserts" or null']; },
            linkNav: (c) => { c.slot = 'after'; return ['// <Link to={`/menu/${dish.id}`}>{dish.name}</Link>']; },
            guard: (c) => {
                c.slot = 'top';
                if (c.guardDone) return ['// after the login the same guard runs again and lets the page through'];
                c.guardDone = true;
                return ['', '// RequireAuth.tsx', 'if (!session) return <Navigate to="/login" replace state={{ from: location.pathname }} />;', 'return <Outlet />;'];
            },
            loginPost: (c) => {
                c.slot = 'top';
                return ['', '// LoginPage.tsx, in the submit handler', 'const tokens = await api<AuthTokens>(\'/api/v1/auth/login\', { method: \'POST\', body: { email, password } });', 'navigate(from, { replace: true });'];
            },

            customHook: (c) => {
                c.slot = 'hooks'; c.inHook = true; c.v = 'data';
                c.slots.after.push('// below the page, one layer under the other:', '// hooks/useApi.ts               state + effect + AbortController + cleanup');
                return ['const { data, error, loading, reload } = useApi<Dish[]>(\'' + API_PATH + '\');'];
            },
            apiHelper: (c) => {
                if (c.inHook) { c.slot = 'after'; return ['// lib/api.ts                    headers, res.ok check, ApiError']; }
                c.url = 'path';
                return ['const path = \'' + API_PATH + '\'; // lib/api.ts builds the request'];
            },
            proxyBlk: (c) => { c.slot = 'after'; return ['// vite.config.ts                /api → https://srmsapi.stepacademy.ge']; },
            serverBlk: (c) => { c.slot = 'after'; return ['// the API                       200 + JSON (or 404, 429, 500)']; },
            useDebounceBlk: (c) => { c.slot = 'hooks'; c.v = 'search'; return ['const search = useDebounce(query.trim(), 400);']; },
            useLocalStorageBlk: (c) => { c.slot = 'hooks'; c.v = 'cart'; c.stateVar = 'cart'; c.setter = 'setCart'; return ['const [cart, setCart] = useLocalStorage<Dish[]>(\'bistro.cart\', []);']; },
            useRefBlk: (c) => { c.slot = 'hooks'; return ['const inputRef = useRef<HTMLInputElement>(null);', '// <input ref={inputRef} />   then: inputRef.current?.focus();']; },

            createCtx: (c) => { c.slot = 'top'; return ['const CartContext = createContext<CartContextValue | null>(null);']; },
            providerBlk: (c) => { c.slot = 'top'; return ['', '// CartProvider.tsx', '<CartContext value={{ items, count: items.length }}>', '  {children}', '</CartContext>']; },
            useCtxBlk: (c) => {
                if (c.ctxRead) return [];
                c.ctxRead = true; c.slot = 'hooks'; c.v = 'items';
                return ['const { items, count } = useCart(); // reads CartContext'];
            },
            dispatchBlk: (c) => { c.handler = true; c.slot = 'handler'; return ['dispatch({ type: \'add\', dish });']; },
            reducerBlk: (c) => {
                c.slot = 'top';
                return ['', 'function cartReducer(items: CartItem[], action: CartAction): CartItem[] {', '  switch (action.type) {', '    case \'add\':', '      return [...items, { dish: action.dish, qty: 1 }];', '  }', '}'];
            },

            storeBlk: (c) => {
                c.slot = 'top';
                if (c.handler) c.slots.handler.push('useCart.getState().add(dish);');
                return ['export const useCart = create<CartStore>()((set) => ({', '  items: [],', '  add: (dish) => set((s) => ({ items: [...s.items, dish] })),', '}));'];
            },
            selectorBlk: (c) => {
                if (c.selRead) { c.slot = 'after'; return ['// CartDrawer.tsx', 'const items = useCart((s) => s.items); // another component, another selector']; }
                c.selRead = true; c.slot = 'hooks'; c.v = 'count';
                return ['const count = useCart((s) => s.items.length);'];
            },
            persistBlk: (c) => { c.slot = 'top'; return ['// with persist:  create<CartStore>()(persist((set) => ({ … }), { name: \'bistro.cart\' }))']; }
        };
        Object.keys(GEN).forEach((type) => { S[type].gen = GEN[type]; });
        return S;
    }

    // ------------------------------------------------------------
    // LECTURES (the groups in the Levels menu)
    // ------------------------------------------------------------
    const lectures = [
        { id: 'components',   short: ['Components', 'კომპონენტები'], title: ['Components, JSX, props', 'კომპონენტები, JSX, props'] },
        { id: 'state',        short: ['State', 'State'], title: ['State and events', 'State და ივენთები'] },
        { id: 'effects',      short: ['Effects', 'ეფექტები'], title: ['Effects and data from the API', 'ეფექტები და მონაცემი API-დან'] },
        { id: 'routing',      short: ['Routing', 'როუტინგი'], title: ['Routing and login', 'როუტინგი და ავტორიზაცია'] },
        { id: 'architecture', short: ['Architecture', 'არქიტექტურა'], title: ['Architecture and custom hooks', 'არქიტექტურა და საკუთარი ჰუკები'] },
        { id: 'context',      short: ['Context', 'Context'], title: ['Context and reducer', 'Context და reducer'] },
        { id: 'store',        short: ['Store', 'Store'], title: ['Zustand store', 'Zustand store'] }
    ];

    // ------------------------------------------------------------
    // TASKS
    // id        the name used in links: react-lab/index.html#effects-1
    // lec       one of the lecture ids above
    // expected  the chain of block types, in order            (a linear task)
    // expectedGraph { nodes, edges }                           (a schema with branches)
    // preset    a chain placed on the canvas when the task opens (a "find the bug" task)
    // ctx       values copied into the run context (for example urlPath)
    // banner    the sentence shown above the result
    // ------------------------------------------------------------
    const levels = [
        // ===== Components =====
        {
            id: 'components-1', lec: 'components',
            title: ['From a file to the screen', 'ფაილიდან ეკრანამდე'],
            mission: ['Le Bistro has its menu in a data file. Hand it to a component as props and draw one card per dish.',
                      'Le Bistro-ს მენიუ მონაცემთა ფაილშია. გადაეცი ის კომპონენტს props-ით და დახატე თითო ბარათი თითო კერძზე.'],
            hint: ['Array of dishes → Props → Component → List: .map() + key → React updates the DOM → Browser screen.',
                   'კერძების მასივი → Props → კომპონენტი → სია: .map() + key → React აახლებს DOM-ს → ბრაუზერის ეკრანი.'],
            expected: ['dataArray', 'props', 'component', 'jsxList', 'reactRender', 'browser'],
            banner: ['One render: data → props → JSX → DOM.', 'ერთი რენდერი: მონაცემი → props → JSX → DOM.']
        },
        {
            id: 'components-2', lec: 'components',
            title: ['Only what the kitchen has', 'მხოლოდ ის, რაც სამზარეულოშია'],
            mission: ['One dish is off the menu today. The parent decides what the list receives: filter first, then pass the result down.',
                      'ერთი კერძი დღეს მენიუში არ არის. მშობელი წყვეტს, რას მიიღებს სია: ჯერ გაფილტრე, მერე გადაეცი შედეგი.'],
            hint: ['Put .filter() between the array and the props. The component does not change at all.',
                   'ჩასვი .filter() მასივსა და props-ს შორის. კომპონენტი საერთოდ არ იცვლება.'],
            expected: ['dataArray', 'filterOp', 'props', 'component', 'jsxList', 'reactRender', 'browser'],
            banner: ['The component is the same; it received different props.', 'კომპონენტი იგივეა; მან სხვა props მიიღო.']
        },
        {
            id: 'components-3', lec: 'components',
            title: ['A card is a component too', 'ბარათიც კომპონენტია'],
            mission: ['The list should not know how a card looks. Let the list map over the dishes and let a child component draw each one.',
                      'სიამ არ უნდა იცოდეს, როგორ გამოიყურება ბარათი. სიამ გაიაროს კერძები, ხოლო თითო მათგანი შვილმა კომპონენტმა დახატოს.'],
            hint: ['Array of dishes → Props → Component → List → Child: DishCard → React updates the DOM → Browser screen.',
                   'კერძების მასივი → Props → კომპონენტი → სია → შვილი: DishCard → React აახლებს DOM-ს → ბრაუზერის ეკრანი.'],
            expected: ['dataArray', 'props', 'component', 'jsxList', 'childComp', 'reactRender', 'browser'],
            banner: ['One DishCard function, called once per dish.', 'ერთი DishCard ფუნქცია, გამოძახებული თითო კერძზე.']
        },
        {
            id: 'components-4', lec: 'components',
            title: ['One file, two readers', 'ერთი ფაილი, ორი მკითხველი'],
            mission: ['Schema. The same data feeds two components: the menu list, and a header that shows how many dishes there are and what they cost together. The header gets a calculated value, not a second copy of the data.',
                      'სქემა. ერთი და იგივე მონაცემი ორ კომპონენტს კვებავს: მენიუს სიას და header-ს, რომელიც აჩვენებს კერძების რაოდენობას და ჯამს. Header იღებს გამოთვლილ მნიშვნელობას და არა მონაცემის მეორე ასლს.'],
            hint: ['Array → Props → Component → List → React. And: Array → Derived value → Props → Component → React. Then React → Browser.',
                   'მასივი → Props → კომპონენტი → სია → React. და: მასივი → გამოთვლილი მნიშვნელობა → Props → კომპონენტი → React. ბოლოს React → ბრაუზერი.'],
            expectedGraph: {
                nodes: ['dataArray', 'props', 'props', 'derived', 'component', 'component', 'jsxList', 'reactRender', 'browser'],
                edges: [['dataArray', 'props'], ['dataArray', 'derived'], ['derived', 'props'], ['props', 'component'], ['props', 'component'],
                        ['component', 'jsxList'], ['jsxList', 'reactRender'], ['component', 'reactRender'], ['reactRender', 'browser']]
            },
            banner: ['One source of truth, two components that read it.', 'სიმართლის ერთი წყარო, ორი კომპონენტი, რომელიც მას კითხულობს.']
        },

        // ===== State =====
        {
            id: 'state-1', lec: 'state',
            title: ['A click changes the screen', 'დაწკაპუნება ცვლის ეკრანს'],
            mission: ['The cart starts empty. A guest clicks "Add". Show the order React works in: state, the event, the new value, the second render, the DOM.',
                      'კალათა ცარიელია. სტუმარი აჭერს „დამატებას“. აჩვენე React-ის მუშაობის რიგი: state, ივენთი, ახალი მნიშვნელობა, მეორე რენდერი, DOM.'],
            hint: ['useState → Event handler → setState → Component → List → React updates the DOM → Browser screen.',
                   'useState → ივენთის handler → setState → კომპონენტი → სია → React აახლებს DOM-ს → ბრაუზერის ეკრანი.'],
            expected: ['useStateBlk', 'onClick', 'setStateBlk', 'component', 'jsxList', 'reactRender', 'browser'],
            banner: ['The click did not touch the page. It changed state, and React drew again.', 'დაწკაპუნება გვერდს არ შეხებია. მან state შეცვალა და React-მა ხელახლა დახატა.']
        },
        {
            id: 'state-2', lec: 'state', fix: true,
            title: ['The cart that does not update', 'კალათა, რომელიც არ ახლდება'],
            mission: ['A classmate wrote this flow. The dish is added and the screen does not change. Run it, read the red line, and replace one block.',
                      'ეს ნაკადი ჯგუფელმა დაწერა. კერძი ემატება, მაგრამ ეკრანი არ იცვლება. გაუშვი, წაიკითხე წითელი ხაზი და შეცვალე ერთი ბლოკი.'],
            hint: ['.push() changes the same array. Use the spread block instead: [...items, newItem] makes a new one.',
                   '.push() იმავე მასივს ცვლის. გამოიყენე spread ბლოკი: [...items, newItem] ახალ მასივს ქმნის.'],
            preset: ['dataArray', 'useStateBlk', 'mutateBlk', 'setStateBlk', 'component', 'jsxList', 'reactRender', 'browser'],
            expected: ['dataArray', 'useStateBlk', 'spreadOp', 'setStateBlk', 'component', 'jsxList', 'reactRender', 'browser'],
            banner: ['A new array is a new reference. React saw the change and rendered.', 'ახალი მასივი ახალი მისამართია. React-მა ცვლილება დაინახა და დახატა.']
        },
        {
            id: 'state-3', lec: 'state',
            title: ['Calculate it, do not store it', 'გამოთვალე, არ შეინახო'],
            mission: ['The page shows the dishes a guest can order and their total price. Use one useState only: everything else is calculated during render.',
                      'გვერდი აჩვენებს კერძებს, რომელთა შეკვეთაც შეიძლება, და მათ ჯამურ ფასს. გამოიყენე მხოლოდ ერთი useState: დანარჩენი რენდერის დროს გამოითვლება.'],
            hint: ['Array of dishes → useState → .filter() → Derived value → Component → List → React updates the DOM → Browser screen.',
                   'კერძების მასივი → useState → .filter() → გამოთვლილი მნიშვნელობა → კომპონენტი → სია → React აახლებს DOM-ს → ბრაუზერის ეკრანი.'],
            expected: ['dataArray', 'useStateBlk', 'filterOp', 'derived', 'component', 'jsxList', 'reactRender', 'browser'],
            banner: ['One piece of state. The filter and the total can never disagree with it.', 'State-ის ერთი ნაწილი. ფილტრი და ჯამი მას ვერასდროს დაშორდება.']
        },
        {
            id: 'state-4', lec: 'state',
            title: ['Two children, one truth', 'ორი შვილი, ერთი სიმართლე'],
            mission: ['Schema. The category chips and the dish grid are siblings, and both need the cart. Put the state in their parent. A click in one child travels up as a function call and comes back down as props for both.',
                      'სქემა. კატეგორიის ღილაკები და კერძების ბადე ძმები არიან და ორივეს კალათა სჭირდება. State მოათავსე მათ მშობელში. ერთ შვილში დაწკაპუნება ზემოთ ფუნქციის გამოძახებად მიდის და ორივესთვის props-ად ბრუნდება.'],
            hint: ['useState → Lift state up → Props (twice) → Component (twice) → React → Browser. And the way up: Event handler → Callback prop → setState → Lift state up.',
                   'useState → State-ის აწევა → Props (ორჯერ) → კომპონენტი (ორჯერ) → React → ბრაუზერი. ზემოთ: ივენთის handler → Callback prop → setState → State-ის აწევა.'],
            expectedGraph: {
                nodes: ['useStateBlk', 'liftState', 'props', 'props', 'component', 'component', 'onClick', 'callbackProp', 'setStateBlk', 'reactRender', 'browser'],
                edges: [['useStateBlk', 'liftState'], ['liftState', 'props'], ['liftState', 'props'], ['props', 'component'], ['props', 'component'],
                        ['component', 'reactRender'], ['component', 'reactRender'], ['reactRender', 'browser'],
                        ['onClick', 'callbackProp'], ['callbackProp', 'setStateBlk'], ['setStateBlk', 'liftState']]
            },
            banner: ['Data goes down as props. Requests for a change go up as function calls.', 'მონაცემი ქვემოთ props-ით მიდის. ცვლილების მოთხოვნა ზემოთ ფუნქციის გამოძახებით.']
        },

        // ===== Effects =====
        {
            id: 'effects-1', lec: 'effects',
            title: ['Where does the fetch go?', 'სად უნდა იყოს fetch?'],
            mission: ['The menu now comes from the API. React draws first and the answer comes later. Build the whole trip: the first render with no data, the effect, the request, the answer in state, the second render.',
                      'მენიუ ახლა API-დან მოდის. React ჯერ ხატავს, პასუხი მერე მოდის. ააწყე მთელი გზა: პირველი რენდერი მონაცემის გარეშე, ეფექტი, მოთხოვნა, პასუხი state-ში, მეორე რენდერი.'],
            hint: ['Component → useState → useEffect → Dependency array → API endpoint → fetch() → res.json() → setState → List → React updates the DOM → Browser screen.',
                   'კომპონენტი → useState → useEffect → დამოკიდებულებების მასივი → API მისამართი → fetch() → res.json() → setState → სია → React აახლებს DOM-ს → ბრაუზერის ეკრანი.'],
            expected: ['component', 'useStateBlk', 'useEffectBlk', 'depsArray', 'apiEndpoint', 'fetchCall', 'jsonParse', 'setStateBlk', 'jsxList', 'reactRender', 'browser'],
            banner: ['Two renders: one without the data, one with it.', 'ორი რენდერი: ერთი მონაცემის გარეშე, მეორე მონაცემით.']
        },
        {
            id: 'effects-2', lec: 'effects', fix: true,
            title: ['Hundreds of requests', 'ასობით მოთხოვნა'],
            mission: ['The Network tab fills with requests and the laptop fan starts. Run this flow, read the red line, and add the one block that stops the loop.',
                      'Network ჩანართი მოთხოვნებით ივსება და ლეპტოპის ვენტილატორი ირთვება. გაუშვი ნაკადი, წაიკითხე წითელი ხაზი და დაამატე ერთი ბლოკი, რომელიც ციკლს აჩერებს.'],
            hint: ['An effect without a dependency array runs after every render. Put a Dependency array right after useEffect.',
                   'ეფექტი დამოკიდებულებების მასივის გარეშე ყოველი რენდერის შემდეგ ეშვება. useEffect-ის შემდეგ ჩასვი დამოკიდებულებების მასივი.'],
            preset: ['component', 'useStateBlk', 'useEffectBlk', 'apiEndpoint', 'fetchCall', 'jsonParse', 'setStateBlk', 'jsxList', 'reactRender', 'browser'],
            expected: ['component', 'useStateBlk', 'useEffectBlk', 'depsArray', 'apiEndpoint', 'fetchCall', 'jsonParse', 'setStateBlk', 'jsxList', 'reactRender', 'browser'],
            banner: ['One request. The effect ran once.', 'ერთი მოთხოვნა. ეფექტი ერთხელ გაეშვა.']
        },
        {
            id: 'effects-3', lec: 'effects',
            title: ['Every request has more than one ending', 'ყოველ მოთხოვნას ერთზე მეტი დასასრული აქვს'],
            mission: ['On a slow network the guest looks at an empty page for three seconds. Before the list is drawn, decide what the screen shows while there is no data, when the request fails and when the answer is empty.',
                      'ნელ ქსელზე სტუმარი სამი წამი ცარიელ გვერდს უყურებს. სიის დახატვამდე გადაწყვიტე, რას აჩვენებს ეკრანი, სანამ მონაცემი არ არის, როცა მოთხოვნა ჩავარდა და როცა პასუხი ცარიელია.'],
            hint: ['The same flow as task 1, with "Loading / error / empty" between setState and the list.',
                   'იგივე ნაკადი, რაც პირველ დავალებაში, ოღონდ setState-სა და სიას შორის ჩასვი "Loading / error / empty".'],
            expected: ['component', 'useStateBlk', 'useEffectBlk', 'depsArray', 'apiEndpoint', 'fetchCall', 'jsonParse', 'setStateBlk', 'jsxCond', 'jsxList', 'reactRender', 'browser'],
            banner: ['Loading, error, empty, data: four screens designed, not one.', 'Loading, error, empty, data: ოთხი ეკრანი და არა ერთი.']
        },
        {
            id: 'effects-4', lec: 'effects',
            title: ['Call back the old request', 'გააუქმე ძველი მოთხოვნა'],
            mission: ['The guest clicks "Main courses" (3 seconds) and then "Drinks" (0.2 seconds). The drinks appear, then the main courses overwrite them. Give the effect a way to cancel the request it started.',
                      'სტუმარი აჭერს „ძირითად კერძებს“ (3 წამი), მერე „სასმელებს“ (0.2 წამი). სასმელები ჩნდება, მერე ძირითადი კერძები მათ ფარავს. მიეცი ეფექტს საშუალება, გააუქმოს მის მიერ დაწყებული მოთხოვნა.'],
            hint: ['Add an AbortController before the endpoint, and a Cleanup after setState.',
                   'მისამართამდე დაამატე AbortController, ხოლო setState-ის შემდეგ Cleanup.'],
            expected: ['component', 'useStateBlk', 'useEffectBlk', 'depsArray', 'abortCtl', 'apiEndpoint', 'fetchCall', 'jsonParse', 'setStateBlk', 'cleanup', 'jsxList', 'reactRender', 'browser'],
            banner: ['The slow old answer is aborted. Only the newest request may change the screen.', 'ნელი ძველი პასუხი გაუქმებულია. ეკრანს მხოლოდ უახლესი მოთხოვნა ცვლის.']
        },

        // ===== Routing =====
        {
            id: 'routing-1', lec: 'routing',
            title: ['From an address to a page', 'მისამართიდან გვერდამდე'],
            mission: ['A guest opens a link to a dish. Show what happens before a single card is drawn: the address, the route that fits, the frame that stays, and the page inside it.',
                      'სტუმარი ხსნის კერძის ბმულს. აჩვენე, რა ხდება ბარათის დახატვამდე: მისამართი, შესაბამისი როუტი, ჩარჩო, რომელიც რჩება, და გვერდი მის შიგნით.'],
            hint: ['Address bar → Route table → Layout + <Outlet /> → Page → React updates the DOM → Browser screen.',
                   'მისამართის ზოლი → როუტების ცხრილი → Layout + <Outlet /> → გვერდი → React აახლებს DOM-ს → ბრაუზერის ეკრანი.'],
            expected: ['urlBlk', 'routeTable', 'layoutOutlet', 'pageComp', 'reactRender', 'browser'],
            banner: ['The router read the address and chose the page. Nothing was reloaded.', 'როუტერმა მისამართი წაიკითხა და გვერდი აირჩია. არაფერი გადატვირთულა.']
        },
        {
            id: 'routing-2', lec: 'routing', fix: true,
            title: ['"This dish isn\'t on the menu"', '„ეს კერძი მენიუში არ არის“'],
            mission: ['The address is /menu/3 and dish 3 exists, yet the page says "not found". Run the flow, read the red line, and add the missing block.',
                      'მისამართია /menu/3 და მე-3 კერძი არსებობს, მაგრამ გვერდი ამბობს „ვერ მოიძებნა“. გაუშვი ნაკადი, წაიკითხე წითელი ხაზი და დაამატე აკლებული ბლოკი.'],
            hint: ['useParams() returns a string. Put Number(id) between useParams() and Find by id.',
                   'useParams() სტრიქონს აბრუნებს. useParams()-სა და „იპოვე id-ით“ შორის ჩასვი Number(id).'],
            preset: ['urlBlk', 'routeTable', 'routeParam', 'findById', 'pageComp', 'reactRender', 'browser'],
            expected: ['urlBlk', 'routeTable', 'routeParam', 'toNumber', 'findById', 'pageComp', 'reactRender', 'browser'],
            banner: ['3 === 3. The page found its dish.', '3 === 3. გვერდმა თავისი კერძი იპოვა.']
        },
        {
            id: 'routing-3', lec: 'routing',
            title: ['A filter you can send to a friend', 'ფილტრი, რომელსაც მეგობარს გაუგზავნი'],
            mission: ['The selected category lives in the address (?category=desserts), not in useState. Read it from the address and let it decide which request the effect sends.',
                      'არჩეული კატეგორია ცხოვრობს მისამართში (?category=desserts) და არა useState-ში. წაიკითხე ის მისამართიდან და მან გადაწყვიტოს, რომელ მოთხოვნას გაგზავნის ეფექტი.'],
            hint: ['Address bar → Route table → useSearchParams() → useState → useEffect → Dependency array → API endpoint → fetch() → res.json() → setState → List → React updates the DOM → Browser screen.',
                   'მისამართის ზოლი → როუტების ცხრილი → useSearchParams() → useState → useEffect → დამოკიდებულებების მასივი → API მისამართი → fetch() → res.json() → setState → სია → React აახლებს DOM-ს → ბრაუზერის ეკრანი.'],
            expected: ['urlBlk', 'routeTable', 'searchParamsBlk', 'useStateBlk', 'useEffectBlk', 'depsArray', 'apiEndpoint', 'fetchCall', 'jsonParse', 'setStateBlk', 'jsxList', 'reactRender', 'browser'],
            ctx: { urlPath: '/menu' },
            banner: ['Only the desserts were requested. F5 and a shared link give the same page.', 'მოთხოვნილია მხოლოდ დესერტები. F5 და გაზიარებული ბმული იმავე გვერდს იძლევა.']
        },
        {
            id: 'routing-4', lec: 'routing',
            title: ['The doorman works twice', 'მცველი ორჯერ მუშაობს'],
            mission: ['A guest types /kitchen. There is no session, so the guard sends them to the login. After the login the guest returns to the page they wanted, and the same guard lets them in.',
                      'სტუმარი კრეფს /kitchen. სესია არ არის, ამიტომ მცველი მას login-ზე აგზავნის. Login-ის შემდეგ სტუმარი ბრუნდება სასურველ გვერდზე და იგივე მცველი მას უშვებს.'],
            hint: ['Address bar → Route table → RequireAuth guard → POST /auth/login → RequireAuth guard → Page → React updates the DOM → Browser screen.',
                   'მისამართის ზოლი → როუტების ცხრილი → RequireAuth მცველი → POST /auth/login → RequireAuth მცველი → გვერდი → React აახლებს DOM-ს → ბრაუზერის ეკრანი.'],
            expected: ['urlBlk', 'routeTable', 'guard', 'loginPost', 'guard', 'pageComp', 'reactRender', 'browser'],
            ctx: { urlPath: '/kitchen', urlSearch: '' },
            banner: ['The guard is a sign on the door. The server checks the token again: that is the lock.', 'მცველი მხოლოდ ნიშანია კარზე. სერვერი token-ს ხელახლა ამოწმებს: საკეტი ის არის.']
        },

        // ===== Architecture =====
        {
            id: 'architecture-1', lec: 'architecture',
            title: ['The road of one request', 'ერთი მოთხოვნის გზა'],
            mission: ['Draw the layers of our app for one request, from the page to the server and back. Each block is one file with one job. A page never calls fetch itself.',
                      'დახატე ჩვენი აპის შრეები ერთი მოთხოვნისთვის, გვერდიდან სერვერამდე და უკან. თითო ბლოკი ერთი ფაილია ერთი საქმით. გვერდი fetch-ს თვითონ არასდროს იძახებს.'],
            hint: ['Page → Custom hook: useApi → lib/api.ts → fetch() → Vite proxy → API server → res.json() → setState → Loading / error / empty → List → React updates the DOM → Browser screen.',
                   'გვერდი → საკუთარი ჰუკი: useApi → lib/api.ts → fetch() → Vite proxy → API სერვერი → res.json() → setState → Loading / error / empty → სია → React აახლებს DOM-ს → ბრაუზერის ეკრანი.'],
            expected: ['pageComp', 'customHook', 'apiHelper', 'fetchCall', 'proxyBlk', 'serverBlk', 'jsonParse', 'setStateBlk', 'jsxCond', 'jsxList', 'reactRender', 'browser'],
            banner: ['Page → hook → lib → network. Each layer knows only the one below it.', 'გვერდი → ჰუკი → lib → ქსელი. ყოველმა შრემ მხოლოდ მის ქვემოთ მდებარე იცის.']
        },
        {
            id: 'architecture-2', lec: 'architecture',
            title: ['One menu, three deliveries', 'ერთი მენიუ, სამი მიწოდება'],
            mission: ['Schema of a problem. The home page, the menu page and the dish page each call useApi for the same menu. Draw it as it is, run it, and count the requests in the trace.',
                      'პრობლემის სქემა. მთავარი გვერდი, მენიუს გვერდი და კერძის გვერდი სამივე იძახებს useApi-ს ერთსა და იმავე მენიუზე. დახატე ისე, როგორც არის, გაუშვი და დათვალე მოთხოვნები.'],
            hint: ['Three Page blocks, each connected to its own Custom hook block. All three hooks go into one lib/api.ts → fetch() → API server.',
                   'სამი „გვერდი“ ბლოკი, თითო თავის „საკუთარ ჰუკთან“ დაკავშირებული. სამივე ჰუკი მიდის ერთ lib/api.ts-ში → fetch() → API სერვერი.'],
            expectedGraph: {
                nodes: ['pageComp', 'pageComp', 'pageComp', 'customHook', 'customHook', 'customHook', 'apiHelper', 'fetchCall', 'serverBlk'],
                edges: [['pageComp', 'customHook'], ['pageComp', 'customHook'], ['pageComp', 'customHook'],
                        ['customHook', 'apiHelper'], ['customHook', 'apiHelper'], ['customHook', 'apiHelper'],
                        ['apiHelper', 'fetchCall'], ['fetchCall', 'serverBlk']]
            },
            banner: ['Three callers, three requests. A hook shares logic, not data.', 'სამი გამომძახებელი, სამი მოთხოვნა. ჰუკი აზიარებს ლოგიკას, არა მონაცემს.']
        },
        {
            id: 'architecture-3', lec: 'architecture',
            title: ['A cart that survives F5', 'კალათა, რომელიც F5-ს უძლებს'],
            mission: ['The guest adds a dish, presses F5 and the cart is empty. Start the cart from a hook that reads its first value from localStorage and writes every change back.',
                      'სტუმარი კერძს ამატებს, აჭერს F5-ს და კალათა ცარიელია. დაიწყე კალათა ჰუკით, რომელიც პირველ მნიშვნელობას localStorage-დან კითხულობს და ყოველ ცვლილებას უკან წერს.'],
            hint: ['useLocalStorage → Event handler → setState → Component → List → React updates the DOM → Browser screen.',
                   'useLocalStorage → ივენთის handler → setState → კომპონენტი → სია → React აახლებს DOM-ს → ბრაუზერის ეკრანი.'],
            expected: ['useLocalStorageBlk', 'onClick', 'setStateBlk', 'component', 'jsxList', 'reactRender', 'browser'],
            banner: ['Two dishes came from the last visit, one from the click. All three are saved.', 'ორი კერძი წინა ვიზიტიდანაა, ერთი დაწკაპუნებიდან. სამივე შენახულია.']
        },
        {
            id: 'architecture-4', lec: 'architecture',
            title: ['A search that waits', 'ძებნა, რომელიც იცდის'],
            mission: ['Every letter the guest types sends a request, and the API answers 429 after ten a minute. Send one request when the typing stops, and cancel a request that is no longer wanted.',
                      'სტუმრის ყოველი აკრეფილი ასო მოთხოვნას აგზავნის, API კი წუთში ათის შემდეგ 429-ს პასუხობს. გაგზავნე ერთი მოთხოვნა, როცა აკრეფა შეწყდება, და გააუქმე მოთხოვნა, რომელიც აღარ არის საჭირო.'],
            hint: ['Controlled input → useDebounce → useState → useEffect → Dependency array → AbortController → API endpoint → fetch() → res.json() → setState → Cleanup → List → React updates the DOM → Browser screen.',
                   'კონტროლირებადი input → useDebounce → useState → useEffect → დამოკიდებულებების მასივი → AbortController → API მისამართი → fetch() → res.json() → setState → Cleanup → სია → React აახლებს DOM-ს → ბრაუზერის ეკრანი.'],
            expected: ['controlledInput', 'useDebounceBlk', 'useStateBlk', 'useEffectBlk', 'depsArray', 'abortCtl', 'apiEndpoint', 'fetchCall', 'jsonParse', 'setStateBlk', 'cleanup', 'jsxList', 'reactRender', 'browser'],
            banner: ['Three letters, one request, one result.', 'სამი ასო, ერთი მოთხოვნა, ერთი შედეგი.']
        },
        {
            id: 'architecture-5', lec: 'architecture',
            title: ['Draw the whole app', 'დახატე მთელი აპი'],
            mission: ['Schema. Put our whole app on one canvas: the address chooses a page inside the layout; the page gets its data through a hook, lib/api.ts, the proxy and the server; the list draws cards; and each card also reads the cart, which comes from a provider around everything.',
                      'სქემა. მოათავსე მთელი აპი ერთ არეზე: მისამართი ირჩევს გვერდს layout-ის შიგნით; გვერდი მონაცემს იღებს ჰუკით, lib/api.ts-ით, proxy-ით და სერვერით; სია ხატავს ბარათებს; და თითო ბარათი კითხულობს კალათასაც, რომელიც ყველაფრის გარშემო მდგარი provider-იდან მოდის.'],
            hint: ['Address bar → Route table → Layout → Page → Custom hook → lib/api.ts → fetch() → Vite proxy → API server → res.json() → List → Child: DishCard → React → Browser. Separately: Provider → useContext → Child: DishCard.',
                   'მისამართის ზოლი → როუტების ცხრილი → Layout → გვერდი → საკუთარი ჰუკი → lib/api.ts → fetch() → Vite proxy → API სერვერი → res.json() → სია → შვილი: DishCard → React → ბრაუზერი. ცალკე: Provider → useContext → შვილი: DishCard.'],
            expectedGraph: {
                nodes: ['urlBlk', 'routeTable', 'layoutOutlet', 'pageComp', 'customHook', 'apiHelper', 'fetchCall', 'proxyBlk', 'serverBlk', 'jsonParse',
                        'jsxList', 'childComp', 'providerBlk', 'useCtxBlk', 'reactRender', 'browser'],
                edges: [['urlBlk', 'routeTable'], ['routeTable', 'layoutOutlet'], ['layoutOutlet', 'pageComp'], ['pageComp', 'customHook'],
                        ['customHook', 'apiHelper'], ['apiHelper', 'fetchCall'], ['fetchCall', 'proxyBlk'], ['proxyBlk', 'serverBlk'],
                        ['serverBlk', 'jsonParse'], ['jsonParse', 'jsxList'], ['jsxList', 'childComp'],
                        ['providerBlk', 'useCtxBlk'], ['useCtxBlk', 'childComp'], ['childComp', 'reactRender'], ['reactRender', 'browser']]
            },
            ctx: { urlPath: '/menu', urlSearch: '' },
            banner: ['Two roads meet in the card: server data from the page, client state from the provider.', 'ბარათში ორი გზა ხვდება: სერვერის მონაცემი გვერდიდან და კლიენტის state provider-იდან.']
        },

        // ===== Context =====
        {
            id: 'context-1', lec: 'context', fix: true,
            title: ['"must be used inside"', '„must be used inside“'],
            mission: ['The header wants to show the cart count and the whole page is white. Run the flow, read the red line, and add the missing block in the right place.',
                      'Header-ს სურს კალათის რაოდენობის ჩვენება და მთელი გვერდი თეთრია. გაუშვი ნაკადი, წაიკითხე წითელი ხაზი და სწორ ადგილას დაამატე აკლებული ბლოკი.'],
            hint: ['A context is empty until a Provider puts a value on it. Put the Provider between useState and useContext.',
                   'Context ცარიელია, სანამ Provider მასზე მნიშვნელობას არ დადებს. Provider ჩასვი useState-სა და useContext-ს შორის.'],
            preset: ['createCtx', 'dataArray', 'useStateBlk', 'useCtxBlk', 'component', 'jsxList', 'reactRender', 'browser'],
            expected: ['createCtx', 'dataArray', 'useStateBlk', 'providerBlk', 'useCtxBlk', 'component', 'jsxList', 'reactRender', 'browser'],
            banner: ['createContext, a Provider with a value, useContext: three parts, always.', 'createContext, Provider მნიშვნელობით, useContext: ყოველთვის სამი ნაწილი.']
        },
        {
            id: 'context-2', lec: 'context',
            title: ['A ticket for the kitchen', 'ბილეთი სამზარეულოსთვის'],
            mission: ['The rules of the cart (no doubles, a maximum of ten) are spread over three components. Move them into one function: the component only says what happened, and the reducer decides what the cart becomes.',
                      'კალათის წესები (დუბლების გარეშე, მაქსიმუმ ათი) სამ კომპონენტშია გაბნეული. გადაიტანე ისინი ერთ ფუნქციაში: კომპონენტი მხოლოდ ამბობს, რა მოხდა, ხოლო reducer წყვეტს, რა გახდება კალათა.'],
            hint: ['Event handler → dispatch(action) → Reducer → Provider → useContext → Component → List → React updates the DOM → Browser screen.',
                   'ივენთის handler → dispatch(action) → Reducer → Provider → useContext → კომპონენტი → სია → React აახლებს DOM-ს → ბრაუზერის ეკრანი.'],
            expected: ['onClick', 'dispatchBlk', 'reducerBlk', 'providerBlk', 'useCtxBlk', 'component', 'jsxList', 'reactRender', 'browser'],
            banner: ['The component sent a ticket. One pure function changed the cart.', 'კომპონენტმა ბილეთი გაგზავნა. კალათა ერთმა სუფთა ფუნქციამ შეცვალა.']
        },
        {
            id: 'context-3', lec: 'context',
            title: ['One cart, three readers', 'ერთი კალათა, სამი მკითხველი'],
            mission: ['Schema. One click in a dish card changes the cart. The header badge, the card itself and the cart drawer all read it from the same provider. Draw it, run it, and count how many components render again after one click.',
                      'სქემა. კერძის ბარათზე ერთი დაწკაპუნება კალათას ცვლის. Header-ის ნიშანი, თვითონ ბარათი და კალათის პანელი სამივე მას ერთი provider-იდან კითხულობს. დახატე, გაუშვი და დათვალე, რამდენი კომპონენტი იხატება ხელახლა ერთი დაწკაპუნების შემდეგ.'],
            hint: ['Event handler → dispatch → Reducer → Provider. From the Provider: three useContext blocks, each into its own Component, all into React → Browser.',
                   'ივენთის handler → dispatch → Reducer → Provider. Provider-იდან: სამი useContext ბლოკი, თითო თავის კომპონენტში, ყველა React-ში → ბრაუზერი.'],
            expectedGraph: {
                nodes: ['onClick', 'dispatchBlk', 'reducerBlk', 'providerBlk', 'useCtxBlk', 'useCtxBlk', 'useCtxBlk', 'component', 'component', 'component', 'reactRender', 'browser'],
                edges: [['onClick', 'dispatchBlk'], ['dispatchBlk', 'reducerBlk'], ['reducerBlk', 'providerBlk'],
                        ['providerBlk', 'useCtxBlk'], ['providerBlk', 'useCtxBlk'], ['providerBlk', 'useCtxBlk'],
                        ['useCtxBlk', 'component'], ['useCtxBlk', 'component'], ['useCtxBlk', 'component'],
                        ['component', 'reactRender'], ['component', 'reactRender'], ['component', 'reactRender'], ['reactRender', 'browser']]
            },
            banner: ['Every reader of a context renders again when its value changes, whichever part it uses.', 'Context-ის ყოველი მკითხველი ხელახლა იხატება მისი მნიშვნელობის შეცვლისას, რომელ ნაწილსაც არ უნდა იყენებდეს.']
        },

        // ===== Store =====
        {
            id: 'store-1', lec: 'store',
            title: ['A store, not a provider', 'Store და არა provider'],
            mission: ['Move the cart out of the component tree. A click calls an action of the store, and the header reads one number from it through a selector.',
                      'გადაიტანე კალათა კომპონენტების ხიდან. დაწკაპუნება store-ის action-ს იძახებს, ხოლო header მისგან ერთ რიცხვს selector-ით კითხულობს.'],
            hint: ['Event handler → Store (create) → Selector → Component → React updates the DOM → Browser screen.',
                   'ივენთის handler → Store (create) → Selector → კომპონენტი → React აახლებს DOM-ს → ბრაუზერის ეკრანი.'],
            expected: ['onClick', 'storeBlk', 'selectorBlk', 'component', 'reactRender', 'browser'],
            banner: ['No provider anywhere. The header knows one number and nothing else.', 'Provider არსად არის. Header-მა იცის ერთი რიცხვი და მეტი არაფერი.']
        },
        {
            id: 'store-2', lec: 'store',
            title: ['Only who needs it renders', 'იხატება მხოლოდ ის, ვისაც სჭირდება'],
            mission: ['Schema. The header badge and the cart drawer read different parts of the same store, each with its own selector, and the store saves itself to localStorage.',
                      'სქემა. Header-ის ნიშანი და კალათის პანელი ერთი store-ის სხვადასხვა ნაწილს კითხულობენ, თითო საკუთარი selector-ით, ხოლო store თავის თავს localStorage-ში ინახავს.'],
            hint: ['Event handler → Store. From the store: persist, and two Selector blocks, each into its own Component, both into React → Browser.',
                   'ივენთის handler → Store. Store-იდან: persist და ორი Selector ბლოკი, თითო თავის კომპონენტში, ორივე React-ში → ბრაუზერი.'],
            expectedGraph: {
                nodes: ['onClick', 'storeBlk', 'persistBlk', 'selectorBlk', 'selectorBlk', 'component', 'component', 'reactRender', 'browser'],
                edges: [['onClick', 'storeBlk'], ['storeBlk', 'persistBlk'], ['storeBlk', 'selectorBlk'], ['storeBlk', 'selectorBlk'],
                        ['selectorBlk', 'component'], ['selectorBlk', 'component'], ['component', 'reactRender'], ['component', 'reactRender'], ['reactRender', 'browser']]
            },
            banner: ['Each component is subscribed to one picked value, not to the whole store.', 'ყოველი კომპონენტი გამოწერილია ერთ არჩეულ მნიშვნელობაზე და არა მთელ store-ზე.']
        }
    ];

    // ------------------------------------------------------------
    // REFERENCE SCHEMAS — ready-made flows for the lecturer's screen.
    // Linear ones are laid out by the engine (chain); the others have coordinates.
    // ------------------------------------------------------------
    const examples = [
        { id: 'x-render', diff: 1, title: ['One render', 'ერთი რენდერი'],
          desc: ['Data → props → JSX → DOM', 'მონაცემი → props → JSX → DOM'],
          chain: ['dataArray', 'props', 'component', 'jsxList', 'reactRender', 'browser'] },
        { id: 'x-click', diff: 2, title: ['A click, a new render', 'დაწკაპუნება, ახალი რენდერი'],
          desc: ['State → event → setState → render', 'State → ივენთი → setState → რენდერი'],
          chain: ['useStateBlk', 'onClick', 'setStateBlk', 'component', 'jsxList', 'reactRender', 'browser'] },
        { id: 'x-mutate', diff: 2, title: ['The mutation bug', 'მუტაციის შეცდომა'],
          desc: ['push + setState: run it and read the error', 'push + setState: გაუშვი და წაიკითხე შეცდომა'],
          chain: ['dataArray', 'useStateBlk', 'mutateBlk', 'setStateBlk', 'component', 'jsxList', 'reactRender', 'browser'] },
        { id: 'x-body', diff: 2, title: ['Fetch in the component body', 'fetch კომპონენტის ტანში'],
          desc: ['The endless loop, as an error message', 'უსასრულო ციკლი, შეცდომის შეტყობინებად'],
          chain: ['component', 'useStateBlk', 'apiEndpoint', 'fetchCall', 'jsonParse', 'setStateBlk', 'jsxList', 'reactRender', 'browser'] },
        { id: 'x-effect', diff: 3, title: ['Data from the API', 'მონაცემი API-დან'],
          desc: ['Render, effect, request, state, render', 'რენდერი, ეფექტი, მოთხოვნა, state, რენდერი'],
          chain: ['component', 'useStateBlk', 'useEffectBlk', 'depsArray', 'apiEndpoint', 'fetchCall', 'jsonParse', 'setStateBlk', 'jsxCond', 'jsxList', 'reactRender', 'browser'] },
        { id: 'x-abort', diff: 4, title: ['A request that can be cancelled', 'მოთხოვნა, რომლის გაუქმებაც შეიძლება'],
          desc: ['AbortController + cleanup', 'AbortController + cleanup'],
          chain: ['component', 'useStateBlk', 'useEffectBlk', 'depsArray', 'abortCtl', 'apiEndpoint', 'fetchCall', 'jsonParse', 'setStateBlk', 'cleanup', 'jsxList', 'reactRender', 'browser'] },
        { id: 'x-route', diff: 3, title: ['A page for one dish', 'ერთი კერძის გვერდი'],
          desc: ['Address → route → param → Number → find', 'მისამართი → როუტი → param → Number → find'],
          chain: ['urlBlk', 'routeTable', 'layoutOutlet', 'routeParam', 'toNumber', 'findById', 'pageComp', 'reactRender', 'browser'] },
        { id: 'x-layers', diff: 4, title: ['The layers of one request', 'ერთი მოთხოვნის შრეები'],
          desc: ['Page → hook → lib → proxy → server', 'გვერდი → ჰუკი → lib → proxy → სერვერი'],
          chain: ['pageComp', 'customHook', 'apiHelper', 'fetchCall', 'proxyBlk', 'serverBlk', 'jsonParse', 'setStateBlk', 'jsxCond', 'jsxList', 'reactRender', 'browser'] },
        { id: 'x-three', diff: 4, title: ['One menu, three requests', 'ერთი მენიუ, სამი მოთხოვნა'],
          desc: ['Three pages, three copies of the hook (a problem)', 'სამი გვერდი, ჰუკის სამი ასლი (პრობლემა)'],
          nodes: [{ type: 'pageComp', x: 100, y: 120 }, { type: 'pageComp', x: 100, y: 320 }, { type: 'pageComp', x: 100, y: 520 },
                  { type: 'customHook', x: 420, y: 120 }, { type: 'customHook', x: 420, y: 320 }, { type: 'customHook', x: 420, y: 520 },
                  { type: 'apiHelper', x: 760, y: 320 }, { type: 'fetchCall', x: 1060, y: 320 }, { type: 'serverBlk', x: 1360, y: 320 }],
          connections: [[0, 3], [1, 4], [2, 5], [3, 6], [4, 6], [5, 6], [6, 7], [7, 8]] },
        { id: 'x-search', diff: 5, title: ['A debounced search', 'ძებნა debounce-ით'],
          desc: ['Three letters, one request', 'სამი ასო, ერთი მოთხოვნა'],
          chain: ['controlledInput', 'useDebounceBlk', 'useStateBlk', 'useEffectBlk', 'depsArray', 'abortCtl', 'apiEndpoint', 'fetchCall', 'jsonParse', 'setStateBlk', 'cleanup', 'jsxList', 'reactRender', 'browser'] },
        { id: 'x-lift', diff: 3, title: ['Lifted state', 'აწეული state'],
          desc: ['Props down, a callback up', 'Props ქვემოთ, callback ზემოთ'],
          nodes: [{ type: 'useStateBlk', x: 100, y: 140 }, { type: 'liftState', x: 400, y: 140 }, { type: 'props', x: 700, y: 60 }, { type: 'props', x: 700, y: 240 },
                  { type: 'component', x: 1000, y: 60 }, { type: 'component', x: 1000, y: 240 }, { type: 'reactRender', x: 1300, y: 140 }, { type: 'browser', x: 1600, y: 140 },
                  { type: 'onClick', x: 100, y: 460 }, { type: 'callbackProp', x: 400, y: 460 }, { type: 'setStateBlk', x: 700, y: 460 }],
          connections: [[0, 1], [1, 2], [1, 3], [2, 4], [3, 5], [4, 6], [5, 6], [6, 7], [8, 9], [9, 10], [10, 1]] },
        { id: 'x-context', diff: 4, title: ['One cart, three readers', 'ერთი კალათა, სამი მკითხველი'],
          desc: ['dispatch → reducer → provider → useContext', 'dispatch → reducer → provider → useContext'],
          nodes: [{ type: 'onClick', x: 80, y: 320 }, { type: 'dispatchBlk', x: 340, y: 320 }, { type: 'reducerBlk', x: 600, y: 320 }, { type: 'providerBlk', x: 860, y: 320 },
                  { type: 'useCtxBlk', x: 1140, y: 120 }, { type: 'useCtxBlk', x: 1140, y: 320 }, { type: 'useCtxBlk', x: 1140, y: 520 },
                  { type: 'component', x: 1420, y: 120 }, { type: 'component', x: 1420, y: 320 }, { type: 'component', x: 1420, y: 520 },
                  { type: 'reactRender', x: 1720, y: 320 }, { type: 'browser', x: 2000, y: 320 }],
          connections: [[0, 1], [1, 2], [2, 3], [3, 4], [3, 5], [3, 6], [4, 7], [5, 8], [6, 9], [7, 10], [8, 10], [9, 10], [10, 11]] },
        { id: 'x-store', diff: 4, title: ['A store with selectors', 'Store selector-ებით'],
          desc: ['No provider; each reader picks one value', 'Provider-ის გარეშე; ყოველი მკითხველი ერთ მნიშვნელობას ირჩევს'],
          nodes: [{ type: 'onClick', x: 100, y: 300 }, { type: 'storeBlk', x: 400, y: 300 }, { type: 'persistBlk', x: 700, y: 520 },
                  { type: 'selectorBlk', x: 700, y: 120 }, { type: 'selectorBlk', x: 700, y: 300 },
                  { type: 'component', x: 1000, y: 120 }, { type: 'component', x: 1000, y: 300 }, { type: 'reactRender', x: 1300, y: 210 }, { type: 'browser', x: 1600, y: 210 }],
          connections: [[0, 1], [1, 2], [1, 3], [1, 4], [3, 5], [4, 6], [5, 7], [6, 7], [7, 8]] },
        { id: 'x-app', diff: 5, title: ['The whole app on one canvas', 'მთელი აპი ერთ არეზე'],
          desc: ['Router, layers, server data and the cart provider', 'როუტერი, შრეები, სერვერის მონაცემი და კალათის provider'],
          ctx: { urlPath: '/menu', urlSearch: '' },
          nodes: [{ type: 'urlBlk', x: 60, y: 100 }, { type: 'routeTable', x: 320, y: 100 }, { type: 'layoutOutlet', x: 580, y: 100 }, { type: 'pageComp', x: 840, y: 100 },
                  { type: 'customHook', x: 1100, y: 100 }, { type: 'apiHelper', x: 1360, y: 100 }, { type: 'fetchCall', x: 1620, y: 100 }, { type: 'proxyBlk', x: 1880, y: 100 },
                  { type: 'serverBlk', x: 2140, y: 100 }, { type: 'jsonParse', x: 580, y: 400 }, { type: 'jsxList', x: 840, y: 400 }, { type: 'childComp', x: 1360, y: 400 },
                  { type: 'providerBlk', x: 580, y: 660 }, { type: 'useCtxBlk', x: 840, y: 660 }, { type: 'reactRender', x: 1620, y: 400 }, { type: 'browser', x: 1880, y: 400 }],
          connections: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [10, 11], [12, 13], [13, 11], [11, 14], [14, 15]] },
        // ---------- Real products: the same React ideas inside food apps everyone has used ----------
        // preview: the address, title and banner of that product's page (the cards are the run's dishes)
        { id: 'rx-wolt', real: true, diff: 2, scenario: ['Wolt · restaurant page', 'Wolt · რესტორნის გვერდი'],
          title: ['Menu without sold-out dishes', 'მენიუ ამოწურული კერძების გარეშე'],
          desc: ['Filter, props down, one card component per dish', 'ფილტრი, props ქვემოთ, თითო ბარათი თითო კერძზე'],
          chain: ['dataArray', 'filterOp', 'props', 'component', 'jsxList', 'childComp', 'reactRender', 'browser'],
          preview: { url: 'https://food.local/tbilisi/restaurant/le-bistro', title: ['Le Bistro · open now', 'Le Bistro · ახლა ღიაა'],
                     banner: ['Only what the kitchen can cook today: the sold-out dish never reaches the page.', 'მხოლოდ ის, რისი მომზადებაც სამზარეულოს დღეს შეუძლია: ამოწურული კერძი გვერდამდე არ აღწევს.'] } },
        { id: 'rx-mcd', real: true, diff: 2, scenario: ["McDonald's kiosk · building an order", "McDonald's-ის კიოსკი · შეკვეთის აწყობა"],
          title: ['Add to order', 'შეკვეთაში დამატება'],
          desc: ['State → tap → setState → a new render', 'State → შეხება → setState → ახალი რენდერი'],
          chain: ['useStateBlk', 'onClick', 'setStateBlk', 'component', 'jsxList', 'reactRender', 'browser'],
          preview: { url: 'https://kiosk.local/order', title: ['Your order', 'შენი შეკვეთა'],
                     banner: ['One tap, one setState, one new render: the order list updates in place.', 'ერთი შეხება, ერთი setState, ერთი ახალი რენდერი: შეკვეთის სია ადგილზე ახლდება.'] } },
        { id: 'rx-ubereats', real: true, diff: 5, scenario: ['Uber Eats · searching for a dish', 'Uber Eats · კერძის ძებნა'],
          title: ['Search that waits for you', 'ძებნა, რომელიც გელოდება'],
          desc: ['Debounced value, one effect, a request that can be cancelled', 'debounce-იანი მნიშვნელობა, ერთი ეფექტი, გაუქმებადი მოთხოვნა'],
          chain: ['controlledInput', 'useDebounceBlk', 'useStateBlk', 'useEffectBlk', 'depsArray', 'abortCtl', 'apiEndpoint', 'fetchCall', 'jsonParse', 'setStateBlk', 'cleanup', 'jsxList', 'reactRender', 'browser'],
          preview: { url: 'https://eats.local/search?q=tart', title: ['Results for "tart"', 'შედეგები „tart“-ისთვის'],
                     banner: ['Four letters typed, one request sent: the earlier ones were cancelled.', 'აკრეფილია ოთხი ასო, გაიგზავნა ერთი მოთხოვნა: წინა მოთხოვნები გაუქმდა.'] } },
        { id: 'rx-glovo', real: true, diff: 4, scenario: ['Glovo · a cart that survives a refresh', 'Glovo · კალათა, რომელიც გადატვირთვას უძლებს'],
          title: ['Cart store with persist', 'კალათის store persist-ით'],
          desc: ['One store, two selectors, two readers, saved to localStorage', 'ერთი store, ორი სელექტორი, ორი მკითხველი, შენახული localStorage-ში'],
          nodes: [{ type: 'onClick', x: 80, y: 330 }, { type: 'storeBlk', x: 380, y: 330 }, { type: 'persistBlk', x: 680, y: 110 },
                  { type: 'selectorBlk', x: 680, y: 330 }, { type: 'selectorBlk', x: 680, y: 550 }, { type: 'component', x: 980, y: 330 },
                  { type: 'component', x: 980, y: 550 }, { type: 'reactRender', x: 1280, y: 440 }, { type: 'browser', x: 1580, y: 440 }],
          connections: [[0, 1], [1, 2], [1, 3], [1, 4], [3, 5], [4, 6], [5, 7], [6, 7], [7, 8]],
          preview: { url: 'https://glovo.local/store/le-bistro', title: ['Your cart is still here', 'კალათა ისევ აქ არის'],
                     banner: ['Two selectors, two components, and persist keeps the cart after F5.', 'ორი სელექტორი, ორი კომპონენტი, persist კი კალათას F5-ის შემდეგაც ინახავს.'] } },
        { id: 'rx-starbucks', real: true, diff: 4, scenario: ['Starbucks app · order ahead', 'Starbucks-ის აპი · წინასწარი შეკვეთა'],
          title: ['One order, three readers', 'ერთი შეკვეთა, სამი მკითხველი'],
          desc: ['dispatch → reducer → provider → useContext in three places', 'dispatch → reducer → provider → useContext სამ ადგილას'],
          nodes: [{ type: 'onClick', x: 60, y: 330 }, { type: 'dispatchBlk', x: 320, y: 330 }, { type: 'reducerBlk', x: 580, y: 330 },
                  { type: 'providerBlk', x: 840, y: 330 }, { type: 'useCtxBlk', x: 1100, y: 120 }, { type: 'useCtxBlk', x: 1100, y: 330 },
                  { type: 'useCtxBlk', x: 1100, y: 540 }, { type: 'component', x: 1360, y: 120 }, { type: 'component', x: 1360, y: 330 },
                  { type: 'component', x: 1360, y: 540 }, { type: 'reactRender', x: 1620, y: 330 }, { type: 'browser', x: 1880, y: 330 }],
          connections: [[0, 1], [1, 2], [2, 3], [3, 4], [3, 5], [3, 6], [4, 7], [5, 8], [6, 9], [7, 10], [8, 10], [9, 10], [10, 11]],
          preview: { url: 'https://coffee.local/order', title: ['Pick up in 5 min', 'აიღე 5 წუთში'],
                     banner: ['The header badge, the order sheet and the Pay button read one order.', 'ჰედერის ნიშნული, შეკვეთის ფურცელი და გადახდის ღილაკი ერთ შეკვეთას კითხულობენ.'] } },
        { id: 'rx-boltfood', real: true, diff: 3, scenario: ['Bolt Food · a link to one dish', 'Bolt Food · ბმული ერთ კერძზე'],
          title: ['Dish page from the link', 'კერძის გვერდი ბმულიდან'],
          desc: ['/menu/3 → param → Number → find → page', '/menu/3 → პარამეტრი → Number → find → გვერდი'],
          chain: ['urlBlk', 'routeTable', 'layoutOutlet', 'routeParam', 'toNumber', 'findById', 'pageComp', 'reactRender', 'browser'],
          preview: { url: 'https://food.local/le-bistro/menu/3', title: ['Le Bistro · one dish', 'Le Bistro · ერთი კერძი'],
                     banner: ['A friend sent this link: the page found the dish by the id in the address.', 'ეს ბმული მეგობარმა გამოგიგზავნა: გვერდმა კერძი მისამართში მოცემული id-ით იპოვა.'] } },
        { id: 'rx-thefork', real: true, diff: 3, scenario: ['TheFork · favourites', 'TheFork · რჩეულები'],
          title: ['Favourites that survive F5', 'რჩეულები, რომლებიც F5-ს უძლებს'],
          desc: ['useLocalStorage → tap the heart → setter → render', 'useLocalStorage → გულზე შეხება → setter → რენდერი'],
          chain: ['useLocalStorageBlk', 'onClick', 'setStateBlk', 'component', 'jsxList', 'reactRender', 'browser'],
          preview: { url: 'https://tables.local/favourites', title: ['Your favourite dishes', 'შენი საყვარელი კერძები'],
                     banner: ['Refresh the page: the hearts are still there, read back from localStorage.', 'გვერდი განაახლე: გულები ისევ ადგილზეა, localStorage-დან წაკითხული.'] } },
        { id: 'rx-dominos', real: true, diff: 4, scenario: ["Domino's · order tracker", "Domino's · შეკვეთის ტრეკერი"],
          title: ['Status that cleans up after itself', 'სტატუსი, რომელიც თავის თავს ასუფთავებს'],
          desc: ['Effect + AbortController + cleanup', 'ეფექტი + AbortController + cleanup'],
          chain: ['component', 'useStateBlk', 'useEffectBlk', 'depsArray', 'abortCtl', 'apiEndpoint', 'fetchCall', 'jsonParse', 'setStateBlk', 'cleanup', 'jsxList', 'reactRender', 'browser'],
          preview: { url: 'https://pizza.local/tracker/5521', title: ['Order #5521 · in the oven', 'შეკვეთა #5521 · ღუმელშია'],
                     banner: ['Leave the page and the cleanup cancels the request: no update for a page that is gone.', 'გვერდიდან წასვლისას cleanup მოთხოვნას აუქმებს: წასულ გვერდს განახლება აღარ ეგზავნება.'] } },
        { id: 'rx-opentable', real: true, diff: 4, scenario: ['OpenTable · the restaurant\'s dashboard', 'OpenTable · რესტორნის პანელი'],
          title: ['Staff page behind a login', 'პერსონალის გვერდი ავტორიზაციის მიღმა'],
          desc: ['Route → guard → login → guard → page', 'როუტი → guard → შესვლა → guard → გვერდი'],
          ctx: { urlPath: '/kitchen', urlSearch: '' },
          chain: ['urlBlk', 'routeTable', 'guard', 'loginPost', 'guard', 'pageComp', 'reactRender', 'browser'],
          preview: { url: 'https://tables.local/restaurant/le-bistro/kitchen', title: ['Tonight at Le Bistro', 'დღეს საღამოს Le Bistro-ში'],
                     banner: ['The guard sent you to sign in first, then let you through to the staff page.', 'guard-მა ჯერ შესასვლელად გაგგზავნა, მერე პერსონალის გვერდზე გაგატარა.'] } },
        { id: 'rx-hellofresh', real: true, diff: 3, scenario: ['HelloFresh · this week\'s menu', 'HelloFresh · ამ კვირის მენიუ'],
          title: ['Loading, error and empty states', 'ჩატვირთვა, შეცდომა და ცარიელი სია'],
          desc: ['Effect → fetch → state → the three states before the list', 'ეფექტი → fetch → state → სამი მდგომარეობა სიამდე'],
          chain: ['component', 'useStateBlk', 'useEffectBlk', 'depsArray', 'apiEndpoint', 'fetchCall', 'jsonParse', 'setStateBlk', 'jsxCond', 'jsxList', 'reactRender', 'browser'],
          preview: { url: 'https://mealkit.local/menu/this-week', title: ['This week\'s menu', 'ამ კვირის მენიუ'],
                     banner: ['A skeleton while it loads, a clear message if it fails, the list when it arrives.', 'ჩატვირთვისას skeleton, ჩავარდნისას გასაგები შეტყობინება, მოსვლისას — სია.'] } }
    ];

    // Trace lines for the engine blocks this lab re-labels
    // ------------------------------------------------------------
    // REAL-WORLD TASKS — a brief from a food app, an empty canvas and a live checklist.
    // rules: ['has', type] · ['not', type] · ['link', a, b] (a wire a → b) ·
    //        ['path', a, b] (data can travel from a to b) · ['out', type, n] (n wires leave it)
    // `example` is the reference schema the "Show solution" button reads.
    // ------------------------------------------------------------
    const tasks = [
        {
            id: 'wolt', example: 'rx-wolt', diff: 2,
            context: ["Wolt · restaurant page","Wolt · რესტორნის გვერდი"],
            title:   ["Menu without sold-out dishes","მენიუ ამოწურული კერძების გარეშე"],
            goal:    ["Show only the dishes the kitchen can cook today, one card component per dish.","აჩვენე მხოლოდ ის კერძები, რისი მომზადებაც სამზარეულოს დღეს შეუძლია, თითო ბარათის კომპონენტი თითო კერძზე."],
            story:   ["Le Bistro is on a delivery app. The crème brûlée sold out at lunch, and customers keep ordering it and getting a refund. Build the restaurant page so that a sold-out dish never reaches the screen. The list is drawn by a DishList component, and every dish is its own DishCard.","Le Bistro მიტანის აპზეა. კრემ-ბრიულე სადილზე ამოიწურა, მომხმარებლები კი მაინც უკვეთავენ და თანხა უბრუნდებათ. ააწყე რესტორნის გვერდი ისე, რომ ამოწურული კერძი ეკრანამდე ვერასდროს მივიდეს. სიას DishList კომპონენტი ხატავს, თითოეული კერძი კი ცალკე DishCard-ია."],
            hint:    ["Filter first, then hand the result down as props: data → .filter() → props → component → list → child card → render.","ჯერ გაფილტრე, მერე შედეგი props-ად გადაეცი: მონაცემი → .filter() → props → კომპონენტი → სია → შვილი ბარათი → რენდერი."],
            reqs: [
            { text: ["Start from the menu data", "დაიწყე მენიუს მონაცემიდან"], rules: [['has','dataArray']] },
            { text: ["Drop sold-out dishes with .filter() before the component gets them", "ამოწურული კერძები .filter()-ით ამოიღე, სანამ კომპონენტს მიაღწევს"], rules: [['path','dataArray','filterOp'],['path','filterOp','props']] },
            { text: ["Hand the menu to the component as props", "მენიუ კომპონენტს props-ად გადაეცი"], rules: [['link','props','component']] },
            { text: ["Draw the list with .map() and a key, one DishCard per dish", "დახატე სია .map()-ით და key-ით, თითო DishCard თითო კერძზე"], rules: [['path','component','jsxList'],['link','jsxList','childComp']] },
            { text: ["React renders it in the browser", "React მას ბრაუზერში ხატავს"], rules: [['path','childComp','reactRender'],['link','reactRender','browser']] }
            ]
        },
        {
            id: 'mcd', example: 'rx-mcd', diff: 2,
            context: ["McDonald's kiosk · building an order","McDonald's-ის კიოსკი · შეკვეთის აწყობა"],
            title:   ["Add to order","შეკვეთაში დამატება"],
            goal:    ["A tap on a dish adds it to the order and the order list updates on screen.","კერძზე შეხება მას შეკვეთაში ამატებს და შეკვეთის სია ეკრანზე ახლდება."],
            story:   ["The self-order kiosk shows the menu on the left and \"Your order\" on the right. When a customer taps a dish, it has to appear in the order immediately. A plain variable would change, but the screen would not: React only draws again after a setState.","თვითმომსახურების კიოსკი მარცხნივ მენიუს აჩვენებს, მარჯვნივ კი „შენს შეკვეთას“. როცა მომხმარებელი კერძს ეხება, ის შეკვეთაში მაშინვე უნდა გამოჩნდეს. ჩვეულებრივი ცვლადი შეიცვლება, ეკრანი კი არა: React თავიდან მხოლოდ setState-ის შემდეგ ხატავს."],
            hint:    ["useState holds the order; the tap handler calls setState with a NEW array; the component renders again.","useState ინახავს შეკვეთას; შეხების handler-ი setState-ს ახალი მასივით იძახებს; კომპონენტი თავიდან იხატება."],
            reqs: [
            { text: ["Keep the order in useState", "შეკვეთა useState-ში შეინახე"], rules: [['has','useStateBlk']] },
            { text: ["The tap handler calls setState", "შეხების handler-ი setState-ს იძახებს"], rules: [['path','onClick','setStateBlk']] },
            { text: ["The new state reaches the component", "ახალი state კომპონენტამდე აღწევს"], rules: [['path','useStateBlk','setStateBlk'],['path','setStateBlk','component']] },
            { text: ["The component draws the order list and React renders it", "კომპონენტი შეკვეთის სიას ხატავს და React მას არენდერებს"], rules: [['path','component','jsxList'],['path','jsxList','reactRender'],['link','reactRender','browser']] },
            { text: ["No .push() on the old array", "ძველ მასივზე .push() არ გამოიყენო"], rules: [['not','mutateBlk']] }
            ]
        },
        {
            id: 'ubereats', example: 'rx-ubereats', diff: 5,
            context: ["Uber Eats · searching for a dish","Uber Eats · კერძის ძებნა"],
            title:   ["Search that waits for you","ძებნა, რომელიც გელოდება"],
            goal:    ["Search the menu as the user types, with one request per pause and no stale answers.","მოძებნე მენიუში აკრეფისას, ერთი მოთხოვნით პაუზაზე და მოძველებული პასუხების გარეშე."],
            story:   ["Typing \"tart\" in the search box sends four requests today: t, ta, tar, tart. A slow answer for \"ta\" can even arrive last and overwrite the right results. Make the search wait until the user pauses, and cancel a request the moment a newer one starts.","საძიებო ველში „tart“-ის აკრეფა დღეს ოთხ მოთხოვნას აგზავნის: t, ta, tar, tart. „ta“-ს ნელი პასუხი შეიძლება ბოლოსაც მოვიდეს და სწორი შედეგები გადაწეროს. ძებნამ მომხმარებლის პაუზას უნდა დაელოდოს, ახალი მოთხოვნის დაწყებისას კი წინა მაშინვე გაუქმდეს."],
            hint:    ["controlled input → useDebounce → the effect depends on the debounced value; AbortController before fetch, cleanup aborts it.","controlled input → useDebounce → ეფექტი debounce-იან მნიშვნელობაზეა დამოკიდებული; AbortController fetch-მდე, cleanup მას აუქმებს."],
            reqs: [
            { text: ["The search box is a controlled input", "საძიებო ველი controlled input-ია"], rules: [['has','controlledInput']] },
            { text: ["A debounced value feeds the effect, not every letter", "ეფექტს debounce-იანი მნიშვნელობა კვებავს და არა ყოველი ასო"], rules: [['path','controlledInput','useDebounceBlk'],['path','useDebounceBlk','useEffectBlk']] },
            { text: ["The effect has a dependency array", "ეფექტს დამოკიდებულებების მასივი აქვს"], rules: [['link','useEffectBlk','depsArray']] },
            { text: ["An AbortController is created before the request", "AbortController მოთხოვნამდე იქმნება"], rules: [['path','abortCtl','fetchCall']] },
            { text: ["The results go into state, and the cleanup cancels the old request", "შედეგები state-ში მიდის, cleanup კი ძველ მოთხოვნას აუქმებს"], rules: [['path','jsonParse','setStateBlk'],['path','setStateBlk','cleanup']] },
            { text: ["The list is rendered in the browser", "სია ბრაუზერში იხატება"], rules: [['path','jsxList','reactRender'],['link','reactRender','browser']] }
            ]
        },
        {
            id: 'glovo', example: 'rx-glovo', diff: 4,
            context: ["Glovo · a cart that survives a refresh","Glovo · კალათა, რომელიც გადატვირთვას უძლებს"],
            title:   ["Cart store with persist","კალათის store persist-ით"],
            goal:    ["One Zustand store holds the cart; two components read it through selectors; the cart survives F5.","ერთი Zustand store ინახავს კალათას; ორი კომპონენტი მას სელექტორებით კითხულობს; კალათა F5-ს უძლებს."],
            story:   ["Customers fill the cart, refresh the page and lose everything. The cart also shows in two places: the badge in the header and the cart drawer. Put the cart in one store, save it with persist, and let each component read only the part it needs, so the badge does not re-render when a note changes.","მომხმარებლები კალათას ავსებენ, გვერდს ანახლებენ და ყველაფერს კარგავენ. კალათა ორ ადგილასაც ჩანს: ჰედერის ნიშნულში და კალათის პანელში. კალათა ერთ store-ში მოათავსე, persist-ით შეინახე და თითო კომპონენტს მხოლოდ საჭირო ნაწილი წააკითხე, რომ ნიშნული შენიშვნის შეცვლაზე თავიდან არ დაიხატოს."],
            hint:    ["Three wires leave the store: one to persist, two to selectors. Each selector feeds its own component.","store-იდან სამი კავშირი გამოდის: ერთი persist-თან, ორი სელექტორებთან. თითო სელექტორი თავის კომპონენტს კვებავს."],
            reqs: [
            { text: ["\"Add to cart\" is an action of the store", "„კალათაში დამატება“ store-ის action-ია"], rules: [['link','onClick','storeBlk']] },
            { text: ["persist saves the cart to localStorage", "persist კალათას localStorage-ში ინახავს"], rules: [['link','storeBlk','persistBlk']] },
            { text: ["The store feeds persist and two selectors", "store კვებავს persist-ს და ორ სელექტორს"], rules: [['out','storeBlk',3]] },
            { text: ["Each component reads the store through a selector", "თითო კომპონენტი store-ს სელექტორით კითხულობს"], rules: [['link','selectorBlk','component']] },
            { text: ["React renders both readers", "React ორივე მკითხველს არენდერებს"], rules: [['path','component','reactRender'],['link','reactRender','browser']] }
            ]
        },
        {
            id: 'starbucks', example: 'rx-starbucks', diff: 4,
            context: ["Starbucks app · order ahead","Starbucks-ის აპი · წინასწარი შეკვეთა"],
            title:   ["One order, three readers","ერთი შეკვეთა, სამი მკითხველი"],
            goal:    ["A tap dispatches an action, a reducer computes the order, and three components read it through context.","შეხება action-ს აგზავნის, reducer შეკვეთას ითვლის, სამი კომპონენტი კი მას context-ით კითხულობს."],
            story:   ["In the order-ahead screen three parts show the same order: the badge in the header, the order sheet and the Pay button with the total. Passing the order down through five levels of props is what broke the last release. Use a reducer for the changes and a context so each part reads the order directly.","წინასწარი შეკვეთის ეკრანზე სამი ნაწილი ერთსა და იმავე შეკვეთას აჩვენებს: ჰედერის ნიშნული, შეკვეთის ფურცელი და გადახდის ღილაკი ჯამით. შეკვეთის ხუთ დონეზე props-ით ჩაწოდებამ გააფუჭა წინა რელიზი. ცვლილებებისთვის reducer გამოიყენე, context-ი კი იმისთვის, რომ თითო ნაწილმა შეკვეთა პირდაპირ წაიკითხოს."],
            hint:    ["onClick → dispatch → reducer → Provider; three wires out of the Provider, each to its own useContext → component.","onClick → dispatch → reducer → Provider; Provider-იდან სამი კავშირი, თითო თავის useContext → კომპონენტთან."],
            reqs: [
            { text: ["A tap dispatches an action", "შეხება action-ს აგზავნის"], rules: [['path','onClick','dispatchBlk']] },
            { text: ["The reducer computes the next order", "reducer შემდეგ შეკვეთას ითვლის"], rules: [['link','dispatchBlk','reducerBlk']] },
            { text: ["The Provider puts the order around the app", "Provider შეკვეთას აპის გარშემო ათავსებს"], rules: [['path','reducerBlk','providerBlk']] },
            { text: ["Three readers use the context", "context-ს სამი მკითხველი იყენებს"], rules: [['out','providerBlk',3]] },
            { text: ["Each reader is a component with useContext", "თითო მკითხველი useContext-იანი კომპონენტია"], rules: [['link','useCtxBlk','component']] },
            { text: ["React renders the screen", "React ეკრანს არენდერებს"], rules: [['path','component','reactRender'],['link','reactRender','browser']] }
            ]
        },
        {
            id: 'boltfood', example: 'rx-boltfood', diff: 3,
            context: ["Bolt Food · a link to one dish","Bolt Food · ბმული ერთ კერძზე"],
            title:   ["Dish page from the link","კერძის გვერდი ბმულიდან"],
            goal:    ["Open /menu/3 and show that one dish, found by the id in the address.","გახსენი /menu/3 და აჩვენე ეს ერთი კერძი, მისამართში მოცემული id-ით ნაპოვნი."],
            story:   ["People share dishes with friends: \"look at this one\" plus a link. Today the link opens the whole menu. Make the route read the id from the address and show that dish. Careful: everything in an address is text, and the ids in the data are numbers.","ხალხი კერძებს მეგობრებს უზიარებს: „ეს ნახე“ და ბმული. დღეს ბმული მთელ მენიუს ხსნის. როუტმა id მისამართიდან უნდა წაიკითხოს და ეს კერძი აჩვენოს. ფრთხილად: მისამართში ყველაფერი ტექსტია, მონაცემებში კი id რიცხვია."],
            hint:    ["address → routes → layout → useParams → Number(id) → find → page.","მისამართი → როუტები → layout → useParams → Number(id) → find → გვერდი."],
            reqs: [
            { text: ["The address goes to the route table", "მისამართი როუტების ცხრილში მიდის"], rules: [['path','urlBlk','routeTable']] },
            { text: ["Read :id from the route", ":id როუტიდან წაიკითხე"], rules: [['path','routeTable','routeParam']] },
            { text: ["Turn the text id into a number", "ტექსტური id რიცხვად აქციე"], rules: [['link','routeParam','toNumber']] },
            { text: ["Find the dish by its id", "კერძი id-ით იპოვე"], rules: [['path','toNumber','findById']] },
            { text: ["The dish page is rendered", "კერძის გვერდი იხატება"], rules: [['path','findById','pageComp'],['path','pageComp','browser']] }
            ]
        },
        {
            id: 'thefork', example: 'rx-thefork', diff: 3,
            context: ["TheFork · favourites","TheFork · რჩეულები"],
            title:   ["Favourites that survive F5","რჩეულები, რომლებიც F5-ს უძლებს"],
            goal:    ["A heart button saves a dish to favourites, and the favourites are still there after a refresh.","გულის ღილაკი კერძს რჩეულებში ინახავს, რჩეულები კი გვერდის განახლების შემდეგაც რჩება."],
            story:   ["Users heart dishes they want to try, but the hearts disappear when the page reloads because they live only in state. Keep the favourites in a custom hook that reads them from localStorage on start and writes them back on every change.","მომხმარებლები გულს უსვამენ კერძებს, რომელთა გასინჯვაც უნდათ, მაგრამ გვერდის განახლებისას გულები ქრება, რადგან მხოლოდ state-ში ცხოვრობს. რჩეულები custom hook-ში შეინახე, რომელიც მათ დაწყებისას localStorage-დან კითხულობს და ყოველ ცვლილებაზე უკან წერს."],
            hint:    ["useLocalStorage replaces useState: the heart calls its setter, the component renders the list.","useLocalStorage ცვლის useState-ს: გული მის setter-ს იძახებს, კომპონენტი სიას ხატავს."],
            reqs: [
            { text: ["Keep the favourites in useLocalStorage", "რჩეულები useLocalStorage-ში შეინახე"], rules: [['has','useLocalStorageBlk']] },
            { text: ["The heart calls the setter", "გული setter-ს იძახებს"], rules: [['path','onClick','setStateBlk'],['path','useLocalStorageBlk','setStateBlk']] },
            { text: ["The component draws the favourites", "კომპონენტი რჩეულებს ხატავს"], rules: [['path','setStateBlk','component'],['path','component','jsxList']] },
            { text: ["React renders them in the browser", "React მათ ბრაუზერში არენდერებს"], rules: [['path','jsxList','reactRender'],['link','reactRender','browser']] },
            { text: ["No .push() on the old array", "ძველ მასივზე .push() არ გამოიყენო"], rules: [['not','mutateBlk']] }
            ]
        },
        {
            id: 'dominos', example: 'rx-dominos', diff: 4,
            context: ["Domino's · order tracker","Domino's · შეკვეთის ტრეკერი"],
            title:   ["Status that cleans up after itself","სტატუსი, რომელიც თავის თავს ასუფთავებს"],
            goal:    ["Load the order status in an effect, and cancel the request if the user leaves the page.","შეკვეთის სტატუსი ეფექტში ჩატვირთე და მოთხოვნა გააუქმე, თუ მომხმარებელი გვერდიდან წავა."],
            story:   ["The tracker loads the status of an order. Users often open it and go straight back to the menu, and the answer then tries to update a page that no longer exists, which shows a warning in the console. Load the status in an effect, and give the effect a cleanup that cancels its request.","ტრეკერი შეკვეთის სტატუსს ტვირთავს. მომხმარებლები ხშირად ხსნიან მას და მაშინვე მენიუში ბრუნდებიან, პასუხი კი ცდილობს განაახლოს გვერდი, რომელიც აღარ არსებობს, და კონსოლში გაფრთხილება ჩნდება. სტატუსი ეფექტში ჩატვირთე და ეფექტს cleanup მიეცი, რომელიც მის მოთხოვნას გააუქმებს."],
            hint:    ["component → useState → useEffect + [deps] → AbortController → fetch → json → setState → cleanup → list.","კომპონენტი → useState → useEffect + [deps] → AbortController → fetch → json → setState → cleanup → სია."],
            reqs: [
            { text: ["The request lives in an effect, not in the component body", "მოთხოვნა ეფექტში ცხოვრობს და არა კომპონენტის ტანში"], rules: [['path','component','useEffectBlk'],['path','useEffectBlk','fetchCall']] },
            { text: ["The effect has a dependency array", "ეფექტს დამოკიდებულებების მასივი აქვს"], rules: [['link','useEffectBlk','depsArray']] },
            { text: ["Create an AbortController before the request", "მოთხოვნამდე შექმენი AbortController"], rules: [['path','abortCtl','fetchCall']] },
            { text: ["The status goes into state", "სტატუსი state-ში მიდის"], rules: [['path','jsonParse','setStateBlk']] },
            { text: ["The cleanup cancels the request", "cleanup მოთხოვნას აუქმებს"], rules: [['path','setStateBlk','cleanup']] },
            { text: ["The status is rendered", "სტატუსი იხატება"], rules: [['path','jsxList','reactRender'],['link','reactRender','browser']] }
            ]
        },
        {
            id: 'opentable', example: 'rx-opentable', diff: 4,
            context: ["OpenTable · the restaurant's dashboard","OpenTable · რესტორნის პანელი"],
            title:   ["Staff page behind a login","პერსონალის გვერდი ავტორიზაციის მიღმა"],
            goal:    ["/kitchen opens only for signed-in staff: without a token the guard sends you to the login first.","/kitchen მხოლოდ ავტორიზებულ პერსონალს ეხსნება: ტოკენის გარეშე guard ჯერ შესვლის გვერდზე გაგზავნის."],
            story:   ["Tonight's bookings and the kitchen queue are on /kitchen. Anyone who guesses the address can see them today. Wrap the route in a guard: a visitor with no token goes to the login page, and after signing in comes back to the page they asked for.","დღევანდელი ჯავშნები და სამზარეულოს რიგი /kitchen-ზეა. დღეს მისამართის მიმხვედრ ნებისმიერ ადამიანს შეუძლია მათი ნახვა. როუტი guard-ში გაახვიე: ტოკენის არმქონე სტუმარი შესვლის გვერდზე მიდის, შესვლის შემდეგ კი იმ გვერდზე ბრუნდება, რომელიც მოითხოვა."],
            hint:    ["address → routes → guard → login → guard (again, now with a token) → page.","მისამართი → როუტები → guard → შესვლა → guard (ხელახლა, უკვე ტოკენით) → გვერდი."],
            reqs: [
            { text: ["The address goes to the route table", "მისამართი როუტების ცხრილში მიდის"], rules: [['path','urlBlk','routeTable']] },
            { text: ["The route is wrapped in a guard", "როუტი guard-შია გახვეული"], rules: [['path','routeTable','guard']] },
            { text: ["No token: the guard sends you to the login", "ტოკენი არ არის: guard შესვლის გვერდზე გაგზავნის"], rules: [['link','guard','loginPost']] },
            { text: ["After the login the guard checks again", "შესვლის შემდეგ guard ხელახლა ამოწმებს"], rules: [['link','loginPost','guard']] },
            { text: ["The staff page is rendered", "პერსონალის გვერდი იხატება"], rules: [['path','guard','pageComp'],['path','pageComp','browser']] }
            ]
        },
        {
            id: 'hellofresh', example: 'rx-hellofresh', diff: 3,
            context: ["HelloFresh · this week's menu","HelloFresh · ამ კვირის მენიუ"],
            title:   ["Loading, error and empty states","ჩატვირთვა, შეცდომა და ცარიელი სია"],
            goal:    ["Load the weekly menu from the API and show a loading, an error and an empty state before the list.","კვირის მენიუ API-დან ჩატვირთე და სიამდე აჩვენე ჩატვირთვის, შეცდომის და ცარიელი სიის მდგომარეობები."],
            story:   ["On a slow phone the weekly menu page stays blank for three seconds, and when the API fails it stays blank forever. Customers think the app is broken. Load the menu in an effect, and before drawing the list handle the three other states: still loading, failed, and nothing this week.","ნელ ტელეფონზე კვირის მენიუს გვერდი სამი წამი ცარიელია, API-ის ჩავარდნისას კი სამუდამოდ ცარიელი რჩება. მომხმარებლებს ჰგონიათ, რომ აპი გაფუჭებულია. მენიუ ეფექტში ჩატვირთე და სიის დახატვამდე დანარჩენი სამი მდგომარეობა დაამუშავე: ჯერ იტვირთება, ჩავარდა, ამ კვირაში არაფერია."],
            hint:    ["After setState, put the loading / error / empty block before the list.","setState-ის შემდეგ სიამდე ჩასვი loading / error / empty ბლოკი."],
            reqs: [
            { text: ["The request lives in an effect with a dependency array", "მოთხოვნა დამოკიდებულებების მასივიან ეფექტში ცხოვრობს"], rules: [['path','component','useEffectBlk'],['link','useEffectBlk','depsArray']] },
            { text: ["The API path goes into fetch()", "API-ის მისამართი fetch()-ში შედის"], rules: [['link','apiEndpoint','fetchCall']] },
            { text: ["Read the JSON and keep it in state", "წაიკითხე JSON და შეინახე state-ში"], rules: [['path','fetchCall','jsonParse'],['path','jsonParse','setStateBlk']] },
            { text: ["Loading, error and empty come before the list", "ჩატვირთვა, შეცდომა და ცარიელი სია სიამდე მოდის"], rules: [['path','setStateBlk','jsxCond'],['path','jsxCond','jsxList']] },
            { text: ["The menu is rendered in the browser", "მენიუ ბრაუზერში იხატება"], rules: [['path','jsxList','reactRender'],['link','reactRender','browser']] }
            ]
        }
    ];

    const logs = {
        dataArray: ['<strong>The data file</strong> is in memory: 5 dishes.', '<strong>მონაცემთა ფაილი</strong> მეხსიერებაშია: 5 კერძი.'],
        apiEndpoint: ['<strong>The path</strong> is only a string so far: nothing has been sent.', '<strong>მისამართი</strong> ჯერ მხოლოდ სტრიქონია: არაფერი გაგზავნილა.'],
        filterOp: ['<strong>.filter()</strong> kept the dishes the kitchen has today.', '<strong>.filter()</strong>-მა დატოვა კერძები, რომლებიც დღეს სამზარეულოშია.'],
        spreadOp: ['<strong>Spread</strong> copied the array and added one dish.', '<strong>Spread</strong>-მა მასივი დააკოპირა და ერთი კერძი დაამატა.'],
        abortCtl: ['<strong>AbortController</strong> is ready: a way to cancel this request.', '<strong>AbortController</strong> მზადაა: ამ მოთხოვნის გაუქმების საშუალება.'],
        jsonParse: ['<strong>res.json()</strong> turned the body into real objects.', '<strong>res.json()</strong>-მა სხეული ნამდვილ ობიექტებად აქცია.'],
        browser: ['<strong>The browser</strong> painted the DOM: the guest can see it now.', '<strong>ბრაუზერმა</strong> DOM დახატა: სტუმარი ახლა ხედავს.']
    };

    return { DISHES, NEW_DISH, icons, T, defs, groups, format, size, sim, lectures, levels, examples, tasks, logs };
})();
