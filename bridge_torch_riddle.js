const bridgeRiddle = (times, dur) => {
    if (times.length !== 4) return false;
    const results = [];

    for (let i = 0; i < 1 << 16; i++) {
        const a = (i >> 14) & 3;
        const b = (i >> 12) & 3;
        const ret1 = (i >> 10) & 3;
        const c = (i >> 8) & 3;
        const d = (i >> 6) & 3;
        const ret2 = (i >> 4) & 3;
        const e = (i >> 2) & 3;
        const f = i & 3;

        const cross1 = Math.max(times[a], times[b]);
        const cross2 = Math.max(times[c], times[d]);
        const cross3 = Math.max(times[e], times[f]);

        const total = cross1 + times[ret1] + cross2 + times[ret2] + cross3;

        if (total === dur) {
            const path = [a, b, ret1, c, d, ret2, e, f].map(x => times[x]);
            results.push(path);
        }
    }

    const isValid = (seq) => {
        const safe = new Set();

        for (let i = 0; i < seq.length; i++) {
            if (i === 2 || i === 5) {
                if (!safe.has(seq[i])) return false;
                safe.delete(seq[i]);
            } else {
                if (safe.has(seq[i])) return false;
                safe.add(seq[i]);
            }
        }

        return true;
    };


    const res = [];
    for (const path of results) {
        isValid(path) && res.push(path);
    }

    return res;
}
