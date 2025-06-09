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
            const path = JSON.stringify([a, b, ret1, c, d, ret2, e, f].map(x => times[x]));
            results.push(path);
        }
    }

    const isValid = (seq) => {
        const safe = new Set();

        //to safe side
        safe.add(seq[0]);
        if (safe.has(seq[1])) return false;
        safe.add(seq[1]);
        //back trip
        if (!safe.has(seq[2])) return false;
        safe.delete(seq[2]);

        //to safe side
        if (safe.has(seq[3])) return false;
        safe.add(seq[3]);
        if (safe.has(seq[4])) return false;
        safe.add(seq[4]);
        //back trip
        if (!safe.has(seq[5])) return false;
        safe.delete(seq[5]);

        //to safe side
        if (safe.has(seq[6])) return false;
        safe.add(seq[6]);

        if (safe.has(seq[7])) return false;
        safe.add(seq[7]);

        return true;
    };

    const res = []
    for (const path of results) {
        const arrPath = JSON.parse(path);
        if (isValid(arrPath)) {
            res.push(arrPath);
        }
    }

    return res;
}

console.log(bridgeRiddle([1, 2, 5, 10], 17))
