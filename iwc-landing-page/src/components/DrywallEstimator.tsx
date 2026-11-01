'use client';

import React, { useState } from 'react';
import { prefillContact } from '@/lib/contact-prefill';

// Rules of thumb for a rough material list (based on common USG coverage figures).
const WASTE = 0.1; // 10% extra for cuts and waste
const DOOR_SQFT = 21; // 3' x 7'
const WINDOW_SQFT = 15; // 3' x 5'
const MUD_LB_PER_SQFT = 0.138; // ready-mix joint compound
const MUD_LB_PER_BUCKET = 62; // one 5-gallon bucket
const TAPE_FT_PER_SQFT = 0.37;
const TAPE_FT_PER_ROLL = 500;
const SCREWS_PER_SQFT = 1;

const sheetSizes = {
    '4x8': { label: "4' × 8'", sqft: 32 },
    '4x12': { label: "4' × 12'", sqft: 48 },
};
type SheetSize = keyof typeof sheetSizes;

const num = (value: string) => {
    const n = parseFloat(value);
    return Number.isFinite(n) && n > 0 ? n : 0;
};

export default function DrywallEstimator() {
    const [length, setLength] = useState('12');
    const [width, setWidth] = useState('12');
    const [height, setHeight] = useState('8');
    const [doors, setDoors] = useState('1');
    const [windows, setWindows] = useState('1');
    const [ceiling, setCeiling] = useState(true);
    const [sheet, setSheet] = useState<SheetSize>('4x8');

    const L = num(length);
    const W = num(width);
    const H = num(height);
    const wallArea = 2 * (L + W) * H;
    const ceilingArea = ceiling ? L * W : 0;
    const openings = Math.floor(num(doors)) * DOOR_SQFT + Math.floor(num(windows)) * WINDOW_SQFT;
    const area = Math.max(0, wallArea + ceilingArea - openings);
    const hasRoom = L > 0 && W > 0 && H > 0;

    const sheets = Math.ceil((area * (1 + WASTE)) / sheetSizes[sheet].sqft);
    const buckets = Math.ceil((area * MUD_LB_PER_SQFT) / MUD_LB_PER_BUCKET);
    const tapeRolls = Math.ceil((area * TAPE_FT_PER_SQFT) / TAPE_FT_PER_ROLL);
    const screws = Math.ceil((area * SCREWS_PER_SQFT) / 50) * 50;

    const results = [
        { label: 'Drywall area', value: `${Math.round(area).toLocaleString()} sq ft` },
        { label: `${sheetSizes[sheet].label} sheets`, value: sheets.toLocaleString() },
        { label: 'Joint compound', value: `${buckets} bucket${buckets === 1 ? '' : 's'}` },
        { label: 'Joint tape', value: `${tapeRolls} roll${tapeRolls === 1 ? '' : 's'} (500 ft)` },
        { label: 'Drywall screws', value: `about ${screws.toLocaleString()}` },
    ];

    const requestQuote = () => {
        prefillContact(
            `I'd like a quote. Room: ${L}' × ${W}', ${H}' ceilings, ${Math.floor(num(doors))} door(s), ${Math.floor(num(windows))} window(s), ` +
            `${ceiling ? 'walls and ceiling' : 'walls only'}. The estimator says about ${Math.round(area)} sq ft ` +
            `(${sheets} sheets of ${sheetSizes[sheet].label}).`
        );
    };

    const field = 'w-full p-2 bg-sky-950 text-white border border-sky-700 rounded focus:outline-none focus:border-amber-600';
    const label = 'block text-sky-100 text-sm mb-1';

    return (
        <section id="estimator" className="bg-sky-950 p-8 border-t border-amber-700">
            <div className="container mx-auto mt-10 mb-10">
                <h2 className="tracking-tighter text-3xl font-bold text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-amber-50 to-sky-300">
                    Drywall Estimator
                </h2>
                <p className="text-sky-100 text-center mb-8 max-w-2xl mx-auto">
                    Enter your room size for a rough idea of the materials it takes. Every job is different, so we&apos;ll confirm the details with a free quote.
                </p>

                <div className="grid gap-8 md:grid-cols-2 bg-sky-900 p-6 shadow-lg">
                    <form className="grid grid-cols-2 gap-4" onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <label htmlFor="est-length" className={label}>Room length (ft)</label>
                            <input id="est-length" type="number" inputMode="decimal" min="0" step="0.5" value={length} onChange={(e) => setLength(e.target.value)} className={field} />
                        </div>
                        <div>
                            <label htmlFor="est-width" className={label}>Room width (ft)</label>
                            <input id="est-width" type="number" inputMode="decimal" min="0" step="0.5" value={width} onChange={(e) => setWidth(e.target.value)} className={field} />
                        </div>
                        <div>
                            <label htmlFor="est-height" className={label}>Ceiling height (ft)</label>
                            <input id="est-height" type="number" inputMode="decimal" min="0" step="0.5" value={height} onChange={(e) => setHeight(e.target.value)} className={field} />
                        </div>
                        <div>
                            <label htmlFor="est-sheet" className={label}>Sheet size</label>
                            <select id="est-sheet" value={sheet} onChange={(e) => setSheet(e.target.value as SheetSize)} className={field}>
                                {Object.entries(sheetSizes).map(([key, s]) => (
                                    <option key={key} value={key}>{s.label}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="est-doors" className={label}>Doors</label>
                            <input id="est-doors" type="number" inputMode="numeric" min="0" step="1" value={doors} onChange={(e) => setDoors(e.target.value)} className={field} />
                        </div>
                        <div>
                            <label htmlFor="est-windows" className={label}>Windows</label>
                            <input id="est-windows" type="number" inputMode="numeric" min="0" step="1" value={windows} onChange={(e) => setWindows(e.target.value)} className={field} />
                        </div>
                        <label className="col-span-2 flex items-center gap-2 text-sky-100">
                            <input type="checkbox" checked={ceiling} onChange={(e) => setCeiling(e.target.checked)} className="h-4 w-4 accent-amber-600" />
                            Include the ceiling
                        </label>
                    </form>

                    <div className="flex flex-col">
                        <dl className="divide-y divide-sky-800">
                            {results.map((r) => (
                                <div key={r.label} className="flex justify-between py-2">
                                    <dt className="text-sky-100">{r.label}</dt>
                                    <dd className="font-semibold text-amber-50">{hasRoom ? r.value : '—'}</dd>
                                </div>
                            ))}
                        </dl>
                        <p className="text-xs text-sky-300 mt-3">
                            Includes 10% extra for cuts and waste. Doors count as 21 sq ft and windows as 15 sq ft.
                        </p>
                        <button
                            type="button"
                            onClick={requestQuote}
                            disabled={!hasRoom}
                            className="mt-6 self-start bg-amber-700 hover:bg-amber-600 disabled:opacity-50 text-white font-bold py-2 px-4 rounded transition duration-300"
                        >
                            Get a Free Quote
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
