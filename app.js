// ============================================================
// REACT FLOW LAB — the canvas engine (the same one JS Flow Lab uses).
// The React blocks, tasks and reference schemas are in react-data.js,
// which has to be loaded before this file.
// ============================================================

// ============================================================
// ICONS  (small set, mapped onto block types by ICON_FOR)
// ============================================================
const I = {
    array:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3"/><path d="M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3"/><line x1="9" y1="12" x2="15" y2="12"/></svg>',
    cloud:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
    key:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3"/></svg>',
    lock:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
    braces:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5a2 2 0 0 0 2 2h1"/><path d="M16 3h1a2 2 0 0 1 2 2v5a2 2 0 0 0 2 2 2 2 0 0 0-2 2v5a2 2 0 0 1-2 2h-1"/></svg>',
    download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
    upload:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>',
    edit:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>',
    trash:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/></svg>',
    clock:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    loop:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>',
    filter:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>',
    map:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="7" x2="10" y2="7"/><line x1="4" y1="17" x2="10" y2="17"/><polyline points="14 4 20 12 14 20"/></svg>',
    sort:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="6" x2="12" y2="6"/><line x1="4" y1="12" x2="16" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg>',
    sum:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 4 6 4 12 12 6 20 18 20"/></svg>',
    search:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
    spread:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/></svg>',
    template: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>',
    box:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/></svg>',
    save:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>',
    disk:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v6c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 11v6c0 1.66 4 3 9 3s9-1.34 9-3v-6"/></svg>',
    target:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
    plus:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
    layers:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',
    screen:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
    terminal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>',
    mouse:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3l12 9-5.5 1.5L18 19l-3 1.5-2.5-5.5L9 18z"/></svg>',
    form:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="13" y2="17"/></svg>',
    toggle:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="6" width="22" height="12" rx="6"/><circle cx="16" cy="12" r="3"/></svg>',
    module:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>',
    importIn: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>',
    shield:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    zap:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    refresh:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>',
    stop:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>',
    code:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    fn:       '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 21c2 0 3-1 3-4V7c0-3 1-4 3-4"/><line x1="5" y1="11" x2="14" y2="11"/></svg>',
    branch:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="3" r="3"/><path d="M6 21V8"/><path d="M6 8c0 4 6 4 6 8"/><path d="M18 8v13"/><circle cx="18" cy="5" r="3"/></svg>',
    dive:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 12h6"/><path d="M12 9l3 3-3 3"/></svg>',
    close:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    warning:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    check:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
    info:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
    x:        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
};

// Block type -> icon
const ICON_FOR = {
    dataArray: 'array', apiEndpoint: 'cloud', localStore: 'disk', userInput: 'search',
    fetchCall: 'download', apiKey: 'key', jsonParse: 'braces',
    httpGet: 'download', httpPost: 'plus', httpPut: 'edit', httpDelete: 'trash',
    tryCatch: 'shield', abortCtl: 'stop',
    asyncFn: 'fn', awaitOp: 'clock', promiseThen: 'branch', setTimeoutBlk: 'clock',
    debounceBlk: 'refresh', eventLoop: 'loop',
    filterOp: 'filter', mapOp: 'map', sortOp: 'sort', reduceOp: 'sum', findOp: 'search',
    destructure: 'box', spreadOp: 'spread', templateLit: 'template',
    stateObj: 'layers', closureBlk: 'lock', saveLocal: 'save',
    querySel: 'target', createEl: 'plus', appendChildBlk: 'layers', renderDom: 'screen',
    eventListener: 'mouse', delegation: 'branch', formSubmit: 'form', classToggle: 'toggle',
    exportBlk: 'module', importBlk: 'importIn',
    consoleLog: 'terminal', browser: 'screen',
    // sub-blocks
    'sub.param': 'box', 'sub.return': 'importIn', 'sub.ifCheck': 'branch', 'sub.loop': 'loop',
    'sub.callback': 'fn', 'sub.arrow': 'code', 'sub.tryBlock': 'shield', 'sub.catchBlock': 'warning',
    'sub.headers': 'key', 'sub.bodyJson': 'braces', 'sub.method': 'upload', 'sub.statusCheck': 'check',
    'sub.throwErr': 'warning', 'sub.keyRead': 'download', 'sub.keyWrite': 'save',
    'sub.stateGet': 'layers', 'sub.stateSet': 'edit', 'sub.domCreate': 'plus', 'sub.domText': 'template',
    'sub.classAdd': 'toggle', 'sub.preventDefault': 'stop', 'sub.formData': 'form'
};
Object.assign(ICON_FOR, RFL.icons);
const iconFor = (type) => I[ICON_FOR[type]] || I.code;

// ============================================================
// UI TRANSLATIONS  (en, ka)
// ============================================================
const T = {
    brand:        ['JS Flow Lab', 'JS Flow Lab'],
    academy:      ['IT Step Academy', 'IT Step აკადემია'],
    levels:       ['Levels', 'დონეები'],
    reset:        ['Reset', 'გადატვირთვა'],
    checkAnswer:  ['Check Answer', 'პასუხის შემოწმება'],
    runFlow:      ['Run Flow', 'ნაკადის გაშვება'],
    mission:      ['Mission:', 'მისია:'],
    showHint:     ['Show hint', 'მინიშნება'],
    hint:         ['Hint', 'მინიშნება'],
    library:      ['Block Library', 'ბლოკების ბიბლიოთეკა'],
    inspector:    ['Inspector', 'ინსპექტორი'],
    howWorks:     ['How it works', 'როგორ მუშაობს'],
    selectBlock:  ['Select a block', 'აირჩიე ბლოკი'],
    nothingSel:   ['Nothing selected', 'არცერთი არ არის არჩეული'],
    clickAnyBlock:['Click any block on the canvas to see what it does, the real JavaScript behind it, and the mistake people make with it.', 'დააწკაპუნე ნებისმიერ ბლოკზე, რომ ნახო რას აკეთებს, რა JavaScript კოდი დგას მის უკან და რა შეცდომას უშვებენ ხოლმე.'],
    whatDoes:     ['What it does', 'რას აკეთებს'],
    fileSrc:      ['Where it lives', 'სად წერია'],
    codeEx:       ['Code example', 'კოდის მაგალითი'],
    commonMistake:['Common mistake', 'ხშირი შეცდომა'],
    dataShape:    ['Data in / data out', 'რა შემოდის / რა გამოდის'],
    emptyExplain: ['Drag blocks from the left, connect their ports, then press', 'გადმოიტანე ბლოკები მარცხნიდან, შეაერთე პორტები და დააჭირე'],
    canvasCleared:['Canvas cleared. Drag blocks from the library to start over.', 'არე გასუფთავდა. გადმოიტანე ბლოკები ხელახლა.'],
    runFlowB:     ['Run Flow', 'გაშვება'],
    toWatch:      ['to watch real data travel through your JavaScript.', 'რათა ნახო, როგორ მოძრაობს ნამდვილი მონაცემი შენს JavaScript-ში.'],

    // Toast titles
    emptyFlow:    ['Empty flow', 'ცარიელი ნაკადი'],
    emptyFlowMsg: ['Drag blocks from the left and connect them first.', 'ჯერ გადმოიტანე და შეაერთე ბლოკები.'],
    notLinear:    ['This level wants one chain', 'ამ დონეს ერთი ჯაჭვი სჭირდება'],
    notLinearMsg: ['Branches are allowed on the canvas, but this level expects one straight chain. Remove the extra connection — or open Tasks for branching, real-world flows.', 'კანვასზე განშტოება დასაშვებია, მაგრამ ეს დონე ერთ სწორ ჯაჭვს ელის. წაშალე ზედმეტი კავშირი — ან გახსენი დავალებები განშტოებიანი, რეალური ნაკადებისთვის.'],
    unconnected:  ['Unconnected blocks', 'შეუერთებელი ბლოკები'],
    unconnectedMsg:['All blocks on the canvas must be linked into a single chain.', 'ყველა ბლოკი უნდა იყოს დაკავშირებული ერთ ჯაჭვში.'],
    correct:      ['Correct flow', 'სწორი ნაკადია'],
    correctMsg:   ['Great job — that is exactly how the data moves in plain JavaScript.', 'შესანიშნავია — ზუსტად ასე მოძრაობს მონაცემი სუფთა JavaScript-ში.'],
    notQuite:     ['Not quite right', 'არ არის ზუსტი'],
    nothingRun:   ['Nothing to run', 'არაფერია გასაშვები'],
    nothingRunMsg:['Connect at least two blocks into a flow first.', 'ჯერ შეაერთე მინიმუმ ორი ბლოკი.'],
    wrongDir:     ['Wrong direction', 'არასწორი მიმართულება'],
    wrongDirMsg:  ['Connect an output (right side) to an input (left side).', 'შეაერთე გამოსასვლელი (მარჯვენა) მხარე შემავალთან (მარცხენა).'],
    answerOk:     ['<strong>Answer accepted.</strong> Press Run Flow to watch the data change at every step.', '<strong>პასუხი მიღებულია.</strong> დააჭირე გაშვებას და ნახე, როგორ იცვლება მონაცემი თითო ბიჯზე.'],
    flowComplete: ['<strong>Flow complete.</strong>', '<strong>ნაკადი დასრულდა.</strong>'],
    browserRendered:['<strong>Browser</strong> painted the DOM you built.', '<strong>ბრაუზერმა</strong> დახატა შენ მიერ აწყობილი DOM.'],

    // Library group names
    grpSource:    ['Data Sources', 'მონაცემთა წყარო'],
    grpNetwork:   ['Fetch & HTTP', 'Fetch და HTTP'],
    grpAsync:     ['Async & Timing', 'ასინქრონულობა'],
    grpTransform: ['Array & Transform', 'მასივი და გარდაქმნა'],
    grpState:     ['State & Storage', 'მდგომარეობა და საცავი'],
    grpDom:       ['DOM & Events', 'DOM და ივენთები'],
    grpModule:    ['Modules', 'მოდულები'],
    grpOutput:    ['Output', 'შედეგი'],

    // Preview
    ourProducts:  ['Our Products', 'ჩვენი პროდუქცია'],
    items:        ['items', 'ერთეული'],
    inStock:      ['In stock', 'მარაგშია'],
    outOfStock:   ['Out of stock', 'არ არის მარაგში'],
    renderedBy:   ['rendered by your JavaScript flow.', 'დახატულია შენი JavaScript ნაკადით.'],

    // Step prefix
    step:         ['Step', 'ბიჯი'],

    // Check answer helpers
    position:     ['Position', 'პოზიცია'],
    expectedWord: ['expected', 'მოსალოდნელია'],
    butFound:     ['but found', 'მაგრამ ნაპოვნია'],
    almostMissing:['Almost there — you are missing a block at position', 'თითქმის — ბლოკი აკლია პოზიციაზე'],
    extraAfter:   ['You have an extra block after position', 'გაქვს ზედმეტი ბლოკი პოზიციის შემდეგ'],

    // Outcome banners
    bannerList:   ['List rendered from the array.', 'სია დახატულია მასივიდან.'],
    bannerInStock:['Only in-stock items rendered.', 'მხოლოდ მარაგში არსებული ერთეულები გამოჩნდა.'],
    bannerMapped: ['Every item was reshaped by .map().', 'თითო ერთეული გარდაიქმნა .map()-ით.'],
    bannerSorted: ['Sorted by price, cheapest first.', 'დალაგებულია ფასით — იაფიდან ძვირისკენ.'],
    bannerTotal:  ['Totals calculated with .reduce().', 'ჯამი დათვლილია .reduce()-ით.'],
    bannerFetched:['Data fetched over the network.', 'მონაცემი ჩამოტვირთულია ქსელიდან.'],
    bannerAwaited:['await unwrapped the promise before rendering.', 'await-მა გახსნა Promise დახატვამდე.'],
    bannerCaught: ['Errors are caught — the page never breaks.', 'შეცდომა დაჭერილია — გვერდი აღარ ფუჭდება.'],
    bannerKeyed:  ['Request signed with your API key.', 'მოთხოვნა გაგზავნილია შენი API გასაღებით.'],
    bannerClicked:['Click handler updated the state and re-rendered.', 'დაწკაპუნებამ შეცვალა state და გვერდი გადაიხატა.'],
    bannerPosted: ['Form data sent with POST.', 'ფორმის მონაცემი გაგზავნილია POST-ით.'],
    bannerUpdated:['Item updated with PUT.', 'ერთეული განახლდა PUT-ით.'],
    bannerDeleted:['Item removed with DELETE.', 'ერთეული წაიშალა DELETE-ით.'],
    bannerSaved:  ['State saved to localStorage.', 'State შენახულია localStorage-ში.'],
    bannerLoaded: ['State restored from localStorage.', 'State აღდგენილია localStorage-იდან.'],
    bannerSearch: ['Search results for "lap".', 'საძიებო შედეგი "lap"-ისთვის.'],
    bannerDelegated:['One listener handles every row.', 'ერთი listener ემსახურება ყველა სტრიქონს.'],
    bannerChained:['Same result, written as a .then() chain.', 'იგივე შედეგი, დაწერილი .then() ჯაჭვით.'],
    bannerLoop:   ['Sync first, microtasks next, timers last.', 'ჯერ სინქრონული, მერე microtask, ბოლოს ტაიმერი.'],
    bannerModule: ['Imported from another file.', 'იმპორტირებულია სხვა ფაილიდან.'],
    bannerAborted:['The stale request was aborted.', 'ძველი მოთხოვნა გაუქმდა.'],
    bannerCrud:   ['Create and delete share one request pipeline.', 'შექმნა და წაშლა ერთსა და იმავე მილსადენს იყენებს.'],

    // Dive / sub-canvas
    dblToFlip:    ['Double-click to flip back', 'ორმაგი დაწკაპუნება უკან დასაბრუნებლად'],
    diveInto:     ['Dive into', 'შესვლა'],
    topCrumb:     ['Top', 'მთავარი'],
    dveTooltip:   ['Open block internals', 'ბლოკის შინაარსის გახსნა'],
    subLibraryTitle: ['Internals', 'შინაარსი'],
    subMissingMsg:['Dive into the {block} block and complete its internals.', 'შედი {block} ბლოკში და დაასრულე მისი შინაარსი.'],

    // Examples
    examplesTitle:['Reference Schemas', 'მზა სქემები'],
    loadEditable: ['Load to canvas (edit)', 'ჩატვირთვა (რედაქტირება)'],
    readonlyHint: ['Read-only preview — load it to edit.', 'მხოლოდ საჩვენებლად — ჩატვირთე რომ შეცვალო.'],

    // Canvas tools
    snapOn:       ['Snap to grid: on', 'ბადეზე მიწებება: ჩართულია'],
    snapOff:      ['Snap to grid: off', 'ბადეზე მიწებება: გამორთულია'],
    tidied:       ['Layout tidied', 'განლაგება დალაგდა'],
    collapseLibrary: ['Collapse to icons', 'ხატულებად შეკეცვა'],
    expandLibrary:   ['Expand the library', 'ბიბლიოთეკის გაშლა'],
    hideInspector:   ['Hide the inspector', 'ინსპექტორის დამალვა'],
    showInspector:   ['Show the inspector', 'ინსპექტორის ჩვენება'],
    hidePanel:       ['Hide the bottom panel', 'ქვედა პანელის დამალვა'],
    showPanel:       ['Show the bottom panel', 'ქვედა პანელის ჩვენება'],
    dragResize:      ['Drag to resize', 'გადაათრიე ზომის შესაცვლელად'],
    searchBlocks: ['Search blocks...', 'ბლოკის ძებნა...'],
    noBlocks:     ['No blocks match that search.', 'ასეთი ბლოკი ვერ მოიძებნა.'],

    // Panel tabs
    tabTrace:     ['Trace', 'ნაბიჯები'],
    tabData:      ['Data', 'მონაცემი'],
    tabCode:      ['Code', 'კოდი'],
    dataEmpty:    ['Run the flow to see the real value after every block.', 'გაუშვი ნაკადი და ნახე ნამდვილი მნიშვნელობა თითო ბლოკის შემდეგ.'],
    codeEmpty:    ['Connect some blocks — the JavaScript they describe appears here.', 'შეაერთე ბლოკები — აქ გამოჩნდება მათი შესაბამისი JavaScript.'],
    copy:         ['Copy', 'კოპირება'],
    copied:       ['Copied to clipboard', 'დაკოპირდა'],
    startValue:   ['start value', 'საწყისი მნიშვნელობა'],
    unchanged:    ['unchanged', 'უცვლელი'],

    // API settings
    apiTitle:     ['API settings', 'API პარამეტრები'],
    apiUrlLabel:  ['Endpoint URL', 'Endpoint-ის URL'],
    apiUrlHint:   ['Leave empty to use the built-in mock products. A real URL is fetched for real when the flow runs.', 'ცარიელის შემთხვევაში გამოიყენება ჩაშენებული ნიმუში. ნამდვილი URL-იდან მონაცემი ნამდვილად ჩამოიტვირთება გაშვებისას.'],
    apiKeyLabel:  ['API key', 'API გასაღები'],
    apiKeyHint:   ['Stored only in this browser (localStorage). Never commit real keys to a public repo.', 'ინახება მხოლოდ ამ ბრაუზერში (localStorage). ნამდვილი გასაღები არასოდეს ატვირთო საჯარო რეპოზიტორიაში.'],
    apiSchemeLabel:['How to send the key', 'როგორ გაიგზავნოს გასაღები'],
    apiHeaderLabel:['Header name', 'ჰედერის სახელი'],
    apiParamLabel:['Query parameter name', 'query პარამეტრის სახელი'],
    apiSchemeNone:['Do not send a key', 'გასაღები არ გაიგზავნოს'],
    apiSchemeBearer:['Authorization: Bearer <key>', 'Authorization: Bearer <key>'],
    apiSchemeHeader:['Custom header', 'საკუთარი ჰედერი'],
    apiSchemeQuery:['Query parameter (?key=...)', 'query პარამეტრი (?key=...)'],
    apiPathLabel: ['Array path inside the response', 'მასივის გზა პასუხში'],
    apiPathHint:  ['Some APIs wrap the list, e.g. { "products": [...] }. Write products to dig in, or leave empty.', 'ზოგი API სიას ფარავს, მაგ. { "products": [...] }. ჩაწერე products, ან დატოვე ცარიელი.'],
    apiTest:      ['Test request', 'მოთხოვნის ტესტი'],
    apiTesting:   ['Sending...', 'იგზავნება...'],
    apiOk:        ['OK — received', 'წარმატება — მიღებულია'],
    apiFail:      ['Request failed', 'მოთხოვნა ჩავარდა'],
    apiSaved:     ['API settings saved', 'API პარამეტრები შენახულია'],
    apiShow:      ['Show', 'ჩვენება'],
    apiHide:      ['Hide', 'დამალვა'],
    apiClear:     ['Clear', 'გასუფთავება'],
    apiRequestPreview:['Request preview', 'მოთხოვნის გადახედვა'],
    apiSharedNote:['This one API config is shared by every API and fetch block on the canvas.', 'ეს ერთი კონფიგურაცია საერთოა კანვასის ყველა API და fetch ბლოკისთვის.'],
    apiCorsNote:  ['If a real API returns a CORS error, the flow falls back to mock data and says so in the trace.', 'თუ ნამდვილი API CORS შეცდომას დააბრუნებს, ნაკადი გადავა ნიმუშზე და ამას ნაბიჯებში დაწერს.'],
    livePreview:  ['Live data fetched from your endpoint', 'ცოცხალი მონაცემი შენი endpoint-იდან'],
    fetchFailed:  ['Fetch failed — falling back to mock data', 'მოთხოვნა ვერ შესრულდა — გამოყენებულია ნიმუში'],
    consoleTitle: ['Console', 'კონსოლი'],
    consoleHint:  ['console.log output from this flow', 'ამ ნაკადის console.log გამონატანი'],
    consoleEmpty: ['Nothing logged yet.', 'ჯერ არაფერია დალოგილი.'],

    // Connections
    wouldLoop:    ['That would make a loop', 'ეს ციკლს შექმნიდა'],
    wouldLoopMsg: ['Data has to flow forward — a block cannot feed one of the blocks it came from.', 'მონაცემი წინ უნდა მიედინებოდეს — ბლოკი ვერ მისცემს მონაცემს იმ ბლოკს, საიდანაც თვითონ მიიღო.'],
    removeLink:   ['Remove connection', 'კავშირის წაშლა'],

    // Reference schemas gallery
    realWorld:    ['Real-world scenarios', 'რეალური სცენარები'],
    realWorldSub: ['The flows behind products people use every day. Open one read-only, or practise it as a task.', 'ნაკადები ყოველდღიური პროდუქტების უკან. გახსენი სანახავად ან ივარჯიშე დავალების სახით.'],
    conceptSchemas:['Concept schemas', 'კონცეფციების სქემები'],
    practiceTask: ['Practise as a task', 'ივარჯიშე დავალებად'],

    // Real-world tasks
    tasks:        ['Tasks', 'დავალებები'],
    tasksTitle:   ['Real-world tasks', 'რეალური დავალებები'],
    tasksSub:     ['Each task is a job from a real product. Read the brief, then design the flow yourself — the checklist ticks as you build.', 'თითო დავალება რეალური პროდუქტის ამოცანაა. წაიკითხე აღწერა და ნაკადი თავად დააპროექტე — სია აწყობისას თავისით მოინიშნება.'],
    startTask:    ['Start task', 'დაწყება'],
    viewSolution: ['Solution', 'ამოხსნა'],
    completedBadge:['Done', 'შესრულდა'],
    blocksCount:  ['blocks', 'ბლოკი'],
    reqsCount:    ['checks', 'შემოწმება'],
    taskEyebrow:  ['Real-world task', 'რეალური დავალება'],
    taskLabel:    ['Task', 'დავალება'],
    taskProgress: ['requirements met', 'მოთხოვნა შესრულებულია'],
    taskBlocks:   ['Blocks you will need — click to add', 'საჭირო ბლოკები — დააწკაპუნე დასამატებლად'],
    addToCanvas:  ['Add to canvas', 'კანვასზე დამატება'],
    showBlocks:   ['Show blocks', 'ბლოკები'],
    hideBlocks:   ['Hide blocks', 'ბლოკების დამალვა'],
    showSolution: ['Show solution', 'ამოხსნა'],
    hideSolution: ['Hide solution', 'ამოხსნის დამალვა'],
    solutionLabel:['Reference solution', 'ნიმუშის ამოხსნა'],
    checkTask:    ['Check task', 'შემოწმება'],
    exitTask:     ['Leave task (keeps your canvas)', 'დავალებიდან გასვლა (კანვასი რჩება)'],
    collapse:     ['Collapse', 'ჩაკეცვა'],
    expand:       ['Expand', 'გაშლა'],
    taskDone:     ['Task complete!', 'დავალება შესრულებულია!'],
    taskDoneMsg:  ['Every requirement is met. Press Run Flow to watch the real data move through your design.', 'ყველა მოთხოვნა შესრულებულია. დააჭირე გაშვებას და ნახე, როგორ მოძრაობს ნამდვილი მონაცემი შენს სქემაში.'],
    taskMissing:  ['Not finished yet', 'ჯერ არ დასრულებულა'],
    taskNext:     ['Next requirement:', 'შემდეგი მოთხოვნა:'],
    taskTip:      ['Read the brief, then build the flow. One port can hold several connections — drag from it again to branch.', 'წაიკითხე აღწერა და ააწყე ნაკადი. ერთ პორტს რამდენიმე კავშირი შეიძლება ჰქონდეს — განშტოებისთვის ისევ გამოათრიე იმავე პორტიდან.'],
    reqConnected: ['Every block is connected to the flow', 'ყველა ბლოკი ნაკადთანაა დაკავშირებული']
};

Object.assign(T, RFL.T);

let lang = 'en';
function tx(field) {
    if (Array.isArray(field)) return field[lang === 'ka' ? 1 : 0];
    return field == null ? '' : field;
}
function tt(key) {
    return T[key] ? tx(T[key]) : key;
}

// ============================================================
// BLOCK DEFINITIONS
// Every block is one real JavaScript idea: what it does, where it
// lives, the code behind it, and the mistake people make with it.
// ============================================================
const NODE_DEFS = {

    // ---------- Data sources ----------
    dataArray: {
        label: ['Array of data', 'მონაცემთა მასივი'],
        category: ['Source', 'წყარო'],
        color: '',
        short: ['Hard-coded array in your file', 'მასივი პირდაპირ ფაილში'],
        long: ['The simplest data source: an array of objects written straight into your JavaScript file. No network, no waiting — the value already exists the moment the script runs. Start every new idea here, then swap it for a real API later.',
               'ყველაზე მარტივი წყარო: ობიექტების მასივი ჩაწერილი პირდაპირ JavaScript ფაილში. ქსელი არ არის, ლოდინი არ არის — მნიშვნელობა უკვე არსებობს სკრიპტის გაშვებისთანავე. ახალი იდეა ჯერ აქედან დაიწყე, მერე შეცვალე ნამდვილი API-ით.'],
        file: 'data.js · app.js',
        code: '<span class="k">const</span> products = [\n  { id: <span class="n">1</span>, name: <span class="s">\'Laptop\'</span>, price: <span class="n">1200</span>, inStock: <span class="k">true</span> },\n  { id: <span class="n">2</span>, name: <span class="s">\'USB Mouse\'</span>, price: <span class="n">25</span>, inStock: <span class="k">false</span> }\n];',
        mistake: ['Editing this array at runtime and expecting it to survive a refresh. Nothing is saved unless you write it to localStorage or a server.',
                  'მასივის შეცვლა გაშვების დროს და იმის მოლოდინი, რომ განახლების შემდეგაც დარჩება. არაფერი ინახება, სანამ localStorage-ში ან სერვერზე არ ჩაწერ.'],
        io: ['nothing in → Array of objects out', 'შემოსავალი არ აქვს → გამოდის ობიექტების მასივი']
    },
    apiEndpoint: {
        label: ['API endpoint', 'API მისამართი'],
        category: ['Source', 'წყარო'],
        color: '',
        short: ['The URL your data comes from', 'URL, საიდანაც მოდის მონაცემი'],
        long: ['A URL that answers with JSON. It is just a string until fetch() actually calls it. Open the inspector on this block to set a real URL and an API key — the flow will then make a real request when you press Run Flow.',
               'URL, რომელიც JSON-ს პასუხობს. სანამ fetch() არ გამოიძახებს, ეს უბრალო სტრიქონია. ამ ბლოკის ინსპექტორში ჩაწერე ნამდვილი URL და API გასაღები — გაშვებისას ნაკადი ნამდვილ მოთხოვნას გააგზავნის.'],
        file: 'config.js · .env',
        code: '<span class="k">const</span> API = <span class="s">\'https://api.example.com/products\'</span>;\n<span class="c">// A URL is data too — nothing happens until fetch() runs.</span>',
        mistake: ['Hard-coding a secret key next to the URL and pushing it to GitHub. Keys belong in environment variables or behind your own backend.',
                  'საიდუმლო გასაღების პირდაპირ ჩაწერა URL-ის გვერდით და GitHub-ზე ატვირთვა. გასაღები environment ცვლადში ან შენივე backend-ის მიღმა უნდა იყოს.'],
        io: ['nothing in → URL string out', 'შემოსავალი არ აქვს → გამოდის URL სტრიქონი']
    },
    localStore: {
        label: ['localStorage', 'localStorage'],
        category: ['Source', 'წყარო'],
        color: '',
        short: ['Data saved in this browser', 'ბრაუზერში შენახული მონაცემი'],
        long: ['localStorage keeps strings in the browser, and they survive a refresh and a restart. It only stores text — objects and arrays must be turned into JSON on the way in and parsed on the way out.',
               'localStorage ბრაუზერში ინახავს სტრიქონებს და ისინი გვერდის განახლების შემდეგაც რჩება. ინახავს მხოლოდ ტექსტს — ობიექტი და მასივი შესვლისას JSON-ად უნდა აქციო, გამოსვლისას კი დააპარსო.'],
        file: 'browser storage',
        code: '<span class="k">const</span> raw = localStorage.<span class="k">getItem</span>(<span class="s">\'products\'</span>);\n<span class="c">// raw is a STRING (or null on the first visit)</span>',
        mistake: ['Forgetting it can be null on the very first visit, then calling .map() on null and crashing the page.',
                  'იმის დავიწყება, რომ პირველ ვიზიტზე null-ია — მერე .map() null-ზე და გვერდი ფუჭდება.'],
        io: ['key in → JSON string out', 'შედის key → გამოდის JSON სტრიქონი']
    },
    userInput: {
        label: ['Input value', 'ინფუთის მნიშვნელობა'],
        category: ['Source', 'წყარო'],
        color: '',
        short: ['What the user typed', 'რაც მომხმარებელმა აკრიფა'],
        long: ['Reading input.value gives you what the user typed — always a string, even in a number field. Trim it and validate it before it goes anywhere near your data.',
               'input.value გაძლევს იმას, რაც მომხმარებელმა აკრიფა — ყოველთვის სტრიქონი, რიცხვის ველშიც კი. გაასუფთავე და შეამოწმე, სანამ მონაცემებთან მიუშვებ.'],
        file: 'index.html + app.js',
        code: '<span class="k">const</span> q = document.<span class="k">querySelector</span>(<span class="s">\'#search\'</span>).value.<span class="k">trim</span>();\n<span class="c">// "lap" — always a string</span>',
        mistake: ['Treating a number input as a number. "10" + 5 is "105", not 15 — convert with Number() first.',
                  'რიცხვის ველის რიცხვად მიჩნევა. "10" + 5 იძლევა "105"-ს და არა 15-ს — ჯერ Number()-ით გადაიყვანე.'],
        io: ['keystrokes in → string out', 'შედის აკრეფა → გამოდის სტრიქონი']
    },

    // ---------- Fetch & HTTP ----------
    fetchCall: {
        label: ['fetch()', 'fetch()'],
        category: ['Network', 'ქსელი'],
        color: 'c-info',
        short: ['Send the HTTP request', 'აგზავნის HTTP მოთხოვნას'],
        long: ['fetch() sends the request and immediately returns a Promise — a receipt saying an answer will arrive. The Promise resolves to a Response object, which is the envelope, not the data. You still have to open it with .json().',
               'fetch() აგზავნის მოთხოვნას და მაშინვე აბრუნებს Promise-ს — ქვითარს იმის შესახებ, რომ პასუხი მოვა. Promise იხსნება Response ობიექტად, რომელიც კონვერტია და არა თავად მონაცემი. მას .json()-ით უნდა გახსნა.'],
        file: 'app.js · api.js',
        code: '<span class="k">const</span> res = <span class="k">await</span> <span class="k">fetch</span>(API, {\n  headers: { <span class="s">\'Accept\'</span>: <span class="s">\'application/json\'</span> }\n});\n<span class="c">// res is a Response, not your data yet</span>',
        mistake: ['Expecting fetch to throw on a 404 or 500. It only rejects on network failure — check res.ok yourself.',
                  'იმის მოლოდინი, რომ fetch 404-ზე ან 500-ზე ჩავარდება. ის მხოლოდ ქსელის შეცდომაზე ვარდება — res.ok თვითონ უნდა შეამოწმო.'],
        io: ['URL + options in → Promise of Response out', 'შედის URL + პარამეტრები → გამოდის Promise of Response']
    },
    apiKey: {
        label: ['API key / headers', 'API გასაღები / ჰედერები'],
        category: ['Network', 'ქსელი'],
        color: 'c-warning',
        short: ['Prove who is calling', 'ადასტურებს ვინ ურეკავს'],
        long: ['Most real APIs refuse anonymous calls. You attach a key — usually as an Authorization: Bearer header, sometimes as a custom header like x-api-key, sometimes as a query parameter. Set yours in this block inspector; every fetch block on the canvas then uses it.',
               'რეალური API-ების უმეტესობა ანონიმურ მოთხოვნას არ იღებს. თან უნდა გააყოლო გასაღები — ჩვეულებრივ Authorization: Bearer ჰედერით, ზოგჯერ x-api-key ჰედერით, ზოგჯერ query პარამეტრით. ჩაწერე ამ ბლოკის ინსპექტორში და კანვასის ყველა fetch ბლოკი გამოიყენებს.'],
        file: 'api.js · .env',
        code: '<span class="k">const</span> headers = {\n  <span class="s">\'Authorization\'</span>: <span class="s">`Bearer ${API_KEY}`</span>,\n  <span class="s">\'Content-Type\'</span>: <span class="s">\'application/json\'</span>\n};',
        mistake: ['Shipping a secret key in front-end code. Anything in the browser is public — use a key that is safe to expose, or proxy the call through your own server.',
                  'საიდუმლო გასაღების ფრონტენდში გაშვება. ბრაუზერში ყველაფერი საჯაროა — გამოიყენე ისეთი გასაღები, რომლის გამოჩენაც უსაფრთხოა, ან გაატარე შენივე სერვერზე.'],
        io: ['key in → headers object out', 'შედის გასაღები → გამოდის headers ობიექტი']
    },
    jsonParse: {
        label: ['res.json()', 'res.json()'],
        category: ['Network', 'ქსელი'],
        color: 'c-info',
        short: ['Turn the response into real data', 'პასუხს აქცევს ნამდვილ მონაცემად'],
        long: ['The body arrives as text. res.json() reads that text and parses it into real JavaScript arrays and objects — and it is asynchronous too, so it also needs await. JSON.parse() does the same job for a plain string.',
               'პასუხის სხეული ტექსტად მოდის. res.json() კითხულობს ამ ტექსტს და აქცევს ნამდვილ JavaScript მასივებად და ობიექტებად — ესეც ასინქრონულია, ამიტომ მასაც await სჭირდება. JSON.parse() იმავეს აკეთებს ჩვეულებრივი სტრიქონისთვის.'],
        file: 'app.js',
        code: '<span class="k">const</span> data = <span class="k">await</span> res.<span class="k">json</span>();\n<span class="c">// now it is a real array you can .filter() and .map()</span>',
        mistake: ['Forgetting await and then logging a Promise instead of your data — the classic pending Promise in the console.',
                  'await-ის დავიწყება და მონაცემის ნაცვლად Promise-ის დალოგვა — ის ცნობილი pending Promise კონსოლში.'],
        io: ['Response in → Array / Object out', 'შედის Response → გამოდის მასივი / ობიექტი']
    },
    httpGet: {
        label: ['GET', 'GET'],
        category: ['HTTP method', 'HTTP მეთოდი'],
        color: 'c-success',
        short: ['Read data, change nothing', 'კითხულობს, არაფერს ცვლის'],
        long: ['GET is the default method: ask the server for something and change nothing. It has no body — everything you want to say goes in the URL as a path or a query string.',
               'GET ნაგულისხმევი მეთოდია: სთხოვე სერვერს რაღაც და არაფერი შეცვალო. მას body არ აქვს — ყველაფერი URL-ში იწერება, მისამართად ან query სტრიქონად.'],
        file: 'HTTP verb',
        code: '<span class="k">await</span> <span class="k">fetch</span>(<span class="s">`${API}/products?page=1`</span>);\n<span class="c">// method GET is the default</span>',
        mistake: ['Trying to send a body with GET. Put the values in the query string instead.',
                  'GET-ით body-ის გაგზავნის მცდელობა. მნიშვნელობები query სტრიქონში ჩაწერე.'],
        io: ['URL in → request options out', 'შედის URL → გამოდის მოთხოვნის პარამეტრები']
    },
    httpPost: {
        label: ['POST', 'POST'],
        category: ['HTTP method', 'HTTP მეთოდი'],
        color: 'c-info',
        short: ['Create something new', 'ქმნის ახალს'],
        long: ['POST sends a body to the server to create a new record. The body has to be a string, so you wrap your object in JSON.stringify() and tell the server what it is with a Content-Type header.',
               'POST სერვერს უგზავნის body-ს ახალი ჩანაწერის შესაქმნელად. body სტრიქონი უნდა იყოს, ამიტომ ობიექტს JSON.stringify()-ში ახვევ და Content-Type ჰედერით ეუბნები სერვერს რა არის.'],
        file: 'HTTP verb',
        code: '<span class="k">await</span> <span class="k">fetch</span>(API, {\n  method: <span class="s">\'POST\'</span>,\n  headers: { <span class="s">\'Content-Type\'</span>: <span class="s">\'application/json\'</span> },\n  body: <span class="k">JSON</span>.<span class="k">stringify</span>(newProduct)\n});',
        mistake: ['Passing the object straight as body. Without JSON.stringify() the server receives the text [object Object].',
                  'ობიექტის პირდაპირ body-ად გადაცემა. JSON.stringify()-ის გარეშე სერვერამდე მიდის ტექსტი [object Object].'],
        io: ['object in → request options out', 'შედის ობიექტი → გამოდის მოთხოვნის პარამეტრები']
    },
    httpPut: {
        label: ['PUT / PATCH', 'PUT / PATCH'],
        category: ['HTTP method', 'HTTP მეთოდი'],
        color: 'c-warning',
        short: ['Update what exists', 'ცვლის არსებულს'],
        long: ['PUT replaces a record with the full object you send; PATCH changes only the fields you include. Either way the id goes in the URL so the server knows which record you mean.',
               'PUT ჩაანაცვლებს ჩანაწერს იმ სრული ობიექტით, რომელსაც აგზავნი; PATCH ცვლის მხოლოდ იმ ველებს, რომლებსაც მიუთითებ. ორივე შემთხვევაში id URL-ში იწერება, რომ სერვერმა იცოდეს რომელ ჩანაწერზეა საუბარი.'],
        file: 'HTTP verb',
        code: '<span class="k">await</span> <span class="k">fetch</span>(<span class="s">`${API}/${id}`</span>, {\n  method: <span class="s">\'PUT\'</span>,\n  headers: { <span class="s">\'Content-Type\'</span>: <span class="s">\'application/json\'</span> },\n  body: <span class="k">JSON</span>.<span class="k">stringify</span>(updated)\n});',
        mistake: ['Sending a partial object with PUT — the missing fields can be wiped. Use PATCH for partial edits.',
                  'PUT-ით ნაწილობრივი ობიექტის გაგზავნა — დაკლებული ველები შეიძლება წაიშალოს. ნაწილობრივი ცვლილებისთვის PATCH გამოიყენე.'],
        io: ['object + id in → request options out', 'შედის ობიექტი + id → გამოდის მოთხოვნის პარამეტრები']
    },
    httpDelete: {
        label: ['DELETE', 'DELETE'],
        category: ['HTTP method', 'HTTP მეთოდი'],
        color: 'c-error',
        short: ['Remove a record', 'შლის ჩანაწერს'],
        long: ['DELETE asks the server to remove one record. Usually the id in the URL is all it needs. Update your local array afterwards, or refetch, so the screen matches the server.',
               'DELETE სთხოვს სერვერს ერთი ჩანაწერის წაშლას. ჩვეულებრივ საკმარისია URL-ში id. მერე განაახლე ლოკალური მასივი ან ხელახლა ჩამოტვირთე, რომ ეკრანი სერვერს დაემთხვეს.'],
        file: 'HTTP verb',
        code: '<span class="k">await</span> <span class="k">fetch</span>(<span class="s">`${API}/${id}`</span>, { method: <span class="s">\'DELETE\'</span> });\n<span class="c">// then drop it locally too:</span>\nitems = items.<span class="k">filter</span>(p => p.id !== id);',
        mistake: ['Removing the row from the screen before the server confirms. If the request fails the user sees a lie.',
                  'სტრიქონის ეკრანიდან მოხსნა სერვერის დადასტურებამდე. თუ მოთხოვნა ჩავარდა, მომხმარებელი ტყუილს ხედავს.'],
        io: ['id in → request options out', 'შედის id → გამოდის მოთხოვნის პარამეტრები']
    },
    tryCatch: {
        label: ['try / catch', 'try / catch'],
        category: ['Network', 'ქსელი'],
        color: 'c-warning',
        short: ['Handle the failure path', 'ამუშავებს წარუმატებლობას'],
        long: ['Networks fail, servers return 500, keys expire. try/catch keeps one broken request from breaking the whole page: catch the error, show a message, and let the user retry. Check res.ok inside, because a 404 is not an exception.',
               'ქსელი ვარდება, სერვერი აბრუნებს 500-ს, გასაღები ვადაგასულია. try/catch არ აძლევს ერთ გატეხილ მოთხოვნას მთელი გვერდის გატეხვის საშუალებას: დაიჭირე შეცდომა, აჩვენე შეტყობინება და მიეცი ხელახლა ცდის საშუალება. შიგნით res.ok-იც შეამოწმე, რადგან 404 გამონაკლისი არ არის.'],
        file: 'app.js',
        code: '<span class="k">try</span> {\n  <span class="k">const</span> res = <span class="k">await</span> <span class="k">fetch</span>(API);\n  <span class="k">if</span> (!res.ok) <span class="k">throw new</span> <span class="k">Error</span>(<span class="s">`HTTP ${res.status}`</span>);\n  <span class="k">return await</span> res.<span class="k">json</span>();\n} <span class="k">catch</span> (err) {\n  showError(err.message);\n}',
        mistake: ['Swallowing the error with an empty catch block. Silent failures are the hardest bugs to find.',
                  'შეცდომის ჩაყლაპვა ცარიელი catch-ით. მდუმარე შეცდომა ყველაზე ძნელი საპოვნელია.'],
        io: ['risky value in → value or handled error out', 'შედის სარისკო მნიშვნელობა → გამოდის მნიშვნელობა ან დამუშავებული შეცდომა']
    },
    abortCtl: {
        label: ['AbortController', 'AbortController'],
        category: ['Network', 'ქსელი'],
        color: 'c-error',
        short: ['Cancel a request in flight', 'აუქმებს გაშვებულ მოთხოვნას'],
        long: ['When the user types again, the previous search is already useless. AbortController gives you a signal you can pass to fetch and later cancel, so an old slow answer can never overwrite a newer one.',
               'როცა მომხმარებელი ხელახლა კრეფს, წინა ძებნა უკვე ზედმეტია. AbortController გაძლევს signal-ს, რომელსაც fetch-ს გადასცემ და მერე აუქმებ — ასე ძველი, ნელი პასუხი ვეღარასოდეს გადააფარებს ახალს.'],
        file: 'app.js',
        code: '<span class="k">let</span> ctrl;\n<span class="k">function</span> <span class="f">search</span>(q) {\n  ctrl?.<span class="k">abort</span>();\n  ctrl = <span class="k">new</span> <span class="k">AbortController</span>();\n  <span class="k">return</span> <span class="k">fetch</span>(url, { signal: ctrl.signal });\n}',
        mistake: ['Not catching the AbortError afterwards — a cancel looks like a crash in the console if you ignore it.',
                  'AbortError-ის დაუჭერლობა — გაუქმება კონსოლში ავარიად გამოიყურება, თუ არ დაამუშავე.'],
        io: ['request in → cancellable request out', 'შედის მოთხოვნა → გამოდის გაუქმებადი მოთხოვნა']
    },

    // ---------- Async & timing ----------
    asyncFn: {
        label: ['async function', 'async ფუნქცია'],
        category: ['Async', 'ასინქრონული'],
        color: '',
        short: ['A function allowed to wait', 'ფუნქცია, რომელსაც ლოდინი შეუძლია'],
        long: ['Marking a function async does two things: it lets you use await inside, and it makes the function itself return a Promise. That is why calling it without await gives you a Promise instead of the value.',
               'ფუნქციის async-ად მონიშვნა ორ რამეს აკეთებს: შიგნით await-ის გამოყენების უფლებას გაძლევს და თავად ფუნქციას Promise-ის დაბრუნებას აიძულებს. სწორედ ამიტომ, await-ის გარეშე გამოძახებისას მნიშვნელობის ნაცვლად Promise მიიღება.'],
        file: 'app.js',
        code: '<span class="k">async function</span> <span class="f">loadProducts</span>() {\n  <span class="k">const</span> res = <span class="k">await</span> <span class="k">fetch</span>(API);\n  <span class="k">return await</span> res.<span class="k">json</span>();\n}\n<span class="c">// loadProducts() returns a Promise</span>',
        mistake: ['Writing await at the top level of a classic script. Outside a module you need an async function around it.',
                  'await-ის ჩაწერა ჩვეულებრივი სკრიპტის ზედა დონეზე. მოდულის გარეთ მას async ფუნქცია სჭირდება.'],
        io: ['body in → Promise out', 'შედის სხეული → გამოდის Promise']
    },
    awaitOp: {
        label: ['await', 'await'],
        category: ['Async', 'ასინქრონული'],
        color: '',
        short: ['Unwrap the promise', 'ხსნის Promise-ს'],
        long: ['await pauses this function until the Promise settles, then hands you the plain value inside. The rest of the page keeps running — nothing is frozen, only this function is parked.',
               'await აჩერებს ამ ფუნქციას, სანამ Promise არ დასრულდება, და შემდეგ გაძლევს შიგნით არსებულ სუფთა მნიშვნელობას. გვერდის დანარჩენი ნაწილი მუშაობას აგრძელებს — არაფერი იყინება, მხოლოდ ეს ფუნქცია ჩერდება.'],
        file: 'app.js',
        code: '<span class="k">const</span> data = <span class="k">await</span> <span class="f">loadProducts</span>();\n<span class="c">// data is the array, not a Promise</span>',
        mistake: ['Awaiting inside a loop when the calls are independent. Promise.all() runs them at the same time and is far faster.',
                  'ციკლში await-ის გამოყენება, როცა გამოძახებები დამოუკიდებელია. Promise.all() ერთდროულად უშვებს და გაცილებით სწრაფია.'],
        io: ['Promise in → resolved value out', 'შედის Promise → გამოდის მზა მნიშვნელობა']
    },
    promiseThen: {
        label: ['.then() chain', '.then() ჯაჭვი'],
        category: ['Async', 'ასინქრონული'],
        color: '',
        short: ['The older way to wait', 'ლოდინის ძველი გზა'],
        long: ['Before async/await, every result was picked up in a callback: .then() for success, .catch() for failure. It is the exact same Promise underneath — worth reading, because most tutorials and older code still use it.',
               'async/await-მდე ყოველი შედეგი callback-ში მოდიოდა: .then() წარმატებისთვის, .catch() შეცდომისთვის. ქვეშ ზუსტად იგივე Promise-ია — წასაკითხად ღირს, რადგან ბევრი გაკვეთილი და ძველი კოდი დღესაც ასე წერს.'],
        file: 'app.js',
        code: '<span class="k">fetch</span>(API)\n  .<span class="k">then</span>(res => res.<span class="k">json</span>())\n  .<span class="k">then</span>(data => render(data))\n  .<span class="k">catch</span>(err => showError(err));',
        mistake: ['Forgetting to return inside a .then() — the next .then() then receives undefined.',
                  '.then()-ში return-ის დავიწყება — შემდეგი .then() undefined-ს იღებს.'],
        io: ['Promise in → value out (in a callback)', 'შედის Promise → გამოდის მნიშვნელობა (callback-ში)']
    },
    setTimeoutBlk: {
        label: ['setTimeout', 'setTimeout'],
        category: ['Async', 'ასინქრონული'],
        color: '',
        short: ['Run this later', 'გაუშვებს მოგვიანებით'],
        long: ['setTimeout hands a function to the browser with a note: run it after at least N milliseconds. At least — not exactly. It waits for the call stack to empty first, which is why a 0ms timeout still runs after your current code.',
               'setTimeout ფუნქციას ბრაუზერს გადასცემს შენიშვნით: გაუშვი მინიმუმ N მილიწამის შემდეგ. მინიმუმ — და არა ზუსტად. ჯერ ელოდება, სანამ სტეკი გასუფთავდება, სწორედ ამიტომ 0მწმ-იანი ტაიმერიც კი მიმდინარე კოდის შემდეგ სრულდება.'],
        file: 'app.js',
        code: '<span class="k">setTimeout</span>(() => {\n  <span class="k">console</span>.<span class="k">log</span>(<span class="s">\'later\'</span>);\n}, <span class="n">300</span>);\n<span class="k">console</span>.<span class="k">log</span>(<span class="s">\'now\'</span>); <span class="c">// prints first</span>',
        mistake: ['Calling the function instead of passing it: setTimeout(run(), 300) fires immediately. Pass run, not run().',
                  'ფუნქციის გამოძახება გადაცემის ნაცვლად: setTimeout(run(), 300) მაშინვე ეშვება. გადაეცი run და არა run().'],
        io: ['function in → same function, later', 'შედის ფუნქცია → იგივე ფუნქცია, მოგვიანებით']
    },
    debounceBlk: {
        label: ['Debounce', 'Debounce'],
        category: ['Async', 'ასინქრონული'],
        color: 'c-info',
        short: ['Wait for the typing to stop', 'ელოდება აკრეფის დასრულებას'],
        long: ['Every keystroke firing a request would mean eight requests for the word keyboard. Debounce restarts a small timer on each keystroke and only calls once the user pauses — one request instead of eight.',
               'თუ ყოველი ღილაკი მოთხოვნას გააგზავნის, სიტყვა keyboard რვა მოთხოვნას ნიშნავს. Debounce ყოველ დარტყმაზე თავიდან უშვებს პატარა ტაიმერს და მხოლოდ პაუზისას ეძახის — რვის ნაცვლად ერთი მოთხოვნა.'],
        file: 'utils.js',
        code: '<span class="k">function</span> <span class="f">debounce</span>(fn, ms = <span class="n">300</span>) {\n  <span class="k">let</span> t;\n  <span class="k">return</span> (...args) => {\n    <span class="k">clearTimeout</span>(t);\n    t = <span class="k">setTimeout</span>(() => fn(...args), ms);\n  };\n}',
        mistake: ['Creating the debounced function inside the event handler. A new timer every time means nothing is ever debounced.',
                  'debounce-ის შექმნა თავად handler-ის შიგნით. ყოველ ჯერზე ახალი ტაიმერი ნიშნავს, რომ არაფერი დებაუნსდება.'],
        io: ['many calls in → one call out', 'შედის ბევრი გამოძახება → გამოდის ერთი']
    },
    eventLoop: {
        label: ['Event loop', 'ივენთ ლუპი'],
        category: ['Async', 'ასინქრონული'],
        color: 'c-warning',
        short: ['Who runs first, and why', 'ვინ როდის სრულდება'],
        long: ['JavaScript runs one thing at a time. First all synchronous code, then every microtask (promise callbacks), then one macrotask (a timer). That order explains almost every moment of wondering why a log came out backwards.',
               'JavaScript ერთდროულად ერთ საქმეს აკეთებს. ჯერ ყველა სინქრონული კოდი, მერე ყველა microtask (promise-ის callback-ები), მერე ერთი macrotask (ტაიმერი). სწორედ ეს რიგი ხსნის თითქმის ყველა შემთხვევას, როცა ლოგი უკუღმა გამოვიდა.'],
        file: 'the runtime itself',
        code: '<span class="k">console</span>.<span class="k">log</span>(<span class="s">\'1 sync\'</span>);\n<span class="k">setTimeout</span>(() => <span class="k">console</span>.<span class="k">log</span>(<span class="s">\'3 timer\'</span>), <span class="n">0</span>);\n<span class="k">Promise</span>.<span class="k">resolve</span>().<span class="k">then</span>(() => <span class="k">console</span>.<span class="k">log</span>(<span class="s">\'2 micro\'</span>));\n<span class="c">// 1 sync → 2 micro → 3 timer</span>',
        mistake: ['Believing setTimeout(fn, 0) runs immediately. It runs after all current code and all promise callbacks.',
                  'იმის დაჯერება, რომ setTimeout(fn, 0) მაშინვე სრულდება. ის ყველა მიმდინარე კოდისა და promise-ის callback-ის შემდეგ სრულდება.'],
        io: ['tasks in → ordered execution out', 'შედის დავალებები → გამოდის შესრულების რიგი']
    },

    // ---------- Array & transform ----------
    filterOp: {
        label: ['.filter()', '.filter()'],
        category: ['Transform', 'გარდაქმნა'],
        color: 'c-info',
        short: ['Keep only what matches', 'ტოვებს მხოლოდ შესაბამისს'],
        long: ['.filter() walks the array and keeps every item for which your test returns true. It never touches the original array — you always get a new, usually shorter one back.',
               '.filter() გადის მასივზე და ტოვებს ყველა იმ ერთეულს, რომლისთვისაც შენი შემოწმება true-ს აბრუნებს. ორიგინალ მასივს არ ეხება — ყოველთვის ახალ, ჩვეულებრივ უფრო მოკლე მასივს გაძლევს.'],
        file: 'app.js',
        code: '<span class="k">const</span> available = products.<span class="k">filter</span>(p => p.inStock);\n<span class="c">// 5 items in → 3 items out</span>',
        mistake: ['Forgetting that filter returns a new array. products.filter(...) alone changes nothing — assign the result.',
                  'იმის დავიწყება, რომ filter ახალ მასივს აბრუნებს. მარტო products.filter(...) არაფერს ცვლის — შედეგი მიაკუთვნე ცვლადს.'],
        io: ['Array in → shorter Array out', 'შედის მასივი → გამოდის უფრო მოკლე მასივი']
    },
    mapOp: {
        label: ['.map()', '.map()'],
        category: ['Transform', 'გარდაქმნა'],
        color: 'c-info',
        short: ['Reshape every item', 'გარდაქმნის თითო ერთეულს'],
        long: ['.map() returns a new array of exactly the same length, where each item has been through your function. It is how raw API objects become the shape your UI actually wants — and how items become HTML strings.',
               '.map() აბრუნებს ზუსტად იმავე სიგრძის ახალ მასივს, სადაც თითო ერთეული შენს ფუნქციაშია გატარებული. სწორედ ასე იქცევა API-ის ნედლი ობიექტი იმ ფორმად, რაც შენს ინტერფეისს სჭირდება — და ასევე ასე იქცევა ერთეული HTML სტრიქონად.'],
        file: 'app.js',
        code: '<span class="k">const</span> rows = products.<span class="k">map</span>(p => ({\n  id: p.id,\n  title: p.name.<span class="k">toUpperCase</span>(),\n  price: <span class="s">`$${p.price}`</span>\n}));',
        mistake: ['Using .map() when you are not building a new array. If you only want to do something for each item, use .forEach().',
                  '.map()-ის გამოყენება მაშინ, როცა ახალ მასივს არ აწყობ. თუ უბრალოდ თითოეულზე რაღაცის გაკეთება გინდა, გამოიყენე .forEach().'],
        io: ['Array in → same-length Array out', 'შედის მასივი → გამოდის იმავე სიგრძის მასივი']
    },
    sortOp: {
        label: ['.sort()', '.sort()'],
        category: ['Transform', 'გარდაქმნა'],
        color: 'c-warning',
        short: ['Put items in order', 'ალაგებს რიგზე'],
        long: ['.sort() orders the array using your compare function: return a negative number to put a first, positive to put b first. Note that it changes the array in place, so copy it first with a spread if the original matters.',
               '.sort() ალაგებს მასივს შენი შესადარებელი ფუნქციით: დააბრუნე უარყოფითი რიცხვი, თუ a უნდა იყოს წინ, დადებითი — თუ b. გაითვალისწინე, რომ თავად მასივს ცვლის, ამიტომ ჯერ დააკოპირე spread-ით, თუ ორიგინალი გჭირდება.'],
        file: 'app.js',
        code: '<span class="k">const</span> cheapest = [...products].<span class="k">sort</span>(\n  (a, b) => a.price - b.price\n);',
        mistake: ['Calling .sort() with no compare function on numbers. It sorts them as text, so 100 comes before 25.',
                  'რიცხვებზე .sort()-ის გამოძახება შესადარებელი ფუნქციის გარეშე. ის ტექსტად ალაგებს, ამიტომ 100 ხვდება 25-ის წინ.'],
        io: ['Array in → reordered Array out', 'შედის მასივი → გამოდის გადალაგებული მასივი']
    },
    reduceOp: {
        label: ['.reduce()', '.reduce()'],
        category: ['Transform', 'გარდაქმნა'],
        color: 'c-info',
        short: ['Many values into one', 'ბევრიდან ერთი'],
        long: ['.reduce() folds an array down to a single value: a total, an average, a grouped object. You carry an accumulator from item to item and return the new accumulator each time.',
               '.reduce() მასივს ერთ მნიშვნელობამდე კრებს: ჯამი, საშუალო, დაჯგუფებული ობიექტი. აკუმულატორს ერთეულიდან ერთეულში გადაატარებ და ყოველ ჯერზე ახალ აკუმულატორს აბრუნებ.'],
        file: 'app.js',
        code: '<span class="k">const</span> total = products.<span class="k">reduce</span>(\n  (sum, p) => sum + p.price,\n  <span class="n">0</span>\n);',
        mistake: ['Leaving out the starting value. On an empty array reduce then throws instead of giving you 0.',
                  'საწყისი მნიშვნელობის გამოტოვება. ცარიელ მასივზე reduce მაშინ შეცდომას აგდებს, 0-ის ნაცვლად.'],
        io: ['Array in → one value out', 'შედის მასივი → გამოდის ერთი მნიშვნელობა']
    },
    findOp: {
        label: ['.find()', '.find()'],
        category: ['Transform', 'გარდაქმნა'],
        color: '',
        short: ['Get the first match', 'პოულობს პირველ დამთხვევას'],
        long: ['.find() returns the first item that matches, not an array — perfect for looking one record up by id. If nothing matches you get undefined, so check before using it.',
               '.find() აბრუნებს პირველ დამთხვევას და არა მასივს — იდეალურია ერთი ჩანაწერის id-ით მოსაძებნად. თუ ვერაფერს იპოვის, undefined-ს იღებ, ამიტომ გამოყენებამდე შეამოწმე.'],
        file: 'app.js',
        code: '<span class="k">const</span> item = products.<span class="k">find</span>(p => p.id === id);\n<span class="k">if</span> (!item) <span class="k">return</span> showNotFound();',
        mistake: ['Using .find() when you want every match. That is .filter() — find stops at the first hit.',
                  '.find()-ის გამოყენება მაშინ, როცა ყველა დამთხვევა გინდა. ამისთვის .filter()-ია — find პირველზე ჩერდება.'],
        io: ['Array in → one object (or undefined) out', 'შედის მასივი → გამოდის ერთი ობიექტი (ან undefined)']
    },
    destructure: {
        label: ['Destructuring', 'დესტრუქტურიზაცია'],
        category: ['Transform', 'გარდაქმნა'],
        color: '',
        short: ['Pull fields out by name', 'იღებს ველებს სახელით'],
        long: ['Destructuring unpacks the fields you need into their own variables in one line. It works on objects, arrays and function parameters, and you can give a default for anything that might be missing.',
               'დესტრუქტურიზაცია ერთ სტრიქონში გამოაქვს საჭირო ველები ცალკე ცვლადებად. მუშაობს ობიექტზე, მასივზე და ფუნქციის პარამეტრზეც, და შეგიძლია ნაგულისხმევი მნიშვნელობა მისცე იმას, რაც შეიძლება არ იყოს.'],
        file: 'app.js',
        code: '<span class="k">const</span> { name, price = <span class="n">0</span> } = product;\n<span class="k">const</span> [first, ...rest] = products;',
        mistake: ['Destructuring from something that might be undefined. Guard it first, or the page throws on load.',
                  'დესტრუქტურიზაცია იმისგან, რაც შეიძლება undefined იყოს. ჯერ დაიცავი, თორემ გვერდი ჩატვირთვისას გაიჭედება.'],
        io: ['object in → named values out', 'შედის ობიექტი → გამოდის დასახელებული მნიშვნელობები']
    },
    spreadOp: {
        label: ['Spread / copy', 'Spread / კოპირება'],
        category: ['Transform', 'გარდაქმნა'],
        color: '',
        short: ['Copy instead of mutate', 'ცვლილების ნაცვლად კოპირება'],
        long: ['The three dots copy an array or object into a new one, so you can add an item or change a field without touching the original. This is the habit every framework will expect from you later.',
               'სამი წერტილი მასივს ან ობიექტს ახალში აკოპირებს, რომ ერთეული დაამატო ან ველი შეცვალო ორიგინალის შეხების გარეშე. სწორედ ეს ჩვევა მოგთხოვს მოგვიანებით ნებისმიერი ფრეიმვორკი.'],
        file: 'app.js',
        code: '<span class="k">const</span> next = [...products, newProduct];\n<span class="k">const</span> patched = { ...product, price: <span class="n">99</span> };',
        mistake: ['Assuming the copy is deep. Nested objects are still shared — change one and both see it.',
                  'იმის ვარაუდი, რომ კოპირება ღრმაა. ჩადგმული ობიექტები კვლავ საერთოა — ერთს შეცვლი და ორივე შეიცვლება.'],
        io: ['Array in → new Array (+1 item) out', 'შედის მასივი → გამოდის ახალი მასივი (+1 ერთეული)']
    },
    templateLit: {
        label: ['Template string', 'შაბლონური სტრიქონი'],
        category: ['Transform', 'გარდაქმნა'],
        color: 'c-success',
        short: ['Build the HTML text', 'აწყობს HTML ტექსტს'],
        long: ['Backticks let you write multi-line text with values dropped in through ${...}. Combined with .map() and .join(), that is how an array of data becomes one string of HTML ready for the DOM.',
               'ბექთიქები საშუალებას გაძლევს დაწერო მრავალსტრიქონიანი ტექსტი და შიგნით ${...}-ით ჩასვა მნიშვნელობები. .map()-სა და .join()-თან ერთად სწორედ ასე იქცევა მონაცემთა მასივი ერთ HTML სტრიქონად, DOM-ისთვის მზად.'],
        file: 'app.js',
        code: '<span class="k">const</span> html = products.<span class="k">map</span>(p => <span class="s">`\n  &lt;li class="row"&gt;\n    &lt;b&gt;${p.name}&lt;/b&gt; — $${p.price}\n  &lt;/li&gt;`</span>).<span class="k">join</span>(<span class="s">\'\'</span>);',
        mistake: ['Forgetting .join(""). Without it the array is stringified with commas between every row.',
                  '.join("")-ის დავიწყება. მის გარეშე მასივი მძიმეებით გადაიქცევა სტრიქონად და მძიმეები ეკრანზე გამოჩნდება.'],
        io: ['Array in → HTML string out', 'შედის მასივი → გამოდის HTML სტრიქონი']
    },

    // ---------- State & storage ----------
    stateObj: {
        label: ['State object', 'State ობიექტი'],
        category: ['State', 'მდგომარეობა'],
        color: '',
        short: ['One place that holds the truth', 'ერთი ადგილი, სადაც სიმართლეა'],
        long: ['Keep everything the screen depends on in one object: the items, whether you are loading, the last error, the current filter. Change the state, then re-render from it. Never let the DOM be the place your data lives.',
               'ყველაფერი, რაზეც ეკრანია დამოკიდებული, ერთ ობიექტში შეინახე: ერთეულები, იტვირთება თუ არა, ბოლო შეცდომა, მიმდინარე ფილტრი. შეცვალე state და მერე მისგან გადახატე. არასოდეს დაუშვა, რომ შენი მონაცემი DOM-ში ცხოვრობდეს.'],
        file: 'state.js',
        code: '<span class="k">const</span> state = {\n  items: [],\n  loading: <span class="k">false</span>,\n  error: <span class="k">null</span>\n};',
        mistake: ['Reading values back out of the DOM (innerText) instead of from state. The DOM is the output, not the source.',
                  'მნიშვნელობების DOM-იდან (innerText) წაკითხვა state-ის ნაცვლად. DOM შედეგია და არა წყარო.'],
        io: ['data in → state object out', 'შედის მონაცემი → გამოდის state ობიექტი']
    },
    closureBlk: {
        label: ['Closure / module', 'ჩაკეტვა (closure)'],
        category: ['State', 'მდგომარეობა'],
        color: '',
        short: ['Private variables that survive', 'პრივატული ცვლადები, რომლებიც რჩება'],
        long: ['A function returned from another function still remembers the variables around it. That is a closure — the basis of private counters, caches, debounce timers, and every module pattern written before ES modules existed.',
               'ფუნქცია, რომელიც სხვა ფუნქციამ დააბრუნა, კვლავ ახსოვს გარშემო არსებული ცვლადები. ეს არის closure — პრივატული მრიცხველების, ქეშის, debounce-ის ტაიმერებისა და ყველა იმ მოდულის საფუძველი, რაც ES მოდულებამდე იწერებოდა.'],
        file: 'utils.js',
        code: '<span class="k">function</span> <span class="f">createCounter</span>() {\n  <span class="k">let</span> n = <span class="n">0</span>;           <span class="c">// private</span>\n  <span class="k">return</span> () => ++n;\n}\n<span class="k">const</span> next = <span class="f">createCounter</span>();',
        mistake: ['Capturing a loop variable declared with var. Use let, or every closure sees the final value.',
                  'var-ით გამოცხადებული ციკლის ცვლადის დაჭერა. გამოიყენე let, თორემ ყველა closure საბოლოო მნიშვნელობას დაინახავს.'],
        io: ['value in → function that remembers it', 'შედის მნიშვნელობა → გამოდის ფუნქცია, რომელსაც ის ახსოვს']
    },
    saveLocal: {
        label: ['Save to storage', 'შენახვა საცავში'],
        category: ['State', 'მდგომარეობა'],
        color: 'c-success',
        short: ['Persist across refreshes', 'რჩება განახლების შემდეგაც'],
        long: ['localStorage.setItem() writes a string under a key. Objects and arrays must be stringified first. Save after every state change and your app remembers where the user left off.',
               'localStorage.setItem() წერს სტრიქონს გასაღების ქვეშ. ობიექტი და მასივი ჯერ სტრიქონად უნდა აქციო. შეინახე ყოველი ცვლილების შემდეგ და აპლიკაციას ემახსოვრება, სად შეჩერდა მომხმარებელი.'],
        file: 'storage.js',
        code: 'localStorage.<span class="k">setItem</span>(\n  <span class="s">\'products\'</span>,\n  <span class="k">JSON</span>.<span class="k">stringify</span>(state.items)\n);',
        mistake: ['Storing tokens or personal data there. Any script on the page can read localStorage.',
                  'ტოკენების ან პირადი მონაცემის იქ შენახვა. გვერდზე არსებულ ნებისმიერ სკრიპტს შეუძლია localStorage-ის წაკითხვა.'],
        io: ['object in → JSON string saved', 'შედის ობიექტი → ინახება JSON სტრიქონი']
    },

    // ---------- DOM & events ----------
    querySel: {
        label: ['querySelector', 'querySelector'],
        category: ['DOM', 'DOM'],
        color: '',
        short: ['Find the element', 'პოულობს ელემენტს'],
        long: ['document.querySelector() takes any CSS selector and gives you the first matching element, or null. querySelectorAll() gives you all of them. This is your handle on the page — grab it once and keep it in a variable.',
               'document.querySelector() იღებს ნებისმიერ CSS სელექტორს და გაძლევს პირველ დამთხვევას ან null-ს. querySelectorAll() ყველას გაძლევს. ეს არის შენი სახელური გვერდზე — აიღე ერთხელ და ცვლადში შეინახე.'],
        file: 'app.js',
        code: '<span class="k">const</span> list = document.<span class="k">querySelector</span>(<span class="s">\'#list\'</span>);\n<span class="k">const</span> rows = document.<span class="k">querySelectorAll</span>(<span class="s">\'.row\'</span>);',
        mistake: ['Running the script before the element exists. Put the script at the end of body, or use defer.',
                  'სკრიპტის გაშვება ელემენტის არსებობამდე. დადე სკრიპტი body-ს ბოლოში, ან გამოიყენე defer.'],
        io: ['selector in → element out', 'შედის სელექტორი → გამოდის ელემენტი']
    },
    createEl: {
        label: ['createElement', 'createElement'],
        category: ['DOM', 'DOM'],
        color: '',
        short: ['Build a node in memory', 'ქმნის კვანძს მეხსიერებაში'],
        long: ['createElement() makes a real element object that is not on the page yet. Set its textContent and classes, then append it. Safer than innerHTML because text stays text and can never turn into markup.',
               'createElement() ქმნის ნამდვილ ელემენტს, რომელიც ჯერ გვერდზე არ არის. მიეცი textContent და კლასები, მერე დაამატე. innerHTML-ზე უსაფრთხოა, რადგან ტექსტი ტექსტად რჩება და ვერასოდეს იქცევა მარკაპად.'],
        file: 'app.js',
        code: '<span class="k">const</span> li = document.<span class="k">createElement</span>(<span class="s">\'li\'</span>);\nli.textContent = product.name;\nli.classList.<span class="k">add</span>(<span class="s">\'row\'</span>);',
        mistake: ['Creating the element and never appending it. Nothing appears until it is attached to the document.',
                  'ელემენტის შექმნა და დაუმატებლობა. სანამ დოკუმენტს არ მიაბამ, არაფერი გამოჩნდება.'],
        io: ['tag name in → detached element out', 'შედის ტეგის სახელი → გამოდის მიუბმელი ელემენტი']
    },
    appendChildBlk: {
        label: ['append / fragment', 'append / ფრაგმენტი'],
        category: ['DOM', 'DOM'],
        color: '',
        short: ['Attach nodes to the page', 'ამატებს კვანძებს გვერდზე'],
        long: ['append() puts your nodes into the document — that is the moment they become visible. When you add many rows, build them into a DocumentFragment first and append once, so the browser lays out the page a single time.',
               'append() ათავსებს კვანძებს დოკუმენტში — სწორედ მაშინ ხდებიან ხილული. როცა ბევრ სტრიქონს ამატებ, ჯერ DocumentFragment-ში აწყვე და ერთხელ დაამატე, რომ ბრაუზერმა გვერდი ერთხელ გადათვალოს.'],
        file: 'app.js',
        code: '<span class="k">const</span> frag = document.<span class="k">createDocumentFragment</span>();\nitems.<span class="k">forEach</span>(p => frag.<span class="k">append</span>(<span class="f">row</span>(p)));\nlist.<span class="k">append</span>(frag); <span class="c">// one repaint</span>',
        mistake: ['Appending inside a loop straight to the document. Each append can force a fresh layout.',
                  'ციკლში პირდაპირ დოკუმენტში დამატება. ყოველი append-ი შეიძლება ახალ გადათვლას იწვევდეს.'],
        io: ['elements in → attached DOM out', 'შედის ელემენტები → გამოდის მიბმული DOM']
    },
    renderDom: {
        label: ['Render to DOM', 'DOM-ში ჩაწერა'],
        category: ['DOM', 'DOM'],
        color: 'c-success',
        short: ['Put the HTML on the page', 'ათავსებს HTML-ს გვერდზე'],
        long: ['Assigning innerHTML replaces everything inside the container with your string in one step. It is the fastest way to see results — just never build it from text a user typed without escaping it first.',
               'innerHTML-ის მინიჭება კონტეინერის მთელ შიგთავსს ერთ ბიჯში ცვლის შენი სტრიქონით. შედეგის სანახავად ყველაზე სწრაფი გზაა — უბრალოდ არასოდეს ააწყო ის მომხმარებლის აკრეფილი ტექსტისგან ეკრანირების გარეშე.'],
        file: 'app.js',
        code: 'document.<span class="k">querySelector</span>(<span class="s">\'#list\'</span>).innerHTML = html;\n<span class="c">// one assignment, whole list on screen</span>',
        mistake: ['Injecting user text with innerHTML. That is how XSS gets in — use textContent for anything a person typed.',
                  'მომხმარებლის ტექსტის innerHTML-ით ჩასმა. სწორედ ასე შემოდის XSS — ადამიანის აკრეფილისთვის textContent გამოიყენე.'],
        io: ['HTML string in → live DOM out', 'შედის HTML სტრიქონი → გამოდის ცოცხალი DOM']
    },
    eventListener: {
        label: ['addEventListener', 'addEventListener'],
        category: ['Events', 'ივენთები'],
        color: 'c-warning',
        short: ['React to what the user does', 'რეაგირებს მომხმარებელზე'],
        long: ['addEventListener attaches a function that the browser calls when something happens: click, input, submit, keydown. The event object it passes tells you what happened and to which element.',
               'addEventListener აბამს ფუნქციას, რომელსაც ბრაუზერი გამოიძახებს, როცა რაღაც მოხდება: click, input, submit, keydown. გადმოცემული event ობიექტი გეუბნება რა მოხდა და რომელ ელემენტზე.'],
        file: 'app.js',
        code: 'btn.<span class="k">addEventListener</span>(<span class="s">\'click\'</span>, (e) => {\n  state.count++;\n  <span class="f">render</span>();\n});',
        mistake: ['Re-attaching the same listener after every render. They stack up and one click fires the handler five times.',
                  'ერთი და იმავე listener-ის ხელახლა მიბმა ყოველი გადახატვის შემდეგ. ისინი გროვდება და ერთი დაწკაპუნება handler-ს ხუთჯერ უშვებს.'],
        io: ['user action in → event object out', 'შედის მომხმარებლის ქმედება → გამოდის event ობიექტი']
    },
    delegation: {
        label: ['Event delegation', 'ივენთის დელეგირება'],
        category: ['Events', 'ივენთები'],
        color: 'c-warning',
        short: ['One listener for every row', 'ერთი listener ყველა სტრიქონზე'],
        long: ['Instead of a listener per row, put one on the container and read event.target. It keeps working for rows added later, and it is a single function instead of five hundred.',
               'თითო სტრიქონზე listener-ის ნაცვლად, დაამატე ერთი კონტეინერზე და წაიკითხე event.target. ის მუშაობს მოგვიანებით დამატებულ სტრიქონებზეც და ხუთასის ნაცვლად ერთი ფუნქციაა.'],
        file: 'app.js',
        code: 'list.<span class="k">addEventListener</span>(<span class="s">\'click\'</span>, (e) => {\n  <span class="k">const</span> row = e.target.<span class="k">closest</span>(<span class="s">\'[data-id]\'</span>);\n  <span class="k">if</span> (!row) <span class="k">return</span>;\n  <span class="f">remove</span>(<span class="k">Number</span>(row.dataset.id));\n});',
        mistake: ['Reading e.target directly when the click landed on an icon inside the row. Use closest() to walk up.',
                  'e.target-ის პირდაპირ წაკითხვა, როცა დაწკაპუნება სტრიქონში მოთავსებულ ხატულაზე მოხვდა. გამოიყენე closest(), რომ ზემოთ ახვიდე.'],
        io: ['click on container in → target row out', 'შედის დაწკაპუნება კონტეინერზე → გამოდის შესაბამისი სტრიქონი']
    },
    formSubmit: {
        label: ['Form submit', 'ფორმის გაგზავნა'],
        category: ['Events', 'ივენთები'],
        color: 'c-warning',
        short: ['Collect and validate the form', 'აგროვებს და ამოწმებს ფორმას'],
        long: ['Listen for submit on the form, not click on the button — that way Enter works too. Call preventDefault() to stop the page reloading, then read the values with FormData and validate before sending.',
               'დაუსმინე submit-ს ფორმაზე და არა click-ს ღილაკზე — ასე Enter-იც იმუშავებს. გამოიძახე preventDefault(), რომ გვერდი არ გადაიტვირთოს, მერე წაიკითხე მნიშვნელობები FormData-თი და გაგზავნამდე შეამოწმე.'],
        file: 'app.js',
        code: 'form.<span class="k">addEventListener</span>(<span class="s">\'submit\'</span>, (e) => {\n  e.<span class="k">preventDefault</span>();\n  <span class="k">const</span> data = <span class="k">Object</span>.<span class="k">fromEntries</span>(<span class="k">new</span> <span class="k">FormData</span>(form));\n  <span class="f">save</span>(data);\n});',
        mistake: ['Forgetting preventDefault(). The browser reloads the page and your JavaScript never gets to run.',
                  'preventDefault()-ის დავიწყება. ბრაუზერი გვერდს გადატვირთავს და შენი JavaScript საერთოდ ვერ შესრულდება.'],
        io: ['submit event in → form values object out', 'შედის submit → გამოდის ფორმის მნიშვნელობების ობიექტი']
    },
    classToggle: {
        label: ['classList toggle', 'classList toggle'],
        category: ['DOM', 'DOM'],
        color: '',
        short: ['Change how it looks', 'ცვლის იერსახეს'],
        long: ['Do not write inline styles from JavaScript. Toggle a class and let CSS decide what that class means — that keeps the look in the stylesheet and the logic in the script.',
               'ნუ დაწერ inline სტილებს JavaScript-იდან. გადართე კლასი და CSS-ს მიანდე გადაწყვეტა, რას ნიშნავს ეს კლასი — ასე იერსახე სტილების ფაილში რჩება, ლოგიკა კი სკრიპტში.'],
        file: 'app.js + style.css',
        code: 'row.classList.<span class="k">toggle</span>(<span class="s">\'is-active\'</span>, isActive);\nbtn.classList.<span class="k">add</span>(<span class="s">\'is-loading\'</span>);',
        mistake: ['Overwriting className and wiping the classes that were already there. Use classList.add / remove.',
                  'className-ის გადაწერა და უკვე არსებული კლასების წაშლა. გამოიყენე classList.add / remove.'],
        io: ['element + flag in → styled element out', 'შედის ელემენტი + ალამი → გამოდის დასტილული ელემენტი']
    },

    // ---------- Modules ----------
    exportBlk: {
        label: ['export', 'export'],
        category: ['Modules', 'მოდულები'],
        color: '',
        short: ['Share it with other files', 'აზიარებს სხვა ფაილებთან'],
        long: ['Each file is its own scope. Nothing leaves it unless you export it — which is exactly what keeps a big project from turning into one pile of global variables.',
               'თითო ფაილს თავისი სფერო აქვს. იქიდან არაფერი გამოდის, სანამ არ დააექსპორტებ — სწორედ ეს იცავს დიდ პროექტს გლობალური ცვლადების გროვად ქცევისგან.'],
        file: 'api.js',
        code: '<span class="k">export const</span> API = <span class="s">\'/api/products\'</span>;\n<span class="k">export async function</span> <span class="f">getAll</span>() { ... }\n<span class="k">export default</span> ProductStore;',
        mistake: ['Mixing default and named exports carelessly, then importing with the wrong syntax and getting undefined.',
                  'default და named ექსპორტების უწესრიგო შერევა, მერე არასწორი სინტაქსით იმპორტი და undefined.'],
        io: ['value in → exported binding out', 'შედის მნიშვნელობა → გამოდის ექსპორტირებული სახელი']
    },
    importBlk: {
        label: ['import', 'import'],
        category: ['Modules', 'მოდულები'],
        color: '',
        short: ['Use code from another file', 'იყენებს კოდს სხვა ფაილიდან'],
        long: ['import pulls a named export in by name and a default export under any name you like. Remember the script tag needs type="module", and modules only load over http, not from a file:// path.',
               'import შემოაქვს named ექსპორტი სახელით, default ექსპორტი კი ნებისმიერი სახელით. გახსოვდეს, script-ს სჭირდება type="module", და მოდულები მხოლოდ http-ზე იტვირთება, არა file:// მისამართიდან.'],
        file: 'app.js',
        code: '<span class="k">import</span> { getAll, API } <span class="k">from</span> <span class="s">\'./api.js\'</span>;\n<span class="k">import</span> Store <span class="k">from</span> <span class="s">\'./store.js\'</span>;',
        mistake: ['Leaving off the .js extension in the browser. Bundlers forgive it; plain browsers do not.',
                  'ბრაუზერში .js გაფართოების გამოტოვება. ბანდლერი გაპატიებს, სუფთა ბრაუზერი — არა.'],
        io: ['module path in → exported value out', 'შედის მოდულის გზა → გამოდის ექსპორტირებული მნიშვნელობა']
    },

    // ---------- Output ----------
    consoleLog: {
        label: ['console.log', 'console.log'],
        category: ['Output', 'შედეგი'],
        color: '',
        short: ['Look at the value', 'დაათვალიერე მნიშვნელობა'],
        long: ['The fastest debugger you have. Log the value, not a guess about it — and log a label with it so you know which log is which. console.table() is excellent for arrays of objects.',
               'ყველაზე სწრაფი დამხმარე, რაც გაქვს. დალოგე თავად მნიშვნელობა და არა ვარაუდი მასზე — და თან წარწერაც გააყოლე, რომ იცოდე რომელი ლოგია. console.table() მშვენივრად გამოდგება ობიექტების მასივისთვის.'],
        file: 'anywhere',
        code: '<span class="k">console</span>.<span class="k">log</span>(<span class="s">\'products:\'</span>, products);\n<span class="k">console</span>.<span class="k">table</span>(products);',
        mistake: ['Logging an object and reading it much later. The console shows a live reference — it may already have changed.',
                  'ობიექტის დალოგვა და გვიან წაკითხვა. კონსოლი ცოცხალ მიმართვას აჩვენებს — ის შეიძლება უკვე შეცვლილი იყოს.'],
        io: ['any value in → same value out', 'შედის ნებისმიერი მნიშვნელობა → იგივე გამოდის']
    },
    browser: {
        label: ['Browser screen', 'ბრაუზერის ეკრანი'],
        category: ['Output', 'შედეგი'],
        color: 'c-success',
        short: ['What the user finally sees', 'რასაც მომხმარებელი ხედავს'],
        long: ['The end of the journey: the browser paints the DOM you built. Everything before this block existed only in memory — this is the first moment a person can actually see your data.',
               'მოგზაურობის დასასრული: ბრაუზერი ხატავს შენს აწყობილ DOM-ს. ამ ბლოკამდე ყველაფერი მხოლოდ მეხსიერებაში არსებობდა — ეს არის პირველი წამი, როცა ადამიანი ნამდვილად ხედავს შენს მონაცემს.'],
        file: 'Chrome · Firefox · Safari',
        code: '<span class="c">&lt;!-- painted DOM --&gt;</span>\n&lt;li class=<span class="s">"row"</span>&gt;\n  &lt;b&gt;Laptop&lt;/b&gt; — $1200\n&lt;/li&gt;',
        mistake: ['Blaming the browser for a blank page. Open the console first — it is almost always one thrown error above.',
                  'ცარიელ გვერდში ბრაუზერის დადანაშაულება. ჯერ კონსოლი გახსენი — თითქმის ყოველთვის ერთი შეცდომაა ზემოთ.'],
        io: ['DOM in → pixels out', 'შედის DOM → გამოდის პიქსელები']
    },

    // ---------- Sub-blocks (inside a block) ----------
    'sub.param': {
        label: ['Parameter', 'პარამეტრი'], category: ['Function', 'ფუნქცია'], color: '',
        short: ['Value passed in', 'შემოსული მნიშვნელობა'],
        long: ['Parameters are the inputs of a function. Give them defaults so a missing argument does not become undefined halfway through your logic.',
               'პარამეტრები ფუნქციის შესასვლელია. მიეცი ნაგულისხმევი მნიშვნელობები, რომ დაკლებული არგუმენტი შუა ლოგიკაში undefined-ად არ იქცეს.'],
        file: 'function signature',
        code: '<span class="k">function</span> <span class="f">render</span>(items = [], target = <span class="s">\'#list\'</span>) { ... }',
        mistake: ['Relying on argument order in long signatures. Pass an options object instead.',
                  'გრძელ ხელწერაში არგუმენტების რიგზე დაყრდნობა. სჯობს გადასცე options ობიექტი.'],
        io: ['argument in → local variable out', 'შედის არგუმენტი → გამოდის ლოკალური ცვლადი']
    },
    'sub.return': {
        label: ['return', 'return'], category: ['Function', 'ფუნქცია'], color: '',
        short: ['Hand the value back', 'აბრუნებს მნიშვნელობას'],
        long: ['return ends the function and passes the value to whoever called it. A function without return gives back undefined — the source of a great many silent bugs.',
               'return ასრულებს ფუნქციას და მნიშვნელობას გამომძახებელს გადასცემს. return-ის გარეშე ფუნქცია undefined-ს აბრუნებს — ბევრი მდუმარე შეცდომის სათავე.'],
        file: 'function body',
        code: '<span class="k">return</span> items.<span class="k">filter</span>(p => p.inStock);',
        mistake: ['Putting return on its own line before the value. Automatic semicolons turn it into return undefined.',
                  'return-ის ცალკე სტრიქონზე დაწერა მნიშვნელობამდე. ავტომატური წერტილმძიმე მას return undefined-ად აქცევს.'],
        io: ['value in → caller receives it', 'შედის მნიშვნელობა → იღებს გამომძახებელი']
    },
    'sub.ifCheck': {
        label: ['if / guard', 'if / დაცვა'], category: ['Logic', 'ლოგიკა'], color: '',
        short: ['Stop early when wrong', 'ჩერდება ადრე, თუ არასწორია'],
        long: ['A guard clause checks the bad case first and returns immediately. It keeps the happy path flat and readable instead of nested five levels deep.',
               'დამცავი პირობა ჯერ ცუდ შემთხვევას ამოწმებს და მაშინვე ბრუნდება. ასე მთავარი გზა ბრტყელი და წასაკითხი რჩება, ხუთ დონეზე ჩადგმულის ნაცვლად.'],
        file: 'function body',
        code: '<span class="k">if</span> (!items?.length) <span class="k">return</span> <span class="f">showEmpty</span>();',
        mistake: ['Checking truthiness when 0 or an empty string is valid. Compare to null or undefined explicitly.',
                  'ჭეშმარიტების შემოწმება, როცა 0 ან ცარიელი სტრიქონი დასაშვებია. შეადარე პირდაპირ null-ს ან undefined-ს.'],
        io: ['value in → value or early exit', 'შედის მნიშვნელობა → გამოდის ის ან ადრეული გამოსვლა']
    },
    'sub.loop': {
        label: ['for...of loop', 'for...of ციკლი'], category: ['Logic', 'ლოგიკა'], color: '',
        short: ['Walk the items', 'გადის ერთეულებზე'],
        long: ['for...of reads each item directly, with no index bookkeeping. Use it when you need await inside the loop, where .forEach() would not wait for you.',
               'for...of თითო ერთეულს პირდაპირ კითხულობს, ინდექსის თვალყურის დევნების გარეშე. გამოიყენე მაშინ, როცა ციკლში await გჭირდება — .forEach() შენს ლოდინს არ დაელოდება.'],
        file: 'function body',
        code: '<span class="k">for</span> (<span class="k">const</span> p <span class="k">of</span> products) {\n  <span class="k">await</span> <span class="f">save</span>(p);\n}',
        mistake: ['Using await inside .forEach(). The callback is async but forEach never awaits it.',
                  '.forEach()-ში await-ის გამოყენება. callback ასინქრონულია, მაგრამ forEach მას არ ელოდება.'],
        io: ['Array in → one item at a time', 'შედის მასივი → გამოდის თითო ერთეული']
    },
    'sub.callback': {
        label: ['Callback', 'Callback'], category: ['Function', 'ფუნქცია'], color: '',
        short: ['A function given to a function', 'ფუნქცია, გადაცემული ფუნქციას'],
        long: ['Passing a function as an argument lets the other code decide when to run it. Every event handler, every .map() and every .then() is exactly this idea.',
               'ფუნქციის არგუმენტად გადაცემა სხვა კოდს აძლევს გადაწყვეტის უფლებას, როდის გაუშვას. ყოველი ივენთ-ჰენდლერი, ყოველი .map() და ყოველი .then() სწორედ ეს იდეაა.'],
        file: 'anywhere',
        code: 'items.<span class="k">forEach</span>(<span class="f">printRow</span>);   <span class="c">// pass it</span>\nitems.<span class="k">forEach</span>(<span class="f">printRow</span>()); <span class="c">// calls it — wrong</span>',
        mistake: ['Adding parentheses and calling it immediately instead of passing the function itself.',
                  'ფრჩხილების დამატება და მაშინვე გამოძახება, თავად ფუნქციის გადაცემის ნაცვლად.']
    },
    'sub.arrow': {
        label: ['Arrow function', 'ისრიანი ფუნქცია'], category: ['Function', 'ფუნქცია'], color: '',
        short: ['Short function syntax', 'ფუნქციის მოკლე ჩანაწერი'],
        long: ['Arrow functions are compact and, unlike normal functions, they keep the surrounding this. That is why they are the safe choice inside class methods and callbacks.',
               'ისრიანი ფუნქციები კომპაქტურია და, ჩვეულებრივისგან განსხვავებით, გარშემო არსებულ this-ს ინარჩუნებს. სწორედ ამიტომ არის ის უსაფრთხო არჩევანი კლასის მეთოდებსა და callback-ებში.'],
        file: 'anywhere',
        code: '<span class="k">const</span> total = ps => ps.<span class="k">reduce</span>((s, p) => s + p.price, <span class="n">0</span>);',
        mistake: ['Wrapping a returned object without parentheses. p => ({ id: p.id }) — the braces need them.',
                  'დაბრუნებული ობიექტის ფრჩხილების გარეშე დაწერა. p => ({ id: p.id }) — ფიგურულ ფრჩხილებს მრგვალი სჭირდება.']
    },
    'sub.tryBlock': {
        label: ['try block', 'try ბლოკი'], category: ['Errors', 'შეცდომები'], color: '',
        short: ['The risky part', 'სარისკო ნაწილი'],
        long: ['Put only the code that can realistically fail inside try. A huge try block hides where the problem actually came from.',
               'try-ში მხოლოდ ის კოდი ჩადე, რომელიც რეალურად შეიძლება ჩავარდეს. უზარმაზარი try ბლოკი მალავს, საიდან წამოვიდა პრობლემა.'],
        file: 'function body',
        code: '<span class="k">try</span> {\n  <span class="k">const</span> res = <span class="k">await</span> <span class="k">fetch</span>(url);\n}',
        mistake: ['Wrapping the whole function so a typo in render() looks like a network error.',
                  'მთელი ფუნქციის შეხვევა — მერე render()-ში დაშვებული შეცდომა ქსელის შეცდომად გამოიყურება.']
    },
    'sub.catchBlock': {
        label: ['catch block', 'catch ბლოკი'], category: ['Errors', 'შეცდომები'], color: 'c-error',
        short: ['What to do when it fails', 'რა გააკეთო ჩავარდნისას'],
        long: ['catch receives the error. Do something with it the user can see — a message, a retry button — and log the real error for yourself.',
               'catch იღებს შეცდომას. გააკეთე მასთან ის, რასაც მომხმარებელი დაინახავს — შეტყობინება, ხელახლა ცდის ღილაკი — და ნამდვილი შეცდომა შენთვის დალოგე.'],
        file: 'function body',
        code: '<span class="k">catch</span> (err) {\n  state.error = err.message;\n  <span class="f">render</span>();\n}',
        mistake: ['Showing the raw error text to users. Log the detail, show a sentence they can act on.',
                  'ნედლი შეცდომის ტექსტის ჩვენება მომხმარებელს. დეტალი დალოგე, აჩვენე კი წინადადება, რომელზეც რეაგირება შეუძლია.']
    },
    'sub.headers': {
        label: ['headers object', 'headers ობიექტი'], category: ['Request', 'მოთხოვნა'], color: 'c-warning',
        short: ['Extra info about the request', 'დამატებითი ინფორმაცია მოთხოვნაზე'],
        long: ['Headers travel alongside the body and describe the request: what format you are sending, what you accept back, and who you are.',
               'ჰედერები body-ის გვერდით მიდის და აღწერს მოთხოვნას: რა ფორმატს აგზავნი, რას იღებ პასუხად და ვინ ხარ.'],
        file: 'fetch options',
        code: 'headers: {\n  <span class="s">\'Content-Type\'</span>: <span class="s">\'application/json\'</span>,\n  <span class="s">\'Authorization\'</span>: <span class="s">`Bearer ${key}`</span>\n}',
        mistake: ['Setting Content-Type manually when sending FormData. Let the browser set the boundary itself.',
                  'Content-Type-ის ხელით მითითება FormData-ის გაგზავნისას. მიანდე ბრაუზერს, თვითონ დააყენოს.']
    },
    'sub.bodyJson': {
        label: ['JSON body', 'JSON body'], category: ['Request', 'მოთხოვნა'], color: '',
        short: ['The payload you send', 'გასაგზავნი შიგთავსი'],
        long: ['The body must be a string. JSON.stringify() converts your object, and the server parses it back on its side.',
               'body სტრიქონი უნდა იყოს. JSON.stringify() გადაიყვანს შენს ობიექტს, სერვერი კი თავის მხარეს უკან დააპარსავს.'],
        file: 'fetch options',
        code: 'body: <span class="k">JSON</span>.<span class="k">stringify</span>({ name, price })',
        mistake: ['Sending a body with GET. It is ignored, and some servers reject the request outright.',
                  'GET-თან ერთად body-ის გაგზავნა. ის იგნორირდება, ზოგი სერვერი კი მოთხოვნას საერთოდ არ იღებს.']
    },
    'sub.method': {
        label: ['method', 'method'], category: ['Request', 'მოთხოვნა'], color: '',
        short: ['Which verb to use', 'რომელი ზმნა გამოიყენო'],
        long: ['GET reads, POST creates, PUT replaces, PATCH edits, DELETE removes. Choosing the honest verb is what makes an API predictable.',
               'GET კითხულობს, POST ქმნის, PUT ცვლის, PATCH არედაქტირებს, DELETE შლის. სწორედ პატიოსანი ზმნის არჩევა ხდის API-ს პროგნოზირებადს.'],
        file: 'fetch options',
        code: 'method: <span class="s">\'POST\'</span>',
        mistake: ['Doing everything with POST. Then nothing can be cached and no one can guess what a call does.',
                  'ყველაფრის POST-ით კეთება. მაშინ ვერაფერი ქეშირდება და ვერავინ მიხვდება, რას აკეთებს გამოძახება.']
    },
    'sub.statusCheck': {
        label: ['res.ok / status', 'res.ok / status'], category: ['Response', 'პასუხი'], color: 'c-success',
        short: ['Did it actually work?', 'ნამდვილად გამოვიდა?'],
        long: ['fetch resolves happily on a 404. res.ok is true only for 200-299, so check it and throw yourself when it is false.',
               'fetch 404-ზეც წყნარად სრულდება. res.ok მხოლოდ 200-299-ზეა true, ამიტომ შეამოწმე და თვითონ ააგდე შეცდომა, თუ false-ია.'],
        file: 'after fetch',
        code: '<span class="k">if</span> (!res.ok) <span class="k">throw new</span> <span class="k">Error</span>(<span class="s">`HTTP ${res.status}`</span>);',
        mistake: ['Assuming any answer is a good answer, then trying to .map() an error object.',
                  'იმის ვარაუდი, რომ ნებისმიერი პასუხი კარგია — მერე შეცდომის ობიექტზე .map()-ის ცდა.']
    },
    'sub.throwErr': {
        label: ['throw Error', 'throw Error'], category: ['Errors', 'შეცდომები'], color: 'c-error',
        short: ['Report the problem upward', 'აცნობებს პრობლემას ზემოთ'],
        long: ['throw stops this function and hands the problem to the nearest catch. Throw real Error objects — they carry a stack trace, strings do not.',
               'throw აჩერებს ამ ფუნქციას და პრობლემას უახლოეს catch-ს გადასცემს. ააგდე ნამდვილი Error ობიექტი — მას სტეკის კვალი აქვს, სტრიქონს არა.'],
        file: 'function body',
        code: '<span class="k">throw new</span> <span class="k">Error</span>(<span class="s">\'Product not found\'</span>);',
        mistake: ['Throwing a plain string. You lose the stack trace and the debugger cannot help you.',
                  'უბრალო სტრიქონის აგდება. კარგავ სტეკის კვალს და დამხმარე ინსტრუმენტი ვეღარ გეხმარება.']
    },
    'sub.keyRead': {
        label: ['getItem', 'getItem'], category: ['Storage', 'საცავი'], color: '',
        short: ['Read the saved string', 'კითხულობს შენახულ სტრიქონს'],
        long: ['getItem returns a string or null. Parse it inside a try/catch — stored JSON can be corrupted by an older version of your app.',
               'getItem აბრუნებს სტრიქონს ან null-ს. დააპარსე try/catch-ში — შენახული JSON შეიძლება შენივე აპლიკაციის ძველმა ვერსიამ დააზიანა.'],
        file: 'storage.js',
        code: '<span class="k">const</span> saved = <span class="k">JSON</span>.<span class="k">parse</span>(localStorage.<span class="k">getItem</span>(<span class="s">\'products\'</span>) ?? <span class="s">\'[]\'</span>);',
        mistake: ['Calling JSON.parse(null) and letting the exception take down the whole page load.',
                  'JSON.parse(null)-ის გამოძახება და გამონაკლისით მთელი ჩატვირთვის ჩაშლა.']
    },
    'sub.keyWrite': {
        label: ['setItem', 'setItem'], category: ['Storage', 'საცავი'], color: 'c-success',
        short: ['Write the string back', 'წერს სტრიქონს უკან'],
        long: ['setItem overwrites the whole key. Save after each meaningful change, and keep the key name in one constant so a typo cannot split your data in two.',
               'setItem მთლიან გასაღებს გადააწერს. შეინახე ყოველი მნიშვნელოვანი ცვლილების შემდეგ და გასაღების სახელი ერთ კონსტანტაში დაიჭირე, რომ შეცდომამ მონაცემი ორად არ გაჰყოს.'],
        file: 'storage.js',
        code: 'localStorage.<span class="k">setItem</span>(KEY, <span class="k">JSON</span>.<span class="k">stringify</span>(state.items));',
        mistake: ['Saving on every keystroke. Debounce it, or you write to disk hundreds of times a minute.',
                  'ყოველ დარტყმაზე შენახვა. დააყოვნე, თორემ წუთში ასობითჯერ წერ დისკზე.']
    },
    'sub.stateGet': {
        label: ['read state', 'state-ის წაკითხვა'], category: ['State', 'მდგომარეობა'], color: '',
        short: ['Look at current state', 'ათვალიერებს მიმდინარე state-ს'],
        long: ['Read from the state object, never from the DOM. The state is the single source of truth; the screen is a picture of it.',
               'წაიკითხე state ობიექტიდან და არასოდეს DOM-იდან. state არის სიმართლის ერთადერთი წყარო; ეკრანი კი მისი სურათია.'],
        file: 'state.js',
        code: '<span class="k">const</span> visible = state.items.<span class="k">filter</span>(p => p.inStock);',
        mistake: ['Keeping two copies of the same list and letting them drift apart.',
                  'ერთი და იმავე სიის ორი ასლის შენახვა და მათი ერთმანეთისგან დაშორება.']
    },
    'sub.stateSet': {
        label: ['update state', 'state-ის განახლება'], category: ['State', 'მდგომარეობა'], color: 'c-info',
        short: ['Change it, then re-render', 'შეცვალე და გადახატე'],
        long: ['Write the change into state and call render() once. One path in, one path out — that discipline is the whole idea behind every UI framework.',
               'ჩაწერე ცვლილება state-ში და ერთხელ გამოიძახე render(). ერთი შესასვლელი, ერთი გამოსასვლელი — სწორედ ეს დისციპლინაა ყველა UI ფრეიმვორკის იდეა.'],
        file: 'state.js',
        code: 'state.items = [...state.items, product];\n<span class="f">render</span>();',
        mistake: ['Changing state and forgetting to re-render — the data is right but the screen still shows the old list.',
                  'state-ის შეცვლა და გადახატვის დავიწყება — მონაცემი სწორია, მაგრამ ეკრანი ძველ სიას აჩვენებს.']
    },
    'sub.domCreate': {
        label: ['create node', 'კვანძის შექმნა'], category: ['DOM', 'DOM'], color: '',
        short: ['Make one element', 'ქმნის ერთ ელემენტს'],
        long: ['One element per item, built in memory. Give it a data-id so a click can find its record later.',
               'თითო ერთეულზე ერთი ელემენტი, აწყობილი მეხსიერებაში. მიეცი data-id, რომ დაწკაპუნებამ მოგვიანებით მისი ჩანაწერი იპოვოს.'],
        file: 'render.js',
        code: '<span class="k">const</span> li = document.<span class="k">createElement</span>(<span class="s">\'li\'</span>);\nli.dataset.id = p.id;',
        mistake: ['Losing the link between element and record. Without data-id you cannot tell which row was clicked.',
                  'ელემენტსა და ჩანაწერს შორის კავშირის დაკარგვა. data-id-ის გარეშე ვერ იტყვი, რომელ სტრიქონზე დააწკაპუნეს.']
    },
    'sub.domText': {
        label: ['textContent', 'textContent'], category: ['DOM', 'DOM'], color: 'c-success',
        short: ['Safe text into the node', 'უსაფრთხო ტექსტი კვანძში'],
        long: ['textContent writes text as text. Whatever the user typed stays visible characters and can never become executable markup.',
               'textContent ტექსტს ტექსტად წერს. რაც მომხმარებელმა აკრიფა, ხილულ სიმბოლოებად რჩება და ვერასოდეს იქცევა შესასრულებელ მარკაპად.'],
        file: 'render.js',
        code: 'li.textContent = <span class="s">`${p.name} — $${p.price}`</span>;',
        mistake: ['Reaching for innerHTML out of habit when plain text is all you need.',
                  'ჩვევით innerHTML-ის გამოყენება მაშინ, როცა უბრალო ტექსტი სრულიად საკმარისია.']
    },
    'sub.classAdd': {
        label: ['add class', 'კლასის დამატება'], category: ['DOM', 'DOM'], color: '',
        short: ['Style through CSS', 'სტილი CSS-ით'],
        long: ['Add a class and let the stylesheet describe the look. States like is-loading or is-empty belong in CSS, not in JavaScript strings.',
               'დაამატე კლასი და იერსახის აღწერა სტილების ფაილს მიანდე. მდგომარეობები, როგორიცაა is-loading ან is-empty, CSS-ს ეკუთვნის და არა JavaScript-ის სტრიქონებს.'],
        file: 'render.js',
        code: 'li.classList.<span class="k">add</span>(p.inStock ? <span class="s">\'in\'</span> : <span class="s">\'out\'</span>);',
        mistake: ['Writing style.color from JavaScript and then fighting your own stylesheet.',
                  'style.color-ის JavaScript-იდან ჩაწერა და მერე საკუთარ სტილებთან ბრძოლა.']
    },
    'sub.preventDefault': {
        label: ['preventDefault', 'preventDefault'], category: ['Events', 'ივენთები'], color: 'c-warning',
        short: ['Stop the browser default', 'აჩერებს ბრაუზერის ნაგულისხმევს'],
        long: ['Forms reload the page, links navigate away. preventDefault() tells the browser you are handling this yourself in JavaScript.',
               'ფორმა გვერდს გადატვირთავს, ბმული სხვაგან გადაგიყვანს. preventDefault() ეუბნება ბრაუზერს, რომ ამას შენ თვითონ ამუშავებ JavaScript-ით.'],
        file: 'handlers.js',
        code: 'e.<span class="k">preventDefault</span>();',
        mistake: ['Calling it on every event without thinking. Sometimes the default behaviour is exactly what the user wants.',
                  'მისი გამოძახება ყოველ ივენთზე დაუფიქრებლად. ზოგჯერ ნაგულისხმევი ქცევა სწორედ ისაა, რაც მომხმარებელს უნდა.']
    },
    'sub.formData': {
        label: ['FormData', 'FormData'], category: ['Events', 'ივენთები'], color: '',
        short: ['Read all fields at once', 'კითხულობს ყველა ველს ერთად'],
        long: ['new FormData(form) collects every named field. Object.fromEntries turns it into a plain object ready to be stringified and sent.',
               'new FormData(form) აგროვებს ყველა დასახელებულ ველს. Object.fromEntries მას აქცევს ჩვეულებრივ ობიექტად, რომელიც მზადაა სტრიქონად ქცევისა და გაგზავნისთვის.'],
        file: 'handlers.js',
        code: '<span class="k">const</span> values = <span class="k">Object</span>.<span class="k">fromEntries</span>(<span class="k">new</span> <span class="k">FormData</span>(form));',
        mistake: ['Forgetting the name attribute on an input. FormData only sees named fields.',
                  'ინფუთზე name ატრიბუტის დავიწყება. FormData მხოლოდ დასახელებულ ველებს ხედავს.']
    }
};

// The React blocks (react-data.js). Their plain `raw` source is highlighted once, here.
Object.keys(RFL.defs).forEach((type) => {
    const d = RFL.defs[type];
    NODE_DEFS[type] = Object.assign({}, NODE_DEFS[type], d, { code: highlightJs(d.raw || '') });
});

// ============================================================
// SAMPLE DATA — the values that actually travel through a flow
// Every task and schema works on the Le Bistro dishes from react-data.js.
// ============================================================
const PRODUCTS = RFL.DISHES;
const SEARCH_RESULTS = RFL.DISHES.filter(d => d.category === 'desserts');
const NEW_PRODUCT = RFL.NEW_DISH;

// Each dataset names its three working fields:
//   f.name — the label, f.num — the number, f.ok — the yes/no flag.
// pre/suf format the number ($1200, 24°C, 4 min read).
const DATASETS = {
    products: {
        var: 'products', it: 'p', file: './data.js', storageKey: 'products', click: '#refresh',
        f: { name: 'name', num: 'price', ok: 'inStock' }, pre: '$', suf: '', okVar: 'available',
        title: ['Our Products', 'ჩვენი პროდუქცია'],
        okLabel: ['In stock', 'მარაგშია'], noLabel: ['Out of stock', 'არ არის მარაგში'],
        page: 'https://shop.local/products', api: 'https://shop.local/api/products',
        query: 'lap', rows: PRODUCTS, stored: PRODUCTS.slice(0, 3), search: SEARCH_RESULTS,
        add: NEW_PRODUCT, edit: { price: 999 }
    }
};

// The dataset of whatever is on the canvas right now.
const DS = () => DATASETS[state.dataset] || DATASETS.products;
const nameOf = (p) => (p == null ? '?' : (p[DS().f.name] ?? p.title ?? p.name ?? '?'));
const numOf  = (p) => (p == null ? undefined : (p[DS().f.num] ?? p.price));
const okOf   = (p) => !!(p && p[DS().f.ok]);
function fmtNum(v) {
    if (typeof v !== 'number') return v == null ? '' : String(v);
    const d = DS();
    return d.pre + v + d.suf;
}
// A value written as JavaScript source: { id: 1, city: 'Tbilisi', temp: 24 }
function jsLiteral(v) {
    if (Array.isArray(v)) return '[' + v.map(jsLiteral).join(', ') + ']';
    if (v && typeof v === 'object') return '{ ' + Object.entries(v).map(([k, x]) => k + ': ' + jsLiteral(x)).join(', ') + ' }';
    if (typeof v === 'string') return '\'' + v.replace(/\\/g, '\\\\').replace(/'/g, '\\\'') + '\'';
    return String(v);
}
// Template-literal source for a formatted number: $${p.price} or ${c.temp}°C
function numExpr(it) {
    const d = DS();
    return d.pre + '${' + it + '.' + d.f.num + '}' + d.suf;
}
// The one line of JavaScript a block stands for (some depend on the dataset).
function opOf(type) {
    const s = SIM[type];
    if (!s || !s.op) return '';
    return typeof s.op === 'function' ? s.op() : s.op;
}

const clone = (v) => (typeof structuredClone === 'function' ? structuredClone(v) : JSON.parse(JSON.stringify(v)));

// Value wrappers — they keep the trace honest about WHAT a value is,
// not just what is inside it (a Response is not an array).
const mkPromise  = (of, of_label) => ({ __kind: 'promise', of, label: of_label || 'Response' });
const mkResponse = (url, status)  => ({ __kind: 'response', url, status: status || 200, ok: (status || 200) < 400 });
const mkOptions  = (o)            => ({ __kind: 'options', ...o });
const mkEvent    = (type, target) => ({ __kind: 'event', type, target });
const mkElement  = (selector)     => ({ __kind: 'element', selector });
const mkDom      = (selector, n)  => ({ __kind: 'dom', selector, nodes: n });
const kindOf = (v) => (v && v.__kind) || (Array.isArray(v) ? 'array' : v === null ? 'null' : typeof v);

// ============================================================
// SIMULATION + CODE GENERATION
// `op`   — the one line of JavaScript this block stands for
// `run`  — what really happens to the value (drives the Data tab)
// `gen`  — the source line(s) this block contributes (Code tab)
// ============================================================
function needArray(v, who) {
    if (Array.isArray(v)) return v;
    // A state object carries its list on .items — that is what state.items means.
    if (isPlainObject(v) && Array.isArray(v.items)) return v.items;
    throw new Error(who + ' needs an array, but received ' + describeKind(v));
}
function describeKind(v) {
    const k = kindOf(v);
    if (k === 'promise') return 'a Promise (did you forget await?)';
    if (k === 'response') return 'a Response (call res.json() first)';
    if (k === 'string') return 'a string (parse it with JSON.parse first)';
    if (k === 'undefined') return 'nothing at all';
    if (k === 'object' || k === 'array') return 'an ' + k;
    return 'a ' + k;
}

const SIM = {
    dataArray: {
        op: () => 'const ' + DS().var + ' = [...]',
        run: () => clone(DS().rows),
        gen: (c) => {
            const d = DS();
            const rows = d.rows.slice(0, 3);
            c.v = d.var;
            return ['const ' + d.var + ' = [']
                .concat(rows.map((r, i) => '  ' + jsLiteral(r) + (i < rows.length - 1 ? ',' : '')))
                .concat(['];']);
        }
    },
    apiEndpoint: {
        op: 'const API = \'...\'',
        run: (v, c) => c.api.url || DS().api,
        gen: (c) => { c.v = 'API'; c.url = 'API'; return ['const API = \'' + (c.api.url || DS().api) + '\';']; }
    },
    localStore: {
        op: () => 'localStorage.getItem(\'' + DS().storageKey + '\')',
        run: () => JSON.stringify(DS().stored || DS().rows),
        gen: (c) => { c.v = 'raw'; return ['const raw = localStorage.getItem(\'' + DS().storageKey + '\'); // a string, or null']; }
    },
    userInput: {
        op: 'input.value',
        run: () => DS().query,
        gen: (c) => { c.v = 'q'; return ['const q = document.querySelector(\'#search\').value.trim();']; }
    },

    apiKey: {
        op: 'headers = { Authorization: ... }',
        run: (v, c) => buildHeaders(c.api, true),
        gen: (c) => {
            c.headers = true;
            const a = c.api;
            if (a.scheme === 'bearer') return ['const API_KEY = \'' + maskKey(a.key) + '\';', 'const headers = { \'Authorization\': `Bearer ${API_KEY}`, \'Accept\': \'application/json\' };'];
            if (a.scheme === 'header') return ['const API_KEY = \'' + maskKey(a.key) + '\';', 'const headers = { \'' + (a.headerName || 'x-api-key') + '\': API_KEY, \'Accept\': \'application/json\' };'];
            if (a.scheme === 'query') { c.queryKey = true; return ['const API_KEY = \'' + maskKey(a.key) + '\';', 'const url = `${API}?' + (a.paramName || 'apikey') + '=${API_KEY}`;']; }
            return ['const headers = { \'Accept\': \'application/json\' };'];
        }
    },
    fetchCall: {
        op: 'fetch(url, options)',
        run: async (v, c) => {
            await loadPayload(c);
            return mkPromise(mkResponse(c.requestUrl, c.status));
        },
        gen: (c) => {
            const url = c.queryKey ? 'url' : (c.url || 'API');
            const args = [url];
            if (c.options) args.push(c.signal ? '{ ...options, signal }' : 'options');
            else if (c.headers || c.signal) args.push('{ ' + [c.headers && 'headers', c.signal && 'signal'].filter(Boolean).join(', ') + ' }');
            const call = 'fetch(' + args.join(', ') + ')';
            if (c.thenStyle) { c.skipFetchLine = true; c.v = 'data'; return []; }
            if (c.canAwait) { c.v = 'res'; return ['const res = await ' + call + ';']; }
            c.v = 'resPromise';
            return ['const resPromise = ' + call + '; // no await: this is a Promise, not data'];
        }
    },
    jsonParse: {
        op: 'await res.json()',
        run: (v, c) => {
            if (typeof v === 'string') return JSON.parse(v);
            const k = kindOf(v);
            if (k === 'promise' || k === 'response') {
                const d = DS();
                // A write returns what it wrote, not the whole collection.
                if (c.method === 'POST') return d.created ? clone(d.created) : { ...(c.sentBody || clone(d.add)), id: (d.add && d.add.id) || 6, created: true };
                if (c.method === 'PUT') return { ...(c.sentBody || clone(d.rows[0])), updated: true };
                if (c.method === 'DELETE') return { id: (d.rows[2] || d.rows[0]).id, deleted: true };
                return clone(c.payload);
            }
            throw new Error('res.json() needs a Response, but received ' + describeKind(v));
        },
        gen: (c) => {
            if (c.thenStyle) return [];
            if (c.v === 'raw') { c.v = DS().var; return ['const ' + c.v + ' = JSON.parse(raw ?? \'[]\');']; }
            c.v = 'data';
            return [(c.canAwait ? 'const data = await res.json();' : 'const data = await resPromise.then(r => r.json());')];
        }
    },
    httpGet:    { op: 'method: \'GET\'',    run: (v, c) => { c.method = 'GET'; return mkOptions({ method: 'GET', headers: buildHeaders(c.api, false) }); }, gen: (c) => { c.options = true; c.method = 'GET'; return ['const options = { method: \'GET\'' + (c.headers ? ', headers' : '') + ' };']; } },
    httpPost:   { op: 'method: \'POST\'',   run: (v, c) => { c.method = 'POST'; c.sentBody = isPlainObject(v) ? v : clone(DS().add); return mkOptions({ method: 'POST', headers: buildHeaders(c.api, true), body: JSON.stringify(c.sentBody) }); }, gen: (c) => { c.options = true; c.method = 'POST'; return ['const options = {', '  method: \'POST\',', '  headers' + (c.headers ? '' : ': { \'Content-Type\': \'application/json\' }') + ',', '  body: JSON.stringify(' + (c.v || 'payload') + ')', '};']; } },
    httpPut:    { op: 'method: \'PUT\'',    run: (v, c) => { c.method = 'PUT'; c.sentBody = isPlainObject(v) ? v : { ...clone(DS().rows[0]), ...(DS().edit || {}) }; return mkOptions({ method: 'PUT', headers: buildHeaders(c.api, true), body: JSON.stringify(c.sentBody) }); }, gen: (c) => { c.options = true; c.method = 'PUT'; c.url = '`${API}/${id}`'; return ['const options = {', '  method: \'PUT\',', '  headers' + (c.headers ? '' : ': { \'Content-Type\': \'application/json\' }') + ',', '  body: JSON.stringify(' + (c.v || 'updated') + ')', '};']; } },
    httpDelete: { op: 'method: \'DELETE\'', run: (v, c) => { c.method = 'DELETE'; return mkOptions({ method: 'DELETE', headers: buildHeaders(c.api, false) }); }, gen: (c) => { c.options = true; c.method = 'DELETE'; c.url = '`${API}/${id}`'; return ['const options = { method: \'DELETE\'' + (c.headers ? ', headers' : '') + ' };']; } },

    tryCatch: {
        op: 'try { ... } catch (err) { ... }',
        run: (v) => v,
        gen: (c) => { c.open.push(['} catch (err) {', '  console.error(err);', '  showError(err.message);', '}']); c.indentAfter = 1; return ['try {']; }
    },
    abortCtl: {
        op: 'new AbortController()',
        run: (v) => v,
        gen: (c) => { c.signal = true; return ['controller?.abort(); // cancel the previous request', 'controller = new AbortController();', 'const signal = controller.signal;']; }
    },

    asyncFn: {
        op: 'async function load() { ... }',
        run: (v) => v,
        gen: (c) => { c.open.push(['}', '', 'load();']); c.indentAfter = 1; return ['async function load() {']; }
    },
    awaitOp: {
        op: 'await promise',
        run: (v) => {
            if (v && v.__kind === 'promise') return v.of;
            throw new Error('await expects a Promise, but received ' + describeKind(v));
        },
        gen: () => []   // await shows up inline on the fetch / json lines above
    },
    promiseThen: {
        op: '.then(res => res.json())',
        run: (v, c) => {
            if (v && v.__kind === 'promise') return clone(c.payload);
            if (v && v.__kind === 'response') return clone(c.payload);
            throw new Error('.then() expects a Promise, but received ' + describeKind(v));
        },
        gen: (c) => {
            c.v = 'data';
            return ['fetch(' + (c.url || 'API') + (c.options ? ', options' : '') + ')',
                    '  .then(res => res.json())',
                    '  .then(data => {',
                    '    // ...the steps below happen in here',
                    '  })',
                    '  .catch(err => console.error(err));'];
        }
    },
    setTimeoutBlk: {
        op: 'setTimeout(fn, 300)',
        run: (v) => v,
        gen: (c) => { c.open.push(['}, 300);']); c.indentAfter = 1; return ['setTimeout(() => {']; }
    },
    debounceBlk: {
        op: 'debounce(fn, 300)',
        run: (v) => v,
        gen: (c) => { c.open.push(['}, 300);']); c.indentAfter = 1; return ['const onSearch = debounce(async (q) => {']; }
    },
    eventLoop: {
        op: 'sync → microtask → timer',
        run: (v, c) => { c.console.push('1 sync'); c.console.push('2 microtask'); c.console.push('3 timer'); return v; },
        gen: () => ['console.log(\'1 sync\');',
                    'Promise.resolve().then(() => console.log(\'2 microtask\'));',
                    'setTimeout(() => console.log(\'3 timer\'), 0);',
                    '// order: 1 sync → 2 microtask → 3 timer']
    },

    filterOp: {
        op: () => { const d = DS(); return '.filter(' + d.it + ' => ' + d.it + '.' + d.f.ok + ')'; },
        run: (v) => needArray(v, '.filter()').filter(okOf),
        gen: (c) => { const d = DS(); const from = c.v; c.v = d.okVar; return ['const ' + d.okVar + ' = ' + from + '.filter(' + d.it + ' => ' + d.it + '.' + d.f.ok + ');']; }
    },
    mapOp: {
        op: () => '.map(' + DS().it + ' => ({ ... }))',
        run: (v) => {
            const num = DS().f.num;
            return needArray(v, '.map()').map(p => ({ id: p.id, title: String(nameOf(p)).toUpperCase(), [num]: fmtNum(numOf(p)) }));
        },
        gen: (c) => {
            const d = DS(), it = d.it;
            const from = c.v;
            c.v = 'rows';
            c.mapped = true;
            return ['const rows = ' + from + '.map(' + it + ' => ({',
                    '  id: ' + it + '.id,',
                    '  title: ' + it + '.' + d.f.name + '.toUpperCase(),',
                    '  ' + d.f.num + ': `' + numExpr(it) + '`',
                    '}));'];
        }
    },
    sortOp: {
        op: () => { const d = DS(), n = d.f.num; return '.sort((a, b) => ' + (d.sortDesc ? 'b.' + n + ' - a.' + n : 'a.' + n + ' - b.' + n) + ')'; },
        run: (v) => {
            const dir = DS().sortDesc ? -1 : 1;
            return [...needArray(v, '.sort()')].sort((a, b) => dir * ((Number(numOf(a)) || 0) - (Number(numOf(b)) || 0)));
        },
        gen: (c) => {
            const d = DS(), n = d.f.num;
            const from = c.v;
            c.v = 'sorted';
            return ['const sorted = [...' + from + '].sort((a, b) => ' + (d.sortDesc ? 'b.' + n + ' - a.' + n : 'a.' + n + ' - b.' + n) + ');'];
        }
    },
    reduceOp: {
        op: () => { const d = DS(); return '.reduce((sum, ' + d.it + ') => sum + ' + d.it + '.' + d.f.num + ', 0)'; },
        run: (v) => Math.round(needArray(v, '.reduce()').reduce((s, p) => s + (Number(numOf(p)) || 0), 0) * 100) / 100,
        gen: (c) => { const d = DS(); const from = c.v; c.v = 'total'; return ['const total = ' + from + '.reduce((sum, ' + d.it + ') => sum + ' + d.it + '.' + d.f.num + ', 0);']; }
    },
    findOp: {
        op: () => { const d = DS(); return '.find(' + d.it + ' => ' + d.it + '.' + d.f.ok + ')'; },
        run: (v) => needArray(v, '.find()').find(okOf),
        gen: (c) => { const d = DS(); const from = c.v; c.v = 'found'; return ['const found = ' + from + '.find(' + d.it + ' => ' + d.it + '.' + d.f.ok + ');']; }
    },
    destructure: {
        op: () => { const d = DS(); return 'const { ' + d.f.name + ', ' + d.f.num + ' } = item'; },
        run: (v) => {
            const src = Array.isArray(v) ? v[0] : v;
            if (!isPlainObject(src)) throw new Error('destructuring needs an object, but received ' + describeKind(v));
            const f = DS().f;
            return { [f.name]: src[f.name] ?? src.title, [f.num]: src[f.num] };
        },
        gen: (c) => { const d = DS(); const from = c.v; c.v = 'first'; return ['const [first] = ' + from + ';', 'const { ' + d.f.name + ', ' + d.f.num + ' = 0 } = first;']; }
    },
    spreadOp: {
        op: '[...items, newItem]',
        run: (v) => [...needArray(v, 'spread'), clone(DS().add)],
        gen: (c) => { const from = c.v; c.v = 'next'; return ['const next = [...' + from + ', ' + (c.formVar || jsLiteral(DS().add)) + '];']; }
    },
    templateLit: {
        op: 'items.map(...).join(\'\')',
        run: (v, c) => {
            const arr = needArray(v, 'the template');
            c.renderArray = arr;
            return arr.map(p => '<li class="row"><b>' + nameOf(p) + '</b> — ' + fmtNum(numOf(p)) + '</li>').join('\n');
        },
        gen: (c) => {
            const d = DS(), it = d.it;
            const from = c.v;
            const label = c.mapped ? 'title' : d.f.name;
            const num = c.mapped ? '${' + it + '.' + d.f.num + '}' : numExpr(it);
            c.v = 'html';
            return ['const html = ' + from + '.map(' + it + ' => `',
                    '  <li class="row" data-id="${' + it + '.id}">',
                    '    <b>${' + it + '.' + label + '}</b> — ' + num,
                    '  </li>`).join(\'\');'];
        }
    },

    stateObj: {
        op: 'state = { items, loading, error }',
        run: (v) => ({ items: Array.isArray(v) ? v : [v], loading: false, error: null }),
        gen: (c) => { const from = c.v; c.v = 'state.items'; return ['const state = { items: ' + from + ', loading: false, error: null };']; }
    },
    closureBlk: {
        op: 'createStore(items)',
        run: (v) => v,
        gen: (c) => { const from = c.v; return ['const store = createStore(' + from + '); // items stay private inside']; }
    },
    saveLocal: {
        op: () => 'localStorage.setItem(\'' + DS().storageKey + '\', json)',
        run: (v) => JSON.stringify(Array.isArray(v) ? v : (v && v.items) || v),
        gen: (c) => { const from = c.v; return ['localStorage.setItem(\'' + DS().storageKey + '\', JSON.stringify(' + from + '));']; }
    },

    querySel: {
        op: 'document.querySelector(\'#list\')',
        run: (v, c) => { c.target = '#list'; return v; },
        gen: () => ['const list = document.querySelector(\'#list\');']
    },
    createEl: {
        op: 'document.createElement(\'li\')',
        run: (v, c) => {
            if (Array.isArray(v)) c.renderArray = v;
            else if (isPlainObject(v) && Array.isArray(v.items)) c.renderArray = v.items;
            return v;
        },
        gen: (c) => {
            const d = DS(), it = d.it;
            const from = c.v;
            const label = c.mapped ? 'title' : d.f.name;
            const num = c.mapped ? '${' + it + '.' + d.f.num + '}' : numExpr(it);
            return ['const nodes = ' + from + '.map(' + it + ' => {',
                    '  const li = document.createElement(\'li\');',
                    '  li.textContent = `${' + it + '.' + label + '} — ' + num + '`;',
                    '  li.dataset.id = ' + it + '.id;',
                    '  return li;',
                    '});'];
        }
    },
    appendChildBlk: {
        op: 'list.append(fragment)',
        run: (v) => v,
        gen: () => ['const frag = document.createDocumentFragment();', 'frag.append(...nodes);', 'list.append(frag); // one repaint, not one per row']
    },
    renderDom: {
        op: 'list.innerHTML = html',
        run: (v, c) => {
            if (typeof v !== 'string') throw new Error('innerHTML needs an HTML string, but received ' + describeKind(v));
            c.html = v;
            return mkDom(c.target || '#list', v.split('\n').filter(Boolean).length);
        },
        gen: (c) => { const from = c.v; c.v = 'DOM'; return ['document.querySelector(\'#list\').innerHTML = ' + from + ';']; }
    },
    eventListener: {
        op: 'btn.addEventListener(\'click\', fn)',
        run: () => mkEvent('click', DS().click || '#refresh'),
        gen: (c) => { c.open.push(['});']); c.indentAfter = 1; return ['document.querySelector(\'' + (DS().click || '#refresh') + '\').addEventListener(\'click\', async (e) => {']; }
    },
    delegation: {
        op: 'list.addEventListener(\'click\', fn)',
        run: () => mkEvent('click', '.row[data-id="' + (DS().rows[2] || DS().rows[0]).id + '"]'),
        gen: (c) => { c.open.push(['});']); c.indentAfter = 1; return ['list.addEventListener(\'click\', (e) => {', '  const row = e.target.closest(\'[data-id]\');', '  if (!row) return;', '  const id = Number(row.dataset.id);']; }
    },
    formSubmit: {
        op: 'form.addEventListener(\'submit\', fn)',
        run: () => clone(DS().add),
        gen: (c) => { c.open.push(['});']); c.indentAfter = 1; c.v = 'values'; c.formVar = 'values'; return ['form.addEventListener(\'submit\', async (e) => {', '  e.preventDefault();', '  const values = Object.fromEntries(new FormData(form));']; }
    },
    classToggle: {
        op: 'el.classList.toggle(\'is-empty\', ...)',
        run: (v) => v,
        gen: (c) => {
            const t = DS().toggle;
            if (t) return ['document.querySelector(\'' + t[0] + '\').classList.toggle(\'' + t[1] + '\', ' + (c.v || 'items') + t[2] + ');'];
            return ['list.classList.toggle(\'is-empty\', ' + (c.v || 'items') + '.length === 0);'];
        }
    },

    exportBlk: {
        op: () => 'export const ' + DS().var,
        run: (v) => v,
        gen: (c) => {
            const d = DS();
            const from = c.v;
            return ['// ---- ' + d.file.replace('./', '') + ' ----', from === d.var ? 'export { ' + d.var + ' };' : 'export const ' + d.var + ' = ' + from + ';'];
        }
    },
    importBlk: {
        op: () => 'import { ' + DS().var + ' } from \'' + DS().file + '\'',
        run: (v) => v,
        gen: (c) => { const d = DS(); c.v = d.var; return ['// ---- app.js ----', 'import { ' + d.var + ' } from \'' + d.file + '\';']; }
    },

    consoleLog: {
        op: 'console.log(value)',
        run: (v, c) => {
            c.console.push(v === undefined
                ? '// undefined — the block before this one passed nothing on'
                : formatValue(v, true));
            return v;
        },
        gen: (c) => ['console.log(\'' + (c.v || 'value') + ':\', ' + (c.v || 'value') + ');']
    },
    browser: {
        op: 'the browser paints the DOM',
        run: (v) => v,
        gen: () => ['// the browser paints the DOM — nothing left for you to write']
    }
};

// The React blocks: what they do when the flow runs, and their code.
Object.assign(SIM, RFL.sim({ clone, kindOf, isPlainObject, mkPromise, mkDom, mkEvent, mkElement, SIM }));

function isPlainObject(v) {
    return !!v && typeof v === 'object' && !Array.isArray(v) && !v.__kind;
}
function maskKey(key) {
    if (!key) return 'YOUR_API_KEY';
    if (key.length <= 6) return key[0] + '***';
    return key.slice(0, 4) + '...' + key.slice(-2);
}
// Builds the headers a real request would carry, from the shared API config.
function buildHeaders(api, withContentType) {
    const h = { 'Accept': 'application/json' };
    if (withContentType) h['Content-Type'] = 'application/json';
    if (api.key && api.scheme === 'bearer') h['Authorization'] = 'Bearer ' + api.key;
    if (api.key && api.scheme === 'header') h[api.headerName || 'x-api-key'] = api.key;
    return h;
}
// The URL a real request would hit, including a query-parameter key.
function buildUrl(api) {
    let url = (api.url || '').trim();
    if (!url) return '';
    if (api.key && api.scheme === 'query') {
        const sep = url.includes('?') ? '&' : '?';
        url += sep + encodeURIComponent(api.paramName || 'apikey') + '=' + encodeURIComponent(api.key);
    }
    return url;
}
// Digs the array out of a wrapped response, e.g. { products: [...] }.
function pickArray(json, path) {
    let node = json;
    if (path) {
        for (const part of path.split('.').map(s => s.trim()).filter(Boolean)) {
            if (node == null) break;
            node = node[part];
        }
    }
    if (Array.isArray(node)) return node;
    if (Array.isArray(json)) return json;
    for (const key of ['products', 'items', 'data', 'results']) {
        if (json && Array.isArray(json[key])) return json[key];
    }
    return node;
}

// ============================================================
// LIBRARY GROUPS
// ============================================================
const LIBRARY_GROUPS = RFL.groups;

// ============================================================
// SUB-CANVAS: what lives inside each block
// ============================================================
const SUB_TOOLS = {
    dataArray:      ['sub.loop', 'sub.arrow'],
    apiEndpoint:    ['sub.param', 'sub.return'],
    localStore:     ['sub.keyRead', 'sub.ifCheck'],
    userInput:      ['sub.formData', 'sub.ifCheck'],
    fetchCall:      ['sub.method', 'sub.headers', 'sub.bodyJson', 'sub.statusCheck'],
    apiKey:         ['sub.headers', 'sub.keyRead', 'sub.ifCheck'],
    jsonParse:      ['sub.statusCheck', 'sub.return', 'sub.throwErr'],
    httpGet:        ['sub.method', 'sub.headers'],
    httpPost:       ['sub.method', 'sub.headers', 'sub.bodyJson'],
    httpPut:        ['sub.method', 'sub.headers', 'sub.bodyJson'],
    httpDelete:     ['sub.method', 'sub.headers', 'sub.ifCheck'],
    tryCatch:       ['sub.tryBlock', 'sub.catchBlock', 'sub.statusCheck', 'sub.throwErr'],
    abortCtl:       ['sub.ifCheck', 'sub.catchBlock'],
    asyncFn:        ['sub.param', 'sub.return', 'sub.tryBlock', 'sub.ifCheck'],
    awaitOp:        ['sub.tryBlock', 'sub.catchBlock'],
    promiseThen:    ['sub.callback', 'sub.return', 'sub.catchBlock'],
    setTimeoutBlk:  ['sub.callback', 'sub.arrow'],
    debounceBlk:    ['sub.callback', 'sub.arrow', 'sub.ifCheck'],
    eventLoop:      ['sub.callback', 'sub.arrow'],
    filterOp:       ['sub.arrow', 'sub.callback', 'sub.ifCheck', 'sub.return'],
    mapOp:          ['sub.arrow', 'sub.callback', 'sub.return'],
    sortOp:         ['sub.arrow', 'sub.param', 'sub.return'],
    reduceOp:       ['sub.arrow', 'sub.param', 'sub.return'],
    findOp:         ['sub.arrow', 'sub.ifCheck', 'sub.return'],
    destructure:    ['sub.param', 'sub.return'],
    spreadOp:       ['sub.param', 'sub.return'],
    templateLit:    ['sub.loop', 'sub.arrow', 'sub.domText'],
    stateObj:       ['sub.stateGet', 'sub.stateSet'],
    closureBlk:     ['sub.param', 'sub.return', 'sub.arrow'],
    saveLocal:      ['sub.keyWrite', 'sub.ifCheck'],
    querySel:       ['sub.domCreate', 'sub.ifCheck'],
    createEl:       ['sub.domCreate', 'sub.domText', 'sub.classAdd'],
    appendChildBlk: ['sub.loop', 'sub.domCreate'],
    renderDom:      ['sub.domCreate', 'sub.domText', 'sub.classAdd'],
    eventListener:  ['sub.callback', 'sub.preventDefault', 'sub.stateSet'],
    delegation:     ['sub.ifCheck', 'sub.callback', 'sub.stateSet'],
    formSubmit:     ['sub.preventDefault', 'sub.formData', 'sub.ifCheck'],
    classToggle:    ['sub.classAdd', 'sub.ifCheck'],
    exportBlk:      ['sub.return', 'sub.param'],
    importBlk:      ['sub.param', 'sub.return'],
    consoleLog:     ['sub.param'],
    browser:        ['sub.domText', 'sub.classAdd']
};

// A representative arrangement shown the first time you dive into a block
const SUB_SEED = {
    fetchCall:  { nodes: [{type: 'sub.method', x: 200, y: 250}, {type: 'sub.headers', x: 500, y: 250}, {type: 'sub.statusCheck', x: 800, y: 250}], connections: [[0,1],[1,2]] },
    tryCatch:   { nodes: [{type: 'sub.statusCheck', x: 250, y: 250}], connections: [] },
    asyncFn:    { nodes: [{type: 'sub.param', x: 200, y: 240}, {type: 'sub.return', x: 560, y: 240}], connections: [[0,1]] },
    filterOp:   { nodes: [{type: 'sub.arrow', x: 200, y: 240}, {type: 'sub.ifCheck', x: 500, y: 240}, {type: 'sub.return', x: 800, y: 240}], connections: [[0,1],[1,2]] },
    mapOp:      { nodes: [{type: 'sub.arrow', x: 200, y: 240}, {type: 'sub.return', x: 560, y: 240}], connections: [[0,1]] },
    formSubmit: { nodes: [{type: 'sub.preventDefault', x: 200, y: 240}, {type: 'sub.formData', x: 500, y: 240}, {type: 'sub.ifCheck', x: 800, y: 240}], connections: [[0,1],[1,2]] },
    stateObj:   { nodes: [{type: 'sub.stateSet', x: 200, y: 240}, {type: 'sub.stateGet', x: 560, y: 240}], connections: [[0,1]] },
    renderDom:  { nodes: [{type: 'sub.domCreate', x: 200, y: 240}, {type: 'sub.domText', x: 500, y: 240}, {type: 'sub.classAdd', x: 800, y: 240}], connections: [[0,1],[1,2]] },
    apiKey:     { nodes: [{type: 'sub.keyRead', x: 220, y: 240}, {type: 'sub.headers', x: 560, y: 240}], connections: [[0,1]] }
};

// ============================================================
// LEVELS
// ============================================================
const LEVELS = RFL.levels;
const LECTURES = RFL.lectures;

// ============================================================
// REFERENCE SCHEMAS
// nodes: [{type, x, y}]   connections: [[fromIdx, toIdx]]
// A schema (and a task's `preset`) may be a plain chain of types:
// chainLayout() lays it out in rows of seven blocks.
// ============================================================
function chainLayout(types) {
    const perRow = 7;
    const nodes = types.map((type, i) => {
        // rows read like lines of text: left to right, then the next row
        return { type, x: 90 + (i % perRow) * 300, y: 150 + Math.floor(i / perRow) * 250 };
    });
    return { nodes, connections: types.slice(1).map((_, i) => [i, i + 1]) };
}
const EXAMPLES = RFL.examples.map((ex) => (ex.chain ? Object.assign({}, ex, chainLayout(ex.chain)) : ex));

// Real-world tasks: a brief, an empty canvas and a live checklist (react-data.js)
const TASKS = RFL.tasks || [];

// ============================================================
// STATE
// ============================================================
const API_STORE_KEY = 'rfl-api';
const state = {
    currentLevel: 0,
    nodes: [],
    connections: [],
    selectedNodeId: null,
    nextNodeId: 1,
    nextConnId: 1,
    completed: new Set(),
    running: false,
    zoom: 1,
    theme: 'light',
    spacePressed: false,
    panning: false,
    canvasStack: [],
    readonly: false,
    freeGraph: false,   // branches allowed (a schema task, or a loaded reference schema)
    runCtx: null,       // values a task or schema hands to the run (for example the address)
    snapToGrid: false,
    undoStack: [],
    redoStack: [],
    panel: 'trace',
    librarySearch: '',
    trace: [],
    consoleLines: [],
    dataset: 'products',     // which sample data the canvas runs on
    task: null,              // the real-world task being solved, if any
    taskUi: { blocks: false, solution: false, collapsed: false, story: false },
    tasksDone: new Set(),
    // One shared API config — every API / fetch block on the canvas uses it.
    api: {
        url: '',
        key: '',
        scheme: 'none',        // none | bearer | header | query
        headerName: 'x-api-key',
        paramName: 'apikey',
        path: '',              // where the array sits inside the response
        revealKey: false
    }
};

const NODE_W = 220;
const NODE_H = 108;
const CANVAS_W = 3200;
const CANVAS_H = 1800;
const SVG_NS = 'http://www.w3.org/2000/svg';
const MIN_ZOOM = 0.3;
const MAX_ZOOM = 2;
const TASKS_STORE_KEY = 'rfl-tasks-done';
const THEME_STORE_KEY = 'rfl-theme-v2';   // v2: the redesign starts everyone on the dark theme once
const LAYOUT_STORE_KEY = 'rfl-layout';    // panel sizes
const PANELS_STORE_KEY = 'rfl-panels';    // which panels are collapsed

// ============================================================
// DOM REFS
// ============================================================
const $ = (id) => document.getElementById(id);
const canvasEl = $('canvas');
const canvasStageEl = $('canvas-stage');
const canvasWrapEl = $('canvas-wrap');
const svgEl = $('connections-svg');
const nodesContainer = $('nodes-container');
const libraryListEl = $('library-list');
const librarySearchEl = $('library-search');
const inspectorBody = $('inspector-body');
const inspectorTitle = $('insp-title');
const explainStepsEl = $('explain-steps');
const explainBodyEl = $('explain-body');
const dataBodyEl = $('data-body');
const codeBodyEl = $('code-body');
const missionTextEl = $('mission-text');
const missionHintBtn = $('mission-hint');
const levelNumEl = $('level-num');
const levelTitleEl = $('level-title');
const levelsToggle = $('levels-toggle');
const levelsDropdown = $('levels-dropdown');
const levelsMenuEl = $('levels-menu');
const toastWrap = $('toast-wrap');
const previewOverlay = $('preview-overlay');
const previewBody = $('preview-body');
const consoleBodyEl = $('console-body');
const zoomLevelEl = $('zoom-level');
const taskPanelEl = $('task-panel');
const tasksOverlay = $('tasks-overlay');

// ============================================================
// UTIL
// ============================================================
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const easeInOut = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

function portPos(node, type) {
    if (type === 'in') return { x: node.x, y: node.y + NODE_H / 2 };
    return { x: node.x + NODE_W, y: node.y + NODE_H / 2 };
}
function bezier(sx, sy, tx, ty) {
    const dx = Math.max(40, Math.abs(tx - sx) * 0.5);
    return `M ${sx} ${sy} C ${sx + dx} ${sy}, ${tx - dx} ${ty}, ${tx} ${ty}`;
}
function eventToCanvas(e) {
    const rect = canvasEl.getBoundingClientRect();
    return { x: (e.clientX - rect.left) / state.zoom, y: (e.clientY - rect.top) / state.zoom };
}
function isOverCanvas(e) {
    const r = canvasWrapEl.getBoundingClientRect();
    return e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
}
function nowTime() {
    const d = new Date();
    return String(d.getMinutes()).padStart(2, '0') + ':' + String(d.getSeconds()).padStart(2, '0');
}
function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// Renders any runtime value the way you would read it in a debugger.
function formatValue(v, compact) {
    const k = kindOf(v);
    const custom = RFL.format(v, k);
    if (custom) return custom;
    if (k === 'promise')  return 'Promise { <pending> → ' + v.label + ' }';
    if (k === 'response') return 'Response { ok: ' + v.ok + ', status: ' + v.status + ', url: "' + v.url + '" }';
    if (k === 'options')  return jsonish({ method: v.method, headers: v.headers, body: v.body ? shorten(v.body, 60) : undefined }, compact);
    if (k === 'event')    return 'Event { type: "' + v.type + '", target: "' + v.target + '" }';
    if (k === 'element')  return 'Element <' + v.selector + '>';
    if (k === 'dom')      return 'DOM: ' + v.nodes + ' node(s) inside ' + v.selector;
    if (k === 'undefined') return 'undefined';
    if (k === 'null')     return 'null';
    if (k === 'string')   return '"' + shorten(v, compact ? 90 : 400) + '"';
    if (k === 'number' || k === 'boolean') return String(v);
    return jsonish(v, compact);
}
function jsonish(v, compact) {
    let s;
    try { s = JSON.stringify(v, null, compact ? 0 : 2); } catch (_) { s = String(v); }
    if (s === undefined) s = String(v);
    return shorten(s, compact ? 120 : 900);
}
function shorten(s, max) {
    s = String(s);
    return s.length > max ? s.slice(0, max) + '…' : s;
}
// The pill next to a step: how big is this value?
function sizeLabel(v) {
    if (Array.isArray(v)) return v.length + ' items';
    const k = kindOf(v);
    const custom = RFL.size(v, k);
    if (custom) return custom;
    if (k === 'undefined') return 'no value yet';
    if (k === 'string') return v.length + ' chars';
    if (k === 'number') return 'number';
    if (k === 'promise') return 'pending';
    if (k === 'response') return 'status ' + v.status;
    if (k === 'dom') return v.nodes + ' nodes';
    if (k === 'object') return Object.keys(v).length + ' keys';
    return k;
}
function sizeOf(v) {
    if (Array.isArray(v)) return v.length;
    if (typeof v === 'string') return v.length;
    return null;
}

// ============================================================
// ZOOM
// ============================================================
function applyZoom() {
    canvasEl.style.transform = `scale(${state.zoom})`;
    canvasStageEl.style.width = (CANVAS_W * state.zoom) + 'px';
    canvasStageEl.style.height = (CANVAS_H * state.zoom) + 'px';
    // The dot grid lives on the scroll container, so it scales with the zoom too.
    canvasWrapEl.style.setProperty('--zoom', state.zoom);
    zoomLevelEl.textContent = Math.round(state.zoom * 100) + '%';
}
// Zooms and scrolls so every block on the canvas is in view.
function fitView() {
    if (!state.nodes.length) { setZoom(1); canvasWrapEl.scrollLeft = 0; canvasWrapEl.scrollTop = 0; return; }
    const pad = 60;
    const minX = Math.min(...state.nodes.map(n => n.x)) - pad;
    const minY = Math.min(...state.nodes.map(n => n.y)) - pad;
    const maxX = Math.max(...state.nodes.map(n => n.x)) + NODE_W + pad;
    const maxY = Math.max(...state.nodes.map(n => n.y)) + NODE_H + pad;
    const r = canvasWrapEl.getBoundingClientRect();
    if (!r.width || !r.height) return;
    const z = Math.min(1, Math.max(MIN_ZOOM, Math.min(r.width / (maxX - minX), r.height / (maxY - minY))));
    state.zoom = z;
    applyZoom();
    canvasWrapEl.scrollLeft = Math.max(0, minX * z - Math.max(0, (r.width - (maxX - minX) * z) / 2));
    canvasWrapEl.scrollTop = Math.max(0, minY * z - Math.max(0, (r.height - (maxY - minY) * z) / 2));
}
function setZoom(z, anchor) {
    const old = state.zoom;
    const newZ = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z));
    if (newZ === old) return;
    if (anchor) {
        const canvasX = (canvasWrapEl.scrollLeft + anchor.x) / old;
        const canvasY = (canvasWrapEl.scrollTop + anchor.y) / old;
        state.zoom = newZ;
        applyZoom();
        canvasWrapEl.scrollLeft = canvasX * newZ - anchor.x;
        canvasWrapEl.scrollTop = canvasY * newZ - anchor.y;
    } else {
        state.zoom = newZ;
        applyZoom();
    }
}

// ============================================================
// LIBRARY
// ============================================================
function renderLibrary() {
    libraryListEl.innerHTML = '';
    const header = $('lbl-library');
    const inSub = state.canvasStack.length > 0;
    const q = state.librarySearch.trim().toLowerCase();
    const matches = (type) => {
        if (!q) return true;
        const def = NODE_DEFS[type];
        const hay = [tx(def.label), tx(def.short), tx(def.category), type, opOf(type)].join(' ').toLowerCase();
        return hay.includes(q);
    };

    if (inSub) {
        const parentType = state.canvasStack[state.canvasStack.length - 1].ownerNodeType;
        if (header) header.textContent = tt('subLibraryTitle') + ' · ' + tx(NODE_DEFS[parentType].label);
        const items = (SUB_TOOLS[parentType] || []).filter(matches);
        const sec = document.createElement('div');
        sec.className = 'library-section';
        sec.innerHTML = `<div class="library-section-title">${escapeHtml(tx(NODE_DEFS[parentType].label))}</div>`;
        items.forEach(type => sec.appendChild(libItem(type)));
        libraryListEl.appendChild(sec);
        if (!items.length) libraryListEl.insertAdjacentHTML('beforeend', `<div class="library-empty">${tt('noBlocks')}</div>`);
        return;
    }

    if (header) header.textContent = tt('library');
    let shown = 0;
    LIBRARY_GROUPS.forEach(group => {
        const items = group.items.filter(matches);
        if (!items.length) return;
        shown += items.length;
        const sec = document.createElement('div');
        sec.className = 'library-section';
        sec.innerHTML = `<div class="library-section-title">${tt(group.title)}</div>`;
        items.forEach(type => sec.appendChild(libItem(type)));
        libraryListEl.appendChild(sec);
    });
    if (!shown) libraryListEl.innerHTML = `<div class="library-empty">${tt('noBlocks')}</div>`;
}

function libItem(type) {
    const def = NODE_DEFS[type];
    const item = document.createElement('div');
    item.className = 'lib-item';
    item.dataset.type = type;
    item.title = tx(def.short);
    item.innerHTML = `
        <div class="lib-icon ${def.color || ''}">${iconFor(type)}</div>
        <div class="lib-label">${escapeHtml(tx(def.label))}</div>
    `;
    item.addEventListener('mousedown', (e) => startLibraryDrag(type, e));
    return item;
}

function renderBreadcrumb() {
    const el = $('breadcrumb');
    if (!el) return;
    if (!state.canvasStack.length) {
        el.classList.remove('show');
        el.innerHTML = '';
        return;
    }
    const ownerType = state.canvasStack[state.canvasStack.length - 1].ownerNodeType;
    el.innerHTML = `
        <span class="crumb" id="crumb-top">${tt('topCrumb')}</span>
        <span class="sep">›</span>
        <span class="crumb current">${escapeHtml(tx(NODE_DEFS[ownerType].label))}</span>
    `;
    el.classList.add('show');
    $('crumb-top').addEventListener('click', surface);
}

// ============================================================
// SUB-CANVAS (dive into a block) — one level deep
// ============================================================
function openSubCanvas(node) {
    if (state.canvasStack.length) return;
    if (state.running) return;
    if (!SUB_TOOLS[node.type]) return;

    const snapshot = {
        nodes: state.nodes,
        connections: state.connections,
        nextNodeId: state.nextNodeId,
        nextConnId: state.nextConnId,
        selectedNodeId: state.selectedNodeId,
        zoom: state.zoom,
        scrollLeft: canvasWrapEl.scrollLeft,
        scrollTop: canvasWrapEl.scrollTop
    };
    state.canvasStack.push({ ownerNodeId: node.id, ownerNodeType: node.type, snapshot });

    if (!node.children) {
        node.children = { nodes: [], connections: [], nextNodeId: 1, nextConnId: 1 };
        const lvl = LEVELS[state.currentLevel];
        const levelSeed = lvl && lvl.subSeeds && lvl.subSeeds[node.type];
        const seed = levelSeed === null ? null : (levelSeed || SUB_SEED[node.type]);
        if (seed) {
            seed.nodes.forEach((sn) => {
                node.children.nodes.push({ id: 'n' + node.children.nextNodeId++, type: sn.type, x: sn.x, y: sn.y, flipped: false });
            });
            (seed.connections || []).forEach(([fromIdx, toIdx]) => {
                const a = node.children.nodes[fromIdx];
                const b = node.children.nodes[toIdx];
                if (!a || !b) return;
                node.children.connections.push({ id: 'c' + node.children.nextConnId++, from: a.id, to: b.id });
            });
        }
    }

    const swap = () => {
        state.nodes = node.children.nodes;
        state.connections = node.children.connections;
        state.nextNodeId = node.children.nextNodeId;
        state.nextConnId = node.children.nextConnId;
        state.selectedNodeId = null;
        renderLibrary();
        renderAll();
        renderBreadcrumb();
        renderExplainSteps();
        canvasWrapEl.scrollLeft = 0;
        canvasWrapEl.scrollTop = 0;
    };
    const rotator = $('library-rotator');
    if (rotator) {
        rotator.classList.add('rotate-out');
        setTimeout(() => { swap(); rotator.classList.remove('rotate-out'); }, 200);
    } else swap();
}

function surface() {
    if (!state.canvasStack.length) return;
    if (state.running) return;
    const frame = state.canvasStack[state.canvasStack.length - 1];
    const snapshot = frame.snapshot;
    const owner = snapshot.nodes.find(n => n.id === frame.ownerNodeId);
    if (owner && owner.children) {
        owner.children.nodes = state.nodes;
        owner.children.connections = state.connections;
        owner.children.nextNodeId = state.nextNodeId;
        owner.children.nextConnId = state.nextConnId;
    }
    state.canvasStack.pop();

    const restore = () => {
        state.nodes = snapshot.nodes;
        state.connections = snapshot.connections;
        state.nextNodeId = snapshot.nextNodeId;
        state.nextConnId = snapshot.nextConnId;
        state.selectedNodeId = snapshot.selectedNodeId;
        renderLibrary();
        renderAll();
        renderBreadcrumb();
        renderExplainSteps();
        canvasWrapEl.scrollLeft = snapshot.scrollLeft;
        canvasWrapEl.scrollTop = snapshot.scrollTop;
    };
    const rotator = $('library-rotator');
    if (rotator) {
        rotator.classList.add('rotate-out');
        setTimeout(() => { restore(); rotator.classList.remove('rotate-out'); }, 200);
    } else restore();
}

// ============================================================
// LEVELS MENU / NODES / CONNECTIONS
// ============================================================
function renderLevelsMenu() {
    levelsMenuEl.innerHTML = '';
    LECTURES.forEach((lec) => {
        const header = document.createElement('div');
        header.className = 'level-section-title';
        header.textContent = tx(lec.title);
        levelsMenuEl.appendChild(header);
        let n = 0;
        LEVELS.forEach((lvl, idx) => {
            if (lvl.lec !== lec.id) return;
            n++;
            const done = state.completed.has(idx);
            const tag = lvl.fix ? `<span class="level-tag fix">${tt('fixIt')}</span>`
                : lvl.expectedGraph ? `<span class="level-tag graph">${tt('graphTag')}</span>` : '';
            const item = document.createElement('div');
            item.className = 'level-item' + (idx === state.currentLevel ? ' active' : '') + (done ? ' done' : '');
            item.innerHTML = `
                <div class="level-item-num">${done ? '✓' : n}</div>
                <div class="level-item-body">
                    <div class="level-item-title">${escapeHtml(tx(lvl.title))}${tag}</div>
                    <div class="level-item-mission">${escapeHtml(tx(lvl.mission))}</div>
                </div>
            `;
            item.addEventListener('click', () => {
                loadLevel(idx);
                levelsDropdown.classList.remove('open');
            });
            levelsMenuEl.appendChild(item);
        });
    });
}

// Where a task sits inside its lecture: "Effects · Task 2".
function levelPlace(idx) {
    const lvl = LEVELS[idx];
    return {
        lec: LECTURES.find(l => l.id === lvl.lec),
        n: LEVELS.filter((l, i) => l.lec === lvl.lec && i <= idx).length
    };
}

function renderNodes() {
    nodesContainer.innerHTML = '';
    state.nodes.forEach(node => {
        const def = NODE_DEFS[node.type];
        if (!def) return;
        const el = document.createElement('div');
        el.className = 'node' + (node.flipped ? ' flipped' : '') + (state.selectedNodeId === node.id ? ' selected' : '');
        el.style.left = node.x + 'px';
        el.style.top = node.y + 'px';
        el.dataset.id = node.id;

        const inCount = state.connections.filter(c => c.to === node.id).length;
        const outCount = state.connections.filter(c => c.from === node.id).length;
        const hasIn = inCount > 0;
        const hasOut = outCount > 0;
        const canDive = !state.canvasStack.length && !!SUB_TOOLS[node.type];
        const op = opOf(node.type);

        el.innerHTML = `
            <div class="node-inner">
                <div class="node-face node-front">
                    <div class="node-badge" data-badge></div>
                    <div class="node-header">
                        <div class="node-icon ${def.color || ''}">${iconFor(node.type)}</div>
                        <div class="node-title">${escapeHtml(tx(def.label))}</div>
                        <div class="node-actions">
                            ${canDive ? `<button class="node-btn dive-btn" title="${tt('dveTooltip')}">${I.dive}</button>` : ''}
                            <button class="node-btn delete" title="Delete">${I.close}</button>
                        </div>
                    </div>
                    <div class="node-body">${escapeHtml(tx(def.short))}</div>
                    <div class="node-tag">${escapeHtml(op || tx(def.category))}</div>
                    <div class="port port-in ${hasIn ? 'connected' : ''}" data-port="in" ${inCount > 1 ? `data-count="${inCount}"` : ''}></div>
                    <div class="port port-out ${hasOut ? 'connected' : ''}" data-port="out" ${outCount > 1 ? `data-count="${outCount}"` : ''}></div>
                </div>
                <div class="node-face node-back">
                    <div class="node-back-title">${escapeHtml(tx(def.label))}</div>
                    <div class="node-back-text">${escapeHtml(tx(def.long))}</div>
                    <div class="node-back-hint">${tt('dblToFlip')}</div>
                </div>
            </div>
        `;

        el.addEventListener('mousedown', (e) => onNodeMouseDown(e, node));
        el.addEventListener('click', (e) => onNodeClick(e, node));
        el.addEventListener('dblclick', (e) => {
            if (e.target.closest('.port, .node-btn')) return;
            e.preventDefault();
            flipNode(node.id);
        });
        nodesContainer.appendChild(el);
    });
}

// The point halfway along the curve drawn by bezier().
function bezierMid(sx, sy, tx, ty) {
    const dx = Math.max(40, Math.abs(tx - sx) * 0.5);
    return {
        x: (sx + 3 * (sx + dx) + 3 * (tx - dx) + tx) / 8,
        y: (sy + 3 * sy + 3 * ty + ty) / 8
    };
}

function renderConnections() {
    Array.from(svgEl.querySelectorAll('.conn-group, .conn, .conn-hit')).forEach(n => n.remove());
    const sel = state.selectedNodeId;
    state.connections.forEach(conn => {
        const from = state.nodes.find(n => n.id === conn.from);
        const to = state.nodes.find(n => n.id === conn.to);
        if (!from || !to) return;
        const sp = portPos(from, 'out');
        const tp = portPos(to, 'in');
        const d = bezier(sp.x, sp.y, tp.x, tp.y);

        const g = document.createElementNS(SVG_NS, 'g');
        g.setAttribute('class', 'conn-group' + (sel && (conn.from === sel || conn.to === sel) ? ' linked' : ''));

        const hit = document.createElementNS(SVG_NS, 'path');
        hit.setAttribute('d', d);
        hit.setAttribute('class', 'conn-hit');
        hit.addEventListener('click', () => removeConnection(conn.id));
        g.appendChild(hit);

        const path = document.createElementNS(SVG_NS, 'path');
        path.setAttribute('d', d);
        path.setAttribute('class', 'conn');
        path.dataset.id = conn.id;
        g.appendChild(path);

        // A small × at the middle of the curve, shown on hover.
        if (!state.readonly) {
            const m = bezierMid(sp.x, sp.y, tp.x, tp.y);
            const del = document.createElementNS(SVG_NS, 'g');
            del.setAttribute('class', 'conn-del');
            del.setAttribute('transform', `translate(${m.x} ${m.y})`);
            del.innerHTML = `<title>${escapeHtml(tt('removeLink'))}</title><circle r="10"></circle><path d="M-3.5 -3.5 L3.5 3.5 M3.5 -3.5 L-3.5 3.5"></path>`;
            del.addEventListener('click', (e) => { e.stopPropagation(); removeConnection(conn.id); });
            g.appendChild(del);
        }
        svgEl.appendChild(g);
    });
    renderTaskPanel();
}

// ============================================================
// INSPECTOR
// ============================================================
const API_BLOCKS = ['apiEndpoint', 'apiKey', 'fetchCall'];

function renderInspector() {
    const node = state.nodes.find(n => n.id === state.selectedNodeId);
    if (!node) {
        inspectorTitle.textContent = tt('selectBlock');
        inspectorBody.innerHTML = `
            <div class="inspector-empty">
                <div class="inspector-empty-icon">${I.info}</div>
                <div class="inspector-empty-title">${tt('nothingSel')}</div>
                <div class="inspector-empty-text">${tt('clickAnyBlock')}</div>
            </div>
        `;
        return;
    }
    const def = NODE_DEFS[node.type];
    inspectorTitle.textContent = tx(def.label);
    const apiSection = API_BLOCKS.includes(node.type) ? apiFormHtml('insp') : '';
    inspectorBody.innerHTML = `
        ${apiSection}
        <div class="insp-section">
            <div class="insp-section-label">${tt('whatDoes')}</div>
            <div class="insp-text">${escapeHtml(tx(def.long))}</div>
        </div>
        ${def.io ? `<div class="insp-section">
            <div class="insp-section-label">${tt('dataShape')}</div>
            <div class="insp-preview">${escapeHtml(tx(def.io))}</div>
        </div>` : ''}
        <div class="insp-section">
            <div class="insp-section-label">${tt('fileSrc')}</div>
            <div class="insp-file">${escapeHtml(def.file)}</div>
        </div>
        <div class="insp-section">
            <div class="insp-section-label">${tt('codeEx')}</div>
            <div class="insp-code">${def.code}</div>
        </div>
        <div class="insp-section">
            <div class="insp-section-label">${tt('commonMistake')}</div>
            <div class="insp-mistake">
                <div class="insp-mistake-icon">${I.warning}</div>
                <div class="insp-mistake-text">${escapeHtml(tx(def.mistake))}</div>
            </div>
        </div>
    `;
    if (apiSection) wireApiForm('insp');
}

// The API form — rendered both in the inspector and in the API overlay.
function apiFormHtml(ns) {
    const a = state.api;
    const opt = (val, key) => `<option value="${val}" ${a.scheme === val ? 'selected' : ''}>${tt(key)}</option>`;
    return `
        <div class="insp-section">
            <div class="insp-section-label">${tt('apiTitle')}</div>

            <div class="insp-field">
                <div class="insp-field-label">${tt('apiUrlLabel')}</div>
                <input class="insp-input" id="${ns}-api-url" placeholder="https://fakestoreapi.com/products" value="${escapeHtml(a.url)}">
                <div class="insp-hint">${tt('apiUrlHint')}</div>
            </div>

            <div class="insp-field">
                <div class="insp-field-label">${tt('apiKeyLabel')}</div>
                <div class="insp-row">
                    <input class="insp-input" id="${ns}-api-key" type="${a.revealKey ? 'text' : 'password'}" autocomplete="off" spellcheck="false" placeholder="sk-..." value="${escapeHtml(a.key)}">
                    <button class="insp-btn" id="${ns}-api-reveal">${a.revealKey ? tt('apiHide') : tt('apiShow')}</button>
                </div>
                <div class="insp-hint">${tt('apiKeyHint')}</div>
            </div>

            <div class="insp-field">
                <div class="insp-field-label">${tt('apiSchemeLabel')}</div>
                <select class="insp-select" id="${ns}-api-scheme">
                    ${opt('none', 'apiSchemeNone')}
                    ${opt('bearer', 'apiSchemeBearer')}
                    ${opt('header', 'apiSchemeHeader')}
                    ${opt('query', 'apiSchemeQuery')}
                </select>
            </div>

            <div class="insp-field ${a.scheme === 'header' ? '' : 'panel-hidden'}" id="${ns}-api-headerwrap">
                <div class="insp-field-label">${tt('apiHeaderLabel')}</div>
                <input class="insp-input" id="${ns}-api-header" placeholder="x-api-key" value="${escapeHtml(a.headerName)}">
            </div>

            <div class="insp-field ${a.scheme === 'query' ? '' : 'panel-hidden'}" id="${ns}-api-paramwrap">
                <div class="insp-field-label">${tt('apiParamLabel')}</div>
                <input class="insp-input" id="${ns}-api-param" placeholder="apikey" value="${escapeHtml(a.paramName)}">
            </div>

            <div class="insp-field">
                <div class="insp-field-label">${tt('apiPathLabel')}</div>
                <input class="insp-input" id="${ns}-api-path" placeholder="products" value="${escapeHtml(a.path)}">
                <div class="insp-hint">${tt('apiPathHint')}</div>
            </div>

            <div class="insp-field">
                <div class="insp-field-label">${tt('apiRequestPreview')}</div>
                <div class="insp-preview" id="${ns}-api-preview">${escapeHtml(requestPreview())}</div>
            </div>

            <div class="insp-row">
                <button class="insp-btn primary" id="${ns}-api-test">${tt('apiTest')}</button>
                <button class="insp-btn" id="${ns}-api-clear">${tt('apiClear')}</button>
            </div>
            <div class="insp-status" id="${ns}-api-status"></div>

            <div class="insp-note" style="margin-top:12px;">
                <span>${I.info}</span>
                <span>${tt('apiSharedNote')} ${tt('apiCorsNote')}</span>
            </div>
        </div>
    `;
}

// A readable summary of the request the current config would send.
function requestPreview() {
    const a = state.api;
    const url = buildUrl(a) || 'https://shop.local/api/products (mock)';
    const headers = buildHeaders(a, false);
    const shown = Object.entries(headers)
        .map(([k, v]) => k + ': ' + (k.toLowerCase() === 'authorization' ? 'Bearer ' + maskKey(a.key) : (k === a.headerName ? maskKey(a.key) : v)))
        .join('\n  ');
    return 'GET ' + (a.scheme === 'query' && a.key ? url.replace(encodeURIComponent(a.key), maskKey(a.key)) : url) + '\n  ' + shown;
}

function wireApiForm(ns) {
    const g = (suffix) => $(ns + '-api-' + suffix);
    const stop = (el) => {
        if (!el) return;
        el.addEventListener('mousedown', (e) => e.stopPropagation());
        el.addEventListener('keydown', (e) => e.stopPropagation());
    };
    const refresh = () => {
        const prev = g('preview');
        if (prev) prev.textContent = requestPreview();
        renderCodePanel();
    };
    const bindInput = (suffix, field) => {
        const el = g(suffix);
        if (!el) return;
        stop(el);
        el.addEventListener('input', (e) => {
            state.api[field] = e.target.value;
            saveApiConfig();
            refresh();
        });
    };
    bindInput('url', 'url');
    bindInput('key', 'key');
    bindInput('header', 'headerName');
    bindInput('param', 'paramName');
    bindInput('path', 'path');

    const scheme = g('scheme');
    if (scheme) {
        stop(scheme);
        scheme.addEventListener('change', (e) => {
            state.api.scheme = e.target.value;
            saveApiConfig();
            const hw = g('headerwrap');
            const pw = g('paramwrap');
            if (hw) hw.classList.toggle('panel-hidden', state.api.scheme !== 'header');
            if (pw) pw.classList.toggle('panel-hidden', state.api.scheme !== 'query');
            refresh();
        });
    }
    const reveal = g('reveal');
    if (reveal) {
        reveal.addEventListener('click', () => {
            state.api.revealKey = !state.api.revealKey;
            const input = g('key');
            if (input) input.type = state.api.revealKey ? 'text' : 'password';
            reveal.textContent = state.api.revealKey ? tt('apiHide') : tt('apiShow');
        });
    }
    const clear = g('clear');
    if (clear) {
        clear.addEventListener('click', () => {
            state.api.url = '';
            state.api.key = '';
            state.api.scheme = 'none';
            state.api.path = '';
            saveApiConfig();
            if (state.selectedNodeId) renderInspector();
            renderApiOverlay();
            renderCodePanel();
        });
    }
    const test = g('test');
    if (test) {
        test.addEventListener('click', async () => {
            const statusEl = g('status');
            if (statusEl) { statusEl.className = 'insp-status'; statusEl.textContent = tt('apiTesting'); }
            const result = await testApiRequest();
            if (!statusEl) return;
            statusEl.className = 'insp-status ' + (result.ok ? 'ok' : 'bad');
            statusEl.textContent = result.ok
                ? tt('apiOk') + ' ' + result.summary
                : tt('apiFail') + ': ' + result.message;
        });
    }
}

// Fires one real request with the current settings and reports what came back.
async function testApiRequest() {
    const a = state.api;
    const url = buildUrl(a);
    if (!url) return { ok: false, message: tt('apiUrlLabel') + ' — ?' };
    try {
        const res = await fetch(url, { headers: buildHeaders(a, false) });
        if (!res.ok) return { ok: false, message: 'HTTP ' + res.status };
        const json = await res.json();
        const arr = pickArray(json, a.path);
        const summary = Array.isArray(arr)
            ? arr.length + ' ' + tt('items')
            : Object.keys(json || {}).length + ' keys';
        return { ok: true, summary };
    } catch (err) {
        return { ok: false, message: err.message };
    }
}

function saveApiConfig() {
    try {
        const { url, key, scheme, headerName, paramName, path } = state.api;
        localStorage.setItem(API_STORE_KEY, JSON.stringify({ url, key, scheme, headerName, paramName, path }));
    } catch (_) {}
}
function loadApiConfig() {
    try {
        const raw = localStorage.getItem(API_STORE_KEY);
        if (!raw) return;
        Object.assign(state.api, JSON.parse(raw));
    } catch (_) {}
}

function renderApiOverlay() {
    const body = $('api-body');
    if (!body) return;
    body.innerHTML = apiFormHtml('ovl');
    wireApiForm('ovl');
}

// ============================================================
// BOTTOM PANEL: Trace / Data / Code
// ============================================================
function setPanel(tab) {
    state.panel = tab;
    document.querySelectorAll('.panel-tab').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
    explainBodyEl.classList.toggle('panel-hidden', tab !== 'trace');
    dataBodyEl.classList.toggle('panel-hidden', tab !== 'data');
    codeBodyEl.classList.toggle('panel-hidden', tab !== 'code');
    if (tab === 'code') renderCodePanel();
    if (tab === 'data') renderDataPanel();
}

function renderExplainSteps(count) {
    explainStepsEl.innerHTML = '';
    if (state.canvasStack.length && count == null) return;
    let n = count;
    if (n == null) {
        if (state.task) return;
        const lvl = LEVELS[state.currentLevel];
        n = (lvl.expected || (lvl.expectedGraph && lvl.expectedGraph.nodes) || []).length;
    }
    Array.from({ length: n }).forEach(() => {
        const dot = document.createElement('div');
        dot.className = 'explain-dot';
        explainStepsEl.appendChild(dot);
    });
}
function markStep(i) {
    const dots = explainStepsEl.querySelectorAll('.explain-dot');
    dots.forEach((d, idx) => {
        d.classList.remove('active');
        if (idx < i) d.classList.add('done');
        if (idx === i) d.classList.add('active');
    });
}

function appendLog(text, kind = '') {
    if (explainBodyEl.querySelector('.explain-empty')) explainBodyEl.innerHTML = '';
    const entry = document.createElement('div');
    entry.className = 'log-entry ' + (kind || '');
    entry.innerHTML = `<span class="log-time">${nowTime()}</span><span class="log-dot"></span><span class="log-text">${text}</span>`;
    explainBodyEl.appendChild(entry);
    explainBodyEl.scrollTop = explainBodyEl.scrollHeight;
}

// The Data tab: the real value after every block, and how big it got.
function renderDataPanel() {
    if (!state.trace.length) {
        dataBodyEl.innerHTML = `<div class="data-empty">${tt('dataEmpty')}</div>`;
        return;
    }
    dataBodyEl.innerHTML = state.trace.map((step, i) => {
        const def = NODE_DEFS[step.type];
        const beforeSize = sizeOf(step.before);
        const afterSize = sizeOf(step.after);
        let pillClass = '';
        if (beforeSize != null && afterSize != null) {
            if (afterSize < beforeSize) pillClass = 'shrink';
            else if (afterSize > beforeSize) pillClass = 'grow';
        }
        const changed = step.changed ? ' changed' : '';
        const errHtml = step.error
            ? `<div class="insp-mistake" style="margin-top:6px;">
                   <div class="insp-mistake-icon">${I.warning}</div>
                   <div class="insp-mistake-text">${escapeHtml(step.error)}</div>
               </div>`
            : '';
        return `
            <div class="data-step${changed}">
                <div class="data-step-num">${i + 1}</div>
                <div class="data-step-main">
                    <div class="data-step-head">
                        <span class="data-step-label">${escapeHtml(tx(def.label))}</span>
                        <span class="data-step-op">${escapeHtml(step.op || '')}</span>
                        <span class="data-pill ${pillClass}">${escapeHtml(sizeLabel(step.after))}</span>
                    </div>
                    <div class="data-value">${escapeHtml(formatValue(step.after))}</div>
                    ${errHtml}
                </div>
            </div>`;
    }).join('');
}

// The Code tab: the JavaScript the canvas currently describes.
function renderCodePanel() {
    const order = currentOrder();
    if (!order || order.length < 1) {
        codeBodyEl.innerHTML = `<div class="data-empty">${tt('codeEmpty')}</div>`;
        return;
    }
    const src = generateCode(order);
    codeBodyEl.innerHTML = `<div class="code-out"><button class="code-copy" id="code-copy">${tt('copy')}</button>${highlightJs(src)}</div>`;
    const btn = $('code-copy');
    if (btn) {
        btn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(src);
                showToast('', tt('copied'), 'success');
            } catch (_) {
                showToast('', tt('copied'), 'info');
            }
        });
    }
}

// A flow is drawn in the order things happen; a component file is written in
// another order. Each block puts its lines into a part of the component
// (see the CODE TAB comment in react-data.js) and the parts are assembled here.
function generateCode(order) {
    const types = order.map(id => (state.nodes.find(n => n.id === id) || {}).type).filter(Boolean);
    const slots = { top: [], hooks: [], effect: [], handler: [], body: [], jsx: [], after: [] };
    const c = {
        v: '', types, slots, api: state.api,
        zone: 'body', slot: null,
        name: 'DishList', params: '', exported: false,
        effect: false, deps: null, handler: false,
        open: [], indentAfter: 0, headers: false, options: false, queryKey: false, url: null,
        canAwait: types.includes('awaitOp') || types.includes('asyncFn'),
        thenStyle: types.includes('promiseThen')
    };
    types.forEach(t => {
        const sim = SIM[t];
        if (!sim || !sim.gen) return;
        c.slot = null;
        const lines = sim.gen(c) || [];
        const target = slots[c.slot || c.zone] || slots.body;
        lines.forEach(l => target.push(l));
    });

    const out = [];
    const put = (lines, indent) => lines.forEach(l => out.push(l ? '  '.repeat(indent) + l : ''));
    const gap = () => { if (out.length && out[out.length - 1] !== '') out.push(''); };
    put(slots.top, 0);
    const inside = slots.hooks.length + slots.effect.length + slots.handler.length + slots.body.length + slots.jsx.length;
    if (inside) {
        gap();
        out.push((c.exported ? 'export ' : '') + 'function ' + c.name + '(' + c.params + ') {');
        put(slots.hooks, 1);
        if (c.effect) {
            if (slots.hooks.length) out.push('');
            out.push('  useEffect(() => {');
            put(slots.effect, 2);
            out.push(c.deps === null ? '  }); // no dependency array: runs after EVERY render' : '  }, [' + c.deps + ']);');
        } else put(slots.effect, 1);
        if (c.handler) {
            if (slots.hooks.length || c.effect) out.push('');
            out.push('  function handleAdd(dish: Dish) {');
            put(slots.handler, 2);
            out.push('  }');
        } else put(slots.handler, 1);
        if (slots.body.length) { if (out[out.length - 1].slice(-1) !== '{') out.push(''); put(slots.body, 1); }
        if (slots.jsx.length) { if (out[out.length - 1].slice(-1) !== '{') out.push(''); put(slots.jsx, 1); }
        out.push('}');
    }
    if (slots.after.length) { gap(); put(slots.after, 0); }
    while (out.length && out[0] === '') out.shift();
    return out.join('\n');
}

// Minimal JS highlighter for the generated source.
function highlightJs(src) {
    const esc = String(src).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const re = /(\/\/[^\n]*)|('[^'\n]*'|"[^"\n]*"|`[^`]*`)|\b(const|let|var|function|async|await|return|if|else|for|of|in|new|try|catch|throw|import|export|from|default|class|switch|case|true|false|null|undefined)\b|\b(\d+)\b/g;
    return esc.replace(re, (m, comment, str, kw, num) => {
        if (comment) return '<span class="c">' + comment + '</span>';
        if (str) return '<span class="s">' + str + '</span>';
        if (kw) return '<span class="k">' + kw + '</span>';
        if (num) return '<span class="n">' + num + '</span>';
        return m;
    });
}

function renderHeader() {
    const task = state.task;
    document.body.classList.toggle('task-mode', !!task);
    if (task) {
        levelNumEl.textContent = tt('taskLabel') + ' ' + (TASKS.indexOf(task) + 1);
        levelTitleEl.textContent = tx(task.title);
        missionTextEl.textContent = tx(task.goal);
        return;
    }
    const lvl = LEVELS[state.currentLevel];
    const place = levelPlace(state.currentLevel);
    levelNumEl.textContent = tx(place.lec.short || place.lec.title) + ' · ' + tt('taskWord') + ' ' + place.n;
    levelTitleEl.textContent = tx(lvl.title);
    missionTextEl.textContent = tx(lvl.mission);
    document.title = tx(lvl.title) + ' · React Flow Lab';
}
function renderEmptyExplain() {
    explainBodyEl.innerHTML = `<div class="explain-empty">${tt('emptyExplain')} <strong style="color: var(--brand);">${tt('runFlowB')}</strong> ${tt('toWatch')}</div>`;
}
function renderUIStrings() {
    $('lbl-levels').textContent = tt('levels');
    $('lbl-reset').textContent = tt('reset');
    $('lbl-check').textContent = tt('checkAnswer');
    $('lbl-run').textContent = tt('runFlow');
    $('lbl-library').textContent = tt('library');
    $('lbl-inspector').textContent = tt('inspector');
    $('lbl-howitworks').textContent = tt('howWorks');
    $('lbl-mission').textContent = tt('mission');
    $('lbl-examples').textContent = tt('examplesTitle');
    $('lbl-examples-title').textContent = tt('examplesTitle');
    $('lbl-readonly').textContent = tt('readonlyHint');
    $('example-load-editable').textContent = tt('loadEditable');
    $('lbl-api-title').textContent = tt('apiTitle');
    $('lbl-tab-trace').textContent = tt('tabTrace');
    $('lbl-tab-data').textContent = tt('tabData');
    $('lbl-tab-code').textContent = tt('tabCode');
    $('lbl-console').textContent = tt('consoleTitle');
    $('lbl-console-hint').textContent = tt('consoleHint');
    $('mission-hint').textContent = tt('showHint');
    $('mission-link').textContent = tt('copyLink');
    $('brand-name').textContent = tt('brand');
    $('brand-sub').textContent = tt('academy');
    $('lbl-tasks').textContent = tt('tasks');
    $('lbl-tasks-title').textContent = tt('tasksTitle');
    $('lbl-tasks-sub').textContent = tt('tasksSub');
    librarySearchEl.placeholder = tt('searchBlocks');
    applyPanels();
}

function renderAll() {
    renderNodes();
    renderConnections();
    renderInspector();
    if (state.panel === 'code') renderCodePanel();
}

// ============================================================
// NODE OPS
// ============================================================
function pushUndo() {
    state.undoStack.push({
        nodes: deepCloneNodes(state.nodes),
        connections: state.connections.map(c => ({ ...c }))
    });
    if (state.undoStack.length > 50) state.undoStack.shift();
    state.redoStack.length = 0;
}
function deepCloneNodes(nodes) {
    return nodes.map(n => {
        const copy = { ...n };
        if (n.children) {
            copy.children = {
                nodes: deepCloneNodes(n.children.nodes),
                connections: n.children.connections.map(c => ({ ...c })),
                nextNodeId: n.children.nextNodeId,
                nextConnId: n.children.nextConnId
            };
        }
        return copy;
    });
}
function applySnapshot(snap) {
    state.nodes = snap.nodes;
    state.connections = snap.connections;
    state.selectedNodeId = null;
    renderAll();
}
function undo() {
    if (!state.undoStack.length) return;
    state.redoStack.push({ nodes: deepCloneNodes(state.nodes), connections: state.connections.map(c => ({ ...c })) });
    applySnapshot(state.undoStack.pop());
}
function redo() {
    if (!state.redoStack.length) return;
    state.undoStack.push({ nodes: deepCloneNodes(state.nodes), connections: state.connections.map(c => ({ ...c })) });
    applySnapshot(state.redoStack.pop());
}

function addNode(type, x, y) {
    if (state.readonly) return null;
    pushUndo();
    const node = {
        id: 'n' + state.nextNodeId++,
        type,
        x: Math.max(10, x - NODE_W / 2),
        y: Math.max(10, y - NODE_H / 2),
        flipped: false
    };
    state.nodes.push(node);
    renderAll();
    return node;
}
function removeNode(id) {
    if (state.readonly) return;
    pushUndo();
    state.nodes = state.nodes.filter(n => n.id !== id);
    state.connections = state.connections.filter(c => c.from !== id && c.to !== id);
    if (state.selectedNodeId === id) state.selectedNodeId = null;
    renderAll();
}
// Is `toId` reachable from `fromId` along the current connections?
function reaches(fromId, toId) {
    const seen = new Set([fromId]);
    const queue = [fromId];
    while (queue.length) {
        const id = queue.shift();
        if (id === toId) return true;
        state.connections.forEach(c => {
            if (c.from === id && !seen.has(c.to)) { seen.add(c.to); queue.push(c.to); }
        });
    }
    return false;
}

// Any output can feed many inputs and any input can collect many outputs —
// the only thing that is refused is a loop, because data must flow forward.
function addConnection(fromId, toId) {
    if (state.readonly) return;
    if (fromId === toId) return;
    if (state.connections.some(c => c.from === fromId && c.to === toId)) return;
    if (reaches(toId, fromId)) {
        showToast(tt('wouldLoop'), tt('wouldLoopMsg'), 'warning');
        return;
    }
    pushUndo();
    state.connections.push({ id: 'c' + state.nextConnId++, from: fromId, to: toId });
    renderConnections();
    renderNodes();
    if (state.panel === 'code') renderCodePanel();
}
function removeConnection(id) {
    if (state.readonly) return;
    pushUndo();
    state.connections = state.connections.filter(c => c.id !== id);
    renderConnections();
    renderNodes();
    if (state.panel === 'code') renderCodePanel();
}
function flipNode(id) {
    const n = state.nodes.find(x => x.id === id);
    if (!n) return;
    n.flipped = !n.flipped;
    renderNodes();
}

// Lays the flow out in columns: every block sits one column to the right of
// its furthest parent, and branches stack vertically inside a column.
function autoLayout() {
    if (state.readonly || !state.nodes.length) return;
    const fg = flowGraph();
    if (!fg.acyclic) return;
    pushUndo();
    const parentsOf = (id) => state.connections.filter(c => c.to === id).map(c => c.from);
    const childrenOf = (id) => state.connections.filter(c => c.from === id).map(c => c.to);
    const linked = new Set();
    state.connections.forEach(c => { linked.add(c.from); linked.add(c.to); });

    const col = new Map();
    fg.order.forEach(id => {
        const ps = parentsOf(id);
        col.set(id, ps.length ? Math.max(...ps.map(p => col.get(p))) + 1 : 0);
    });
    // A source that only feeds a later block (an API key, a URL) moves up next to it.
    [...fg.order].reverse().forEach(id => {
        const kids = childrenOf(id);
        if (!parentsOf(id).length && kids.length) col.set(id, Math.min(...kids.map(k => col.get(k))) - 1);
    });

    const columns = new Map();
    fg.order.filter(id => linked.has(id)).forEach(id => {
        const c = col.get(id);
        if (!columns.has(c)) columns.set(c, []);
        columns.get(c).push(id);
    });
    const byId = new Map(state.nodes.map(n => [n.id, n]));
    const midY = 380, gapX = 260, gapY = 200;
    columns.forEach((ids, c) => {
        ids.sort((a, b) => byId.get(a).y - byId.get(b).y);
        ids.forEach((id, row) => {
            const node = byId.get(id);
            node.x = 80 + c * gapX;
            node.y = Math.max(40, Math.round(midY + (row - (ids.length - 1) / 2) * gapY));
        });
    });
    // Blocks that are not wired to anything wait in a row underneath.
    state.nodes.filter(n => !linked.has(n.id)).forEach((node, i) => {
        node.x = 80 + i * gapX;
        node.y = midY + 2 * gapY + 60;
    });
    renderAll();
    showToast('', tt('tidied'), 'info');
}

// ============================================================
// INTERACTIONS
// ============================================================
function startLibraryDrag(type, e) {
    if (state.readonly) return;
    e.preventDefault();
    const def = NODE_DEFS[type];
    const ghost = document.createElement('div');
    ghost.className = 'drag-ghost';
    ghost.innerHTML = `${iconFor(type)} ${escapeHtml(tx(def.label))}`;
    document.body.appendChild(ghost);
    const positionGhost = (ev) => {
        ghost.style.left = (ev.clientX + 10) + 'px';
        ghost.style.top = (ev.clientY + 10) + 'px';
    };
    positionGhost(e);
    const onMove = (ev) => positionGhost(ev);
    const onUp = (ev) => {
        ghost.remove();
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
        if (isOverCanvas(ev)) {
            const pos = eventToCanvas(ev);
            addNode(type, pos.x, pos.y);
        }
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
}

function onNodeMouseDown(e, node) {
    if (state.readonly && !e.target.closest('.node-btn.delete, .dive-btn')) return;
    if (e.target.closest('.dive-btn')) {
        e.stopPropagation();
        openSubCanvas(node);
        return;
    }
    if (e.target.closest('.node-btn.delete')) {
        e.stopPropagation();
        removeNode(node.id);
        return;
    }
    if (state.readonly) return;
    if (e.target.classList.contains('port')) {
        e.stopPropagation();
        startConnectionDrag(node, e.target.dataset.port, e);
        return;
    }
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const origX = node.x;
    const origY = node.y;
    const el = e.currentTarget;
    el.classList.add('dragging');
    let moved = false;
    const snap = (v) => state.snapToGrid ? Math.round(v / 20) * 20 : v;
    const onMove = (ev) => {
        node.x = Math.max(0, snap(origX + (ev.clientX - startX) / state.zoom));
        node.y = Math.max(0, snap(origY + (ev.clientY - startY) / state.zoom));
        el.style.left = node.x + 'px';
        el.style.top = node.y + 'px';
        moved = true;
        renderConnections();
    };
    const onUp = () => {
        el.classList.remove('dragging');
        if (moved && (node.x !== origX || node.y !== origY)) pushUndo();
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
}

function onNodeClick(e, node) {
    if (e.target.closest('.dive-btn') || e.target.closest('.node-btn.delete') || e.target.classList.contains('port')) return;
    state.selectedNodeId = node.id;
    renderNodes();
    renderConnections();
    renderInspector();
}

function startConnectionDrag(node, portType, e) {
    if (state.readonly) return;
    e.preventDefault();
    const isOutgoing = portType === 'out';
    const sp = portPos(node, portType);
    const pending = document.createElementNS(SVG_NS, 'path');
    pending.setAttribute('class', 'pending');
    svgEl.appendChild(pending);
    // Every port that could accept this connection lights up while dragging.
    canvasEl.classList.add(isOutgoing ? 'linking-out' : 'linking-in');
    let targetEl = null;
    const onMove = (ev) => {
        const rect = canvasEl.getBoundingClientRect();
        const mx = (ev.clientX - rect.left) / state.zoom;
        const my = (ev.clientY - rect.top) / state.zoom;
        pending.setAttribute('d', isOutgoing ? bezier(sp.x, sp.y, mx, my) : bezier(mx, my, sp.x, sp.y));
        const el = document.elementFromPoint(ev.clientX, ev.clientY);
        const port = el && el.classList && el.classList.contains('port') ? el : null;
        if (targetEl && targetEl !== port) targetEl.classList.remove('target');
        if (port && port.dataset.port === (isOutgoing ? 'in' : 'out')) {
            port.classList.add('target');
            targetEl = port;
        } else targetEl = null;
    };
    const onUp = (ev) => {
        pending.remove();
        canvasEl.classList.remove('linking-out', 'linking-in');
        if (targetEl) targetEl.classList.remove('target');
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
        const el = document.elementFromPoint(ev.clientX, ev.clientY);
        if (el && el.classList && el.classList.contains('port')) {
            if (el.dataset.port !== (isOutgoing ? 'in' : 'out')) {
                showToast(tt('wrongDir'), tt('wrongDirMsg'), 'warning');
                return;
            }
            const otherNodeEl = el.closest('.node');
            if (!otherNodeEl) return;
            const otherId = otherNodeEl.dataset.id;
            if (otherId === node.id) return;
            if (isOutgoing) addConnection(node.id, otherId);
            else addConnection(otherId, node.id);
        }
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
}

canvasEl.addEventListener('click', (e) => {
    if (state.justPanned) { state.justPanned = false; return; }
    if (e.target === canvasEl || e.target === svgEl || e.target === nodesContainer) {
        state.selectedNodeId = null;
        renderNodes();
        renderConnections();
        renderInspector();
    }
});

// ============================================================
// FLOW ANALYSIS
// ============================================================
function topologicalChain() {
    if (!state.nodes.length) return [];
    const incoming = new Map(state.nodes.map(n => [n.id, 0]));
    state.connections.forEach(c => incoming.set(c.to, (incoming.get(c.to) || 0) + 1));
    const starts = state.nodes.filter(n => incoming.get(n.id) === 0);
    if (starts.length !== 1) return null;
    const order = [starts[0].id];
    let current = starts[0].id;
    const visited = new Set([current]);
    while (true) {
        const next = state.connections.filter(c => c.from === current);
        if (next.length === 0) break;
        if (next.length > 1) return null;
        if (visited.has(next[0].to)) return null;
        order.push(next[0].to);
        visited.add(next[0].to);
        current = next[0].to;
    }
    return order;
}

// When several blocks are ready at once, scopes open first (async function,
// event handlers), then sources, then request config, then everything else —
// so the generated code reads the way a person would write it.
const GEN_RANK = {
    asyncFn: 0, eventListener: 0, delegation: 0, formSubmit: 0, setTimeoutBlk: 0, debounceBlk: 0, tryCatch: 0, eventLoop: 0,
    dataArray: 1, apiEndpoint: 1, localStore: 1, userInput: 1, importBlk: 1,
    apiKey: 2, httpGet: 2, httpPost: 2, httpPut: 2, httpDelete: 2, abortCtl: 2
};

// Kahn's algorithm with a priority — handles fan-in and fan-out. Among the
// ready blocks it picks by rank, then left to right, so a run moves across
// the canvas column by column.
// Branches fire in the order their blocks were placed (first in, first out):
// the React tasks and schemas were written and checked against this order.
function flowGraph() {
    const nodes = state.nodes;
    const indeg = new Map(nodes.map(n => [n.id, 0]));
    const outdeg = new Map(nodes.map(n => [n.id, 0]));
    const adj = new Map(nodes.map(n => [n.id, []]));
    state.connections.forEach(c => {
        indeg.set(c.to, (indeg.get(c.to) || 0) + 1);
        outdeg.set(c.from, (outdeg.get(c.from) || 0) + 1);
        (adj.get(c.from) || []).push(c.to);
    });
    const starts = nodes.filter(n => indeg.get(n.id) === 0).map(n => n.id);
    const remaining = new Map(indeg);
    const queue = [...starts];
    const order = [];
    while (queue.length) {
        const id = queue.shift();
        order.push(id);
        for (const next of adj.get(id) || []) {
            remaining.set(next, remaining.get(next) - 1);
            if (remaining.get(next) === 0) queue.push(next);
        }
    }
    return { order, acyclic: order.length === nodes.length, starts };
}

// The order used by the Code tab and by Run Flow. Blocks that are not
// connected to anything stay out of it.
function currentOrder() {
    const fg = flowGraph();
    if (!fg.acyclic) return null;
    if (state.nodes.length === 1) return fg.order;
    const linked = new Set();
    state.connections.forEach(c => { linked.add(c.from); linked.add(c.to); });
    return fg.order.filter(id => linked.has(id));
}

// ============================================================
// CHECK ANSWER
// ============================================================
function checkSubAnswers(lvl) {
    if (!lvl.subRequired) return null;
    const topNodes = state.canvasStack.length ? state.canvasStack[0].snapshot.nodes : state.nodes;
    for (const [parentType, expectedTypes] of Object.entries(lvl.subRequired)) {
        const node = topNodes.find(n => n.type === parentType);
        if (!node) continue;
        const presentTypes = node.children ? node.children.nodes.map(n => n.type) : [];
        const missing = expectedTypes.filter(t => !presentTypes.includes(t));
        if (missing.length) {
            return tt('subMissingMsg').replace('{block}', tx(NODE_DEFS[parentType].label))
                + ' (' + missing.map(t => tx(NODE_DEFS[t].label)).join(', ') + ')';
        }
    }
    return null;
}

function checkAnswer() {
    if (state.task) return checkTask();
    const lvl = LEVELS[state.currentLevel];
    if (lvl.expectedGraph) return checkAnswerGraph(lvl.expectedGraph);

    const order = topologicalChain();
    const expected = lvl.expected;
    if (!state.nodes.length) {
        showToast(tt('emptyFlow'), tt('emptyFlowMsg'), 'warning');
        return;
    }
    if (!order) {
        showToast(tt('notLinear'), tt('notLinearMsg'), 'warning');
        return;
    }
    if (order.length !== state.nodes.length) {
        showToast(tt('unconnected'), tt('unconnectedMsg'), 'warning');
        return;
    }
    const types = order.map(id => state.nodes.find(n => n.id === id).type);
    const matches = types.length === expected.length && types.every((t, i) => t === expected[i]);
    if (matches) {
        const subProblem = checkSubAnswers(lvl);
        if (subProblem) {
            showToast(tt('notQuite'), subProblem, 'warning');
            appendLog(subProblem, 'warning');
            return;
        }
        state.completed.add(state.currentLevel);
        saveProgress();
        showToast(tt('correct'), tt('correctMsg'), 'success');
        appendLog(tt('answerOk'), 'success');
        renderLevelsMenu();
    } else {
        const firstWrong = types.findIndex((t, i) => t !== expected[i]);
        let msg;
        if (firstWrong === -1) {
            msg = types.length < expected.length
                ? `${tt('almostMissing')} ${types.length + 1}.`
                : `${tt('extraAfter')} ${expected.length}.`;
        } else {
            msg = `${tt('position')} ${firstWrong + 1}: ${tt('expectedWord')} <strong>${escapeHtml(tx(NODE_DEFS[expected[firstWrong]].label))}</strong>, ${tt('butFound')} <strong>${escapeHtml(tx(NODE_DEFS[types[firstWrong]].label))}</strong>.`;
        }
        showToast(tt('notQuite'), msg, 'error');
        appendLog(msg, 'error');
    }
}

// Does the canvas hold exactly the flow the current task asks for? (No messages.)
function flowMatches(lvl) {
    const typeOf = new Map(state.nodes.map(n => [n.id, n.type]));
    if (lvl.expectedGraph) {
        if (!multisetEqual(state.nodes.map(n => n.type), lvl.expectedGraph.nodes)) return false;
        const userEdges = state.connections.map(c => typeOf.get(c.from) + '→' + typeOf.get(c.to));
        return multisetEqual(userEdges, lvl.expectedGraph.edges.map(([a, b]) => a + '→' + b)) && flowGraph().acyclic;
    }
    const order = topologicalChain();
    if (!order || order.length !== state.nodes.length || order.length !== lvl.expected.length) return false;
    return order.every((id, i) => typeOf.get(id) === lvl.expected[i]);
}

function saveProgress() {
    try { localStorage.setItem('rfl-done', JSON.stringify([...state.completed].map(i => LEVELS[i].id))); } catch (_) {}
}
function loadProgress() {
    try {
        JSON.parse(localStorage.getItem('rfl-done') || '[]').forEach((id) => {
            const i = LEVELS.findIndex(l => l.id === id);
            if (i >= 0) state.completed.add(i);
        });
    } catch (_) {}
}
// index.html#effects-2 opens that task; index.html#effects opens the first task of the lecture.
function levelFromHash() {
    let id = '';
    try { id = decodeURIComponent(location.hash.replace(/^#/, '')); } catch (_) {}
    if (!id) return -1;
    const i = LEVELS.findIndex(l => l.id === id);
    return i >= 0 ? i : LEVELS.findIndex(l => l.lec === id);
}

function multisetEqual(a, b) {
    if (a.length !== b.length) return false;
    const counts = new Map();
    for (const x of a) counts.set(x, (counts.get(x) || 0) + 1);
    for (const x of b) {
        if (!counts.has(x)) return false;
        const n = counts.get(x) - 1;
        if (n < 0) return false;
        counts.set(x, n);
    }
    return [...counts.values()].every(v => v === 0);
}

function checkAnswerGraph(expectedGraph) {
    if (!state.nodes.length) {
        showToast(tt('emptyFlow'), tt('emptyFlowMsg'), 'warning');
        return;
    }
    const types = state.nodes.map(n => n.type);
    if (!multisetEqual(types, expectedGraph.nodes)) {
        const missing = expectedGraph.nodes.filter(t => !types.includes(t));
        const extra = types.filter(t => !expectedGraph.nodes.includes(t));
        let msg = tt('notQuite');
        if (missing.length) msg = `${tt('expectedWord')} <strong>${escapeHtml(tx(NODE_DEFS[missing[0]].label))}</strong>.`;
        else if (extra.length) msg = `${tt('extraAfter')} — <strong>${escapeHtml(tx(NODE_DEFS[extra[0]].label))}</strong>.`;
        showToast(tt('notQuite'), msg, 'error');
        appendLog(msg, 'error');
        return;
    }
    const typeOf = new Map(state.nodes.map(n => [n.id, n.type]));
    const userEdges = state.connections.map(c => typeOf.get(c.from) + '→' + typeOf.get(c.to));
    const expectedEdges = expectedGraph.edges.map(([a, b]) => a + '→' + b);
    if (!multisetEqual(userEdges, expectedEdges)) {
        const missing = expectedEdges.filter(e => !userEdges.includes(e));
        let msg = tt('notQuite');
        if (missing.length) {
            const [a, b] = missing[0].split('→');
            msg = `${tt('expectedWord')} <strong>${escapeHtml(tx(NODE_DEFS[a].label))}</strong> → <strong>${escapeHtml(tx(NODE_DEFS[b].label))}</strong>.`;
        }
        showToast(tt('notQuite'), msg, 'error');
        appendLog(msg, 'error');
        return;
    }
    if (!flowGraph().acyclic) {
        showToast(tt('notQuite'), tt('notLinearMsg'), 'error');
        return;
    }
    state.completed.add(state.currentLevel);
    saveProgress();
    showToast(tt('correct'), tt('correctMsg'), 'success');
    appendLog(tt('answerOk'), 'success');
    renderLevelsMenu();
}

// ============================================================
// RUN FLOW — real values move through the blocks you connected
// ============================================================
function newRunContext(order) {
    // A flow that starts from what the user typed gets search results back.
    const useSearch = (order || []).some(id => (state.nodes.find(n => n.id === id) || {}).type === 'userInput');
    const ctx = {
        api: state.api,
        console: [],
        useSearch,
        payload: clone(currentMockData(useSearch)),
        payloadLoaded: false,
        requestUrl: DS().api,
        status: 200,
        live: false,
        target: '#list',
        value: undefined,
        lastArray: null,
        renderArray: null,
        html: '',
        // React lab: what the blocks count and remember during one run
        notes: [], state: {}, types: [], graph: false,
        renders: 0, requests: 0, readers: 0,
        inEffect: false, inHandler: false, hasDeps: false
    };
    return Object.assign(ctx, state.runCtx || {});
}
function currentMockData(useSearch) {
    const d = DS();
    return useSearch && d.search ? d.search : d.rows;
}

// Maps whatever an API returns onto the fields the current dataset uses
// (name / price / inStock for products), so real data flows through the
// same .filter() / .map() / template blocks.
function normalizeItems(arr) {
    const f = DS().f;
    return arr.slice(0, 40).map((p, i) => {
        if (!p || typeof p !== 'object') return { id: i + 1, [f.name]: String(p), [f.num]: 0, [f.ok]: true };
        const num = p[f.num] ?? p.price ?? p.cost ?? p.amount ?? 0;
        const ok = p[f.ok] ?? p.inStock ?? p.available ?? (typeof p.stock === 'number' ? p.stock > 0 : undefined);
        return {
            id: p.id ?? i + 1,
            [f.name]: String(p[f.name] ?? p.name ?? p.title ?? p.label ?? ('item ' + (i + 1))),
            [f.num]: typeof num === 'number' ? num : Number(String(num).replace(/[^0-9.]/g, '')) || 0,
            [f.ok]: ok === undefined ? true : !!ok
        };
    });
}

// Called by fetch(): does the real request when a URL is configured.
async function loadPayload(c) {
    if (c.payloadLoaded) return;
    c.payloadLoaded = true;
    const url = buildUrl(c.api);
    if (!url) {
        c.payload = clone(currentMockData(c.useSearch));
        return;
    }
    c.requestUrl = url;
    try {
        const res = await fetch(url, { headers: buildHeaders(c.api, false) });
        c.status = res.status;
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const json = await res.json();
        const arr = pickArray(json, c.api.path);
        if (Array.isArray(arr)) {
            c.payload = normalizeItems(arr);
            c.live = true;
            appendLog(tt('livePreview') + ' — ' + escapeHtml(shorten(url, 70)) + ' (' + c.payload.length + ' ' + tt('items') + ')', 'success');
        } else {
            c.payload = json;
            c.live = true;
            appendLog(tt('livePreview'), 'success');
        }
    } catch (err) {
        c.status = 0;
        c.payload = clone(currentMockData(c.useSearch));
        appendLog(tt('fetchFailed') + ' (' + escapeHtml(err.message) + ')', 'warning');
    }
}

async function runFlow() {
    if (state.running) return;
    // A single chain runs block by block. Anything with branches runs in
    // dependency order: a block fires when everything that feeds it has fired.
    const chain = topologicalChain();
    const linear = !!(chain && chain.length === state.nodes.length);
    let order = chain;
    if (!linear) {
        const fg = flowGraph();
        if (state.nodes.length && !fg.acyclic) {
            showToast(tt('nothingRun'), tt('notLinearMsg'), 'warning');
            return;
        }
        order = fg.order;
    }
    if (!order || order.length < 2 || !state.connections.length) {
        showToast(tt('nothingRun'), tt('nothingRunMsg'), 'warning');
        return;
    }

    state.running = true;
    state.trace = [];
    Array.from(nodesContainer.querySelectorAll('.node')).forEach(el => {
        el.classList.remove('firing');
        const b = el.querySelector('[data-badge]');
        if (b) { b.classList.remove('show'); b.textContent = ''; }
    });
    renderExplainSteps(order.length);
    explainBodyEl.innerHTML = '';
    dataBodyEl.innerHTML = '';

    const ctx = newRunContext(order);
    ctx.graph = !linear;
    ctx.types = order.map(id => (state.nodes.find(n => n.id === id) || {}).type);
    let stopped = false;
    for (let i = 0; i < order.length; i++) {
        // every wire into this block carries its value at the same time
        const incoming = state.connections.filter(c => c.to === order[i]);
        if (incoming.length) await Promise.all(incoming.map(c => animateParticle(c.from, c.to)));
        const ok = await fireNode(order[i], i, ctx);
        await sleep(i === 0 ? 420 : linear ? 240 : 170);
        if (!ok) { stopped = true; break; }
    }

    renderDataPanel();
    renderConsole(ctx);
    const lastNode = state.nodes.find(n => n.id === order[order.length - 1]);
    if (stopped) {
        appendLog(tt('flowStopped'), 'error');
    } else if (lastNode && lastNode.type === 'browser') {
        await sleep(120);
        showBrowserPreview(ctx);
    } else {
        appendLog(tt('flowComplete') + ' ' + escapeHtml(statsLine(ctx)), 'success');
        const lvl = LEVELS[state.currentLevel];
        if (lvl.banner && !state.task && !state.readonly && flowMatches(lvl)) appendLog('<strong>' + escapeHtml(tx(lvl.banner)) + '</strong>', 'success');
        ctx.console.forEach(line => appendLog('<span style="font-family:var(--mono);font-size:11.5px;">&gt; ' + escapeHtml(line) + '</span>'));
    }

    await sleep(400);
    Array.from(nodesContainer.querySelectorAll('.node')).forEach(el => el.classList.remove('firing'));
    state.running = false;
}

// One block fires: run its real behaviour, record the value, narrate it.
async function fireNode(id, stepIndex, ctx) {
    const node = state.nodes.find(n => n.id === id);
    if (!node) return;
    const el = nodesContainer.querySelector(`.node[data-id="${id}"]`);
    if (el) el.classList.add('firing');
    markStep(stepIndex);
    const z = state.zoom, w = canvasWrapEl.clientWidth, hgt = canvasWrapEl.clientHeight;
    const outX = node.x * z < canvasWrapEl.scrollLeft + 30 || (node.x + NODE_W) * z > canvasWrapEl.scrollLeft + w - 30;
    const outY = node.y * z < canvasWrapEl.scrollTop + 30 || (node.y + NODE_H) * z > canvasWrapEl.scrollTop + hgt - 30;
    if (outX || outY) canvasWrapEl.scrollTo({ left: Math.max(0, node.x * z - w / 2 + NODE_W / 2), top: Math.max(0, node.y * z - hgt / 2 + NODE_H / 2), behavior: 'smooth' });

    const sim = SIM[node.type];
    const before = ctx.value;
    let error = null;
    if (sim && sim.run) {
        try {
            ctx.value = await sim.run(before, ctx);
        } catch (err) {
            error = err.message;
        }
    }
    if (Array.isArray(ctx.value)) ctx.lastArray = ctx.value;

    state.trace.push({
        type: node.type,
        op: sim ? opOf(node.type) : (NODE_DEFS[node.type] && NODE_DEFS[node.type].file) || '',
        before,
        after: ctx.value,
        error,
        changed: before !== ctx.value
    });
    if (el) {
        const badge = el.querySelector('[data-badge]');
        if (badge && (error || ctx.value !== undefined)) {
            badge.textContent = error ? '!' : sizeLabel(ctx.value);
            badge.classList.add('show');
        }
    }
    logForNode(node.type, stepIndex, ctx, error);
    if (state.panel === 'data') renderDataPanel();
    return !error;
}

function animateParticle(fromId, toId) {
    return new Promise(resolve => {
        const from = state.nodes.find(n => n.id === fromId);
        const to = state.nodes.find(n => n.id === toId);
        if (!from || !to) return resolve();
        const sp = portPos(from, 'out');
        const tp = portPos(to, 'in');
        const d = bezier(sp.x, sp.y, tp.x, tp.y);
        const conn = state.connections.find(c => c.from === fromId && c.to === toId);
        const connEl = conn ? svgEl.querySelector(`path.conn[data-id="${conn.id}"]`) : null;
        if (connEl) connEl.classList.add('active');
        const measure = document.createElementNS(SVG_NS, 'path');
        measure.setAttribute('d', d);
        measure.style.visibility = 'hidden';
        svgEl.appendChild(measure);
        const len = measure.getTotalLength();
        const halo = document.createElementNS(SVG_NS, 'circle');
        halo.setAttribute('r', '12');
        halo.setAttribute('class', 'particle-halo');
        svgEl.appendChild(halo);
        const particle = document.createElementNS(SVG_NS, 'circle');
        particle.setAttribute('r', '5');
        particle.setAttribute('class', 'particle');
        svgEl.appendChild(particle);
        const duration = 680;
        const start = performance.now();
        let done = false;
        const finish = () => {
            if (done) return;
            done = true;
            particle.remove(); halo.remove(); measure.remove();
            if (connEl) setTimeout(() => connEl.classList.remove('active'), 200);
            resolve();
        };
        // A background tab stops painting frames — never leave the run hanging.
        const failsafe = setTimeout(finish, duration + 400);
        function step(t) {
            const progress = Math.min((t - start) / duration, 1);
            const pt = measure.getPointAtLength(len * easeInOut(progress));
            particle.setAttribute('cx', pt.x);
            particle.setAttribute('cy', pt.y);
            halo.setAttribute('cx', pt.x);
            halo.setAttribute('cy', pt.y);
            if (done) return;
            if (progress < 1) requestAnimationFrame(step);
            else {
                clearTimeout(failsafe);
                finish();
            }
        }
        requestAnimationFrame(step);
    });
}

// ============================================================
// TRACE MESSAGES
// ============================================================
const LOG_MSGS = {
    // (the React lab's own lines are added below this table)
    dataArray:     ['<strong>Array</strong> is ready in memory — the objects are already there.', '<strong>მასივი</strong> მზადაა მეხსიერებაში — ობიექტები უკვე იქაა.'],
    apiEndpoint:   ['<strong>API endpoint</strong> is just a string so far — nothing has been sent.', '<strong>API მისამართი</strong> ჯერ მხოლოდ სტრიქონია — არაფერი გაგზავნილა.'],
    localStore:    ['<strong>localStorage</strong> returned a string, not an array.', '<strong>localStorage</strong>-მ დააბრუნა სტრიქონი და არა მასივი.'],
    userInput:     ['<strong>Input</strong> gave back what the user typed.', '<strong>ინფუთმა</strong> დააბრუნა ის, რაც აკრიფეს.'],
    fetchCall:     ['<strong>fetch()</strong> sent the request and handed back a Promise.', '<strong>fetch()</strong>-მა გააგზავნა მოთხოვნა და დააბრუნა Promise.'],
    apiKey:        ['<strong>Headers</strong> built — the key travels with the request.', '<strong>ჰედერები</strong> აეწყო — გასაღები მოთხოვნასთან ერთად მიდის.'],
    jsonParse:     ['<strong>res.json()</strong> parsed the body into real objects.', '<strong>res.json()</strong>-მა სხეული ნამდვილ ობიექტებად აქცია.'],
    httpGet:       ['<strong>GET</strong> options prepared — no body, nothing changes.', '<strong>GET</strong>-ის პარამეტრები მზადაა — body არ არის, არაფერი იცვლება.'],
    httpPost:      ['<strong>POST</strong> options prepared — the body is a JSON string.', '<strong>POST</strong>-ის პარამეტრები მზადაა — body არის JSON სტრიქონი.'],
    httpPut:       ['<strong>PUT</strong> options prepared — the whole object is being replaced.', '<strong>PUT</strong>-ის პარამეტრები მზადაა — მთელი ობიექტი იცვლება.'],
    httpDelete:    ['<strong>DELETE</strong> options prepared — the id is in the URL.', '<strong>DELETE</strong>-ის პარამეტრები მზადაა — id URL-შია.'],
    tryCatch:      ['<strong>try / catch</strong> is watching — a failure below will be caught.', '<strong>try / catch</strong> აკვირდება — ქვემოთ მომხდარი შეცდომა დაიჭირება.'],
    abortCtl:      ['<strong>AbortController</strong> cancelled the previous request.', '<strong>AbortController</strong>-მა გააუქმა წინა მოთხოვნა.'],
    asyncFn:       ['<strong>async function</strong> started — await is allowed from here on.', '<strong>async ფუნქცია</strong> დაიწყო — აქედან await დაშვებულია.'],
    awaitOp:       ['<strong>await</strong> unwrapped the Promise — this is real data now.', '<strong>await</strong>-მა გახსნა Promise — ახლა ეს ნამდვილი მონაცემია.'],
    promiseThen:   ['<strong>.then()</strong> received the value in a callback.', '<strong>.then()</strong>-მა მნიშვნელობა callback-ში მიიღო.'],
    setTimeoutBlk: ['<strong>setTimeout</strong> queued the work for after the current code.', '<strong>setTimeout</strong>-მა სამუშაო მიმდინარე კოდის შემდეგ დააყენა რიგში.'],
    debounceBlk:   ['<strong>Debounce</strong> waited 300ms — only the last keystroke got through.', '<strong>Debounce</strong>-მა დაიცადა 300მწმ — მხოლოდ ბოლო დარტყმა გავიდა.'],
    eventLoop:     ['<strong>Event loop</strong>: sync first, microtasks next, timers last.', '<strong>ივენთ ლუპი</strong>: ჯერ სინქრონული, მერე microtask, ბოლოს ტაიმერი.'],
    filterOp:      ['<strong>.filter()</strong> kept only the matching items.', '<strong>.filter()</strong>-მა დატოვა მხოლოდ შესაბამისი ერთეულები.'],
    mapOp:         ['<strong>.map()</strong> reshaped every item — same length, new shape.', '<strong>.map()</strong>-მა თითო ერთეული გარდაქმნა — იგივე რაოდენობა, ახალი ფორმა.'],
    sortOp:        ['<strong>.sort()</strong> reordered a copy of the array.', '<strong>.sort()</strong>-მა მასივის ასლი გადაალაგა.'],
    reduceOp:      ['<strong>.reduce()</strong> folded the array into one value.', '<strong>.reduce()</strong>-მა მასივი ერთ მნიშვნელობად აქცია.'],
    findOp:        ['<strong>.find()</strong> returned the first match only.', '<strong>.find()</strong>-მა მხოლოდ პირველი დამთხვევა დააბრუნა.'],
    destructure:   ['<strong>Destructuring</strong> pulled the fields out by name.', '<strong>დესტრუქტურიზაციამ</strong> ველები სახელით ამოიღო.'],
    spreadOp:      ['<strong>Spread</strong> copied the array and added one item.', '<strong>Spread</strong>-მა მასივი დააკოპირა და ერთი ერთეული დაამატა.'],
    templateLit:   ['<strong>Template string</strong> turned the array into one HTML string.', '<strong>შაბლონურმა სტრიქონმა</strong> მასივი ერთ HTML სტრიქონად აქცია.'],
    stateObj:      ['<strong>State</strong> now holds the items, plus loading and error.', '<strong>State</strong>-ში ახლა ერთეულებია, ასევე loading და error.'],
    closureBlk:    ['<strong>Closure</strong> captured the data privately.', '<strong>Closure</strong>-მა მონაცემი პრივატულად დაიჭირა.'],
    saveLocal:     ['<strong>localStorage</strong> saved it as a JSON string.', '<strong>localStorage</strong>-მა შეინახა JSON სტრიქონად.'],
    querySel:      ['<strong>querySelector</strong> found the container element.', '<strong>querySelector</strong>-მა იპოვა კონტეინერი.'],
    createEl:      ['<strong>createElement</strong> built the nodes in memory.', '<strong>createElement</strong>-მა კვანძები მეხსიერებაში ააწყო.'],
    appendChildBlk:['<strong>append</strong> attached everything in one repaint.', '<strong>append</strong>-მა ყველაფერი ერთ გადახატვაში მიაბა.'],
    renderDom:     ['<strong>innerHTML</strong> wrote the markup into the page.', '<strong>innerHTML</strong>-მა მარკაპი გვერდზე ჩაწერა.'],
    eventListener: ['<strong>Click</strong> received — the handler is running.', '<strong>დაწკაპუნება</strong> მიღებულია — handler მუშაობს.'],
    delegation:    ['<strong>Delegated click</strong> found the row through closest().', '<strong>დელეგირებულმა დაწკაპუნებამ</strong> სტრიქონი closest()-ით იპოვა.'],
    formSubmit:    ['<strong>Form submit</strong> collected the fields and blocked the reload.', '<strong>ფორმის გაგზავნამ</strong> ველები შეაგროვა და გადატვირთვა შეაჩერა.'],
    classToggle:   ['<strong>classList</strong> toggled the state class.', '<strong>classList</strong>-მა კლასი გადართო.'],
    exportBlk:     ['<strong>export</strong> made the value available to other files.', '<strong>export</strong>-მა მნიშვნელობა სხვა ფაილებისთვის ხელმისაწვდომი გახადა.'],
    importBlk:     ['<strong>import</strong> brought it into this file.', '<strong>import</strong>-მა ის ამ ფაილში შემოიტანა.'],
    consoleLog:    ['<strong>console.log</strong> printed the value.', '<strong>console.log</strong>-მა მნიშვნელობა დაბეჭდა.'],
    browser:       ['<strong>Browser</strong> painted the DOM — the user can see it now.', '<strong>ბრაუზერმა</strong> დახატა DOM — მომხმარებელი ახლა ხედავს.']
};

Object.assign(LOG_MSGS, RFL.logs);

function logForNode(type, step, ctx, error) {
    const def = NODE_DEFS[type] || {};
    const msg = LOG_MSGS[type] ? tx(LOG_MSGS[type]) : '<strong>' + escapeHtml(tx(def.label || type)) + '</strong>: ' + escapeHtml(tx(def.short || ''));
    const size = ctx && ctx.value !== undefined ? ' <span class="data-pill">' + escapeHtml(sizeLabel(ctx.value)) + '</span>' : '';
    appendLog(`${tt('step')} ${step + 1}: ${msg}${size}`, error ? 'error' : '');
    // what the block had to say about this run (renders, requests, branches taken)
    if (ctx && ctx.notes) ctx.notes.splice(0).forEach(note => appendLog(escapeHtml(tx(note)), 'note'));
    if (error) appendLog('<strong>' + escapeHtml(error) + '</strong>', 'error');
}

// ============================================================
// BROWSER PREVIEW + CONSOLE
// ============================================================
function renderConsole(ctx) {
    if (!consoleBodyEl) return;
    if (!ctx.console.length) {
        consoleBodyEl.innerHTML = `<div class="console-empty">${tt('consoleEmpty')}</div>`;
        return;
    }
    consoleBodyEl.innerHTML = ctx.console
        .map(line => `<div class="console-line"><span class="arrow">&gt;</span><span>${escapeHtml(line)}</span></div>`)
        .join('');
}

// One line of numbers a run produced: the thing to compare between two flows.
function statsLine(ctx) {
    const parts = [tt('statRenders') + ': ' + Math.max(1, ctx.renders), tt('statRequests') + ': ' + ctx.requests];
    if (ctx.readers) parts.push(tt('statReaders') + ': ' + ctx.readers);
    return parts.join(' · ');
}

function showBrowserPreview(ctx) {
    const lvl = LEVELS[state.currentLevel];
    const d = DS();
    const items = Array.isArray(ctx.lastArray) ? ctx.lastArray : [];
    // The task's own sentence appears only when the canvas really is that task's flow.
    // A real-world schema or task shows its own product's page; a lecture task shows its sentence
    // only when the canvas really is that task's flow.
    const sc = state.scenario && state.scenario.preview;
    const bannerText = sc ? tx(sc.banner) : (lvl.banner && !state.task && !state.readonly && flowMatches(lvl)) ? tx(lvl.banner) : '';
    const banner = bannerText ? `<div class="preview-banner">${escapeHtml(bannerText)}</div>` : '';
    const liveNote = ctx.live ? `<div class="preview-banner info">${tt('livePreview')} — ${escapeHtml(shorten(ctx.requestUrl, 70))}</div>` : '';
    const address = ctx.url ? ctx.url.path + (ctx.url.search || '') : '/menu';

    $('preview-url').textContent = ctx.live ? ctx.requestUrl : sc ? sc.url : 'lebistro.app' + address;

    const cards = items.slice(0, 20).map(p => {
        const flag = p && p[d.f.ok];
        return `
        <div class="product-card">
            <div class="product-name">${escapeHtml(String(nameOf(p)))}</div>
            <div class="product-meta">
                <span class="product-price">${escapeHtml(fmtNum(numOf(p)))}</span>
                ${flag === undefined ? '' : `<span class="product-stock ${flag ? '' : 'out'}">${escapeHtml(tx(flag ? d.okLabel : d.noLabel))}</span>`}
            </div>
        </div>`;
    }).join('');
    const badge = ctx.textOut ? `<div class="preview-text">${tt('cartBadge')} <b>${escapeHtml(ctx.textOut)}</b></div>` : '';

    previewBody.innerHTML = `
        <h1 class="preview-title">${escapeHtml(sc ? tx(sc.title) : ctx.pageTitle || tt('ourProducts'))}</h1>
        <div class="preview-sub">${items.length ? items.length + ' ' + tt('items') + ' — ' + tt('renderedBy') : tt('noList')}</div>
        <div class="preview-stats">${escapeHtml(statsLine(ctx))}</div>
        ${liveNote}
        ${banner}
        ${badge}
        <div class="preview-grid">${cards}</div>
    `;
    previewOverlay.classList.add('show');
    appendLog(tt('browserRendered') + ' ' + escapeHtml(statsLine(ctx)), 'success');
}

// ============================================================
// TOASTS
// ============================================================
function showToast(title, body, kind = 'info') {
    const t = document.createElement('div');
    t.className = 'toast ' + kind;
    const icon = kind === 'success' ? I.check : kind === 'info' ? I.info : I.warning;
    t.innerHTML = `
        <div class="toast-icon">${icon}</div>
        <div class="toast-body">${title ? `<strong>${title}</strong>` : ''}${body}</div>
        <button class="toast-close">${I.x}</button>
    `;
    t.querySelector('.toast-close').addEventListener('click', () => t.remove());
    // Never more than three at once — the oldest makes room.
    while (toastWrap.children.length >= 3) toastWrap.firstElementChild.remove();
    toastWrap.appendChild(t);
    setTimeout(() => {
        t.style.transition = 'opacity 0.25s, transform 0.25s';
        t.style.opacity = '0';
        t.style.transform = 'translateY(8px)';
        setTimeout(() => t.remove(), 250);
    }, 5000);
}

// ============================================================
// LEVELS
// ============================================================
// Puts a chain of blocks on the canvas, already connected.
function placeChain(types) {
    const laid = chainLayout(types);
    const ids = laid.nodes.map((n) => {
        const node = { id: 'n' + state.nextNodeId++, type: n.type, x: n.x, y: n.y, flipped: false };
        state.nodes.push(node);
        return node.id;
    });
    laid.connections.forEach(([a, b]) => state.connections.push({ id: 'c' + state.nextConnId++, from: ids[a], to: ids[b] }));
}

function loadLevel(idx, keepAddress) {
    state.canvasStack = [];
    state.task = null;
    state.scenario = null;
    state.dataset = 'products';
    exitExampleReadonly();
    renderBreadcrumb();
    renderLibrary();
    state.currentLevel = idx;
    state.nodes = [];
    state.connections = [];
    state.selectedNodeId = null;
    state.nextNodeId = 1;
    state.nextConnId = 1;
    state.trace = [];
    state.undoStack.length = 0;
    state.redoStack.length = 0;
    const lvl = LEVELS[idx];
    state.freeGraph = false;
    state.runCtx = lvl.ctx || null;
    // A "fix it" task opens with the broken flow already built.
    if (lvl.preset) placeChain(lvl.preset);
    if (!keepAddress) {
        try { history.replaceState(null, '', '#' + lvl.id); } catch (_) { location.hash = lvl.id; }
    }
    renderHeader();
    renderExplainSteps();
    renderEmptyExplain();
    renderDataPanel();
    renderCodePanel();
    renderLevelsMenu();
    renderAll();
    canvasWrapEl.scrollLeft = 0;
    canvasWrapEl.scrollTop = 0;
    renderTaskPanel();
}

function resetCanvas() {
    // On a "fix it" task Reset brings the broken flow back.
    if (!state.canvasStack.length && LEVELS[state.currentLevel].preset) { loadLevel(state.currentLevel); return; }
    if (state.nodes.length === 0 && state.connections.length === 0) return;
    state.nodes = [];
    state.connections = [];
    state.selectedNodeId = null;
    state.nextNodeId = 1;
    state.nextConnId = 1;
    if (!state.canvasStack.length) {
        state.trace = [];
        renderExplainSteps();
        explainBodyEl.innerHTML = `<div class="explain-empty">${tt('canvasCleared')}</div>`;
        renderDataPanel();
        renderCodePanel();
    }
    renderAll();
}

// ============================================================
// REFERENCE SCHEMAS
// ============================================================
const starsHtml = (n) => Array.from({ length: 5 }, (_, i) => `<span class="star ${i < n ? '' : 'dim'}">★</span>`).join('');
const taskForExample = (exId) => TASKS.find(t => t.example === exId);

function renderExamples() {
    const body = $('examples-body');
    if (!body) return;
    body.innerHTML = '';
    const section = (title, sub) => {
        const h = document.createElement('div');
        h.className = 'gallery-section';
        h.innerHTML = `<div class="gallery-section-title">${escapeHtml(title)}</div>${sub ? `<div class="gallery-section-sub">${escapeHtml(sub)}</div>` : ''}`;
        body.appendChild(h);
    };
    const card = (ex) => {
        const el = document.createElement('div');
        el.className = 'example-card' + (ex.real ? ' real' : '');
        const task = ex.real ? taskForExample(ex.id) : null;
        el.innerHTML = `
            <div class="example-thumb">${makeExampleThumb(ex)}</div>
            ${ex.real ? `<div class="example-scenario">${escapeHtml(tx(ex.scenario))}</div>` : ''}
            <div class="example-title">${escapeHtml(tx(ex.title))}</div>
            <div class="example-diff">${starsHtml(ex.diff)}</div>
            <div class="example-desc">${escapeHtml(tx(ex.desc))}</div>
            ${task ? `<button class="example-practice">${tt('practiceTask')} →</button>` : ''}
        `;
        el.addEventListener('click', (e) => {
            if (task && e.target.closest('.example-practice')) {
                examplesOverlay.classList.remove('show');
                startTask(task);
                return;
            }
            loadExample(ex, true);
        });
        body.appendChild(el);
    };
    section(tt('realWorld'), tt('realWorldSub'));
    EXAMPLES.filter(e => e.real).forEach(card);
    section(tt('conceptSchemas'), '');
    EXAMPLES.filter(e => !e.real).forEach(card);
}

// A tiny picture of a flow: curved wires and one dot per block.
function makeExampleThumb(ex) {
    const xs = ex.nodes.map(n => n.x);
    const ys = ex.nodes.map(n => n.y);
    const minX = Math.min(...xs), maxX = Math.max(...xs);
    const minY = Math.min(...ys), maxY = Math.max(...ys);
    const w = maxX - minX + 220, h = maxY - minY + 110;
    const pad = 18;
    const sx = (x) => ((x - minX + 20) / w) * (240 - 2 * pad) + pad;
    const sy = (y) => ((y - minY + 20) / h) * (100 - 2 * pad) + pad;
    const dots = ex.nodes.map(n => `<circle class="thumb-dot" cx="${sx(n.x)}" cy="${sy(n.y)}" r="3.2"/>`).join('');
    const lines = ex.connections.map(([a, b]) => {
        const A = ex.nodes[a], B = ex.nodes[b];
        const x1 = sx(A.x), y1 = sy(A.y), x2 = sx(B.x), y2 = sy(B.y);
        const dx = Math.max(6, Math.abs(x2 - x1) * 0.5);
        return `<path class="thumb-line" d="M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}"/>`;
    }).join('');
    return `<svg viewBox="0 0 240 100" preserveAspectRatio="xMidYMid meet">${lines}${dots}</svg>`;
}

// Puts a pre-built flow on the canvas (read-only until "Load to canvas (edit)").
function placeFlow(nodes, connections) {
    state.nodes = [];
    state.connections = [];
    state.nextNodeId = 1;
    state.nextConnId = 1;
    state.selectedNodeId = null;
    const idMap = [];
    nodes.forEach((n) => {
        const node = { id: 'n' + state.nextNodeId++, type: n.type, x: n.x, y: n.y, flipped: false };
        state.nodes.push(node);
        idMap.push(node.id);
    });
    connections.forEach(([a, b]) => {
        state.connections.push({ id: 'c' + state.nextConnId++, from: idMap[a], to: idMap[b] });
    });
}

let _currentExample = null;
function loadExample(ex, readonly) {
    _currentExample = ex;
    state.canvasStack = [];
    state.task = null;
    state.scenario = ex.preview ? ex : null;
    state.dataset = ex.dataset || 'products';
    state.trace = [];
    renderBreadcrumb();
    renderLibrary();
    placeFlow(ex.nodes, ex.connections);
    state.readonly = !!readonly;
    state.freeGraph = true;
    state.runCtx = ex.ctx || null;
    renderHeader();
    renderExplainSteps();
    renderAll();
    renderDataPanel();
    renderCodePanel();
    renderTaskPanel();
    examplesOverlay.classList.remove('show');
    tasksOverlay.classList.remove('show');
    const banner = $('example-readonly-banner');
    if (banner) banner.classList.toggle('show', !!readonly);
    requestAnimationFrame(fitView);
}

// ============================================================
// REAL-WORLD TASKS
// ============================================================
function loadTasksDone() {
    try {
        const raw = localStorage.getItem(TASKS_STORE_KEY);
        if (raw) state.tasksDone = new Set(JSON.parse(raw));
    } catch (_) {}
}
function saveTasksDone() {
    try { localStorage.setItem(TASKS_STORE_KEY, JSON.stringify([...state.tasksDone])); } catch (_) {}
}

// The gallery of tasks — one card per real-world brief.
function renderTasks() {
    const body = $('tasks-body');
    if (!body) return;
    body.innerHTML = '';
    TASKS.forEach((task, i) => {
        const ex = EXAMPLES.find(e => e.id === task.example);
        const done = state.tasksDone.has(task.id);
        const el = document.createElement('div');
        el.className = 'task-card' + (done ? ' done' : '') + (state.task === task ? ' current' : '');
        el.innerHTML = `
            <div class="task-card-top">
                <span class="task-card-num">${done ? '✓' : i + 1}</span>
                <span class="task-card-context">${escapeHtml(tx(task.context))}</span>
                ${done ? `<span class="task-card-badge">${tt('completedBadge')}</span>` : ''}
            </div>
            <div class="task-card-title">${escapeHtml(tx(task.title))}</div>
            <div class="task-card-story">${escapeHtml(tx(task.story))}</div>
            <div class="task-card-meta">
                <span class="example-diff">${starsHtml(task.diff)}</span>
                <span>${ex ? ex.nodes.length : '?'} ${tt('blocksCount')}</span>
                <span>${task.reqs.length + 1} ${tt('reqsCount')}</span>
            </div>
            <div class="task-card-actions">
                <button class="btn btn-primary btn-sm" data-act="start">${tt('startTask')}</button>
                <button class="btn btn-ghost btn-sm" data-act="solution">${tt('viewSolution')}</button>
            </div>
        `;
        el.querySelector('[data-act="start"]').addEventListener('click', () => startTask(task));
        el.querySelector('[data-act="solution"]').addEventListener('click', () => { if (ex) loadExample(ex, true); });
        body.appendChild(el);
    });
}

function startTask(task) {
    state.canvasStack = [];
    exitExampleReadonly();
    state.task = task;
    state.dataset = task.dataset;
    // the task's reference schema says which product page to show and what the run starts from (an address, say)
    state.scenario = EXAMPLES.find(e => e.id === task.example) || null;
    state.runCtx = (state.scenario && state.scenario.ctx) || null;
    state.freeGraph = true;
    state.taskUi = { blocks: false, solution: false, collapsed: false, story: false };
    state.nodes = [];
    state.connections = [];
    state.selectedNodeId = null;
    state.nextNodeId = 1;
    state.nextConnId = 1;
    state.trace = [];
    state.undoStack.length = 0;
    state.redoStack.length = 0;
    tasksOverlay.classList.remove('show');
    renderBreadcrumb();
    renderLibrary();
    renderHeader();
    renderExplainSteps();
    explainBodyEl.innerHTML = `<div class="explain-empty"><strong>${escapeHtml(tx(task.title))}.</strong> ${escapeHtml(tx(task.story))}</div>`;
    renderDataPanel();
    renderCodePanel();
    renderAll();
    renderTaskPanel();
    state.zoom = 1;
    applyZoom();
    canvasWrapEl.scrollLeft = 0;
    canvasWrapEl.scrollTop = 0;
    showToast(tx(task.title), tt('taskTip'), 'info');
}

// Leaves task mode but keeps whatever the student built on the canvas.
function exitTask() {
    if (!state.task) return;
    state.task = null;
    renderHeader();
    renderExplainSteps();
    renderTaskPanel();
    renderLevelsMenu();
}

// The top-level graph, even while the student is inside a block.
function topGraph() {
    if (state.canvasStack.length) {
        const s = state.canvasStack[0].snapshot;
        return { nodes: s.nodes, connections: s.connections };
    }
    return { nodes: state.nodes, connections: state.connections };
}

// Facts about the student's graph that the task rules ask about.
function graphFacts(nodes, connections) {
    const typeOf = new Map(nodes.map(n => [n.id, n.type]));
    const adj = new Map(nodes.map(n => [n.id, []]));
    connections.forEach(c => { if (adj.has(c.from) && typeOf.has(c.to)) adj.get(c.from).push(c.to); });
    const idsOf = (t) => nodes.filter(n => n.type === t).map(n => n.id);
    const reachTypes = (startId) => {
        const seen = new Set();
        const queue = [...adj.get(startId)];
        while (queue.length) {
            const id = queue.shift();
            if (seen.has(id)) continue;
            seen.add(id);
            queue.push(...adj.get(id));
        }
        return new Set([...seen].map(id => typeOf.get(id)));
    };
    return {
        count: nodes.length,
        has: (t) => idsOf(t).length > 0,
        link: (a, b) => connections.some(c => typeOf.get(c.from) === a && typeOf.get(c.to) === b),
        path: (a, b) => idsOf(a).some(id => reachTypes(id).has(b)),
        out: (t) => Math.max(0, ...idsOf(t).map(id => adj.get(id).length)),
        connected: () => nodes.length > 1 && nodes.every(n => connections.some(c => c.from === n.id || c.to === n.id))
    };
}

function evalRule(rule, g) {
    switch (rule[0]) {
        case 'has':       return g.has(rule[1]);
        case 'not':       return !g.has(rule[1]);
        case 'link':      return g.link(rule[1], rule[2]);
        case 'path':      return g.path(rule[1], rule[2]);
        case 'out':       return g.out(rule[1]) >= rule[2];
        case 'connected': return g.connected();
        default:          return false;
    }
}

// One row per requirement, plus "every block is connected" at the end.
function evaluateTask(task) {
    const { nodes, connections } = topGraph();
    const g = graphFacts(nodes, connections);
    const reqs = task.reqs.concat([{ text: T.reqConnected, rules: [['connected']] }]);
    return reqs.map(r => {
        // A "do not use X" rule is only worth a tick once something is built.
        const onlyGuards = r.rules.every(x => x[0] === 'not' || x[0] === 'connected');
        const ok = r.rules.every(x => evalRule(x, g)) && (!onlyGuards || g.count >= 3);
        return { text: r.text, ok };
    });
}

// The reference flow, cut into readable chains: "A → B → C".
function solutionSegments(ex) {
    const outs = ex.nodes.map(() => []);
    const ins = ex.nodes.map(() => 0);
    ex.connections.forEach(([a, b]) => { outs[a].push(b); ins[b]++; });
    const used = new Set();
    const segs = [];
    ex.connections.forEach(([a, b]) => {
        if (used.has(a + '>' + b)) return;
        used.add(a + '>' + b);
        const seg = [a, b];
        let cur = b;
        while (outs[cur].length === 1 && ins[cur] === 1) {
            const next = outs[cur][0];
            if (used.has(cur + '>' + next)) break;
            used.add(cur + '>' + next);
            seg.push(next);
            cur = next;
        }
        segs.push(seg.map(i => ex.nodes[i].type));
    });
    return segs;
}

let _taskSig = '';
function renderTaskPanel() {
    if (!taskPanelEl) return;
    const task = state.task;
    if (!task) {
        taskPanelEl.classList.remove('show');
        taskPanelEl.innerHTML = '';
        _taskSig = '';
        return;
    }
    const results = evaluateTask(task);
    const ui = state.taskUi;
    const done = results.filter(r => r.ok).length;
    const total = results.length;
    const sig = [lang, task.id, ui.blocks, ui.solution, ui.collapsed, ui.story, state.tasksDone.has(task.id), results.map(r => (r.ok ? 1 : 0)).join('')].join('|');
    if (sig === _taskSig && taskPanelEl.classList.contains('show')) return;
    _taskSig = sig;

    const ex = EXAMPLES.find(e => e.id === task.example);
    const pct = Math.round((done / total) * 100);
    const label = (t) => escapeHtml(tx(NODE_DEFS[t].label));
    const groupIndex = (t) => LIBRARY_GROUPS.findIndex(g => g.items.includes(t));
    // Listed by library group, not by flow order — it should not give the answer away.
    const blockTypes = ex ? [...new Set(ex.nodes.map(n => n.type))].sort((a, b) => groupIndex(a) - groupIndex(b) || LIBRARY_GROUPS[groupIndex(a)].items.indexOf(a) - LIBRARY_GROUPS[groupIndex(b)].items.indexOf(b)) : [];
    const isDone = state.tasksDone.has(task.id);

    taskPanelEl.classList.add('show');
    taskPanelEl.classList.toggle('collapsed', ui.collapsed);
    taskPanelEl.classList.toggle('complete', done === total);
    taskPanelEl.innerHTML = `
        <div class="task-head">
            <div class="task-head-icon">${I.target}</div>
            <div class="task-head-text">
                <div class="task-eyebrow" title="${tt('taskEyebrow')}">${escapeHtml(tx(task.context))}</div>
                <div class="task-title">${escapeHtml(tx(task.title))}${isDone ? ' <span class="task-done-tick">✓</span>' : ''}</div>
            </div>
            <span class="task-mini">${done}/${total}</span>
            <button class="task-icon-btn" data-act="collapse" title="${tt(ui.collapsed ? 'expand' : 'collapse')}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="${ui.collapsed ? '6 9 12 15 18 9' : '18 15 12 9 6 15'}"/></svg>
            </button>
            <button class="task-icon-btn" data-act="exit" title="${tt('exitTask')}">${I.close}</button>
        </div>
        <div class="task-body">
            <p class="task-story ${ui.story ? 'expanded' : ''}" data-act="story" title="${tt(ui.story ? 'collapse' : 'expand')}">${escapeHtml(tx(task.story))}</p>
            <div class="task-progress">
                <div class="task-progress-bar"><span style="width:${pct}%"></span></div>
                <div class="task-progress-label">${done} / ${total} ${tt('taskProgress')}</div>
            </div>
            <ul class="task-reqs">
                ${results.map(r => `
                    <li class="${r.ok ? 'ok' : ''}">
                        <span class="task-check">${r.ok ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>' : ''}</span>
                        <span class="task-req-text">${escapeHtml(tx(r.text))}</span>
                    </li>`).join('')}
            </ul>
            <div class="task-tools">
                <button class="task-chip-btn ${ui.blocks ? 'on' : ''}" data-act="blocks">${I.layers}<span>${tt(ui.blocks ? 'hideBlocks' : 'showBlocks')}</span></button>
                <button class="task-chip-btn ${ui.solution ? 'on' : ''}" data-act="solution">${I.info}<span>${tt(ui.solution ? 'hideSolution' : 'showSolution')}</span></button>
            </div>
            ${ui.blocks ? `
                <div class="task-sub-label">${tt('taskBlocks')}</div>
                <div class="task-blocks">
                    ${blockTypes.map(t => `<button class="task-block-chip" data-type="${t}" title="${tt('addToCanvas')}"><span class="lib-icon ${NODE_DEFS[t].color || ''}">${iconFor(t)}</span>${label(t)}</button>`).join('')}
                </div>` : ''}
            ${ui.solution && ex ? `
                <div class="task-sub-label">${tt('solutionLabel')}</div>
                <div class="task-solution">
                    ${solutionSegments(ex).map(seg => `<div class="task-seg">${seg.map(label).join(' <span class="arr">→</span> ')}</div>`).join('')}
                </div>` : ''}
            <button class="btn btn-accent task-check-btn" data-act="check">${I.check}<span>${tt('checkTask')}</span></button>
        </div>
    `;
}

function checkTask() {
    const task = state.task;
    if (!task) return;
    const results = evaluateTask(task);
    const missing = results.find(r => !r.ok);
    if (!missing) {
        const first = !state.tasksDone.has(task.id);
        state.tasksDone.add(task.id);
        saveTasksDone();
        showToast(tt('taskDone'), tt('taskDoneMsg'), 'success');
        appendLog('<strong>' + escapeHtml(tx(task.title)) + '</strong> — ' + tt('taskDone'), 'success');
        if (first) taskPanelEl.classList.add('celebrate');
        setTimeout(() => taskPanelEl.classList.remove('celebrate'), 1200);
        _taskSig = '';
        renderTaskPanel();
        return;
    }
    const msg = tt('taskNext') + ' <strong>' + escapeHtml(tx(missing.text)) + '</strong>';
    showToast(tt('taskMissing'), msg, 'warning');
    appendLog(msg, 'warning');
}

// Adds a block near the middle of what the student is looking at.
function addNodeAtView(type) {
    const r = canvasWrapEl.getBoundingClientRect();
    const cx = (canvasWrapEl.scrollLeft + r.width / 2) / state.zoom;
    const cy = (canvasWrapEl.scrollTop + r.height / 2) / state.zoom;
    const k = state.nodes.length % 6;
    addNode(type, cx + (k - 2.5) * 34, cy + (k - 2.5) * 26);
}

taskPanelEl.addEventListener('mousedown', (e) => e.stopPropagation());
taskPanelEl.addEventListener('click', (e) => {
    const chip = e.target.closest('.task-block-chip');
    if (chip) { addNodeAtView(chip.dataset.type); return; }
    const btn = e.target.closest('[data-act]');
    if (!btn) return;
    const act = btn.dataset.act;
    if (act === 'collapse') state.taskUi.collapsed = !state.taskUi.collapsed;
    if (act === 'story') state.taskUi.story = !state.taskUi.story;
    if (act === 'blocks') state.taskUi.blocks = !state.taskUi.blocks;
    if (act === 'solution') state.taskUi.solution = !state.taskUi.solution;
    if (act === 'check') { checkTask(); return; }
    if (act === 'exit') { exitTask(); return; }
    renderTaskPanel();
});

function exitExampleReadonly() {
    state.readonly = false;
    const banner = $('example-readonly-banner');
    if (banner) banner.classList.remove('show');
}

// ============================================================
// THEME + LANGUAGE
// ============================================================
function setTheme(theme, persist) {
    state.theme = theme === 'light' ? 'light' : 'dark';
    document.documentElement.classList.toggle('dark', state.theme === 'dark');
    if (persist) { try { localStorage.setItem(THEME_STORE_KEY, state.theme); } catch (_) {} }
}
// Dark is the default look; a theme is only remembered once someone picks one.
function loadTheme() {
    let saved = null;
    try { saved = localStorage.getItem(THEME_STORE_KEY); } catch (_) {}
    setTheme(saved || 'dark', false);
}
function setLanguage(newLang) {
    if (newLang === lang) return;
    lang = newLang;
    document.documentElement.lang = lang;
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
    try { localStorage.setItem('rfl-lang', lang); } catch (_) {}
    renderUIStrings();
    renderHeader();
    renderLibrary();
    renderLevelsMenu();
    renderApiOverlay();
    renderAll();
    renderDataPanel();
    renderCodePanel();
    renderTaskPanel();
    if (tasksOverlay.classList.contains('show')) renderTasks();
    if (examplesOverlay.classList.contains('show')) renderExamples();
    if (explainBodyEl.querySelector('.explain-empty') && !state.task) renderEmptyExplain();
}

// ============================================================
// EVENT WIRING
// ============================================================
$('run-btn').addEventListener('click', runFlow);
$('check-btn').addEventListener('click', checkAnswer);
$('reset-btn').addEventListener('click', resetCanvas);

levelsToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    levelsDropdown.classList.toggle('open');
});
document.addEventListener('click', (e) => {
    if (!levelsDropdown.contains(e.target)) levelsDropdown.classList.remove('open');
});

$('mission-link').addEventListener('click', async () => {
    const id = LEVELS[state.currentLevel].id;
    const url = location.href.split('#')[0] + '#' + id;
    try { await navigator.clipboard.writeText(url); } catch (_) {}
    showToast('', tt('linkCopied') + ' <code>#' + escapeHtml(id) + '</code>', 'success');
});
window.addEventListener('hashchange', () => {
    const i = levelFromHash();
    if (i >= 0 && i !== state.currentLevel && !state.running) loadLevel(i, true);
});

missionHintBtn.addEventListener('click', () => {
    const hint = state.task ? state.task.hint : LEVELS[state.currentLevel].hint;
    showToast(tt('hint'), escapeHtml(tx(hint)), 'info');
});

document.querySelectorAll('.lang-btn').forEach(b => {
    b.addEventListener('click', () => setLanguage(b.dataset.lang));
});
$('theme-toggle').addEventListener('click', () => setTheme(state.theme === 'dark' ? 'light' : 'dark', true));

document.querySelectorAll('.panel-tab').forEach(b => {
    b.addEventListener('click', () => setPanel(b.dataset.tab));
});

librarySearchEl.addEventListener('input', (e) => {
    state.librarySearch = e.target.value;
    renderLibrary();
});
librarySearchEl.addEventListener('keydown', (e) => e.stopPropagation());

const examplesOverlay = $('examples-overlay');
$('examples-toggle').addEventListener('click', () => {
    renderExamples();
    examplesOverlay.classList.add('show');
});
$('examples-close').addEventListener('click', () => examplesOverlay.classList.remove('show'));
examplesOverlay.addEventListener('click', (e) => {
    if (e.target === examplesOverlay) examplesOverlay.classList.remove('show');
});
$('example-load-editable').addEventListener('click', () => {
    if (_currentExample) loadExample(_currentExample, false);
    exitExampleReadonly();
});

$('tasks-toggle').addEventListener('click', () => {
    renderTasks();
    tasksOverlay.classList.add('show');
});
$('tasks-close').addEventListener('click', () => tasksOverlay.classList.remove('show'));
tasksOverlay.addEventListener('click', (e) => {
    if (e.target === tasksOverlay) tasksOverlay.classList.remove('show');
});

const apiOverlay = $('api-overlay');
$('api-toggle').addEventListener('click', () => {
    renderApiOverlay();
    apiOverlay.classList.add('show');
});
$('api-close').addEventListener('click', () => apiOverlay.classList.remove('show'));
apiOverlay.addEventListener('click', (e) => {
    if (e.target === apiOverlay) apiOverlay.classList.remove('show');
});

$('preview-close').addEventListener('click', () => previewOverlay.classList.remove('show'));
previewOverlay.addEventListener('click', (e) => {
    if (e.target === previewOverlay) previewOverlay.classList.remove('show');
});

$('zoom-in').addEventListener('click', () => setZoom(state.zoom + 0.1));
$('zoom-out').addEventListener('click', () => setZoom(state.zoom - 0.1));
$('zoom-level').addEventListener('click', () => setZoom(1));
$('fit-btn').addEventListener('click', fitView);
$('autolayout-btn').addEventListener('click', autoLayout);
$('snap-toggle').addEventListener('click', () => {
    state.snapToGrid = !state.snapToGrid;
    $('snap-toggle').classList.toggle('active', state.snapToGrid);
    showToast('', state.snapToGrid ? tt('snapOn') : tt('snapOff'), 'info');
});
$('undo-btn').addEventListener('click', undo);
$('redo-btn').addEventListener('click', redo);

document.addEventListener('keydown', (e) => {
    const inField = e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT';
    if ((e.ctrlKey || e.metaKey) && (e.key === '=' || e.key === '+')) { e.preventDefault(); setZoom(state.zoom + 0.1); return; }
    if ((e.ctrlKey || e.metaKey) && e.key === '-') { e.preventDefault(); setZoom(state.zoom - 0.1); return; }
    if ((e.ctrlKey || e.metaKey) && e.key === '0') { e.preventDefault(); setZoom(1); return; }
    if ((e.ctrlKey || e.metaKey) && !e.shiftKey && (e.key === 'z' || e.key === 'Z')) { e.preventDefault(); if (!inField) undo(); return; }
    if ((e.ctrlKey || e.metaKey) && (e.shiftKey && (e.key === 'z' || e.key === 'Z') || e.key === 'y' || e.key === 'Y')) { e.preventDefault(); if (!inField) redo(); return; }
    if ((e.key === 'Delete' || e.key === 'Backspace') && state.selectedNodeId && !inField) removeNode(state.selectedNodeId);
    if (e.key === 'Escape') {
        previewOverlay.classList.remove('show');
        examplesOverlay.classList.remove('show');
        tasksOverlay.classList.remove('show');
        apiOverlay.classList.remove('show');
        levelsDropdown.classList.remove('open');
    }
});

canvasWrapEl.addEventListener('wheel', (e) => {
    if (e.ctrlKey) {
        e.preventDefault();
        const r = canvasWrapEl.getBoundingClientRect();
        setZoom(state.zoom + (-Math.sign(e.deltaY) * 0.1), { x: e.clientX - r.left, y: e.clientY - r.top });
    }
}, { passive: false });

// ============================================================
// PAN (space + drag, or middle mouse)
// ============================================================
function inFormField(target) {
    return target && target.matches && target.matches('input, textarea, select, [contenteditable]');
}
window.addEventListener('keydown', (e) => {
    if (e.code !== 'Space') return;
    if (inFormField(e.target)) return;
    if (state.spacePressed) return;
    state.spacePressed = true;
    canvasWrapEl.classList.add('pan-ready');
    e.preventDefault();
});
window.addEventListener('keyup', (e) => {
    if (e.code !== 'Space') return;
    state.spacePressed = false;
    canvasWrapEl.classList.remove('pan-ready');
});
canvasWrapEl.addEventListener('mousedown', (e) => {
    const isMiddle = e.button === 1;
    const isSpaceDrag = state.spacePressed && e.button === 0;
    // Dragging the empty background pans too — a plain click still deselects.
    const isBackground = e.button === 0 && [canvasWrapEl, canvasStageEl, canvasEl, svgEl, nodesContainer].includes(e.target);
    if (!isMiddle && !isSpaceDrag && !isBackground) return;
    if (e.target.closest('.node-btn, .port, .lib-item')) return;
    e.preventDefault();
    state.panning = true;
    canvasWrapEl.classList.add('panning');
    const startX = e.clientX, startY = e.clientY;
    const startScrollLeft = canvasWrapEl.scrollLeft, startScrollTop = canvasWrapEl.scrollTop;
    let moved = false;
    const onMove = (ev) => {
        if (Math.abs(ev.clientX - startX) + Math.abs(ev.clientY - startY) > 3) moved = true;
        canvasWrapEl.scrollLeft = startScrollLeft - (ev.clientX - startX);
        canvasWrapEl.scrollTop = startScrollTop - (ev.clientY - startY);
    };
    const onUp = () => {
        state.panning = false;
        state.justPanned = moved;
        canvasWrapEl.classList.remove('panning');
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
});
canvasWrapEl.addEventListener('auxclick', (e) => { if (e.button === 1) e.preventDefault(); });

// ============================================================
// PANELS: drag the strips between panels to resize them; fold the library
// into an icon rail; hide the inspector / bottom panel with the double arrow
// that appears on their edge. Sizes and collapsed state are remembered.
// ============================================================
const panels = { lib: false, insp: false, explain: false };
let railTipEl = null;

function applyPanels() {
    const app = document.querySelector('.app');
    if (!app) return;
    app.classList.toggle('lib-collapsed', panels.lib);
    app.classList.toggle('insp-collapsed', panels.insp);
    app.classList.toggle('explain-collapsed', panels.explain);
    // the collapsed bottom panel keeps exactly its header row
    const head = document.querySelector('.explain-header');
    if (head && head.offsetHeight) document.documentElement.style.setProperty('--explain-head-h', (head.offsetHeight + 2) + 'px');
    const setTitle = (id, key) => { const el = $(id); if (el) el.title = tt(key); };
    setTitle('library-collapse', panels.lib ? 'expandLibrary' : 'collapseLibrary');
    setTitle('inspector-collapse', panels.insp ? 'showInspector' : 'hideInspector');
    setTitle('explain-collapse', panels.explain ? 'showPanel' : 'hidePanel');
    setTitle('resizer-library', 'dragResize');
    setTitle('resizer-inspector', panels.insp ? 'showInspector' : 'dragResize');
    setTitle('resizer-explain', panels.explain ? 'showPanel' : 'dragResize');
}

function togglePanel(name, collapsed = !panels[name]) {
    panels[name] = collapsed;
    if (name === 'lib' && collapsed && state.librarySearch) {
        // the search box is hidden on the rail, so a leftover filter would hide icons for no visible reason
        state.librarySearch = '';
        $('library-search').value = '';
        renderLibrary();
    }
    hideRailTip();
    applyPanels();
    try { localStorage.setItem(PANELS_STORE_KEY, JSON.stringify(panels)); } catch (_) {}
}

function hideRailTip() { if (railTipEl) railTipEl.classList.remove('show'); }

function initPanels() {
    const root = document.documentElement;
    const app = document.querySelector('.app');
    const explainEl = document.querySelector('.explain');
    const libraryEl = document.querySelector('.library');
    const inspectorEl = document.querySelector('.inspector');
    const LIB_MIN = 180, LIB_MAX = 480;
    const INSP_MIN = 260, INSP_MAX = 560;
    const EXP_MIN = 90, EXP_MAX = 520;

    function saveLayout() {
        try {
            localStorage.setItem(LAYOUT_STORE_KEY, JSON.stringify({
                libraryW: parseInt(root.style.getPropertyValue('--library-w')) || undefined,
                inspectorW: parseInt(root.style.getPropertyValue('--inspector-w')) || undefined,
                explainH: parseInt(root.style.getPropertyValue('--explain-h')) || undefined,
            }));
        } catch (_) {}
    }

    function loadLayout() {
        try {
            const l = JSON.parse(localStorage.getItem(LAYOUT_STORE_KEY) || '{}');
            if (l.libraryW) root.style.setProperty('--library-w', l.libraryW + 'px');
            if (l.inspectorW) root.style.setProperty('--inspector-w', l.inspectorW + 'px');
            if (l.explainH) root.style.setProperty('--explain-h', l.explainH + 'px');
        } catch (_) {}
        try {
            const p = JSON.parse(localStorage.getItem(PANELS_STORE_KEY) || '{}');
            panels.lib = !!p.lib; panels.insp = !!p.insp; panels.explain = !!p.explain;
        } catch (_) {}
    }

    // A strip resizes on drag. Its arrow button toggles instead, and on a collapsed panel
    // any press on the strip just brings the panel back.
    function startDrag(e, resizerEl, panelName, bodyClass, onMove) {
        if (e.button !== 0 || e.target.closest('.edge-toggle')) return;
        e.preventDefault();
        if (panels[panelName]) { togglePanel(panelName, false); return; }
        resizerEl.classList.add('active');
        document.body.classList.add(bodyClass);
        const onUp = () => {
            resizerEl.classList.remove('active');
            document.body.classList.remove(bodyClass);
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseup', onUp);
            saveLayout();
        };
        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onUp);
    }

    function dragCol(resizerEl, varName, targetEl, min, max, fromRight, panelName) {
        if (!resizerEl) return;
        resizerEl.addEventListener('mousedown', (e) => {
            const startX = e.clientX;
            const startW = targetEl.getBoundingClientRect().width;
            startDrag(e, resizerEl, panelName, 'resizing-col', (ev) => {
                const delta = fromRight ? startX - ev.clientX : ev.clientX - startX;
                root.style.setProperty(varName, Math.min(max, Math.max(min, Math.round(startW + delta))) + 'px');
            });
        });
    }

    function dragRow(resizerEl) {
        if (!resizerEl) return;
        resizerEl.addEventListener('mousedown', (e) => {
            const startY = e.clientY;
            const startH = explainEl.getBoundingClientRect().height;
            startDrag(e, resizerEl, 'explain', 'resizing-row', (ev) => {
                root.style.setProperty('--explain-h', Math.min(EXP_MAX, Math.max(EXP_MIN, Math.round(startH + startY - ev.clientY))) + 'px');
            });
        });
    }

    // restore the saved state without playing the collapse animation on page load
    loadLayout();
    app.style.transition = explainEl.style.transition = 'none';
    applyPanels();
    requestAnimationFrame(() => requestAnimationFrame(() => { app.style.transition = explainEl.style.transition = ''; }));
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(applyPanels);

    dragCol($('resizer-library'), '--library-w', libraryEl, LIB_MIN, LIB_MAX, false, 'lib');
    dragCol($('resizer-inspector'), '--inspector-w', inspectorEl, INSP_MIN, INSP_MAX, true, 'insp');
    dragRow($('resizer-explain'));

    $('library-collapse').addEventListener('click', () => togglePanel('lib'));
    $('inspector-collapse').addEventListener('click', () => togglePanel('insp'));
    $('explain-collapse').addEventListener('click', () => togglePanel('explain'));
    // the collapsed bottom panel is still a bar: clicking it (or one of its tabs) opens it
    document.querySelector('.explain-header').addEventListener('click', () => { if (panels.explain) togglePanel('explain', false); });

    // icon rail: show the block's name next to the hovered icon
    railTipEl = document.createElement('div');
    railTipEl.className = 'rail-tip';
    document.body.appendChild(railTipEl);
    libraryListEl.addEventListener('mouseover', (e) => {
        const item = e.target.closest('.lib-item');
        if (!panels.lib || !item) return;
        const r = item.getBoundingClientRect();
        const label = item.querySelector('.lib-label');
        railTipEl.textContent = label ? label.textContent.trim() : '';
        railTipEl.style.left = (r.right + 12) + 'px';
        railTipEl.style.top = (r.top + r.height / 2) + 'px';
        railTipEl.classList.add('show');
    });
    libraryListEl.addEventListener('mouseout', hideRailTip);
    libraryListEl.addEventListener('mousedown', hideRailTip);
    libraryListEl.addEventListener('scroll', hideRailTip);
}

// ============================================================
// BOOT
// ============================================================
(function boot() {
    try {
        const savedLang = localStorage.getItem('rfl-lang');
        if (savedLang === 'ka') {
            lang = 'ka';
            document.documentElement.lang = 'ka';
            document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === 'ka'));
        }
    } catch (_) {}
    loadTheme();
    loadApiConfig();
    loadTasksDone();
    initPanels();
    renderUIStrings();
    renderLibrary();
    renderLevelsMenu();
    renderHeader();
    renderExplainSteps();
    renderEmptyExplain();
    renderDataPanel();
    renderApiOverlay();
    applyZoom();
    loadProgress();
    // index.html#effects-2 opens that task; with no address the first task opens.
    loadLevel(Math.max(0, levelFromHash()), location.hash.length < 2);
    setPanel('trace');
})();
