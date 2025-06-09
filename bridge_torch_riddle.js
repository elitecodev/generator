const bridgeRiddle = (times, limit, res = []) => {
    if ((new Set(times)).size !== 4) return false;

    const isValid = (seq) => {
        const safe = new Set();

        for (let i = 0; i < seq.length; i++) {
            if ((i + 1) % 3) {
                if (safe.has(seq[i])) return false;
                safe.add(seq[i]);
            } else {
                if (!safe.has(seq[i])) return false;
                safe.delete(seq[i]);
            }
        }

        return true;
    };

    for (let i = 0; i < 1 << 16; i++) {
        const a = (i >> 14) & 3;
        const b = (i >> 12) & 3;
        const R1 = (i >> 10) & 3;

        const c = (i >> 8) & 3;
        const d = (i >> 6) & 3;
        const R2 = (i >> 4) & 3;

        const e = (i >> 2) & 3;
        const f = i & 3;

        const cross1 = Math.max(times[a], times[b]);
        const cross2 = Math.max(times[c], times[d]);
        const cross3 = Math.max(times[e], times[f]);

        const total = cross1 + times[R1] + cross2 + times[R2] + cross3;

        if (total === limit) {
            const path = [a, b, R1, c, d, R2, e, f].map(x => times[x]);
            isValid(path) && res.push(path);
        }
    }

    const normalize = new Set();
    res.forEach(([a, b, R1, c, d, R2, e, f]) => {
        normalize.add(JSON.stringify({
            cross1: ([a, b]).sort(),
            back1: [R1],
            cross2: ([c, d]).sort(),
            back2: [R2],
            cross3: ([e, f]).sort()
        }))
    })

    return [...normalize].map(b => JSON.parse(b));
}

console.log(bridgeRiddle([42, 3, 5, 10], 60))
